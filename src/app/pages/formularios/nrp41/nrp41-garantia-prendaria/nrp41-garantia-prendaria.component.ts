import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { GarantiaPrendariaDTO } from "src/app/application/nrp41/garantia_prendaria/DTO/GarantiaPrendariaDTO";
import { GarantiaPrendariaService } from "src/app/application/nrp41/garantia_prendaria/Services/GarantiaPrendaria.service";
import { DataService } from "src/app/core/services/data.service";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";

@Component({
  selector: "app-nrp41-garantia-prendaria",
  templateUrl: "./nrp41-garantia-prendaria.component.html",
  styleUrl: "./nrp41-garantia-prendaria.component.scss",
})
export class Nrp41GarantiaPrendariaComponent {
  // Table data garantia_prendaria
  garantiasPrendariasList$: BehaviorSubject<GarantiaPrendariaDTO[]> =
    new BehaviorSubject<GarantiaPrendariaDTO[]>([]);
  // Table data
  garantiaPrendariaDTO = new GarantiaPrendariaDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.garantiaPrendariaDTO);
  constructor(
    private dataService: DataService,
    private garantiaPrendariaService: GarantiaPrendariaService
  ) {}

  ngOnInit(): void {
    this.obtenerGarantiasPrendarias();
  }

  async obtenerGarantiasPrendarias(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.garantiaPrendariaService,
      "getListadoGarantiaPrendaria",
      this.garantiasPrendariasList$,
      "Error al cargar garantias prendarias"
    );
  }

  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.garantiaPrendariaService,
      "getListadoGarantiaPrendariaXML",
      "XML",
      "Error al descargar el archivo de garantias prendarias"
    );
  }

  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.garantiaPrendariaService,
      "getListadoGarantiaPrendariaExcel",
      "Excel",
      "Error al descargar el archivo de garantias prendarias"
    );
  }
}
