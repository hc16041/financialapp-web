import { Injectable, inject, signal } from "@angular/core";
import { DashboardService } from "src/app/application/Dashboard/Services/Dashboard.service";
import { SavingTransactionType } from "src/app/application/savings/DTO/SavingTransactionDTO";
import { TransactionsDTO } from "src/app/application/transactions/DTO/TransactionsDTO";
import { MerchantExpensesReportDto } from "src/app/application/Reports/DTO/reports.dto";
import {
  CategoryExpensePoint,
  DashboardSummary,
  InvestmentEvolutionPoint,
  MonthlyTransactionPoint,
  RecentTransaction,
  SpendingByCard,
} from "./dashboard.model";

/**
 * Tipos de transacción de tarjeta que representan un gasto.
 * Purchase = 1, Fee = 3, Interest = 4.
 */
const EXPENSE_TYPES: ReadonlySet<number> = new Set<number>([1, 3, 4]);

/**
 * Los pagos a tarjeta (Payment = 2) se contabilizan como "ingreso" del mes en
 * el gráfico de transacciones (fórmula provisional, ver SPEC-01 §3.3).
 */
const PAYMENT_TYPE = 2;

/** Etiquetas legibles de los tipos de transacción (enum numérico del backend). */
const TRANSACTION_TYPE_LABELS: Record<number, string> = {
  1: "Purchase",
  2: "Payment",
  3: "Fee",
  4: "Interest",
  5: "Adjustment",
};

/** Número de meses de la ventana del gráfico "Transacciones por Mes". */
const MONTHLY_WINDOW = 12;

/** Cantidad máxima de transacciones recientes a mostrar. */
const RECENT_TRANSACTIONS_LIMIT = 10;

/**
 * Facade del dashboard financiero (SPEC-01).
 *
 * Patrón `savings.facade.ts`: expone Signals read-only y un `initialize()`
 * que orquesta las llamadas en paralelo tolerando fallos individuales.
 *
 * Opción B: NO existe endpoint de resumen; los KPIs y gráficos se componen
 * aquí a partir de los endpoints existentes (fórmulas provisionales):
 *   - Total ahorrado    = savings/balance.balance
 *   - Total invertido   = reports/investments/monthly → totalIngresos − totalRetiros
 *   - Gastos del mes    = Σ amount de tipos Purchase/Fee/Interest (transactions/by-date)
 *   - Ingresos del mes  = depósitos (savings/history) + retiros de inversión del mes
 *   - Saldo total       = ahorros − Σ currentBalance de tarjetas
 *   - Balance neto      = ingresos − gastos
 */
@Injectable({
  providedIn: "root",
})
export class DashboardFacade {
  private readonly service = inject(DashboardService);

