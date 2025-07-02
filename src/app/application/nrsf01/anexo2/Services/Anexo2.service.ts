import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { Anexo2DTO } from "../DTO/Anexo2DTO";
import { IAnexo2 } from "../Interfaces/IAnexo2.interface";

@Injectable({
  providedIn: "root",
})
export class Anexo2Service implements IAnexo2 {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoAnexo2(token: string, usuario: string): Promise<Anexo2DTO[]> {
    try {
      const url = `NRSF_01/Anexo2/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<Anexo2DTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoAnexo2:", error);
      throw error;
    }
  }

  async getListadoAnexo2XML(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo2/Anexo2XML`;
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
      console.error("Error en getListadoAnexo2XML:", error);
      throw error;
    }
  }

  async getListadoAnexo2Excel(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo2/Anexo2Excel`;
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
      console.error("Error en getListadoAnexo2Excel:", error);
      throw error;
    }
  }

  async getListadoAnexo2Reporte(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo2/Anexo2ExcelFormato`;
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
      console.error("Error en getListadoAnexo2Reporte:", error);
      throw error;
    }
  }
}
