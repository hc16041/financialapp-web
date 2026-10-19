import { Component, ChangeDetectionStrategy, input, output } from "@angular/core";

/**
 * Alerta de error reutilizable y standalone.
 *
 * - Signals de entrada (`input()`) con `ChangeDetectionStrategy.OnPush`.
 * - Basada en `.alert.alert-danger` (Bootstrap 5.3) con `role="alert"`,
 *   ícono `mdi mdi-alert-circle` y botón que emite `retry`.
 */
@Component({
  selector: "app-error-alert",
  standalone: true,
  templateUrl: "./error-alert.component.html",
  styleUrl: "./error-alert.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorAlertComponent {
  /** Mensaje de error a mostrar. */
  message = input.required<string>();
  /** Texto del botón de reintento. */
  retryLabel = input<string>("Reintentar");

  /** Se emite al pulsar el botón de reintento. */
  retry = output<void>();
}
