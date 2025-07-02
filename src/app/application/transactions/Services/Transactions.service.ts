import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { TransactionsDTO } from "../DTO/TransactionsDTO";
import { ITransactions } from "../Interfaces/ITransactions.interface";

@Injectable({
  providedIn: "root",
})
export class TransactionsService implements ITransactions {
  constructor(private apiConnectionService: ApiConnectionService) {}

  /**
   * Devuelve el listado de transacciones.
   *
   * @returns La respuesta del servidor en formato JSON.
   */
  async getListadoTransactions(
    token: string,
    usuario: string
  ): Promise<TransactionsDTO[]> {
    try {
      // Formatea las fechas correctamente (YYYY-MM-DD)
      const formattedStart = "05-01-2025"; // "2025-05-01"
      const formattedEnd = "07-31-2025"; // "2025-07-31"

      const url = `transactions/transactions/by-date?startDate=${formattedStart}&endDate=${formattedEnd}`;
      return await this.apiConnectionService.sendRequestAsync<
        TransactionsDTO[]
      >(url, "GET", null, { Authorization: token });
    } catch (error) {
      console.error("Error en getListadoTransactions:", error);
      throw error;
    }
  }

  async guardarTransactions(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `transactions`;
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en guardarTransactions:", error);
      throw error;
    }
  }

  async editarTransactions(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `Transactions`;
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "PUT",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en editarTransactions:", error);
      throw error;
    }
  }

  async eliminarTransactions(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `Transactions`;
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "DELETE",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en eliminarTransactions:", error);
      throw error;
    }
  }

  async getListadoTransactionsXML(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `Transactions/ExportarXML`;
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
      console.error("Error en getListadoTransactionsXML:", error);
      throw error;
    }
  }

  async getListadoTransactionsExcel(
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `Transactions/ExportarExcel`;
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
      console.error("Error en getListadoTransactionsExcel:", error);
      throw error;
    }
  }

  /**
   * Obtiene una transacción específica por ID
   */
  async getTransactionsById(
    id: number,
    token: string,
    usuario: string
  ): Promise<TransactionsDTO> {
    try {
      const url = `Transactions/${id}`;
      return await this.apiConnectionService.sendRequestAsync<TransactionsDTO>(
        url,
        "GET",
        null,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getTransactionsById:", error);
      throw error;
    }
  }

  /**
   * Obtiene transacciones por tarjeta de crédito
   */
  async getTransactionsByCreditCard(
    creditCardId: number,
    token: string,
    usuario: string
  ): Promise<TransactionsDTO[]> {
    try {
      const url = `Transactions/ByCreditCard/${creditCardId}`;
      return await this.apiConnectionService.sendRequestAsync<
        TransactionsDTO[]
      >(url, "GET", null, { Authorization: token });
    } catch (error) {
      console.error("Error en getTransactionsByCreditCard:", error);
      throw error;
    }
  }

  /**
   * Obtiene transacciones por tipo
   */
  async getTransactionsByType(
    type: number,
    token: string,
    usuario: string
  ): Promise<TransactionsDTO[]> {
    try {
      const url = `Transactions/ByType/${type}`;
      return await this.apiConnectionService.sendRequestAsync<
        TransactionsDTO[]
      >(url, "GET", null, { Authorization: token });
    } catch (error) {
      console.error("Error en getTransactionsByType:", error);
      throw error;
    }
  }

  /**
   * Obtiene transacciones por rango de fechas
   */
  async getTransactionsByDateRange(
    fechaInicio: string,
    fechaFin: string,
    token: string,
    usuario: string
  ): Promise<TransactionsDTO[]> {
    try {
      const url = `Transactions/ByDateRange`;
      const datos = {
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<
        TransactionsDTO[]
      >(url, "POST", datos, { Authorization: token });
    } catch (error) {
      console.error("Error en getTransactionsByDateRange:", error);
      throw error;
    }
  }

  /**
   * Obtiene transacciones pendientes (no procesadas)
   */
  async getTransactionsPendientes(
    token: string,
    usuario: string
  ): Promise<TransactionsDTO[]> {
    try {
      const url = `Transactions/Pendientes`;
      return await this.apiConnectionService.sendRequestAsync<
        TransactionsDTO[]
      >(url, "GET", null, { Authorization: token });
    } catch (error) {
      console.error("Error en getTransactionsPendientes:", error);
      throw error;
    }
  }

  /**
   * Procesa una transacción (marca como procesada)
   */
  async procesarTransaction(
    id: number,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `Transactions/Procesar/${id}`;
      const datos = {
        id: id,
        codusuario: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "PUT",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en procesarTransaction:", error);
      throw error;
    }
  }

  /**
   * Obtiene tipos de transacciones disponibles
   */
  async getTransactionTypes(token: string, usuario: string): Promise<any[]> {
    try {
      const url = `Transactions/Types`;
      return await this.apiConnectionService.sendRequestAsync<any[]>(
        url,
        "GET",
        null,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getTransactionTypes:", error);
      throw error;
    }
  }

  /**
   * Obtiene resumen de transacciones por tarjeta
   */
  async getTransactionsSummary(
    creditCardId: number,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `Transactions/Summary/${creditCardId}`;
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "GET",
        null,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getTransactionsSummary:", error);
      throw error;
    }
  }
}
