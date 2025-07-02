import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { Anexo7DTO } from "../DTO/Anexo7DTO";
import { IAnexo7 } from "../Interfaces/IAnexo7.interface";

@Injectable({
  providedIn: "root",
})
export class Anexo7Service implements IAnexo7 {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoAnexo7(token: string, usuario: string): Promise<Anexo7DTO[]> {
    try {
      const url = `NRP_36/Anexo7/Lista`;
      const datos = {
        fecha_inicio: "2025-04-04",
        fecha_fin: "2025-04-04",
        codusuario: usuario,
        activo: null,
      };
      return await this.apiConnectionService.sendRequestAsync<Anexo7DTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoAnexo7:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async guardarAnexo7(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `NRP_36/Anexo7/Guardar`;
      datos.cod_usuario = usuario; // Agregar el usuario al objeto datos
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en guardarAnexo7:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async editarAnexo7(datos: any, token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_36/Anexo7/Actualizar`;
      datos.cod_usuario = usuario; // Agregar el usuario al objeto datos
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "PUT",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en editarAnexo7:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async eliminarAnexo7(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `NRP_36/Anexo7/Eliminar`;
      datos.cod_usuario = usuario; // Agregar el usuario al objeto datos
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "DELETE",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en eliminarAnexo7:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async desactivarAnexo7(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `NRP_36/Anexo7/Desactivar`;
      const dato = { id: datos, codusuario: usuario };
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "PUT",
        dato,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en desactivarAnexo7:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async activarAnexo7(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `NRP_36/Anexo7/Activar`;
      const dato = { id: datos, codusuario: usuario };
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "PUT",
        dato,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en activarAnexo7:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async getListadoAnexo7XML(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_36/Anexo7/ExportarXML`;
      const datos = {
        fecha_inicio: "2025-04-04",
        fecha_fin: "2025-04-04",
        codusuario: usuario,
        activo: true,
      };
      return await this.apiConnectionService.sendRequestXMLAsync<any[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoAnexo7:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async getListadoAnexo7Excel(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_36/Anexo7/ExportarExcel`;
      const datos = {
        fecha_inicio: "2025-04-04",
        fecha_fin: "2025-04-04",
        codusuario: usuario,
        activo: true,
      };
      return await this.apiConnectionService.sendRequestExcelAsync<any[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoAnexo7:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
}
