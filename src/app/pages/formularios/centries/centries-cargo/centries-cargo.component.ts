import { Component, OnInit, ChangeDetectionStrategy, inject, signal, computed, DestroyRef } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { BehaviorSubject } from "rxjs";
import { DataService } from "src/app/core/services/data.service";
import { generateTableColumns } from "src/app/utils/table-utils";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { CargoDTO } from "src/app/application/centries/cargo/DTO/CargoDTO";
import { CargoService } from "src/app/application/centries/cargo/Services/Cargo.service";

@Component({
  selector: "app-centries-cargo",
  templateUrl: "./centries-cargo.component.html",
  styleUrl: "./centries-cargo.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CentriesCargoComponent implements OnInit {
  // Inyección de dependencias usando inject()
  private dataService = inject(DataService);
  private cargoService = inject(CargoService);
  private destroyRef = inject(DestroyRef);

  //Table data cargos - Mantener BehaviorSubject para DataService, pero exponer como signal
  private cargosList$ = new BehaviorSubject<CargoDTO[]>([]);
  private readonly cargosListSig = signal<CargoDTO[]>([]);

  // Estado de carga para skeletons de KPI
  private readonly loadingSig = signal<boolean>(false);
  readonly loading = this.loadingSig.asReadonly();

  // KPIs de conteo (SPEC-06 §4.6)
  readonly totalCargos = computed(() => {
    const list = this.cargosListSig();
    return list.length === 0 ? null : list.length;
  });

  get cargosList(): CargoDTO[] {
    return this.cargosListSig();
  }

  // Table data
  cargoDTO = new CargoDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.cargoDTO);

  ngOnInit(): void {
    // Sincronizar el BehaviorSubject con la señal (patrón Signals + takeUntilDestroyed)
    this.cargosList$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.cargosListSig.set(data);
      });
    this.obtenerCargos();
  }

  /**
   * Obtiene el listado de cargos.
   *
   * Realiza una petición al servicio para obtener el listado de cargos y
   * actualiza el observable cargosList$ con el resultado.
   *
   * @returns {Promise<void>} Promesa que se resuelve cuando se ha obtenido el
   * listado de cargos.
   */
  async obtenerCargos(): Promise<void> {
    this.loadingSig.set(true);
    try {
      await this.dataService.obtenerDatos(
        this.cargoService,
        "getListadoCargo",
        this.cargosList$,
        "Error al cargar cargos"
      );
    } finally {
      this.loadingSig.set(false);
    }
  }
  async onAddCargo(newCargo: CargoDTO | Record<string, unknown>): Promise<void> {
    await this.dataService.agregarRegistro(
      this.cargoService,
      "guardarCargo",
      newCargo,
      "Cargo creado con éxito",
      "Error al crear el cargo"
    );

    await this.obtenerCargos(); // Refrescar la lista de cargos luego de agregar
  }

  /**
   * Actualiza un cargo.
   *
   * Hace una solicitud al servicio para actualizar el cargo y muestra un
   * mensaje de éxito o error según corresponda.
   *
   * @param {CargoDTO | Record<string, unknown>} updatedCargo Cargo a actualizar.
   * @returns {Promise<void>} Promesa que se resuelve cuando el registro se ha
   * actualizado.
   */
  async onEditCargo(updatedCargo: CargoDTO | Record<string, unknown>): Promise<void> {
    await this.dataService.actualizarRegistro(
      this.cargoService,
      "editarCargo",
      updatedCargo,
      "Cargo actualizado con éxito",
      "Error al actualizar el cargo"
    );

    await this.obtenerCargos(); // Refrescar la lista de cargos después de actualizar
  }

  async onDeleteCargo(cargo: CargoDTO | Record<string, unknown>): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.cargoService,
      "eliminarCargo",
      cargo as Record<string, unknown>,
      "Cargo eliminado con éxito",
      "Error al eliminar el cargo"
    );

    await this.obtenerCargos(); // Refrescar la lista de cargos después de eliminar
  }
}
