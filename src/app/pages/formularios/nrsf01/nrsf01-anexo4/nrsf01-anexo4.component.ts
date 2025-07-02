import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Anexo4DTO } from "src/app/application/nrsf01/anexo4/DTO/Anexo4DTO";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { DataService } from "src/app/core/services/data.service";
import { Anexo4Service } from "src/app/application/nrsf01/anexo4/Services/Anexo4.service";
import { generateTableColumns } from "src/app/utils/table-utils";

@Component({
  selector: "app-nrsf01-anexo4",
  templateUrl: "./nrsf01-anexo4.component.html",
  styleUrl: "./nrsf01-anexo4.component.scss",
})
export class Nrsf01Anexo4Component {
  // Table data Anexo4
  anexo4List$: BehaviorSubject<Anexo4DTO[]> = new BehaviorSubject<Anexo4DTO[]>(
    []
  );

  // table data
  anexo4DTO = new Anexo4DTO();
  tableColumns: TableColumn[] = generateTableColumns(this.anexo4DTO);

  constructor(
    private dataService: DataService,
    private anexo4Service: Anexo4Service
  ) {}

  ngOnInit(): void {
    this.obtenerAnexo4();
  }

  /**
   * Obtiene el listado de Anexo4 y emite los datos a Anexo4List$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerAnexo4(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.anexo4Service,
      "getListadoAnexo4",
      this.anexo4List$,
      "Error al cargar Anexo4"
    );
  }

  /**
   * Descarga el archivo XML de las Anexo4.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo4Service,
      "getListadoAnexo4XML",
      "XML",
      "Error al descargar el archivo de Anexo4"
    );
  }

  /**
   * Descarga el archivo Excel de las Anexo4.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo4Service,
      "getListadoAnexo4Excel",
      "Excel",
      "Error al descargar el archivo de Anexo4"
    );
  }

  /**
   * Descarga el archivo Excel de las anexo4.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarReporte(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo4Service,
      "getListadoAnexo4Reporte",
      "Excel",
      "Error al descargar el archivo de anexo4"
    );
  }
}
