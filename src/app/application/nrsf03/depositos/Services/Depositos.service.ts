import { Injectable } from "@angular/core";
import { ApiConnectionService } from "../../../../core/services/api-connection.service";
import { DepositosDTO } from "../DTO/DepositosDTO";
import { IDepositos } from "../Interfaces/IDepositos.interface";

@Injectable({
  providedIn: "root",
})
export class DepositosService implements IDepositos {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoDepositos(
    token: string,
    usuario: string
  ): Promise<DepositosDTO[]> {
    try {
      const url = `Deposito/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<DepositosDTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoDepositos:", error);
      throw error;
    }
  }

  async getListadoDepositosXML(token: string, usuario: string): Promise<any> {
    try {
      const url = `Deposito/DepositosXML`;
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
      console.error("Error en getListadoDepositosXML:", error);
      throw error;
    }
  }

  async getListadoDepositosExcel(token: string, usuario: string): Promise<any> {
    try {
      const url = `Deposito/ListaDepositoExcel`;
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
      console.error("Error en getListadoDepositosExcel:", error);
      throw error;
    }
  }

  async getListadoDepositosTexto(token: string, usuario: string): Promise<any> {
    try {
      const url = `Deposito/ExportarTextoPlano`;
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
      console.error("Error en getListadoDepositosTexto:", error);
      throw error;
    }
  }
}
