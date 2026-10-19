import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
  DestroyRef,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { BehaviorSubject } from "rxjs";
import { TableColumn } from "../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";
import { PlatformsDTO } from "src/app/application/Platforms/DTO/PlatformsDTO";
import { DataService } from "src/app/core/services/data.service";
import { PlatformsService } from "src/app/application/Platforms/Services/Platforms.service";

/**
 * Mantenimiento de Plataformas de inversión.
 *
 * Patrón moderno (SPEC-06 §4.7): Signals + `computed`, suscripción con
 * `takeUntilDestroyed` y KPIs de conteo (total/activos/inactivos).
 */
@Component({
  selector: "app-platforms",
  templateUrl: "./platforms.component.html",
  styleUrl: "./platforms.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatformsComponent implements OnInit {
  // Inyección de dependencias usando inject()
  private dataService = inject(DataService);
  private platformsService = inject(PlatformsService);
  private destroyRef = inject(DestroyRef);

  // Table data - BehaviorSubject para DataService, señal expuesta al template
  private platformsList$ = new BehaviorSubject<PlatformsDTO[]>([]);
  private readonly platformsListSig = signal<PlatformsDTO[]>([]);

  // Estado de carga para skeletons de KPI
  private readonly loadingSig = signal<boolean>(false);
  readonly loading = this.loadingSig.asReadonly();

  // KPIs de conteo (SPEC-06 §4.5)
  readonly totalPlatforms = computed(() => {
    const list = this.platformsListSig();
    return list.length === 0 ? null : list.length;
  });

  readonly activePlatforms = computed(() => {
    const list = this.platformsListSig();
    if (list.length === 0) {
      return null;
    }
    return list.filter((p) => p.isActive).length;
  });

  readonly inactivePlatforms = computed(() => {
    const list = this.platformsListSig();
    if (list.length === 0) {
      return null;
    }
    return list.filter((p) => !p.isActive).length;
  });

  get platformsList(): PlatformsDTO[] {
    return this.platformsListSig();
  }

  // Table data
  platformsDTO = new PlatformsDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.platformsDTO);

  ngOnInit(): void {
    // Sincronizar el BehaviorSubject con la señal (patrón Signals + takeUntilDestroyed)
    this.platformsList$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.platformsListSig.set(data);
      });
    this.obtenerPlatforms();
  }

  async obtenerPlatforms(): Promise<void> {
    this.loadingSig.set(true);
    try {
      await this.dataService.obtenerDatos(
        this.platformsService,
        "getPlatforms",
        this.platformsList$,
        "Error al cargar plataformas"
      );
    } finally {
      this.loadingSig.set(false);
    }
  }

  async onAddPlatform(newPlatform: PlatformsDTO | Record<string, unknown>): Promise<void> {
    await this.dataService.agregarRegistro(
      this.platformsService,
      "guardarPlatforms",
      newPlatform,
      "Plataforma agregada correctamente",
      "Error al agregar plataforma"
    );
    await this.obtenerPlatforms();
  }

  async onEditPlatform(updatedPlatform: PlatformsDTO | Record<string, unknown>): Promise<void> {
    await this.dataService.actualizarRegistro(
      this.platformsService,
      "editarPlatforms",
      updatedPlatform,
      "Plataforma actualizada correctamente",
      "Error al actualizar plataforma"
    );
    await this.obtenerPlatforms();
  }

  async onDeletePlatform(platform: PlatformsDTO | Record<string, unknown>): Promise<void> {
    const platformObj = platform as PlatformsDTO & Record<string, unknown>;
    await this.dataService.eliminarRegistro(
      this.platformsService,
      "eliminarPlatforms",
      platformObj.id,
      "Plataforma eliminada correctamente",
      "Error al eliminar plataforma"
    );
    await this.obtenerPlatforms();
  }
}