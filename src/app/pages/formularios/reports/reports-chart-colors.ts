/**
 * Paleta de colores para ApexCharts basada en tokens del design system
 * (SPEC-07 §2.1).
 *
 * Los gráficos NO usan hex hardcodeados: cada color referencia un token CSS
 * (`var(--vz-*)` / `var(--fp-*)`) que se resuelve a un valor concreto en
 * runtime mediante `getComputedStyle`, por lo que se adaptan automáticamente
 * al tema claro/oscuro (mismo mecanismo que `dashboard.component.ts`).
 */

/** Paleta semántica principal para series de ingresos/gastos/balance. */
export const REPORT_CHART_COLORS = [
  "var(--vz-success)", // verde — ingresos
  "var(--vz-danger)", // rojo — gastos/retiros
  "var(--fp-primary)", // primario (marca)
  "var(--vz-warning)", // ámbar
  "var(--vz-info)", // azul
];

/**
 * Paleta para categorías (comercios / donuts). Reutiliza los tokens
 * semánticos y repite el ciclo si el número de categorías excede la
 * longitud de la paleta.
 */
export const CATEGORY_PALETTE = [
  "var(--fp-primary)",
  "var(--vz-success)",
  "var(--vz-danger)",
  "var(--vz-warning)",
  "var(--vz-info)",
  "var(--vz-secondary)",
];

/**
 * Resuelve un array de tokens CSS a valores concretos para los gráficos,
 * leyendo `getComputedStyle`. Idéntico a `dashboard.component.ts`.
 *
 * @param tokens tokens CSS, p. ej. `["--vz-success", "--vz-danger"]`.
 * @returns array con los colores resueltos.
 */
export function resolveChartColors(tokens: string[]): string[] {
  return tokens.map((value) => {
    const token = value.replace(" ", "");
    if (token.indexOf(",") === -1) {
      const color = getComputedStyle(
        document.documentElement
      ).getPropertyValue(token);
      return color ? color.replace(" ", "") : token;
    }
    const parts = token.split(",");
    if (parts.length === 2) {
      const rgba = getComputedStyle(
        document.documentElement
      ).getPropertyValue(parts[0]);
      return "rgba(" + rgba + "," + parts[1] + ")";
    }
    return token;
  });
}

/** Resolución runtime de la paleta semántica principal. */
export function getReportChartColors(): string[] {
  return resolveChartColors(REPORT_CHART_COLORS);
}

/** Resolución runtime de la paleta de categorías. */
export function getCategoryPalette(): string[] {
  return resolveChartColors(CATEGORY_PALETTE);
}

/**
 * Devuelve `count` colores de la paleta de categorías (ciclando si hace
 * falta para cubrir más categorías que colores hay definidos).
 */
export function generateCategoryColors(count: number): string[] {
  if (count <= 0) return [];
  const resolved = getCategoryPalette();
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    colors.push(resolved[i % resolved.length]);
  }
  return colors;
}