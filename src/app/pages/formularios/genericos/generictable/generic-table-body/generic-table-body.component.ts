import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbHighlight, NgbPopoverModule } from "@ng-bootstrap/ng-bootstrap";
import { TableColumn } from "../table-column.interface";

/**
 * Componente standalone para el body de la tabla genérica
 * Incluye: renderizado de filas, celdas, acciones y vista móvil
 */
@Component({
  selector: "app-generic-table-body",
  standalone: true,
  imports: [CommonModule, NgbHighlight, NgbPopoverModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card-body">
      <!-- Vista de tabla para desktop -->
      <div class="table-responsive d-none d-md-block">
        <table class="table table-gridjs">
          <thead>
            <tr>
              <th
                *ngFor="let column of visibleColumns"
                [ngClass]="{
                  sort: column.sortable,
                  sorted: column.property === sortColumn
                }"
                (click)="column.sortable && onSortClick(column.property)"
              >
                <div class="d-flex justify-content-between align-items-center">
                  <span
                    (click)="column.sortable && onSortClick(column.property)"
                  >
                    {{ column.header }}
                  </span>
                  <i
                    *ngIf="column.sortable"
                    class="bi"
                    [ngClass]="{
                      'bi-arrow-down':
                        sortColumn === column.property &&
                        sortDirection === 'desc',
                      'bi-arrow-up':
                        sortColumn === column.property &&
                        sortDirection === 'asc',
                      'bi-arrow-down text-secondary':
                        sortColumn !== column.property
                    }"
                  ></i>
                </div>

                <!-- Input de filtro para la columna -->
                <div class="position-relative mt-1">
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="Filtrar..."
                    [value]="columnFilters[column.property] || ''"
                    (input)="
                      onColumnFilter(column.property, getInputValue($event))
                    "
                  />

                  <!-- Botón para limpiar filtro -->
                  <span
                    *ngIf="columnFilters[column.property]"
                    class="position-absolute end-0 top-50 translate-middle-y me-1"
                    style="cursor: pointer; z-index: 10;"
                    (click)="
                      clearColumnFilter(column.property);
                      $event.stopPropagation()
                    "
                  >
                    <i class="bi bi-x-circle-fill text-muted"></i>
                  </span>
                </div>
              </th>
              <th *ngIf="showActions">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of paginatedData; trackBy: trackByFn">
              <td *ngFor="let column of visibleColumns">
                <ng-container [ngSwitch]="column.type">
                  <ng-container *ngSwitchCase="'date'">
                    {{
                      getValue(item, column.property)
                        | date : column.format || "yyyy-MM-dd"
                    }}
                  </ng-container>
                  <ng-container *ngSwitchDefault>
                    <ngb-highlight
                      [result]="
                        getValue(item, column.property) ||
                        column.defaultValue ||
                        '-'
                      "
                      [term]="searchTerm"
                    ></ngb-highlight>
                  </ng-container>
                </ng-container>
              </td>
              <td *ngIf="showActions" class="text-center">
                <div class="action-menu-container">
                  <button
                    class="btn btn-icon btn-sm btn-light"
                    [ngbPopover]="popContent"
                    [placement]="'bottom-end'"
                    [container]="'body'"
                    triggers="manual"
                    #p="ngbPopover"
                    (click)="toggleMenu($event, p)"
                  >
                    <i class="mdi mdi-dots-horizontal"></i>
                  </button>

                  <ng-template #popContent>
                    <div class="action-menu-items">
                      <ng-container *ngFor="let action of allowedActions">
                        <button
                          class="menu-item"
                          *ngIf="
                            actionConfig[action] &&
                            (actionConfig[action].bypassPermission ||
                              hasPermission(
                                actionConfig[action].permission!
                              )) &&
                            shouldShowAction(action, item)
                          "
                          (click)="
                            onActionClick(actionConfig[action].action, item);
                            p.close()
                          "
                        >
                          <i
                            class="mdi {{ actionConfig[action].icon }} {{
                              actionConfig[action].color
                            }}"
                          ></i>
                          <span>{{ actionConfig[action].text }}</span>
                        </button>
                      </ng-container>
                    </div>
                  </ng-template>
                </div>
              </td>
            </tr>
            <!-- Fila de sumatoria -->
            <tr *ngIf="sumColumns.length > 0">
              <td *ngFor="let column of visibleColumns">
                <ng-container
                  *ngIf="sumColumns.includes(column.property); else emptyCell"
                >
                  <b>{{ columnSums[column.property] | number : "1.2-2" }}</b>
                </ng-container>
                <ng-template #emptyCell>
                  <span *ngIf="column === visibleColumns[0]"><b>Total</b></span>
                </ng-template>
              </td>
              <td *ngIf="showActions"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Vista de cards para móviles -->
      <div class="d-md-none">
        <div class="row g-3">
          <div
            class="col-12"
            *ngFor="let item of paginatedData; trackBy: trackByFn"
          >
            <div class="card shadow-sm">
              <div class="card-body">
                <div
                  class="d-flex justify-content-between align-items-start mb-2"
                >
                  <h6 class="card-title mb-0">
                    {{
                      visibleColumns[0]
                        ? getValue(item, visibleColumns[0].property)
                        : "-"
                    }}
                  </h6>
                  <div class="action-menu-container" *ngIf="showActions">
                    <button
                      class="btn btn-icon btn-sm btn-light"
                      [ngbPopover]="popContentMobile"
                      [placement]="'bottom-end'"
                      [container]="'body'"
                      triggers="manual"
                      #pMobile="ngbPopover"
                      (click)="toggleMenu($event, pMobile)"
                    >
                      <i class="mdi mdi-dots-horizontal"></i>
                    </button>
                    <ng-template #popContentMobile>
                      <div class="action-menu-items">
                        <ng-container *ngFor="let action of allowedActions">
                          <button
                            class="menu-item"
                            *ngIf="
                              actionConfig[action] &&
                              (actionConfig[action].bypassPermission ||
                                hasPermission(
                                  actionConfig[action].permission!
                                )) &&
                              shouldShowAction(action, item)
                            "
                            (click)="
                              onActionClick(actionConfig[action].action, item);
                              pMobile.close()
                            "
                          >
                            <i
                              class="mdi {{ actionConfig[action].icon }} {{
                                actionConfig[action].color
                              }}"
                            ></i>
                            <span>{{ actionConfig[action].text }}</span>
                          </button>
                        </ng-container>
                      </div>
                    </ng-template>
                  </div>
                </div>
                <div class="row g-2">
                  <div
                    class="col-6"
                    *ngFor="let column of visibleColumns.slice(1)"
                  >
                    <small class="text-muted d-block"
                      >{{ column.header }}:</small
                    >
                    <div class="fw-medium">
                      <ng-container [ngSwitch]="column.type">
                        <ng-container *ngSwitchCase="'date'">
                          {{
                            getValue(item, column.property)
                              | date : column.format || "yyyy-MM-dd"
                          }}
                        </ng-container>
                        <ng-container *ngSwitchDefault>
                          <ngb-highlight
                            [result]="
                              getValue(item, column.property) ||
                              column.defaultValue ||
                              '-'
                            "
                            [term]="searchTerm"
                          ></ngb-highlight>
                        </ng-container>
                      </ng-container>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
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
  @Input() selectOptions: { [key: string]: any[] } = {};
  @Input() selectFields: string[] = [];
  @Input() sumColumns: string[] = [];
  @Input() columnSums: { [key: string]: number } = {};
  @Input() columnFilters: { [key: string]: string } = {};
  @Input() sortColumn: string | null = null;
  @Input() sortDirection: "asc" | "desc" | null = null;
  @Input() validatePermissions: boolean = true;
  @Input() getValueFn!: (item: T, property: string) => any;
  @Input() shouldShowActionFn?: (action: string, item: T) => boolean;

  @Output() actionClick = new EventEmitter<{ action: string; item: T }>();
  @Output() sort = new EventEmitter<string>();
  @Output() columnFilter = new EventEmitter<{
    property: string;
    value: string;
  }>();
  @Output() clearColumnFilterEvent = new EventEmitter<string>();

  private currentPopover: any = null;

  trackByFn(index: number, item: any): number {
    return index;
  }

  getValue(item: T, property: string): any {
    if (this.getValueFn) {
      return this.getValueFn(item, property);
    }
    // Fallback si no se proporciona función
    return (item as any)[property];
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

  toggleMenu(event: Event, popover: any): void {
    event.stopPropagation();
    if (this.currentPopover && this.currentPopover !== popover) {
      this.currentPopover.close();
    }
    if (popover.isOpen()) {
      popover.close();
      this.currentPopover = null;
    } else {
      popover.open();
      this.currentPopover = popover;
    }
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
      console.error("Error al leer permisos:", error);
      return false;
    }
  }
}
