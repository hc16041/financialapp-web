import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { ClientesDTO } from "../DTO/ClientesDTO";
import { IClientes } from "../Interfaces/IClientes.interface";

@Injectable({
  providedIn: "root",
})
export class ClientesService implements IClientes {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoClientes(
    token: string,
    usuario: string
  ): Promise<ClientesDTO[]> {
    try {
      const url = `Clientes/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<ClientesDTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoClientes:", error);
      throw error;
    }
  }

  async getListadoClientesXML(token: string, usuario: string): Promise<any> {
    try {
      const url = `Clientes/ExportarXML`;
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
      console.error("Error en getListadoClientesXML:", error);
      throw error;
    }
  }

  async getListadoClientesExcel(token: string, usuario: string): Promise<any> {
    try {
      const url = `Clientes/ExportarExcel`;
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
      console.error("Error en getListadoClientesExcel:", error);
      throw error;
    }
  }

  async getListadoClientesTexto(token: string, usuario: string): Promise<any> {
    try {
      const url = `Clientes/ExportarTextoPlano`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      console.log("datos", datos);
      return await this.apiConnectionService.sendRequestTextAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoClientesTexto:", error);
      throw error;
    }
  }
}
