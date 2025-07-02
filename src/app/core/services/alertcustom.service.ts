import { Injectable } from "@angular/core";
import Swal, { SweetAlertIcon } from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class AlertcustomService {
  constructor() {}

  /**
   * Displays an alert with specified parameters using SweetAlert2.
   *
   * @param title - The title of the alert.
   * @param text - The text content of the alert.
   * @param icon - The icon type for the alert, defaults to "info".
   * @param position - The position of the alert on the screen, defaults to "center".
   * @param timer - The duration (in milliseconds) the alert should be displayed, defaults to 2000.
   * @param showConfirmButton - Whether to show a confirm button, defaults to false.
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
   * Displays a success alert with the specified message and title.
   *
   * @param message - The message to display in the alert.
   * @param title - The title of the alert, defaults to "Success".
   */

  showSuccess(message: string, title: string = "Success") {
    this.showAlert(title, message, "success", "center");
  }

  /**
   * Displays an error alert with the specified message and title.
   *
   * @param message - The message to display in the alert.
   * @param title - The title of the alert, defaults to "Error".
   */
  showError(message: string, title: string = "Error") {
    this.showAlert(title, message, "error", "center", 0, true);
  }

  /**
   * Displays a warning alert with the specified message and title.
   *
   * @param message - The message to display in the alert.
   * @param title - The title of the alert, defaults to "Warning".
   */
  showWarning(message: string, title: string = "Warning") {
    this.showAlert(title, message, "warning");
  }

  /**
   * Displays an information alert with the specified message and title.
   *
   * @param message - The message to display in the alert.
   * @param title - The title of the alert, defaults to "Information".
   */
  showInfo(message: string, title: string = "Information") {
    this.showAlert(title, message, "info");
  }

  /**
   * Displays a confirmation dialog and returns a promise with the result.
   *
   * @param message - The confirmation message.
   * @param title - The dialog title, defaults to "Confirmación".
   * @returns Promise<boolean> - Resolves to true if confirmed, false otherwise.
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
