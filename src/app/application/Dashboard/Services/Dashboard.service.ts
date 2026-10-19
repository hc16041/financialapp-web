import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { LoginService } from "src/app/account/login/Services/LoginService";
import { SavingTransactionDTO } from "../../savings/DTO/SavingTransactionDTO";
import {
  CardConsumptionDto,
  MerchantExpensesReportDto,
} from "../../Reports/DTO/reports.dto";
import { InvestmentMonthlyReportDTO } from "../../Reports/DTO/InvestmentMonthlyReport.dto";
import { TransactionsDTO } from "../../transactions/DTO/TransactionsDTO";

/**
 * Servicio de datos del dashboard financiero (SPEC-01, Opción B).
 *
 * Reutiliza los endpoints agregados existentes (patrón ReportsService /
 * SavingsService con `ApiConnectionService`). El frontend compone los KPIs y
 * gráficos a partir de estas llamadas; no existe un endpoint de resumen único.
 */
@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor(
    private api: ApiConnectionService,
    private loginService: LoginService
  ) {}

  private get token(): string {
    return this.loginService.token || "";
  }

  /**
   * Saldo actual de ahorros.
   * GET savings/balance → `{ balance: number }`.
   */
  async getSavingsBalance(): Promise<{ balance: number }> {
    return this.api.sendRequestAsync<{ balance: number }>(
      "savings/balance",
      "GET",
      null,
      { Authorization: this.token }
    );
  }

  /**
   * Historial de transacciones de ahorros (depósitos/retiros).
   * GET savings/history?startDate=&endDate=
   */
  async getSavingsHistory(
    startDate?: string,
    endDate?: string
  ): Promise<SavingTransactionDTO[]> {
    const parameters: Record<string, string> = {};
    if (startDate) {
      parameters["startDate"] = startDate;
    }
    if (endDate) {
      parameters["endDate"] = endDate;
    }
    return this.api.sendRequestAsync<SavingTransactionDTO[]>(
      "savings/history",
      "GET",
      null,
      { Authorization: this.token },
      parameters
    );
  }

  /**
   * Consumo de todas las tarjetas de crédito.
   * GET reports/cards/consumption
   */
  async getCardConsumption(
    startDate?: string,
    endDate?: string
  ): Promise<CardConsumptionDto[]> {
    const parameters: Record<string, string> = {};
    if (startDate) {
      parameters["startDate"] = startDate;
    }
    if (endDate) {
      parameters["endDate"] = endDate;
    }
    return this.api.sendRequestAsync<CardConsumptionDto[]>(
      "reports/cards/consumption",
      "GET",
      null,
      { Authorization: this.token },
      parameters
    );
  }

  /**
   * Gastos por comercio/categoría.
   * GET reports/merchants/expenses?startDate=&endDate=
   */
  async getMerchantsExpenses(
    startDate: string,
    endDate: string
  ): Promise<MerchantExpensesReportDto> {
    return this.api.sendRequestAsync<MerchantExpensesReportDto>(
      "reports/merchants/expenses",
      "GET",
      null,
      { Authorization: this.token },
      { startDate, endDate }
    );
  }

  /**
   * Reporte mensual de inversiones por año.
   * GET reports/investments/monthly?year=
   */
  async getInvestmentsMonthly(year: number): Promise<InvestmentMonthlyReportDTO> {
    return this.api.sendRequestAsync<InvestmentMonthlyReportDTO>(
      "reports/investments/monthly",
      "GET",
      null,
      { Authorization: this.token },
      { year: year.toString() }
    );
  }

  /**
   * Transacciones de tarjeta por rango de fechas.
   * GET transactions/transactions/by-date?startDate=&endDate=
   */
  async getTransactionsByDate(
    startDate: string,
    endDate: string
  ): Promise<TransactionsDTO[]> {
    return this.api.sendRequestAsync<TransactionsDTO[]>(
      "transactions/transactions/by-date",
      "GET",
      null,
      { Authorization: this.token },
      { startDate, endDate }
    );
  }
}
