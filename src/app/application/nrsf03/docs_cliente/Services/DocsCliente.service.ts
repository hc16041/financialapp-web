import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { IDocsCliente } from "../Interfaces/IDocsCliente.interface";
import { DocsClienteDTO } from "../DTO/DocsClienteDTO";

@Injectable({
  providedIn: "root",
})
export class DocsClienteService implements IDocsCliente {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoDocsCliente(
    token: string,
    usuario: string
  ): Promise<DocsClienteDTO[]> {
    try {
      const url = `DocCliente/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<DocsClienteDTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getDocsCliente:", error);
      throw error;
    }
  }

  async getListadoDocsClienteXML(token: string, usuario: string): Promise<any> {
    try {
      const url = `DocCliente/DocClienteXML`;
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
      console.error("Error en getDocsClienteXML:", error);
      throw error;
    }
  }

  async getListadoDocsClienteExcel(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `DocCliente/ListaDocClienteExcel`;
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
      console.error("Error en getDocsClienteExcel:", error);
      throw error;
    }
  }

  async getListadoDocsClienteTexto(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `DocCliente/ExportarTextoPlano`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestTextAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getDocsClienteTexto:", error);
      throw error;
    }
  }
}
