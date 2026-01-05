import {
  Component,
  inject,
  OnInit,
  ChangeDetectionStrategy,
} from "@angular/core";
import { ReportsService } from "src/app/application/Reports/Services/Reports.service";
import { LoginService } from "src/app/account/login/Services/LoginService";
import { CreditcardService } from "src/app/application/creditcard/Services/Creditcard.service";
import {
  InvestmentMonthlyReportDTO,
  MonthlySummaryDTO,
} from "src/app/application/Reports/DTO/InvestmentMonthlyReport.dto";
import { ChartType } from "../../dashboards/dashboard/dashboard.model";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrl: "./reports.component.scss",
})
export class ReportsComponent implements OnInit {
  private reportsService = inject(ReportsService);
  private loginService = inject(LoginService);
  private creditcardService = inject(CreditcardService);

  // Año seleccionado para el reporte de inversiones
  selectedYear: number = new Date().getFullYear();
  availableYears: number[] = [];

  // Datos del reporte de inversiones mensual
  investmentsReport: InvestmentMonthlyReportDTO | null = null;
  isLoadingInvestments: boolean = false;

  // Tarjetas disponibles
  creditCards: any[] = [];
  selectedCardId: number | null = null;

  // Fechas para reportes de tarjetas y comercios
  startDate: string = "";
  endDate: string = "";

  // Datos de reportes
  cardExpensesData: any = null;
  cardPaymentsData: any = null;
  cardsConsumptionData: any[] = [];
  merchantsExpensesData: any = null;

  // Gráficos
  investmentsChart: ChartType | null = null;
  monthlyBalanceChart: ChartType | null = null;
  cardConsumptionChart: ChartType | null = null;
  merchantsChart: ChartType | null = null;

  // Tab activo
  activeTab: string = "investments";

  ngOnInit(): void {
    this.initializeDates();
    this.generateAvailableYears();
    this.loadCreditCards();
    this.loadInvestmentsReport();
  }

  /**
   * Inicializa las fechas con el mes actual
   */
  private initializeDates(): void {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    this.startDate = formatDate(firstDayOfMonth);
    this.endDate = formatDate(lastDayOfMonth);
  }

