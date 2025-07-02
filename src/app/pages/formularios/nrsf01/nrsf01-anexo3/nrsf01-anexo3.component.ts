import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Anexo3DTO } from "src/app/application/nrsf01/anexo3/DTO/Anexo3DTO";
import { Anexo3Service } from "src/app/application/nrsf01/anexo3/Services/Anexo3.service";
import { DataService } from "src/app/core/services/data.service";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";

@Component({
  selector: "app-nrsf01-anexo3",
  templateUrl: "./nrsf01-anexo3.component.html",
  styleUrl: "./nrsf01-anexo3.component.scss",
})
export class Nrsf01Anexo3Component {
  // Table data anexo3
  anexo3List$: BehaviorSubject<Anexo3DTO[]> = new BehaviorSubject<Anexo3DTO[]>(
    []
  );

  // table data
  anexo3DTO = new Anexo3DTO();
  tableColumns: TableColumn[] = generateTableColumns(this.anexo3DTO);

  constructor(
    private dataService: DataService,
    private anexo3Service: Anexo3Service
  ) {}

  ngOnInit(): void {
    this.obtenerAnexo3();
  }

  /**
   * Obtiene el listado de anexo3 y emite los datos a anexo3List$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerAnexo3(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.anexo3Service,
      "getListadoAnexo3",
      this.anexo3List$,
      "Error al cargar anexo3"
    );
  }

  /**
   * Descarga el archivo XML de las anexo3.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo3Service,
      "getListadoAnexo3XML",
      "XML",
      "Error al descargar el archivo de anexo3"
    );
  }

  /**
   * Descarga el archivo Excel de las anexo3.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo3Service,
      "getListadoAnexo3Excel",
      "Excel",
      "Error al descargar el archivo de anexo3"
    );
  }

  /**
   * Descarga el archivo Excel de las anexo3.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarReporte(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo3Service,
      "getListadoAnexo3Reporte",
      "Excel",
      "Error al descargar el archivo de anexo3"
    );
  }
}
