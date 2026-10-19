/**
 * Utilidades de formato monetario para el sistema de finanzas personales.
 *
 * Convención del dominio: todo monto monetario se expresa como
 * `decimal(18,2)` en el backend y se renderiza en USD con **2 decimales
 * fijos** (`1.2-2`), equivalente al pipe `currency:'USD':'symbol':'1.2-2'`.
 */

export const USD_CURRENCY_CODE = "USD";
export const USD_DIGITS_INFO = "1.2-2";
export const USD_LOCALE = "en-US";

/** Formateador reutilizado para USD (creado una única vez por rendimiento). */
const USD_FORMATTER = new Intl.NumberFormat(USD_LOCALE, {
  style: "currency",
  currency: USD_CURRENCY_CODE,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Verifica que un valor sea un número finito válido para formatear.
 * @param value el valor a validar.
 */
function isFiniteNumber(value: number | null | undefined): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

/**
 * Renderiza un monto decimal(18,2) en la moneda indicada con 2 decimales
 * fijos (por defecto USD). Ejemplo: `1234.5` → `"$1,234.50"`.
 *
 * @param value monto a formatear.
 * @param currency código ISO de moneda (por defecto USD).
 * @returns cadena formateada, o cadena vacía si el valor no es válido.
 */
export function formatMoney(
  value: number | null | undefined,
  currency: string = USD_CURRENCY_CODE
): string {
  if (!isFiniteNumber(value)) {
    return "";
  }

  if (currency === USD_CURRENCY_CODE) {
    return USD_FORMATTER.format(value);
  }

  return new Intl.NumberFormat(USD_LOCALE, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Renderiza un monto con signo explícito (`+$` / `-$`).
 * Ejemplo: `1234.5` → `"+$1,234.50"`, `-1234.5` → `"-$1,234.50"`.
 *
 * @param value monto a formatear.
 * @param currency código ISO de moneda (por defecto USD).
 * @returns cadena formateada con signo, o cadena vacía si el valor no es válido.
 */
export function formatMoneySigned(
  value: number | null | undefined,
  currency: string = USD_CURRENCY_CODE
): string {
  if (!isFiniteNumber(value)) {
    return "";
  }

  const sign = value >= 0 ? "+" : "-";
  return `${sign}${formatMoney(Math.abs(value), currency)}`;
}
