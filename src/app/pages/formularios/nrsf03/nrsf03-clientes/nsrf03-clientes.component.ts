import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ClientesDTO } from "src/app/application/nrsf03/clientes/DTO/ClientesDTO";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";
import { ClientesService } from "src/app/application/nrsf03/clientes/Services/Clientes.service";
import { DataService } from "src/app/core/services/data.service";

@Component({
  selector: "app-nrsf03-clientes",
  templateUrl: "./nrsf03-clientes.component.html",
  styleUrl: "./nrsf03-clientes.component.scss",
})
export class Nrsf03ClientesComponent {
  //table data clientes
  clientesList$: BehaviorSubject<ClientesDTO[]> = new BehaviorSubject<
    ClientesDTO[]
  >([]);

  // Table data
  clientesDTO = new ClientesDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.clientesDTO);

  constructor(
    private clientesService: ClientesService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.obtenerClientes();
  }

  /**
   * Obtiene el listado de clientes y emite los datos a clientesList$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerClientes(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.clientesService,
      "getListadoClientes",
      this.clientesList$,
      "Error al cargar clientes"
    );
  }

  /**
   * Descarga el archivo XML de los clientes.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.clientesService,
      "getListadoClientesXML",
      "XML",
      "Error al descargar el archivo de clientes"
    );
  }

  /**
   * Descarga el archivo Excel de los clientes.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */

  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.clientesService,
      "getListadoClientesExcel",
      "Excel",
      "Error al descargar el archivo de clientes"
    );
  }

  /**
   * Descarga el archivo PDF de los clientes.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoPDF(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.clientesService,
      "getListadoClientesPDF",
      "PDF",
      "Error al descargar el archivo de clientes"
    );
  }

  /**
   * Descarga el archivo de texto de los clientes.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoTexto(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.clientesService,
      "getListadoClientesTexto",
      "Texto",
      "Error al descargar el archivo de clientes"
    );
  }
}
