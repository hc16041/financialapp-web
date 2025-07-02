import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SaldoCuentaDTO } from "src/app/application/nrp51/saldocuenta/DTO/SaldoCuentaDTO";
import { SaldoCuentaService } from "src/app/application/nrp51/saldocuenta/Services/SaldoCuenta.service";
import { DataService } from "src/app/core/services/data.service";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";

@Component({
  selector: "app-nrp51-saldocuenta",
  templateUrl: "./nrp51-saldocuenta.component.html",
  styleUrl: "./nrp51-saldocuenta.component.scss",
})
export class Nrp51SaldoCuentaComponent {
  //table data saldocuenta
  saldocuentaList$: BehaviorSubject<SaldoCuentaDTO[]> = new BehaviorSubject<SaldoCuentaDTO[]>(
    []
  );

  // Table data
  saldocuentaDTO = new SaldoCuentaDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.saldocuentaDTO);

  constructor(
    private dataService: DataService,
    private saldocuentaService: SaldoCuentaService
  ) {}

  ngOnInit(): void {
    this.obtenerSaldoCuenta();
  }

  /**
   * Obtiene el listado de saldocuenta y emite los datos a saldocuentaList$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerSaldoCuenta(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.saldocuentaService,
      "getListadoSaldoCuenta",
      this.saldocuentaList$,
      "Error al cargar saldocuenta"
    );
  }

  /**
   * Descarga el archivo XML de las saldocuenta.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.saldocuentaService,
      "getListadoSaldoCuentaXML",
      "XML",
      "Error al descargar el archivo de saldocuenta"
    );
  }

  /**
   * Descarga el archivo Excel de las saldocuenta.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.saldocuentaService,
      "getListadoSaldoCuentaExcel",
      "Excel",
      "Error al descargar el archivo de saldocuenta"
    );
  }

  /**
   * Descarga el archivo Excel de las saldocuenta.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarReporte(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.saldocuentaService,
      "getListadoSaldoCuentaReporte",
      "Excel",
      "Error al descargar el archivo de saldocuenta"
    );
  }
}
