import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { Anexo6DTO } from "../DTO/Anexo6DTO";
import { IAnexo6 } from "../Interfaces/IAnexo6.interface";

@Injectable({
  providedIn: "root",
})
export class Anexo6Service implements IAnexo6 {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoAnexo6(token: string, usuario: string): Promise<Anexo6DTO[]> {
    try {
      const url = `NRSF_01/Anexo6/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<Anexo6DTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoAnexo6:", error);
      throw error;
    }
  }

  async getListadoAnexo6XML(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo6/Anexo6XML`;
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
      console.error("Error en getListadoAnexo6XML:", error);
      throw error;
    }
  }

  async getListadoAnexo6Excel(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo6/ExportarExcel`;
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
      console.error("Error en getListadoAnexo6Excel:", error);
      throw error;
    }
  }

  async getListadoAnexo6Reporte(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRSF_01/Anexo6/Anexo6ExcelFormato`;
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
      console.error("Error en getListadoAnexo6Reporte:", error);
      throw error;
    }
  }
}
