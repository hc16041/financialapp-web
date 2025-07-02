import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DepositoExtranjeroDTO } from "src/app/application/nrp51/depositoextranjero/DTO/DepositoExtranjeroDTO";
import { DepositoExtranjeroService } from "src/app/application/nrp51/depositoextranjero/Services/DepositoExtranjero.service";
import { DataService } from "src/app/core/services/data.service";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";

@Component({
  selector: "app-nrp51-depositoextranjero",
  templateUrl: "./nrp51-depositoextranjero.component.html",
  styleUrl: "./nrp51-depositoextranjero.component.scss",
})
export class Nrp51DepositoExtranjeroComponent {
  //table data depositoextranjero
  depositoextranjeroList$: BehaviorSubject<DepositoExtranjeroDTO[]> = new BehaviorSubject<DepositoExtranjeroDTO[]>(
    []
  );

  // Table data
  depositoextranjeroDTO = new DepositoExtranjeroDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.depositoextranjeroDTO);

  constructor(
    private dataService: DataService,
    private depositoextranjeroService: DepositoExtranjeroService
  ) {}

  ngOnInit(): void {
    this.obtenerDepositoExtranjero();
  }

  /**
   * Obtiene el listado de depositoextranjero y emite los datos a depositoextranjeroList$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerDepositoExtranjero(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.depositoextranjeroService,
      "getListadoDepositoExtranjero",
      this.depositoextranjeroList$,
      "Error al cargar depositoextranjero"
    );
  }

  /**
   * Descarga el archivo XML de las depositoextranjero.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.depositoextranjeroService,
      "getListadoDepositoExtranjeroXML",
      "XML",
      "Error al descargar el archivo de depositoextranjero"
    );
  }

  /**
   * Descarga el archivo Excel de las depositoextranjero.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.depositoextranjeroService,
      "getListadoDepositoExtranjeroExcel",
      "Excel",
      "Error al descargar el archivo de depositoextranjero"
    );
  }

  /**
   * Descarga el archivo Excel de las depositoextranjero.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarReporte(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.depositoextranjeroService,
      "getListadoDepositoExtranjeroReporte",
      "Excel",
      "Error al descargar el archivo de depositoextranjero"
    );
  }
}
