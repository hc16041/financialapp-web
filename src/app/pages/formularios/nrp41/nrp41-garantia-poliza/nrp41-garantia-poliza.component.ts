import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { GarantiaPolizaDTO } from "src/app/application/nrp41/garantia_poliza/DTO/GarantiaPolizaDTO";
import { generateTableColumns } from "src/app/utils/table-utils";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { DataService } from "src/app/core/services/data.service";
import { GarantiaPolizaService } from "src/app/application/nrp41/garantia_poliza/Services/GarantiaPoliza.service";

@Component({
  selector: "app-nrp41-garantia-poliza",
  templateUrl: "./nrp41-garantia-poliza.component.html",
  styleUrl: "./nrp41-garantia-poliza.component.scss",
})
export class Nrp41GarantiaPolizaComponent {
  // Table data garantia_poliza
  garantiasPolizaList$: BehaviorSubject<GarantiaPolizaDTO[]> =
    new BehaviorSubject<GarantiaPolizaDTO[]>([]);

  // Table data
  garantiaPolizaDTO = new GarantiaPolizaDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.garantiaPolizaDTO);

  constructor(
    private dataService: DataService,
    private garantiaPolizaService: GarantiaPolizaService
  ) {}

  ngOnInit(): void {
    this.obtenerGarantiasPoliza();
  }

  async obtenerGarantiasPoliza(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.garantiaPolizaService,
      "getListadoGarantiaPoliza",
      this.garantiasPolizaList$,
      "Error al cargar garantias poliza"
    );
  }

  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.garantiaPolizaService,
      "getListadoGarantiaPolizaXML",
      "XML",
      "Error al descargar el archivo de garantias poliza"
    );
  }

  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.garantiaPolizaService,
      "getListadoGarantiaPolizaExcel",
      "Excel",
      "Error al descargar el archivo de garantias poliza"
    );
  }
}
