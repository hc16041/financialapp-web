import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { GarantiaFondoDTO } from "src/app/application/nrp41/garantia_fondo/DTO/GarantiaFondoDTO";
import { generateTableColumns } from "src/app/utils/table-utils";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { DataService } from "src/app/core/services/data.service";
import { GarantiaFondoService } from "src/app/application/nrp41/garantia_fondo/Services/GarantiaFondo.service";

@Component({
  selector: "app-nrp41-garantia-fondo",
  templateUrl: "./nrp41-garantia-fondo.component.html",
  styleUrl: "./nrp41-garantia-fondo.component.scss",
})
export class Nrp41GarantiaFondoComponent {
  // Table data garantia_fondo
  garantiasFondoList$: BehaviorSubject<GarantiaFondoDTO[]> =
    new BehaviorSubject<GarantiaFondoDTO[]>([]);

  // Table data
  garantiaFondoDTO = new GarantiaFondoDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.garantiaFondoDTO);

  constructor(
    private dataService: DataService,
    private garantiaFondoService: GarantiaFondoService
  ) {}

  ngOnInit(): void {
    this.obtenerGarantiasFondo();
  }

  async obtenerGarantiasFondo(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.garantiaFondoService,
      "getListadoGarantiaFondo",
      this.garantiasFondoList$,
      "Error al cargar garantias fondo"
    );
  }

  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.garantiaFondoService,
      "getListadoGarantiaFondoXML",
      "XML",
      "Error al descargar el archivo de garantias fondo"
    );
  }

  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.garantiaFondoService,
      "getListadoGarantiaFondoExcel",
      "Excel",
      "Error al descargar el archivo de garantias fondo"
    );
  }
}
