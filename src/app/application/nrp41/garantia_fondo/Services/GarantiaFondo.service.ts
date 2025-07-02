import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { GarantiaFondoDTO } from "../DTO/GarantiaFondoDTO";
import { IGarantiaFondo } from "../Interfaces/IGarantiaFondo.interface";

@Injectable({
  providedIn: "root",
})
export class GarantiaFondoService implements IGarantiaFondo {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoGarantiaFondo(
    token: string,
    usuario: string
  ): Promise<GarantiaFondoDTO[]> {
    try {
      const url = `GarantiaFondo/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<
        GarantiaFondoDTO[]
      >(url, "POST", datos, { Authorization: token });
    } catch (error) {
      console.error("Error en getListadoGarantiaFondo:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async getListadoGarantiaFondoXML(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `GarantiaFondo/GarantiaFondoXML`;
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
      console.error("Error en getListadoGarantiaFondoXML:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async getListadoGarantiaFondoExcel(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `GarantiaFondo/GarantiaFondoExcel`;
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
      console.error("Error en getListadoGarantiaFondoExcel:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
}
