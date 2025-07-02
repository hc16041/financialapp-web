import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Anexo5DTO } from "src/app/application/nrsf01/anexo5/DTO/Anexo5DTO";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";
import { Anexo5Service } from "src/app/application/nrsf01/anexo5/Services/Anexo5.service";
import { DataService } from "src/app/core/services/data.service";

@Component({
  selector: "app-nrsf01-anexo5",
  templateUrl: "./nrsf01-anexo5.component.html",
  styleUrl: "./nrsf01-anexo5.component.scss",
})
export class Nrsf01Anexo5Component {
  // Table data Anexo5
  anexo5List$: BehaviorSubject<Anexo5DTO[]> = new BehaviorSubject<Anexo5DTO[]>(
    []
  );

  // table data
  anexo5DTO = new Anexo5DTO();
  tableColumns: TableColumn[] = generateTableColumns(this.anexo5DTO);

  constructor(
    private dataService: DataService,
    private anexo5Service: Anexo5Service
  ) {}

  ngOnInit(): void {
    this.obtenerAnexo5();
  }

  /**
   * Obtiene el listado de Anexo5 y emite los datos a Anexo5List$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerAnexo5(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.anexo5Service,
      "getListadoAnexo5",
      this.anexo5List$,
      "Error al cargar Anexo5"
    );
  }

  /**
   * Descarga el archivo XML de las Anexo5.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo5Service,
      "getListadoAnexo5XML",
      "XML",
      "Error al descargar el archivo de Anexo5"
    );
  }

  /**
   * Descarga el archivo Excel de las Anexo5.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo5Service,
      "getListadoAnexo5Excel",
      "Excel",
      "Error al descargar el archivo de Anexo5"
    );
  }

  /**
   * Descarga el archivo Excel de las anexo5.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarReporte(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo5Service,
      "getListadoAnexo5Reporte",
      "Excel",
      "Error al descargar el archivo de anexo5"
    );
  }
}