  /**
   * Genera lista de años disponibles (últimos 5 años)
   */
  private generateAvailableYears(): void {
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 5; i++) {
      this.availableYears.push(currentYear - i);
    }
  }

  /**
   * Carga las tarjetas de crédito disponibles
   */
  async loadCreditCards(): Promise<void> {
    try {
      const token = this.loginService.token || "";
      this.creditCards = await this.creditcardService.getCreditCardCodes(token);
      if (this.creditCards.length > 0) {
        this.selectedCardId =
          this.creditCards[0].codigo || this.creditCards[0].id;
      }
    } catch (error) {
      console.error("Error al cargar tarjetas:", error);
    }
  }

  /**
   * Carga el reporte mensual de inversiones
   */
  async loadInvestmentsReport(): Promise<void> {
    this.isLoadingInvestments = true;
    try {
      const token = this.loginService.token || "";
      const username = this.loginService.username || "";
      this.investmentsReport = await this.reportsService.getInvestmentsMonthly(
        token,
        username,
        this.selectedYear
      );
      this.generateInvestmentsCharts();
    } catch (error) {
      console.error("Error al cargar reporte de inversiones:", error);
    } finally {
      this.isLoadingInvestments = false;
    }
  }

  /**
   * Carga el reporte de gastos por tarjeta
   */
  async loadCardExpenses(): Promise<void> {
    if (!this.selectedCardId) return;
    try {
      const token = this.loginService.token || "";
      const username = this.loginService.username || "";
      this.cardExpensesData = await this.reportsService.getCardExpenses(
        this.selectedCardId,
        token,
        username,
        this.startDate,
        this.endDate
      );
      this.generateCardExpensesChart();
    } catch (error) {
      console.error("Error al cargar gastos por tarjeta:", error);
    }
  }

  /**
   * Carga el reporte de pagos por tarjeta
   */
  async loadCardPayments(): Promise<void> {
    if (!this.selectedCardId) return;
    try {
      const token = this.loginService.token || "";
      const username = this.loginService.username || "";
      this.cardPaymentsData = await this.reportsService.getCardPayments(
        this.selectedCardId,
        token,
        username,
        this.startDate,
        this.endDate
      );
    } catch (error) {
      console.error("Error al cargar pagos por tarjeta:", error);
    }
  }

  /**
   * Carga el reporte de consumo de tarjetas
   * Nota: Los parámetros de fecha son opcionales según la documentación
   */
  async loadCardsConsumption(): Promise<void> {
    try {
      const token = this.loginService.token || "";
      const username = this.loginService.username || "";
      // Pasar fechas solo si están definidas (son opcionales)
      this.cardsConsumptionData = await this.reportsService.getCardsConsumption(
        token,
        username,
        this.startDate || undefined,
        this.endDate || undefined
      );
      this.generateCardsConsumptionChart();
    } catch (error) {
      console.error("Error al cargar consumo de tarjetas:", error);
    }
  }

  /**
   * Carga el reporte de gastos por comercios
   */
  async loadMerchantsExpenses(): Promise<void> {
    try {
      const token = this.loginService.token || "";
      const username = this.loginService.username || "";
      this.merchantsExpensesData =
        await this.reportsService.getMerchantsExpenses(
          token,
          username,
          this.startDate,
          this.endDate
        );
      this.generateMerchantsChart();
    } catch (error) {
      console.error("Error al cargar gastos por comercios:", error);
    }
  }

  /**
   * Genera gráficos para el reporte de inversiones
   */
  private generateInvestmentsCharts(): void {
    if (!this.investmentsReport) return;

    const monthlyData = this.investmentsReport.monthlySummaries;

    // Gráfico de ingresos vs retiros por mes
    this.investmentsChart = {
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      colors: ["#34c38f", "#f46a6a"],
      series: [
        {
          name: "Ingresos",
          data: monthlyData.map((m) => m.totalIngresos),
        },
        {
          name: "Retiros",
          data: monthlyData.map((m) => m.totalRetiros),
        },
      ],
      xaxis: {
        categories: monthlyData.map((m) => m.monthName),
      },
      yaxis: {
        title: {
          text: "Monto ($)",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return "$ " + val.toFixed(2);
          },
        },
      },
      legend: {
        position: "top",
      },
    };

    // Gráfico de balance neto por mes (línea)
    this.monthlyBalanceChart = {
      chart: {
        type: "line",
        height: 350,
        toolbar: { show: false },
      },
      colors: ["#556ee6"],
      stroke: {
        curve: "smooth",
        width: 3,
      },
      series: [
        {
          name: "Balance Neto",
          data: monthlyData.map((m) => m.netBalance),
        },
      ],
      xaxis: {
        categories: monthlyData.map((m) => m.monthName),
      },
      yaxis: {
        title: {
          text: "Balance ($)",
        },
      },
      markers: {
        size: 5,
        hover: {
          size: 7,
        },
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return "$ " + val.toFixed(2);
          },
        },
      },
    };
  }

  /**
   * Genera gráfico para gastos por tarjeta
   */
  private generateCardExpensesChart(): void {
    if (!this.cardExpensesData || !this.cardExpensesData.expenses) return;

    const expenses = this.cardExpensesData.expenses;
    this.cardConsumptionChart = {
      chart: {
        type: "pie",
        height: 350,
      },
      labels: expenses.map((e: any) => e.merchantName || "Sin comercio"),
      series: expenses.map((e: any) => e.amount),
      colors: this.generateColors(expenses.length),
      legend: {
        position: "bottom",
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return "$ " + val.toFixed(2);
          },
        },
      },
    };
  }

  /**
   * Genera gráfico para consumo de tarjetas
   */
  private generateCardsConsumptionChart(): void {
    if (!this.cardsConsumptionData || this.cardsConsumptionData.length === 0)
      return;

    this.cardConsumptionChart = {
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      colors: ["#556ee6"],
      series: [
        {
          name: "Utilización (%)",
          data: this.cardsConsumptionData.map(
            (card: any) => card.utilizationPercentage || 0
          ),
        },
      ],
      xaxis: {
        categories: this.cardsConsumptionData.map(
          (card: any) => card.bankName || `Tarjeta ${card.creditCardId}`
        ),
      },
      yaxis: {
        title: {
          text: "Porcentaje de Utilización",
        },
        max: 100,
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return val.toFixed(2) + "%";
          },
        },
      },
    };
  }

  /**
   * Genera gráfico para gastos por comercios
   */
  private generateMerchantsChart(): void {
    if (
      !this.merchantsExpensesData ||
      !this.merchantsExpensesData.merchants ||
      this.merchantsExpensesData.merchants.length === 0
    )
      return;

    const merchants = this.merchantsExpensesData.merchants;
    // Tomar los top 10 comercios
    const topMerchants = merchants
      .sort((a: any, b: any) => b.totalAmount - a.totalAmount)
      .slice(0, 10);

    this.merchantsChart = {
      chart: {
        type: "bar",
        height: 400,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 4,
        },
      },
      colors: ["#34c38f"],
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return "$ " + val.toFixed(2);
        },
      },
      series: [
        {
          name: "Total Gastos",
          data: topMerchants.map((m: any) => m.totalAmount),
        },
      ],
      xaxis: {
        categories: topMerchants.map((m: any) => m.merchantName),
      },
      yaxis: {
        title: {
          text: "Monto ($)",
        },
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return "$ " + val.toFixed(2);
          },
        },
      },
    };
  }

  /**
   * Genera colores para los gráficos
   */
  private generateColors(count: number): string[] {
    const colors = [
      "#556ee6",
      "#34c38f",
      "#f46a6a",
      "#f1b44c",
      "#50a5f1",
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#f9ca24",
      "#6c5ce7",
    ];
    return colors.slice(0, count);
  }

  /**
   * Maneja el cambio de año para el reporte de inversiones
   */
  onYearChange(): void {
    this.loadInvestmentsReport();
  }

  /**
   * Maneja el cambio de tarjeta seleccionada
   */
  onCardChange(): void {
    this.loadCardExpenses();
    this.loadCardPayments();
  }

  /**
   * Maneja la búsqueda por rango de fechas
   */
  onDateRangeSearch(): void {
    this.loadCardExpenses();
    this.loadCardPayments();
    this.loadCardsConsumption();
    this.loadMerchantsExpenses();
  }

  /**
   * Calcula el total de ingresos (suma de ingresoCount de todos los meses)
   */
  get totalIngresoCount(): number {
    if (!this.investmentsReport?.monthlySummaries) return 0;
    return this.investmentsReport.monthlySummaries.reduce(
      (sum, m) => sum + m.ingresoCount,
      0
    );
  }

  /**
   * Calcula el total de retiros (suma de retiroCount de todos los meses)
   */
  get totalRetiroCount(): number {
    if (!this.investmentsReport?.monthlySummaries) return 0;
    return this.investmentsReport.monthlySummaries.reduce(
      (sum, m) => sum + m.retiroCount,
      0
    );
  }
}
