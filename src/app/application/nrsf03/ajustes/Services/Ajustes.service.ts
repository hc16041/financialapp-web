import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { AjustesDTO } from "../DTO/AjustesDTO";
import { IAjustes } from "../Interfaces/IAjustes.interface";

@Injectable({
  providedIn: "root",
})
export class AjustesService implements IAjustes {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoAjustes(
    token: string,
    usuario: string
  ): Promise<AjustesDTO[]> {
    try {
      const url = `Ajuste/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<AjustesDTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoAjustes:", error);
      throw error;
    }
  }

  async getListadoAjustesXML(token: string, usuario: string): Promise<any> {
    try {
      const url = `Ajuste/ListaAjusteXml`;
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
      console.error("Error en getListadoAjustesXML:", error);
      throw error;
    }
  }

  async getListadoAjustesExcel(token: string, usuario: string): Promise<any> {
    try {
      const url = `Ajuste/ListaAjusteExcel`;
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
      console.error("Error en getListadoAjustesExcel:", error);
      throw error;
    }
  }

  async getListadoAjustesTexto(token: string, usuario: string): Promise<any> {
    try {
      const url = `Ajuste/ListaAjusteTextoPlano`;
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
      console.error("Error en getListadoAjustesTexto:", error);
      throw error;
    }
  }
}
