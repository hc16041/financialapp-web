import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DeudaSubordinadaDTO } from "src/app/application/nrp51/deudasubordinada/DTO/DeudaSubordinadaDTO";
import { DeudaSubordinadaService } from "src/app/application/nrp51/deudasubordinada/Services/DeudaSubordinada.service";
import { DataService } from "src/app/core/services/data.service";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";

@Component({
  selector: "app-nrp51-deudasubordinada",
  templateUrl: "./nrp51-deudasubordinada.component.html",
  styleUrl: "./nrp51-deudasubordinada.component.scss",
})
export class Nrp51DeudaSubordinadaComponent {
  //table data deudasubordinada
  deudasubordinadaList$: BehaviorSubject<DeudaSubordinadaDTO[]> = new BehaviorSubject<DeudaSubordinadaDTO[]>(
    []
  );

  // Table data
  deudasubordinadaDTO = new DeudaSubordinadaDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.deudasubordinadaDTO);

  constructor(
    private dataService: DataService,
    private deudasubordinadaService: DeudaSubordinadaService
  ) {}

  ngOnInit(): void {
    this.obtenerDeudaSubordinada();
  }

  /**
   * Obtiene el listado de deudasubordinada y emite los datos a deudasubordinadaList$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerDeudaSubordinada(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.deudasubordinadaService,
      "getListadoDeudaSubordinada",
      this.deudasubordinadaList$,
      "Error al cargar deudasubordinada"
    );
  }

  /**
   * Descarga el archivo XML de las deudasubordinada.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.deudasubordinadaService,
      "getListadoDeudaSubordinadaXML",
      "XML",
      "Error al descargar el archivo de deudasubordinada"
    );
  }

  /**
   * Descarga el archivo Excel de las deudasubordinada.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.deudasubordinadaService,
      "getListadoDeudaSubordinadaExcel",
      "Excel",
      "Error al descargar el archivo de deudasubordinada"
    );
  }

  /**
   * Descarga el archivo Excel de las deudasubordinada.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarReporte(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.deudasubordinadaService,
      "getListadoDeudaSubordinadaReporte",
      "Excel",
      "Error al descargar el archivo de deudasubordinada"
    );
  }
}
