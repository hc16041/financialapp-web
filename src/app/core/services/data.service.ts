import { Injectable, inject } from "@angular/core";
import { FileDownloadService } from "./file-download.service";
import { AlertcustomService } from "./alertcustom.service";
import { BehaviorSubject } from "rxjs";
import { LoginService } from "../../account/login/Services/LoginService";
import {
  IDataService,
  IFileDownloadService,
  IXsdValidationService,
  ICrudService,
  IDeleteService,
  ErrorResponse,
} from "./data.service.types";

type FileType = "XML" | "Excel" | "PDF" | "Texto";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private loginService = inject(LoginService);
  private alertService = inject(AlertcustomService);
  private fileDownloadService = inject(FileDownloadService);

  private get token(): string {
    return this.loginService.token || "";
  }

  private get username(): string {
    return this.loginService.username || "";
  }

  /**
   * Obtiene datos de un servicio de infraestructura y los publica en un `BehaviorSubject`.
   *
   * @param servicio Servicio que contiene el método remoto.
   * @param metodo Nombre del método a invocar en el servicio.
   * @param behaviorSubject Subject donde se almacenará la respuesta.
   * @param mensajeError Mensaje a mostrar en caso de fallo.
   * @param id Identificador opcional cuando el endpoint lo requiere.
   */
  async obtenerDatos<T>(
    servicio: IDataService<T>,
    metodo: string,
    behaviorSubject: BehaviorSubject<T[]>,
    mensajeError: string,
    id?: number | string
  ): Promise<void> {
    try {
      const serviceObj = servicio as Record<string, unknown>;
      const method = serviceObj[metodo];

      if (!method || typeof method !== 'function') {
        throw new Error(`Método ${metodo} no encontrado en el servicio`);
      }
      // Bind el método al servicio para mantener el contexto 'this'
      const boundMethod = (method as (...args: unknown[]) => Promise<T | T[]>).bind(servicio);
      const data =
        id !== undefined
          ? await boundMethod(id, this.token, this.username)
          : await boundMethod(this.token, this.username);
      behaviorSubject.next(Array.isArray(data) ? data : [data]);
    } catch (error: unknown) {
      console.error(`${mensajeError}:`, error);
      this.alertService.showError(mensajeError);
    }
  }

  /**
   * Verifica si existe archivo XSD y ofrece validar el XML antes de descargarlo.
   *
   * @param servicio Servicio que expone métodos de validación/descarga.
   * @param metodoXSD Nombre del método para validar/obtener el XSD.
   * @param metodoXML Nombre del método que descarga el XML.
   */
  async existenciaxsd(
    servicio: IXsdValidationService & IFileDownloadService,
    metodoXSD: string,
    metodoXML: string
  ): Promise<void> {
    try {
      const serviceObj = servicio as Record<string, unknown>;
      const xsdMethod = serviceObj[metodoXSD];
      if (!xsdMethod || typeof xsdMethod !== 'function') {
        throw new Error(`Método ${metodoXSD} no encontrado en el servicio`);
      }
      // Bind el método al servicio para mantener el contexto 'this'
      const boundXsdMethod = (xsdMethod as () => Promise<unknown>).bind(servicio);
      const response = await boundXsdMethod();
      
      let validar = "";
      if(response){
        const confirmar = await this.alertService.confirm(
          "<strong>Archivo XSD encontrado</strong><br><br>¿Deseas validar el XML con el XSD antes de descargar?"
        );

        if(confirmar){
          validar = "S";
        }
      }

      await this.descargarArchivo(
        servicio,
        metodoXML,
        "XML",
        "Error al descargar el archivo XML",
        { validarXSD: validar }
      );
    } catch (error: unknown) {
      console.error(`Problema`, error);      
    }
  } 

  /**
   * Descarga archivos en formato XML, Excel, PDF o texto plano.
   *
   * @param servicio Servicio que expone el método de descarga.
   * @param metodo Nombre del método remoto a ejecutar.
   * @param tipoArchivo Tipo de archivo esperado.
   * @param mensajeError Mensaje a mostrar en caso de fallo.
   * @param archivo Payload opcional (por ejemplo filtros o parámetros).
   */
  async descargarArchivo(
    servicio: IFileDownloadService,
    metodo: string,
    tipoArchivo: FileType,
    mensajeError: string,
    archivo?: Record<string, unknown>
  ): Promise<void> {
    try {
      const serviceObj = servicio as Record<string, unknown>;
      const method = serviceObj[metodo];
      if (!method || typeof method !== 'function') {
        throw new Error(`Método ${metodo} no encontrado en el servicio`);
      }
      // Bind el método al servicio para mantener el contexto 'this'
      const boundMethod = (method as (
        token: string,
        usuario: string,
        archivo?: Record<string, unknown>
      ) => Promise<{
        data: BlobPart;
        fileName: string;
      }>).bind(servicio);
      const response = await boundMethod(
        this.token,
        this.username,
        archivo
      );
      const isPlainText = typeof response.data === 'string' && !String(response.data).trim().startsWith("<?xml");
      if (tipoArchivo === "XML") {
        if (isPlainText){
        this.fileDownloadService.downloadTextFileErrors(
          response.data,
          response.fileName
        );
        } else {
          const validarXSD = archivo && typeof archivo['validarXSD'] === 'string' ? archivo['validarXSD'] : '';
          this.fileDownloadService.downloadXmlFile(
            response.data,
            response.fileName,
            validarXSD
          );
        }
      } else if (tipoArchivo === "Excel") {
        this.fileDownloadService.downloadExcelFile(
          response.data,
          response.fileName
        );
      } else if (tipoArchivo === "PDF") {
        this.fileDownloadService.downloadPdfFile(
          response.data,
          response.fileName
        );
      } else if (tipoArchivo === "Texto") {
        this.fileDownloadService.downloadTextFile(
          response.data,
          response.fileName
        );
      }      
    } catch (error: unknown) {
      console.error(`${mensajeError}:`, error);
      this.alertService.showError(mensajeError);
    }
  }

  /**
   * Agrega un registro y notifica éxito o error en UI.
   *
   * @param servicio Servicio que proporciona el método de agregación.
   * @param metodo Método del servicio a ejecutar.
   * @param datos Nuevos datos del registro.
   * @param mensajeExito Mensaje de éxito al completarse.
   * @param mensajeError Mensaje de error al fallar.
   */
  async agregarRegistro<TData, TResponse>(
    servicio: ICrudService<TData, TResponse>,
    metodo: string,
    datos: TData,
    mensajeExito: string,
    mensajeError: string
  ): Promise<void> {
    try {
      const serviceObj = servicio as Record<string, unknown>;
      const method = serviceObj[metodo];
      if (!method || typeof method !== 'function') {
        throw new Error(`Método ${metodo} no encontrado en el servicio`);
      }
      // Bind el método al servicio para mantener el contexto 'this'
      const boundMethod = (method as (
        data: TData,
        token: string,
        usuario: string
      ) => Promise<TResponse>).bind(servicio);
      await boundMethod(datos, this.token, this.username);
      this.alertService.showSuccess(mensajeExito);
    } catch (error: unknown) {
      console.error("=== ERROR en agregarRegistro ===");
      console.error("Mensaje de error:", mensajeError);
      console.error("Error completo:", error);
      
      const errorObj = error as ErrorResponse;
      if (errorObj) {
        console.error("Error message:", errorObj.message);
        console.error("Error response:", errorObj.response);
        console.error("Error status:", errorObj.status);
        console.error("Error data:", errorObj.error);
        console.error("Stack trace:", errorObj.stack);
        
        // Mostrar el mensaje de error más detallado si está disponible
        const errorMessage = 
          errorObj.error?.message || 
          errorObj.message || 
          errorObj.response?.data?.message || 
          mensajeError;
        this.alertService.showError(`${mensajeError}: ${errorMessage}`);
      } else {
        this.alertService.showError(mensajeError);
      }
      throw error;
    }
  }

  /**
   * Actualiza un registro y notifica el resultado.
   *
   * @param servicio Servicio que proporciona el método de actualización.
   * @param metodo Método del servicio a ejecutar.
   * @param datos Nuevos datos del registro.
   * @param mensajeExito Mensaje de éxito al completarse.
   * @param mensajeError Mensaje de error al fallar.
   * @param headers Encabezados adicionales si el endpoint lo requiere.
   */
  async actualizarRegistro<TData, TResponse>(
    servicio: ICrudService<TData, TResponse>,
    metodo: string,
    datos: TData,
    mensajeExito: string,
    mensajeError: string,
    headers: string = ""
  ): Promise<void> {
    try {
      const serviceObj = servicio as Record<string, unknown>;
      const method = serviceObj[metodo];
      if (!method || typeof method !== 'function') {
        throw new Error(`Método ${metodo} no encontrado en el servicio`);
      }
      // Bind el método al servicio para mantener el contexto 'this'
      const boundMethod = (method as (
        data: TData,
        token: string,
        usuario: string
      ) => Promise<TResponse>).bind(servicio);
      await boundMethod(datos, this.token, this.username);
      this.alertService.showSuccess(mensajeExito);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.alertService.showError(`${mensajeError}: ${errorMessage}`);
    }
  }
  /**
   * Elimina un registro y muestra el resultado en UI.
   *
   * @param servicio Servicio que proporciona el método de eliminación.
   * @param metodo Método del servicio a ejecutar.
   * @param id Identificador del registro a eliminar.
   * @param mensajeExito Mensaje de éxito al eliminar.
   * @param mensajeError Mensaje de error al fallar.
   */
  async eliminarRegistro(
    servicio: IDeleteService,
    metodo: string,
    id: number | string | Record<string, unknown>,
    mensajeExito: string,
    mensajeError: string
  ): Promise<void> {
    try {
      const serviceObj = servicio as Record<string, unknown>;
      const method = serviceObj[metodo];
      if (!method || typeof method !== 'function') {
        throw new Error(`Método ${metodo} no encontrado en el servicio`);
      }
      // Bind el método al servicio para mantener el contexto 'this'
      const boundMethod = (method as (
        id: number | string | Record<string, unknown>,
        token: string,
        usuario: string
      ) => Promise<unknown>).bind(servicio);
      await boundMethod(id, this.token, this.username);
      this.alertService.showSuccess(mensajeExito);
    } catch (error: unknown) {
      console.error(`${mensajeError}:`, error);
      this.alertService.showError(mensajeError);
    }
  }
}
