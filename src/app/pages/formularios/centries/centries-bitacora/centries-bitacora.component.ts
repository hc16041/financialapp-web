import { Component, OnInit, ChangeDetectionStrategy, inject, signal } from "@angular/core";
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CentriesBitacoraComponent implements OnInit {
  // Inyección de dependencias usando inject()
  private dataService = inject(DataService);
  private bitacoraService = inject(BitacoraService);

  // Table data bitacora - Mantener BehaviorSubject para DataService, pero exponer como signal
  private bitacoraList$ = new BehaviorSubject<BitacoraDTO[]>([]);
  private readonly bitacoraListSig = signal<BitacoraDTO[]>([]);
  
  get bitacoraList(): BitacoraDTO[] {
    return this.bitacoraListSig();
  }

  // Table data
  bitacoraDTO = new BitacoraDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.bitacoraDTO);

  ngOnInit(): void {
    // Suscribirse al BehaviorSubject para actualizar el signal
    this.bitacoraList$.subscribe(data => {
      this.bitacoraListSig.set(data);
    });
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

  async descargarArchivo(archivo: BitacoraDTO | Record<string, unknown>): Promise<void> {
    const archivoObj = archivo as BitacoraDTO & Record<string, unknown>;
    const tipoArchivo = typeof archivoObj.tipo_archivo === 'string' 
      ? archivoObj.tipo_archivo.split("/")[1]?.toLowerCase() 
      : '';
    const tipo = tipoArchivo;

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
