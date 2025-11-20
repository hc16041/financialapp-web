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
  constructor(
    private http: HttpClient,
    private authService: AuthNewService
  ) {}

  /**
   * Envia una solicitud HTTP a la API y devuelve la respuesta
   * como un objeto de tipo T. Si la respuesta no es exitosa, lanza
   * un error con el mensaje de error correspondiente.
   * @param apiUrl Endpoint de la API
   * @param method Verbo HTTP a utilizar
   * @param body Cuerpo de la solicitud (opcional)
   * @param headers Encabezados de la solicitud (opcional)
   * @param parameters Par metros de la solicitud (opcional)
   * @returns La respuesta de la API como un objeto de tipo T
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
    if (token && !apiUrl.includes('/auth/')) {
      // Si ya se pasó Authorization en headers, verificar si tiene Bearer
      if (headers['Authorization']) {
        // Si no tiene Bearer, agregarlo
        const authHeader = headers['Authorization'];
        if (!authHeader.startsWith('Bearer ')) {
          requestHeaders['Authorization'] = `Bearer ${authHeader.replace('Bearer ', '')}`;
          console.log('[ApiConnectionService] Token agregado con Bearer desde headers manuales');
        } else {
          console.log('[ApiConnectionService] Token ya tiene Bearer en headers manuales');
        }
      } else {
        // Si no se pasó Authorization, agregarlo automáticamente
        requestHeaders['Authorization'] = `Bearer ${token}`;
        console.log('[ApiConnectionService] Token agregado automáticamente:', token.substring(0, 20) + '...');
      }
    } else if (!token && !apiUrl.includes('/auth/')) {
      console.warn('[ApiConnectionService] No hay token disponible para:', apiUrl);
    }

    // Log para debug
    if (requestHeaders['Authorization']) {
      console.log('[ApiConnectionService] Request a:', apiUrl, 'con Authorization:', requestHeaders['Authorization'].substring(0, 30) + '...');
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
        console.error('[ApiConnectionService] Error 401 Unauthorized para:', apiUrl);
        console.error('[ApiConnectionService] Token usado:', requestHeaders['Authorization'] ? 'Sí' : 'No');
        // Si es 401, podría ser que el token expiró o no es válido
        const authService = this.authService;
        if (authService && authService.isAuthenticated()) {
          console.warn('[ApiConnectionService] Token existe pero fue rechazado. Podría haber expirado.');
        }
      }

      // Evaluar si responseData lleva datos
      if (!response.ok) {
        let errorData;
        try {
          const text = await response.text();
          errorData = text ? JSON.parse(text) : { message: response.statusText };
        } catch (parseError) {
          errorData = { message: response.statusText };
        }

        throw new Error(errorData.respuesta || errorData.message || response.statusText);
      }

      const responseData = await response.json();

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

  //mejoras
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

  // Función helper para extraer el nombre del archivo
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

  // Para XML
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

  // Para Excel
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

  // Para PDF
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

  // Para texto plano
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
