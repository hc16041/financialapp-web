import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { FuncionariosEmpleadosDTO } from "../DTO/FuncionariosEmpleadosDTO";
import { IFuncionariosEmpleados } from "../Interfaces/IFuncionariosEmpleados.interface";

@Injectable({
  providedIn: "root",
})
export class FuncionariosEmpleadosService implements IFuncionariosEmpleados {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoFuncionariosEmpleados(
    token: string,
    usuario: string
  ): Promise<FuncionariosEmpleadosDTO[]> {
    try {
      const url = `FuncionarioEmpleado/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<
        FuncionariosEmpleadosDTO[]
      >(url, "POST", datos, { Authorization: token });
    } catch (error) {
      console.error("Error en getListadoFuncionariosEmpleados:", error);
      throw error;
    }
  }

  async getListadoFuncionariosEmpleadosXML(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `FuncionarioEmpleado/FuncionarioEmpleadoXML`;
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
      console.error("Error en getListadoFuncionariosEmpleadosXML:", error);
      throw error;
    }
  }

  async getListadoFuncionariosEmpleadosExcel(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `FuncionarioEmpleado/ListaFuncionarioEmpleadoExcel`;
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
      console.error("Error en getListadoFuncionariosEmpleadosExcel:", error);
      throw error;
    }
  }

  async getListadoFuncionariosEmpleadosTexto(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `FuncionarioEmpleado/ExportarTextoPlano`;
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
      console.error("Error en getListadoFuncionariosEmpleadosTexto:", error);
      throw error;
    }
  }
}