  private readonly _summary = signal<DashboardSummary | null>(null);
  private readonly _monthlyTransactions = signal<MonthlyTransactionPoint[]>([]);
  private readonly _categoryExpenses = signal<CategoryExpensePoint[]>([]);
  private readonly _investmentEvolution = signal<InvestmentEvolutionPoint[]>([]);
  private readonly _recentTransactions = signal<RecentTransaction[]>([]);
  private readonly _spendingByCard = signal<SpendingByCard[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly summary = this._summary.asReadonly();
  readonly monthlyTransactions = this._monthlyTransactions.asReadonly();
  readonly categoryExpenses = this._categoryExpenses.asReadonly();
  readonly investmentEvolution = this._investmentEvolution.asReadonly();
  readonly recentTransactions = this._recentTransactions.asReadonly();
  readonly spendingByCard = this._spendingByCard.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  /**
   * Carga todos los datos del dashboard en paralelo.
   * Cada endpoint se aísla con `safe()` para que un fallo individual no rompa
   * el resto del panel.
   */
  async initialize(): Promise<void> {
    this._loading.set(true);
    this._error.set(null);

    try {
      const now = new Date();
      const year = now.getFullYear();
      const currentMonth = now.getMonth() + 1;

      const monthStart = this.toIsoDate(new Date(year, now.getMonth(), 1));
      const monthEnd = this.toIsoDate(new Date(year, now.getMonth() + 1, 0));
      const seriesStart = this.toIsoDate(
        new Date(year, now.getMonth() - (MONTHLY_WINDOW - 1), 1)
      );

      const [balance, history, investments, consumption, merchants, txMonth, txSeries] =
        await Promise.all([
          this.safe(() => this.service.getSavingsBalance()),
          this.safe(() => this.service.getSavingsHistory(monthStart, monthEnd)),
          this.safe(() => this.service.getInvestmentsMonthly(year)),
          this.safe(() => this.service.getCardConsumption()),
          this.safe(() => this.service.getMerchantsExpenses(monthStart, monthEnd)),
          this.safe(() => this.service.getTransactionsByDate(monthStart, monthEnd)),
          this.safe(() => this.service.getTransactionsByDate(seriesStart, monthEnd)),
        ]);

      // --- KPIs (composición) ---
      const totalSavings = balance?.balance ?? 0;

      const totalInvested = investments
        ? investments.totalIngresos - investments.totalRetiros
        : 0;

      const monthExpenses = (txMonth ?? [])
        .filter((t) => EXPENSE_TYPES.has(t.type))
        .reduce((sum, t) => sum + (t.amount ?? 0), 0);

      const monthDeposits = (history ?? [])
        .filter((t) => t.transactionType === SavingTransactionType.Deposit)
        .reduce((sum, t) => sum + (t.amount ?? 0), 0);

      // Retiros de inversión del mes en curso (dinero que retorna al usuario).
      const monthInvestmentWithdrawals =
        investments?.monthlySummaries?.find((m) => m.month === currentMonth)
          ?.totalRetiros ?? 0;

      const monthIncome = monthDeposits + monthInvestmentWithdrawals;

      const totalCardDebt = (consumption ?? []).reduce(
        (sum, c) => sum + (c.currentBalance ?? 0),
        0
      );
      const totalBalance = totalSavings - totalCardDebt;

      const netBalance = monthIncome - monthExpenses;

      this._summary.set({
        totalBalance: this.round2(totalBalance),
        monthIncome: this.round2(monthIncome),
        monthExpenses: this.round2(monthExpenses),
        totalInvested: this.round2(totalInvested),
        totalSavings: this.round2(totalSavings),
        netBalance: this.round2(netBalance),
      });

      // --- Gráficos y widgets ---
      this._monthlyTransactions.set(this.buildMonthlyTransactions(txSeries ?? [], now));
      this._categoryExpenses.set(this.buildCategoryExpenses(merchants));
      this._investmentEvolution.set(
        (investments?.monthlySummaries ?? []).map((m) => ({
          month: m.monthName,
          invested: this.round2(m.netBalance),
        }))
      );
      this._recentTransactions.set(this.buildRecentTransactions(txMonth ?? []));
      this._spendingByCard.set(
        (consumption ?? []).map((c) => ({
          creditCardId: c.creditCardId,
          bankName: c.bankName,
          totalExpenses: c.totalExpenses ?? 0,
          currentBalance: c.currentBalance ?? 0,
          utilizationPercentage: c.utilizationPercentage ?? 0,
        }))
      );
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Error al cargar el dashboard";
      this._error.set(message);
    } finally {
      this._loading.set(false);
    }
  }

  /**
   * Ejecuta una promesa aislando su fallo: devuelve `null` en lugar de lanzar,
   * de modo que un endpoint caído no rompa el resto del panel.
   */
  private async safe<T>(task: () => Promise<T>): Promise<T | null> {
    try {
      return await task();
    } catch (error: unknown) {
      console.warn("[DashboardFacade] endpoint falló de forma aislada:", error);
      return null;
    }
  }

  /**
   * Agrupa las transacciones de los últimos 12 meses por mes.
   * Ingresos = pagos (Payment), Gastos = Purchase/Fee/Interest.
   */
  private buildMonthlyTransactions(
    transactions: TransactionsDTO[],
    now: Date
  ): MonthlyTransactionPoint[] {
    const months: { key: string; label: string }[] = [];
    for (let i = MONTHLY_WINDOW - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        key: `${d.getFullYear()}-${d.getMonth() + 1}`,
        label: this.monthLabel(d),
      });
    }

    const buckets = new Map<string, { income: number; expenses: number }>();
    months.forEach((m) => buckets.set(m.key, { income: 0, expenses: 0 }));

    for (const transaction of transactions) {
      const date = new Date(transaction.transactionDate ?? transaction.date);
      const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      const bucket = buckets.get(key);
      if (!bucket) {
        continue;
      }
      if (EXPENSE_TYPES.has(transaction.type)) {
        bucket.expenses += transaction.amount ?? 0;
      } else if (transaction.type === PAYMENT_TYPE) {
        bucket.income += transaction.amount ?? 0;
      }
    }

    return months.map((m) => ({
      month: m.label,
      income: this.round2(buckets.get(m.key)?.income ?? 0),
      expenses: this.round2(buckets.get(m.key)?.expenses ?? 0),
    }));
  }

  private buildCategoryExpenses(
    report: MerchantExpensesReportDto | null
  ): CategoryExpensePoint[] {
    return (report?.merchants ?? []).map((m) => ({
      label: m.category || m.merchantName,
      value: this.round2(m.totalAmount),
    }));
  }

  private buildRecentTransactions(transactions: TransactionsDTO[]): RecentTransaction[] {
    return transactions
      .map((t) => ({
        id: t.id,
        description: t.description || "",
        date: this.toDateString(t.transactionDate ?? t.date),
        amount: t.amount ?? 0,
        type: TRANSACTION_TYPE_LABELS[t.type] ?? "Unknown",
        cardName: t.creditCard?.bankName,
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, RECENT_TRANSACTIONS_LIMIT);
  }

  /** Formatea una fecha como YYYY-MM-DD (formato esperado por el backend). */
  private toIsoDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  /** Convierte una fecha (Date o string ISO) a string ISO estable. */
  private toDateString(value: Date | string | null | undefined): string {
    if (!value) {
      return "";
    }
    const date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime())) {
      return String(value);
    }
    return date.toISOString();
  }

  /** Etiqueta corta de mes localizada (p. ej. "ene"). */
  private monthLabel(date: Date): string {
    return date.toLocaleDateString("es-SV", { month: "short" });
  }

  /** Redondea a 2 decimales para evitar ruido de punto flotante. */
  private round2(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}
