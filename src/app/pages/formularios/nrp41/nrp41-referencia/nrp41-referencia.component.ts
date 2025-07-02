import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";
import { ReferenciaDTO } from "src/app/application/nrp41/referencia/DTO/ReferenciaDTO";
import { ReferenciaService } from "src/app/application/nrp41/referencia/Services/Referencia.service";
import { DataService } from "src/app/core/services/data.service";

@Component({
  selector: "app-nrp41-referencia",
  templateUrl: "./nrp41-referencia.component.html",
  styleUrl: "./nrp41-referencia.component.scss",
})
export class Nrp41ReferenciaComponent {
  //Table data referencias
  referenciasList$: BehaviorSubject<ReferenciaDTO[]> = new BehaviorSubject<
    ReferenciaDTO[]
  >([]);

  // Table data
  referenciaDTO = new ReferenciaDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.referenciaDTO);

  constructor(
    private dataService: DataService,
    private referenciaService: ReferenciaService
  ) {}

  ngOnInit(): void {
    this.obtenerReferencias();
  }

  async obtenerReferencias(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.referenciaService,
      "getListadoReferencias",
      this.referenciasList$,
      "Error al cargar referencias"
    );
  }

  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.referenciaService,
      "getListadoReferenciasXML",
      "XML",
      "Error al descargar el archivo de referencias"
    );
  }

  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.referenciaService,
      "getListadoReferenciasExcel",
      "Excel",
      "Error al descargar el archivo de referencias"
    );
  }
}
