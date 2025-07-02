import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { GarantiaAvalDTO } from "../DTO/GarantiaAvalDTO";
import { IGarantiaAval } from "../Interfaces/IGarantiaAval.interface";

@Injectable({
  providedIn: "root",
})
export class GarantiaAvalService implements IGarantiaAval {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoGarantiaAval(
    token: string,
    usuario: string
  ): Promise<GarantiaAvalDTO[]> {
    try {
      const url = `GarantiaAval/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<
        GarantiaAvalDTO[]
      >(url, "POST", datos, { Authorization: token });
    } catch (error) {
      console.error("Error en getListadoGarantiaAval:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async getListadoGarantiaAvalXML(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `GarantiaAval/GarantiaAvalXML`;
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
      console.error("Error en getListadoGarantiaAvalXML:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async getListadoGarantiaAvalExcel(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `GarantiaAval/GarantiaAvalExcel`;
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
      console.error("Error en getListadoGarantiaAvalExcel:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
}
