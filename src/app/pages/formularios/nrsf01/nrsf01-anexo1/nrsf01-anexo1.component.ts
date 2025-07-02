import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Anexo1DTO } from "src/app/application/nrsf01/anexo1/DTO/Anexo1DTO";
import { Anexo1Service } from "src/app/application/nrsf01/anexo1/Services/Anexo1.service";
import { DataService } from "src/app/core/services/data.service";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";

@Component({
  selector: "app-nrsf01-anexo1",
  templateUrl: "./nrsf01-anexo1.component.html",
  styleUrl: "./nrsf01-anexo1.component.scss",
})
export class Nrsf01Anexo1Component {
  //table data anexo1
  anexo1List$: BehaviorSubject<Anexo1DTO[]> = new BehaviorSubject<Anexo1DTO[]>(
    []
  );

  // Table data
  anexo1DTO = new Anexo1DTO();
  tableColumns: TableColumn[] = generateTableColumns(this.anexo1DTO);

  constructor(
    private dataService: DataService,
    private anexo1Service: Anexo1Service
  ) {}

  ngOnInit(): void {
    this.obtenerAnexo1();
  }

  /**
   * Obtiene el listado de anexo1 y emite los datos a anexo1List$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerAnexo1(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.anexo1Service,
      "getListadoAnexo1",
      this.anexo1List$,
      "Error al cargar anexo1"
    );
  }

  /**
   * Descarga el archivo XML de las anexo1.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo1Service,
      "getListadoAnexo1XML",
      "XML",
      "Error al descargar el archivo de anexo1"
    );
  }

  /**
   * Descarga el archivo Excel de las anexo1.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo1Service,
      "getListadoAnexo1Excel",
      "Excel",
      "Error al descargar el archivo de anexo1"
    );
  }

  /**
   * Descarga el archivo Excel de las anexo1.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarReporte(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo1Service,
      "getListadoAnexo1Reporte",
      "Excel",
      "Error al descargar el archivo de anexo1"
    );
  }
}
