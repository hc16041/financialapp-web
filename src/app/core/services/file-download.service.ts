import { Injectable, inject } from "@angular/core";
import { AlertcustomService } from "./alertcustom.service";

@Injectable({
  providedIn: "root",
})
export class FileDownloadService {
  private alertService = inject(AlertcustomService);

  /**
   * Descarga un XML y notifica el resultado.
   *
   * @param data Contenido del XML.
   * @param fileName Nombre sugerido del archivo.
   * @param validacion Indicador `"S"` si se validó contra XSD (para ajustar mensaje).
   */
  downloadXmlFile(data: BlobPart, fileName: string, validacion: string): void {
    let url: string | null = null;
    try {
      // Crear un blob con el contenido del archivo XML
      const blob = new Blob([data], { type: "application/xml" });
      url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName || "download.xml";
      a.click();

      if (validacion === "S"){
      this.alertService.showSuccess("XML validado y descargado con éxito");
      } else {
      this.alertService.showSuccess("XML descargado con éxito");
      }
    } catch (error: unknown) {
      console.error("Error al descargar el archivo:", error);
      this.alertService.showError("Error al descargar el archivo");
    } finally {
      // Liberar recursos
      if (url) {
        window.URL.revokeObjectURL(url);
      }
    }
  }

  /**
   * Descarga un archivo Excel y muestra feedback de éxito/error.
   *
   * @param data Contenido del Excel.
   * @param fileName Nombre sugerido del archivo.
   */
  downloadExcelFile(data: BlobPart, fileName: string): void {
    let url: string | null = null;
    try {
      // Crear un blob con el contenido del archivo Excel
      const blob = new Blob([data], { type: "application/vnd.ms-excel" });
      url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName || "download.xlsx";
      a.click();
      this.alertService.showSuccess("Excel descargado con éxito");
    } catch (error: unknown) {
      console.error("Error al descargar el archivo:", error);
      this.alertService.showError("Error al descargar el archivo");
    } finally {
      // Liberar recursos
      if (url) {
        window.URL.revokeObjectURL(url);
      }
    }
  }

  /**
   * Descarga un PDF y muestra feedback de éxito/error.
   *
   * @param data Contenido del PDF.
   * @param fileName Nombre sugerido del archivo.
   */
  downloadPdfFile(data: BlobPart, fileName: string): void {
    let url: string | null = null;
    try {
      // Crear un blob con el contenido del archivo PDF
      const blob = new Blob([data], { type: "application/pdf" });
      url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName || "download.pdf";
      a.click();
      this.alertService.showSuccess("PDF descargado con éxito");
    } catch (error: unknown) {
      console.error("Error al descargar el archivo:", error);
      this.alertService.showError("Error al descargar el archivo");
    } finally {
      // Liberar recursos
      if (url) {
        window.URL.revokeObjectURL(url);
      }
    }
  }

  /**
   * Descarga un archivo de texto plano y muestra feedback.
   *
   * @param data Contenido del TXT.
   * @param fileName Nombre sugerido del archivo.
   */
  downloadTextFile(data: BlobPart, fileName: string): void {
    let url: string | null = null;
    try {
      // Crear un blob con el contenido del archivo de texto
      const blob = new Blob([data], { type: "text/plain" });
      url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName || "download.txt";
      a.click();
      this.alertService.showSuccess("Texto descargado con éxito");
    } catch (error: unknown) {
      console.error("Error al descargar el archivo:", error);
      this.alertService.showError("Error al descargar el archivo");
    } finally {
      // Liberar recursos
      if (url) {
        window.URL.revokeObjectURL(url);
      }
    }
  }

  /**
   * Descarga un archivo de texto con errores de validación y alerta al usuario.
   *
   * @param data Contenido del TXT de errores.
   * @param fileName Nombre sugerido del archivo.
   */
  downloadTextFileErrors(data: BlobPart, fileName: string): void {
    let url: string | null = null;
    try {
      // Crear un blob con el contenido del archivo de texto
      const blob = new Blob([data], { type: "text/plain" });
      url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName || "download.txt";
      a.click();
      this.alertService.showError("Validación fallida, se descargo TXT con los errores generados");
    } catch (error: unknown) {
      console.error("Error al descargar el archivo:", error);
      this.alertService.showError("Error al descargar el archivo");
    } finally {
      // Liberar recursos
      if (url) {
        window.URL.revokeObjectURL(url);
      }
    }
  }
}
