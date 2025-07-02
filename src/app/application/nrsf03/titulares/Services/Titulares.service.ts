import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { ITitulares } from "../Interfaces/ITitulares.interface";
import { TitularesDTO } from "../DTO/TitularesDTO";

@Injectable({
  providedIn: "root",
})
export class TitularesService implements ITitulares {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoTitulares(
    token: string,
    usuario: string
  ): Promise<TitularesDTO[]> {
    try {
      const url = `Titulares/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<TitularesDTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoTitulares:", error);
      throw error;
    }
  }

  async getListadoTitularesXML(token: string, usuario: string): Promise<any> {
    try {
      const url = `Titulares/TitularesXML`;
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
      console.error("Error en getListadoTitularesXML:", error);
      throw error;
    }
  }

  async getListadoTitularesExcel(token: string, usuario: string): Promise<any> {
    try {
      const url = `Titulares/ListaTitularesExcel`;
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
      console.error("Error en getListadoTitularesExcel:", error);
      throw error;
    }
  }

  async getListadoTitularesTexto(token: string, usuario: string): Promise<any> {
    try {
      const url = `Titulares/ExportarTextoPlano`;
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
      console.error("Error en getListadoTitularesTexto:", error);
      throw error;
    }
  }
}
