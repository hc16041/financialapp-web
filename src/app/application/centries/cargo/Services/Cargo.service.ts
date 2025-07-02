import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { CargoDTO } from "../DTO/CargoDTO";
import { ICargo } from "../Interfaces/ICargo.interface";

@Injectable({
  providedIn: "root",
})
export class CargoService implements ICargo {
  constructor(private apiConnectionService: ApiConnectionService) {}

  /**
   * Devuelve el listado de cargos.
   *
   * @returns La respuesta del servidor en formato JSON.
   */
  async getListadoCargo(token: string): Promise<CargoDTO[]> {
    try {
      const url = `Cargo/Lista`;
      return await this.apiConnectionService.sendRequestAsync<CargoDTO[]>(
        url,
        "GET",
        null,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoCargo:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
  /**
   * Obtiene el cargo por su id.
   *
   * @param {number} idcargo El id del cargo a obtener.
   * @returns La respuesta del servidor en formato JSON.
   */
  async getListadoCargoId(idcargo: number, token: string): Promise<any> {
    try {
      const url = `Cargo/ObtenerCargoId`;
      const datos = {
        id: idcargo,
      };
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoCargoId:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
  /**
   * Guarda un cargo.
   *
   * @param {string} cargo El cargo a guardar.
   * @returns La respuesta del servidor en formato JSON.
   */
  async guardarCargo(datos: any, token: string): Promise<any> {
    try {
      const url = `Cargo/Guardar`;
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en guardarCargo:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  /**
   * Edita un cargo existente.
   *
   * @param {any} datos Los datos del cargo a editar.
   * @returns La respuesta del servidor en formato JSON.
   */
  async editarCargo(datos: any, token: string): Promise<any> {
    try {
      const url = `Cargo/Editar`;
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en editarCargo:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  /**
   * Elimina un cargo.
   *
   * @param {number} idcargo El id del cargo a eliminar.
   * @returns La respuesta del servidor en formato JSON.
   */
  async eliminarCargo(datos: any, token: string): Promise<any> {
    try {
      const url = `Cargo/Eliminar`;
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en eliminarCargo:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
}
