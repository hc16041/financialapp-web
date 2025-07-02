import { Component } from "@angular/core";
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
})
export class CentriesCargoComponent {
  //Table data cargos
  cargosList$: BehaviorSubject<CargoDTO[]> = new BehaviorSubject<CargoDTO[]>(
    []
  );

  // Table data
  cargoDTO = new CargoDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.cargoDTO);

  constructor(
    private dataService: DataService,
    private cargoService: CargoService
  ) {}

  ngOnInit(): void {
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
    return this.dataService.obtenerDatos(
      this.cargoService,
      "getListadoCargo",
      this.cargosList$,
      "Error al cargar cargos"
    );
  }
  async onAddCargo(newCargo: any): Promise<void> {
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
   * @param {any} updatedCargo Cargo a actualizar.
   * @returns {Promise<void>} Promesa que se resuelve cuando el registro se ha
   * actualizado.
   */
  async onEditCargo(updatedCargo: any): Promise<void> {
    await this.dataService.actualizarRegistro(
      this.cargoService,
      "editarCargo",
      updatedCargo,
      "Cargo actualizado con éxito",
      "Error al actualizar el cargo"
    );

    await this.obtenerCargos(); // Refrescar la lista de cargos después de actualizar
  }

  async onDeleteCargo(cargo: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.cargoService,
      "eliminarCargo",
      cargo,
      "Cargo eliminado con éxito",
      "Error al eliminar el cargo"
    );

    await this.obtenerCargos(); // Refrescar la lista de cargos después de eliminar
  }
}
