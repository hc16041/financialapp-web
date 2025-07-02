import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ClientesDTO } from "src/app/application/nrsf03/clientes/DTO/ClientesDTO";
import { TitularesDTO } from "src/app/application/nrsf03/titulares/DTO/TitularesDTO";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";
import { DataService } from "src/app/core/services/data.service";
import { TitularesService } from "src/app/application/nrsf03/titulares/Services/Titulares.service";

@Component({
  selector: "app-nrsf03-titulares",
  templateUrl: "./nrsf03-titulares.component.html",
  styleUrl: "./nrsf03-titulares.component.scss",
})
export class Nrsf03TitularesComponent {
  //table data titualres
  titularesList$: BehaviorSubject<TitularesDTO[]> = new BehaviorSubject<
    TitularesDTO[]
  >([]);

  // Table data
  titularesDTO = new TitularesDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.titularesDTO);

  constructor(
    private titularesService: TitularesService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.obtenerTitulares();
  }

  /**
   * Obtiene el listado de titulares y emite los datos a titularesList$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerTitulares(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.titularesService,
      "getListadoTitulares",
      this.titularesList$,
      "Error al cargar titulares"
    );
  }

  /**
   * Descarga el archivo XML de los titulares.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.titularesService,
      "getListadoTitularesXML",
      "XML",
      "Error al descargar el archivo de titulares"
    );
  }

  /**
   * Descarga el archivo Excel de los titulares.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */

  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.titularesService,
      "getListadoTitularesExcel",
      "Excel",
      "Error al descargar el archivo de titulares"
    );
  }

  /**
   * Descarga el archivo PDF de los titulares.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoPDF(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.titularesService,
      "getListadoTitularesPDF",
      "PDF",
      "Error al descargar el archivo de titulares"
    );
  }

  /**
   * Descarga el archivo de texto plano de los titulares.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoTexto(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.titularesService,
      "getListadoTitularesTexto",
      "Texto",
      "Error al descargar el archivo de titulares"
    );
  }
}
