import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Anexo8DTO } from "src/app/application/nrsf01/anexo8/DTO/Anexo8DTO";
import { Anexo8Service } from "src/app/application/nrsf01/anexo8/Services/Anexo8.service";
import { DataService } from "src/app/core/services/data.service";
import { generateTableColumns } from "src/app/utils/table-utils";
import { TableColumn } from "../../genericos/generictable/table-column.interface";

@Component({
  selector: "app-nrsf01-anexo8",
  templateUrl: "./nrsf01-anexo8.component.html",
  styleUrl: "./nrsf01-anexo8.component.scss",
})
export class Nrsf01Anexo8Component {
  // Table data anexo8
  anexo8List$: BehaviorSubject<Anexo8DTO[]> = new BehaviorSubject<Anexo8DTO[]>(
    []
  );

  // Table data
  anexo8DTO = new Anexo8DTO();
  tableColumns: TableColumn[] = generateTableColumns(this.anexo8DTO);

  constructor(
    private dataService: DataService,
    private anexo8Service: Anexo8Service
  ) {}

  ngOnInit(): void {
    this.obtenerAnexo8();
  }

  /**
   * Obtiene el listado de anexo8 y emite los datos a anexo8List$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerAnexo8(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.anexo8Service,
      "getListadoAnexo8",
      this.anexo8List$,
      "Error al cargar anexo8"
    );
  }

  /**
   * Descarga el archivo XML de las anexo8.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo8Service,
      "getListadoAnexo8XML",
      "XML",
      "Error al descargar el archivo de anexo8"
    );
  }

  /**
   * Descarga el archivo Excel de las anexo8.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo8Service,
      "getListadoAnexo8Excel",
      "Excel",
      "Error al descargar el archivo de anexo8"
    );
  }

  /**
   * Descarga el archivo Excel de las anexo8.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarReporte(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo8Service,
      "getListadoAnexo8Reporte",
      "Excel",
      "Error al descargar el archivo de anexo8"
    );
  }
}
