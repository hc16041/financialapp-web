import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { GarantiaHipotecariaDTO } from "../DTO/GarantiaHipotecariaDTO";
import { IGarantiaHipotecaria } from "../Interfaces/IGarantiaHipotecaria.interface";

@Injectable({
  providedIn: "root",
})
export class GarantiaHipotecariaService implements IGarantiaHipotecaria {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoGarantiashipotecarias(
    token: string,
    usuario: string
  ): Promise<GarantiaHipotecariaDTO[]> {
    try {
      const url = `GarantiaHipotecaria/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<
        GarantiaHipotecariaDTO[]
      >(url, "POST", datos, { Authorization: token });
    } catch (error) {
      console.error("Error en getListadoGarantiashipotecarias:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async getListadoGarantiashipotecariasXML(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `GarantiaHipotecaria/GarantiaHipotecariaXML`;
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
      console.error("Error en getListadoGarantiashipotecariasXML:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async getListadoGarantiashipotecariasExcel(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `GarantiaHipotecaria/GarantiaHipotecariaExcel`;
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
      console.error("Error en getListadoGarantiashipotecariasExcel:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
}
