import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { ReferenciaCanceladaDTO } from "../DTO/ReferenciaCanceladaDTO";

@Injectable({
  providedIn: "root",
})
export class ReferenciaCanceladaService {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoReferenciaCancelada(
    token: string,
    usuario: string
  ): Promise<ReferenciaCanceladaDTO[]> {
    try {
      const url = `ReferenciaCancelada/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<
        ReferenciaCanceladaDTO[]
      >(url, "POST", datos, { Authorization: token });
    } catch (error) {
      console.error("Error en getListadoReferenciaCancelada:", error);
      throw error; // Vuelve a lanzar el error para que se maneje
    }
  }

  async getListadoReferenciaCanceladaXML(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `ReferenciaCancelada/ReferenciaCanceladaXML`;
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
      console.error("Error en getListadoReferenciaCanceladaXML:", error);
      throw error; // Vuelve a lanzar el error para que se maneje
    }
  }

  async getListadoReferenciaCanceladaExcel(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `ReferenciaCancelada/ReferenciaCanceladaExcel`;
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
      console.error("Error en getListadoReferenciaCanceladaExcel:", error);
      throw error; // Vuelve a lanzar el error para que se maneje
    }
  }
}
