import { Component, inject, DestroyRef } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { BehaviorSubject } from "rxjs";
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

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrl: "./transactions.component.scss",
})
export class TransactionsComponent {
  // Table data
  transactionsList$: BehaviorSubject<TransactionsDTO[]> = new BehaviorSubject<
    TransactionsDTO[]
  >([]);

  creditCardCodesList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  transactionTypesList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );

  merchantList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  // Table data
  transactionsDTO = new TransactionsDTO();

  // Table columns - Personalizadas para mejor visualización
  tableColumns: TableColumn[] = this.generateCustomColumns();

  // Select options
  selectOptions: { [key: string]: any[] } = {};

  private selectOptionsMapper = inject(SelectOptionsMapperService);
  private destroyRef = inject(DestroyRef);

  constructor(
    private dataService: DataService,
    private transactionsService: TransactionsService,
    private creditcardService: CreditcardService,
    private merchantService: MerchantsService
  ) {}

  ngOnInit(): void {
    this.obtenerTransactions();
    this.obtenerCreditCardCodes();
    this.obtenerTiposTransacciones();
    this.obtenerMerchants();
    this.initializeSelectOptions();
    this.setupSubscriptions();
  }

  private initializeSelectOptions(): void {
    this.selectOptions = {
      creditCardId: this.creditCardCodesList$.getValue(),
      type: this.transactionTypesList$.getValue(),
    };
  }

  private setupSubscriptions(): void {
    // Suscripciones con takeUntilDestroyed para limpieza automática
    this.creditCardCodesList$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((creditCardCodes) => {
        this.selectOptions = {
          ...this.selectOptions,
          creditCardId:
            this.selectOptionsMapper.mapCreditCardCodes(creditCardCodes),
        };
      });

    this.transactionTypesList$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((transactionTypes) => {
        this.selectOptions = {
          ...this.selectOptions,
          type: this.selectOptionsMapper.mapTransactionTypes(transactionTypes),
        };
      });

    this.merchantList$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((merchants) => {
        this.selectOptions = {
          ...this.selectOptions,
          merchantId: this.selectOptionsMapper.mapMerchants(merchants),
        };
      });
  }

  private mapToTransactionCreate(newTransaction: any): ITransactionsCreate {
    return {
      amount: newTransaction.amount,
      type: newTransaction.type,
      description: newTransaction.description,
      creditCardId: newTransaction.creditCardId,
      transactionDate: newTransaction.transactionDate,
      merchantId: newTransaction.merchantId,
    };
  }

  async obtenerMerchants(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.merchantService,
      "getMerchants",
      this.merchantList$,
      "Error al cargar comercios"
    );
  }

  async obtenerTiposTransacciones(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.transactionsService,
      "getTransactionTypes",
      this.transactionTypesList$,
      "Error al cargar tipos de transacciones"
    );
  }

  async obtenerCreditCardCodes(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.creditcardService,
      "getCreditCardCodes",
      this.creditCardCodesList$,
      "Error al cargar códigos de tarjetas de crédito"
    );
  }

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
      this.transactionsList$.next(data);
    } catch (error) {
      // Error al cargar transacciones por fecha
    }
  }

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
   * Genera columnas personalizadas para la tabla de transacciones
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
