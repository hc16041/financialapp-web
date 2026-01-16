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
    usuario: string,
    startDate?: string,
    endDate?: string
  ): Promise<TransactionsDTO[]> {
    // Si las fechas están vacías, establecer fechas por defecto
    let finalStartDate = startDate;
    let finalEndDate = endDate;

    if (!finalStartDate || !finalEndDate) {
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      // Formatear fechas al formato YYYY-MM-DD
      const formatDateForInput = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      finalStartDate = formatDateForInput(firstDayOfMonth);
      finalEndDate = formatDateForInput(lastDayOfMonth);
    }

    try {
      let url = `transactions/transactions`;

      // Siempre usar el endpoint con filtro de fechas ya que ahora siempre tenemos fechas
      const formattedStart = this.formatDateForBackend(finalStartDate!);
      const formattedEnd = this.formatDateForBackend(finalEndDate!);
      url = `transactions/transactions/by-date?startDate=${formattedStart}&endDate=${formattedEnd}`;

      const result = await this.apiConnectionService.sendRequestAsync<
        TransactionsDTO[]
      >(url, "GET", null, { Authorization: token });

      return result;
    } catch (error) {
      console.error("Error en getListadoTransactions:", error);
      throw error;
    }
  }

  /**
   * Obtiene transacciones en efectivo por rango de fechas.
   */
  async getCashTransactionsByDateRange(
    startDate: string,
    endDate: string,
    token: string
  ): Promise<TransactionsDTO[]> {
    const url = `transactions/cash/by-date?startDate=${startDate}&endDate=${endDate}`;
    return this.apiConnectionService.sendRequestAsync<TransactionsDTO[]>(
      url,
      "GET",
      null,
      { Authorization: token }
    );
  }

  /**
   * Formatea una fecha del formato YYYY-MM-DD al formato MM-DD-YYYY requerido por el backend
   */
  private formatDateForBackend(dateString: string): string {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
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
