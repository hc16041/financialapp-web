import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DocsClienteDTO } from "src/app/application/nrsf03/docs_cliente/DTO/DocsClienteDTO";
import { DocsClienteService } from "src/app/application/nrsf03/docs_cliente/Services/DocsCliente.service";
import { DataService } from "src/app/core/services/data.service";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";

@Component({
  selector: "app-nrsf03-docs-cliente",
  templateUrl: "./nrsf03-docs-cliente.component.html",
  styleUrl: "./nrsf03-docs-cliente.component.scss",
})
export class Nrsf03DocsClienteComponent {
  // table data docclientes
  docsList$: BehaviorSubject<DocsClienteDTO[]> = new BehaviorSubject<
    DocsClienteDTO[]
  >([]);

  //table data
  docsClienteDTO = new DocsClienteDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.docsClienteDTO);

  constructor(
    private docsClienteService: DocsClienteService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.obtenerDocsCliente();
  }

  /**
   * Obtiene el listado de docsclientes y emite los datos a docsList$.
   * Emite un mensaje de error si ocurre un error al cargar los datos.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerDocsCliente(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.docsClienteService,
      "getListadoDocsCliente",
      this.docsList$,
      "Error al cargar docscliente"
    );
  }
  /**
   * Descarga el archivo XML de los docsclientes.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.docsClienteService,
      "getListadoDocsClienteXML",
      "XML",
      "Error al descargar el archivo de docscliente"
    );
  }
  /**
   * Descarga el archivo Excel de los docsclientes.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.docsClienteService,
      "getListadoDocsClienteExcel",
      "Excel",
      "Error al descargar el archivo de docscliente"
    );
  }
  /**
   * Descarga el archivo PDF de los docsclientes.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoPDF(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.docsClienteService,
      "getListadoDocsClientePDF",
      "PDF",
      "Error al descargar el archivo de docscliente"
    );
  }
  /**
   * Descarga el archivo de texto plano de los docsclientes.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoTexto(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.docsClienteService,
      "getListadoDocsClienteTexto",
      "Texto",
      "Error al descargar el archivo de docscliente"
    );
  }
}
