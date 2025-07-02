import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { CatalogoAgenciasDTO } from "../DTO/CatalogoAgenciasDTO";
import { ICatalogoAgencias } from "../Interfaces/ICatalogoAgencias.interface";

@Injectable({
  providedIn: "root",
})
export class CatalogoAgenciasService implements ICatalogoAgencias {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoCatalogoAgencias(
    token: string,
    usuario: string
  ): Promise<CatalogoAgenciasDTO[]> {
    try {
      const url = `CatalogoAgencia/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<
        CatalogoAgenciasDTO[]
      >(url, "POST", datos, { Authorization: token });
    } catch (error) {
      console.error("Error en getListadoCatalogoAgencias:", error);
      throw error;
    }
  }

  async getListadoCatalogoAgenciasXML(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `CatalogoAgencia/CatalogoAgenciasXML`;
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
      console.error("Error en getListadoCatalogoAgenciasXML:", error);
      throw error;
    }
  }

  async getListadoCatalogoAgenciasExcel(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `CatalogoAgencia/ListaCatalogoAgenciaExcel`;
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
      console.error("Error en getListadoCatalogoAgenciasExcel:", error);
      throw error;
    }
  }

  async getListadoCatalogoAgenciasTexto(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `CatalogoAgencia/ExportarTextoPlano`;
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
      console.error("Error en getListadoCatalogoAgenciasTexto:", error);
      throw error;
    }
  }
}
