import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PrestamoGarantizadoDTO } from "src/app/application/nrp51/prestamogarantizado/DTO/PrestamoGarantizadoDTO";
import { PrestamoGarantizadoService } from "src/app/application/nrp51/prestamogarantizado/Services/PrestamoGarantizado.service";
import { DataService } from "src/app/core/services/data.service";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";

@Component({
  selector: "app-nrp51-prestamogarantizado",
  templateUrl: "./nrp51-prestamogarantizado.component.html",
  styleUrl: "./nrp51-prestamogarantizado.component.scss",
})
export class Nrp51PrestamoGarantizadoComponent {
  //table data prestamogarantizado
  prestamogarantizadoList$: BehaviorSubject<PrestamoGarantizadoDTO[]> = new BehaviorSubject<PrestamoGarantizadoDTO[]>(
    []
  );

  // Table data
  prestamogarantizadoDTO = new PrestamoGarantizadoDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.prestamogarantizadoDTO);

  constructor(
    private dataService: DataService,
    private prestamogarantizadoService: PrestamoGarantizadoService
  ) {}

  ngOnInit(): void {
    this.obtenerPrestamoGarantizado();
  }

  /**
   * Obtiene el listado de prestamogarantizado y emite los datos a prestamogarantizadoList$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerPrestamoGarantizado(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.prestamogarantizadoService,
      "getListadoPrestamoGarantizado",
      this.prestamogarantizadoList$,
      "Error al cargar prestamogarantizado"
    );
  }

  /**
   * Descarga el archivo XML de las prestamogarantizado.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.prestamogarantizadoService,
      "getListadoPrestamoGarantizadoXML",
      "XML",
      "Error al descargar el archivo de prestamogarantizado"
    );
  }

  /**
   * Descarga el archivo Excel de las prestamogarantizado.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.prestamogarantizadoService,
      "getListadoPrestamoGarantizadoExcel",
      "Excel",
      "Error al descargar el archivo de prestamogarantizado"
    );
  }

  /**
   * Descarga el archivo Excel de las prestamogarantizado.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarReporte(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.prestamogarantizadoService,
      "getListadoPrestamoGarantizadoReporte",
      "Excel",
      "Error al descargar el archivo de prestamogarantizado"
    );
  }
}
