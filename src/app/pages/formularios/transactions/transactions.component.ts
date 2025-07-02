import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TableColumn } from "../genericos/generictable/table-column.interface";
import { TransactionsDTO } from "src/app/application/transactions/DTO/TransactionsDTO";
import { generateTableColumns } from "src/app/utils/table-utils";
import { DataService } from "src/app/core/services/data.service";
import { TransactionsService } from "src/app/application/transactions/Services/Transactions.service";
import { ITransactionsCreate } from "src/app/application/transactions/Interfaces/ITransactions.interface";
import { CreditcardService } from "src/app/application/creditcard/Services/Creditcard.service";
import { CreditcardDTO } from "src/app/application/creditcard/DTO/CreditcardDTO";

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

  // Table data
  transactionsDTO = new TransactionsDTO();

  // Table columns
  tableColumns: TableColumn[] = generateTableColumns(this.transactionsDTO);

  // Select options
  selectOptions: { [key: string]: any[] } = {};

  constructor(
    private dataService: DataService,
    private transactionsService: TransactionsService,
    private creditcardService: CreditcardService
  ) {}

  ngOnInit(): void {
    this.obtenerTransactions();
    this.obtenerCreditCardCodes();
    this.obtenerTiposTransacciones();
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
    this.creditCardCodesList$.subscribe((creditCardCodes) => {
      this.selectOptions = {
        ...this.selectOptions,
        creditCardId: this.mapCreditCardCodes(creditCardCodes),
      };
    });
    this.transactionTypesList$.subscribe((transactionTypes) => {
      this.selectOptions = {
        ...this.selectOptions,
        type: this.mapTransactionTypes(transactionTypes),
      };
    });
  }

  private mapCreditCardCodes(creditCardCodes: any[]): any[] {
    return creditCardCodes.map((c: any) => ({
      value: c.codigo,
      label: c.descripcion,
    }));
  }

  private mapTransactionTypes(transactionTypes: any[]): any[] {
    return transactionTypes.map((t: any) => ({
      value: t.id,
      label: t.name,
    }));
  }

  private mapToTransactionCreate(newTransaction: any): ITransactionsCreate {
    return {
      amount: newTransaction.amount,
      type: newTransaction.type,
      description: newTransaction.description,
      creditCardId: newTransaction.creditCardId,
      transactionDate: newTransaction.transactionDate,
    };
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
    return this.dataService.obtenerDatos(
      this.transactionsService,
      "getListadoTransactions",
      this.transactionsList$,
      "Error al cargar transacciones"
    );
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
}
