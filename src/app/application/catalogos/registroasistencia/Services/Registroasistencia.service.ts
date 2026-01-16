import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { RegistroasistenciaDTO } from "../DTO/RegistroasistenciaDTO";

@Injectable({
  providedIn: "root",
})
export class RegistroasistenciaService {
  constructor(private apiConnectionService: ApiConnectionService) {}

  /**
   * Recupera el catálogo de registros de asistencia.
   * @param token JWT de autorización.
   * @param usuario Usuario solicitante.
   * @returns Promesa con la lista de registros.
   */
  async getListadoRegistroAsistencia(
    token: string,
    usuario: string
  ): Promise<RegistroasistenciaDTO[]> {
    try {
      const url = `RegistroAsistencia/Lista`;
      return await this.apiConnectionService.sendRequestAsync<
        RegistroasistenciaDTO[]
      >(url, "POST", {}, { Authorization: token });
    } catch (error) {
      console.error("Error en getListadoRegistroAsistencia:", error);
      throw error;
    }
  }
}
