import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";

@Injectable({
  providedIn: "root",
})
export class ReportsService {
  constructor(private apiConnectionService: ApiConnectionService) {}

  /**
   * Obtiene reporte de gastos por tarjeta
   * GET /api/reports/cards/{cardId}/expenses
   * @param cardId ID de la tarjeta de crédito
   * @param token Token de autenticación
   * @param usuario Usuario autenticado
   * @param startDate Fecha de inicio (requerido, formato YYYY-MM-DD)
   * @param endDate Fecha de fin (requerido, formato YYYY-MM-DD)
   * @returns Reporte de gastos de la tarjeta con detalle de transacciones
   */
  async getCardExpenses(
    cardId: number | string,
    token: string,
    usuario: string,
    startDate: string,
    endDate: string
  ): Promise<any> {
    try {
      // Limpiar y validar fechas (remover comillas y espacios)
      const cleanDate = (date?: string): string | undefined => {
        if (!date) return undefined;
        const cleaned = date.trim().replace(/^['"]+|['"]+$/g, "");
        if (cleaned && !/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) {
          console.warn(
            `⚠️ Formato de fecha inválido: ${date}. Se espera YYYY-MM-DD`
          );
        }
        return cleaned || undefined;
      };

      const cleanStartDate = cleanDate(startDate);
      const cleanEndDate = cleanDate(endDate);

      // Validar que las fechas sean requeridas según la documentación
      if (!cleanStartDate || !cleanEndDate) {
        throw new Error(
          "startDate y endDate son requeridos para obtener gastos por tarjeta"
        );
      }

      console.log("=== ReportsService.getCardExpenses ===");
      console.log("cardId:", cardId);
      console.log("startDate:", cleanStartDate);
      console.log("endDate:", cleanEndDate);

      // Construir la URL base - usar /expenses según la documentación
      const url = `reports/cards/${cardId}/expenses`;

      // Agregar parámetros de fecha (requeridos)
      const params: Record<string, string> = {
        startDate: cleanStartDate,
        endDate: cleanEndDate,
      };

      const response = await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "GET",
        null,
        { Authorization: token },
        params
      );

      console.log("=== Respuesta de getCardExpenses ===");
      console.log("Response:", response);

      return response;
    } catch (error: any) {
      console.error("=== ERROR en getCardExpenses ===");
      console.error("cardId:", cardId);
      console.error("Error completo:", error);

      if (error?.status === 404) {
        console.error(
          "⚠️ Error 404: El endpoint no existe o el cardId no es válido"
        );
      }
      if (error?.status === 400) {
        console.error(
          "⚠️ Error 400: Faltan parámetros requeridos o el formato es incorrecto"
        );
      }

      throw error;
    }
  }

  /**
   * Obtiene reporte de pagos por tarjeta
   * GET /api/reports/cards/{cardId}/payments
   * @param cardId ID de la tarjeta de crédito
   * @param token Token de autenticación
   * @param usuario Usuario autenticado
   * @param startDate Fecha de inicio (requerido, formato YYYY-MM-DD)
   * @param endDate Fecha de fin (requerido, formato YYYY-MM-DD)
   * @returns Reporte de pagos de la tarjeta con detalle de transacciones
   */
  async getCardPayments(
    cardId: number | string,
    token: string,
    usuario: string,
    startDate: string,
    endDate: string
  ): Promise<any> {
    try {
      // Limpiar y validar fechas
      const cleanDate = (date?: string): string | undefined => {
        if (!date) return undefined;
        const cleaned = date.trim().replace(/^['"]+|['"]+$/g, "");
        if (cleaned && !/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) {
          console.warn(
            `⚠️ Formato de fecha inválido: ${date}. Se espera YYYY-MM-DD`
          );
        }
        return cleaned || undefined;
      };

      const cleanStartDate = cleanDate(startDate);
      const cleanEndDate = cleanDate(endDate);

      // Validar que las fechas sean requeridas según la documentación
      if (!cleanStartDate || !cleanEndDate) {
        throw new Error(
          "startDate y endDate son requeridos para obtener pagos por tarjeta"
        );
      }

      console.log("=== ReportsService.getCardPayments ===");
      console.log("cardId:", cardId);
      console.log("startDate:", cleanStartDate);
      console.log("endDate:", cleanEndDate);

      // Construir la URL base - usar /payments según la documentación
      const url = `reports/cards/${cardId}/payments`;

      // Agregar parámetros de fecha (requeridos)
      const params: Record<string, string> = {
        startDate: cleanStartDate,
        endDate: cleanEndDate,
      };

      const response = await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "GET",
        null,
        { Authorization: token },
        params
      );

      console.log("=== Respuesta de getCardPayments ===");
      console.log("Response:", response);

      return response;
    } catch (error: any) {
      console.error("=== ERROR en getCardPayments ===");
      console.error("cardId:", cardId);
      console.error("Error completo:", error);

      if (error?.status === 404) {
        console.error(
          "⚠️ Error 404: El endpoint no existe o el cardId no es válido"
        );
      }
      if (error?.status === 400) {
        console.error(
          "⚠️ Error 400: Faltan parámetros requeridos o el formato es incorrecto"
        );
      }

      throw error;
    }
  }

  /**
   * Obtiene reporte de gastos por comercios
   * @param token Token de autenticación
   * @param usuario Usuario autenticado
   * @param startDate Fecha de inicio (formato YYYY-MM-DD)
   * @param endDate Fecha de fin (formato YYYY-MM-DD)
   * @returns Reporte de gastos por comercios con totales y lista de merchants
   */
  async getMerchantsExpenses(
    token: string,
    usuario: string,
    startDate: string,
    endDate: string
  ): Promise<any> {
    try {
      // Limpiar y validar fechas (remover comillas y espacios)
      const cleanDate = (date?: string): string | undefined => {
        if (!date) return undefined;
        // Remover comillas simples y dobles, y espacios al inicio/fin
        const cleaned = date.trim().replace(/^['"]+|['"]+$/g, "");
        // Validar formato YYYY-MM-DD
        if (cleaned && !/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) {
          console.warn(
            `⚠️ Formato de fecha inválido: ${date}. Se espera YYYY-MM-DD`
          );
        }
        return cleaned || undefined;
      };

      const cleanStartDate = cleanDate(startDate);
      const cleanEndDate = cleanDate(endDate);

      // Validar que las fechas sean requeridas
      if (!cleanStartDate || !cleanEndDate) {
        throw new Error(
          "startDate y endDate son requeridos para obtener gastos por comercios"
        );
      }

      console.log("=== ReportsService.getMerchantsExpenses ===");
      console.log("startDate original:", startDate);
      console.log("startDate limpio:", cleanStartDate);
      console.log("endDate original:", endDate);
      console.log("endDate limpio:", cleanEndDate);
      console.log("Token:", token ? "Presente" : "Ausente");
      console.log("Usuario:", usuario);

      // Construir la URL base
      const url = `reports/merchants/expenses`;

      // Agregar parámetros de fecha
      const params: Record<string, string> = {
        startDate: cleanStartDate,
        endDate: cleanEndDate,
      };

      console.log("URL base:", url);
      console.log("Parámetros:", params);

      const response = await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "GET",
        null,
        { Authorization: token },
        params
      );

      console.log("=== Respuesta de getMerchantsExpenses ===");
      console.log("Response:", response);
      console.log("Tipo de respuesta:", typeof response);

      if (response && typeof response === "object") {
        console.log("Propiedades:", Object.keys(response));
        console.log("totalExpenses:", response.totalExpenses);
        console.log("totalTransactions:", response.totalTransactions);
        console.log("merchants array length:", response.merchants?.length || 0);

        if (response.totalExpenses === 0 && response.totalTransactions === 0) {
          console.warn(
            "⚠️ No hay gastos ni transacciones en el período especificado"
          );
          console.warn("⚠️ Verifica que:");
          console.warn("   1. Las fechas sean correctas (no en el futuro)");
          console.warn("   2. Haya transacciones registradas en ese período");
          console.warn("   3. Las transacciones tengan merchantId asociado");
        }

        console.log("Contenido completo:", JSON.stringify(response, null, 2));
      }

      return response;
    } catch (error: any) {
      console.error("=== ERROR en getMerchantsExpenses ===");
      console.error("startDate:", startDate);
      console.error("endDate:", endDate);
      console.error("Error completo:", error);
      console.error("Error message:", error?.message);
      console.error("Error response:", error?.response);
      console.error("Error status:", error?.status);
      console.error("Error data:", error?.error || error?.data);

      if (error?.status === 400) {
        console.error(
          "⚠️ Error 400: Verifica el formato de las fechas (debe ser YYYY-MM-DD)"
        );
      }

      throw error;
    }
  }

  /**
   * Obtiene reporte de consumo de todas las tarjetas
   * GET /api/reports/cards/consumption
   * @param token Token de autenticación
   * @param usuario Usuario autenticado
   * @param startDate Fecha de inicio (opcional, formato YYYY-MM-DD)
   * @param endDate Fecha de fin (opcional, formato YYYY-MM-DD)
   * @returns Array con resumen de consumo de todas las tarjetas del usuario
   */
  async getCardsConsumption(
    token: string,
    usuario: string,
    startDate?: string,
    endDate?: string
  ): Promise<any> {
    try {
      const cleanDate = (date?: string): string | undefined => {
        if (!date) return undefined;
        const cleaned = date.trim().replace(/^['"]+|['"]+$/g, "");
        return cleaned || undefined;
      };

      const cleanStartDate = cleanDate(startDate);
      const cleanEndDate = cleanDate(endDate);

      const url = `reports/cards/consumption`;

      // Los parámetros son opcionales según la documentación
      const params: Record<string, string> = {};
      if (cleanStartDate) {
        params["startDate"] = cleanStartDate;
      }
      if (cleanEndDate) {
        params["endDate"] = cleanEndDate;
      }

      console.log("=== ReportsService.getCardsConsumption ===");
      console.log("startDate:", cleanStartDate || "No proporcionado");
      console.log("endDate:", cleanEndDate || "No proporcionado");

      const response = await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "GET",
        null,
        { Authorization: token },
        params
      );

      console.log("=== Respuesta de getCardsConsumption ===");
      console.log("Response:", response);
      console.log("Es array?", Array.isArray(response));
      if (Array.isArray(response)) {
        console.log("Número de tarjetas:", response.length);
      }

      return response;
    } catch (error: any) {
      console.error("Error en getCardsConsumption:", error);
      throw error;
    }
  }

  /**
   * Obtiene reporte mensual de inversiones por año
   * @param token Token de autenticación
   * @param usuario Usuario autenticado
   * @param year Año para el reporte (formato YYYY)
   * @returns Reporte mensual de inversiones
   */
  async getInvestmentsMonthly(
    token: string,
    usuario: string,
    year: number
  ): Promise<any> {
    try {
      console.log("=== ReportsService.getInvestmentsMonthly ===");
      console.log("year:", year);
      console.log("Token:", token ? "Presente" : "Ausente");
      console.log("Usuario:", usuario);

      const url = `reports/investments/monthly`;
      const params: Record<string, string> = {
        year: year.toString(),
      };

      console.log("URL:", url);
      console.log("Parámetros:", params);

      const response = await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "GET",
        null,
        { Authorization: token },
        params
      );

      console.log("=== Respuesta de getInvestmentsMonthly ===");
      console.log("Response:", response);
      if (response && typeof response === "object") {
        console.log("Propiedades:", Object.keys(response));
        console.log("Total ingresos:", response.totalIngresos);
        console.log("Total retiros:", response.totalRetiros);
        console.log("Balance neto:", response.netBalance);
        console.log(
          "Resúmenes mensuales:",
          response.monthlySummaries?.length || 0
        );
      }

      return response;
    } catch (error: any) {
      console.error("=== ERROR en getInvestmentsMonthly ===");
      console.error("year:", year);
      console.error("Error completo:", error);
      throw error;
    }
  }
}
