import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { Anexo11DTO } from "../DTO/Anexo11DTO";

@Injectable({
  providedIn: "root",
})
export class Anexo11Service {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoAnexo11(
    token: string,
    usuario: string
  ): Promise<Anexo11DTO[]> {
    try {
      const url = `NRSF_01/Anexo11/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<Anexo11DTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoAnexo11:", error);
      throw error;
    }
  }

  async getListadoAnexo11XML(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo11/Anexo11XML`;
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
      console.error("Error en getListadoAnexo11XML:", error);
      throw error;
    }
  }

  async getListadoAnexo11Excel(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo11/Anexo11Excel`;
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
      console.error("Error en getListadoAnexo11Excel:", error);
      throw error;
    }
  }

  async getListadoAnexo11Reporte(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo11/Anexo11ExcelFormato`;
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
      console.error("Error en getListadoAnexo11Reporte:", error);
      throw error;
    }
  }
}
