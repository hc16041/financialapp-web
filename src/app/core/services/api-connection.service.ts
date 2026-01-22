import { Injectable, inject } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { plainToInstance } from "class-transformer";
import { GlobalComponent } from "src/app/global-component";
import { AuthNewService } from "./auth-new.service";

type HttpVerb = "GET" | "POST" | "PUT" | "DELETE";

@Injectable({
  providedIn: "root",
})
export class ApiConnectionService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthNewService);

  private buildUrl(apiUrl: string): string {
    return `${GlobalComponent.AUTH_API}${apiUrl}`;
  }

  private buildHeaders(
    headers: Record<string, string>,
    fullUrl: string
  ): HttpHeaders {
    const token = this.authService.getToken();
    let httpHeaders = new HttpHeaders(headers);

    if (token && !fullUrl.includes("/auth/")) {
      if (!httpHeaders.has("Authorization")) {
        httpHeaders = httpHeaders.set("Authorization", `Bearer ${token}`);
      } else if (
        httpHeaders.has("Authorization") &&
        !httpHeaders.get("Authorization")!.toLowerCase().startsWith("bearer")
      ) {
        const auth = httpHeaders.get("Authorization")!;
        httpHeaders = httpHeaders.set("Authorization", `Bearer ${auth}`);
      }
    }

    return httpHeaders;
  }

  /**
   * Solicitud HTTP tipada usando HttpClient y promesas.
   */
  async sendRequestAsync<T>(
    apiUrl: string,
    method: HttpVerb,
    body: unknown = null,
    headers: Record<string, string> = {},
    parameters: Record<string, string> = {},
    classType?: new (...args: any[]) => T extends (infer U)[] ? U : T
  ): Promise<T> {
    const fullUrl = this.buildUrl(apiUrl);
    const httpHeaders = this.buildHeaders(headers, fullUrl);
    const httpParams = new HttpParams({ fromObject: parameters });

    try {
      const response$ = this.http.request<T>(method, fullUrl, {
        body,
        headers: httpHeaders,
        params: httpParams,
        withCredentials: false,
      });
      const response = await firstValueFrom(response$);

      if (!classType || response === null || response === undefined) {
        return response;
      }

      if (Array.isArray(response)) {
        return response.map((item: unknown) =>
          plainToInstance(classType, item)
        ) as unknown as T;
      }

      return plainToInstance(classType, response) as unknown as T;
    } catch (error) {
      const err = error as HttpErrorResponse;
      const message =
        err.error?.message || err.error?.title || err.message || "Error de red";
      console.error("[ApiConnectionService] Error:", message, err);
      throw error;
    }
  }

  /**
   * Solicitud de archivos (blob/text/json) devolviendo nombre detectado.
   */
  async sendFileRequestAsync<T>(
    apiUrl: string,
    method: HttpVerb,
    fileTypeConfig: {
      defaultFileName: string;
      responseType: "text" | "blob" | "json";
    },
    body: unknown = null,
    headers: Record<string, string> = {},
    parameters: Record<string, string> = {}
  ): Promise<{ fileName: string; data: T }> {
    const fullUrl = this.buildUrl(apiUrl);
    const httpHeaders = this.buildHeaders(
      {
        "Access-Control-Expose-Headers": "content-disposition",
        ...headers,
      },
      fullUrl
    );
    const httpParams = new HttpParams({ fromObject: parameters });

    try {
      const resp = (await (
        fileTypeConfig.responseType === "blob"
          ? firstValueFrom(
              this.http.request(method, fullUrl, {
                body,
                headers: httpHeaders,
                params: httpParams,
                observe: "response",
                responseType: "blob",
              }) as any
            )
          : fileTypeConfig.responseType === "text"
          ? firstValueFrom(
              this.http.request(method, fullUrl, {
                body,
                headers: httpHeaders,
                params: httpParams,
                observe: "response",
                responseType: "text",
              }) as any
            )
          : firstValueFrom(
              this.http.request(method, fullUrl, {
                body,
                headers: httpHeaders,
                params: httpParams,
                observe: "response",
                responseType: "json",
              }) as any
            )
      )) as any;
      const contentDisposition =
        resp.headers.get("content-disposition") ||
        resp.headers.get("Content-Disposition") ||
        "";
      const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/i);
      const fileName =
        (fileNameMatch && fileNameMatch[1]) || fileTypeConfig.defaultFileName;

      return { fileName, data: resp.body as T };
    } catch (error) {
      console.error("[ApiConnectionService] Error en file request:", error);
      throw error;
    }
  }
}
