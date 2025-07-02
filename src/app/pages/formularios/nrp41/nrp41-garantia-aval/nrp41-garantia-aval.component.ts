import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { generateTableColumns } from "src/app/utils/table-utils";
import { DataService } from "src/app/core/services/data.service";
import { GarantiaAvalDTO } from "src/app/application/nrp41/garantia_aval/DTO/GarantiaAvalDTO";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { GarantiaAvalService } from "src/app/application/nrp41/garantia_aval/Services/GarantiaAval.service";

@Component({
  selector: "app-nrp41-garantia-aval",
  templateUrl: "./nrp41-garantia-aval.component.html",
  styleUrl: "./nrp41-garantia-aval.component.scss",
})
export class Nrp41GarantiaAvalComponent {
  //Table data garantia_fiduciaria
  garantiasAvalList$: BehaviorSubject<GarantiaAvalDTO[]> = new BehaviorSubject<
    GarantiaAvalDTO[]
  >([]);

  // Table data
  garantiaAvalDTO = new GarantiaAvalDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.garantiaAvalDTO);

  constructor(
    private dataService: DataService,
    private garantiaAvalService: GarantiaAvalService
  ) {}

  ngOnInit(): void {
    this.obtenerGarantiasAval();
  }

  /**
   * Obtiene el listado de garantías aval y emite los datos a garantiasAvalList$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerGarantiasAval(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.garantiaAvalService,
      "getListadoGarantiaAval",
      this.garantiasAvalList$,
      "Error al cargar garantías aval"
    );
  }

  /**
   * Descarga el archivo XML de las garantías aval.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.garantiaAvalService,
      "getListadoGarantiaAvalXML",
      "XML",
      "Error al descargar el archivo de garantías aval"
    );
  }

  /**
   * Descarga el archivo Excel de las garantías aval.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.garantiaAvalService,
      "getListadoGarantiaAvalExcel",
      "Excel",
      "Error al descargar el archivo de garantías aval"
    );
  }
}
