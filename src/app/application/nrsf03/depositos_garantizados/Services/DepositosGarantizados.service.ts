import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { DepositosGarantizadosDTO } from "../DTO/DepositosGarantizadosDTO";
import { IDepositosGarantizados } from "../Interfaces/IDepositosGarantizados.interface";

@Injectable({
  providedIn: "root",
})
export class DepositosGarantizadosService implements IDepositosGarantizados {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoDepositosGarantizados(
    token: string,
    usuario: string
  ): Promise<DepositosGarantizadosDTO[]> {
    try {
      const url = `DepositoGarantizado/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<
        DepositosGarantizadosDTO[]
      >(url, "POST", datos, { Authorization: token });
    } catch (error) {
      console.error("Error en getListadoDepositosGarantizados:", error);
      throw error;
    }
  }

  async getListadoDepositosGarantizadosXML(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `DepositoGarantizado/DepositoGarantizadoXML`;
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
      console.error("Error en getListadoDepositosGarantizadosXML:", error);
      throw error;
    }
  }

  async getListadoDepositosGarantizadosExcel(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `DepositoGarantizado/ListaDepositoGarantizadoExcel`;
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
      console.error("Error en getListadoDepositosGarantizadosExcel:", error);
      throw error;
    }
  }

  async getListadoDepositosGarantizadosTexto(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `DepositoGarantizado/ExportarTextoPlano`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestTextAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoDepositosGarantizadosTexto:", error);
      throw error;
    }
  }
}
