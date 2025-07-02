import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { Anexo8DTO } from "../DTO/Anexo8DTO";
import { IAnexo8 } from "../Interfaces/IAnexo8.interface";

@Injectable({
  providedIn: "root",
})
export class Anexo8Service implements IAnexo8 {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoAnexo8(token: string, usuario: string): Promise<Anexo8DTO[]> {
    try {
      const url = `NRSF_01/Anexo8/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<Anexo8DTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoAnexo8:", error);
      throw error;
    }
  }

  async getListadoAnexo8XML(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo8/Anexo8XML`;
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
      console.error("Error en getListadoAnexo8XML:", error);
      throw error;
    }
  }

  async getListadoAnexo8Excel(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo8/Anexo8Excel`;
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
      console.error("Error en getListadoAnexo8Excel:", error);
      throw error;
    }
  }

  async getListadoAnexo8Reporte(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo8/Anexo8ExcelFormato`;
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
      console.error("Error en getListadoAnexo8Reporte:", error);
      throw error;
    }
  }
}
