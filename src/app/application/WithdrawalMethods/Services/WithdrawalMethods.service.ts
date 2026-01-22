import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { WithdrawalMethodsDTO } from "../DTO/WithdrawalMethodsDTO";
import { IWithdrawalMethods } from "../Interfaces/IWithdrawalMethods.interface";
import { WithdrawalMethodOperationResponse } from "../DTO/WithdrawalMethodOperation.dto";

@Injectable({
  providedIn: "root",
})
export class WithdrawalMethodsService implements IWithdrawalMethods {
  constructor(private apiConnectionService: ApiConnectionService) {}

  /**
   * Obtiene todos los métodos de retiro
   */
  async getWithdrawalMethods(token: string, usuario: string): Promise<WithdrawalMethodsDTO[]> {
    try {
      const url = `WithdrawalMethods`;
      return await this.apiConnectionService.sendRequestAsync<WithdrawalMethodsDTO[]>(
        url,
        "GET",
        null,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getWithdrawalMethods:", error);
      throw error;
    }
  }

  /**
   * Obtiene un método de retiro por ID
   */
  async getWithdrawalMethodById(
    id: number,
    token: string,
    usuario: string
  ): Promise<WithdrawalMethodsDTO> {
    try {
      const url = `WithdrawalMethods/${id}`;
      return await this.apiConnectionService.sendRequestAsync<WithdrawalMethodsDTO>(
        url,
        "GET",
        null,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getWithdrawalMethodById:", error);
      throw error;
    }
  }

  /**
   * Crea un nuevo método de retiro
   */
  async guardarWithdrawalMethods(
    datos: WithdrawalMethodsDTO | Record<string, unknown>,
    token: string,
    usuario: string
  ): Promise<WithdrawalMethodOperationResponse> {
    try {
      const url = `WithdrawalMethods`;
      return await this.apiConnectionService.sendRequestAsync<WithdrawalMethodOperationResponse>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en guardarWithdrawalMethods:", error);
      throw error;
    }
  }

  /**
   * Actualiza un método de retiro existente
   */
  async editarWithdrawalMethods(
    datos: WithdrawalMethodsDTO | Record<string, unknown>,
    token: string,
    usuario: string
  ): Promise<WithdrawalMethodOperationResponse> {
    try {
      const datosObj = datos as Record<string, unknown>;
      const url = `WithdrawalMethods/${datosObj['id']}`;
      return await this.apiConnectionService.sendRequestAsync<WithdrawalMethodOperationResponse>(
        url,
        "PUT",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en editarWithdrawalMethods:", error);
      throw error;
    }
  }

  /**
   * Elimina un método de retiro
   */
  async eliminarWithdrawalMethods(
    id: number,
    token: string,
    usuario: string
  ): Promise<WithdrawalMethodOperationResponse> {
    try {
      const url = `WithdrawalMethods/${id}`;
      return await this.apiConnectionService.sendRequestAsync<WithdrawalMethodOperationResponse>(
        url,
        "DELETE",
        null,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en eliminarWithdrawalMethods:", error);
      throw error;
    }
  }
}

