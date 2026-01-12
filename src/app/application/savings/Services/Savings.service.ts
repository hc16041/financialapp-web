import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { SavingTransactionDTO } from "../DTO/SavingTransactionDTO";
import {
  ISavings,
  RegisterSavingTransactionRequest,
} from "../Interfaces/ISavings.interface";

@Injectable({
  providedIn: "root",
})
export class SavingsService implements ISavings {
  constructor(private apiConnectionService: ApiConnectionService) {}

  /**
   * Registra una nueva transacción de ahorros (depósito o retiro)
   */
  async registerTransaction(
    datos: RegisterSavingTransactionRequest,
    token: string,
    usuario: string
  ): Promise<number> {
    try {
      const url = `savings/transactions`;
      const result = await this.apiConnectionService.sendRequestAsync<{
        id: number;
      }>(url, "POST", datos, { Authorization: token });
      return result.id;
    } catch (error) {
      console.error("Error en registerTransaction:", error);
      throw error;
    }
  }

  /**
   * Obtiene el saldo actual de ahorros
   */
  async getBalance(token: string, usuario: string): Promise<number> {
    try {
      const url = `savings/balance`;
      const result = await this.apiConnectionService.sendRequestAsync<{
        balance: number;
      }>(url, "GET", null, { Authorization: token });
      return result.balance;
    } catch (error) {
      console.error("Error en getBalance:", error);
      throw error;
    }
  }

  /**
   * Obtiene el historial de transacciones de ahorros
   */
  async getHistory(
    token: string,
    usuario: string,
    startDate?: string,
    endDate?: string
  ): Promise<SavingTransactionDTO[]> {
    try {
      let url = `savings/history`;
      const parameters: Record<string, string> = {};

      if (startDate) {
        parameters["startDate"] = this.formatDateForBackend(startDate);
      }
      if (endDate) {
        parameters["endDate"] = this.formatDateForBackend(endDate);
      }

      const result = await this.apiConnectionService.sendRequestAsync<
        SavingTransactionDTO[]
      >(url, "GET", null, { Authorization: token }, parameters);

      return result;
    } catch (error) {
      console.error("Error en getHistory:", error);
      throw error;
    }
  }

  /**
   * Formatea una fecha del formato YYYY-MM-DD al formato requerido por el backend
   */
  private formatDateForBackend(dateString: string): string {
    // El backend espera formato ISO o el formato que uses
    return dateString;
  }
}
