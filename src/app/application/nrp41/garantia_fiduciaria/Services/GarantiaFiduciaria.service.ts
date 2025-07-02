import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { GarantiaFiduciariaDTO } from "../DTO/GarantiaFiduciariaDTO";
import { IGarantiaFiduciaria } from "../Interfaces/IGarantiaFiduciaria.interface";

@Injectable({
  providedIn: "root",
})
export class GarantiaFiduciariaService implements IGarantiaFiduciaria {
  constructor(
    private http: HttpClient,
    private store: Store,
    private apiConnectionService: ApiConnectionService
  ) {}

  async getListadoGarantiaFiduciaria(
    token: string,
    usuario: string
  ): Promise<GarantiaFiduciariaDTO[]> {
    try {
      const url = `GarantiaFiduciaria/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<
        GarantiaFiduciariaDTO[]
      >(url, "POST", datos, { Authorization: token });
    } catch (error) {
      console.error("Error en getListadoGarantiaFiduciaria:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async getListadoGarantiaFiduciariaXML(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `GarantiaFiduciaria/GarantiaFiduciariaXML`;
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
      console.error("Error en getListadoGarantiaFiduciariaXML:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async getListadoGarantiaFiduciariaExcel(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `GarantiaFiduciaria/GarantiaFiduciariaExcel`;
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
      console.error("Error en getListadoGarantiaFiduciariaExcel:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
}
