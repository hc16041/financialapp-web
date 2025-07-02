import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { Anexo3DTO } from "../DTO/Anexo3DTO";
import { IAnexo3 } from "../Interfaces/IAnexo3.interface";

@Injectable({
  providedIn: "root",
})
export class Anexo3Service implements IAnexo3 {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoAnexo3(token: string, usuario: string): Promise<Anexo3DTO[]> {
    try {
      const url = `NRSF_01/Anexo3/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<Anexo3DTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoAnexo3:", error);
      throw error;
    }
  }

  async getListadoAnexo3XML(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo3/Anexo3XML`;
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
      console.error("Error en getListadoAnexo3XML:", error);
      throw error;
    }
  }

  async getListadoAnexo3Excel(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo3/Anexo3Excel`;
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
      console.error("Error en getListadoAnexo3Excel:", error);
      throw error;
    }
  }

  async getListadoAnexo3Reporte(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo3/Anexo3ExcelFormato`;
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
      console.error("Error en getListadoAnexo3Reporte:", error);
      throw error;
    }
  }
}
