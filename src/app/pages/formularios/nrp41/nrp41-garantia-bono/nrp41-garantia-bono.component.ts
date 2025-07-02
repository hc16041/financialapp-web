import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { GarantiaBonoDTO } from "src/app/application/nrp41/garantia_bono/DTO/GarantiaBonoDTO";
import { GarantiaBonoService } from "src/app/application/nrp41/garantia_bono/Services/GarantiaBono.service";
import { DataService } from "src/app/core/services/data.service";
import { generateTableColumns } from "src/app/utils/table-utils";
import { TableColumn } from "../../genericos/generictable/table-column.interface";

@Component({
  selector: "app-nrp41-garantia-bono",
  templateUrl: "./nrp41-garantia-bono.component.html",
  styleUrl: "./nrp41-garantia-bono.component.scss",
})
export class Nrp41GarantiaBonoComponent {
  // Table data garantia_bono
  garantiasBonosList$ = new BehaviorSubject<GarantiaBonoDTO[]>([]);
  // Table data
  garantiaBonoDTO = new GarantiaBonoDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.garantiaBonoDTO);

  constructor(
    private dataService: DataService,
    private garantiaBonoService: GarantiaBonoService
  ) {}

  ngOnInit(): void {
    this.obtenerGarantiasBonos();
  }

  async obtenerGarantiasBonos(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.garantiaBonoService,
      "getListadoGarantiaBono",
      this.garantiasBonosList$,
      "Error al cargar garantias bonos"
    );
  }

  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.garantiaBonoService,
      "getListadoGarantiaBonoXML",
      "XML",
      "Error al descargar el archivo de garantias bonos"
    );
  }

  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.garantiaBonoService,
      "getListadoGarantiaBonoExcel",
      "Excel",
      "Error al descargar el archivo de garantias bonos"
    );
  }
}
