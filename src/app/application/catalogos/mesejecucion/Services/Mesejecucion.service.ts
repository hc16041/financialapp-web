import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { MesejecucionDTO } from "../DTO/MesejecucionDTO";

@Injectable({
  providedIn: "root",
})
export class MesejecucionService {
  constructor(private apiConnectionService: ApiConnectionService) {}

  /**
   * Obtiene la lista de meses de ejecución.
   * @param token JWT de autorización.
   * @param usuario Usuario solicitante (auditoría).
   * @returns Promesa con el catálogo de meses.
   */
  async getListadoMesEjecucion(
    token: string,
    usuario: string
  ): Promise<MesejecucionDTO[]> {
    try {
      const url = `MesEjecucion/Lista`;
      return await this.apiConnectionService.sendRequestAsync<
        MesejecucionDTO[]
      >(url, "POST", {}, { Authorization: token });
    } catch (error) {
      console.error("Error en getListadoMesEjecutivo:", error);
      throw error;
    }
  }
}
