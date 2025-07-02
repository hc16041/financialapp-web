import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { IBalanceProyectado } from "../Interfaces/IBalanceProyectado.interface";
import { BalanceProyectadoDTO } from "../DTO/BalanceProyectadoDTO";

@Injectable({
  providedIn: "root",
})
export class BalanceProyectadoService implements IBalanceProyectado {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoBalanceProyectado(token: string, usuario: string): Promise<BalanceProyectadoDTO[]> {
    try {
      const url = `NRP_51/BalanceProyectado/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<BalanceProyectadoDTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoBalanceProyectado:", error);
      throw error;
    }
  }

  async getListadoBalanceProyectadoXML(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_51/BalanceProyectado/BalanceProyectadoXML`;
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
      console.error("Error en getListadoBalanceProyectadoXML:", error);
      throw error;
    }
  }

  async getListadoBalanceProyectadoExcel(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_51/BalanceProyectado/BalanceProyectadoExcel`;
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
      console.error("Error en getListadoBalanceProyectadoExcel:", error);
      throw error;
    }
  }

  async getListadoBalanceProyectadoReporte(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_51/BalanceProyectado/BalanceProyectadoExcelFormato`;
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
      console.error("Error en getListadoBalanceProyectadoReporte:", error);
      throw error;
    }
  }
}
