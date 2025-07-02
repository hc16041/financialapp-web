import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Anexo11DTO } from "src/app/application/nrsf01/anexo11/DTO/Anexo11DTO";
import { Anexo11Service } from "src/app/application/nrsf01/anexo11/Services/Anexo11.service";
import { DataService } from "src/app/core/services/data.service";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";

@Component({
  selector: "app-nrfs01-anexo11",
  templateUrl: "./nrfs01-anexo11.component.html",
  styleUrl: "./nrfs01-anexo11.component.scss",
})
export class Nrfs01Anexo11Component {
  // Table data anexo11
  anexo11List$: BehaviorSubject<Anexo11DTO[]> = new BehaviorSubject<
    Anexo11DTO[]
  >([]);
  // Table data
  anexo11DTO = new Anexo11DTO();
  tableColumns: TableColumn[] = generateTableColumns(this.anexo11DTO);
  constructor(
    private dataService: DataService,
    private anexo11Service: Anexo11Service
  ) {}

  ngOnInit(): void {
    this.obtenerAnexo11();
  }

  /**
   * Obtiene el listado de anexo11 y emite los datos a anexo11List$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerAnexo11(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.anexo11Service,
      "getListadoAnexo11",
      this.anexo11List$,
      "Error al cargar anexo11"
    );
  }

  /**
   * Descarga el archivo XML de las anexo11.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo11Service,
      "getListadoAnexo11XML",
      "XML",
      "Error al descargar el archivo de anexo11"
    );
  }

  /**
   * Descarga el archivo PDF de las anexo11.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoPDF(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo11Service,
      "getListadoAnexo11PDF",
      "PDF",
      "Error al descargar el archivo de anexo11"
    );
  }

  /**
   * Descarga el archivo Excel de las anexo11.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo11Service,
      "getListadoAnexo11Excel",
      "Excel",
      "Error al descargar el archivo de anexo11"
    );
  }

  /**
   * Descarga el archivo Excel de las anexo11.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarReporte(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo11Service,
      "getListadoAnexo11Reporte",
      "Excel",
      "Error al descargar el archivo de anexo11"
    );
  }
}
