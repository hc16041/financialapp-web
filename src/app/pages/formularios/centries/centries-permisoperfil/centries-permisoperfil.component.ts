import { Component, OnInit, ChangeDetectionStrategy, inject, signal, computed, DestroyRef } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { BehaviorSubject } from "rxjs";
import { PermisoperfilService } from "src/app/application/centries/permisoperfil/Services/Permisoperfil.service";
import { PermisosDTO } from "src/app/application/centries/permisos/DTO/PermisosDTO";
import { DataService } from "src/app/core/services/data.service";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";
import { PermisoperfilDTO } from "../../../../application/centries/permisoperfil/DTO/PermisoperfilDTO";
import { PerfilDTO } from "src/app/application/centries/perfil/DTO/PerfilDTO";
import { PerfilService } from "src/app/application/centries/perfil/Services/Perfil.service";
import { SelectOption } from "src/app/core/services/select-options-mapper.service";
import { AlertcustomService } from "src/app/core/services/alertcustom.service";

@Component({
  selector: "app-centries-permisoperfil",
  templateUrl: "./centries-permisoperfil.component.html",
  styleUrl: "./centries-permisoperfil.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CentriesPermisoperfilComponent implements OnInit {
  // Inyección de dependencias usando inject()
private dataService = inject(DataService);
private permisoperfilService = inject(PermisoperfilService);
private perfilesService = inject(PerfilService);
private destroyRef = inject(DestroyRef);
private alertService = inject(AlertcustomService);

  // Table data usuario - Mantener BehaviorSubject para DataService, pero exponer como signal
  private permisosPerfilList$ = new BehaviorSubject<PermisoperfilDTO[]>([]);
  private readonly permisosPerfilListSig = signal<PermisoperfilDTO[]>([]);

  // Estado de carga para skeletons de KPI
  private readonly loadingSig = signal<boolean>(false);
  readonly loading = this.loadingSig.asReadonly();

  // KPIs de conteo (SPEC-06 §4.6)
  readonly totalAsignaciones = computed(() => {
    const list = this.permisosPerfilListSig();
    return list.length === 0 ? null : list.length;
  });

  readonly perfilesAsignados = computed(() => {
    const list = this.permisosPerfilListSig();
    if (list.length === 0) {
      return null;
    }
    return new Set(list.map((p) => p.id_perfil)).size;
  });

  readonly permisosAsignados = computed(() => {
    const list = this.permisosPerfilListSig();
    if (list.length === 0) {
      return null;
    }
    return new Set(list.map((p) => p.id_permiso)).size;
  });
  
  get permisosPerfilList(): PermisoperfilDTO[] {
    return this.permisosPerfilListSig();
  }

  private permisosPerfilNoAsignadosList$ = new BehaviorSubject<PermisoperfilDTO[]>([]);
  private readonly permisosPerfilNoAsignadosListSig = signal<PermisoperfilDTO[]>([]);
  
  get permisosPerfilNoAsignadosList(): PermisoperfilDTO[] {
    return this.permisosPerfilNoAsignadosListSig();
  }

  private perfilesList$ = new BehaviorSubject<PerfilDTO[]>([]);
  private readonly perfilesListSig = signal<PerfilDTO[]>([]);
  
  get perfilesList(): PerfilDTO[] {
    return this.perfilesListSig();
  }

  // Table data
  permisoperfilDTO = new PermisoperfilDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.permisoperfilDTO);

  // Select options
  selectOptions: { [key: string]: SelectOption[] } = {};

  ngOnInit(): void {
    // Suscribirse a los BehaviorSubjects para actualizar los signals
    this.permisosPerfilList$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.permisosPerfilListSig.set(data);
      });
    this.permisosPerfilNoAsignadosList$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.permisosPerfilNoAsignadosListSig.set(data);
      });
    this.perfilesList$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.perfilesListSig.set(data);
      });

    this.obtenerPermisos();
    this.obtenerPerfiles();

    this.initializeSelectOptions();
    this.setupSubscriptions();
  }

  private initializeSelectOptions(): void {
    this.selectOptions = {
      perfil: this.mapPerfiles(this.perfilesList),
    };
  }

  private setupSubscriptions(): void {
    // Suscripción para perfiles
    this.perfilesList$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((perfiles) => {
        this.selectOptions = {
          ...this.selectOptions,
          perfil: this.mapPerfiles(perfiles),
        };
      });
  }

  private mapPerfiles(perfiles: PerfilDTO[]): SelectOption[] {
    return perfiles.map((p) => ({
      value: p.id_perfil,
      label: p.perfil,
    }));
  }

  private mapPermisos(permisos: PermisosDTO[]): SelectOption[] {
    return permisos.map((p) => ({
      value: p.id_permiso,
      label: p.nombre_permiso,
    }));
  }

  async handleProfileChange(idPerfil: number): Promise<void> {
    try {
      // Obtener los permisos no asignados
      await this.obtenerPermisosNoAsignados(idPerfil);

      // Obtener los permisos actualizados
      const permisosNoAsignados = this.permisosPerfilNoAsignadosList;

      // Actualizar las opciones del select
      this.selectOptions = {
        ...this.selectOptions,
        permisos: this.mapPermisos(permisosNoAsignados),
      };
    } catch (error) {
      console.error("Error al cambiar el perfil:", error);
    }
  }

  async obtenerPerfiles(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.perfilesService,
      "getListadoPerfil",
      this.perfilesList$,
      "Error al cargar perfiles"
    );
  }

  async obtenerPermisos(): Promise<void> {
    this.loadingSig.set(true);
    try {
      await this.dataService.obtenerDatos(
        this.permisoperfilService,
        "obtenerPermisosPerfil",
        this.permisosPerfilList$,
        "Error al cargar permisos"
      );
    } finally {
      this.loadingSig.set(false);
    }
  }
  async obtenerPermisosNoAsignados(id_perfil?: number): Promise<void> {
    try {
      const datos = { id: id_perfil ?? 0 };

      await this.dataService.obtenerDatos(
        this.permisoperfilService,
        "obtenerPermisosPerfilNoAsignados",
        this.permisosPerfilNoAsignadosList$,
        "Error al cargar permisos",
        datos
      );

      // Actualizar inmediatamente las opciones
      const permisosNoAsignados = this.permisosPerfilNoAsignadosList;
      this.selectOptions = {
        ...this.selectOptions,
        permisos: this.mapPermisos(permisosNoAsignados),
      };
    } catch (error) {
      console.error("Error al obtener permisos no asignados:", error);
      this.alertService.showError("Ocurrió un error. Inténtalo de nuevo.");
    }
  }

  async onAddPermisoPerfil(newPermiso: PermisoperfilDTO | Record<string, unknown>): Promise<void> {
    await this.dataService.agregarRegistro(
      this.permisoperfilService,
      "guardarPermisosPerfil",
      newPermiso,
      "Permiso creado correctamente",
      "Error al agregar permiso"
    );

    await this.obtenerPermisos();
  }

  async onDeletePermisoPerfil(permiso: PermisoperfilDTO | Record<string, unknown>): Promise<void> {
    const permisoObj = permiso as PermisoperfilDTO & Record<string, unknown>;
    await this.dataService.eliminarRegistro(
      this.permisoperfilService,
      "eliminarPermisosPerfil",
      { id_perfil: permisoObj.id_perfil, id_permiso: permisoObj.id_permiso },
      "Permiso eliminado correctamente",
      "Error al eliminar permiso"
    );

    await this.obtenerPermisos();
  }
}
