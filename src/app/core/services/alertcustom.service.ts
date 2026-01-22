import { Injectable, inject } from "@angular/core";
import Swal, { SweetAlertIcon } from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class AlertcustomService {
  // No necesita inyección de dependencias, pero mantenemos el patrón consistente

  /**
   * Muestra una alerta usando SweetAlert2 con configuración personalizada.
   *
   * @param title Título de la alerta.
   * @param text Contenido de la alerta.
   * @param icon Tipo de icono; por defecto `"info"`.
   * @param position Posición en pantalla; por defecto `"center"`.
   * @param timer Duración en ms; por defecto `2000`.
   * @param showConfirmButton Si se muestra botón de confirmación; por defecto `false`.
   */
  showAlert(
    title: string,
    text: string,
    icon: SweetAlertIcon = "info",
    position: "top-end" | "center" | "bottom-end" = "center",
    timer: number = 2000,
    showConfirmButton: boolean = false
  ): void {
    Swal.fire({
      title,
      text,
      icon,
      position,
      timer,
      showConfirmButton,
    });
  }

  /**
   * Muestra una alerta de éxito.
   *
   * @param message Mensaje a mostrar.
   * @param title Título de la alerta; por defecto `"Success"`.
   */
  showSuccess(message: string, title: string = "Success") {
    this.showAlert(title, message, "success", "center");
  }

  showError(message: string, title: string = "Error") {
    this.showAlert(title, message, "error", "center", 0, true);
  }

  /**
   * Muestra una alerta de advertencia.
   *
   * @param message Mensaje a mostrar.
   * @param title Título; por defecto `"Warning"`.
   */
  showWarning(message: string, title: string = "Warning") {
    this.showAlert(title, message, "warning");
  }

  /**
   * Muestra una alerta informativa.
   *
   * @param message Mensaje a mostrar.
   * @param title Título; por defecto `"Information"`.
   */
  showInfo(message: string, title: string = "Information") {
    this.showAlert(title, message, "info");
  }

  /**
   * Muestra un cuadro de confirmación.
   *
   * @param message Mensaje de confirmación.
   * @param title Título del diálogo; por defecto `"Confirmación"`.
   * @returns Promesa que resuelve `true` si el usuario confirma, `false` en caso contrario.
   */
  confirm(message: string, title: string = "Confirmación"): Promise<boolean> {
    return Swal.fire({
      title,
      html: message,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then(result => result.isConfirmed);
  }

}
