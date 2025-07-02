import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { Anexo4DTO } from "../../anexo4/DTO/Anexo4DTO";
import { IAnexo4 } from "../Interfaces/IAnexo4.interface";

@Injectable({
  providedIn: "root",
})
export class Anexo4Service implements IAnexo4 {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoAnexo4(token: string, usuario: string): Promise<Anexo4DTO[]> {
    try {
      const url = `NRP_36/Anexo4/Lista`;
      const datos = {
        fecha_inicio: "2025-04-04",
        fecha_fin: "2025-04-04",
        codusuario: usuario,
        activo: null,
      };
      return await this.apiConnectionService.sendRequestAsync<Anexo4DTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoAnexo4:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
  async guardarAnexo4(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `NRP_36/Anexo4/Guardar`;
      datos.cod_usuario = usuario; // Agregar el usuario al objeto datos
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en guardarAnexo4:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
  async editarAnexo4(datos: any, token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_36/Anexo4/Actualizar`;
      datos.cod_usuario = usuario; // Agregar el usuario al objeto datos
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "PUT",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en editarAnexo4:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
  async eliminarAnexo4(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `NRP_36/Anexo4/Eliminar`;
      datos.cod_usuario = usuario; // Agregar el usuario al objeto datos
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "DELETE",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en eliminarAnexo4:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async desactivarAnexo4(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `NRP_36/Anexo4/Desactivar`;
      const dato = { id: datos, codusuario: usuario };
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "PUT",
        dato,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en desactivarAnexo4:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async activarAnexo4(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `NRP_36/Anexo4/Activar`;
      const dato = { id: datos, codusuario: usuario };
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "PUT",
        dato,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en activarAnexo4:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async getListadoAnexo4XML(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_36/Anexo4/ExportarXML`;
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
      console.error("Error en getListadoAnexo4:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async getListadoAnexo4Excel(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_36/Anexo4/ExportarExcel`;
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
      console.error("Error en getListadoAnexo4:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
}
