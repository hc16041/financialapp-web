import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { CreditcardDTO } from "../DTO/CreditcardDTO";
import { CreditCardCodeDTO } from "../DTO/CreditCardCode.dto";
import {
  CreditCardOperationResponse,
  CreditCardCreateRequest,
  CreditCardStatusRequest,
} from "../DTO/CreditCardOperation.dto";

@Injectable({
  providedIn: "root",
})
export class CreditcardService {
  constructor(private apiConnectionService: ApiConnectionService) {}

  /**
   * Devuelve el listado de tarjetas de crédito.
   *
   * @returns La respuesta del servidor en formato JSON.
   */
  async getListadoCreditcard(
    token: string,
    usuario: string
  ): Promise<CreditcardDTO[]> {
    try {
      const url = `CreditCards`;
      return await this.apiConnectionService.sendRequestAsync<CreditcardDTO[]>(
        url,
        "GET",
        null,
        { Authorization: token },
      );
    } catch (error) {
      console.error("Error en getListadoCreditcard:", error);
      throw error;
    }
  }

  async guardarCreditcard(
    datos: CreditCardCreateRequest | CreditcardDTO,
    token: string,
    usuario: string
  ): Promise<CreditCardOperationResponse> {
    try {
      const url = `CreditCards`;
      //datos.cod_usuario = usuario;
      return await this.apiConnectionService.sendRequestAsync<CreditCardOperationResponse>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en guardarCreditcard:", error);
      throw error;
    }
  }

  async editarCreditcard(
    datos: CreditcardDTO | Record<string, unknown>,
    token: string,
    usuario: string
  ): Promise<CreditCardOperationResponse> {
    try {
      const url = `CreditCard/Actualizar`;
      (datos as Record<string, unknown>)['cod_usuario'] = usuario;
      return await this.apiConnectionService.sendRequestAsync<CreditCardOperationResponse>(
        url,
        "PUT",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en editarCreditcard:", error);
      throw error;
    }
  }

  async eliminarCreditcard(
    datos: Record<string, unknown>,
    token: string,
    usuario: string
  ): Promise<CreditCardOperationResponse> {
    try {
      const url = `CreditCard/Eliminar`;
      datos['cod_usuario'] = usuario;
      return await this.apiConnectionService.sendRequestAsync<CreditCardOperationResponse>(
        url,
        "DELETE",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en eliminarCreditcard:", error);
      throw error;
    }
  }

  async desactivarCreditcard(
    datos: number,
    token: string,
    usuario: string
  ): Promise<CreditCardOperationResponse> {
    try {
      const url = `CreditCard/Desactivar`;
      const dato: CreditCardStatusRequest = { id: datos, codusuario: usuario };
      return await this.apiConnectionService.sendRequestAsync<CreditCardOperationResponse>(
        url,
        "PUT",
        dato,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en desactivarCreditcard:", error);
      throw error;
    }
  }

  async activarCreditcard(
    datos: number,
    token: string,
    usuario: string
  ): Promise<CreditCardOperationResponse> {
    try {
      const url = `CreditCard/Activar`;
      const dato: CreditCardStatusRequest = { id: datos, codusuario: usuario };
      return await this.apiConnectionService.sendRequestAsync<CreditCardOperationResponse>(
        url,
        "PUT",
        dato,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en activarCreditcard:", error);
      throw error;
    }
  }

  /**
   * Obtiene una tarjeta de crédito específica por ID
   */
  async getCreditcardById(
    id: number,
    token: string,
    usuario: string
  ): Promise<CreditcardDTO> {
    try {
      const url = `CreditCard`;
      const datos = {
        id: id,
      };
      return await this.apiConnectionService.sendRequestAsync<CreditcardDTO>(
        url,
        "GET",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getCreditcardById:", error);
      throw error;
    }
  }

  /**
   * Obtiene tarjetas de crédito por banco
   */
  async getCreditcardByBank(
    bankName: string,
    token: string,
    usuario: string
  ): Promise<CreditcardDTO[]> {
    try {
      const url = `CreditCard/ObtenerPorBanco`;
      const datos = {
        bankName: bankName,
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<CreditcardDTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getCreditcardByBank:", error);
      throw error;
    }
  }

  /**
   * Obtiene tarjetas de crédito activas
   */
  async getCreditcardActivas(
    token: string,
    usuario: string
  ): Promise<CreditcardDTO[]> {
    try {
      const url = `CreditCard/ListaActivas`;
      const datos = {
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<CreditcardDTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getCreditcardActivas:", error);
      throw error;
    }
  }

  /**
   * Obtiene la lista de códigos de tarjetas de crédito
   */
  async getCreditCardCodes(token: string): Promise<CreditCardCodeDTO[]> {
    try {
      const url = "CreditCards/list-codes";
      return await this.apiConnectionService.sendRequestAsync<CreditCardCodeDTO[]>(
        url,
        "GET",
        null,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getCreditCardCodes:", error);
      throw error;
    }
  }
}
