import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { ChangeDetectorRef } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { CommissionCalculationService } from "src/app/core/services/commission-calculation.service";

@Component({
  selector: "app-generic-modal-dialog",
  templateUrl: "./generic-modal-dialog.component.html",
  styleUrl: "./generic-modal-dialog.component.scss",
  // changeDetection: ChangeDetectionStrategy.OnPush,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class GenericModalDialogComponent implements OnDestroy {
  // Añadir referencia al formulario
  @ViewChild("form") form!: NgForm;

  // Subject para debounce del cálculo de comisión
  private commissionCalculationSubject = new Subject<void>();

  @Input() title: string = "Formulario"; // Título del modal
  @Input() data: any = {}; // Datos recibidos
  fields: {
    key: string;
    label: string;
    type: string;
    readonly: boolean;
    disabled?: boolean; // Nueva propiedad para campos deshabilitados
    options?: any[]; // Nueva propiedad para opciones
  }[] = []; // Campos generados dinámicamente

  @Input() selectOptions: { [key: string]: any[] } = {};
  @Input() excludedFields: string[] = []; // Recibe desde generic-table
  @Input() readonlyFields: string[] = []; // Campos bloqueados por defecto
  @Input() disabledFields: string[] = []; // Campos deshabilitados dinámicamente
  @Input() selectFields: string[] = []; // Campos select
  @Input() showConfirmButtons: boolean = false; // Nueva propiedad para mostrar botones de confirmación
  @Input() actionType: "delete" | "activate" | "deactivate" = "delete"; // Acción por defecto
  @Input() actionLabel: string = ""; // Etiqueta personalizada opcional
  @Input() requiredFields: string[] = []; // Campos requeridos
  @Input() entityType: any; // Recibir la clase del DTO
  @Input() fieldsOrder: string[] = []; // Orden personalizado de campos

  @Output() onSave = new EventEmitter<any>(); // Evento para guardar datos
  @Output() onClose = new EventEmitter<void>(); // Evento para cerrar modal
  @Output() onProfileChange = new EventEmitter<number>();
  @Output() onFieldValueChange = new EventEmitter<{
    field: string;
    value: any;
  }>(); // Evento para cambios de campo

  multiColumnLayout = false;
  isSaving: boolean = false;
  constructor(
    public activeModal: NgbActiveModal,
    private cdRef: ChangeDetectorRef,
    private commissionCalculationService: CommissionCalculationService
  ) {
    // Suscribirse al Subject con debounce de 300ms para el cálculo de comisión
    this.commissionCalculationSubject.pipe(debounceTime(300)).subscribe(() => {
      this.calcularComisionInversiones();
      // Usar markForCheck en lugar de detectChanges para evitar pérdida de foco
      this.cdRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    // Limpiar la suscripción al destruir el componente
    this.commissionCalculationSubject.complete();
  }

  ngOnInit(): void {
    // Actualizar readonlyFields antes de generar campos (para inversiones)
    this.updateReadonlyFieldsForCommission();
    this.generateFields();
    this.initializeRequiredFields();
  }

  /**
   * Hook lifecycle: sincroniza cambios de validación del formulario después de render.
   * Suscribe a `statusChanges` y fuerza `detectChanges` para reflejar estado de validación.
   */
  ngAfterViewInit() {
    if (this.form) {
      this.form.statusChanges?.subscribe(() => {
        this.cdRef.detectChanges(); // Forzar actualización de la vista
      });
    }
  }

  actionConfig = {
    delete: {
      btnText: "Eliminar",
      btnClass: "btn-danger",
      message: "¿Estás seguro de que deseas eliminar este registro?",
    },
    activate: {
      btnText: "Activar",
      btnClass: "btn-success",
      message: "¿Estás seguro de que deseas activar este registro?",
    },
    deactivate: {
      btnText: "Desactivar",
      btnClass: "btn-warning",
      message: "¿Estás seguro de que deseas desactivar este registro?",
    },
    resetPassword: {
      btnText: "Resetear Contraseña",
      btnClass: "btn-primary",
      message:
        "¿Estás seguro de que deseas resetear la contraseña de este registro?",
    },
  };

  /**
   * Genera dinámicamente los campos del formulario según datos y configuraciones.
   * Respeta orden personalizado, campos excluidos, readonly/disabled y opciones select.
   */
  private generateFields(): void {
    let fieldKeys = Object.keys(this.data).filter(
      (key) => !this.excludedFields.includes(key)
    );

    // Ordenar campos según fieldsOrder si está definido
    if (this.fieldsOrder && this.fieldsOrder.length > 0) {
      const orderedFields: string[] = [];
      const unorderedFields: string[] = [];

      // Primero agregar los campos en el orden especificado
      this.fieldsOrder.forEach((key) => {
        if (fieldKeys.includes(key)) {
          orderedFields.push(key);
        }
      });

      // Luego agregar los campos que no están en el orden especificado
      fieldKeys.forEach((key) => {
        if (!this.fieldsOrder.includes(key)) {
          unorderedFields.push(key);
        }
      });

      fieldKeys = [...orderedFields, ...unorderedFields];
    }

    this.fields = fieldKeys.map((key) => ({
      key,
      label: this.formatLabel(key),
      type: this.getInputType(key),
      readonly: this.isReadonlyField(key),
      disabled: this.isDisabledField(key),
      options: this.getOptions(key),
    }));
    this.multiColumnLayout = this.fields.length > 5;
  }

  /** Comprueba si un campo está deshabilitado. */
  isDisabledField(key: string): boolean {
    return this.disabledFields.some(
      (f) => f.toLowerCase() === key.toLowerCase()
    );
  }

  /** Actualiza dinámicamente el estado disabled de un campo. */
  updateFieldDisabled(key: string, disabled: boolean): void {
    const field = this.fields.find((f) => f.key === key);
    if (field) {
      field.disabled = disabled;
      this.cdRef.detectChanges();
    }
  }
  /**
   * Inicializa los campos requeridos con valores predeterminados.
   * Si un select requerido está vacío, lo setea a cadena vacía para forzar selección.
   */
  private initializeRequiredFields(): void {
    this.requiredFields.forEach((field) => {
      if (
        this.isSelectField(field) &&
        this.isInvalidValue(this.data[field], field)
      ) {
        this.data[field] = "";
      }
    });
  }
  /**
   * Convierte el nombre técnico de un campo en etiqueta legible.
   * @param key Clave del campo.
   * @returns Etiqueta amigable.
   */
  private formatLabel(key: string): string {
    return (
      key
        .replace(/^btn_/i, "") // Eliminar prefijo btn_
        .replace(/^id_/i, "")
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
        // Capitaliza cada palabra
        .replace(/(Xml|Excel)/g, " $1")
    );
  }
  /**
   * Determina el tipo de input para un campo usando selectFields, metadata y heurísticas.
   * @param key Clave del campo.
   * @returns Tipo de input: select/number/text/email/password/date/checkbox/etc.
   */
  public getInputType(key: string): string {
    // 0. Prioridad máxima: si está en selectFields, es select
    if (this.isSelectField(key)) {
      return "select";
    }

    // 1. Obtener tipo del DTO usando metadatos
    const dtoType = this.getDtoFieldType(key);
    if (dtoType) {
      return this.mapType(dtoType);
    }

    // 2. Validar campos booleanos
    if (this.isBooleanField(key)) {
      return "checkbox";
    }

    // 3. Inferir tipo por nombre de campo
    const inferredType = this.inferTypeFromKey(key);
    if (inferredType !== "text") {
      return inferredType;
    }
    // 4. Tipo por defecto
    return "text";
  }

  private mapType(type: string): string {
    const typeMap = {
      number: "number",
      string: "text",
      boolean: "checkbox",
      date: "date",
    };
    return type.toLowerCase() in typeMap
      ? typeMap[type.toLowerCase() as keyof typeof typeMap]
      : "text";
  }

  private isBooleanField(key: string): boolean {
    // Combinar detección por tipo y nombre
    return (
      typeof this.data[key] === "boolean" ||
      key.startsWith("btn_") ||
      key.toLowerCase().includes("activo") ||
      key.toLowerCase().includes("habilitado")
    );
  }

  private getDtoFieldType(key: string): string | null {
    if (this.entityType) {
      try {
        return Reflect.getMetadata(
          "design:type",
          this.entityType.prototype,
          key
        )?.name.toLowerCase();
      } catch (e) {
        // Error obteniendo metadata
      }
    }
    return null;
  }

  private mapDtoTypeToInput(type: string): string {
    const typeMap: { [key: string]: string } = {
      number: "number",
      string: "text",
      boolean: "checkbox",
      date: "date",
    };
    return typeMap[type] || "text";
  }

  private inferTypeFromKey(key: string): string {
    key = key.toLowerCase();

    if (key.match(/email|mail|correo/i)) return "email";
    if (key.match(/password|contraseña|clave|pass/i)) return "password";
    if (key.match(/fecha|fech|date/i)) return "date";
    if (key.includes("telefono") || key.includes("celular")) return "tel";
    if (key.includes("url")) return "url";

    return "text";
  }

  private validateFieldType(key: string, value: any): boolean {
    const expectedType = this.getFieldType(key);

    switch (expectedType) {
      case "number":
        return !isNaN(Number(value));
      case "boolean":
        return typeof value === "boolean";
      case "date":
        return !isNaN(Date.parse(value));
      default:
        return true;
    }
  }

  private getFieldType(key: string): string {
    return this.getInputType(key).split(" ")[0]; // Obtener el tipo base
  }

  /**
   * Retorna opciones para un campo select intentando match directo o singular/plural.
   * @param key Clave del campo.
   * @returns Opciones encontradas o arreglo vacío.
   */
  private getOptions(key: string): any[] {
    // Normalizar el nombre del campo
    const normalizedKey = key.toLowerCase().trim();
    // Eliminar prefijos comunes (id_, fk_, etc.)
    const cleanKey = normalizedKey.replace(/^(id_|fk_)/, "");
    // Buscar coincidencia directa o por singular/plural
    const optionKey = Object.keys(this.selectOptions).find(
      (k) =>
        k.toLowerCase() === cleanKey ||
        k.toLowerCase() === `${cleanKey}s` || // Ej: cargo -> cargos
        cleanKey === `${k.toLowerCase()}s`
    );

    return optionKey ? this.selectOptions[optionKey] : [];
  }

  /**
   * Comprueba si un campo es readonly usando la lista configurada.
   * @param key Clave del campo.
   */
  private isReadonlyField(key: string): boolean {
    return this.readonlyFields.some(
      (f) => f.toLowerCase() === key.toLowerCase()
    );
  }

  /**
   * Actualiza los campos readonly según el tipo de transacción y método de retiro
   * Solo para formularios de inversiones
   */
  private updateReadonlyFieldsForCommission(): void {
    // Solo aplicar si es un formulario de inversiones
    if (
      !this.data.hasOwnProperty("transactionType") ||
      !this.data.hasOwnProperty("withdrawalMethod") ||
      !this.data.hasOwnProperty("commission")
    ) {
      return;
    }

    const transactionTypeId = Number(this.data["transactionType"]) || 0;
    const withdrawalMethodId = Number(this.data["withdrawalMethod"]) || 0;

    if (!transactionTypeId) {
      // Si no hay transactionType, mantener commission como readonly
      if (!this.readonlyFields.includes("commission")) {
        this.readonlyFields = [...this.readonlyFields, "commission"];
      }
      return;
    }

    // Obtener información del tipo de transacción desde las opciones
    const transactionTypeOptions = this.selectOptions["transactionType"] || [];
    const transactionTypeOption = transactionTypeOptions.find(
      (opt: any) => opt.value === transactionTypeId
    );

    if (!transactionTypeOption) {
      if (!this.readonlyFields.includes("commission")) {
        this.readonlyFields = [...this.readonlyFields, "commission"];
      }
      return;
    }

    const transactionTypeName = (
      transactionTypeOption.label || ""
    ).toLowerCase();
    const esPurchase =
      transactionTypeName.includes("purchase") ||
      transactionTypeName.includes("compra");

    if (esPurchase && withdrawalMethodId) {
      // Obtener información del método de retiro desde las opciones
      const withdrawalMethodOptions =
        this.selectOptions["withdrawalMethod"] || [];
      const methodOption = withdrawalMethodOptions.find(
        (opt: any) => opt.value === withdrawalMethodId
      );

      if (methodOption) {
        const methodName = (methodOption.label || "").toLowerCase();
        const esBitcoin =
          methodName.includes("bitcoin") || methodName.includes("btc");

        // Si es Purchase con Bitcoin: habilitar campo commission (quitar de readonly)
        if (esBitcoin) {
          this.readonlyFields = this.readonlyFields.filter(
            (f) => f.toLowerCase() !== "commission"
          );
        } else {
          // Si es Purchase con tarjeta: commission sigue siendo readonly (será 0)
          if (!this.readonlyFields.includes("commission")) {
            this.readonlyFields = [...this.readonlyFields, "commission"];
          }
        }
      }
    } else {
      // Si es Payment: commission es readonly (se calcula automáticamente)
      if (!this.readonlyFields.includes("commission")) {
        this.readonlyFields = [...this.readonlyFields, "commission"];
      }
    }
  }

  private isInvalidValue(value: any, key: string): boolean {
    return this.isSelectField(key) && this.requiredFields.includes(key)
      ? Number(value) <= 0 ||
          isNaN(Number(value)) ||
          value === null ||
          value === undefined
      : value === null || value === undefined || value === "";
  }
  /**
   * Comprueba si un campo es un select.
   * Busca la clave del campo en this.selectFields (también en minúsculas)
   * y devuelve true si coincide.
   * @param key clave del campo
   * @returns true si el campo es un select, false en caso contrario
   * @private
   */
  private isSelectField(key: string): boolean {
    return this.selectFields.includes(key);
  }
  /**
   * Comprueba si un campo es requerido.
   * Busca la clave del campo en this.requiredFields (también en minúsculas)
   * y devuelve true si coincide.
   * @param key clave del campo
   * @returns true si el campo es requerido, false en caso contrario
   */
  isRequiredField(key: string): boolean {
    return this.requiredFields.includes(key);
  }

  /**
   * Valida campos requeridos, emite onSave y cierra el modal si es válido.
   */
  save() {
    if (
      this.requiredFields.some((field) =>
        this.isInvalidValue(this.data[field], field)
      ) ||
      this.form.invalid
    ) {
      this.form.control.markAllAsTouched();
      this.form.control.updateValueAndValidity();
      this.cdRef.detectChanges();
      return;
    }
    this.isSaving = true;
    this.onSave.emit(this.data);
    this.activeModal.close();
    this.isSaving = false;
  }
  /** Cierra el modal sin guardar y emite onClose. */
  close() {
    this.onClose.emit();
    this.activeModal.close();
  }
  /**
   * Maneja cambios de campo: recalcula comisión (debounce), notifica al padre y regenera campos cuando aplica.
   * @param fieldKey Clave del campo modificado.
   * @param value Nuevo valor.
   */
  async onFieldChange(fieldKey: string, value: any) {
    // Actualizar el valor en los datos
    this.data[fieldKey] = value;

    // Calcular comisión automáticamente para inversiones con debounce
    if (
      fieldKey === "amount" ||
      fieldKey === "withdrawalMethod" ||
      fieldKey === "libreDeComision"
    ) {
      // Emitir al Subject para calcular con debounce
      this.commissionCalculationSubject.next();
    }

    // Casos especiales que requieren regenerar campos
    if (fieldKey === "id_perfil") {
      // Resetear permiso y emitir cambio
      this.data["id_permiso"] = null;
      this.onProfileChange.emit(value);

      // Esperar a la actualización del padre
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Regenerar campos con nuevas opciones
      this.generateFields();
      this.cdRef.markForCheck();
      this.cdRef.detectChanges();
      return;
    }

    // Solo regenerar campos cuando withdrawalMethod cambia (para actualizar disabled de creditCardId)
    if (fieldKey === "withdrawalMethod") {
      // Emitir cambio de campo para que el componente padre pueda reaccionar
      this.onFieldValueChange.emit({ field: fieldKey, value });

      // Esperar un tick para que el componente padre actualice disabledFields
      await new Promise((resolve) => setTimeout(resolve, 150));

      // Actualizar readonlyFields según transactionType y withdrawalMethod
      this.updateReadonlyFieldsForCommission();

      // Regenerar campos para actualizar el estado disabled de creditCardId
      this.generateFields();
      this.cdRef.detectChanges();
      return;
    }

    // Cuando cambia transactionType, actualizar readonlyFields para commission
    if (fieldKey === "transactionType") {
      // Emitir cambio de campo para que el componente padre pueda reaccionar
      this.onFieldValueChange.emit({ field: fieldKey, value });

      // Actualizar readonlyFields según transactionType y withdrawalMethod
      this.updateReadonlyFieldsForCommission();

      // Regenerar campos para actualizar el estado readonly de commission
      await new Promise((resolve) => setTimeout(resolve, 50));
      this.generateFields();
      this.cdRef.detectChanges();
      return;
    }

    // Para campos como 'amount' y 'libreDeComision', NO emitir onFieldValueChange
    // porque no requieren regeneración de campos y evitaríamos perder el foco
    // Solo emitir para campos que realmente necesiten notificar al padre
    const fieldsThatNeedNotification = [
      "withdrawalMethod",
      "creditCardId",
      "platformId",
      "transactionType",
    ];
    if (fieldsThatNeedNotification.includes(fieldKey)) {
      this.onFieldValueChange.emit({ field: fieldKey, value });
    }
  }

  /**
   * Calcula la comisión para inversiones basándose en el método de retiro y tipo de transacción
   * Usa el servicio de cálculo de comisiones para eliminar duplicación
   */
  private calcularComisionInversiones(): void {
    // Solo calcular si es un formulario de inversiones (tiene los campos necesarios)
    if (
      !this.data.hasOwnProperty("amount") ||
      !this.data.hasOwnProperty("withdrawalMethod") ||
      !this.data.hasOwnProperty("commission") ||
      !this.data.hasOwnProperty("transactionType")
    ) {
      return;
    }

    const amount = Number(this.data["amount"]) || 0;
    const withdrawalMethodId = Number(this.data["withdrawalMethod"]) || 0;
    const transactionTypeId = Number(this.data["transactionType"]) || 0;
    const libreDeComision = this.data["libreDeComision"] || false;
    const currentCommission = this.data["commission"];

    // Usar el servicio de cálculo de comisiones
    const calculatedCommission =
      this.commissionCalculationService.calculateCommissionFromSelectOptions(
        amount,
        withdrawalMethodId,
        transactionTypeId,
        libreDeComision,
        this.selectOptions,
        currentCommission
      );

    this.data["commission"] = calculatedCommission;
  }
  /**
   * Muestra un mensaje de confirmación antes de realizar una acción.
   *
   * Si el usuario confirma la acción, emite el evento onSave con el objeto
   * de datos y cierra el modal. Si cancela, no hace nada.
   * @returns {void}
   */
  showError(field: any): boolean {
    if (!this.form) return false;
    const control = this.form.controls[field.key];

    const isRequired = this.requiredFields.includes(field.key);

    if (field.type === "select" && isRequired) {
      return (
        this.form.submitted &&
        (control?.invalid ||
          this.data[field.key] === -1 ||
          this.data[field.key] === 0 ||
          this.data[field.key] === null ||
          this.data[field.key] === undefined)
      );
    }

    if (field.type === "checkbox" && this.isRequiredField(field.key)) {
      return this.form.submitted && !this.data[field.key];
    }

    return this.form.submitted && control?.invalid;
  }

  // Nuevo método para manejar cambios de fecha
  onDateChange(key: string, value: string) {
    if (
      key.toLowerCase().includes("fecha") ||
      key.toLowerCase().includes("date")
    ) {
      this.data[key] = value ? `${value}T00:00:00` : null;
    }
  }
}
