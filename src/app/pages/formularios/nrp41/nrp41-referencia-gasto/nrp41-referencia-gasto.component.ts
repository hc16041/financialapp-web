import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ReferenciaGastoDTO } from "src/app/application/nrp41/referencia_gasto/DTO/ReferenciaGastoDTO";
import { ReferenciaGastoService } from "src/app/application/nrp41/referencia_gasto/Services/ReferenciaGasto.service";
import { DataService } from "src/app/core/services/data.service";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";

@Component({
  selector: "app-nrp41-referencia-gasto",
  templateUrl: "./nrp41-referencia-gasto.component.html",
  styleUrl: "./nrp41-referencia-gasto.component.scss",
})
export class Nrp41ReferenciaGastoComponent {
  //Table data referencias_gasto
  referenciasGastoList$: BehaviorSubject<ReferenciaGastoDTO[]> =
    new BehaviorSubject<ReferenciaGastoDTO[]>([]);
  // Table data
  referenciaGastoDTO = new ReferenciaGastoDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.referenciaGastoDTO);
  constructor(
    private dataService: DataService,
    private referenciaGastoService: ReferenciaGastoService
  ) {}

  ngOnInit(): void {
    this.obtenerReferenciasGasto();
  }

  async obtenerReferenciasGasto(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.referenciaGastoService,
      "getListadoReferenciaGasto",
      this.referenciasGastoList$,
      "Error al cargar referencias gasto"
    );
  }

  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.referenciaGastoService,
      "getListadoReferenciaGastoXML",
      "XML",
      "Error al descargar el archivo de referencias gasto"
    );
  }

  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.referenciaGastoService,
      "getListadoReferenciaGastoExcel",
      "Excel",
      "Error al descargar el archivo de referencias gasto"
    );
  }
}
