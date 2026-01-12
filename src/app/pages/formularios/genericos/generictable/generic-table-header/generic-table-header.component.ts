import { Component, Input, Output, EventEmitter, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

/**
 * Componente standalone para el header de la tabla genérica
 * Incluye: título, botones de acción, búsqueda y filtros
 */
@Component({
  selector: "app-generic-table-header",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card-header">
      <!-- Primera fila: Título y botones principales -->
      <div class="row mb-3">
        <div class="col-12">
          <div
            class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3"
          >
            <h4 class="card-title mb-0">{{ title }}</h4>
            <div class="d-flex flex-wrap gap-2">
              <button
                *ngIf="showNewRegister"
                class="btn btn-outline-info btn-sm waves-effect waves-light"
                (click)="onNewClick()"
                id="btn_insertar"
              >
                <i class="mdi mdi-plus d-md-none"></i>
                <span class="d-none d-md-inline">Nuevo Registro</span>
                <span class="d-md-none">Nuevo</span>
              </button>
              <button
                *ngIf="showXmlDownload && hasPermission('descargaXml')"
                class="btn btn-outline-warning btn-sm waves-effect waves-light d-none d-md-inline-flex"
                (click)="onXmlDownloadClick()"
                id="btn_descarga_xml"
              >
                Descargar XML
              </button>
              <button
                *ngIf="showExcelDownload && hasPermission('descargaExcel')"
                class="btn btn-outline-success btn-sm waves-effect waves-light d-none d-md-inline-flex"
                (click)="onExcelDownloadClick()"
                id="btn_descarga_excel"
              >
                Descargar Excel
              </button>
              <button
                *ngIf="showTextoDownload && hasPermission('descargaTextoPlano')"
                class="btn btn-outline-secondary btn-sm waves-effect waves-light d-none d-lg-inline-flex"
                (click)="onTextoDownloadClick()"
                id="btn_descarga_texto_plano"
              >
                Descargar Texto
              </button>
              <button
                *ngIf="showPdfDownload && hasPermission('descargaPdf')"
                class="btn btn-outline-danger btn-sm waves-effect waves-light d-none d-lg-inline-flex"
                (click)="onPdfDownloadClick()"
                id="btn_descarga_pdf"
              >
                Descargar PDF
              </button>
              <button
                *ngIf="
                  showReporteDownload && hasPermission('descargaExcelPlantilla')
                "
                class="btn btn-outline-dark btn-sm waves-effect waves-light d-none d-lg-inline-flex"
                (click)="onReporteDownloadClick()"
                id="btn_descarga_excel_plantilla"
              >
                Descargar Reporte
              </button>
              <button
                class="btn btn-outline-info btn-sm waves-effect waves-light"
                (click)="onToggleShowAllClick()"
              >
                <span class="d-none d-md-inline">{{
                  showAll ? "Ver menos" : "Ver todo"
                }}</span>
                <span class="d-md-none">{{ showAll ? "Menos" : "Todo" }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Segunda fila: Filtros y búsqueda -->
      <div class="row g-3">
        <div class="col-12">
          <div
            class="d-flex flex-column flex-md-row gap-3 align-items-stretch align-items-md-center"
          >
            <!-- Filtro de estado -->
            <div
              *ngIf="showStatusFilter"
              class="flex-shrink-0"
              style="min-width: 150px;"
            >
              <select
                class="form-select form-select-sm"
                (change)="onStatusChange($event)"
                [disabled]="!hasData"
              >
                <option
                  *ngFor="let opt of statusFilterOptions"
                  [value]="opt.value === null ? 'null' : opt.value"
                >
                  {{ opt.label }}
                </option>
              </select>
            </div>

            <!-- Filtro de rango de fechas -->
            <div *ngIf="showDateRangeFilter" class="flex-grow-1">
              <div
                class="d-flex flex-column flex-md-row gap-2 align-items-stretch align-items-md-center"
              >
                <label
                  class="form-label mb-0 d-none d-md-inline-block me-2"
                  style="white-space: nowrap;"
                >
                  {{ dateRangeLabel }}:
                </label>
                <div class="d-flex gap-2 align-items-center flex-grow-1">
                  <input
                    type="date"
                    class="form-control form-control-sm"
                    [(ngModel)]="startDate"
                    placeholder="Fecha inicio"
                  />
                  <span class="text-muted d-none d-md-inline">-</span>
                  <input
                    type="date"
                    class="form-control form-control-sm"
                    [(ngModel)]="endDate"
                    placeholder="Fecha fin"
                  />
                  <button
                    class="btn btn-primary btn-sm flex-shrink-0"
                    (click)="onDateRangeSearchClick()"
                    [disabled]="!startDate || !endDate"
                  >
                    <i class="bi bi-search d-md-none"></i>
                    <span class="d-none d-md-inline">Buscar</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Búsqueda -->
            <div
              *ngIf="searchEnabled"
              class="flex-shrink-0"
              style="min-width: 200px;"
            >
              <input
                type="text"
                class="form-control form-control-sm search"
                placeholder="Buscar..."
                (input)="onSearchInput($event)"
              />
            </div>

            <ng-content select="[tableActions]"></ng-content>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
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
