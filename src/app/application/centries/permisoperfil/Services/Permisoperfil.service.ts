import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { IPermisoperfil } from "../Interfaces/IPermisoperfil.interface";
import { PermisoperfilDTO } from "../DTO/PermisoperfilDTO";
import { PermisoperfilOperationResponse } from "../DTO/PermisoperfilOperation.dto";

@Injectable({
  providedIn: "root",
})
export class PermisoperfilService implements IPermisoperfil {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async obtenerPermisosPerfil(token: string): Promise<PermisoperfilDTO[]> {
    try {
      const url = `PermisoPerfil/Lista`;
      const datos = {
        id: 0,
      };
      return await this.apiConnectionService.sendRequestAsync<
        PermisoperfilDTO[]
      >(url, "POST", datos, { Authorization: token });
    } catch (error) {
      console.error("Error en obtenerPermisosPerfil:", error);
      throw error;
    }
  }

  async obtenerPermisosPerfilNoAsignados(
    datos: PermisoperfilDTO | Record<string, unknown>,
    token: string
  ): Promise<PermisoperfilDTO[]> {
    try {
      const url = `PermisoPerfil/ObtenerPermisoPerfilNoAsigando`;
      return await this.apiConnectionService.sendRequestAsync<
        PermisoperfilDTO[]
      >(url, "POST", datos, { Authorization: token });
    } catch (error) {
      console.error("Error en obtenerPermisosPerfilNoAsignados:", error);
      throw error;
    }
  }

  async guardarPermisosPerfil(datos: PermisoperfilDTO | Record<string, unknown>, token: string): Promise<PermisoperfilOperationResponse> {
    try {
      const url = `PermisoPerfil/Guardar`;
      return await this.apiConnectionService.sendRequestAsync<PermisoperfilOperationResponse>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en guardarPermisosPerfil:", error);
      throw error;
    }
  }

  async editarPermisosPerfil(datos: PermisoperfilDTO | Record<string, unknown>, token: string): Promise<PermisoperfilOperationResponse> {
    try {
      const url = `PermisoPerfil/Editar`;
      return await this.apiConnectionService.sendRequestAsync<PermisoperfilOperationResponse>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en editarPermisosPerfil:", error);
      throw error;
    }
  }

  async eliminarPermisosPerfil(datos: PermisoperfilDTO | Record<string, unknown>, token: string): Promise<PermisoperfilOperationResponse> {
    try {
      const url = `PermisoPerfil/Eliminar`;
      return await this.apiConnectionService.sendRequestAsync<PermisoperfilOperationResponse>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en eliminarPermisosPerfil:", error);
      throw error;
    }
  }
}
