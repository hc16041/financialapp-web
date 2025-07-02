import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { ReferenciaUnidadDTO } from "../DTO/ReferenciaUnidadDTO";

@Injectable({
  providedIn: "root",
})
export class ReferenciaUnidadService {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoReferenciaUnidad(
    token: string,
    usuario: string
  ): Promise<ReferenciaUnidadDTO[]> {
    try {
      const url = `ReferenciaUnidad/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<
        ReferenciaUnidadDTO[]
      >(url, "POST", datos, { Authorization: token });
    } catch (error) {
      console.error("Error en getListadoReferenciaUnidad:", error);
      throw error; // Vuelve a lanzar el error para que se maneje
    }
  }

  async getListadoReferenciaUnidadXML(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `ReferenciaUnidad/ReferenciaUnidadXML`;
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
      console.error("Error en getListadoReferenciaUnidadXML:", error);
      throw error; // Vuelve a lanzar el error para que se maneje
    }
  }

  async getListadoReferenciaUnidadExcel(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `ReferenciaUnidad/ReferenciaUnidadExcel`;
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
      console.error("Error en getListadoReferenciaUnidadExcel:", error);
      throw error; // Vuelve a lanzar el error para que se maneje
    }
  }
}
