import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

/**
 * Componente standalone para el header de la tabla genérica
 * Incluye: título, botones de acción, barra de filtros colapsable y búsqueda.
 */
@Component({
  selector: "app-generic-table-header",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./generic-table-header.component.html",
  styleUrls: ["./generic-table-header.component.scss"],
})
export class GenericTableHeaderComponent {
  @Input() title: string = "Tabla";
  @Input() showNewRegister: boolean = false;
  @Input() showXmlDownload: boolean = false;
  @Input() showExcelDownload: boolean = false;
  @Input() showTextoDownload: boolean = false;
  @Input() showPdfDownload: boolean = false;
  @Input() showReporteDownload: boolean = false;
  @Input() showAll: boolean = false;
  @Input() searchEnabled: boolean = true;
  @Input() showStatusFilter: boolean = false;
  @Input() showDateRangeFilter: boolean = false;
  @Input() dateRangeLabel: string = "Rango de fechas";
  @Input() hasData: boolean = false;
  @Input() validatePermissions: boolean = true;
  @Input() startDate: string = "";
  @Input() endDate: string = "";

  @Output() newClick = new EventEmitter<void>();
  @Output() xmlDownloadClick = new EventEmitter<void>();
  @Output() excelDownloadClick = new EventEmitter<void>();
  @Output() textoDownloadClick = new EventEmitter<void>();
  @Output() pdfDownloadClick = new EventEmitter<void>();
  @Output() reporteDownloadClick = new EventEmitter<void>();
  @Output() toggleShowAllClick = new EventEmitter<void>();
  @Output() search = new EventEmitter<string>();
  @Output() statusChange = new EventEmitter<number | null>();
  @Output() dateRangeSearch = new EventEmitter<{
    startDate: string;
    endDate: string;
  }>();

  statusFilterOptions = [
    { value: null, label: "Todos" },
    { value: 1, label: "Activos" },
    { value: 0, label: "Inactivos" },
  ];

  /** Barra de filtros colapsable: abierta en desktop, cerrada en móvil. */
  filtersExpanded: boolean =
    typeof window === "undefined" ? true : window.innerWidth >= 768;

  /** Indica si existe al menos un filtro (estado, fechas o búsqueda). */
  get hasFilters(): boolean {
    return this.showStatusFilter || this.showDateRangeFilter || this.searchEnabled;
  }

  toggleFilters(): void {
    this.filtersExpanded = !this.filtersExpanded;
  }

  onNewClick(): void {
    this.newClick.emit();
  }

  onXmlDownloadClick(): void {
    this.xmlDownloadClick.emit();
  }

  onExcelDownloadClick(): void {
    this.excelDownloadClick.emit();
  }

  onTextoDownloadClick(): void {
    this.textoDownloadClick.emit();
  }

  onPdfDownloadClick(): void {
    this.pdfDownloadClick.emit();
  }

  onReporteDownloadClick(): void {
    this.reporteDownloadClick.emit();
  }

  onToggleShowAllClick(): void {
    this.toggleShowAllClick.emit();
  }

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.search.emit(value);
  }

  onStatusChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.statusChange.emit(value === "null" ? null : Number(value));
  }

  onDateRangeSearchClick(): void {
    if (this.startDate && this.endDate) {
      this.dateRangeSearch.emit({
        startDate: this.startDate,
        endDate: this.endDate,
      });
    }
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