import { Component } from "@angular/core";
import { SociosSociedadesDTO } from "src/app/application/nrp41/socios_sociedades/DTO/SociosSociedadesDTO";
import { SociosSociedadesService } from "src/app/application/nrp41/socios_sociedades/Services/SociosSociedades.service";
import { DataService } from "src/app/core/services/data.service";
import { generateTableColumns } from "src/app/utils/table-utils";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-nrp41-socios-sociedades",
  templateUrl: "./nrp41-socios-sociedades.component.html",
  styleUrl: "./nrp41-socios-sociedades.component.scss",
})
export class Nrp41SociosSociedadesComponent {
  // Table data socios_sociedades
  sociosSociedadesList$: BehaviorSubject<SociosSociedadesDTO[]> =
    new BehaviorSubject<SociosSociedadesDTO[]>([]);
  // Table data
  sociosSociedadesDTO = new SociosSociedadesDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.sociosSociedadesDTO);

  constructor(
    private dataService: DataService,
    private sociosSociedadesService: SociosSociedadesService
  ) {}

  ngOnInit(): void {
    this.obtenerSociosSociedades();
  }

  async obtenerSociosSociedades(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.sociosSociedadesService,
      "getListadoSociosSociedades",
      this.sociosSociedadesList$,
      "Error al cargar socios y sociedades"
    );
  }

  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.sociosSociedadesService,
      "getListadoSociosSociedadesXML",
      "XML",
      "Error al descargar el archivo de socios y sociedades"
    );
  }

  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.sociosSociedadesService,
      "getListadoSociosSociedadesExcel",
      "Excel",
      "Error al descargar el archivo de socios y sociedades"
    );
  }
}
