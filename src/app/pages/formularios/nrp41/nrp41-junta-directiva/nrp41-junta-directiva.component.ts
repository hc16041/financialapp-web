import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { JuntaDirectivaDTO } from "src/app/application/nrp41/junta_directiva/DTO/JuntaDirectivaDTO";
import { JuntaDirectivaService } from "src/app/application/nrp41/junta_directiva/Services/JuntaDirectiva.service";
import { DataService } from "src/app/core/services/data.service";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";

@Component({
  selector: "app-nrp41-junta-directiva",
  templateUrl: "./nrp41-junta-directiva.component.html",
  styleUrl: "./nrp41-junta-directiva.component.scss",
})
export class Nrp41JuntaDirectivaComponent {
  // Table data junta_directiva
  juntaDirectivaList$: BehaviorSubject<JuntaDirectivaDTO[]> =
    new BehaviorSubject<JuntaDirectivaDTO[]>([]);
  // Table data
  juntaDirectivaDTO = new JuntaDirectivaDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.juntaDirectivaDTO);

  constructor(
    private dataService: DataService,
    private juntaDirectivaService: JuntaDirectivaService
  ) {}

  ngOnInit(): void {
    this.obtenerJuntaDirectiva();
  }

  async obtenerJuntaDirectiva(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.juntaDirectivaService,
      "getListadoJuntaDirectiva",
      this.juntaDirectivaList$,
      "Error al cargar junta directiva"
    );
  }

  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.juntaDirectivaService,
      "getListadoJuntaDirectivaXML",
      "XML",
      "Error al descargar el archivo de junta directiva"
    );
  }

  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.juntaDirectivaService,
      "getListadoJuntaDirectivaExcel",
      "Excel",
      "Error al descargar el archivo de junta directiva"
    );
  }
}
