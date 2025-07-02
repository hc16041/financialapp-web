import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AvalGarantizadoDTO } from "src/app/application/nrp51/avalgarantizado/DTO/AvalGarantizadoDTO";
import { AvalGarantizadoService } from "src/app/application/nrp51/avalgarantizado/Services/AvalGarantizado.service";
import { DataService } from "src/app/core/services/data.service";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";

@Component({
  selector: "app-nrp51-avalgarantizado",
  templateUrl: "./nrp51-avalgarantizado.component.html",
  styleUrl: "./nrp51-avalgarantizado.component.scss",
})
export class Nrp51AvalGarantizadoComponent {
  //table data avalgarantizado
  avalgarantizadoList$: BehaviorSubject<AvalGarantizadoDTO[]> = new BehaviorSubject<AvalGarantizadoDTO[]>(
    []
  );

  // Table data
  avalgarantizadoDTO = new AvalGarantizadoDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.avalgarantizadoDTO);

  constructor(
    private dataService: DataService,
    private avalgarantizadoService: AvalGarantizadoService
  ) {}

  ngOnInit(): void {
    this.obtenerAvalGarantizado();
  }

  /**
   * Obtiene el listado de avalgarantizado y emite los datos a avalgarantizadoList$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerAvalGarantizado(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.avalgarantizadoService,
      "getListadoAvalGarantizado",
      this.avalgarantizadoList$,
      "Error al cargar avalgarantizado"
    );
  }

  /**
   * Descarga el archivo XML de las avalgarantizado.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.avalgarantizadoService,
      "getListadoAvalGarantizadoXML",
      "XML",
      "Error al descargar el archivo de avalgarantizado"
    );
  }

  /**
   * Descarga el archivo Excel de las avalgarantizado.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.avalgarantizadoService,
      "getListadoAvalGarantizadoExcel",
      "Excel",
      "Error al descargar el archivo de avalgarantizado"
    );
  }

  /**
   * Descarga el archivo Excel de las avalgarantizado.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarReporte(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.avalgarantizadoService,
      "getListadoAvalGarantizadoReporte",
      "Excel",
      "Error al descargar el archivo de avalgarantizado"
    );
  }
}
