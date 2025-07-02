import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { Anexo5DTO } from "../DTO/Anexo5DTO";
import { IAnexo5 } from "../Interfaces/IAnexo5.interface";

@Injectable({
  providedIn: "root",
})
export class Anexo5Service implements IAnexo5 {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoAnexo5(token: string, usuario: string): Promise<Anexo5DTO[]> {
    try {
      const url = `NRSF_01/Anexo5/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<Anexo5DTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoAnexo5:", error);
      throw error;
    }
  }

  async getListadoAnexo5XML(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo5/Anexo5XML`;
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
      console.error("Error en getListadoAnexo5XML:", error);
      throw error;
    }
  }

  async getListadoAnexo5Excel(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo5/Anexo5Excel`;
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
      console.error("Error en getListadoAnexo5Excel:", error);
      throw error;
    }
  }

  async getListadoAnexo5Reporte(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo5/Anexo5ExcelFormato`;
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
      console.error("Error en getListadoAnexo5Reporte:", error);
      throw error;
    }
  }
}
