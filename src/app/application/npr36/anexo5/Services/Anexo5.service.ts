import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { Anexo5DTO } from "../DTO/Anexo5DTO";
import { IAnexo5 } from "../Interfaces/IAnexo5.interface";

@Injectable({
  providedIn: "root",
})
export class Anexo5Service implements IAnexo5 {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoAnexo5(token: string, usuario: string): Promise<Anexo5DTO[]> {
    try {
      const url = `NRP_36/Anexo5/Lista`;
      const datos = {
        fecha_inicio: "2025-04-04",
        fecha_fin: "2025-04-04",
        codusuario: usuario,
        activo: null,
      };
      return await this.apiConnectionService.sendRequestAsync<Anexo5DTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoAnexo5:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
  async guardarAnexo5(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `NRP_36/Anexo5/Guardar`;
      datos.cod_usuario = usuario; // Agregar el usuario al objeto datos
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en guardarAnexo5:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async editarAnexo5(datos: any, token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_36/Anexo5/Actualizar`;
      datos.cod_usuario = usuario; // Agregar el usuario al objeto datos
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "PUT",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en editarAnexo5:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
  async eliminarAnexo5(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `NRP_36/Anexo5/Eliminar`;
      datos.cod_usuario = usuario; // Agregar el usuario al objeto datos
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "DELETE",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en eliminarAnexo5:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async desactivarAnexo5(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `NRP_36/Anexo5/Desactivar`;
      const dato = { id: datos, codusuario: usuario };
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "PUT",
        dato,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en desactivarAnexo5:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async activarAnexo5(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `NRP_36/Anexo5/Activar`;
      const dato = { id: datos, codusuario: usuario };
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "PUT",
        dato,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en activarAnexo5:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
  async getListadoAnexo5XML(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_36/Anexo5/ExportarXML`;
      const datos = {
        fecha_inicio: "2025-04-04",
        fecha_fin: "2025-04-04",
        codusuario: usuario,
      };
      return await this.apiConnectionService.sendRequestXMLAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoAnexo5:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
  async getListadoAnexo5Excel(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_36/Anexo5/ExportarExcel`;
      const datos = {
        fecha_inicio: "2025-04-04",
        fecha_fin: "2025-04-04",
        codusuario: usuario,
      };
      return await this.apiConnectionService.sendRequestExcelAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoAnexo5:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
}
