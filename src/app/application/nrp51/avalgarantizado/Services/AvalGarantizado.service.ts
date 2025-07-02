import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { IAvalGarantizado } from "../Interfaces/IAvalGarantizado.interface";
import { AvalGarantizadoDTO } from "../DTO/AvalGarantizadoDTO";

@Injectable({
  providedIn: "root",
})
export class AvalGarantizadoService implements IAvalGarantizado {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoAvalGarantizado(token: string, usuario: string): Promise<AvalGarantizadoDTO[]> {
    try {
      const url = `NRP_51/AvalGarantizado/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<AvalGarantizadoDTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoAvalGarantizado:", error);
      throw error;
    }
  }

  async getListadoAvalGarantizadoXML(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_51/AvalGarantizado/AvalGarantizadoXML`;
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
      console.error("Error en getListadoAvalGarantizadoXML:", error);
      throw error;
    }
  }

  async getListadoAvalGarantizadoExcel(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_51/AvalGarantizado/AvalGarantizadoExcel`;
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
      console.error("Error en getListadoAvalGarantizadoExcel:", error);
      throw error;
    }
  }

  async getListadoAvalGarantizadoReporte(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_51/AvalGarantizado/AvalGarantizadoExcelFormato`;
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
      console.error("Error en getListadoAvalGarantizadoReporte:", error);
      throw error;
    }
  }
}
