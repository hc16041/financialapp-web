// table-column.interface.ts

export type TableColumnType =
  | "text"
  | "date"
  | "number"
  | "currency"
  | "badge"
  | "boolean";

export type BadgeVariant = "success" | "danger" | "warning" | "info";

export interface BadgeStyle {
  label: string;
  variant: BadgeVariant;
}

export interface TableColumn {
  property: string;
  header: string;
  sortable?: boolean;
  type?: TableColumnType;
  format?: string;
  defaultValue?: string;
  hidden?: boolean; // Nueva propiedad para ocultar columnas
  align?: "left" | "center" | "right"; // Nueva: alineación (numeric -> right)
  badgeConfig?: {
    // Nuevo: badges semánticos por estado booleano o por valor
    true?: BadgeStyle;
    false?: BadgeStyle;
    [key: string]: BadgeStyle | undefined;
  };
}