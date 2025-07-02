import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { RoloficialDTO } from "../DTO/RoloficialDTO";
import { IRoloficial } from "../Interfaces/IRoloficial.interface";

@Injectable({
  providedIn: "root",
})
export class RoloficialService implements IRoloficial {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoRoloficial(
    token: string,
    usuario: string
  ): Promise<RoloficialDTO[]> {
    try {
      const url = `Roloficial/Lista`;
      return await this.apiConnectionService.sendRequestAsync<RoloficialDTO[]>(
        url,
        "POST",
        {},
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoRoloficial:", error);
      throw error;
    }
  }
}
