import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Anexo10DTO } from "src/app/application/nrsf01/anexo10/DTO/Anexo10DTO";
import { Anexo10Service } from "src/app/application/nrsf01/anexo10/Services/Anexo10.service";
import { DataService } from "src/app/core/services/data.service";
import { generateTableColumns } from "src/app/utils/table-utils";
import { TableColumn } from "../../genericos/generictable/table-column.interface";

@Component({
  selector: "app-nrfs01-anexo10",
  templateUrl: "./nrfs01-anexo10.component.html",
  styleUrl: "./nrfs01-anexo10.component.scss",
})
export class Nrfs01Anexo10Component {
  // Table data anexo10
  anexo10List$: BehaviorSubject<Anexo10DTO[]> = new BehaviorSubject<
    Anexo10DTO[]
  >([]);

  // Table data
  anexo10DTO = new Anexo10DTO();
  tableColumns: TableColumn[] = generateTableColumns(this.anexo10DTO);

  constructor(
    private dataService: DataService,
    private anexo10Service: Anexo10Service
  ) {}

  ngOnInit(): void {
    this.obtenerAnexo10();
  }

  /**
   * Obtiene el listado de anexo10 y emite los datos a anexo10List$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerAnexo10(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.anexo10Service,
      "getListadoAnexo10",
      this.anexo10List$,
      "Error al cargar anexo10"
    );
  }

  /**
   * Descarga el archivo XML de las anexo10.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo10Service,
      "getListadoAnexo10XML",
      "XML",
      "Error al descargar el archivo de anexo10"
    );
  }

  /**
   * Descarga el archivo Excel de las anexo10.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo10Service,
      "getListadoAnexo10Excel",
      "Excel",
      "Error al descargar el archivo de anexo10"
    );
  }

  /**
   * Descarga el archivo Excel de las anexo10.
   */
  async descargarReporte(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo10Service,
      "getListadoAnexo10Reporte",
      "Excel",
      "Error al descargar el archivo de anexo10"
    );
  }
}
