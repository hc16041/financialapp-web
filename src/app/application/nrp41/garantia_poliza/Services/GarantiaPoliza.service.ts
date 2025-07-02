import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { GarantiaPolizaDTO } from "../DTO/GarantiaPolizaDTO";
import { IGarantiaPoliza } from "../Interfaces/IGarantiaPoliza.interface";

@Injectable({
  providedIn: "root",
})
export class GarantiaPolizaService implements IGarantiaPoliza {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoGarantiaPoliza(
    token: string,
    usuario: string
  ): Promise<GarantiaPolizaDTO[]> {
    try {
      const url = `GarantiaPoliza/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<
        GarantiaPolizaDTO[]
      >(url, "POST", datos, { Authorization: token });
    } catch (error) {
      console.error("Error en getListadoGarantiaPoliza:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async getListadoGarantiaPolizaXML(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `GarantiaPoliza/GarantiaPolizaXML`;
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
      console.error("Error en getListadoGarantiaPolizaXML:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async getListadoGarantiaPolizaExcel(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `GarantiaPoliza/GarantiaPolizaExcel`;
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
      console.error("Error en getListadoGarantiaPolizaExcel:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
}
