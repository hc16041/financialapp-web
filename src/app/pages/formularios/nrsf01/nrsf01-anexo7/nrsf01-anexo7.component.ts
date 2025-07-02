import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Anexo7DTO } from "src/app/application/nrsf01/anexo7/DTO/Anexo7DTO";
import { Anexo7Service } from "src/app/application/nrsf01/anexo7/Services/Anexo7.service";
import { DataService } from "src/app/core/services/data.service";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";

@Component({
  selector: "app-nrsf01-anexo7",
  templateUrl: "./nrsf01-anexo7.component.html",
  styleUrl: "./nrsf01-anexo7.component.scss",
})
export class Nrsf01Anexo7Component {
  //table data anexo7
  anexo7List$: BehaviorSubject<Anexo7DTO[]> = new BehaviorSubject<Anexo7DTO[]>(
    []
  );

  // Table data
  anexo7DTO = new Anexo7DTO();
  tableColumns: TableColumn[] = generateTableColumns(this.anexo7DTO);

  constructor(
    private dataService: DataService,
    private anexo7Service: Anexo7Service
  ) {}

  ngOnInit(): void {
    this.obtenerAnexo7();
  }

  /**
   * Obtiene el listado de anexo7 y emite los datos a anexo7List$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerAnexo7(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.anexo7Service,
      "getListadoAnexo7",
      this.anexo7List$,
      "Error al cargar anexo7"
    );
  }

  /**
   * Descarga el archivo XML de las anexo7.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo7Service,
      "getListadoAnexo7XML",
      "XML",
      "Error al descargar el archivo de anexo7"
    );
  }

  /**
   * Descarga el archivo Excel de las anexo7.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo7Service,
      "getListadoAnexo7Excel",
      "Excel",
      "Error al descargar el archivo de anexo7"
    );
  }

  /**
   * Descarga el archivo Excel de las anexo7.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarReporte(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo7Service,
      "getListadoAnexo7Reporte",
      "Excel",
      "Error al descargar el archivo de anexo7"
    );
  }
}
