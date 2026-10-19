import {
  TableColumn,
  TableColumnType,
} from "../pages/formularios/genericos/generictable/table-column.interface";

/**
 * Patrón de claves de campos monetarios (decimal(18,2)).
 * Se usa para tipar columnas como `currency` y alinearlas a la derecha
 * con el pipe `fpCurrency`.
 */
const CURRENCY_KEY_PATTERN =
  /(amount|monto|commission|comision|balance|saldo|limit|total|precio|price|fee|tarifa)/i;

function isCurrencyKey(key: string): boolean {
  return CURRENCY_KEY_PATTERN.test(key);
}

/**
 * Genera un array de columnas para una tabla basada en las propiedades de un
 * objeto (DTO). El tipo de cada columna se determina automaticamente basado
 * en el valor de la propiedad correspondiente en el DTO.
 *
 * @param {T} dto El objeto (DTO) que se utiliza para generar las columnas.
 * @returns {TableColumn[]} Un array de objetos que representan las columnas
 *   de la tabla. Cada objeto tiene las siguientes propiedades:
 *
 *   - `property`: El nombre de la propiedad correspondiente en el DTO.
 *   - `header`: El nombre amigable para el encabezado de la columna.
 *   - `sortable`: Un booleano que indica si la columna es ordenable o no.
 *   - `type`: El tipo de la columna, que puede ser "number", "currency",
 *     "date", "boolean" o "text".
 *   - `format`: Un string que indica el formato para la columna, si aplica.
 *   - `defaultValue`: Un valor predeterminado para las celdas vacías.
 *   - `align`: Alineación por defecto (numéricas/monetarias → "right").
 */
export function generateTableColumns<T extends { [key: string]: any }>(
  dto: T
): TableColumn[] {
  return Object.entries(dto).map(([key, value]) => {
    // Determina el tipo de la columna basado en el valor inicial del DTO
    let columnType: TableColumnType | undefined;
    if (value instanceof Date) {
      columnType = "date";
    } else if (typeof value === "number") {
      columnType = isCurrencyKey(key) ? "currency" : "number";
    } else if (typeof value === "boolean") {
      columnType = "boolean";
    } else {
      columnType = "text"; // Predeterminado para strings u otros valores
    }

    const isNumeric =
      columnType === "number" || columnType === "currency";

    return {
      property: key,
      header: formatHeader(key), // Formato amigable para los encabezados
      sortable: true, // Todas las columnas son ordenables por defecto
      type: columnType,
      format: columnType === "date" ? "yyyy-MM-dd" : undefined,
      defaultValue: "-", // Valor predeterminado para celdas vacías
      align: isNumeric ? "right" : undefined,
    };
  });
}

/**
 * Convierte un string que representa una propiedad de un DTO en un
 * string amigable para ser utilizado como encabezado de una columna
 * en una tabla.
 *
 * @param {string} property El nombre de la propiedad del DTO.
 * @returns {string} El nombre amigable para el encabezado de la columna.
 */
export function formatHeader(property: string): string {
  // Convierte nombres como "NIT_PERSONA" a "Nit Persona"
  return property
    .replace(/_/g, " ") // Reemplaza "_" por espacio
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitaliza cada palabra
}