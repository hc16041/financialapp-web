import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { IReferenciaGarantia } from "../Interfaces/IReferenciaGarantia.interface";
import { ReferenciaGarantiaDTO } from "../DTO/ReferenciaGarantiaDTO";

@Injectable({
  providedIn: "root",
})
export class ReferenciaGarantiaService implements IReferenciaGarantia {
  constructor(
    private http: HttpClient,
    private store: Store,
    private apiConnectionService: ApiConnectionService
  ) {}

  async getListadoReferenciasGarantia(
    token: string,
    usuario: string
  ): Promise<ReferenciaGarantiaDTO[]> {
    try {
      const url = `ReferenciaGarantia/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<
        ReferenciaGarantiaDTO[]
      >(url, "POST", datos, { Authorization: token });
    } catch (error) {
      console.error("Error en getListadoReferenciasGarantia:", error);
      throw error; // Vuelve a lanzar el error para que se maneje
    }
  }

  async getListadoReferenciasGarantiaXML(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `ReferenciaGarantia/ReferenciaGarantiaXML`;
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
      console.error("Error en getListadoReferenciasGarantiaXML:", error);
      throw error; // Vuelve a lanzar el error para
    }
  }

  async getListadoReferenciasGarantiaExcel(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `ReferenciaGarantia/ReferenciaGarantiaExcel`;
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
      console.error("Error en getListadoReferenciasGarantiaExcel:", error);
      throw error; // Vuelve a lanzar el error para
    }
  }
}
