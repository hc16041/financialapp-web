import { Injectable } from "@angular/core";
import { GlobalComponent } from "src/app/global-component";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { plainToClass } from "class-transformer";
import { AuthNewService } from "./auth-new.service";

@Injectable({
  providedIn: "root",
})
export class ApiConnectionService {
  constructor(private http: HttpClient, private authService: AuthNewService) {}

  /**
   * Envía una solicitud HTTP usando `fetch` y retorna la respuesta tipada.
   *
   * - Anexa automáticamente el `AUTH_API` base.
   * - Si hay token y no es endpoint `/auth/`, agrega `Authorization: Bearer`.
   * - Puede mapear la respuesta a instancias de clase usando `class-transformer`.
   *
   * @param apiUrl Ruta relativa del endpoint.
   * @param method Verbo HTTP a utilizar.
   * @param body Cuerpo de la solicitud; serializa a JSON si se envía.
   * @param headers Encabezados adicionales.
   * @param parameters Parámetros de consulta a agregar al URL.
   * @param classType Clase destino para mapear la respuesta (opcional).
   * @returns Promesa con la respuesta tipada.
   */
  async sendRequestAsync<T>(
    apiUrl: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body: any = null,
    headers: Record<string, string> = {},
    parameters: Record<string, string> = {},
    classType?: new (...args: any[]) => T extends (infer U)[] ? U : T
  ): Promise<T> {
    apiUrl = GlobalComponent.AUTH_API + apiUrl;

    if (Object.keys(parameters).length > 0) {
      const queryString = new URLSearchParams(parameters).toString();
      apiUrl += `?${queryString}`;
    }

    // Agregar token automáticamente si está disponible y no se proporcionó en headers
    const token = this.authService.getToken();
    const requestHeaders: Record<string, string> = { ...headers };

    // Si hay token y no es un endpoint de autenticación, agregarlo
    if (token && !apiUrl.includes("/auth/")) {
      // Si ya se pasó Authorization en headers, verificar si tiene Bearer
      if (headers["Authorization"]) {
        // Si no tiene Bearer, agregarlo
        const authHeader = headers["Authorization"];
        if (!authHeader.startsWith("Bearer ")) {
          requestHeaders["Authorization"] = `Bearer ${authHeader.replace(
            "Bearer ",
            ""
          )}`;
        } else {
        }
      } else {
        // Si no se pasó Authorization, agregarlo automáticamente
        requestHeaders["Authorization"] = `Bearer ${token}`;
      }
    } else if (!token && !apiUrl.includes("/auth/")) {
      console.warn(
        "[ApiConnectionService] No hay token disponible para:",
        apiUrl
      );
    }

    const requestOptions: RequestInit = {
      method: method,
      headers: requestHeaders,
    };

    if (body !== null) {
      requestOptions.body = JSON.stringify(body);
      if (!requestHeaders["Content-Type"]) {
        requestHeaders["Content-Type"] = "application/json";
      }
    }

    try {
      const response = await fetch(apiUrl, requestOptions);

      // Manejar errores de autenticación
      if (response.status === 401) {
        console.error(
          "[ApiConnectionService] Error 401 Unauthorized para:",
          apiUrl
        );
        console.error(
          "[ApiConnectionService] Token usado:",
          requestHeaders["Authorization"] ? "Sí" : "No"
        );
        // Si es 401, podría ser que el token expiró o no es válido
        const authService = this.authService;
        if (authService && authService.isAuthenticated()) {
          console.warn(
            "[ApiConnectionService] Token existe pero fue rechazado. Podría haber expirado."
          );
        }
      }

      // Evaluar si responseData lleva datos
      if (!response.ok) {
        let errorData;
        try {
          const text = await response.text();
          errorData = text
            ? JSON.parse(text)
            : { message: response.statusText };
        } catch (parseError) {
          errorData = { message: response.statusText };
        }

        throw new Error(
          errorData.respuesta || errorData.message || response.statusText
        );
      }

      // Algunos endpoints (ej. DELETE) responden 204 sin body; evitar parseo JSON
      if (response.status === 204) {
        return undefined as unknown as T;
      }

      // Leer cuerpo seguro: si está vacío, devolver undefined
      const rawText = await response.text();
      if (!rawText) {
        return undefined as unknown as T;
      }

      const responseData = JSON.parse(rawText);

      // Si classType es Array (por defecto), retorna los datos sin mapeo
      if (!classType) {
        // return (await response.json()) as T;
        return responseData as T;
      }

      // Si es un array, mapear cada elemento
      if (Array.isArray(responseData)) {
        return responseData.map((item: any) =>
          plainToClass(classType, item)
        ) as T;
      }

      // Si se pasó una clase específica, aplica plainToClass
      return plainToClass(classType, responseData) as T;
      // return (await response.json()) as T;
    } catch (error: unknown) {
      console.error("Error sending request:", error);
      throw error; // Considera definir un error específico para manejar mejor los errores
    }
  }

