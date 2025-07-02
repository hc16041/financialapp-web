import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { Anexo12DTO } from "../DTO/Anexo12DTO";

@Injectable({
  providedIn: "root",
})
export class Anexo12Service {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoAnexo12(
    token: string,
    usuario: string
  ): Promise<Anexo12DTO[]> {
    try {
      const url = `NRSF_01/Anexo12/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<Anexo12DTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoAnexo12:", error);
      throw error;
    }
  }

  async getListadoAnexo12XML(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo12/Anexo12XML`;
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
      console.error("Error en getListadoAnexo12XML:", error);
      throw error;
    }
  }

  async getListadoAnexo12Excel(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo12/Anexo12Excel`;
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
      console.error("Error en getListadoAnexo12Excel:", error);
      throw error;
    }
  }

  async getListadoAnexo12Reporte(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo12/Anexo12ExcelFormato`;
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
      console.error("Error en getListadoAnexo12Reporte:", error);
      throw error;
    }
  }
}
