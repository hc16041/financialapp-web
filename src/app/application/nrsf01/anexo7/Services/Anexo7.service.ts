import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { Anexo7DTO } from "../DTO/Anexo7DTO";
import { IAnexo7 } from "../Interfaces/IAnexo7.interface";

@Injectable({
  providedIn: "root",
})
export class Anexo7Service implements IAnexo7 {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoAnexo7(token: string, usuario: string): Promise<Anexo7DTO[]> {
    try {
      const url = `NRSF_01/Anexo7/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<Anexo7DTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoAnexo7:", error);
      throw error;
    }
  }

  async getListadoAnexo7XML(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo7/Anexo7XML`;
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
      console.error("Error en getListadoAnexo7XML:", error);
      throw error;
    }
  }

  async getListadoAnexo7Excel(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo7/Anexo7Excel`;
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
      console.error("Error en getListadoAnexo7Excel:", error);
      throw error;
    }
  }

  async getListadoAnexo7Reporte(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo7/Anexo7ExcelFormato`;
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
      console.error("Error en getListadoAnexo7Reporte:", error);
      throw error;
    }
  }
}
