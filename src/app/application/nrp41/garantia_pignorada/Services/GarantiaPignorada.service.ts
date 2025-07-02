import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { IGarantiaPignorada } from "../Interfaces/IGarantiaPignorada.interface";
import { GarantiaPignoradaDTO } from "../DTO/GarantiaPignoradaDTO";

@Injectable({
  providedIn: "root",
})
export class GarantiaPignoradaService implements IGarantiaPignorada {
  constructor(private apiConnectionService: ApiConnectionService) {}

  /**
   * Obtiene la lista de garantias pignoradas.
   *
   * @returns Un arreglo de garantias pignoradas.
   */
  async getListadoGarantiaPignorada(
    token: string,
    usuario: string
  ): Promise<GarantiaPignoradaDTO[]> {
    try {
      const url = `GarantiaPignorada/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<
        GarantiaPignoradaDTO[]
      >(url, "POST", datos, { Authorization: token });
    } catch (error) {
      console.error("Error en getListadoGarantiaPignorada:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  /**
   * Obtiene la lista de garantias pignoradas en formato xml.
   *
   * @returns Un objeto xml con la lista de garantias pignoradas.
   */
  async getListadoGarantiaPignoradaXML(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `GarantiaPignorada/GarantiaPignoradaXML`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestXMLAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoGarantiaPignoradaXML:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  /**
   * Obtiene la lista de garantias pignoradas en formato excel.
   *
   * @returns Un archivo excel con la lista de garantias pignoradas.
   */
  async getListadoGarantiaPignoradaExcel(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `GarantiaPignorada/GarantiaPignoradaExcel`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestExcelAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoGarantiaPignoradaExcel:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
}
