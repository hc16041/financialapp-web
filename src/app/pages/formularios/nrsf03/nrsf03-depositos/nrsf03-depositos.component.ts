import { Component } from "@angular/core";
import { DataService } from "src/app/core/services/data.service";
import { DepositosService } from "src/app/application/nrsf03/depositos/Services/Depositos.service";
import { DepositosDTO } from "../../../../application/nrsf03/depositos/DTO/DepositosDTO";
import { BehaviorSubject } from "rxjs";
import { generateTableColumns } from "src/app/utils/table-utils";
import { TableColumn } from "../../genericos/generictable/table-column.interface";

@Component({
  selector: "app-nrsf03-depositos",
  templateUrl: "./nrsf03-depositos.component.html",
  styleUrl: "./nrsf03-depositos.component.scss",
})
export class Nrsf03DepositosComponent {
  //table data depositos
  depositosList$: BehaviorSubject<DepositosDTO[]> = new BehaviorSubject<
    DepositosDTO[]
  >([]);

  // Table data
  clientesDTO = new DepositosDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.clientesDTO);

  constructor(
    private depositosService: DepositosService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.obtenerDepositos();
  }

  /**
   * Obtiene el listado de depositos y emite los datos a depositosList$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerDepositos(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.depositosService,
      "getListadoDepositos",
      this.depositosList$,
      "Error al cargar depositos"
    );
  }

  /**
   * Descarga el archivo XML de los depositos.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */

  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.depositosService,
      "getListadoDepositosXML",
      "XML",
      "Error al descargar el archivo de depositos"
    );
  }

  /**
   * Descarga el archivo Excel de los depositos.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */

  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.depositosService,
      "getListadoDepositosExcel",
      "Excel",
      "Error al descargar el archivo de depositos"
    );
  }

  /**
   * Descarga el archivo de texto plano de los depositos.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoTexto(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.depositosService,
      "getListadoDepositosTexto",
      "Texto",
      "Error al descargar el archivo de depositos"
    );
  }
}
