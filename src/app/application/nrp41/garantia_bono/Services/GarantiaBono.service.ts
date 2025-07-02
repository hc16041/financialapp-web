import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { GarantiaBonoDTO } from "../DTO/GarantiaBonoDTO";
import { IGarantiaBono } from "../Interfaces/IGarantiaBono.interface";

@Injectable({
  providedIn: "root",
})
export class GarantiaBonoService implements IGarantiaBono {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoGarantiaBono(
    token: string,
    usuario: string
  ): Promise<GarantiaBonoDTO[]> {
    try {
      const url = `GarantiaBono/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<
        GarantiaBonoDTO[]
      >(url, "POST", datos, { Authorization: token });
    } catch (error) {
      console.error("Error en getListadoGarantiaBono:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async getListadoGarantiaBonoXML(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `GarantiaBono/GarantiaBonoXML`;
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
      console.error("Error en getListadoGarantiaBonoXML:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async getListadoGarantiaBonoExcel(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `GarantiaBono/GarantiaBonoExcel`;
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
      console.error("Error en getListadoGarantiaBonoExcel:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
}
