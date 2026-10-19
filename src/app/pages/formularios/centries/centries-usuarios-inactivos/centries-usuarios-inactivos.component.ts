import { Component, OnInit, ChangeDetectionStrategy, inject, signal, computed, DestroyRef } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { BehaviorSubject } from "rxjs";
import { UsuarioDTO } from "src/app/application/centries/usuario/DTO/UsuarioDTO";
import { UsuarioService } from "src/app/application/centries/usuario/Services/Usuario.service";
import { DataService } from "src/app/core/services/data.service";
import { generateTableColumns } from "src/app/utils/table-utils";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { SelectOption } from "src/app/core/services/select-options-mapper.service";

@Component({
  selector: "app-centries-usuarios-inactivos",
  templateUrl: "./centries-usuarios-inactivos.component.html",
  styleUrl: "./centries-usuarios-inactivos.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CentriesUsuariosInactivosComponent implements OnInit {
  // Inyección de dependencias usando inject()
  private dataService = inject(DataService);
  private usuarioService = inject(UsuarioService);
  private destroyRef = inject(DestroyRef);

  // Table data usuario - Mantener BehaviorSubject para DataService, pero exponer como signal
  private usuariosInactivosList$ = new BehaviorSubject<UsuarioDTO[]>([]);
  private readonly usuariosInactivosListSig = signal<UsuarioDTO[]>([]);

  // Estado de carga para skeletons de KPI
  private readonly loadingSig = signal<boolean>(false);
  readonly loading = this.loadingSig.asReadonly();

  // KPIs de conteo (SPEC-06 §4.6): el endpoint carga usuarios INACTIVOS.
  readonly totalUsuariosInactivos = computed(() => {
    const list = this.usuariosInactivosListSig();
    return list.length === 0 ? null : list.length;
  });

  readonly inactiveUsers = computed(() => {
    const list = this.usuariosInactivosListSig();
    return list.length === 0 ? null : list.length;
  });

  readonly activeUsers = computed(() => {
    const list = this.usuariosInactivosListSig();
    return list.length === 0 ? null : 0;
  });

  get usuariosInactivosList(): UsuarioDTO[] {
    return this.usuariosInactivosListSig();
  }

  // Table data
  usuarioDTO = new UsuarioDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.usuarioDTO);

  // Select options
  selectOptions: { [key: string]: SelectOption[] } = {};

  ngOnInit(): void {
    // Sincronizar el BehaviorSubject con la señal (patrón Signals + takeUntilDestroyed)
    this.usuariosInactivosList$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.usuariosInactivosListSig.set(data);
      });
    this.obtenerUsuariosInactivos();
  }

  async obtenerUsuariosInactivos(): Promise<void> {
    this.loadingSig.set(true);
    try {
      await this.dataService.obtenerDatos(
        this.usuarioService,
        "getListadoUsuarioInactivo",
        this.usuariosInactivosList$,
        "Error al cargar usuarios inactivos"
      );
    } finally {
      this.loadingSig.set(false);
    }
  }

  async onActivateUsuario(usuario: UsuarioDTO | Record<string, unknown>): Promise<void> {
    const usuarioObj = usuario as UsuarioDTO & Record<string, unknown>;
    await this.dataService.eliminarRegistro(
      this.usuarioService,
      "activarUsuario",
      usuarioObj.id,
      "Usuario activado correctamente",
      "Error al activar usuario"
    );

    await this.obtenerUsuariosInactivos();
  }
}
