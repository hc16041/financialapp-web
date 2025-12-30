import { Injectable } from "@angular/core";
import { FileDownloadService } from "./file-download.service";
import { AlertcustomService } from "./alertcustom.service";
import { BehaviorSubject } from "rxjs";
import { LoginService } from "../../account/login/Services/LoginService";

type FileType = "XML" | "Excel" | "PDF" | "Texto";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(
    private loginService: LoginService,
    private alertService: AlertcustomService,
    private fileDownloadService: FileDownloadService
  ) {}

  private token = this.loginService.token || "";
  private username = this.loginService.username || "";

  /**
   * Obtiene datos de un servicio y los almacena en un BehaviorSubject.
   * @param servicio Servicio que proporciona el método de obtención de datos.
   * @param metodo Método del servicio a ejecutar.
   * @param behaviorSubject BehaviorSubject donde se almacenarán los datos obtenidos.
   * @param mensajeError Mensaje de error en caso de fallo.
   */
  async obtenerDatos<T>(
    servicio: any,
    metodo: string,
    behaviorSubject: BehaviorSubject<T[]>,
    mensajeError: string,
    id?: any // Parámetro opcional para métodos que requieran un ID
  ): Promise<void> {
    try {
      const data =
        id !== undefined
          ? await servicio[metodo](id, this.token, this.username)
          : await servicio[metodo](this.token, this.username);
      behaviorSubject.next(data);
    } catch (error) {
      console.error(`${mensajeError}:`, error);
      this.alertService.showError(mensajeError);
    }
  }

  /**
   * Verificar si existe archivo de validación XSD.
   * @param servicio Servicio que proporciona el método de validacion.
   * @param metodo Método del servicio a ejecutar.   
   */
  async existenciaxsd(
    servicio: any,
    metodoXSD: string,
    metodoXML: string
  ): Promise<void> {
    try {
      const response = await servicio[metodoXSD](        
      )

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
        { validarXSD: validar });

    } catch (error) {
      console.error(`Problema`, error);      
    }
  } 

  /**
   * Descarga archivos en formato XML o Excel.
   * @param servicio Servicio que proporciona el método de descarga.
   * @param metodo Método del servicio a ejecutar.
   * @param tipoArchivo Tipo de archivo ('XML' o 'Excel').
   * @param mensajeError Mensaje de error en caso de fallo.
   */
  async descargarArchivo(
    servicio: any,
    metodo: string,
    tipoArchivo: "XML" | "Excel" | "PDF" | "Texto",
    mensajeError: string,
    archivo?: any // Parámetro opcional para métodos que requieran un ID
  ): Promise<void> {
    try {
      const response = await servicio[metodo](
        this.token,
        this.username,
        archivo
      );
      const isPlainText = typeof response.data === 'string' && !response.data.trim().startsWith("<?xml");
      if (tipoArchivo === "XML") {
        if (isPlainText){
        this.fileDownloadService.downloadTextFileErrors(
          response.data,
          response.fileName
        );
        } else {
          this.fileDownloadService.downloadXmlFile(
            response.data,
            response.fileName,
            archivo.validarXSD
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
    } catch (error) {
      console.error(`${mensajeError}:`, error);
      this.alertService.showError(mensajeError);
    }
  }

  /**
   * Agrega un registro a un servicio y muestra un mensaje de éxito o error
   * dependiendo del resultado.
   * @param servicio Servicio que proporciona el método de agregación.
   * @param metodo Método del servicio a ejecutar.
   * @param datos Nuevos datos del registro.
   * @param mensajeExito Mensaje de éxito a mostrar en caso de que se agregue
   * correctamente.
   * @param mensajeError Mensaje de error a mostrar en caso de fallo.
   */
  async agregarRegistro<T>(
    servicio: any,
    metodo: string,
    datos: any,
    mensajeExito: string,
    mensajeError: string
  ): Promise<void> {
    try {
      console.log("=== DataService.agregarRegistro ===");
      console.log("Servicio:", servicio);
      console.log("Método:", metodo);
      console.log("Datos a enviar:", JSON.stringify(datos, null, 2));
      console.log("Token:", this.token ? "Presente" : "Ausente");
      console.log("Username:", this.username);
      
      const resultado = await servicio[metodo](datos, this.token, this.username);
      console.log("Respuesta del servidor:", resultado);
      this.alertService.showSuccess(mensajeExito);
    } catch (error: any) {
      console.error("=== ERROR en agregarRegistro ===");
      console.error("Mensaje de error:", mensajeError);
      console.error("Error completo:", error);
      console.error("Error message:", error?.message);
      console.error("Error response:", error?.response);
      console.error("Error status:", error?.status);
      console.error("Error data:", error?.error || error?.data);
      console.error("Stack trace:", error?.stack);
      
      // Mostrar el mensaje de error más detallado si está disponible
      const errorMessage = error?.error?.message || error?.message || error?.response?.data?.message || mensajeError;
      this.alertService.showError(`${mensajeError}: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Actualiza un registro en un servicio y muestra un mensaje de éxito o error
   * dependiendo del resultado.
   * @param servicio Servicio que proporciona el método de actualización.
   * @param metodo Método del servicio a ejecutar.
   * @param datos Nuevos datos del registro.
   * @param mensajeExito Mensaje de éxito a mostrar en caso de que se actualice correctamente.
   * @param mensajeError Mensaje de error a mostrar en caso de fallo.
   */
  async actualizarRegistro<T>(
    servicio: any,
    metodo: string,
    datos: any,
    mensajeExito: string,
    mensajeError: string,
    headers: string = ""
  ): Promise<void> {
    try {
      console.log("Datos a actualizar:", datos);
      await servicio[metodo](datos, this.token, this.username);
      this.alertService.showSuccess(mensajeExito);
    } catch (error) {
      this.alertService.showError(`${String(error)}`);
    }
  }
  /**
   * Elimina un registro en un servicio y muestra un mensaje de éxito o error
   * dependiendo del resultado.
   * @param servicio Servicio que proporciona el método de eliminación.
   * @param metodo Método del servicio a ejecutar.
   * @param id Identificador del registro a eliminar.
   * @param mensajeExito Mensaje de éxito a mostrar en caso de que se elimine correctamente.
   * @param mensajeError Mensaje de error a mostrar en caso de fallo.
   */
  async eliminarRegistro(
    servicio: any,
    metodo: string,
    id: number | string | Record<string, any>,
    mensajeExito: string,
    mensajeError: string
  ): Promise<void> {
    try {
      await servicio[metodo](id, this.token, this.username);
      this.alertService.showSuccess(mensajeExito);
    } catch (error) {
      console.error(`${mensajeError}:`, error);
      this.alertService.showError(mensajeError);
    }
  }
}
