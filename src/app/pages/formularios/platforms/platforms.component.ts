import { Component, OnInit, ChangeDetectionStrategy, inject, signal } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TableColumn } from "../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";
import { PlatformsDTO } from "src/app/application/Platforms/DTO/PlatformsDTO";
import { DataService } from "src/app/core/services/data.service";
import { PlatformsService } from "src/app/application/Platforms/Services/Platforms.service";

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

  // Table data - Mantener BehaviorSubject para DataService, pero exponer como signal
  private platformsList$ = new BehaviorSubject<PlatformsDTO[]>([]);
  private readonly platformsListSig = signal<PlatformsDTO[]>([]);
  
  get platformsList(): PlatformsDTO[] {
    return this.platformsListSig();
  }

  // Table data
  platformsDTO = new PlatformsDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.platformsDTO);

  ngOnInit(): void {
    // Suscribirse al BehaviorSubject para actualizar el signal
    this.platformsList$.subscribe(data => {
      this.platformsListSig.set(data);
    });
    this.obtenerPlatforms();
  }

  async obtenerPlatforms(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.platformsService,
      "getPlatforms",
      this.platformsList$,
      "Error al cargar plataformas"
    );
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

