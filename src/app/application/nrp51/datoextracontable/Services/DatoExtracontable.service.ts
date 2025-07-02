import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { IDatoExtracontable } from "../Interfaces/IDatoExtracontable.interface";
import { DatoExtracontableDTO } from "../DTO/DatoExtracontableDTO";

@Injectable({
  providedIn: "root",
})
export class DatoExtracontableService implements IDatoExtracontable {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoDatoExtracontable(token: string, usuario: string): Promise<DatoExtracontableDTO[]> {
    try {
      const url = `NRP_51/DatoExtracontable/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<DatoExtracontableDTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoDatoExtracontable:", error);
      throw error;
    }
  }

  async getListadoDatoExtracontableXML(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_51/DatoExtracontable/DatoExtracontableXML`;
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
      console.error("Error en getListadoDatoExtracontableXML:", error);
      throw error;
    }
  }

  async getListadoDatoExtracontableExcel(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_51/DatoExtracontable/DatoExtracontableExcel`;
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
      console.error("Error en getListadoDatoExtracontableExcel:", error);
      throw error;
    }
  }

  async getListadoDatoExtracontableReporte(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_51/DatoExtracontable/DatoExtracontableExcelFormato`;
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
      console.error("Error en getListadoDatoExtracontableReporte:", error);
      throw error;
    }
  }
}
