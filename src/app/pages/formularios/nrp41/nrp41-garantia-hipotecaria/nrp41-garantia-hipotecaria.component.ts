import { Component } from "@angular/core";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { BehaviorSubject } from "rxjs";
import { generateTableColumns } from "src/app/utils/table-utils";
import { AlertcustomService } from "src/app/core/services/alertcustom.service";
import { FileDownloadService } from "src/app/core/services/file-download.service";
import { DataService } from "src/app/core/services/data.service";
import { GarantiaHipotecariaDTO } from "src/app/application/nrp41/garantia_hipotecaria/DTO/GarantiaHipotecariaDTO";
import { GarantiaHipotecariaService } from "src/app/application/nrp41/garantia_hipotecaria/Services/Garantia_hipotecaria.service";

@Component({
  selector: "app-nrp41-garantia-hipotecaria",
  templateUrl: "./nrp41-garantia-hipotecaria.component.html",
  styleUrl: "./nrp41-garantia-hipotecaria.component.scss",
})
export class Nrp41GarantiaHipotecariaComponent {
  //Table data personas
  garantias_hipotecariaList$: BehaviorSubject<GarantiaHipotecariaDTO[]> =
    new BehaviorSubject<GarantiaHipotecariaDTO[]>([]);

  // Table data
  garantiaHipotecariaDTO = new GarantiaHipotecariaDTO();
  tableColumns: TableColumn[] = generateTableColumns(
    this.garantiaHipotecariaDTO
  );

  constructor(
    private dataService: DataService,
    private garantiaHipotecariaService: GarantiaHipotecariaService,
    private alertService: AlertcustomService,
    private fileDownloadService: FileDownloadService
  ) {}

  ngOnInit(): void {
    this.obtenerGarantiasHipotecarias();
  }

  /**
   * Obtiene el listado de garantias hipotecarias y emite los datos a garantias_hipotecariaList$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerGarantiasHipotecarias(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.garantiaHipotecariaService,
      "getListadoGarantiashipotecarias",
      this.garantias_hipotecariaList$,
      "Error al cargar garantias hipotecarias"
    );
  }

  /**
   * Descarga el archivo XML de las garant as hipotecarias.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.garantiaHipotecariaService,
      "getListadoGarantiashipotecariasXML",
      "XML",
      "Error al descargar el archivo de garantias hipotecarias"
    );
  }

  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.garantiaHipotecariaService,
      "getListadoGarantiashipotecariasExcel",
      "Excel",
      "Error al descargar el archivo de garantias hipotecarias"
    );
  }
}
