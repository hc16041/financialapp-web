import { Component, OnInit, ChangeDetectionStrategy, inject, signal, computed, DestroyRef } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { BehaviorSubject } from "rxjs";
import { PerfilDTO } from "src/app/application/centries/perfil/DTO/PerfilDTO";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";
import { PerfilService } from "src/app/application/centries/perfil/Services/Perfil.service";
import { DataService } from "src/app/core/services/data.service";

@Component({
  selector: "app-centries-perfil",
  templateUrl: "./centries-perfil.component.html",
  styleUrl: "./centries-perfil.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CentriesPerfilComponent implements OnInit {
  // Inyección de dependencias usando inject()
  private dataService = inject(DataService);
  private perfilService = inject(PerfilService);
  private destroyRef = inject(DestroyRef);

  //Table data perfiles - Mantener BehaviorSubject para DataService, pero exponer como signal
  private perfilesList$ = new BehaviorSubject<PerfilDTO[]>([]);
  private readonly perfilesListSig = signal<PerfilDTO[]>([]);

  // Estado de carga para skeletons de KPI
  private readonly loadingSig = signal<boolean>(false);
  readonly loading = this.loadingSig.asReadonly();

  // KPIs de conteo (SPEC-06 §4.6)
  readonly totalPerfiles = computed(() => {
    const list = this.perfilesListSig();
    return list.length === 0 ? null : list.length;
  });

  get perfilesList(): PerfilDTO[] {
    return this.perfilesListSig();
  }

  // Table data
  perfilDTO = new PerfilDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.perfilDTO);

  ngOnInit(): void {
    // Sincronizar el BehaviorSubject con la señal (patrón Signals + takeUntilDestroyed)
    this.perfilesList$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.perfilesListSig.set(data);
      });
    this.obtenerPerfiles();
  }

  async obtenerPerfiles(): Promise<void> {
    this.loadingSig.set(true);
    try {
      await this.dataService.obtenerDatos(
        this.perfilService,
        "getListadoPerfil",
        this.perfilesList$,
        "Error al cargar perfiles"
      );
    } finally {
      this.loadingSig.set(false);
    }
  }

  async onAddPerfil(newPerfil: PerfilDTO | Record<string, unknown>): Promise<void> {
    await this.dataService.agregarRegistro(
      this.perfilService,
      "guardarPerfil",
      newPerfil,
      "Perfil creado con éxito",
      "Error al crear el perfil"
    );
    await this.obtenerPerfiles();
  }

  async onEditPerfil(updatedPerfil: PerfilDTO | Record<string, unknown>): Promise<void> {
    const token = localStorage.getItem("authToken")?.toString() || "";

    await this.dataService.actualizarRegistro(
      this.perfilService,
      "editarPerfil",
      updatedPerfil,
      "Perfil actualizado con éxito",
      "Error al actualizar el perfil",
      token
    );
    await this.obtenerPerfiles();
  }

  async onDeletePerfil(perfil: PerfilDTO | Record<string, unknown>): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.perfilService,
      "eliminarPerfil",
      perfil as Record<string, unknown>,
      "Perfil eliminado con éxito",
      "Error al eliminar el perfil"
    );
    await this.obtenerPerfiles();
  }
}
