import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { generateTableColumns } from "src/app/utils/table-utils";
import { DataService } from "src/app/core/services/data.service";
import { GarantiaFiduciariaDTO } from "src/app/application/nrp41/garantia_fiduciaria/DTO/GarantiaFiduciariaDTO";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { GarantiaFiduciariaService } from "src/app/application/nrp41/garantia_fiduciaria/Services/GarantiaFiduciaria.service";

@Component({
  selector: "app-nrp41-garantia-fiduciaria",
  templateUrl: "./nrp41-garantia-fiduciaria.component.html",
  styleUrl: "./nrp41-garantia-fiduciaria.component.scss",
})
export class Nrp41GarantiaFiduciariaComponent {
  //Table data garantia_fiduciaria
  garantiasFiduciariasList$: BehaviorSubject<GarantiaFiduciariaDTO[]> =
    new BehaviorSubject<GarantiaFiduciariaDTO[]>([]);

  // Table data
  garantiaFiduciariaDTO = new GarantiaFiduciariaDTO();
  tableColumns: TableColumn[] = generateTableColumns(
    this.garantiaFiduciariaDTO
  );

  constructor(
    private dataService: DataService,
    private garantiaFiduciariaService: GarantiaFiduciariaService
  ) {}

  ngOnInit(): void {
    this.obtenerGarantiasFiduciarias();
  }

  /**
   * Obtiene el listado de garantías fiduciarias y emite los datos a garantiasFiduciariasList$.
   * Muestra un mensaje de error si ocurre un problema al cargar los datos.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */

  async obtenerGarantiasFiduciarias(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.garantiaFiduciariaService,
      "getListadoGarantiaFiduciaria",
      this.garantiasFiduciariasList$,
      "Error al cargar garantias fiduciarias"
    );
  }

  /**
   * Descarga el archivo XML de las garant as fiduciarias.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.garantiaFiduciariaService,
      "getListadoGarantiaFiduciariaXML",
      "XML",
      "Error al descargar el archivo de garantias fiduciarias"
    );
  }

  /**
   * Descarga el archivo Excel de las garantías fiduciarias.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */

  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.garantiaFiduciariaService,
      "getListadoGarantiaFiduciariaExcel",
      "Excel",
      "Error al descargar el archivo de garantias fiduciarias"
    );
  }
}
