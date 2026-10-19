import {
  Component,
  OnInit,
  inject,
  ChangeDetectionStrategy,
  computed,
  signal,
} from "@angular/core";
import { LoginService } from "src/app/account/login/Services/LoginService";
import { formatMoney } from "src/app/core/utils/money.util";
import { DashboardFacade } from "./dashboard.facade";
import { DashboardChartOptions, DashboardKpi } from "./dashboard.model";

/**
 * Dashboard financiero (SPEC-01).
 *
 * Reemplaza el antiguo demo de ecommerce por un panel real: saludo localizado,
 * 6 KPIs, 3 gráficos ApexCharts y 2 widgets. El estado proviene del
 * `DashboardFacade` (Signals).
 */
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private readonly facade = inject(DashboardFacade);
  private readonly loginService = inject(LoginService);

  /** Nombre de usuario desde el LoginService (clave `username`). */
  readonly username = signal<string>(this.loginService.username ?? "");

  // Estado reactivo del facade (Signals read-only).
  readonly loading = this.facade.loading;
  readonly error = this.facade.error;
  readonly summary = this.facade.summary;
  readonly monthlyTransactions = this.facade.monthlyTransactions;
  readonly categoryExpenses = this.facade.categoryExpenses;
  readonly investmentEvolution = this.facade.investmentEvolution;
  readonly recentTransactions = this.facade.recentTransactions;
  readonly spendingByCard = this.facade.spendingByCard;

  /** Fila de 6 KPIs con icono MDI y variante semántica. */
  readonly kpis = computed<DashboardKpi[]>(() => {
    const summary = this.summary();
    const balance = summary?.totalBalance ?? null;
    const net = summary?.netBalance ?? null;
    return [
      {
        id: "balance",
        labelKey: "DASHBOARD.KPI.BALANCE",
        value: balance,
        icon: "mdi mdi-wallet-outline",
        variant: balance !== null && balance < 0 ? "danger" : "primary",
      },
      {
        id: "income",
        labelKey: "DASHBOARD.KPI.INCOME",
        value: summary?.monthIncome ?? null,
        icon: "mdi mdi-trending-up",
        variant: "success",
      },
      {
        id: "expenses",
        labelKey: "DASHBOARD.KPI.EXPENSES",
        value: summary?.monthExpenses ?? null,
        icon: "mdi mdi-trending-down",
        variant: "danger",
      },
      {
        id: "invested",
        labelKey: "DASHBOARD.KPI.INVESTED",
        value: summary?.totalInvested ?? null,
        icon: "mdi mdi-chart-line",
        variant: "info",
      },
      {
        id: "savings",
        labelKey: "DASHBOARD.KPI.SAVINGS",
        value: summary?.totalSavings ?? null,
        icon: "mdi mdi-piggy-bank-outline",
        variant: "primary",
      },
      {
        id: "net",
        labelKey: "DASHBOARD.KPI.NET",
        value: net,
        icon: "mdi mdi-scale-balance",
        variant: net !== null && net < 0 ? "danger" : "success",
      },
    ];
  });

  /** Indica si el gráfico mensual tiene algún dato distinto de cero. */
  readonly hasMonthlyData = computed(() =>
    this.monthlyTransactions().some((m) => m.income !== 0 || m.expenses !== 0)
  );

  // Configuraciones de los 3 gráficos (tipadas con `ApexOptions`).
  readonly monthlyTransactionsChart = computed<DashboardChartOptions>(() =>
    this.buildMonthlyTransactionsChart()
  );
  readonly categoryExpensesChart = computed<DashboardChartOptions>(() =>
    this.buildCategoryExpensesChart()
  );
  readonly investmentEvolutionChart = computed<DashboardChartOptions>(() =>
    this.buildInvestmentEvolutionChart()
  );

  ngOnInit(): void {
    void this.facade.initialize();
  }

  /**
   * Gráfico "Transacciones por Mes": barras ingresos vs gastos.
   * Colores semánticos vía tokens CSS resueltos por `getChartColorsArray`.
   */
  private buildMonthlyTransactionsChart(): DashboardChartOptions {
    const data = this.monthlyTransactions();
    const colors = this.getChartColorsArray('["--vz-success", "--vz-danger"]');
    return {
      chart: { height: 350, type: "bar", toolbar: { show: false } },
      colors,
      series: [
        { name: "Ingresos", data: data.map((d) => d.income) },
        { name: "Gastos", data: data.map((d) => d.expenses) },
      ],
      xaxis: { categories: data.map((d) => d.month) },
      plotOptions: { bar: { columnWidth: "55%", borderRadius: 4 } },
      dataLabels: { enabled: false },
      legend: { position: "top" },
      tooltip: { y: { formatter: (val: number) => formatMoney(val) } },
    };
  }

  /**
   * Gráfico "Gastos por Categoría": donut alimentado por merchants/expenses.
   */
  private buildCategoryExpensesChart(): DashboardChartOptions {
    const data = this.categoryExpenses();
    const colors = this.getChartColorsArray(
      '["--fp-primary", "--fp-success", "--fp-danger", "--fp-info", "--fp-warning", "--fp-accent"]'
    );
    return {
      chart: { height: 350, type: "donut" },
      labels: data.map((d) => d.label),
      series: data.map((d) => d.value),
      colors,
      legend: { position: "bottom" },
      dataLabels: {
        enabled: true,
        formatter: (val: string | number | number[]) =>
          `${Number(val).toFixed(1)}%`,
      },
      tooltip: { y: { formatter: (val: number) => formatMoney(val) } },
    };
  }

  /**
   * Gráfico "Evolución de Inversiones": línea alimentada por investments/monthly.
   */
  private buildInvestmentEvolutionChart(): DashboardChartOptions {
    const data = this.investmentEvolution();
    const colors = this.getChartColorsArray('["--fp-primary"]');
    return {
      chart: { height: 350, type: "line", toolbar: { show: false } },
      colors,
      series: [{ name: "Inversiones", data: data.map((d) => d.invested) }],
      xaxis: { categories: data.map((d) => d.month) },
      stroke: { curve: "smooth", width: 3 },
      markers: { size: 4 },
      dataLabels: { enabled: false },
      tooltip: { y: { formatter: (val: number) => formatMoney(val) } },
    };
  }

  /**
   * Resuelve tokens CSS (p. ej. `"--vz-success"`) a valores para los gráficos.
   * Conservado del dashboard anterior y reutilizado por los 3 gráficos.
   */
  private getChartColorsArray(colors: string): string[] {
    const tokens: string[] = JSON.parse(colors);
    return tokens.map((value) => {
      const token = value.replace(" ", "");
      if (token.indexOf(",") === -1) {
        const color = getComputedStyle(
          document.documentElement
        ).getPropertyValue(token);
        return color ? color.replace(" ", "") : token;
      }
      const parts = token.split(",");
      if (parts.length === 2) {
        const rgba = getComputedStyle(
          document.documentElement
        ).getPropertyValue(parts[0]);
        return "rgba(" + rgba + "," + parts[1] + ")";
      }
      return token;
    });
  }

  /** Clase de badge semántico según el tipo de transacción. */
  transactionTypeBadgeClass(type: string): string {
    switch (type) {
      case "Purchase":
        return "badge bg-danger";
      case "Payment":
        return "badge bg-success";
      case "Fee":
      case "Interest":
        return "badge bg-warning";
      default:
        return "badge bg-secondary";
    }
  }

  /** Clase de color para la barra de utilización de una tarjeta. */
  utilizationClass(percentage: number): string {
    if (percentage >= 80) {
      return "bg-danger";
    }
    if (percentage >= 50) {
      return "bg-warning";
    }
    return "bg-success";
  }

  /** Clase de color para el monto según el tipo de transacción. */
  transactionAmountClass(type: string): string {
    switch (type) {
      case "Purchase":
      case "Fee":
      case "Interest":
        return "text-danger";
      case "Payment":
        return "text-success";
      default:
        return "text-secondary";
    }
  }
}
