import { Component, OnInit, ChangeDetectionStrategy, inject, DestroyRef, signal, computed } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { BehaviorSubject } from "rxjs";
import { UsuarioDTO } from "src/app/application/centries/usuario/DTO/UsuarioDTO";
import { UsuarioService } from "src/app/application/centries/usuario/Services/Usuario.service";
import { DataService } from "src/app/core/services/data.service";
import { generateTableColumns } from "src/app/utils/table-utils";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { CargoDTO } from "src/app/application/centries/cargo/DTO/CargoDTO";
import { PerfilDTO } from "src/app/application/centries/perfil/DTO/PerfilDTO";
import { PerfilService } from "src/app/application/centries/perfil/Services/Perfil.service";
import { CargoService } from "src/app/application/centries/cargo/Services/Cargo.service";
import { IUsuarioEdit } from "src/app/application/centries/usuario/Interfaces/IUsuario.interface";
import { SelectOptionsMapperService } from "src/app/core/services/select-options-mapper.service";
import { SelectOption } from "src/app/core/services/select-options-mapper.service";

@Component({
  selector: "app-centries-usuario",
  templateUrl: "./centries-usuario.component.html",
  styleUrl: "./centries-usuario.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CentriesUsuarioComponent implements OnInit {
  // Inyección de dependencias usando inject()
  private dataService = inject(DataService);
  private usuarioService = inject(UsuarioService);
  private cargosService = inject(CargoService);
  private perfilesService = inject(PerfilService);
  private selectOptionsMapper = inject(SelectOptionsMapperService);
  private destroyRef = inject(DestroyRef);

  // Table data usuario - Mantener BehaviorSubject para DataService, pero exponer como signal
  private usuariosList$ = new BehaviorSubject<UsuarioDTO[]>([]);
  private readonly usuariosListSig = signal<UsuarioDTO[]>([]);

  // Estado de carga para skeletons de KPI
  private readonly loadingSig = signal<boolean>(false);
  readonly loading = this.loadingSig.asReadonly();

  // KPIs de conteo (SPEC-06 §4.6): el endpoint carga usuarios ACTIVOS.
  readonly totalUsuarios = computed(() => {
    const list = this.usuariosListSig();
    return list.length === 0 ? null : list.length;
  });

  readonly activeUsers = computed(() => {
    const list = this.usuariosListSig();
    if (list.length === 0) {
      return null;
    }
    return list.filter((u) => this.isActiveRecord(u)).length;
  });

  readonly inactiveUsers = computed(() => {
    const list = this.usuariosListSig();
    if (list.length === 0) {
      return null;
    }
    return list.filter((u) => !this.isActiveRecord(u)).length;
  });

  /**
   * Determina si un registro de usuario está activo. El DTO no declara el
   * campo, pero el endpoint de activos lo garantiza; si el backend envía
   * `isActive`/`activo`, se respeta.
   */
  private isActiveRecord(usuario: UsuarioDTO): boolean {
    const record = usuario as unknown as Record<string, unknown>;
    const val = record["isActive"] ?? record["activo"];
    if (val === undefined || val === null) {
      return true;
    }
    return val === true || val === 1 || val === "true" || val === "Activo";
  }
  
  get usuariosList(): UsuarioDTO[] {
    return this.usuariosListSig();
  }

  private cargosList$ = new BehaviorSubject<CargoDTO[]>([]);
  private readonly cargosListSig = signal<CargoDTO[]>([]);
  
  get cargosList(): CargoDTO[] {
    return this.cargosListSig();
  }

  private perfilesList$ = new BehaviorSubject<PerfilDTO[]>([]);
  private readonly perfilesListSig = signal<PerfilDTO[]>([]);
  
  get perfilesList(): PerfilDTO[] {
    return this.perfilesListSig();
  }

  // Table data
  usuarioDTO = new UsuarioDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.usuarioDTO);

  // Select options
  selectOptions: { [key: string]: SelectOption[] } = {};

  ngOnInit(): void {
    // Suscribirse a los BehaviorSubjects para actualizar los signals
    this.usuariosList$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.usuariosListSig.set(data);
      });
    this.cargosList$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.cargosListSig.set(data);
      });
    this.perfilesList$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.perfilesListSig.set(data);
      });

    this.obtenerUsuarios();
    this.obtenerCargos();
    this.obtenerPerfiles();

    this.initializeSelectOptions();
    this.setupSubscriptions();
  }

  private mapToUsuarioEdit(editUsuario: UsuarioDTO | Record<string, unknown>): IUsuarioEdit {
    const usuario = editUsuario as UsuarioDTO & Record<string, unknown>;
    return {
      id: usuario.id,
      usuario: usuario.usuario,
      nom_colaborador: usuario.nom_colaborador,
      id_cargo: usuario.id_cargo,
      id_perfil: usuario.id_perfil,
      btn_insertar: usuario.btn_insertar,
      btn_actualizar: usuario.btn_actualizar,
      btn_eliminar: usuario.btn_eliminar,
      btn_activar: usuario.btn_activar,
      btn_desactivar: usuario.btn_desactivar,
      btn_descarga_xml: usuario.btn_descarga_xml,
      btn_descarga_texto_plano: usuario.btn_descarga_texto_plano,
      btn_descarga_excel: usuario.btn_descarga_excel,
      btn_descarga_excel_plantilla: usuario.btn_descarga_excel_plantilla,
    };
  }

  private initializeSelectOptions(): void {
    this.selectOptions = {
      cargo: this.selectOptionsMapper.mapCargos(this.cargosList),
      perfil: this.selectOptionsMapper.mapPerfiles(this.perfilesList),
    };
  }

  private setupSubscriptions(): void {
    // Suscripciones con takeUntilDestroyed para limpieza automática
    this.cargosList$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((cargos) => {
        this.selectOptions = {
          ...this.selectOptions,
          cargo: this.selectOptionsMapper.mapCargos(cargos),
        };
      });

    this.perfilesList$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((perfiles) => {
        this.selectOptions = {
          ...this.selectOptions,
          perfil: this.selectOptionsMapper.mapPerfiles(perfiles),
        };
      });
  }

  async obtenerCargos(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.cargosService,
      "getListadoCargo",
      this.cargosList$,
      "Error al cargar cargos"
    );
  }

  async obtenerPerfiles(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.perfilesService,
      "getListadoPerfil",
      this.perfilesList$,
      "Error al cargar perfiles"
    );
  }
  async obtenerUsuarios(): Promise<void> {
    this.loadingSig.set(true);
    try {
      await this.dataService.obtenerDatos(
        this.usuarioService,
        "getListadoUsuarioActivo",
        this.usuariosList$,
        "Error al cargar usuarios"
      );
    } finally {
      this.loadingSig.set(false);
    }
  }

  async onAddUsuario(newUsuario: UsuarioDTO | Record<string, unknown>): Promise<void> {
    const usuarioFiltrado: IUsuarioEdit = this.mapToUsuarioEdit(newUsuario);
    await this.dataService.agregarRegistro(
      this.usuarioService,
      "guardarUsuario",
      usuarioFiltrado,
      "Usuario creado correctamente",
      "Error al agregar usuario"
    );

    await this.obtenerUsuarios();
  }

  async onEditUsuario(editUsuario: UsuarioDTO | Record<string, unknown>): Promise<void> {
    const usuarioFiltrado: IUsuarioEdit = this.mapToUsuarioEdit(editUsuario);
    await this.dataService.actualizarRegistro(
      this.usuarioService,
      "editarUsuario",
      usuarioFiltrado,
      "Usuario editado correctamente",
      "Error al editar usuario"
    );

    await this.obtenerUsuarios();
  }

  async onDeactivateUsuario(usuario: UsuarioDTO | Record<string, unknown>): Promise<void> {
    const usuarioObj = usuario as UsuarioDTO & Record<string, unknown>;
    await this.dataService.eliminarRegistro(
      this.usuarioService,
      "inactivarUsuario",
      usuarioObj.id,
      "Usuario inactivado correctamente",
      "Error al inactivar usuario"
    );

    await this.obtenerUsuarios();
  }

  async onResetPassword(usuario: UsuarioDTO | Record<string, unknown>): Promise<void> {
    const usuarioObj = usuario as UsuarioDTO & Record<string, unknown>;
    await this.dataService.eliminarRegistro(
      this.usuarioService,
      "resetearClave",
      usuarioObj.id,
      "Clave reseteada correctamente",
      "Error al resetear clave"
    );

    await this.obtenerUsuarios();
  }
}
