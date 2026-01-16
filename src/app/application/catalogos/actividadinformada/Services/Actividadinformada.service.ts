import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";

@Injectable({
  providedIn: "root",
})
export class ActividadinformadaService {
  constructor(private apiConnectionService: ApiConnectionService) {}

  /**
   * Obtiene el listado de actividades informadas desde la API.
   * @param token JWT para autorización.
   * @param usuario Nombre de usuario que solicita.
   * @returns Promesa con el catálogo de actividades.
   */
  async getListadoActividadInformada(
    token: string,
    usuario: string
  ): Promise<any[]> {
    try {
      const url = `ActividadInformada/Lista`;
      return await this.apiConnectionService.sendRequestAsync<any[]>(
        url,
        "POST",
        {},
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoActividadInformada:", error);
      throw error;
    }
  }
}
