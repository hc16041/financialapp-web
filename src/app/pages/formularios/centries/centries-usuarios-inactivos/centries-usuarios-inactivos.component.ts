import { Component, OnInit, ChangeDetectionStrategy, inject, signal } from "@angular/core";
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

  // Table data usuario - Mantener BehaviorSubject para DataService, pero exponer como signal
  private usuariosInactivosList$ = new BehaviorSubject<UsuarioDTO[]>([]);
  private readonly usuariosInactivosListSig = signal<UsuarioDTO[]>([]);
  
  get usuariosInactivosList(): UsuarioDTO[] {
    return this.usuariosInactivosListSig();
  }

  // Table data
  usuarioDTO = new UsuarioDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.usuarioDTO);

  // Select options
  selectOptions: { [key: string]: SelectOption[] } = {};

  ngOnInit(): void {
    // Suscribirse al BehaviorSubject para actualizar el signal
    this.usuariosInactivosList$.subscribe(data => {
      this.usuariosInactivosListSig.set(data);
    });
    this.obtenerUsuariosInactivos();
  }

  async obtenerUsuariosInactivos(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.usuarioService,
      "getListadoUsuarioInactivo",
      this.usuariosInactivosList$,
      "Error al cargar usuarios inactivos"
    );
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
