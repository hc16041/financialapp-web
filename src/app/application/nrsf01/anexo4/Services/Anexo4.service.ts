import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { Anexo4DTO } from "../DTO/Anexo4DTO";
import { IAnexo4 } from "../Interfaces/IAnexo4.interface";

@Injectable({
  providedIn: "root",
})
export class Anexo4Service implements IAnexo4 {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoAnexo4(token: string, usuario: string): Promise<Anexo4DTO[]> {
    try {
      const url = `NRSF_01/Anexo4/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<Anexo4DTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoAnexo4:", error);
      throw error;
    }
  }

  async getListadoAnexo4XML(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo4/Anexo4XML`;
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
      console.error("Error en getListadoAnexo4XML:", error);
      throw error;
    }
  }

  async getListadoAnexo4Excel(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo4/ExportarExcel`;
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
      console.error("Error en getListadoAnexo4Excel:", error);
      throw error;
    }
  }

  async getListadoAnexo4Reporte(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo4/Anexo4ExcelFormato`;
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
      console.error("Error en getListadoAnexo4Reporte:", error);
      throw error;
    }
  }
}
