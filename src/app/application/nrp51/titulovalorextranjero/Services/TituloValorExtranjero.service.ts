import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { ITituloValorExtranjero } from "../Interfaces/ITituloValorExtranjero.interface";
import { TituloValorExtranjeroDTO } from "../DTO/TituloValorExtranjeroDTO";

@Injectable({
  providedIn: "root",
})
export class TituloValorExtranjeroService implements ITituloValorExtranjero {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoTituloValorExtranjero(token: string, usuario: string): Promise<TituloValorExtranjeroDTO[]> {
    try {
      const url = `NRP_51/TituloValorExtranjero/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<TituloValorExtranjeroDTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoTituloValorExtranjero:", error);
      throw error;
    }
  }

  async getListadoTituloValorExtranjeroXML(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_51/TituloValorExtranjero/TituloValorExtranjeroXML`;
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
      console.error("Error en getListadoTituloValorExtranjeroXML:", error);
      throw error;
    }
  }

  async getListadoTituloValorExtranjeroExcel(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_51/TituloValorExtranjero/TituloValorExtranjeroExcel`;
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
      console.error("Error en getListadoTituloValorExtranjeroExcel:", error);
      throw error;
    }
  }

  async getListadoTituloValorExtranjeroReporte(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_51/TituloValorExtranjero/TituloValorExtranjeroExcelFormato`;
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
      console.error("Error en getListadoTituloValorExtranjeroReporte:", error);
      throw error;
    }
  }
}
