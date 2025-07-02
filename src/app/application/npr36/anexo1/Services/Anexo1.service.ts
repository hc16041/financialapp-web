import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { IAnexo1 } from "../Interfaces/IAnexo1.interface";
import { Anexo1DTO } from "../DTO/Anexo1DTO";
import { act } from "@ngrx/effects";

@Injectable({
  providedIn: "root",
})
export class Anexo1Service implements IAnexo1 {
  constructor(private apiConnectionService: ApiConnectionService) {}

  /**
   * Devuelve el listado de anexo1.
   *
   * @returns La respuesta del servidor en formato JSON.
   */
  async getListadoAnexo1(token: string, usuario: string): Promise<Anexo1DTO[]> {
    try {
      const url = `NRP_36/Anexo1/Lista`;
      const datos = {
        fecha_inicio: new Date().toISOString().split("T")[0],
        fecha_fin: new Date().toISOString().split("T")[0],
        CODUSUARIO: usuario,
        activo: null,
      };
      return await this.apiConnectionService.sendRequestAsync<Anexo1DTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoAnexo1:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async guardarAnexo1(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `NRP_36/Anexo1/Guardar`;
      datos.cod_usuario = usuario; // Agregar el usuario al objeto datos
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en guardarAnexo1:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async editarAnexo1(datos: any, token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_36/Anexo1/Actualizar`;
      datos.cod_usuario = usuario; // Agregar el usuario al objeto datos
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "PUT",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en editarAnexo1:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async eliminarAnexo1(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `NRP_36/Anexo1/Eliminar`;
      datos.cod_usuario = usuario; // Agregar el usuario al objeto datos
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "DELETE",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en eliminarAnexo1:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async desactivarAnexo1(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `NRP_36/Anexo1/Desactivar`;
      const dato = { id: datos, codusuario: usuario };
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "PUT",
        dato,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en desactivarAnexo1:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async activarAnexo1(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `NRP_36/Anexo1/Activar`;
      const dato = { id: datos, codusuario: usuario };
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "PUT",
        dato,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en activarAnexo1:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async getListadoAnexo1XML(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_36/Anexo1/ExportarXML`;
      const datos = {
        fecha_inicio: new Date().toISOString().split("T")[0],
        fecha_fin: new Date().toISOString().split("T")[0],
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestXMLAsync<any>(
        url,
        "POST",
        datos
        // { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoAnexo1XML:", error);
      throw error;
    }
  }

  async getListadoAnexo1Excel(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_36/Anexo1/ExportarExcel`;
      const datos = {
        fecha_inicio: new Date().toISOString().split("T")[0],
        fecha_fin: new Date().toISOString().split("T")[0],
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestExcelAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoAnexo1Excel:", error);
      throw error;
    }
  }
}
