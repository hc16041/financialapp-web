import { Component } from "@angular/core";
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
})
export class PlatformsComponent {
  // Table data
  platformsList$: BehaviorSubject<PlatformsDTO[]> = new BehaviorSubject<
    PlatformsDTO[]
  >([]);

  // Table data
  platformsDTO = new PlatformsDTO();

  tableColumns: TableColumn[] = generateTableColumns(this.platformsDTO);

  constructor(
    private dataService: DataService,
    private platformsService: PlatformsService
  ) {}

  ngOnInit(): void {
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

  async onAddPlatform(newPlatform: any): Promise<void> {
    await this.dataService.agregarRegistro(
      this.platformsService,
      "guardarPlatforms",
      newPlatform,
      "Plataforma agregada correctamente",
      "Error al agregar plataforma"
    );
    await this.obtenerPlatforms();
  }

  async onEditPlatform(updatedPlatform: any): Promise<void> {
    await this.dataService.actualizarRegistro(
      this.platformsService,
      "editarPlatforms",
      updatedPlatform,
      "Plataforma actualizada correctamente",
      "Error al actualizar plataforma"
    );
    await this.obtenerPlatforms();
  }

  async onDeletePlatform(platform: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.platformsService,
      "eliminarPlatforms",
      platform.id,
      "Plataforma eliminada correctamente",
      "Error al eliminar plataforma"
    );
    await this.obtenerPlatforms();
  }
}

