// components/generic-table/generic-table.component.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  HostListener,
  SimpleChanges,
  OnChanges,
  output,
  ChangeDetectorRef,
} from "@angular/core";
import { TableColumn } from "./table-column.interface";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { GenericModalDialogComponent } from "../generic-modal-dialog/generic-modal-dialog.component";
import { debounceTime, distinctUntilChanged, Subject } from "rxjs";
import { GenericTableHeaderComponent } from "./generic-table-header/generic-table-header.component";
import { GenericTableBodyComponent } from "./generic-table-body/generic-table-body.component";
import { GenericTablePaginationComponent } from "./generic-table-pagination/generic-table-pagination.component";

@Component({
  selector: "app-generic-table",
  template: `
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <!-- Header Component -->
          <app-generic-table-header
            [title]="title"
            [showNewRegister]="showNewRegister"
            [showXmlDownload]="showXmlDownload"
            [showExcelDownload]="showExcelDownload"
            [showTextoDownload]="showTextoDownload"
            [showPdfDownload]="showPdfDownload"
            [showReporteDownload]="showReporteDownload"
            [showAll]="showAll"
            [searchEnabled]="searchEnabled"
            [showStatusFilter]="showStatusFilter"
            [showDateRangeFilter]="showDateRangeFilter"
            [dateRangeLabel]="dateRangeLabel"
            [hasData]="data.length > 0"
            [validatePermissions]="validatePermissions"
            [startDate]="startDate"
            [endDate]="endDate"
            (newClick)="onNew()"
            (xmlDownloadClick)="onXmlDownload()"
            (excelDownloadClick)="onExcelDownload()"
            (textoDownloadClick)="onTextoDownload()"
            (pdfDownloadClick)="onPdfDownload()"
            (reporteDownloadClick)="onRporteDownload()"
            (toggleShowAllClick)="toggleShowAll()"
            (search)="onSearchFromHeader($event)"
            (statusChange)="onStatusChangeFromHeader($event)"
            (dateRangeSearch)="onDateRangeSearchFromHeader($event)"
          >
            <ng-content select="[tableActions]"></ng-content>
          </app-generic-table-header>

          <!-- Body Component -->
          <app-generic-table-body
            [visibleColumns]="visibleColumns"
            [paginatedData]="paginatedData"
            [showActions]="showActions"
            [allowedActions]="allowedActions"
            [actionConfig]="actionConfig"
            [searchTerm]="searchTerm"
            [selectOptions]="selectOptions"
            [selectFields]="selectFields"
            [sumColumns]="sumColumns"
            [columnSums]="columnSums"
            [columnFilters]="columnFilters"
            [sortColumn]="sortColumn"
            [sortDirection]="sortDirection"
            [validatePermissions]="validatePermissions"
            [getValueFn]="getValue.bind(this)"
            [shouldShowActionFn]="shouldShowAction.bind(this)"
            (actionClick)="onActionClick($event.action, $event.item)"
            (sort)="onSort($event)"
            (columnFilter)="onColumnFilter($event.property, $event.value)"
            (clearColumnFilterEvent)="clearColumnFilter($event)"
          ></app-generic-table-body>

          <!-- Pagination Component -->
          <app-generic-table-pagination
            *ngIf="!showAll"
            [totalItems]="totalItems"
            [currentPage]="currentPage"
            [pageSize]="pageSize"
            [maxPages]="maxPages"
            [showAll]="showAll"
            [startIndex]="startIndex"
            [endIndex]="endIndex"
            (pageChange)="onPageChange($event)"
          ></app-generic-table-pagination>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./generictable.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class GenericTableComponent<T> implements OnChanges {
  @Input() title: string = "Tabla"; // Título de la tabla
  @Input() columns: TableColumn[] = []; // Columnas de la tabla
  @Input() data: T[] = []; // Datos de la tabla
  @Input() pageSize: number = 10; // Tamaño de página
  @Input() entityDTO: any; // 📌 Recibimos el DTO desde el componente padre
  @Input() hiddenColumns: string[] = []; // Nueva propiedad para columnas ocultas
  @Input() selectOptions: { [key: string]: any[] } = {}; // Recibe opciones para los selects
  @Input() excludedFields: string[] = []; // Recibe desde padre los campos a excluir
  @Input() readonlyFields: string[] = []; // Recibe campos readonly desde el padre
  @Input() disabledFields: string[] = []; // Recibe campos disabled desde el padre
  @Input() fieldsOrder: string[] = []; // Orden personalizado de campos
  @Input() selectFields: string[] = []; // Recibe campos select desde el padre
  @Input() requiredFields: string[] = []; // Recibe campos requeridos desde el padre
  @Input() allowedActions: string[] = []; // Acciones permitidas desde el padre
  @Input() actionsTemplate?: any; // Plantilla para las acciones
  @Input() searchDebounceTime: number = 300; // Tiempo de espera para búsqueda
  @Input() maxPages: number = 5; // Número máximo de páginas a mostrar

  //Habilitacion o deshabilitacion de botones
  @Input() searchEnabled: boolean = true; // Nuevo estado para habilitar la búsqueda
  @Input() showActions: boolean = false; // Nuevo estado para mostrar acciones
  @Input() showXmlDownload: boolean = false; // Nuevo estado para mostrar botón "Descargar XML"
  @Input() showExcelDownload: boolean = false; // Nuevo estado para mostrar botón "Descargar Excel"
  @Input() showTextoDownload: boolean = false; // Nuevo estado para mostrar botón "Descargar Texto"
  @Input() showPdfDownload: boolean = false; // Nuevo estado para mostrar botón "Descargar PDF"
  @Input() showReporteDownload: boolean = false; // Nuevo estado para mostrar botón "Descargar Reporte Excel"
  @Input() showNewRegister: boolean = false; // Nuevo estado para mostrar botón "Nuevo Registro"
  @Input() showStatusFilter: boolean = false; // Nuevo input para mostrar el filtro
  @Input() validatePermissions: boolean = true; // Nuevo estado para validar permisos
  @Input() sumColumns: string[] = []; // Nuevo input para sumar columnas
  @Input() showDateRangeFilter: boolean = false; // Nuevo input para mostrar filtro de fechas
  @Input() dateRangeLabel: string = "Rango de fechas"; // Etiqueta para el filtro de fechas

  // Eventos
  @Output() actionClick = new EventEmitter<{ action: string; item: T }>(); // Nuevo evento para acciones
  @Output() dateRangeSearch = new EventEmitter<{
    startDate: string;
    endDate: string;
  }>(); // Nuevo evento para búsqueda por fecha
  @Output() edit = new EventEmitter<T>(); // Nuevo evento para edición
  @Output() new = new EventEmitter<T>(); // Nuevo evento para nuevo registro
  @Output() delete = new EventEmitter<T>(); // Nuevo evento para eliminación
  @Output() activate = new EventEmitter<T>(); // Nuevo evento para activación
  @Output() deactivate = new EventEmitter<T>(); // Nuevo evento para desactivación
  @Output() resetPassword = new EventEmitter<T>(); // Nuevo evento para resetear contraseña
  @Output() rowAction = new EventEmitter<{ action: string; item: T }>(); // Nuevo evento para acciones por fila
  @Output() sort = new EventEmitter<{
    column: string;
    direction: "asc" | "desc";
  }>(); // Nuevo evento para ordenar
  @Output() xmlDownload = new EventEmitter<void>(); // Nuevo evento para descargar XML
  @Output() excelDownload = new EventEmitter<void>(); // Nuevo evento para descargar Excel
  @Output() textoDownload = new EventEmitter<void>(); // Nuevo evento para descargar Texto
  @Output() pdfDownload = new EventEmitter<void>(); // Nuevo evento para descargar PDF
  @Output() reporteDownload = new EventEmitter<void>(); // Nuevo evento para descargar Reporte Excel
  @Output() profileSelected = new EventEmitter<number>(); // Nuevo evento para seleccionar perfil
  @Output() fileDownload = new EventEmitter<T>(); // Nuevo evento para descargar archivo
  @Output() fieldValueChange = new EventEmitter<{
    field: string;
    value: any;
  }>(); // Nuevo evento para cambios de campo

  // Propiedades
  currentPage: number = 1; // Página actual
  searchTerm: string = ""; // Termo de búsqueda
  filteredData: T[] = []; // Datos filtrados
  showAll: boolean = false; // Nuevo estado para controlar "Ver todo"
  sortColumn: string | null = null; // Columna actual para ordenar
  sortDirection: "asc" | "desc" | null = null; // Dirección de orden actual
  startDate: string = ""; // Fecha de inicio para filtro
  endDate: string = ""; // Fecha de fin para filtro

  private searchSubject = new Subject<string>(); // Nuevo sujeto para búsqueda
  private sortCache: { data: T[]; column: string; direction: string } | null =
    null; // Cache para ordenar
  private visibleColumnsCache: TableColumn[] = []; // Cache de columnas visibles
  // private valueCache = new WeakMap<object, Map<string, any>>(); // Cache de valores
  private valueCache = new Map<object, Map<string, any>>();
  private currentPopover: any = null; // Popover actual
  SPECIAL_INVALID_VALUE = -1; // Valor único para estado inválido

  statusFilterOptions = [
    { value: null, label: "Todos" },
    { value: 1, label: "Activos" },
    { value: 0, label: "Inactivos" },
  ];

  selectedStatus: number | null = null;
  private statusFilterSubject = new Subject<number | null>();
  columnFilters: { [key: string]: string } = {};

  /**
   * Constructor del componente.
   * Se suscribe al sujeto searchSubject para que cada vez que se realice una búsqueda,
   * se apliquen los filtros a los datos de la tabla.
   * @param modalService Servicio para mostrar modal.
   */
  constructor(
    private modalService: NgbModal,
    private cdRef: ChangeDetectorRef
  ) {
    // Configurar suscripciones para búsqueda
    this.searchSubject
      .pipe(debounceTime(this.searchDebounceTime), distinctUntilChanged())
      .subscribe((term) => {
        this.searchTerm = term;
        this.applyFilters();
      });

    // Configurar suscripciones para filtro de estado
    this.statusFilterSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((status) => {
        this.selectedStatus = status;
        this.applyFilters();
      });

    // Establecer fechas por defecto si el filtro está habilitado
    if (this.showDateRangeFilter) {
      this.setDefaultDateRange();
    }
  }
  /**
   * Inicializa el componente.
   * Se utiliza para obtener las columnas visibles al inicio.
   */
  ngOnInit() {
    this.visibleColumns;

    // Establecer valores por defecto para las fechas si el filtro está habilitado
    if (this.showDateRangeFilter && (!this.startDate || !this.endDate)) {
      // Usar setTimeout para asegurar que el componente esté completamente inicializado
      setTimeout(() => {
        this.setDefaultDateRange();
        this.cdRef.detectChanges();
      }, 0);
    }
  }

  /**
   * Establece el rango de fechas por defecto al primer y último día del mes actual
   */
  private setDefaultDateRange(): void {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Formatear fechas al formato YYYY-MM-DD requerido por input type="date"
    this.startDate = this.formatDateForInput(firstDayOfMonth);
    this.endDate = this.formatDateForInput(lastDayOfMonth);
  }

  /**
   * Formatea una fecha al formato YYYY-MM-DD requerido por input type="date"
   */
  private formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  /**
   * Configuración de acciones.
   */
  actionConfig: {
    [key: string]: {
      icon: string;
      text: string;
      color: string;
      action: string;
      permission?: string;
      bypassPermission?: boolean;
    };
  } = {
    edit: {
      icon: "mdi-pencil",
      text: "Editar",
      color: "text-primary",
      action: "edit",
      permission: "actualizar",
      bypassPermission: false,
    },
    delete: {
      icon: "mdi-delete",
      text: "Eliminar",
      color: "text-danger",
      action: "delete",
      permission: "eliminar",
      bypassPermission: false,
    },
    activate: {
      icon: "mdi-account",
      text: "Activar",
      color: "text-success",
      action: "activate",
      permission: "activar",
      bypassPermission: false,
    },
    deactivate: {
      icon: "mdi-account",
      text: "Desactivar",
      color: "text-danger",
      action: "deactivate",
      permission: "desactivar",
      bypassPermission: false,
    },
    reset: {
      icon: "mdi-key",
      text: "Resetear Contraseña",
      color: "text-warning",
      action: "reset",
      permission: "resetPassword",
      bypassPermission: true,
    },
    file: {
      icon: "mdi-file-download-outline",
      text: "Descargar",
      color: "text-success",
      action: "file",
      permission: "descargar",
      bypassPermission: true,
    },
  };

  /**
   * Decide si mostrar una acción en una fila de la tabla, en función del estado de la fila y la acción.
   * @param action Acción a mostrar o no.
   * @param item Fila de la tabla que se está mostrando.
   * @returns true si se debe mostrar la acción, false si no.
   */
  // shouldShowAction(action: string, item: any): boolean {
  //   if (action === "activate") {
  //     return item.activo === false; // Mostrar solo si está inactivo
  //   }
  //   if (action === "deactivate") {
  //     return item.activo === true; // Mostrar solo si está activo
  //   }
  //   return true; // Mostrar otras acciones siempre
  // }

  shouldShowAction(action: string, item: any): boolean {
    // Verificar si el item tiene la propiedad 'activo'
    const hasActiveProperty = item.hasOwnProperty("activo");

    if (action === "activate") {
      return hasActiveProperty ? item.activo === false : true;
    }
    if (action === "deactivate") {
      return hasActiveProperty ? item.activo === true : true;
    }
    return true;
  }

  /**
   * Devuelve las columnas visibles de la tabla.
   * Se filtran las columnas que no están en la lista de columnas ocultas.
   * @returns Las columnas visibles de la tabla.
   */
  /******  2af4fd32-b553-43f4-b09f-331f0ca6c3ca  *******/
  get visibleColumns(): TableColumn[] {
    return this.visibleColumnsCache;
  }

  /**
   * Cierra el popover actual si ya está abierto, y abre el popover actual
   * si no lo está.
   * Se utiliza para controlar el toggle de los popover de las acciones.
   * @param event Evento que se pasa para evitar propagación.
   * @param popover Popover que se va a togglear.
   */
  toggleMenu(event: Event, popover: any) {
    event.stopPropagation();

    // Cerrar el popover anterior si existe y es diferente
    if (this.currentPopover && this.currentPopover !== popover) {
      this.currentPopover.close();
    }

    // Toggle el popover actual
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open();
      this.currentPopover = popover;
    }
  }

  @HostListener("document:click", ["$event"])
  /**
   * Cierra el popover actual si se hace clic en cualquier lugar del documento.
   * Se utiliza para controlar el cierre automático de los popover de las acciones.
   * @param event Evento que se pasa para evitar propagación.
   */
  onDocumentClick(event: Event) {
    if (this.currentPopover) {
      this.currentPopover.close();
      this.currentPopover = null;
    }
  }

  /**
   * Maneja el clic en una acción.
   * Se utiliza para delegar el clic en una acción a los métodos correspondientes.
   * Emite el evento `actionClick` con la acción y el item correspondiente.
   * @param {string} action Acción que se ha realizado.
   * @param {T} item Item en el que se ha realizado la acción.
   */
  onActionClick(action: string, item: T) {
    const permissionMap: { [key: string]: string } = {
      edit: "actualizar",
      delete: "eliminar",
      activate: "activar",
      deactivate: "desactivar",
      reset: "resetPassword", // Si existe este permiso
    };

    switch (action) {
      case "edit":
        this.onEdit(item);
        break;
      case "delete":
        this.onDelete(item);
        break;
      case "activate":
        this.onActivate(item);
        break;
      case "deactivate":
        this.onDeactivate(item);
        break;
      case "reset":
        this.onResetPassword(item);
        break;
      case "file":
        this.onFileDownload(item);
        break;
    }
    this.actionClick.emit({ action, item });
  }

  /**
   * Abre un modal con una configuración determinada.
   * @param {Object} config Configuración del modal.
   * @param {string} config.title Título del modal.
   * @param {any} config.data Datos a mostrar en el modal.
   * @param {"sm"|"lg"} [config.size] Tamaño del modal.
   * @param {boolean} [config.isConfirmation] Indica si el modal es una confirmación.
   * @param {string} [config.actionType] Tipo de acción de la confirmación.
   * @param {string} [config.actionLabel] Etiqueta de la acción de la confirmación.
   * @param {string} [config.message] Mensaje a mostrar en el modal.
   * @param {(result?: any) => void} [config.onSaveCallback] Función a ejecutar al guardar el formulario.
   */
  private openModal(config: {
    title: string;
    data: any;
    entityType?: any;
    size?: "sm" | "lg";
    isConfirmation?: boolean;
    actionType?: string;
    actionLabel?: string;
    message?: string;
    onSaveCallback?: (result?: any) => void;
  }): void {
    const modalSize = config.size || this.getModalSize(config.data);

    const modalRef = this.modalService.open(GenericModalDialogComponent, {
      size: modalSize,
      backdrop: "static",
      windowClass: "modal-dialog-centered",
    });
    //limpiar los datos y mapear campos si es necesario
    const cleanData = Object.keys(config.data).reduce(
      (acc: Record<string, any>, key) => {
        acc[key] = config.data[key] === 0 ? 0 : config.data[key];
        return acc;
      },
      {}
    );

    // Configuración común para todos los modales
    modalRef.componentInstance.title = config.title;
    modalRef.componentInstance.data = cleanData;
    modalRef.componentInstance.entityType = config.entityType; // Pasar la clase

    // Configuración específica para confirmaciones
    if (config.isConfirmation) {
      modalRef.componentInstance.showConfirmButtons = true;
      modalRef.componentInstance.actionType = config.actionType;
      modalRef.componentInstance.actionLabel = config.actionLabel;
    } else {
      // Configuración para formularios
      modalRef.componentInstance.excludedFields = this.excludedFields;
      modalRef.componentInstance.selectOptions = this.selectOptions;
      modalRef.componentInstance.readonlyFields = this.readonlyFields;
      modalRef.componentInstance.disabledFields = this.disabledFields || [];
      modalRef.componentInstance.fieldsOrder = this.fieldsOrder || [];
      modalRef.componentInstance.selectFields = this.selectFields;
      // Escuchar cambios del modal
      modalRef.componentInstance.onProfileChange.subscribe(
        async (idPerfil: number) => {
          // 1. Emitir al padre y esperar que se actualicen los datos
          await this.profileSelected.emit(idPerfil);

          // 2. Esperamos un tick para asegurarnos que los datos están actualizados
          await new Promise((resolve) => setTimeout(resolve, 50)); // Pequeño delay

          // 3. Actualizamos las opciones en el modal
          modalRef.componentInstance.selectOptions = { ...this.selectOptions };
          modalRef.componentInstance.generateFields();

          // 4. Forzamos la detección de cambios
          modalRef.componentInstance.cdRef.detectChanges();
        }
      );

      // Escuchar cambios de campos para lógica personalizada
      modalRef.componentInstance.onFieldValueChange.subscribe(
        (change: { field: string; value: any }) => {
          // Emitir al componente padre para que pueda manejar la lógica
          this.fieldValueChange.emit(change);

          // Solo regenerar campos cuando realmente sea necesario (ej: withdrawalMethod)
          // Para campos como 'amount', NO regenerar para evitar perder el foco
          const fieldsThatRequireRegeneration = [
            "withdrawalMethod",
            "id_perfil",
          ];
          if (fieldsThatRequireRegeneration.includes(change.field)) {
            // Esperar un tick para que el componente padre actualice disabledFields
            setTimeout(() => {
              // Actualizar disabledFields en el modal cuando cambie
              modalRef.componentInstance.disabledFields = [
                ...this.disabledFields,
              ];
              modalRef.componentInstance.generateFields();
              modalRef.componentInstance.cdRef.detectChanges();
            }, 100);
          } else {
            // Para otros campos, solo actualizar disabledFields sin regenerar
            modalRef.componentInstance.disabledFields = [
              ...this.disabledFields,
            ];
            // Actualizar solo el campo específico sin regenerar todos los campos
            const field = modalRef.componentInstance.fields.find(
              (f: any) => f.key === change.field
            );
            if (field) {
              field.disabled = modalRef.componentInstance.isDisabledField(
                change.field
              );
            }
            // Actualizar también el campo creditCardId si es necesario
            const creditCardField = modalRef.componentInstance.fields.find(
              (f: any) => f.key === "creditCardId"
            );
            if (creditCardField) {
              creditCardField.disabled =
                modalRef.componentInstance.isDisabledField("creditCardId");
            }
          }
        }
      );
    }

    modalRef.componentInstance.requiredFields = this.requiredFields;

    // Manejo común de eventos
    modalRef.componentInstance.onSave.subscribe((result: any) => {
      if (config.onSaveCallback) {
        config.onSaveCallback(result);
      }
      // Resetear formulario y datos
      modalRef.componentInstance.data = { ...cleanData }; // Restaurar DTO inicial
      modalRef.componentInstance.form?.resetForm(); // Limpiar campos
      modalRef.close();
    });

    modalRef.componentInstance.onClose.subscribe(() => {
      modalRef.close();
    });
  }

  private formatLabel(key: string): string {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^id_/i, "")
      .replace(/_/g, " ")
      .trim()
      .replace(/^\w/, (c) => c.toUpperCase());
  }

  private detectFieldType(key: string, context: any): string {
    if ((context.selectFields || this.selectFields).includes(key))
      return "select";
    if (key.match(/fecha|date/i)) return "date";
    if (key.match(/email|mail|correo/i)) return "email";
    if (key.match(/password|contraseña|clave|pass/i)) return "password";
    return "text";
  }

  private resolveActionConfig(context: any): any {
    if (context.isConfirmation) {
      return {
        showConfirmButtons: true,
        actionType: context.actionType,
        actionLabel: context.actionLabel,
        message: context.message,
      };
    }
    return { showConfirmButtons: false };
  }

  private setupModalEvents(modalRef: any, callback?: Function): void {
    modalRef.componentInstance.onSave.subscribe((result: any) => {
      if (callback) callback(result);
      modalRef.close();
    });

    modalRef.componentInstance.onClose.subscribe(() => {
      modalRef.close();
    });
  }

  /**
   * Calcula el tamaño del modal según la cantidad de items en el objeto data.
   * Si el objeto tiene más de 5 items, se devuelve "lg", de lo contrario se devuelve "sm".
   * @param {any} data Objeto con los datos a mostrar en el modal.
   * @returns {string} "sm" o "lg" según la cantidad de items.
   */
  private getModalSize(data: any): "sm" | "lg" {
    const itemCount =
      data && typeof data === "object" ? Object.keys(data).length : 0;
    return itemCount > 5 ? "lg" : "sm";
  }

  /**
   * Abre un modal de confirmación para el item seleccionado.
   * @param {T} item Item que se va a mostrar en el modal.
   * @param {string} actionType Tipo de acción que se va a realizar.
   * @param {string} actionLabel Etiqueta para el botón de confirmación.
   * @param {string} message Mensaje de confirmación que se va a mostrar.
   * @param {EventEmitter<T>} emitter Emisor de eventos que se va a llamar con el
   *     item seleccionado si se confirma la acción.
   */
  private openConfirmationModal(
    item: T,
    actionType: string,
    actionLabel: string,
    message: string,
    emitter: EventEmitter<T>
  ): void {
    this.openModal({
      title: `Confirmar ${actionLabel}`,
      data: {
        mensaje: message,
        detalles: item,
      },
      size: "sm",
      isConfirmation: true,
      actionType: actionType,
      actionLabel: actionLabel,
      onSaveCallback: () => emitter.emit(item),
    });
  }

  /**
   * Abre un modal para agregar un nuevo registro.
   * Emite el nuevo registro a través del evento "new" si se confirma la acción.
   */
  onNew(): void {
    this.openModal({
      title: "Nuevo Registro",
      data: this.entityDTO,
      entityType: this.entityDTO.constructor,
      onSaveCallback: (newData) => {
        this.new.emit(newData);
      },
    });
  }

  /**
   * Abre un modal para editar un item.
   * @param item Item a editar.
   */
  onEdit(item: T): void {
    this.openModal({
      title: "Editar Registro",
      data: { ...item },
      entityType: this.entityDTO.constructor,
      onSaveCallback: (updatedData) => {
        this.edit.emit({ ...item, ...updatedData });
      },
    });
  }

  /**
   * Abre un modal de confirmación para eliminar un item.
   * Emite el item a eliminar a través del evento "delete" si se confirma la acción.
   * @param item Item a eliminar.
   */
  onDelete(item: T): void {
    this.openConfirmationModal(
      item,
      "delete",
      "Eliminación",
      "¿Estás seguro de que deseas eliminar este registro?",
      this.delete
    );
  }
  /**
   * Abre un modal de confirmación para activar un item.
   * Emite el item a activar a través del evento "activate" si se confirma la acción.
   * @param item Item a activar.
   */
  onActivate(item: T): void {
    this.openConfirmationModal(
      item,
      "activate",
      "Activación",
      "¿Estás seguro de que deseas activar este registro?",
      this.activate
    );
  }

  /**
   * Abre un modal de confirmación para inactivar un item.
   * Emite el item a inactivar a través del evento "deactivate" si se confirma la acción.
   * @param item Item a inactivar.
   */
  onDeactivate(item: T): void {
    this.openConfirmationModal(
      item,
      "deactivate",
      "Inactivación",
      "¿Estás seguro de que deseas inactivar este registro?",
      this.deactivate
    );
  }
  /**
   * Abre un modal de confirmación para resetear la contraseña de un item.
   * Emite el item a resetear a través del evento "resetPassword" si se confirma la acción.
   * @param item Item a resetear.
   */
  onResetPassword(item: T): void {
    this.openConfirmationModal(
      item,
      "resetPassword",
      "Cambio de Contraseña",
      "¿Estás seguro de que deseas resetear la contraseña de este registro?",
      this.resetPassword
    );
  }

  /**
   * Emite el evento `fileDownload` cuando se llama a este método.
   * Este método se utiliza para descargar un archivo.
   */
  onFileDownload(item: T): void {
    this.fileDownload.emit(item);
  }

  /**
   * Obtiene los datos paginados para mostrar en la tabla.
   * Si la propiedad `showAll` es verdadera, se devuelven todos los datos ordenados.
   * De lo contrario, se devuelven sólo los datos correspondientes a la página actual,
   * desde `startIndex` hasta `endIndex`.
   * @returns {T[]} Un arreglo de datos paginados.
   */

  get paginatedData(): T[] {
    const sortedData = this.getSortedData();
    return this.showAll
      ? sortedData
      : sortedData.slice(this.startIndex, this.endIndex);
  }

  /**
   * Total de items en la tabla después de aplicar los filtros.
   */
  get totalItems(): number {
    return this.filteredData.length;
  }

  /**
   * Número de item en la tabla desde el que se inicia la paginación actual.
   * Se calcula como (número de página - 1) * tamaño de página.
   */
  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  /**
   * Número de item en la tabla hasta el que se extiende la paginación actual.
   * Se calcula como el número de item en el que se inicia la paginación actual
   * (startIndex) más el tamaño de página, siempre y cuando no se supere el total
   * de items en la tabla (totalItems). De lo contrario, se devuelve el total de
   * items en la tabla.
   */
  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize, this.totalItems);
  }

  /**
   * Llamado cuando cambian las propiedades de entrada del componente.
   * Se encarga de actualizar el cache de columnas visibles y de
   * reaplicar los filtros (si es necesario) cuando cambian las
   * propiedades "columns", "hiddenColumns", "data" o "searchTerm".
   * @param changes Un objeto que describe los cambios en las
   *   propiedades de entrada del componente.
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes["selectOptions"]) {
      // Si cambian las opciones
      this.valueCache.clear(); // Limpiar caché
      this.cdRef.detectChanges(); // Forzar re-renderizado
    }

    if (changes["columns"] || changes["hiddenColumns"]) {
      this.updateVisibleColumnsCache();
    }
    if (changes["data"] || changes["searchTerm"] || changes["columns"]) {
      this.applyFilters();
    }

    // Si se habilita el filtro de fechas y las fechas están vacías, establecer valores por defecto
    if (
      changes["showDateRangeFilter"] &&
      this.showDateRangeFilter &&
      (!this.startDate || !this.endDate)
    ) {
      this.setDefaultDateRange();
    }
  }

  /**
   * Actualiza el cache de columnas visibles.
   * Filtra el arreglo de columnas y devuelve un nuevo arreglo con
   * las columnas que no están en la lista de columnas ocultas.
   * Se llama cada vez que cambian las propiedades "columns" o "hiddenColumns".
   * @returns {TableColumn[]} Un arreglo de columnas visibles.
   */
  private updateVisibleColumnsCache(): void {
    this.visibleColumnsCache = this.columns.filter(
      (column) => !this.hiddenColumns.includes(column.property)
    );
  }

  /**
   * Devuelve el valor de una propiedad de un item.
   * Si la propiedad es una cadena con puntos (ej. "user.name"),
   * se busca en la jerarquía de propiedades del item.
   * Se utiliza un cache para mejorar el rendimiento.
   * @param item El item del que se quiere obtener el valor.
   * @param property La propiedad de la que se quiere obtener el valor.
   * @returns El valor de la propiedad del item.
   */
  // getValue(item: T, property: string): any {
  //   const itemAsObject = item as unknown as object;
  //   if (!this.valueCache.has(itemAsObject)) {
  //     this.valueCache.set(itemAsObject, new Map());
  //   }

  //   const itemCache = this.valueCache.get(itemAsObject)!;
  //   if (itemCache.has(property)) {
  //     return itemCache.get(property);
  //   }

  //   let value = property
  //     .split(".")
  //     .reduce((obj: any, prop: string) => obj?.[prop], item);

  //   // Transformar automáticamente el campo "activo"
  //   if (property === "activo") {
  //     value =
  //       value === true || value === "true" || value === 1
  //         ? "Activo"
  //         : "Inactivo";
  //   }
  //   itemCache.set(property, value);
  //   return value;
  // }

  getValue(item: T, property: string): any {
    const itemAsObject = item as unknown as object;
    if (!this.valueCache.has(itemAsObject)) {
      this.valueCache.set(itemAsObject, new Map());
    }

    const itemCache = this.valueCache.get(itemAsObject)!;
    if (itemCache.has(property)) {
      return itemCache.get(property);
    }

    let value = property
      .split(".")
      .reduce((obj: any, prop: string) => obj?.[prop], item);

    // Si el valor es un objeto, extraer el ID antes de procesarlo
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      value !== null
    ) {
      // Intentar extraer el ID del objeto
      value = value.id || value.value || value;
    }

    // Manejo de campos select con carga asincrónica
    if (this.selectFields.includes(property)) {
      const options = this.selectOptions[property];

      // Si hay opciones disponibles, buscar la descripción
      if (options?.length) {
        // const found = options.find((opt) => opt.id == value); // == para manejar string/number
        // value = found ? found.descripcion : value;
        const found = options.find((opt) => opt.value == value); // Comparar con 'value'
        value = found ? found.label : value; // Usar 'label' en lugar de 'descripcion'
      }
      // Si no hay opciones aún, guardar el valor crudo y actualizar después
      else {
        this.scheduleUpdate(); // Método nuevo para actualización posterior
      }
    }

    // Transformar campo "activo" (existente)
    if (property === "activo") {
      value =
        value === true || value === "true" || value === 1
          ? "Activo"
          : "Inactivo";
    }

    itemCache.set(property, value);
    return value;
  }

  // Nuevo método para manejar actualizaciones posteriores
  private updateScheduled = false;
  private scheduleUpdate() {
    if (!this.updateScheduled) {
      this.updateScheduled = true;
      setTimeout(() => {
        this.valueCache.clear(); // Limpiar caché
        this.cdRef.detectChanges(); // Forzar actualización
        this.updateScheduled = false;
      }, 500); // Esperar 500ms para nuevas cargas
    }
  }

  /**
   * Se llama cuando el usuario escribe en el campo de búsqueda.
   * Emite el valor de búsqueda a través del sujeto searchSubject.
   * @param event Evento de entrada.
   */
  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  /**
   * Handler para búsqueda desde el header component
   */
  onSearchFromHeader(value: string): void {
    this.searchSubject.next(value);
  }

  /**
   * Handler para cambio de estado desde el header component
   */
  onStatusChangeFromHeader(status: number | null): void {
    this.statusFilterSubject.next(status);
  }

  /**
   * Handler para búsqueda por rango de fechas desde el header component
   */
  onDateRangeSearchFromHeader(event: {
    startDate: string;
    endDate: string;
  }): void {
    this.startDate = event.startDate;
    this.endDate = event.endDate;
    this.onDateRangeSearch();
  }

  /**
   * Se llama cuando el usuario hace clic en el botón de búsqueda por rango de fechas.
   * Emite el evento dateRangeSearch con las fechas seleccionadas.
   */
  onDateRangeSearch(): void {
    // Si las fechas están vacías, establecer fechas por defecto
    if (!this.startDate || !this.endDate) {
      this.setDefaultDateRange();
    }

    if (this.startDate && this.endDate) {
      this.dateRangeSearch.emit({
        startDate: this.startDate,
        endDate: this.endDate,
      });
    }
  }

  /**
   * Devuelve un identificador único para cada item en la tabla.
   * Se utiliza para mejorar el rendimiento de la tabla.
   * @param index Índice del item en la tabla.
   * @param item El item en la tabla.
   * @returns Un identificador único para el item.
   */
  trackByFn(index: number, item: any): number {
    return index; // Usar un identificador único si está disponible
  }

  /**
   * Se llama cuando el usuario hace clic en una columna de la tabla para ordenarla.
   * Si la columna ya está ordenada, se cambia el sentido del ordenamiento.
   * Si la columna no está ordenada, se establece como columna de ordenamiento
   * con el sentido de ordenamiento "asc".
   * Reinicia la paginación a la primera página después de ordenar.
   * @param column La columna en la que se hace clic para ordenar.
   */
  onSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    } else {
      this.sortColumn = column;
      this.sortDirection = "asc";
    }
    this.currentPage = 1; // Reinicia a la primera página después de ordenar
  }

  /**
   * Se llama cuando el usuario cambia de página en la tabla.
   * Actualiza el valor de `currentPage` con el número de página que se ha seleccionado.
   * @param page El número de página que se ha seleccionado.
   */
  onPageChange(page: number): void {
    this.currentPage = page;
  }

  /**
   * Alterna entre el modo de mostrar todas las filas de la tabla
   * y el modo de mostrar solo las filas que se ajustan a la
   * paginación.
   * Si se vuelve al modo paginado, se reinicia a la primera página.
   */
  toggleShowAll(): void {
    this.showAll = !this.showAll;
    if (!this.showAll) {
      this.currentPage = 1; // Reiniciar a la primera página si vuelves al modo paginado
    }
  }

  /**
   * Aplica los filtros a los datos de la tabla.
   * Filtra los datos según el término de búsqueda y las columnas visibles.
   */
  // private applyFilters(): void {
  //   const searchRegex = new RegExp(this.searchTerm, "i");

  //   this.filteredData = this.data.filter((item) =>
  //     this.visibleColumns.some((column) => {
  //       const value = this.getValue(item, column.property);
  //       return searchRegex.test(String(value));
  //     })
  //   );
  //   this.sortCache = null; // Invalidar cache de ordenamiento
  // }
  /**
   * Aplica los filtros a los datos de la tabla.
   * Filtra los datos según el término de búsqueda y el estado seleccionado.
   * Utiliza una expresión regular para buscar coincidencias sin distinguir mayúsculas/minúsculas.
   * También filtra por el estado activo/inactivo si hay uno seleccionado.
   * Finalmente invalida el caché de ordenamiento.
   */
  // private applyFilters(): void {
  //   const searchRegex = new RegExp(this.searchTerm, "i");

  //   this.filteredData = this.data.filter((item: any) => {
  //     // Filtro por estado
  //     if (
  //       this.selectedStatus !== null &&
  //       (item.activo == true ? 1 : 0) !== this.selectedStatus
  //     ) {
  //       return false;
  //     }

  //     // Filtro por búsqueda
  //     return this.visibleColumns.some((column) => {
  //       const value = this.getValue(item, column.property);
  //       return searchRegex.test(String(value));
  //     });
  //   });

  //   this.sortCache = null;
  // }

  /**
   * Aplica filtros combinados: estado, búsqueda global y filtros por columna.
   * Resetea el caché de ordenamiento para recalcular con los nuevos datos filtrados.
   */
  private applyFilters(): void {
    const searchRegex = new RegExp(this.searchTerm, "i");

    this.filteredData = this.data.filter((item: any) => {
      // Filtro por estado
      if (
        this.selectedStatus !== null &&
        (item.activo == true ? 1 : 0) !== this.selectedStatus
      ) {
        return false;
      }

      // Filtro por búsqueda global
      const globalSearchMatch =
        this.searchTerm === "" ||
        this.visibleColumns.some((column) => {
          const value = this.getValue(item, column.property);
          return searchRegex.test(String(value));
        });

      // Filtro por columnas individuales
      const columnFiltersMatch = Object.keys(this.columnFilters).every(
        (property) => {
          if (!this.columnFilters[property]) return true; // Si no hay filtro, pasar

          const filterValue = this.columnFilters[property].toLowerCase();
          const itemValue = String(this.getValue(item, property)).toLowerCase();
          return itemValue.includes(filterValue);
        }
      );

      return globalSearchMatch && columnFiltersMatch;
    });

    this.sortCache = null;
  }

  /**
   * Actualiza el filtro de una columna y reaplica todos los filtros.
   * @param property Propiedad a filtrar.
   * @param value Valor de filtro ingresado.
   */
  onColumnFilter(property: string, value: string): void {
    this.columnFilters[property] = value;
    this.applyFilters();
  }

  /**
   * Limpia el filtro de una columna específica y reaplica filtros.
   * @param property Propiedad a limpiar.
   */
  clearColumnFilter(property: string): void {
    delete this.columnFilters[property];
    this.applyFilters();
  }

  /**
   * Maneja el cambio de filtro de estado desde el select interno.
   * @param event Evento de cambio del select.
   */
  onStatusChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.statusFilterSubject.next(value === "null" ? null : Number(value));
  }

  /**
   * Devuelve los datos ordenados según la columna y dirección de ordenamiento actual.
   * Si no se ha establecido una columna de ordenamiento, se devuelve el array original.
   * El ordenamiento se hace con el método `Array.prototype.sort()` y se devuelve un
   * nuevo array con los datos ordenados.
   * @returns Los datos ordenados.
   */
  private getSortedData(): T[] {
    if (!this.sortColumn || !this.sortDirection) {
      return this.filteredData;
    }

    if (
      this.sortCache &&
      this.sortCache.column === this.sortColumn &&
      this.sortCache.direction === this.sortDirection
    ) {
      return this.sortCache.data;
    }

    const sortedData = [...this.filteredData].sort((a, b) => {
      const valueA = this.getValue(a, this.sortColumn!);
      const valueB = this.getValue(b, this.sortColumn!);

      // Optimización: Comparación tipada
      if (typeof valueA === "number" && typeof valueB === "number") {
        return this.sortDirection === "asc" ? valueA - valueB : valueB - valueA;
      }

      const strA = String(valueA).toLowerCase();
      const strB = String(valueB).toLowerCase();

      return this.sortDirection === "asc"
        ? strA.localeCompare(strB)
        : strB.localeCompare(strA);
    });

    this.sortCache = {
      data: sortedData,
      column: this.sortColumn,
      direction: this.sortDirection,
    };

    return sortedData;
  }

  /**
   * Valida si el usuario tiene permiso para la clave indicada.
   * @param permissionKey Clave de permiso buscada en sessionStorage.
   * @returns `true` si el permiso está habilitado o si la validación está desactivada.
   */
  hasPermission(permissionKey: string): boolean {
    if (!this.validatePermissions) return true; // Bypass si está desactivada la validación

    try {
      const botones = JSON.parse(sessionStorage.getItem("botones") || "{}");
      return botones?.[permissionKey] === true;
    } catch (error) {
      return false;
    }
  }
  /**
   * Emite el evento `xmlDownload` cuando se llama a este método.
   */
  onXmlDownload(): void {
    this.xmlDownload.emit();
  }

  /**
   * Emite el evento `excelDownload` cuando se llama a este método.
   * Este método se utiliza para descargar la tabla en formato Excel.
   */
  onExcelDownload(): void {
    this.excelDownload.emit();
  }

  /**
   * Emite el evento `textoDownload` cuando se llama a este método.
   * Este método se utiliza para descargar la tabla en formato de texto.
   */
  onTextoDownload(): void {
    this.textoDownload.emit();
  }

  /**
   * Emite el evento `pdfDownload` cuando se llama a este método.
   * Este método se utiliza para descargar la tabla en formato PDF.
   */
  onPdfDownload(): void {
    this.pdfDownload.emit();
  }

  /**
   * Emite el evento `reporteDownload` cuando se llama a este método.
   * Este método se utiliza para descargar la tabla en formato de reporte excel.
   */
  onRporteDownload(): void {
    this.reporteDownload.emit();
  }

  /**
   * Extrae el valor de un input de evento DOM.
   * @param event Evento del input.
   * @returns Valor actual del campo.
   */
  getInputValue(event: Event): string {
    return (event.target && (event.target as HTMLInputElement).value) || "";
  }

  get columnSums(): { [key: string]: number } {
    const sums: { [key: string]: number } = {};
    if (!this.sumColumns?.length) return sums;

    this.sumColumns.forEach((col) => {
      sums[col] = this.filteredData
        .map((item: any) => {
          // Obtener el valor usando getValue para manejar transformaciones
          // pero para campos numéricos simples, usar acceso directo es más eficiente
          const rawValue = item[col];
          // Si el valor es un objeto, intentar extraer el valor numérico
          if (
            rawValue &&
            typeof rawValue === "object" &&
            !Array.isArray(rawValue)
          ) {
            return Number(rawValue.value || rawValue.id || rawValue) || 0;
          }
          return Number(rawValue) || 0;
        })
        .reduce((acc, val) => acc + val, 0);
    });
    return sums;
  }
}
