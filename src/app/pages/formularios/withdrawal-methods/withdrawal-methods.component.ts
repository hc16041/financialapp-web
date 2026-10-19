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
import { generateTableColumns } from "src/app/utils/table-utils";
import { WithdrawalMethodsDTO } from "src/app/application/WithdrawalMethods/DTO/WithdrawalMethodsDTO";
import { DataService } from "src/app/core/services/data.service";
import { WithdrawalMethodsService } from "src/app/application/WithdrawalMethods/Services/WithdrawalMethods.service";

/**
 * Mantenimiento de Métodos de Retiro.
 *
 * Patrón moderno (SPEC-06 §4.7): Signals + `computed`, suscripción con
 * `takeUntilDestroyed` y KPIs de conteo (total/activos/inactivos).
 */
@Component({
  selector: "app-withdrawal-methods",
  templateUrl: "./withdrawal-methods.component.html",
  styleUrl: "./withdrawal-methods.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithdrawalMethodsComponent implements OnInit {
  // Inyección de dependencias usando inject()
  private dataService = inject(DataService);
  private withdrawalMethodsService = inject(WithdrawalMethodsService);
  private destroyRef = inject(DestroyRef);

  // Table data - BehaviorSubject para DataService, señal expuesta al template
  private withdrawalMethodsList$ = new BehaviorSubject<WithdrawalMethodsDTO[]>([]);
  private readonly withdrawalMethodsListSig = signal<WithdrawalMethodsDTO[]>([]);

  // Estado de carga para skeletons de KPI
  private readonly loadingSig = signal<boolean>(false);
  readonly loading = this.loadingSig.asReadonly();

  // KPIs de conteo (SPEC-06 §4.5)
  readonly totalMethods = computed(() => {
    const list = this.withdrawalMethodsListSig();
    return list.length === 0 ? null : list.length;
  });

  readonly activeMethods = computed(() => {
    const list = this.withdrawalMethodsListSig();
    if (list.length === 0) {
      return null;
    }
    return list.filter((w) => w.isActive).length;
  });

  readonly inactiveMethods = computed(() => {
    const list = this.withdrawalMethodsListSig();
    if (list.length === 0) {
      return null;
    }
    return list.filter((w) => !w.isActive).length;
  });

  get withdrawalMethodsList(): WithdrawalMethodsDTO[] {
    return this.withdrawalMethodsListSig();
  }

  // Table data
  withdrawalMethodsDTO = new WithdrawalMethodsDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.withdrawalMethodsDTO);

  ngOnInit(): void {
    // Sincronizar el BehaviorSubject con la señal (patrón Signals + takeUntilDestroyed)
    this.withdrawalMethodsList$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.withdrawalMethodsListSig.set(data);
      });
    this.obtenerWithdrawalMethods();
  }

  async obtenerWithdrawalMethods(): Promise<void> {
    this.loadingSig.set(true);
    try {
      await this.dataService.obtenerDatos(
        this.withdrawalMethodsService,
        "getWithdrawalMethods",
        this.withdrawalMethodsList$,
        "Error al cargar métodos de retiro"
      );
    } finally {
      this.loadingSig.set(false);
    }
  }

  async onAddWithdrawalMethod(newWithdrawalMethod: WithdrawalMethodsDTO | Record<string, unknown>): Promise<void> {
    await this.dataService.agregarRegistro(
      this.withdrawalMethodsService,
      "guardarWithdrawalMethods",
      newWithdrawalMethod,
      "Método de retiro agregado correctamente",
      "Error al agregar método de retiro"
    );
    await this.obtenerWithdrawalMethods();
  }

  async onEditWithdrawalMethod(updatedWithdrawalMethod: WithdrawalMethodsDTO | Record<string, unknown>): Promise<void> {
    await this.dataService.actualizarRegistro(
      this.withdrawalMethodsService,
      "editarWithdrawalMethods",
      updatedWithdrawalMethod,
      "Método de retiro actualizado correctamente",
      "Error al actualizar método de retiro"
    );
    await this.obtenerWithdrawalMethods();
  }

  async onDeleteWithdrawalMethod(withdrawalMethod: WithdrawalMethodsDTO | Record<string, unknown>): Promise<void> {
    const withdrawalMethodObj = withdrawalMethod as WithdrawalMethodsDTO & Record<string, unknown>;
    await this.dataService.eliminarRegistro(
      this.withdrawalMethodsService,
      "eliminarWithdrawalMethods",
      withdrawalMethodObj.id,
      "Método de retiro eliminado correctamente",
      "Error al eliminar método de retiro"
    );
    await this.obtenerWithdrawalMethods();
  }
}