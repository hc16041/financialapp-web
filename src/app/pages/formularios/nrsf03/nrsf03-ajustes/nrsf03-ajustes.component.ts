import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AjustesDTO } from "src/app/application/nrsf03/ajustes/DTO/AjustesDTO";
import { AjustesService } from "src/app/application/nrsf03/ajustes/Services/Ajustes.service";
import { DataService } from "src/app/core/services/data.service";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";

@Component({
  selector: "app-nrsf03-ajustes",
  templateUrl: "./nrsf03-ajustes.component.html",
  styleUrl: "./nrsf03-ajustes.component.scss",
})
export class Nrsf03AjustesComponent {
  // Table data ajustes
  ajustesList$: BehaviorSubject<AjustesDTO[]> = new BehaviorSubject<
    AjustesDTO[]
  >([]);

  // Table data
  ajustesDTO = new AjustesDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.ajustesDTO);

  constructor(
    private ajustesService: AjustesService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.obtenerAjustes();
  }

  /**
   * Obtiene el listado de ajustes y emite los datos a ajustesList$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerAjustes(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.ajustesService,
      "getListadoAjustes",
      this.ajustesList$,
      "Error al cargar ajustes"
    );
  }

  /**
   * Descarga el archivo XML de los ajustes.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.ajustesService,
      "getListadoAjustesXML",
      "XML",
      "Error al descargar el archivo de ajustes"
    );
  }

  /**
   * Descarga el archivo Excel de los ajustes.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.ajustesService,
      "getListadoAjustesExcel",
      "Excel",
      "Error al descargar el archivo de ajustes"
    );
  }

  /**
   * Descarga el archivo PDF de los ajustes.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoPDF(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.ajustesService,
      "getListadoAjustesPDF",
      "PDF",
      "Error al descargar el archivo de ajustes"
    );
  }

  /**
   * Descarga el archivo de texto plano de los ajustes.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoTexto(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.ajustesService,
      "getListadoAjustesTexto",
      "Texto",
      "Error al descargar el archivo de ajustes"
    );
  }
}
