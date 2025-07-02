import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ReferenciaUnidadDTO } from "src/app/application/nrp41/referencia_unidad/DTO/ReferenciaUnidadDTO";
import { ReferenciaUnidadService } from "src/app/application/nrp41/referencia_unidad/Services/ReferenciaUnidad.service";
import { DataService } from "src/app/core/services/data.service";
import { generateTableColumns } from "src/app/utils/table-utils";
import { TableColumn } from "../../genericos/generictable/table-column.interface";

@Component({
  selector: "app-nrp41-referencia-unidad",
  templateUrl: "./nrp41-referencia-unidad.component.html",
  styleUrl: "./nrp41-referencia-unidad.component.scss",
})
export class Nrp41ReferenciaUnidadComponent {
  // Table data referencia_unidad
  referenciasUnidadesList$: BehaviorSubject<ReferenciaUnidadDTO[]> =
    new BehaviorSubject<ReferenciaUnidadDTO[]>([]);
  // Table data
  referenciaUnidadDTO = new ReferenciaUnidadDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.referenciaUnidadDTO);

  constructor(
    private dataService: DataService,
    private referenciaUnidadService: ReferenciaUnidadService
  ) {}
  ngOnInit(): void {
    this.obtenerReferenciasUnidades();
  }

  async obtenerReferenciasUnidades(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.referenciaUnidadService,
      "getListadoReferenciaUnidad",
      this.referenciasUnidadesList$,
      "Error al cargar referencias unidades"
    );
  }

  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.referenciaUnidadService,
      "getListadoReferenciaUnidadXML",
      "XML",
      "Error al descargar el archivo de referencias unidades"
    );
  }

  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.referenciaUnidadService,
      "getListadoReferenciaUnidadExcel",
      "Excel",
      "Error al descargar el archivo de referencias unidades"
    );
  }
}
