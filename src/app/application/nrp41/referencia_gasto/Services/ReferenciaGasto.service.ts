import { Injectable } from "@angular/core";
import { IReferenciaGasto } from "../Interfaces/IReferenciaGasto.interface";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { ReferenciaGastoDTO } from "../DTO/ReferenciaGastoDTO";

@Injectable({
  providedIn: "root",
})
export class ReferenciaGastoService implements IReferenciaGasto {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoReferenciaGasto(
    token: string,
    usuario: string
  ): Promise<ReferenciaGastoDTO[]> {
    try {
      const url = `ReferenciaGasto/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<
        ReferenciaGastoDTO[]
      >(url, "POST", datos, { Authorization: token });
    } catch (error) {
      console.error("Error en getListadoReferenciaGasto:", error);
      throw error; // Vuelve a lanzar el error para que se maneje
    }
  }

  async getListadoReferenciaGastoXML(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `ReferenciaGasto/ReferenciaGastoXML`;
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
      console.error("Error en getListadoReferenciaGastoXML:", error);
      throw error; // Vuelve a lanzar el error para que se maneje
    }
  }

  async getListadoReferenciaGastoExcel(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `ReferenciaGasto/ReferenciaGastoExcel`;
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
      console.error("Error en getListadoReferenciaGastoExcel:", error);
      throw error; // Vuelve a lanzar el error para que se maneje
    }
  }
}
