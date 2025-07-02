import { Injectable } from "@angular/core";
import { ApiConnectionService } from "../../../../core/services/api-connection.service";
import { SociosSociedadesDTO } from "../DTO/SociosSociedadesDTO";
import { ISociosSociedades } from "../Interfaces/ISociosSociedades.interface";

@Injectable({
  providedIn: "root",
})
export class SociosSociedadesService implements ISociosSociedades {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoSociosSociedades(
    token: string,
    usuario: string
  ): Promise<SociosSociedadesDTO[]> {
    try {
      const url = `SociosSociedades/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<
        SociosSociedadesDTO[]
      >(url, "POST", datos, { Authorization: token });
    } catch (error) {
      console.error("Error en getListadoSociosSociedades:", error);
      throw error; // Vuelve a lanzar el error para que se maneje
    }
  }

  async getListadoSociosSociedadesXML(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `SociosSociedades/SociosSociedadesXML`;
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
      console.error("Error en getListadoSociosSociedadesXML:", error);
      throw error; // Vuelve a lanzar el error para que se maneje
    }
  }

  async getListadoSociosSociedadesExcel(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `SociosSociedades/SociosSociedadesExcel`;
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
      console.error("Error en getListadoSociosSociedadesExcel:", error);
      throw error; // Vuelve a lanzar el error para que se maneje
    }
  }
}
