import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NgbHighlight,
  NgbDropdownModule,
} from "@ng-bootstrap/ng-bootstrap";
import {
  BadgeStyle,
  TableColumn,
} from "../table-column.interface";
import { CurrencyUsdPipe } from "src/app/core/pipes/currency-usd.pipe";

/**
 * Componente standalone para el body de la tabla genérica
 * Incluye: renderizado de filas, celdas (badges/currency/date/text),
 * menú de acciones accesible (NgbDropdown), estados de carga y empty state.
 */
@Component({
  selector: "app-generic-table-body",
  standalone: true,
  imports: [CommonModule, NgbHighlight, NgbDropdownModule, CurrencyUsdPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./generic-table-body.component.html",
  styleUrls: ["./generic-table-body.component.scss"],
})
export class GenericTableBodyComponent<T> {
  @Input() visibleColumns: TableColumn[] = [];
  @Input() paginatedData: T[] = [];
  @Input() showActions: boolean = false;
  @Input() allowedActions: string[] = [];
  @Input() actionConfig: {
    [key: string]: {
      icon: string;
      text: string;
      color: string;
      action: string;
      permission?: string;
      bypassPermission?: boolean;
    };
  } = {};
  @Input() searchTerm: string = "";
  @Input() selectOptions: { [key: string]: unknown[] } = {};
  @Input() selectFields: string[] = [];
  @Input() sumColumns: string[] = [];
  @Input() columnSums: { [key: string]: number } = {};
  @Input() columnFilters: { [key: string]: string } = {};
  @Input() sortColumn: string | null = null;
  @Input() sortDirection: "asc" | "desc" | null = null;
  @Input() validatePermissions: boolean = true;
  @Input() getValueFn!: (item: T, property: string) => unknown;
  @Input() shouldShowActionFn?: (action: string, item: T) => boolean;
  @Input() loading: boolean = false;
  @Input() emptyMessage: string = "";
  @Input() showNewRegister: boolean = false;

  @Output() actionClick = new EventEmitter<{ action: string; item: T }>();
  @Output() sort = new EventEmitter<string>();
  @Output() columnFilter = new EventEmitter<{
    property: string;
    value: string;
  }>();
  @Output() clearColumnFilterEvent = new EventEmitter<string>();
  @Output() newClick = new EventEmitter<void>();

  trackByFn(index: number, item: T): number {
    return index;
  }

  getValue(item: T, property: string): unknown {
    if (this.getValueFn) {
      return this.getValueFn(item, property);
    }
    // Fallback si no se proporciona función
    const itemRecord = item as Record<string, unknown>;
    return itemRecord[property];
  }

  /**
   * Obtiene el valor crudo (sin transformaciones de getValue) de una propiedad.
   * Soporta propiedades anidadas separadas por punto (ej. "user.name").
   * @param item El item del cual obtener el valor.
   * @param property La propiedad a obtener.
   */
  getRawValue(item: T, property: string): unknown {
    return property.split(".").reduce<unknown>((obj, prop: string) => {
      if (obj && typeof obj === "object") {
        return (obj as Record<string, unknown>)[prop];
      }
      return undefined;
    }, item as unknown);
  }

  /**
   * Obtiene el valor de una propiedad y lo convierte a string de forma segura.
   * @param item El item del cual obtener el valor.
   * @param property La propiedad a obtener.
   * @returns El valor convertido a string.
   */
  getValueAsString(item: T, property: string): string {
    const value = this.getValue(item, property);
    if (value === null || value === undefined) {
      return "";
    }
    if (typeof value === "string") {
      return value;
    }
    if (typeof value === "number" || typeof value === "boolean") {
      return String(value);
    }
    // Para objetos, intentar convertir a JSON o usar toString
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }

  /**
   * Obtiene el valor de una propiedad como Date para usar con el pipe date.
   * @param item El item del cual obtener el valor.
   * @param property La propiedad a obtener.
   * @returns El valor convertido a Date, string o number, o null si no es convertible.
   */
  getValueAsDate(
    item: T,
    property: string
  ): string | number | Date | null | undefined {
    const value = this.getValue(item, property);
    if (value === null || value === undefined) {
      return null;
    }
    if (value instanceof Date) {
      return value;
    }
    if (typeof value === "string" || typeof value === "number") {
      return value;
    }
    // Intentar convertir a Date si es posible
    if (typeof value === "object" && "toString" in value) {
      const dateStr = value.toString();
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
    return null;
  }

  /**
   * Convierte un valor a número de forma segura (solo finitos).
   * @param value Valor a convertir.
   * @returns Número finito o null si no es convertible.
   */
  toNumber(value: unknown): number | null {
    if (typeof value === "number" && isFinite(value)) {
      return value;
    }
    if (value === null || value === undefined || value === "") {
      return null;
    }
    const num = Number(value);
    return isFinite(num) ? num : null;
  }

  /**
   * Interpreta un valor como booleano (true/1/"1"/"true"/"Activo"/"Sí").
   * @param value Valor a interpretar.
   */
  toBoolean(value: unknown): boolean {
    return (
      value === true ||
      value === 1 ||
      value === "1" ||
      value === "true" ||
      value === "True" ||
      value === "Sí" ||
      value === "sí" ||
      value === "SI" ||
      value === "Activo" ||
      value === "activo"
    );
  }

  /**
   * Determina si una columna es numérica/monetaria para alinearla a la derecha.
   * @param column Columna evaluada.
   */
  isNumericColumn(column: TableColumn): boolean {
    return (
      column.align === "right" ||
      column.type === "number" ||
      column.type === "currency"
    );
  }

  /**
   * Clases CSS para las celdas según el tipo de columna.
   * @param column Columna evaluada.
   */
  getCellClasses(column: TableColumn): Record<string, boolean> {
    return {
      "text-end": this.isNumericColumn(column),
    };
  }

  /**
   * Calcula el badge semántico de una celda según el tipo de columna.
   * Prioridad: `badgeConfig` (por valor o booleano) → `activo` → `boolean`.
   * @param item Item de la fila.
   * @param column Columna evaluada.
   */
  getBadgeForColumn(item: T, column: TableColumn): BadgeStyle | null {
    const raw = this.getRawValue(item, column.property);

    // 1. badgeConfig explícito (claves por valor o booleanas true/false)
    if (column.badgeConfig) {
      const config = column.badgeConfig;
      const displayValue = this.getValueAsString(item, column.property);
      const rawValue = config[String(raw)];
      if (rawValue) {
        return rawValue;
      }
      const displayMatch = config[displayValue];
      if (displayMatch) {
        return displayMatch;
      }
      const bool = this.toBoolean(raw);
      if (bool && config["true"]) {
        return config["true"];
      }
      if (!bool && config["false"]) {
        return config["false"];
      }
    }

    // 2. Columna "activo" por convención
    if (column.property.toLowerCase() === "activo") {
      return this.toBoolean(raw)
        ? { label: "Activo", variant: "success" }
        : { label: "Inactivo", variant: "danger" };
    }

    // 3. Booleano genérico
    if (column.type === "boolean") {
      return this.toBoolean(raw)
        ? { label: "Sí", variant: "success" }
        : { label: "No", variant: "danger" };
    }

    return null;
  }

  /**
   * Clases Bootstrap del badge según la variante semántica (sin hex).
   * @param variant Variante del badge.
   */
  badgeVariantClass(variant: string): string {
    switch (variant) {
      case "success":
        return "bg-success-subtle text-success";
      case "danger":
        return "bg-danger-subtle text-danger";
      case "warning":
        return "bg-warning-subtle text-warning";
      case "info":
        return "bg-info-subtle text-info";
      default:
        return "bg-secondary-subtle text-secondary";
    }
  }

  /**
   * Decide si una acción debe renderizarse en el menú de la fila.
   * Combina `actionConfig`, permisos y `shouldShowAction`.
   * @param action Acción evaluada.
   * @param item Item de la fila.
   */
  shouldRenderAction(action: string, item: T): boolean {
    const config = this.actionConfig[action];
    if (!config) {
      return false;
    }
    const hasPermission =
      config.bypassPermission || this.hasPermission(config.permission!);
    return hasPermission && this.shouldShowAction(action, item);
  }

  shouldShowAction(action: string, item: T): boolean {
    if (this.shouldShowActionFn) {
      return this.shouldShowActionFn(action, item);
    }
    return true;
  }

  onSortClick(column: string): void {
    this.sort.emit(column);
  }

  onActionClick(action: string, item: T): void {
    this.actionClick.emit({ action, item });
  }

  onColumnFilter(property: string, value: string): void {
    this.columnFilter.emit({ property, value });
  }

  clearColumnFilter(property: string): void {
    this.clearColumnFilterEvent.emit(property);
  }

  onNewClick(): void {
    this.newClick.emit();
  }

  getInputValue(event: Event): string {
    return (event.target && (event.target as HTMLInputElement).value) || "";
  }

  hasPermission(permissionKey: string): boolean {
    if (!this.validatePermissions) return true;

    try {
      const botones = JSON.parse(sessionStorage.getItem("botones") || "{}");
      return botones?.[permissionKey] === true;
    } catch (error) {
      return false;
    }
  }
}