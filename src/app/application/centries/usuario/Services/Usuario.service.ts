import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { UsuarioDTO } from "../DTO/UsuarioDTO";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoUsuarioActivo(token: string): Promise<UsuarioDTO[]> {
    try {
      const url = `Usuario/ListaActivos`;
      return await this.apiConnectionService.sendRequestAsync<UsuarioDTO[]>(
        url,
        "GET",
        null,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoUsuarioActivo:", error);
      throw error;
    }
  }

  async getListadoUsuarioInactivo(token: string): Promise<UsuarioDTO[]> {
    try {
      const url = `Usuario/ListaInactivos`;
      return await this.apiConnectionService.sendRequestAsync<UsuarioDTO[]>(
        url,
        "GET",
        null,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoUsuarioInactivo:", error);
      throw error;
    }
  }

  async getListadoUsuarioId(idusuario: number, token: string): Promise<any> {
    try {
      const url = `Usuario/ObtenerUsuarioId`;
      const datos = {
        id: idusuario,
      };
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoUsuarioId:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async guardarUsuario(datos: any, token: string): Promise<any> {
    try {
      const url = `Usuario/Guardar`;
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en guardarUsuario:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async editarUsuario(datos: any, token: string): Promise<any> {
    try {
      const url = `Usuario/Editar`;
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en editarUsuario:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async inactivarUsuario(idusuario: number, token: string): Promise<any> {
    try {
      const url = `Usuario/Desactivar`;
      const datos = {
        id: idusuario,
      };
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en inactivarUsuario:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async activarUsuario(idusuario: number, token: string): Promise<any> {
    try {
      const url = `Usuario/Activar`;
      const datos = {
        id: idusuario,
      };
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en activarUsuario:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async resetearClave(idusuario: number, token: string): Promise<any> {
    try {
      const url = `Usuario/ResetearClave`;
      const datos = {
        id: idusuario,
      };
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en resetearClave:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
}
