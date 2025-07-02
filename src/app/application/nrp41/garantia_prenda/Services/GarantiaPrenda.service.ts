import { Injectable } from "@angular/core";
import { IGarantiaPrenda } from "../Interfaces/IGarantiaPrenda.interface";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { GarantiaPrendaDTO } from "../DTO/GarantiaPrendaDTO";

@Injectable({
  providedIn: "root",
})
export class GarantiaPrendaService implements IGarantiaPrenda {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoGarantiaPrenda(
    token: string,
    usuario: string
  ): Promise<GarantiaPrendaDTO[]> {
    try {
      const url = `GarantiaPrenda/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<
        GarantiaPrendaDTO[]
      >(url, "POST", datos, { Authorization: token });
    } catch (error) {
      console.error("Error en getListadoGarantiaPrenda:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async getListadoGarantiaPrendaXML(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `GarantiaPrenda/GarantiaPrendaXML`;
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
      console.error("Error en getListadoGarantiaPrendaXML:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async getListadoGarantiaPrendaExcel(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `GarantiaPrenda/GarantiaPrendaExcel`;
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
      console.error("Error en getListadoGarantiaPrendaExcel:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
}
