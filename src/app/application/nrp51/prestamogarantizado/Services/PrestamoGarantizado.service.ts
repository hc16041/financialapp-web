import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { IPrestamoGarantizado } from "../Interfaces/IPrestamoGarantizado.interface";
import { PrestamoGarantizadoDTO } from "../DTO/PrestamoGarantizadoDTO";

@Injectable({
  providedIn: "root",
})
export class PrestamoGarantizadoService implements IPrestamoGarantizado {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoPrestamoGarantizado(token: string, usuario: string): Promise<PrestamoGarantizadoDTO[]> {
    try {
      const url = `NRP_51/PrestamoGarantizado/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<PrestamoGarantizadoDTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoPrestamoGarantizado:", error);
      throw error;
    }
  }

  async getListadoPrestamoGarantizadoXML(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_51/PrestamoGarantizado/PrestamoGarantizadoXML`;
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
      console.error("Error en getListadoPrestamoGarantizadoXML:", error);
      throw error;
    }
  }

  async getListadoPrestamoGarantizadoExcel(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_51/PrestamoGarantizado/PrestamoGarantizadoExcel`;
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
      console.error("Error en getListadoPrestamoGarantizadoExcel:", error);
      throw error;
    }
  }

  async getListadoPrestamoGarantizadoReporte(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_51/PrestamoGarantizado/PrestamoGarantizadoExcelFormato`;
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
      console.error("Error en getListadoPrestamoGarantizadoReporte:", error);
      throw error;
    }
  }
}
