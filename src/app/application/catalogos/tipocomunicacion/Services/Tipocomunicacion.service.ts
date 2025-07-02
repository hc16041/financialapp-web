import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { ITipocomunicacion } from "../Interfaces/ITipocomunicacion.interface";
import { TipocomunicacionDTO } from "../DTO/TipocomunicacionDTO";

@Injectable({
  providedIn: "root",
})
export class TipocomunicacionService implements ITipocomunicacion {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoTipoComunicacion(
    token: string
  ): Promise<TipocomunicacionDTO[]> {
    try {
      const url = `TipoComunicacion/Lista`;
      return await this.apiConnectionService.sendRequestAsync<
        TipocomunicacionDTO[]
      >(url, "POST", {}, { Authorization: token });
    } catch (error) {
      console.error("Error en getListadoTipoComunicacion:", error);
      throw error;
    }
  }
}
