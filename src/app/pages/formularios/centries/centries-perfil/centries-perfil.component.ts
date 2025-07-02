import { Component } from "@angular/core";
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
})
export class CentriesPerfilComponent {
  //Table data perfiles
  perfilesList$: BehaviorSubject<PerfilDTO[]> = new BehaviorSubject<
    PerfilDTO[]
  >([]);
  // Table data
  perfilDTO = new PerfilDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.perfilDTO);

  constructor(
    private dataService: DataService,
    private perfilService: PerfilService
  ) {}

  ngOnInit(): void {
    this.obtenerPerfiles();
  }

  async obtenerPerfiles(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.perfilService,
      "getListadoPerfil",
      this.perfilesList$,
      "Error al cargar perfiles"
    );
  }

  async onAddPerfil(newPerfil: any): Promise<void> {
    await this.dataService.agregarRegistro(
      this.perfilService,
      "guardarPerfil",
      newPerfil,
      "Perfil creado con éxito",
      "Error al crear el perfil"
    );
    await this.obtenerPerfiles();
  }

  async onEditPerfil(updatedPerfil: any): Promise<void> {
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

  async onDeletePerfil(perfil: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.perfilService,
      "eliminarPerfil",
      perfil,
      "Perfil eliminado con éxito",
      "Error al eliminar el perfil"
    );
    await this.obtenerPerfiles();
  }
}
