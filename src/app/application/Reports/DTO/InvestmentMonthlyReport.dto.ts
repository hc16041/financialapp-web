/**
 * DTO para el reporte mensual de inversiones
 */
export interface InvestmentMonthlyReportDTO {
  year: number;
  monthlySummaries: MonthlySummaryDTO[];
  totalIngresos: number;
  totalRetiros: number;
  netBalance: number;
}

export interface MonthlySummaryDTO {
  year: number;
  month: number;
  monthName: string;
  totalIngresos: number;
  totalRetiros: number;
  netBalance: number;
  ingresoCount: number;
  retiroCount: number;
  investments: InvestmentDetailDTO[];
}

export interface InvestmentDetailDTO {
  investmentId: number;
  transactionDate: string;
  platformName: string;
  amount: number;
  commission: number;
  total: number;
  transactionType: string;
  withdrawalMethodName: string;
}

