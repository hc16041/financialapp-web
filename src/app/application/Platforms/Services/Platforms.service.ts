import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { PlatformsDTO } from "../DTO/PlatformsDTO";
import { IPlatforms } from "../Interfaces/IPlatforms.interface";

@Injectable({
  providedIn: "root",
})
export class PlatformsService implements IPlatforms {
  constructor(private apiConnectionService: ApiConnectionService) {}

  /**
   * Obtiene todas las plataformas
   */
  async getPlatforms(token: string, usuario: string): Promise<PlatformsDTO[]> {
    try {
      const url = `Platforms`;
      return await this.apiConnectionService.sendRequestAsync<PlatformsDTO[]>(
        url,
        "GET",
        null,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getPlatforms:", error);
      throw error;
    }
  }

  /**
   * Obtiene una plataforma por ID
   */
  async getPlatformById(
    id: number,
    token: string,
    usuario: string
  ): Promise<PlatformsDTO> {
    try {
      const url = `Platforms/${id}`;
      return await this.apiConnectionService.sendRequestAsync<PlatformsDTO>(
        url,
        "GET",
        null,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getPlatformById:", error);
      throw error;
    }
  }

  /**
   * Crea una nueva plataforma
   */
  async guardarPlatforms(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `Platforms`;
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en guardarPlatforms:", error);
      throw error;
    }
  }

  /**
   * Actualiza una plataforma existente
   */
  async editarPlatforms(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `Platforms/${datos.id}`;
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "PUT",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en editarPlatforms:", error);
      throw error;
    }
  }

  /**
   * Elimina una plataforma
   */
  async eliminarPlatforms(
    id: number,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `Platforms/${id}`;
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "DELETE",
        null,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en eliminarPlatforms:", error);
      throw error;
    }
  }
}