  /**
   * Envía una solicitud de archivo y devuelve metadatos + payload en el tipo indicado.
   *
   * @param apiUrl Ruta relativa del endpoint.
   * @param method Verbo HTTP a utilizar.
   * @param fileTypeConfig Configuración de nombre por defecto y tipo de respuesta.
   * @param body Cuerpo de la solicitud.
   * @param headers Encabezados adicionales.
   * @param parameters Parámetros de consulta.
   * @returns Promesa con nombre de archivo detectado y los datos.
   */
  async sendFileRequestAsync<T>(
    apiUrl: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    fileTypeConfig: {
      defaultFileName: string;
      responseType: "text" | "blob" | "json";
    },
    body: any = null,
    headers: Record<string, string> = {},
    parameters: Record<string, string> = {}
  ): Promise<{ fileName: string; data: T }> {
    apiUrl = GlobalComponent.AUTH_API + apiUrl;

    // Manejo de parámetros URL
    if (Object.keys(parameters).length > 0) {
      apiUrl += `?${new URLSearchParams(parameters).toString()}`;
    }

    // Configuración de la solicitud
    const requestOptions: RequestInit = {
      method,
      headers: {
        ...headers,
        "Access-Control-Expose-Headers": "content-disposition",
      },
    };

    // Manejo del cuerpo de la solicitud
    if (body !== null) {
      requestOptions.body = JSON.stringify(body);
      if (!headers["Content-Type"]) {
        (requestOptions.headers as Record<string, string>)["Content-Type"] =
          "application/json";
      }
    }

    try {
      const response = await fetch(apiUrl, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      // Obtener nombre del archivo
      const fileName = this.getFileNameFromHeaders(
        response.headers,
        fileTypeConfig.defaultFileName
      );

      // Obtener datos según el tipo requerido
      let data;
      switch (fileTypeConfig.responseType) {
        case "blob":
          data = await response.blob();
          break;
        case "json":
          data = await response.json();
          break;
        default:
          data = await response.text();
      }

      return { fileName, data: data as T };
    } catch (error) {
      console.error("Error en la solicitud:", error);
      throw error;
    }
  }

  /**
   * Extrae el nombre de archivo de los headers HTTP o usa un valor por defecto.
   * @param headers Headers de la respuesta.
   * @param defaultName Nombre a usar cuando no hay `content-disposition`.
   * @returns Nombre de archivo limpio.
   */
  private getFileNameFromHeaders(
    headers: Headers,
    defaultName: string
  ): string {
    const contentDisposition = headers.get("content-disposition");
    let fileName = defaultName;

    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename=(.*?)(;|$)/);
      const filenameStarMatch = contentDisposition.match(
        /filename\*=UTF-8''(.*?)(;|$)/
      );

      fileName = filenameStarMatch?.[1]
        ? decodeURIComponent(filenameStarMatch[1])
        : filenameMatch?.[1]?.replace(/["']/g, "") || fileName;
    }

    return fileName;
  }

  /**
   * Helper para descargas XML en texto plano.
   * @param apiUrl Ruta relativa.
   * @param method Verbo HTTP.
   * @param body Cuerpo opcional.
   * @param headers Encabezados opcionales.
   * @param parameters Parámetros de consulta.
   */
  async sendRequestXMLAsync<T>(
    apiUrl: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body: any = null,
    headers: Record<string, string> = {},
    parameters: Record<string, string> = {}
  ) {
    return this.sendFileRequestAsync<T>(
      apiUrl,
      method,
      {
        defaultFileName: "archivo.xml",
        responseType: "text",
      },
      body,
      headers,
      parameters
    );
  }

  /**
   * Helper para descargas de Excel.
   * @param apiUrl Ruta relativa.
   * @param method Verbo HTTP (GET/POST).
   * @param body Cuerpo opcional.
   * @param headers Encabezados opcionales.
   * @param parameters Parámetros de consulta.
   */
  async sendRequestExcelAsync<T>(
    apiUrl: string,
    method: "GET" | "POST",
    body: any = null,
    headers: Record<string, string> = {},
    parameters: Record<string, string> = {}
  ) {
    return this.sendFileRequestAsync<Blob>(
      apiUrl,
      method,
      {
        defaultFileName: "archivo.xlsx",
        responseType: "blob",
      },
      body,
      headers,
      parameters
    );
  }

  /**
   * Helper para descargas de PDF.
   * @param apiUrl Ruta relativa.
   * @param method Verbo HTTP.
   * @param body Cuerpo opcional.
   * @param headers Encabezados opcionales.
   * @param parameters Parámetros de consulta.
   */
  async sendRequestPDFAsync<T>(
    apiUrl: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body: any = null,
    headers: Record<string, string> = {},
    parameters: Record<string, string> = {}
  ) {
    return this.sendFileRequestAsync<Blob>(
      apiUrl,
      method,
      {
        defaultFileName: "archivo.pdf",
        responseType: "blob",
      },
      body,
      headers,
      parameters
    );
  }

  /**
   * Helper para descargas de texto plano.
   * @param apiUrl Ruta relativa.
   * @param method Verbo HTTP.
   * @param body Cuerpo opcional.
   * @param headers Encabezados opcionales.
   * @param parameters Parámetros de consulta.
   */
  async sendRequestTextAsync<T>(
    apiUrl: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body: any = null,
    headers: Record<string, string> = {},
    parameters: Record<string, string> = {}
  ) {
    return this.sendFileRequestAsync<string>(
      apiUrl,
      method,
      {
        defaultFileName: "archivo.txt",
        responseType: "text",
      },
      body,
      headers,
      parameters
    );
  }
}
