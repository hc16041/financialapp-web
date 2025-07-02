import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { ISaldoCuenta } from "../Interfaces/ISaldoCuenta.interface";
import { SaldoCuentaDTO } from "../DTO/SaldoCuentaDTO";

@Injectable({
  providedIn: "root",
})
export class SaldoCuentaService implements ISaldoCuenta {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoSaldoCuenta(token: string, usuario: string): Promise<SaldoCuentaDTO[]> {
    try {
      const url = `NRP_51/SaldoCuenta/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<SaldoCuentaDTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoSaldoCuenta:", error);
      throw error;
    }
  }

  async getListadoSaldoCuentaXML(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_51/SaldoCuenta/SaldoCuentaXML`;
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
      console.error("Error en getListadoSaldoCuentaXML:", error);
      throw error;
    }
  }

  async getListadoSaldoCuentaExcel(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_51/SaldoCuenta/SaldoCuentaExcel`;
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
      console.error("Error en getListadoSaldoCuentaExcel:", error);
      throw error;
    }
  }

  async getListadoSaldoCuentaReporte(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_51/SaldoCuenta/SaldoCuentaExcelFormato`;
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
      console.error("Error en getListadoSaldoCuentaReporte:", error);
      throw error;
    }
  }
}
