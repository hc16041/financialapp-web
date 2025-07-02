import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ProductosDTO } from "src/app/application/nrsf03/productos/DTO/ProductosDTO";
import { ProductosService } from "src/app/application/nrsf03/productos/Services/Productos.service";
import { DataService } from "src/app/core/services/data.service";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";

@Component({
  selector: "app-nrsf03-productos",
  templateUrl: "./nrsf03-productos.component.html",
  styleUrl: "./nrsf03-productos.component.scss",
})
export class Nrsf03ProductosComponent {
  //table data productos
  productosList$: BehaviorSubject<ProductosDTO[]> = new BehaviorSubject<
    ProductosDTO[]
  >([]);

  // Table data
  productosDTO = new ProductosDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.productosDTO);

  constructor(
    private productosService: ProductosService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  /**
   * Obtiene el listado de productos y emite los datos a productosList$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerProductos(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.productosService,
      "getListadoProductos",
      this.productosList$,
      "Error al cargar productos"
    );
  }

  /**
   * Descarga el archivo XML de los productos.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */

  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.productosService,
      "getListadoProductosXML",
      "XML",
      "Error al descargar el archivo de productos"
    );
  }

  /**
   * Descarga el archivo Excel de los productos.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.productosService,
      "getListadoProductosExcel",
      "Excel",
      "Error al descargar el archivo de productos"
    );
  }

  /**
   * Descarga el archivo PDF de los productos.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoPDF(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.productosService,
      "getListadoProductosPDF",
      "PDF",
      "Error al descargar el archivo de productos"
    );
  }

  /**
   * Descarga el archivo de texto plano de los productos.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoTexto(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.productosService,
      "getListadoProductosTexto",
      "Texto",
      "Error al descargar el archivo de productos"
    );
  }
}
