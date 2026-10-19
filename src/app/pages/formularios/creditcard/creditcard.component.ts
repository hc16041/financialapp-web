import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
  DestroyRef,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { BehaviorSubject } from "rxjs";
import { TableColumn } from "../genericos/generictable/table-column.interface";
import { CreditcardDTO } from "src/app/application/creditcard/DTO/CreditcardDTO";
import { CreditCardsSummaryDto } from "src/app/application/creditcard/DTO/CreditCardsSummary.dto";
import { generateTableColumns } from "src/app/utils/table-utils";
import { DataService } from "src/app/core/services/data.service";
import { CreditcardService } from "src/app/application/creditcard/Services/Creditcard.service";
import { ICreditcardEdit } from "src/app/application/creditcard/Interfaces/ICreditcard.interface";
import { SelectOption } from "src/app/core/services/select-options-mapper.service";

/**
 * Mantenimiento de Tarjetas de Crédito.
 *
 * Patrón moderno (SPEC-06 §4.7): Signals + `computed`, suscripción al
 * `BehaviorSubject` (requerido por `DataService.obtenerDatos`) con
 * `takeUntilDestroyed`, y KPIs que consumen `GET api/CreditCards/summary`
 * con *fallback* a las sumas de la lista cargada.
 */
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
  private destroyRef = inject(DestroyRef);

  // Table data - BehaviorSubject para DataService, señal expuesta al template
  private creditcardList$ = new BehaviorSubject<CreditcardDTO[]>([]);
  private readonly creditcardListSig = signal<CreditcardDTO[]>([]);

  // Resumen agregado del backend (GET CreditCards/summary)
  private readonly summarySig = signal<CreditCardsSummaryDto | null>(null);
  readonly summary = this.summarySig.asReadonly();

  // Estado de carga para skeletons de KPI
  private readonly loadingSig = signal<boolean>(false);
  readonly loading = this.loadingSig.asReadonly();

  // KPIs (SPEC-06 §4.2): usan el resumen del backend; si no está disponible,
  // caen a las sumas calculadas sobre la lista ya cargada.
  readonly totalLimit = computed(() => {
    const list = this.creditcardListSig();
    if (list.length === 0) {
      return null;
    }
    const s = this.summarySig();
    if (s !== null) {
      return s.totalCreditLimit;
    }
    return list.reduce((sum, card) => sum + (card.creditLimit || 0), 0);
  });

  readonly usedBalance = computed(() => {
    const list = this.creditcardListSig();
    if (list.length === 0) {
      return null;
    }
    const s = this.summarySig();
    if (s !== null) {
      return s.totalCurrentBalance;
    }
    return list.reduce((sum, card) => sum + (card.currentBalance || 0), 0);
  });

  readonly availableCredit = computed(() => {
    const list = this.creditcardListSig();
    if (list.length === 0) {
      return null;
    }
    const s = this.summarySig();
    if (s !== null) {
      return s.totalAvailableCredit;
    }
    return list.reduce((sum, card) => sum + (card.availableCredit || 0), 0);
  });

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
    // Sincronizar el BehaviorSubject con la señal (patrón Signals + takeUntilDestroyed)
    this.creditcardList$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
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
    this.loadingSig.set(true);
    try {
      await this.dataService.obtenerDatos(
        this.creditcardService,
        "getListadoCreditcard",
        this.creditcardList$,
        "Error al cargar tarjetas de crédito"
      );
      await this.obtenerSummary();
    } finally {
      this.loadingSig.set(false);
    }
  }

  /**
   * Carga el resumen agregado del backend. Si el endpoint falla, los KPIs
   * se calculan desde la lista (computed con fallback) sin romper la vista.
   */
  async obtenerSummary(): Promise<void> {
    try {
      const token = sessionStorage.getItem("authToken") || "";
      const usuario = sessionStorage.getItem("username") || "";
      const summary = await this.creditcardService.getSummary(token, usuario);
      this.summarySig.set(summary);
    } catch (error) {
      console.error("Error al cargar resumen de tarjetas (fallback a lista):", error);
      this.summarySig.set(null);
    }
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