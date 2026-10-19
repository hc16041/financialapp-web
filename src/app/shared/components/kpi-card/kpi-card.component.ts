import { Component, ChangeDetectionStrategy, computed, input } from "@angular/core";
import { CurrencyUsdPipe } from "src/app/core/pipes/currency-usd.pipe";
import { KpiVariant } from "./kpi-card.model";

/**
 * Tarjeta de resumen (KPI) reutilizable y standalone.
 *
 * - Signals de entrada (`input()`) con `ChangeDetectionStrategy.OnPush`.
 * - Formatea valores monetarios con `fpCurrency` (`CurrencyUsdPipe`) cuando
 *   `isCurrency` es `true` (SPEC-06 §2.1).
 * - Estados: `loading` (skeleton con `placeholder`) y `emptyLabel` cuando el
 *   valor es `null`/`undefined`.
 * - Variantes Bootstrap 5.3 (`bg-*-subtle` / `text-*`) tokenizadas (`--vz-*`).
 */
@Component({
  selector: "app-kpi-card",
  standalone: true,
  imports: [CurrencyUsdPipe],
  templateUrl: "./kpi-card.component.html",
  styleUrl: "./kpi-card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpiCardComponent {
  /** Título de la tarjeta (o clave i18n ya resuelta por el padre). */
  label = input.required<string>();
  /** Valor numérico; `null`/`undefined` renderiza `emptyLabel()`. */
  value = input<number | null>(null);
  /** Clases `mdi` del ícono. */
  icon = input<string>("mdi mdi-information-outline");
  /** Variante semántica (borde, texto e ícono). */
  variant = input<KpiVariant>("primary");
  /** `true` formatea el valor con `fpCurrency` (USD 1.2-2). */
  isCurrency = input<boolean>(false);
  /** Texto opcional de tendencia (ej: "+12.5%"). */
  trend = input<string>("");
  /** Dirección de la tendencia (icono y color). */
  trendDirection = input<"up" | "down">("up");
  /** `true` muestra un skeleton en lugar del valor. */
  loading = input<boolean>(false);
  /** Texto del estado vacío. */
  emptyLabel = input<string>("—");

  protected readonly hasValue = computed(
    () =>
      this.value() !== null &&
      this.value() !== undefined &&
      Number.isFinite(this.value() as number)
  );

  protected readonly trendIcon = computed(() =>
    this.trendDirection() === "up"
      ? "mdi mdi-trending-up"
      : "mdi mdi-trending-down"
  );
}