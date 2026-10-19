import { Component, OnInit, ChangeDetectionStrategy, inject, signal, computed, DestroyRef } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
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
  private destroyRef = inject(DestroyRef);

  // Table data bitacora - Mantener BehaviorSubject para DataService, pero exponer como signal
  private bitacoraList$ = new BehaviorSubject<BitacoraDTO[]>([]);
  private readonly bitacoraListSig = signal<BitacoraDTO[]>([]);

  // Estado de carga para skeletons de KPI
  private readonly loadingSig = signal<boolean>(false);
  readonly loading = this.loadingSig.asReadonly();

  // KPIs de conteo (SPEC-06 §4.6)
  readonly totalDescargas = computed(() => {
    const list = this.bitacoraListSig();
    return list.length === 0 ? null : list.length;
  });

  readonly xmlDownloads = computed(() => {
    const list = this.bitacoraListSig();
    if (list.length === 0) {
      return null;
    }
    return list.filter((b) => String(b.tipo_archivo || "").toLowerCase().includes("xml")).length;
  });

  readonly excelDownloads = computed(() => {
    const list = this.bitacoraListSig();
    if (list.length === 0) {
      return null;
    }
    return list.filter((b) => {
      const tipo = String(b.tipo_archivo || "").toLowerCase();
      return tipo.includes("excel") || tipo.includes("spreadsheet");
    }).length;
  });

  get bitacoraList(): BitacoraDTO[] {
    return this.bitacoraListSig();
  }

  // Table data
  bitacoraDTO = new BitacoraDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.bitacoraDTO);

  ngOnInit(): void {
    // Sincronizar el BehaviorSubject con la señal (patrón Signals + takeUntilDestroyed)
    this.bitacoraList$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.bitacoraListSig.set(data);
      });
    this.obtenerBitacora();
  }

  async obtenerBitacora(): Promise<void> {
    this.loadingSig.set(true);
    try {
      await this.dataService.obtenerDatos(
        this.bitacoraService,
        "getListadoBitacora",
        this.bitacoraList$,
        "Error al cargar bitácora"
      );
    } finally {
      this.loadingSig.set(false);
    }
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
      archivo as Record<string, unknown>
    );
  }
}
