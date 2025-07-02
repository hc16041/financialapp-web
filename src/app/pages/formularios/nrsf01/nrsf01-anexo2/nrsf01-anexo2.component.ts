import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Anexo2DTO } from "src/app/application/nrsf01/anexo2/DTO/Anexo2DTO";
import { Anexo2Service } from "src/app/application/nrsf01/anexo2/Services/Anexo2.service";
import { DataService } from "src/app/core/services/data.service";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";

@Component({
  selector: "app-nrsf01-anexo2",
  templateUrl: "./nrsf01-anexo2.component.html",
  styleUrl: "./nrsf01-anexo2.component.scss",
})
export class Nrsf01Anexo2Component {
  // Table data anexo2
  anexo2List$: BehaviorSubject<Anexo2DTO[]> = new BehaviorSubject<Anexo2DTO[]>(
    []
  );

  // Table data
  anexo2DTO = new Anexo2DTO();
  tableColumns: TableColumn[] = generateTableColumns(this.anexo2DTO);

  constructor(
    private dataService: DataService,
    private anexo2Service: Anexo2Service
  ) {}

  ngOnInit(): void {
    this.obtenerAnexo2();
  }

  /**
   * Obtiene el listado de anexo2 y emite los datos a anexo2List$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerAnexo2(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.anexo2Service,
      "getListadoAnexo2",
      this.anexo2List$,
      "Error al cargar anexo2"
    );
  }

  /**
   * Descarga el archivo XML de las anexo2.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo2Service,
      "getListadoAnexo2XML",
      "XML",
      "Error al descargar el archivo de anexo2"
    );
  }

  /**
   * Descarga el archivo Excel de las anexo2.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo2Service,
      "getListadoAnexo2Excel",
      "Excel",
      "Error al descargar el archivo de anexo2"
    );
  }

  /**
   * Descarga el archivo Excel de las anexo2.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarReporte(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo2Service,
      "getListadoAnexo2Reporte",
      "Excel",
      "Error al descargar el archivo de anexo2"
    );
  }
}
