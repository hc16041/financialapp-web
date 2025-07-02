import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DatoExtracontableDTO } from "src/app/application/nrp51/datoextracontable/DTO/DatoExtracontableDTO";
import { DatoExtracontableService } from "src/app/application/nrp51/datoextracontable/Services/DatoExtracontable.service";
import { DataService } from "src/app/core/services/data.service";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";

@Component({
  selector: "app-nrp51-datoextracontable",
  templateUrl: "./nrp51-datoextracontable.component.html",
  styleUrl: "./nrp51-datoextracontable.component.scss",
})
export class Nrp51DatoExtracontableComponent {
  //table data datoextracontable
  datoextracontableList$: BehaviorSubject<DatoExtracontableDTO[]> = new BehaviorSubject<DatoExtracontableDTO[]>(
    []
  );

  // Table data
  datoextracontableDTO = new DatoExtracontableDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.datoextracontableDTO);

  constructor(
    private dataService: DataService,
    private datoextracontableService: DatoExtracontableService
  ) {}

  ngOnInit(): void {
    this.obtenerDatoExtracontable();
  }

  /**
   * Obtiene el listado de datoextracontable y emite los datos a datoextracontableList$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerDatoExtracontable(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.datoextracontableService,
      "getListadoDatoExtracontable",
      this.datoextracontableList$,
      "Error al cargar datoextracontable"
    );
  }

  /**
   * Descarga el archivo XML de las datoextracontable.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.datoextracontableService,
      "getListadoDatoExtracontableXML",
      "XML",
      "Error al descargar el archivo de datoextracontable"
    );
  }

  /**
   * Descarga el archivo Excel de las datoextracontable.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.datoextracontableService,
      "getListadoDatoExtracontableExcel",
      "Excel",
      "Error al descargar el archivo de datoextracontable"
    );
  }

  /**
   * Descarga el archivo Excel de las datoextracontable.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarReporte(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.datoextracontableService,
      "getListadoDatoExtracontableReporte",
      "Excel",
      "Error al descargar el archivo de datoextracontable"
    );
  }
}
