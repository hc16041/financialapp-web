import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { IJuntaDirectiva } from "../Interfaces/IJuntaDirectiva.interface";
import { JuntaDirectivaDTO } from "../DTO/JuntaDirectivaDTO";

@Injectable({
  providedIn: "root",
})
export class JuntaDirectivaService implements IJuntaDirectiva {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoJuntaDirectiva(
    token: string,
    usuario: string
  ): Promise<JuntaDirectivaDTO[]> {
    try {
      const url = `JuntaDirectiva/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<
        JuntaDirectivaDTO[]
      >(url, "POST", datos, { Authorization: token });
    } catch (error) {
      console.error("Error en getListadoJuntaDirectiva:", error);
      throw error; // Vuelve a lanzar el error para que se maneje
    }
  }

  async getListadoJuntaDirectivaXML(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `JuntaDirectiva/JuntaDirectivaXML`;
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
      console.error("Error en getListadoJuntaDirectivaXML:", error);
      throw error; // Vuelve a lanzar el error para que se maneje
    }
  }

  async getListadoJuntaDirectivaExcel(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `JuntaDirectiva/JuntaDirectivaExcel`;
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
      console.error("Error en getListadoJuntaDirectivaExcel:", error);
      throw error; // Vuelve a lanzar el error para que se maneje
    }
  }
}
