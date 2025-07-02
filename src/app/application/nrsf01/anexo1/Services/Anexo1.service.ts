import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { IAnexo1 } from "../Interfaces/IAnexo1.interface";
import { Anexo1DTO } from "../DTO/Anexo1DTO";

@Injectable({
  providedIn: "root",
})
export class Anexo1Service implements IAnexo1 {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoAnexo1(token: string, usuario: string): Promise<Anexo1DTO[]> {
    try {
      const url = `NRSF_01/Anexo1/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<Anexo1DTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoAnexo1:", error);
      throw error;
    }
  }

  async getListadoAnexo1XML(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo1/Anexo1XML`;
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
      console.error("Error en getListadoAnexo1XML:", error);
      throw error;
    }
  }

  async getListadoAnexo1Excel(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo1/Anexo1Excel`;
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
      console.error("Error en getListadoAnexo1Excel:", error);
      throw error;
    }
  }

  async getListadoAnexo1Reporte(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo1/Anexo1ExcelFormato`;
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
      console.error("Error en getListadoAnexo1Reporte:", error);
      throw error;
    }
  }
}
