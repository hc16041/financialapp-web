import { ApexOptions } from "ng-apexcharts";

/**
 * Modelos de datos del dashboard financiero (SPEC-01).
 * Sustituyen al antiguo `ChartType` (campos `any`): toda configuración de
 * gráfico se tipa con `ApexOptions`.
 */

/** Resumen de los 6 KPIs del dashboard (composición frontend, Opción B). */
export interface DashboardSummary {
  /** Saldo global = ahorros − Σ saldo actual de tarjetas (provisional). */
  totalBalance: number;
  /** Ingresos del mes = depósitos de ahorro + retiros de inversión (provisional). */
  monthIncome: number;
  /** Gastos del mes = Σ montos Purchase/Fee/Interest del mes en curso. */
  monthExpenses: number;
  /** Total invertido = totalIngresos − totalRetiros del reporte anual. */
  totalInvested: number;
  /** Total ahorrado = saldo del endpoint savings/balance. */
  totalSavings: number;
  /** Balance neto = ingresos − gastos. */
  netBalance: number;
}

/** Definición de una tarjeta KPI para renderizar la fila de indicadores. */
export interface DashboardKpi {
  id: "balance" | "income" | "expenses" | "invested" | "savings" | "net";
  /** Clave i18n: 'DASHBOARD.KPI.BALANCE', ... */
  labelKey: string;
  value: number | null;
  /** Clase(s) del icono MDI: 'mdi mdi-wallet-outline', ... */
  icon: string;
  variant: "success" | "danger" | "primary" | "info" | "warning";
}

/** Punto mensual del gráfico "Transacciones por Mes". */
export interface MonthlyTransactionPoint {
  month: string;
  income: number;
  expenses: number;
}

/** Porción del gráfico donut "Gastos por Categoría". */
export interface CategoryExpensePoint {
  label: string;
  value: number;
}

/** Punto mensual del gráfico "Evolución de Inversiones". */
export interface InvestmentEvolutionPoint {
  month: string;
  invested: number;
}

/** Transacción reciente para el widget "Últimas Transacciones". */
export interface RecentTransaction {
  id: number;
  description: string;
  /** Fecha en ISO (para formatear con pipe `date`). */
  date: string;
  amount: number;
  /** Purchase | Payment | Fee | Interest | Adjustment */
  type: string;
  /** Nombre del banco de la tarjeta, si aplica. */
  cardName?: string;
}

/** Resumen de consumo por tarjeta para el widget "Gastos por Tarjeta". */
export interface SpendingByCard {
  creditCardId: number;
  bankName: string;
  totalExpenses: number;
  currentBalance: number;
  utilizationPercentage: number;
}

/** Alias de la configuración completa de ApexCharts. */
export type DashboardChartOptions = ApexOptions;
