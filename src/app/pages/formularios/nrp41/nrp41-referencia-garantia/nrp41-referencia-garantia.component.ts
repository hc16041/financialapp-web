import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { generateTableColumns } from "src/app/utils/table-utils";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { DataService } from "src/app/core/services/data.service";
import { ReferenciaGarantiaDTO } from "src/app/application/nrp41/referencia_garantia/DTO/ReferenciaGarantiaDTO";
import { ReferenciaGarantiaService } from "src/app/application/nrp41/referencia_garantia/Services/Referencia_garantia.service";

@Component({
  selector: "app-nrp41-referencia-garantia",
  templateUrl: "./nrp41-referencia-garantia.component.html",
  styleUrl: "./nrp41-referencia-garantia.component.scss",
})
export class Nrp41ReferenciaGarantiaComponent {
  //Table data personas
  referencia_garantiasList$: BehaviorSubject<ReferenciaGarantiaDTO[]> =
    new BehaviorSubject<ReferenciaGarantiaDTO[]>([]);

  // Table data
  referenciaGaranatiaDTO = new ReferenciaGarantiaDTO();
  tableColumns: TableColumn[] = generateTableColumns(
    this.referenciaGaranatiaDTO
  );

  constructor(
    private dataService: DataService,
    private referenciaGarantiaService: ReferenciaGarantiaService
  ) {}

  ngOnInit(): void {
    this.obtenerPersonas();
  }
  async obtenerPersonas(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.referenciaGarantiaService,
      "getListadoReferenciasGarantia",
      this.referencia_garantiasList$,
      "Error al cargar referencias de garantia"
    );
  }

  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.referenciaGarantiaService,
      "getListadoReferenciasGarantiaXML",
      "XML",
      "Error al descargar el archivo de referencias de garantia"
    );
  }

  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.referenciaGarantiaService,
      "getListadoReferenciasGarantiaExcel",
      "Excel",
      "Error al descargar el archivo de referencias de garantia"
    );
  }
}
