import { Component, ChangeDetectionStrategy, input, output } from "@angular/core";

/**
 * Estado vacío reutilizable y standalone.
 *
 * - Signals de entrada (`input()`) con `ChangeDetectionStrategy.OnPush`.
 * - Render centrado: ícono `mdi`, título, mensaje opcional y CTA opcional.
 * - El botón CTA solo se muestra cuando `actionLabel()` tiene valor y emite
 *   el output `action`.
 */
@Component({
  selector: "app-empty-state",
  standalone: true,
  templateUrl: "./empty-state.component.html",
  styleUrl: "./empty-state.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
  /** Clases `mdi` del ícono. */
  icon = input<string>("mdi mdi-inbox-outline");
  /** Título del estado vacío. */
  title = input.required<string>();
  /** Mensaje descriptivo opcional. */
  message = input<string>("");
  /** Etiqueta del CTA; vacío oculta el botón. */
  actionLabel = input<string>("");

  /** Se emite al pulsar el CTA. */
  action = output<void>();
}
