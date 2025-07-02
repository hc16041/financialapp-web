import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { DataService } from "src/app/core/services/data.service";
import { generateTableColumns } from "src/app/utils/table-utils";
import { Anexo6Service } from "src/app/application/nrsf01/anexo6/Services/Anexo6.service";
import { Anexo6DTO } from "src/app/application/nrsf01/anexo6/DTO/Anexo6DTO";

@Component({
  selector: "app-nrsf01-anexo6",
  templateUrl: "./nrsf01-anexo6.component.html",
  styleUrl: "./nrsf01-anexo6.component.scss",
})
export class Nrsf01Anexo6Component {
  // Table data Anexo6
  anexo6List$: BehaviorSubject<Anexo6DTO[]> = new BehaviorSubject<Anexo6DTO[]>(
    []
  );

  // table data
  anexo6DTO = new Anexo6DTO();
  tableColumns: TableColumn[] = generateTableColumns(this.anexo6DTO);

  constructor(
    private dataService: DataService,
    private anexo6Service: Anexo6Service
  ) {}

  ngOnInit(): void {
    this.obtenerAnexo6();
  }

  /**
   * Obtiene el listado de Anexo6 y emite los datos a Anexo6List$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerAnexo6(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.anexo6Service,
      "getListadoAnexo6",
      this.anexo6List$,
      "Error al cargar Anexo6"
    );
  }

  /**
   * Descarga el archivo XML de las Anexo6.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo6Service,
      "getListadoAnexo6XML",
      "XML",
      "Error al descargar el archivo de Anexo6"
    );
  }

  /**
   * Descarga el archivo Excel de las Anexo6.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo6Service,
      "getListadoAnexo6Excel",
      "Excel",
      "Error al descargar el archivo de Anexo6"
    );
  }

  /**
   * Descarga el archivo Excel de las Anexo6.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarReporte(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo6Service,
      "getListadoAnexo6Reporte",
      "Excel",
      "Error al descargar el archivo de Anexo6"
    );
  }
}
