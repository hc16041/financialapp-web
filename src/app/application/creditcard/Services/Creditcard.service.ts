import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { CreditcardDTO } from "../DTO/CreditcardDTO";

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
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoCreditcard:", error);
      throw error;
    }
  }

  async guardarCreditcard(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `CreditCards`;
      //datos.cod_usuario = usuario;
      return await this.apiConnectionService.sendRequestAsync<any>(
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
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `CreditCard/Actualizar`;
      datos.cod_usuario = usuario;
      return await this.apiConnectionService.sendRequestAsync<any>(
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
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `CreditCard/Eliminar`;
      datos.cod_usuario = usuario;
      return await this.apiConnectionService.sendRequestAsync<any>(
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
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `CreditCard/Desactivar`;
      const dato = { id: datos, codusuario: usuario };
      return await this.apiConnectionService.sendRequestAsync<any>(
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
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `CreditCard/Activar`;
      const dato = { id: datos, codusuario: usuario };
      return await this.apiConnectionService.sendRequestAsync<any>(
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

  async getListadoCreditcardXML(token: string, usuario: string): Promise<any> {
    try {
      const url = `CreditCard/ExportarXML`;
      const datos = {
        fecha_inicio: new Date().toISOString().split("T")[0],
        fecha_fin: new Date().toISOString().split("T")[0],
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestXMLAsync<any>(
        url,
        "POST",
        datos
      );
    } catch (error) {
      console.error("Error en getListadoCreditcardXML:", error);
      throw error;
    }
  }

  async getListadoCreditcardExcel(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `CreditCard/ExportarExcel`;
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
      console.error("Error en getListadoCreditcardExcel:", error);
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
  async getCreditCardCodes(token: string): Promise<any[]> {
    try {
      const url = "CreditCards/list-codes";
      return await this.apiConnectionService.sendRequestAsync<any[]>(
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
