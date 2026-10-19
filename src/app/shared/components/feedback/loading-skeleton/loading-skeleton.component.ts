import { Component, ChangeDetectionStrategy, computed, input } from "@angular/core";

/**
 * Skeleton de carga reutilizable y standalone.
 *
 * - Signals de entrada (`input()`) con `ChangeDetectionStrategy.OnPush`.
 * - Repite filas `.placeholder.col-12` dentro de `.placeholder-glow`
 *   (utilidades nativas de Bootstrap 5.3) usando el nuevo control flow `@for`.
 */
@Component({
  selector: "app-loading-skeleton",
  standalone: true,
  templateUrl: "./loading-skeleton.component.html",
  styleUrl: "./loading-skeleton.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingSkeletonComponent {
  /** Número de filas placeholder a renderizar. */
  rows = input<number>(5);

  /** IterableView para `@for`; longitud reactiva a `rows()`. */
  protected readonly skeletonRows = computed(() =>
    Array.from({ length: Math.max(0, Math.floor(this.rows())) })
  );
}
