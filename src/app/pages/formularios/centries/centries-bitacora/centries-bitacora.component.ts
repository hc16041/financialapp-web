import { Component } from "@angular/core";
import { BitacoraDTO } from "src/app/application/centries/bitacora/DTO/BitacoraDTO";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { BehaviorSubject } from "rxjs";
import { generateTableColumns } from "src/app/utils/table-utils";
import { DataService } from "src/app/core/services/data.service";
import { BitacoraService } from "src/app/application/centries/bitacora/Services/Bitacora.service";

@Component({
  selector: "app-centries-bitacora",
  templateUrl: "./centries-bitacora.component.html",
  styleUrl: "./centries-bitacora.component.scss",
})
export class CentriesBitacoraComponent {
  // Table data bitacora
  bitacoraList$: BehaviorSubject<BitacoraDTO[]> = new BehaviorSubject<
    BitacoraDTO[]
  >([]);
  // Table data
  bitacoraDTO = new BitacoraDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.bitacoraDTO);

  constructor(
    private dataService: DataService,
    private bitacoraService: BitacoraService
  ) {}

  ngOnInit(): void {
    this.obtenerBitacora();
  }

  async obtenerBitacora(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.bitacoraService,
      "getListadoBitacora",
      this.bitacoraList$,
      "Error al cargar bitácora"
    );
  }

  async descargarArchivo(archivo: any): Promise<void> {

    const tipo = archivo.tipo_archivo.split("/")[1]?.toLowerCase();

    return this.dataService.descargarArchivo(
      this.bitacoraService,
      "getListadoBitacoraArchivo",
      tipo === "xml"
        ? "XML"
        : [
            "excel",
            "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          ].includes(tipo)
        ? "Excel"
        : "Texto",
      "Error al descargar el archivo de bitácora",
      archivo
    );
  }
}
