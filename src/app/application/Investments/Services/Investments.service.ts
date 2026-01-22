import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { InvestmentsDTO } from "../DTO/InvestmentsDTO";
import { IInvestments } from "../Interfaces/IInvestments.interface";
import { InvestmentOperationResponse } from "../DTO/InvestmentOperation.dto";

@Injectable({
  providedIn: "root",
})
export class InvestmentsService implements IInvestments {
  constructor(private apiConnectionService: ApiConnectionService) {}

  /**
   * Obtiene todas las inversiones del usuario autenticado
   */
  async getInvestments(
    token: string,
    usuario: string
  ): Promise<InvestmentsDTO[]> {
    try {
      const url = `Investments`;
      return await this.apiConnectionService.sendRequestAsync<InvestmentsDTO[]>(
        url,
        "GET",
        null,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getInvestments:", error);
      throw error;
    }
  }

  /**
   * Obtiene inversiones por rango de fechas
   */
  async getInvestmentsByDateRange(
    token: string,
    usuario: string,
    startDate: string,
    endDate: string
  ): Promise<InvestmentsDTO[]> {
    try {
      // Formatear fechas para el backend (formato YYYY-MM-DD)
      const formatDateForBackend = (dateString: string): string => {
        // Si la fecha viene en formato DD/MM/YYYY, convertirla a YYYY-MM-DD
        if (dateString.includes("/")) {
          const [day, month, year] = dateString.split("/");
          return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        }
        // Si ya viene en formato YYYY-MM-DD, retornarla tal cual
        return dateString;
      };

      const formattedStart = formatDateForBackend(startDate);
      const formattedEnd = formatDateForBackend(endDate);
      const url = `Investments/by-date?startDate=${formattedStart}&endDate=${formattedEnd}`;

      return await this.apiConnectionService.sendRequestAsync<InvestmentsDTO[]>(
        url,
        "GET",
        null,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getInvestmentsByDateRange:", error);
      throw error;
    }
  }

  /**
   * Obtiene una inversión por ID
   */
  async getInvestmentById(
    id: number,
    token: string,
    usuario: string
  ): Promise<InvestmentsDTO> {
    try {
      const url = `Investments/${id}`;
      return await this.apiConnectionService.sendRequestAsync<InvestmentsDTO>(
        url,
        "GET",
        null,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getInvestmentById:", error);
      throw error;
    }
  }

  /**
   * Crea una nueva inversión
   */
  async guardarInvestments(
    datos: InvestmentsDTO | Record<string, unknown>,
    token: string,
    usuario: string
  ): Promise<InvestmentOperationResponse> {
    try {
      const url = `Investments`;
      const resultado = await this.apiConnectionService.sendRequestAsync<InvestmentOperationResponse>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );

      return resultado;
    } catch (error: unknown) {
      console.error("=== ERROR en guardarInvestments ===");
      console.error("Error completo:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Stack trace:", error.stack);
      }
      throw error;
    }
  }

  /**
   * Actualiza una inversión existente
   */
  async editarInvestments(
    datos: InvestmentsDTO | Record<string, unknown>,
    token: string,
    usuario: string
  ): Promise<InvestmentOperationResponse> {
    try {
      const datosObj = datos as Record<string, unknown>;
      const url = `Investments/${datosObj['id']}`;
      return await this.apiConnectionService.sendRequestAsync<InvestmentOperationResponse>(
        url,
        "PUT",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en editarInvestments:", error);
      throw error;
    }
  }

  /**
   * Elimina una inversión
   */
  async eliminarInvestments(
    id: number,
    token: string,
    usuario: string
  ): Promise<InvestmentOperationResponse> {
    try {
      const url = `Investments/${id}`;
      return await this.apiConnectionService.sendRequestAsync<InvestmentOperationResponse>(
        url,
        "DELETE",
        null,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en eliminarInvestments:", error);
      throw error;
    }
  }
}
