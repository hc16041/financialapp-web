import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { IDepositoExtranjero } from "../Interfaces/IDepositoExtranjero.interface";
import { DepositoExtranjeroDTO } from "../DTO/DepositoExtranjeroDTO";

@Injectable({
  providedIn: "root",
})
export class DepositoExtranjeroService implements IDepositoExtranjero {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoDepositoExtranjero(token: string, usuario: string): Promise<DepositoExtranjeroDTO[]> {
    try {
      const url = `NRP_51/DepositoExtranjero/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<DepositoExtranjeroDTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoDepositoExtranjero:", error);
      throw error;
    }
  }

  async getListadoDepositoExtranjeroXML(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_51/DepositoExtranjero/DepositoExtranjeroXML`;
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
      console.error("Error en getListadoDepositoExtranjeroXML:", error);
      throw error;
    }
  }

  async getListadoDepositoExtranjeroExcel(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_51/DepositoExtranjero/DepositoExtranjeroExcel`;
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
      console.error("Error en getListadoDepositoExtranjeroExcel:", error);
      throw error;
    }
  }

  async getListadoDepositoExtranjeroReporte(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_51/DepositoExtranjero/DepositoExtranjeroExcelFormato`;
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
      console.error("Error en getListadoDepositoExtranjeroReporte:", error);
      throw error;
    }
  }
}
