import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CatalogoAgenciasDTO } from "src/app/application/nrsf03/catalogo_agencias/DTO/CatalogoAgenciasDTO";
import { CatalogoAgenciasService } from "src/app/application/nrsf03/catalogo_agencias/Services/CatalogoAgencias.service";
import { DataService } from "src/app/core/services/data.service";
import { generateTableColumns } from "src/app/utils/table-utils";
import { TableColumn } from "../../genericos/generictable/table-column.interface";

@Component({
  selector: "app-nrsf03-catalogo-agencias",
  templateUrl: "./nrsf03-catalogo-agencias.component.html",
  styleUrl: "./nrsf03-catalogo-agencias.component.scss",
})
export class Nrsf03CatalogoAgenciasComponent {
  //table data catalogo agencias
  catalogoAgenciasList$: BehaviorSubject<CatalogoAgenciasDTO[]> =
    new BehaviorSubject<CatalogoAgenciasDTO[]>([]);

  // Table data
  catalogoAgenciasDTO = new CatalogoAgenciasDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.catalogoAgenciasDTO);

  constructor(
    private catalogoAgenciasService: CatalogoAgenciasService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.obtenerCatalogoAgencias();
  }

  /**
   * Obtiene el listado de catalogo agencias y emite los datos a catalogoAgenciasList$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerCatalogoAgencias(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.catalogoAgenciasService,
      "getListadoCatalogoAgencias",
      this.catalogoAgenciasList$,
      "Error al cargar catalogo agencias"
    );
  }

  /**
   * Descarga el archivo XML de las catalogo agencias.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.catalogoAgenciasService,
      "getListadoCatalogoAgenciasXML",
      "XML",
      "Error al descargar el archivo de catalogo agencias"
    );
  }

  /**
   * Descarga el archivo Excel de las catalogo agencias.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.catalogoAgenciasService,
      "getListadoCatalogoAgenciasExcel",
      "Excel",
      "Error al descargar el archivo de catalogo agencias"
    );
  }

  /**
   * Descarga el archivo PDF de las catalogo agencias.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoPDF(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.catalogoAgenciasService,
      "getListadoCatalogoAgenciasPDF",
      "PDF",
      "Error al descargar el archivo de catalogo agencias"
    );
  }

  /**
   * Descarga el archivo de texto plano de las catalogo agencias.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoTexto(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.catalogoAgenciasService,
      "getListadoCatalogoAgenciasTexto",
      "Texto",
      "Error al descargar el archivo de catalogo agencias"
    );
  }
}
