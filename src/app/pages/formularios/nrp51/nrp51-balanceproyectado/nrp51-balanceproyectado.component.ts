import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { BalanceProyectadoDTO } from "src/app/application/nrp51/balanceproyectado/DTO/BalanceProyectadoDTO";
import { BalanceProyectadoService } from "src/app/application/nrp51/balanceproyectado/Services/BalanceProyectado.service";
import { DataService } from "src/app/core/services/data.service";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";

@Component({
  selector: "app-nrp51-balanceproyectado",
  templateUrl: "./nrp51-balanceproyectado.component.html",
  styleUrl: "./nrp51-balanceproyectado.component.scss",
})
export class Nrp51BalanceProyectadoComponent {
  //table data balanceproyectado
  balanceproyectadoList$: BehaviorSubject<BalanceProyectadoDTO[]> = new BehaviorSubject<BalanceProyectadoDTO[]>(
    []
  );

  // Table data
  balanceproyectadoDTO = new BalanceProyectadoDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.balanceproyectadoDTO);

  constructor(
    private dataService: DataService,
    private balanceproyectadoService: BalanceProyectadoService
  ) {}

  ngOnInit(): void {
    this.obtenerBalanceProyectado();
  }

  /**
   * Obtiene el listado de balanceproyectado y emite los datos a balanceproyectadoList$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerBalanceProyectado(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.balanceproyectadoService,
      "getListadoBalanceProyectado",
      this.balanceproyectadoList$,
      "Error al cargar balanceproyectado"
    );
  }

  /**
   * Descarga el archivo XML de las balanceproyectado.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.balanceproyectadoService,
      "getListadoBalanceProyectadoXML",
      "XML",
      "Error al descargar el archivo de balanceproyectado"
    );
  }

  /**
   * Descarga el archivo Excel de las balanceproyectado.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.balanceproyectadoService,
      "getListadoBalanceProyectadoExcel",
      "Excel",
      "Error al descargar el archivo de balanceproyectado"
    );
  }

  /**
   * Descarga el archivo Excel de las balanceproyectado.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarReporte(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.balanceproyectadoService,
      "getListadoBalanceProyectadoReporte",
      "Excel",
      "Error al descargar el archivo de balanceproyectado"
    );
  }
}
