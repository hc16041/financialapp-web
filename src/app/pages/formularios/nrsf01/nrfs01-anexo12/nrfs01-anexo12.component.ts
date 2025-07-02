import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Anexo12DTO } from "src/app/application/nrsf01/anexo12/DTO/Anexo12DTO";
import { Anexo12Service } from "src/app/application/nrsf01/anexo12/Services/Anexo12.service";
import { DataService } from "src/app/core/services/data.service";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";

@Component({
  selector: "app-nrfs01-anexo12",
  templateUrl: "./nrfs01-anexo12.component.html",
  styleUrl: "./nrfs01-anexo12.component.scss",
})
export class Nrfs01Anexo12Component {
  // Table data anexo12
  anexo12List$: BehaviorSubject<Anexo12DTO[]> = new BehaviorSubject<
    Anexo12DTO[]
  >([]);

  // Table data
  anexo12DTO = new Anexo12DTO();
  tableColumns: TableColumn[] = generateTableColumns(this.anexo12DTO);

  constructor(
    private dataService: DataService,
    private anexo12Service: Anexo12Service
  ) {}

  ngOnInit(): void {
    this.obtenerAnexo12();
  }

  /**
   * Obtiene el listado de anexo12 y emite los datos a anexo12List$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerAnexo12(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.anexo12Service,
      "getListadoAnexo12",
      this.anexo12List$,
      "Error al cargar anexo12"
    );
  }

  /**
   * Descarga el archivo XML de las anexo12.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo12Service,
      "getListadoAnexo12XML",
      "XML",
      "Error al descargar el archivo de anexo12"
    );
  }

  /**
   * Descarga el archivo PDF de las anexo12.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoPDF(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo12Service,
      "getListadoAnexo12PDF",
      "PDF",
      "Error al descargar el archivo de anexo12"
    );
  }

  /**
   * Descarga el archivo Excel de las anexo12.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo12Service,
      "getListadoAnexo12Excel",
      "Excel",
      "Error al descargar el archivo de anexo12"
    );
  }

  /**
   * Descarga el archivo Excel de las anexo12.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarReporte(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo12Service,
      "getListadoAnexo12Reporte",
      "Excel",
      "Error al descargar el archivo de anexo12"
    );
  }
}
