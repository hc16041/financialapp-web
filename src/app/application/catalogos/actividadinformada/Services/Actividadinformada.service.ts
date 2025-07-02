import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";

@Injectable({
  providedIn: "root",
})
export class ActividadinformadaService {
  constructor(private apiConnectionService: ApiConnectionService) {}

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
