import { Component, inject, DestroyRef } from "@angular/core";
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

@Component({
  selector: "app-centries-usuario",
  templateUrl: "./centries-usuario.component.html",
  styleUrl: "./centries-usuario.component.scss",
})
export class CentriesUsuarioComponent {
  // Table data usuario
  usuariosList$: BehaviorSubject<UsuarioDTO[]> = new BehaviorSubject<
    UsuarioDTO[]
  >([]);
  cargosList$: BehaviorSubject<any[]> = new BehaviorSubject<CargoDTO[]>([]);
  perfilesList$: BehaviorSubject<any[]> = new BehaviorSubject<PerfilDTO[]>([]);
  // Table data
  usuarioDTO = new UsuarioDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.usuarioDTO);

  // Select options
  selectOptions: { [key: string]: any[] } = {};
  private selectOptionsMapper = inject(SelectOptionsMapperService);
  private destroyRef = inject(DestroyRef);

  constructor(
    private dataService: DataService,
    private usuarioService: UsuarioService,
    private cargosService: CargoService,
    private perfilesService: PerfilService
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.obtenerCargos();
    this.obtenerPerfiles();

    this.initializeSelectOptions();
    this.setupSubscriptions();

    console.log(this.usuariosList$);
  }

  private mapToUsuarioEdit(editUsuario: any): IUsuarioEdit {
    return {
      id: editUsuario.id,
      usuario: editUsuario.usuario,
      nom_colaborador: editUsuario.nom_colaborador,
      id_cargo: editUsuario.id_cargo,
      id_perfil: editUsuario.id_perfil,
      btn_insertar: editUsuario.btn_insertar,
      btn_actualizar: editUsuario.btn_actualizar,
      btn_eliminar: editUsuario.btn_eliminar,
      btn_activar: editUsuario.btn_activar,
      btn_desactivar: editUsuario.btn_desactivar,
      btn_descarga_xml: editUsuario.btn_descarga_xml,
      btn_descarga_texto_plano: editUsuario.btn_descarga_texto_plano,
      btn_descarga_excel: editUsuario.btn_descarga_excel,
      btn_descarga_excel_plantilla: editUsuario.btn_descarga_excel_plantilla,
    };
  }

  private initializeSelectOptions(): void {
    this.selectOptions = {
      cargo: this.selectOptionsMapper.mapCargos(this.cargosList$.getValue()),
      perfil: this.selectOptionsMapper.mapPerfiles(
        this.perfilesList$.getValue()
      ),
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
    return this.dataService.obtenerDatos(
      this.usuarioService,
      "getListadoUsuarioActivo",
      this.usuariosList$,
      "Error al cargar usuarios"
    );
  }

  async onAddUsuario(newUsuario: any): Promise<void> {
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

  async onEditUsuario(editUsuario: any): Promise<void> {
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

  async onDeactivateUsuario(usuario: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.usuarioService,
      "inactivarUsuario",
      usuario.id,
      "Usuario inactivado correctamente",
      "Error al inactivar usuario"
    );

    await this.obtenerUsuarios();
  }

  async onResetPassword(usuario: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.usuarioService,
      "resetearClave",
      usuario.id,
      "Clave reseteada correctamente",
      "Error al resetear clave"
    );

    await this.obtenerUsuarios();
  }
}
