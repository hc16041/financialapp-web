import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UsuarioDTO } from "src/app/application/centries/usuario/DTO/UsuarioDTO";
import { UsuarioService } from "src/app/application/centries/usuario/Services/Usuario.service";
import { DataService } from "src/app/core/services/data.service";
import { generateTableColumns } from "src/app/utils/table-utils";
import { TableColumn } from "../../genericos/generictable/table-column.interface";

@Component({
  selector: "app-centries-usuarios-inactivos",
  templateUrl: "./centries-usuarios-inactivos.component.html",
  styleUrl: "./centries-usuarios-inactivos.component.scss",
})
export class CentriesUsuariosInactivosComponent {
  // Table data usuario
  usuariosInactivosList$: BehaviorSubject<UsuarioDTO[]> = new BehaviorSubject<
    UsuarioDTO[]
  >([]);
  // Table data
  usuarioDTO = new UsuarioDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.usuarioDTO);

  // Select options
  selectOptions: { [key: string]: any[] } = {};
  constructor(
    private dataService: DataService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
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

  async onActivateUsuario(usuario: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.usuarioService,
      "activarUsuario",
      usuario.id,
      "Usuario activado correctamente",
      "Error al activar usuario"
    );

    await this.obtenerUsuariosInactivos();
  }
}
