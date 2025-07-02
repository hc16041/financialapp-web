import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ReferenciaCanceladaDTO } from "src/app/application/nrp41/referencia_cancelada/DTO/ReferenciaCanceladaDTO";
import { ReferenciaCanceladaService } from "src/app/application/nrp41/referencia_cancelada/Services/ReferenciaCancelada.service";
import { DataService } from "src/app/core/services/data.service";
import { generateTableColumns } from "src/app/utils/table-utils";
import { TableColumn } from "../../genericos/generictable/table-column.interface";

@Component({
  selector: "app-nrp41-referencia-cancelada",
  templateUrl: "./nrp41-referencia-cancelada.component.html",
  styleUrl: "./nrp41-referencia-cancelada.component.scss",
})
export class Nrp41ReferenciaCanceladaComponent {
  // Table data referencia_cancelada
  referenciasCanceladasList$: BehaviorSubject<ReferenciaCanceladaDTO[]> =
    new BehaviorSubject<ReferenciaCanceladaDTO[]>([]);
  // Table data
  referenciaCanceladaDTO = new ReferenciaCanceladaDTO();

  tableColumns: TableColumn[] = generateTableColumns(
    this.referenciaCanceladaDTO
  );
  constructor(
    private dataService: DataService,
    private referenciaCanceladaService: ReferenciaCanceladaService
  ) {}

  ngOnInit(): void {
    this.obtenerReferenciasCanceladas();
  }

  async obtenerReferenciasCanceladas(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.referenciaCanceladaService,
      "getListadoReferenciaCancelada",
      this.referenciasCanceladasList$,
      "Error al cargar referencias canceladas"
    );
  }

  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.referenciaCanceladaService,
      "getListadoReferenciaCanceladaXML",
      "XML",
      "Error al descargar el archivo de referencias canceladas"
    );
  }

  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.referenciaCanceladaService,
      "getListadoReferenciaCanceladaExcel",
      "Excel",
      "Error al descargar el archivo de referencias canceladas"
    );
  }
}
