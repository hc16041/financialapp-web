import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { IDeudaSubordinada } from "../Interfaces/IDeudaSubordinada.interface";
import { DeudaSubordinadaDTO } from "../DTO/DeudaSubordinadaDTO";

@Injectable({
  providedIn: "root",
})
export class DeudaSubordinadaService implements IDeudaSubordinada {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoDeudaSubordinada(token: string, usuario: string): Promise<DeudaSubordinadaDTO[]> {
    try {
      const url = `NRP_51/DeudaSubordinada/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<DeudaSubordinadaDTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoDeudaSubordinada:", error);
      throw error;
    }
  }

  async getListadoDeudaSubordinadaXML(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_51/DeudaSubordinada/DeudaSubordinadaXML`;
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
      console.error("Error en getListadoDeudaSubordinadaXML:", error);
      throw error;
    }
  }

  async getListadoDeudaSubordinadaExcel(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_51/DeudaSubordinada/DeudaSubordinadaExcel`;
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
      console.error("Error en getListadoDeudaSubordinadaExcel:", error);
      throw error;
    }
  }

  async getListadoDeudaSubordinadaReporte(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_51/DeudaSubordinada/DeudaSubordinadaExcelFormato`;
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
      console.error("Error en getListadoDeudaSubordinadaReporte:", error);
      throw error;
    }
  }
}
