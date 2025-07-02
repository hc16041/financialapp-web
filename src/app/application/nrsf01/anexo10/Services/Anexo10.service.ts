import { Injectable } from "@angular/core";
import { IAnexo10 } from "../Interfaces/IAnexo10.interface";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { Anexo10DTO } from "../DTO/Anexo10DTO";

@Injectable({
  providedIn: "root",
})
export class Anexo10Service implements IAnexo10 {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoAnexo10(
    token: string,
    usuario: string
  ): Promise<Anexo10DTO[]> {
    try {
      const url = `NRSF_01/Anexo10/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<Anexo10DTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoAnexo10:", error);
      throw error;
    }
  }

  async getListadoAnexo10XML(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo10/Anexo10XML`;
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
      console.error("Error en getListadoAnexo10XML:", error);
      throw error;
    }
  }

  async getListadoAnexo10Excel(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo10/Anexo10Excel`;
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
      console.error("Error en getListadoAnexo10Excel:", error);
      throw error;
    }
  }

  async getListadoAnexo10Reporte(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo10/Anexo10ExcelFormato`;
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
      console.error("Error en getListadoAnexo10Reporte:", error);
      throw error;
    }
  }
}
