import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { Anexo3DTO } from "../DTO/Anexo3DTO";
import { IAnexo3 } from "../Interfaces/IAnexo3.interface";

@Injectable({
  providedIn: "root",
})
export class Anexo3Service implements IAnexo3 {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoAnexo3(token: string, usuario: string): Promise<Anexo3DTO[]> {
    try {
      const url = `NRP_36/Anexo3/Lista`;
      const datos = {
        fecha_inicio: "2025-04-04",
        fecha_fin: "2025-04-04",
        codusuario: usuario,
        activo: null,
      };
      return await this.apiConnectionService.sendRequestAsync<Anexo3DTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoAnexo3:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
  async guardarAnexo3(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `NRP_36/Anexo3/Guardar`;
      datos.cod_usuario = usuario; // Agregar el usuario al objeto datos
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en guardarAnexo3:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
  async editarAnexo3(datos: any, token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_36/Anexo3/Actualizar`;
      datos.cod_usuario = usuario; // Agregar el usuario al objeto datos
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "PUT",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en editarAnexo3:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async eliminarAnexo3(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `NRP_36/Anexo3/Eliminar`;
      datos.cod_usuario = usuario; // Agregar el usuario al objeto datos
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "DELETE",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en eliminarAnexo3:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async desactivarAnexo3(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `NRP_36/Anexo3/Desactivar`;
      const dato = { id: datos, codusuario: usuario };
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "PUT",
        dato,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en desactivarAnexo3:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Activa un registro de Anexo3
   * @param datos {any} Informaci n del registro a activar
   * @param token {string} Token de autenticaci n
   * @param usuario {string} C digo del usuario que activa el registro
   * @returns {Promise<any>} Promesa que se resuelve con el resultado de la petici n
   */
  /*******  0104bdd7-8c75-4a6d-a4ae-fcaafeacaa0a  *******/
  async activarAnexo3(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `NRP_36/Anexo3/Activar`;
      const dato = { id: datos, codusuario: usuario };
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "PUT",
        dato,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en activarAnexo3:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async getListadoAnexo3XML(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_36/Anexo3/ExportarXML`;
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
      console.error("Error en getListadoAnexo3:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async getListadoAnexo3Excel(token: string, usuario: string): Promise<any> {
    try {
      const url = `NRP_36/Anexo3/ExportarExcel`;
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
      console.error("Error en getListadoAnexo3:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
}
