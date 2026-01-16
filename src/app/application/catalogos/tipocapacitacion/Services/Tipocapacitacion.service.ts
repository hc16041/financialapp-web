import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { TipocapacitacionDTO } from "../DTO/TipocapacitacionDTO";

@Injectable({
  providedIn: "root",
})
export class TipocapacitacionService {
  constructor(private apiConnectionService: ApiConnectionService) {}

  /**
   * Obtiene el listado de tipos de capacitación.
   * @param token JWT de autorización.
   * @param usuario Usuario solicitante.
   * @returns Promesa con el catálogo de tipos de capacitación.
   */
  async getListadoTipoCapacitacion(
    token: string,
    usuario: string
  ): Promise<TipocapacitacionDTO[]> {
    try {
      const url = `TipoCapacitacion/Lista`;
      return await this.apiConnectionService.sendRequestAsync<
        TipocapacitacionDTO[]
      >(url, "POST", {}, { Authorization: token });
    } catch (error) {
      console.error("Error en getListadoTipoCapacitacion:", error);
      throw error;
    }
  }
}
