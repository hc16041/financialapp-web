import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { GlobalComponent } from "src/app/global-component";
import { ReferenciaDTO } from "../DTO/ReferenciaDTO";
import { IReferencia } from "../Interfaces/IReferencia.interface";

@Injectable({
  providedIn: "root",
})
export class ReferenciaService implements IReferencia {
  private readonly apiUrl = GlobalComponent.AUTH_API;
  constructor(
    private http: HttpClient,
    private store: Store,
    private apiConnectionService: ApiConnectionService
  ) {}

  async getListadoReferencias(
    token: string,
    usuario: string
  ): Promise<ReferenciaDTO[]> {
    try {
      const url = `Referencia/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<ReferenciaDTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoReferencias:", error);
      throw error; // Vuelve a lanzar el error para que se maneje
    }
  }

  async getListadoReferenciasXML(token: string, usuario: string): Promise<any> {
    try {
      const url = `Referencia/ReferenciaXML`;
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
      console.error("Error en getListadoReferenciasXML:", error);
      throw error; // Vuelve a lanzar el error para que se maneje
    }
  }

  async getListadoReferenciasExcel(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `Referencia/ReferenciaExcel`;
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
      console.error("Error en getListadoReferenciasExcel:", error);
      throw error; // Vuelve a lanzar el error para que se maneje
    }
  }
}
