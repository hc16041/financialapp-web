import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { ModalidadDTO } from "../DTO/ModalidadDTO";

@Injectable({
  providedIn: "root",
})
export class ModalidadService {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoModalidad(
    token: string,
    usuario: string
  ): Promise<ModalidadDTO[]> {
    try {
      const url = `api/Modalidad/Lista`;
      return await this.apiConnectionService.sendRequestAsync<ModalidadDTO[]>(
        url,
        "POST",
        {},
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoModalidad:", error);
      throw error;
    }
  }
}
