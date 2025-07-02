import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DepositosGarantizadosDTO } from "src/app/application/nrsf03/depositos_garantizados/DTO/DepositosGarantizadosDTO";
import { DepositosGarantizadosService } from "src/app/application/nrsf03/depositos_garantizados/Services/DepositosGarantizados.service";
import { DataService } from "src/app/core/services/data.service";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";

@Component({
  selector: "app-nrsf03-depositos-garantizados",
  templateUrl: "./nrsf03-depositos-garantizados.component.html",
  styleUrl: "./nrsf03-depositos-garantizados.component.scss",
})
export class Nrsf03DepositosGarantizadosComponent {
  //table data depositos garantizados
  depositosGarantizadosList$: BehaviorSubject<DepositosGarantizadosDTO[]> =
    new BehaviorSubject<DepositosGarantizadosDTO[]>([]);

  // Table data
  depositosGarantizadosDTO = new DepositosGarantizadosDTO();
  tableColumns: TableColumn[] = generateTableColumns(
    this.depositosGarantizadosDTO
  );
  constructor(
    private depositosGarantizadosService: DepositosGarantizadosService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.obtenerDepositosGarantizados();
  }

  /**
   * Obtiene el listado de depositos garantizados y emite los datos a depositosGarantizadosList$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerDepositosGarantizados(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.depositosGarantizadosService,
      "getListadoDepositosGarantizados",
      this.depositosGarantizadosList$,
      "Error al cargar depositos garantizados"
    );
  }

  /**
   * Descarga el archivo XML de los depositos garantizados.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.depositosGarantizadosService,
      "getListadoDepositosGarantizadosXML",
      "XML",
      "Error al descargar el archivo de depositos garantizados"
    );
  }

  /**
   * Descarga el archivo Excel de los depositos garantizados.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.depositosGarantizadosService,
      "getListadoDepositosGarantizadosExcel",
      "Excel",
      "Error al descargar el archivo de depositos garantizados"
    );
  }

  /**
   * Descarga el archivo PDF de los depositos garantizados.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoPDF(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.depositosGarantizadosService,
      "getListadoDepositosGarantizadosPDF",
      "PDF",
      "Error al descargar el archivo de depositos garantizados"
    );
  }

  /**
   * Descarga el archivo de texto plano de los depositos garantizados.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoTexto(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.depositosGarantizadosService,
      "getListadoDepositosGarantizadosTexto",
      "Texto",
      "Error al descargar el archivo de depositos garantizados"
    );
  }
}
