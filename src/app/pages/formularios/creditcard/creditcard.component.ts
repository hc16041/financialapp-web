import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TableColumn } from "../genericos/generictable/table-column.interface";
import { CreditcardDTO } from "src/app/application/creditcard/DTO/CreditcardDTO";
import { generateTableColumns } from "src/app/utils/table-utils";
import { DataService } from "src/app/core/services/data.service";
import { CreditcardService } from "src/app/application/creditcard/Services/Creditcard.service";
import { ICreditcardEdit } from "src/app/application/creditcard/Interfaces/ICreditcard.interface";

@Component({
  selector: "app-creditcard",
  templateUrl: "./creditcard.component.html",
  styleUrl: "./creditcard.component.scss",
})
export class CreditcardComponent {
  // Table data
  creditcardList$: BehaviorSubject<CreditcardDTO[]> = new BehaviorSubject<
    CreditcardDTO[]
  >([]);

  // Table data
  creditcardDTO = new CreditcardDTO();
  // Table columns
  tableColumns: TableColumn[] = generateTableColumns(this.creditcardDTO);

  // Select options
  selectOptions: { [key: string]: any[] } = {};

  constructor(
    private dataService: DataService,
    private creditcardService: CreditcardService
  ) {}

  ngOnInit(): void {
    this.obtenerCreditcard();
  }

  private mapToCreditcardEdit(editCreditcard: any): ICreditcardEdit {
    return {
      bankName: editCreditcard.bankName,
      creditLimit: editCreditcard.creditLimit,
      cutOffDay: editCreditcard.cutOffDay,
      paymentDueDay: editCreditcard.paymentDueDay,
      annualInterestRate: editCreditcard.annualInterestRate,
    };
  }

  async obtenerCreditcard(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.creditcardService,
      "getListadoCreditcard",
      this.creditcardList$,
      "Error al cargar tarjetas de crédito"
    );
  }

  async onAddCreditcard(newCreditcard: any): Promise<void> {
    const creditcardFiltrado: ICreditcardEdit =
      this.mapToCreditcardEdit(newCreditcard);
    await this.dataService.agregarRegistro(
      this.creditcardService,
      "guardarCreditcard",
      creditcardFiltrado,
      "Tarjeta de crédito creada correctamente",
      "Error al agregar tarjeta de crédito"
    );

    await this.obtenerCreditcard();
  }
}
