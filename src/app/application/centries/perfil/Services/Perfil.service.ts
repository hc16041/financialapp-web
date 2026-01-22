import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { PerfilDTO } from "../DTO/PerfilDTO";
import { IPerfil } from "../Interfaces/IPerfil.interface";
import { PerfilOperationResponse } from "../DTO/PerfilOperation.dto";

@Injectable({
  providedIn: "root",
})
export class PerfilService implements IPerfil {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoPerfil(token: string): Promise<PerfilDTO[]> {
    try {
      const url = `Perfil/Lista`;
      return await this.apiConnectionService.sendRequestAsync<PerfilDTO[]>(
        url,
        "GET",
        null,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoPerfil:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en getListadoPerfil
    }
  }

  async getListadoPerfilId(idperfil: number, token: string): Promise<PerfilDTO> {
    try {
      const url = `Perfil/ObtenerPerfilId`;
      const datos = {
        id: idperfil,
      };
      return await this.apiConnectionService.sendRequestAsync<PerfilDTO>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoPerfilId:", error);
      throw error; // Vuelve a lanzar el error para que se maneje
    }
  }

  async guardarPerfil(datos: PerfilDTO | Record<string, unknown>, token: string): Promise<PerfilOperationResponse> {
    try {
      const url = `Perfil/Guardar`;
      return await this.apiConnectionService.sendRequestAsync<PerfilOperationResponse>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en guardarPerfil:", error);
      throw error; // Vuelve a lanzar el error para que se maneje
    }
  }

  async editarPerfil(datos: PerfilDTO | Record<string, unknown>, token: string): Promise<PerfilOperationResponse> {
    try {
      const url = `Perfil/Editar`;
      return await this.apiConnectionService.sendRequestAsync<PerfilOperationResponse>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en editarPerfil:", error);
      throw error; // Vuelve a lanzar el error para que se maneje
    }
  }

  async eliminarPerfil(idperfil: number, token: string): Promise<PerfilOperationResponse> {
    try {
      const url = `Perfil/Eliminar`;
      const datos = {
        id: idperfil,
      };
      return await this.apiConnectionService.sendRequestAsync<PerfilOperationResponse>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en eliminarPerfil:", error);
      throw error; // Vuelve a lanzar el error para que se maneje
    }
  }
}
