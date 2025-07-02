import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { Anexo8DTO } from "../DTO/Anexo8DTO";
import { IAnexo8 } from "../Interfaces/IAnexo8.interface";

@Injectable({
  providedIn: "root",
})
export class Anexo8Service implements IAnexo8 {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoAnexo8(token: string, usuario: string): Promise<Anexo8DTO[]> {
    try {
      const url = `NRP_36/Anexo8/Lista`;
      const datos = {
        fecha_inicio: "2025-04-04",
        fecha_fin: "2025-04-04",
        codusuario: usuario,
        activo: null,
      };
      return await this.apiConnectionService.sendRequestAsync<Anexo8DTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoAnexo8:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
  async guardarAnexo8(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `NRP_36/Anexo8/Guardar`;
      datos.cod_usuario = usuario; // Agregar el usuario al objeto datos
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en guardarAnexo8:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async editarAnexo8(datos: any, token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_36/Anexo8/Actualizar`;
      datos.cod_usuario = usuario; // Agregar el usuario al objeto datos
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "PUT",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en editarAnexo8:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async eliminarAnexo8(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `NRP_36/Anexo8/Eliminar`;
      datos.cod_usuario = usuario; // Agregar el usuario al objeto datos
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "DELETE",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en eliminarAnexo8:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async desactivarAnexo8(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `NRP_36/Anexo8/Desactivar`;
      const dato = { id: datos, codusuario: usuario };
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "PUT",
        dato,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en desactivarAnexo8:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async activarAnexo8(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `NRP_36/Anexo8/Activar`;
      const dato = { id: datos, codusuario: usuario };
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "PUT",
        dato,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en activarAnexo8:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async getListadoAnexo8XML(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_36/Anexo8/ExportarXML`;
      const datos = {
        fecha_inicio: "2025-04-04",
        fecha_fin: "2025-04-04",
        codusuario: usuario,
      };
      return await this.apiConnectionService.sendRequestXMLAsync<any[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoAnexo8XML:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async getListadoAnexo8Excel(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_36/Anexo8/ExportarExcel`;
      const datos = {
        fecha_inicio: "2025-04-04",
        fecha_fin: "2025-04-04",
        codusuario: usuario,
      };
      return await this.apiConnectionService.sendRequestExcelAsync<any[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoAnexo8Excel:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
}
