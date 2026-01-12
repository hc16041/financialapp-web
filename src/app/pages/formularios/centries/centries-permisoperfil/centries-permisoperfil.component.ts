import { ChangeDetectorRef, Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PermisoperfilService } from "src/app/application/centries/permisoperfil/Services/Permisoperfil.service";
import { PermisosDTO } from "src/app/application/centries/permisos/DTO/PermisosDTO";
import { DataService } from "src/app/core/services/data.service";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";
import { PermisoperfilDTO } from "../../../../application/centries/permisoperfil/DTO/PermisoperfilDTO";
import { PerfilDTO } from "src/app/application/centries/perfil/DTO/PerfilDTO";
import { PerfilService } from "src/app/application/centries/perfil/Services/Perfil.service";

@Component({
  selector: "app-centries-permisoperfil",
  templateUrl: "./centries-permisoperfil.component.html",
  styleUrl: "./centries-permisoperfil.component.scss",
})
export class CentriesPermisoperfilComponent {
  // Table data usuario
  permisosPerfilList$: BehaviorSubject<PermisoperfilDTO[]> =
    new BehaviorSubject<PermisoperfilDTO[]>([]);
  permisosPerfilNoAsignadosList$: BehaviorSubject<PermisoperfilDTO[]> =
    new BehaviorSubject<PermisoperfilDTO[]>([]);
  perfilesList$: BehaviorSubject<any[]> = new BehaviorSubject<PerfilDTO[]>([]);
  // Table data
  permisoperfilDTO = new PermisoperfilDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.permisoperfilDTO);

  // Select options
  selectOptions: { [key: string]: any[] } = {};
  constructor(
    private dataService: DataService,
    private permisoperfilService: PermisoperfilService,
    private perfilesService: PerfilService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.obtenerPermisos();
    this.obtenerPerfiles();

    this.initializeSelectOptions();
    this.setupSubscriptions();
  }

  private initializeSelectOptions(): void {
    this.selectOptions = {
      perfil: this.mapPerfiles(this.perfilesList$.getValue()),
    };
  }

  private setupSubscriptions(): void {
    // Suscripción para perfiles
    this.perfilesList$.subscribe((perfiles) => {
      this.selectOptions = {
        ...this.selectOptions,
        perfil: this.mapPerfiles(perfiles),
      };
    });
  }

  private mapPerfiles(perfiles: PerfilDTO[]): any[] {
    return perfiles.map((p) => ({
      value: p.id_perfil,
      label: p.perfil,
    }));
  }

  private mapPermisos(permisos: PermisosDTO[]): any[] {
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
      const permisosNoAsignados =
        this.permisosPerfilNoAsignadosList$.getValue();

      // Actualizar las opciones del select
      this.selectOptions = {
        ...this.selectOptions,
        permisos: this.mapPermisos(
          this.permisosPerfilNoAsignadosList$.getValue()
        ),
      };

      // 3. Forzar actualización reactiva
      this.cdRef.markForCheck();
      this.permisosPerfilNoAsignadosList$.next([
        ...this.permisosPerfilNoAsignadosList$.getValue(),
      ]);
    } catch (error) {
      // Error al cambiar el perfil
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
    return this.dataService.obtenerDatos(
      this.permisoperfilService,
      "obtenerPermisosPerfil",
      this.permisosPerfilList$,
      "Error al cargar permisos"
    );
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
      const permisosNoAsignados =
        this.permisosPerfilNoAsignadosList$.getValue();
      this.selectOptions = {
        ...this.selectOptions,
        permisos: this.mapPermisos(permisosNoAsignados),
      };

      // Forzar la actualización
      this.cdRef.markForCheck();
      this.cdRef.detectChanges();
    } catch (error) {
      // Error al obtener permisos no asignados
    }
  }

  async onAddPermisoPerfil(newPermiso: any): Promise<void> {
    await this.dataService.agregarRegistro(
      this.permisoperfilService,
      "guardarPermisosPerfil",
      newPermiso,
      "Permiso creado correctamente",
      "Error al agregar permiso"
    );

    await this.obtenerPermisos();
  }

  async onDeletePermisoPerfil(permiso: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.permisoperfilService,
      "eliminarPermisosPerfil",
      { id_perfil: permiso.id_perfil, id_permiso: permiso.id_permiso },
      "Permiso eliminado correctamente",
      "Error al eliminar permiso"
    );

    await this.obtenerPermisos();
  }
}
