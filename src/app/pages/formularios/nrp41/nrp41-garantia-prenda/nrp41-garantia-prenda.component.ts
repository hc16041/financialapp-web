import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { GarantiaPrendaDTO } from "src/app/application/nrp41/garantia_prenda/DTO/GarantiaPrendaDTO";
import { GarantiaPrendaService } from "src/app/application/nrp41/garantia_prenda/Services/GarantiaPrenda.service";
import { DataService } from "src/app/core/services/data.service";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";

@Component({
  selector: "app-nrp41-garantia-prenda",
  templateUrl: "./nrp41-garantia-prenda.component.html",
  styleUrl: "./nrp41-garantia-prenda.component.scss",
})
export class Nrp41GarantiaPrendaComponent {
  // Table data garantia_prenda
  garantiasPrendasList$: BehaviorSubject<GarantiaPrendaDTO[]> =
    new BehaviorSubject<GarantiaPrendaDTO[]>([]);
  // Table data
  garantiaPrendaDTO = new GarantiaPrendaDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.garantiaPrendaDTO);

  constructor(
    private dataService: DataService,
    private garantiaPrendaService: GarantiaPrendaService
  ) {}

  ngOnInit(): void {
    this.obtenerGarantiasPrendas();
  }

  async obtenerGarantiasPrendas(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.garantiaPrendaService,
      "getListadoGarantiaPrenda",
      this.garantiasPrendasList$,
      "Error al cargar garantias prendas"
    );
  }

  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.garantiaPrendaService,
      "getListadoGarantiaPrendaXML",
      "XML",
      "Error al descargar el archivo de garantias prendas"
    );
  }

  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.garantiaPrendaService,
      "getListadoGarantiaPrendaExcel",
      "Excel",
      "Error al descargar el archivo de garantias prendas"
    );
  }
}
