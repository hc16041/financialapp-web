import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { GarantiaPrendaDTO } from "../../garantia_prenda/DTO/GarantiaPrendaDTO";

@Injectable({
  providedIn: "root",
})
export class GarantiaPrendariaService {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoGarantiaPrendaria(
    token: string,
    usuario: string
  ): Promise<GarantiaPrendaDTO[]> {
    try {
      const url = `GarantiaPrendaria/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<
        GarantiaPrendaDTO[]
      >(url, "POST", datos, { Authorization: token });
    } catch (error) {
      console.error("Error en getListadoGarantiaPrendaria:", error);
      throw error; // Vuelve a lanzar el error para que se maneje
    }
  }

  async getListadoGarantiaPrendariaXML(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `GarantiaPrendaria/GarantiaPrendariaXML`;
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
      console.error("Error en getListadoGarantiaPrendariaXML:", error);
      throw error; // Vuelve a lanzar el error para que se maneje
    }
  }

  async getListadoGarantiaPrendariaExcel(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `GarantiaPrendaria/GarantiaPrendariaExcel`;
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
      console.error("Error en getListadoGarantiaPrendariaExcel:", error);
      throw error; // Vuelve a lanzar el error para que se maneje
    }
  }
}
