/**
 * Modelo del componente KPI compartido (`app-kpi-card`).
 *
 * Contrato de datos para construir filas de resumen en los módulos CRUD.
 * Los módulos calculan el `value` con `computed` sobre sus signals y pasan
 * cada tarjeta con su `variant`/`icon` (SPEC-06 §2.2).
 */

export type KpiVariant =
  | "primary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "secondary";

export interface KpiDefinition {
  /** Identificador único de la tarjeta (útil como `track` en `@for`). */
  key: string;
  /** Texto del título de la tarjeta. */
  label: string;
  /** Valor numérico; `null` para mostrar el estado vacío (`emptyLabel`). */
  value: number | null;
  /** Clases `mdi` del ícono (ej: `mdi mdi-credit-card-outline`). */
  icon: string;
  /** Variante Bootstrap/tokenizada (define borde, texto e ícono). */
  variant: KpiVariant;
  /** `true` para formatear con `fpCurrency` (USD 1.2-2). */
  isCurrency?: boolean;
  /** `true` mientras se cargan datos (muestra skeleton). */
  loading?: boolean;
  /** Texto del estado vacío (por defecto "—"). */
  emptyLabel?: string;
}