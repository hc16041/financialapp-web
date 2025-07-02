import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TituloValorExtranjeroDTO } from "src/app/application/nrp51/titulovalorextranjero/DTO/TituloValorExtranjeroDTO";
import { TituloValorExtranjeroService } from "src/app/application/nrp51/titulovalorextranjero/Services/TituloValorExtranjero.service";
import { DataService } from "src/app/core/services/data.service";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";

@Component({
  selector: "app-nrp51-titulovalorextranjero",
  templateUrl: "./nrp51-titulovalorextranjero.component.html",
  styleUrl: "./nrp51-titulovalorextranjero.component.scss",
})
export class Nrp51TituloValorExtranjeroComponent {
  //table data titulovalorextranjero
  titulovalorextranjeroList$: BehaviorSubject<TituloValorExtranjeroDTO[]> =
    new BehaviorSubject<TituloValorExtranjeroDTO[]>([]);

  // Table data
  titulovalorextranjeroDTO = new TituloValorExtranjeroDTO();
  tableColumns: TableColumn[] = generateTableColumns(
    this.titulovalorextranjeroDTO
  );

  constructor(
    private dataService: DataService,
    private titulovalorextranjeroService: TituloValorExtranjeroService
  ) {}

  ngOnInit(): void {
    this.obtenerTituloValorExtranjero();
  }

  /**
   * Obtiene el listado de titulovalorextranjero y emite los datos a titulovalorextranjeroList$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerTituloValorExtranjero(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.titulovalorextranjeroService,
      "getListadoTituloValorExtranjero",
      this.titulovalorextranjeroList$,
      "Error al cargar titulovalorextranjero"
    );
  }

  /**
   * Descarga el archivo XML de las titulovalorextranjero.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.titulovalorextranjeroService,
      "getListadoTituloValorExtranjeroXML",
      "XML",
      "Error al descargar el archivo de titulovalorextranjero"
    );
  }

  /**
   * Descarga el archivo Excel de las titulovalorextranjero.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.titulovalorextranjeroService,
      "getListadoTituloValorExtranjeroExcel",
      "Excel",
      "Error al descargar el archivo de titulovalorextranjero"
    );
  }

  /**
   * Descarga el archivo Excel de las titulovalorextranjero.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarReporte(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.titulovalorextranjeroService,
      "getListadoTituloValorExtranjeroReporte",
      "Excel",
      "Error al descargar el archivo de titulovalorextranjero"
    );
  }
}
