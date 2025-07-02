import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { TipocapacitacionDTO } from "../DTO/TipocapacitacionDTO";

@Injectable({
  providedIn: "root",
})
export class TipocapacitacionService {
  constructor(private apiConnectionService: ApiConnectionService) {}

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
