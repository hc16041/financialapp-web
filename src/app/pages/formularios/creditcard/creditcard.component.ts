import { Component, OnInit, ChangeDetectionStrategy, inject, signal } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TableColumn } from "../genericos/generictable/table-column.interface";
import { CreditcardDTO } from "src/app/application/creditcard/DTO/CreditcardDTO";
import { generateTableColumns } from "src/app/utils/table-utils";
import { DataService } from "src/app/core/services/data.service";
import { CreditcardService } from "src/app/application/creditcard/Services/Creditcard.service";
import { ICreditcardEdit } from "src/app/application/creditcard/Interfaces/ICreditcard.interface";
import { SelectOption } from "src/app/core/services/select-options-mapper.service";

@Component({
  selector: "app-creditcard",
  templateUrl: "./creditcard.component.html",
  styleUrl: "./creditcard.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditcardComponent implements OnInit {
  // Inyección de dependencias usando inject()
  private dataService = inject(DataService);
  private creditcardService = inject(CreditcardService);

  // Table data - Mantener BehaviorSubject para DataService, pero exponer como signal
  private creditcardList$ = new BehaviorSubject<CreditcardDTO[]>([]);
  private readonly creditcardListSig = signal<CreditcardDTO[]>([]);
  
  get creditcardList(): CreditcardDTO[] {
    return this.creditcardListSig();
  }

  // Table data
  creditcardDTO = new CreditcardDTO();
  // Table columns
  tableColumns: TableColumn[] = generateTableColumns(this.creditcardDTO);

  // Select options
  selectOptions: { [key: string]: SelectOption[] } = {};

  ngOnInit(): void {
    // Suscribirse al BehaviorSubject para actualizar el signal
    this.creditcardList$.subscribe(data => {
      this.creditcardListSig.set(data);
    });
    this.obtenerCreditcard();
  }

  private mapToCreditcardEdit(editCreditcard: CreditcardDTO | Record<string, unknown>): ICreditcardEdit {
    const creditcard = editCreditcard as CreditcardDTO & Record<string, unknown>;
    return {
      bankName: creditcard.bankName,
      creditLimit: creditcard.creditLimit,
      cutOffDay: creditcard.cutOffDay,
      paymentDueDay: creditcard.paymentDueDay,
      annualInterestRate: creditcard.annualInterestRate,
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

  async onAddCreditcard(newCreditcard: CreditcardDTO | Record<string, unknown>): Promise<void> {
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
