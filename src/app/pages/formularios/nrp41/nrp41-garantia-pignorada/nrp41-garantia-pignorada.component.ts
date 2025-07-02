import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { generateTableColumns } from "src/app/utils/table-utils";
import { DataService } from "src/app/core/services/data.service";
import { GarantiaPignoradaDTO } from "src/app/application/nrp41/garantia_pignorada/DTO/GarantiaPignoradaDTO";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { GarantiaPignoradaService } from "src/app/application/nrp41/garantia_pignorada/Services/GarantiaPignorada.service";

@Component({
  selector: "app-nrp41-garantia-pignorada",
  templateUrl: "./nrp41-garantia-pignorada.component.html",
  styleUrl: "./nrp41-garantia-pignorada.component.scss",
})
export class Nrp41GarantiaPignoradaComponent {
  //Table data garantia_fiduciaria
  garantiasPignoradasList$: BehaviorSubject<GarantiaPignoradaDTO[]> =
    new BehaviorSubject<GarantiaPignoradaDTO[]>([]);

  // Table data
  garantiaPignoradaDTO = new GarantiaPignoradaDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.garantiaPignoradaDTO);

  constructor(
    private dataService: DataService,
    private garantiaPignoradaService: GarantiaPignoradaService
  ) {}

  ngOnInit(): void {
    this.obtenerGarantiasAval();
  }

  async obtenerGarantiasAval(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.garantiaPignoradaService,
      "getListadoGarantiaPignorada",
      this.garantiasPignoradasList$,
      "Error al cargar garantias pignoradas"
    );
  }

  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.garantiaPignoradaService,
      "getListadoGarantiaPignoradaXML",
      "XML",
      "Error al descargar el archivo de garantias pignoradas"
    );
  }

  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.garantiaPignoradaService,
      "getListadoGarantiaPignoradaExcel",
      "Excel",
      "Error al descargar el archivo de garantias pignoradas"
    );
  }
}
