import { Component, inject, DestroyRef, ChangeDetectionStrategy, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { TableColumn } from "../genericos/generictable/table-column.interface";
import { TransactionsDTO } from "src/app/application/transactions/DTO/TransactionsDTO";
import { generateTableColumns } from "src/app/utils/table-utils";
import { DataService } from "src/app/core/services/data.service";
import { TransactionsService } from "src/app/application/transactions/Services/Transactions.service";
import { ITransactionsCreate } from "src/app/application/transactions/Interfaces/ITransactions.interface";
import { CreditcardService } from "src/app/application/creditcard/Services/Creditcard.service";
import { CreditcardDTO } from "src/app/application/creditcard/DTO/CreditcardDTO";
import { MerchantsService } from "src/app/application/Merchants/Services/Merchants.service";
import { SelectOptionsMapperService } from "src/app/core/services/select-options-mapper.service";
import { ITransactionType } from "src/app/application/transactions/Interfaces/ITransactions.interface";
import { MerchantsDTO } from "src/app/application/Merchants/DTO/MerchantsDTO";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrl: "./transactions.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent {
  private selectOptionsMapper = inject(SelectOptionsMapperService);
  private destroyRef = inject(DestroyRef);

  paymentMethods = [
    { value: 1, label: "Tarjeta de Crédito" },
    { value: 2, label: "Efectivo" },
  ];

  // Estado con señales (con getters/setters para compatibilidad con la plantilla)
  private readonly transactionsListSig = signal<TransactionsDTO[]>([]);
  get transactionsList(): TransactionsDTO[] {
    return this.transactionsListSig();
  }
  set transactionsList(value: TransactionsDTO[]) {
    this.transactionsListSig.set(value);
  }

  private readonly creditCardCodesListSig = signal<CreditcardDTO[]>([]);
  get creditCardCodesList(): CreditcardDTO[] {
    return this.creditCardCodesListSig();
  }
  set creditCardCodesList(value: CreditcardDTO[]) {
    this.creditCardCodesListSig.set(value);
  }

  private readonly transactionTypesListSig = signal<ITransactionType[]>([]);
  get transactionTypesList(): ITransactionType[] {
    return this.transactionTypesListSig();
  }
  set transactionTypesList(value: ITransactionType[]) {
    this.transactionTypesListSig.set(value);
  }

  private readonly merchantListSig = signal<MerchantsDTO[]>([]);
  get merchantList(): MerchantsDTO[] {
    return this.merchantListSig();
  }
  set merchantList(value: MerchantsDTO[]) {
    this.merchantListSig.set(value);
  }

  transactionsDTO = new TransactionsDTO();

  // Table columns - Personalizadas para mejor visualización
  tableColumns: TableColumn[] = this.generateCustomColumns();

  // Select options
  private readonly selectOptionsSig = signal<{ [key: string]: unknown[] }>({});
  get selectOptions(): { [key: string]: unknown[] } {
    return this.selectOptionsSig();
  }
  set selectOptions(value: { [key: string]: unknown[] }) {
    this.selectOptionsSig.set(value);
  }

  constructor(
    private dataService: DataService,
    private transactionsService: TransactionsService,
    private creditcardService: CreditcardService,
    private merchantService: MerchantsService
  ) {}

  /**
   * Inicializa la pantalla cargando catálogos y armando las opciones de selects.
   */
  ngOnInit(): void {
    this.obtenerTransactions();
    this.obtenerCreditCardCodes();
    this.obtenerTiposTransacciones();
    this.obtenerMerchants();
    this.initializeSelectOptions();
    this.setupSubscriptions();
  }

  /**
   * Define el estado inicial de las opciones de select a partir de los BehaviorSubjects.
   */
  private initializeSelectOptions(): void {
    this.selectOptions = {
      creditCardId: this.creditCardCodesList,
      type: this.transactionTypesList,
      paymentMethod: this.paymentMethods,
    };
  }

  /**
   * Suscribe a los catálogos para mantener sincronizadas las opciones de los selects.
   */
  private setupSubscriptions(): void {
    // Suscripciones con takeUntilDestroyed para limpieza automática
    // (Señales) las cargas se hacen en métodos async; no hay streams locales aquí.
  }

  /**
   * Mapea el objeto proveniente del formulario al contrato `ITransactionsCreate`.
   * @param newTransaction Valor crudo emitido por el formulario/modal.
   * @returns Objeto con la forma esperada por el backend.
   */
  private mapToTransactionCreate(newTransaction: any): ITransactionsCreate {
    const isCash = Number(newTransaction.paymentMethod) === 2;
    const creditCardId = isCash ? null : newTransaction.creditCardId;

    return {
      amount: newTransaction.amount,
      type: newTransaction.type,
      description: newTransaction.description,
      paymentMethod: Number(newTransaction.paymentMethod) || 1,
      creditCardId,
      transactionDate: newTransaction.transactionDate,
      merchantId: newTransaction.merchantId,
    };
  }

  /**
   * Obtiene la lista de comercios y la publica en su BehaviorSubject.
   */
  async obtenerMerchants(): Promise<void> {
    try {
      const token = sessionStorage.getItem("authToken") || "";
      const username = sessionStorage.getItem("username") || "";
      const merchants = await this.merchantService.getMerchants(token, username);
      this.merchantList = merchants;
      this.selectOptions = {
        ...this.selectOptions,
        merchantId: this.selectOptionsMapper.mapMerchants(merchants),
      };
    } catch (error) {
      // Error al cargar comercios
    }
  }

  /**
   * Obtiene la lista de tipos de transacción y la publica en su BehaviorSubject.
   */
  async obtenerTiposTransacciones(): Promise<void> {
    try {
      const token = sessionStorage.getItem("authToken") || "";
      const username = sessionStorage.getItem("username") || "";
      const transactionTypes = await this.transactionsService.getTransactionTypes(
        token,
        username
      );
      this.transactionTypesList = transactionTypes;
      this.selectOptions = {
        ...this.selectOptions,
        type: this.selectOptionsMapper.mapTransactionTypes(transactionTypes),
      };
    } catch (error) {
      // Error al cargar tipos de transacciones
    }
  }

  /**
   * Obtiene la lista de códigos de tarjeta de crédito y la publica en su BehaviorSubject.
   */
  async obtenerCreditCardCodes(): Promise<void> {
    try {
      const token = sessionStorage.getItem("authToken") || "";
      const username = sessionStorage.getItem("username") || "";
      const cards = await this.creditcardService.getListadoCreditcard(
        token,
        username
      );
      this.creditCardCodesList = cards;
      this.selectOptions = {
        ...this.selectOptions,
        creditCardId: this.selectOptionsMapper.mapCreditCardCodes(cards),
      };
    } catch (error) {
      // Error al cargar códigos de tarjetas
    }
  }

  /**
   * Carga transacciones usando el rango de fechas por defecto (mes actual).
   */
  async obtenerTransactions(): Promise<void> {
    // Obtener token y username del sessionStorage
    const token = sessionStorage.getItem("authToken") || "";
    const username = sessionStorage.getItem("username") || "";

    // Establecer fechas por defecto (primer y último día del mes actual)
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Formatear fechas al formato YYYY-MM-DD
    const formatDateForInput = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const startDate = formatDateForInput(firstDayOfMonth);
    const endDate = formatDateForInput(lastDayOfMonth);

    // Llamar directamente al servicio con las fechas por defecto
    await this.obtenerTransactionsByDateRange(startDate, endDate);
  }

  /**
   * Obtiene transacciones en un rango de fechas y actualiza el estado de la tabla.
   * @param startDate Fecha de inicio en formato YYYY-MM-DD.
   * @param endDate Fecha de fin en formato YYYY-MM-DD.
   */
  async obtenerTransactionsByDateRange(
    startDate: string,
    endDate: string
  ): Promise<void> {
    try {
      // Obtener token y username del sessionStorage usando las claves correctas
      const token = sessionStorage.getItem("authToken") || "";
      const username = sessionStorage.getItem("username") || "";

      const data = await this.transactionsService.getListadoTransactions(
        token,
        username,
        startDate,
        endDate
      );
      this.transactionsList = data;
    } catch (error) {
      // Error al cargar transacciones por fecha
    }
  }

  /**
   * Acción del filtro de fechas; aplica rango personalizado o usa el mes actual por defecto.
   * @param dateRange Rango de fechas recibido desde el componente de filtro.
   */
  async onDateRangeSearch(dateRange: {
    startDate: string;
    endDate: string;
  }): Promise<void> {
    // Si las fechas están vacías, establecer fechas por defecto
    let startDate = dateRange.startDate;
    let endDate = dateRange.endDate;

    if (!startDate || !endDate) {
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      // Formatear fechas al formato YYYY-MM-DD
      const formatDateForInput = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      startDate = formatDateForInput(firstDayOfMonth);
      endDate = formatDateForInput(lastDayOfMonth);
    }

    await this.obtenerTransactionsByDateRange(startDate, endDate);
  }

  /**
   * Crea una transacción y recarga la tabla para reflejar el nuevo registro.
   * @param newTransaction Datos crudos provenientes del formulario/modal.
   */
  async onAddTransaction(newTransaction: any): Promise<void> {
    const transactionFiltrado: ITransactionsCreate =
      this.mapToTransactionCreate(newTransaction);
    await this.dataService.agregarRegistro(
      this.transactionsService,
      "guardarTransactions",
      transactionFiltrado,
      "Transacción creada correctamente",
      "Error al agregar transacción"
    );

    await this.obtenerTransactions();
  }

  /**
   * Genera las columnas de la tabla ajustando cabeceras y ocultando campos internos.
   * @returns Configuración de columnas para el componente de tabla genérica.
   */
  private generateCustomColumns(): TableColumn[] {
    const baseColumns = generateTableColumns(this.transactionsDTO);

    // Personalizar encabezados y ocultar columnas innecesarias
    return baseColumns
      .map((column) => {
        // Personalizar encabezados
        switch (column.property) {
          case "amount":
            return { ...column, header: "Monto" };
          case "type":
            return { ...column, header: "Tipo" };
          case "description":
            return { ...column, header: "Descripción" };
          case "transactionDate":
            return {
              ...column,
              header: "Fecha de Transacción",
              format: "yyyy-MM-dd",
            };
          case "creditCardId":
            return { ...column, header: "Tarjeta de Crédito" };
          case "merchantId":
            return { ...column, header: "Comercio" };
          default:
            return column;
        }
      })
      .filter((column) => {
        // Ocultar columnas que no queremos mostrar
        const hiddenProps = ["id", "isProcessed", "creditCard", "date"];
        return !hiddenProps.includes(column.property);
      });
  }
}
