import {
  Component,
  inject,
  OnInit,
  ChangeDetectionStrategy,
  signal,
} from "@angular/core";
import { ReportsService } from "src/app/application/Reports/Services/Reports.service";
import { LoginService } from "src/app/account/login/Services/LoginService";
import { CreditcardService } from "src/app/application/creditcard/Services/Creditcard.service";
import { CreditCardCodeDTO } from "src/app/application/creditcard/DTO/CreditCardCode.dto";
import {
  InvestmentMonthlyReportDTO,
  MonthlySummaryDTO,
} from "src/app/application/Reports/DTO/InvestmentMonthlyReport.dto";
import {
  CardExpensesReportDto,
  CardPaymentsReportDto,
  MerchantExpensesReportDto,
  CashExpensesReportDto,
  CardConsumptionDto,
} from "src/app/application/Reports/DTO/reports.dto";
import { ApexOptions } from "ng-apexcharts";
import { AlertcustomService } from "src/app/core/services/alertcustom.service";
import {
  getReportChartColors,
  generateCategoryColors,
} from "./reports-chart-colors";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrl: "./reports.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsComponent implements OnInit {
  private reportsService = inject(ReportsService);
  private loginService = inject(LoginService);
  private creditcardService = inject(CreditcardService);
  private alertService = inject(AlertcustomService);

  // Estado con señales y adaptadores getter/setter para compatibilidad con plantillas
  private readonly selectedYearSig = signal<number>(new Date().getFullYear());
  get selectedYear(): number {
    return this.selectedYearSig();
  }
  set selectedYear(value: number) {
    this.selectedYearSig.set(value);
  }

  private readonly availableYearsSig = signal<number[]>([]);
  get availableYears(): number[] {
    return this.availableYearsSig();
  }
  set availableYears(value: number[]) {
    this.availableYearsSig.set(value);
  }

  private readonly investmentsReportSig = signal<InvestmentMonthlyReportDTO | null>(null);
  get investmentsReport(): InvestmentMonthlyReportDTO | null {
    return this.investmentsReportSig();
  }
  set investmentsReport(value: InvestmentMonthlyReportDTO | null) {
    this.investmentsReportSig.set(value);
  }

  private readonly isLoadingInvestmentsSig = signal<boolean>(false);
  get isLoadingInvestments(): boolean {
    return this.isLoadingInvestmentsSig();
  }
  set isLoadingInvestments(value: boolean) {
    this.isLoadingInvestmentsSig.set(value);
  }

  private readonly isLoadingCardExpensesSig = signal<boolean>(false);
  get isLoadingCardExpenses(): boolean {
    return this.isLoadingCardExpensesSig();
  }
  set isLoadingCardExpenses(value: boolean) {
    this.isLoadingCardExpensesSig.set(value);
  }

  private readonly isLoadingCardPaymentsSig = signal<boolean>(false);
  get isLoadingCardPayments(): boolean {
    return this.isLoadingCardPaymentsSig();
  }
  set isLoadingCardPayments(value: boolean) {
    this.isLoadingCardPaymentsSig.set(value);
  }

  private readonly isLoadingCardsConsumptionSig = signal<boolean>(false);
  get isLoadingCardsConsumption(): boolean {
    return this.isLoadingCardsConsumptionSig();
  }
  set isLoadingCardsConsumption(value: boolean) {
    this.isLoadingCardsConsumptionSig.set(value);
  }

  private readonly isLoadingMerchantsExpensesSig = signal<boolean>(false);
  get isLoadingMerchantsExpenses(): boolean {
    return this.isLoadingMerchantsExpensesSig();
  }
  set isLoadingMerchantsExpenses(value: boolean) {
    this.isLoadingMerchantsExpensesSig.set(value);
  }

  private readonly isLoadingCashExpensesSig = signal<boolean>(false);
  get isLoadingCashExpenses(): boolean {
    return this.isLoadingCashExpensesSig();
  }
  set isLoadingCashExpenses(value: boolean) {
    this.isLoadingCashExpensesSig.set(value);
  }

  private readonly creditCardsSig = signal<CreditCardCodeDTO[]>([]);
  get creditCards(): CreditCardCodeDTO[] {
    return this.creditCardsSig();
  }
  set creditCards(value: CreditCardCodeDTO[]) {
    this.creditCardsSig.set(value);
  }

  private readonly selectedCardIdSig = signal<number | null>(null);
  get selectedCardId(): number | null {
    return this.selectedCardIdSig();
  }
  set selectedCardId(value: number | null) {
    this.selectedCardIdSig.set(value);
  }

  private readonly startDateSig = signal<string>("");
  get startDate(): string {
    return this.startDateSig();
  }
  set startDate(value: string) {
    this.startDateSig.set(value);
  }

  private readonly endDateSig = signal<string>("");
  get endDate(): string {
    return this.endDateSig();
  }
  set endDate(value: string) {
    this.endDateSig.set(value);
  }

  private readonly cardExpensesDataSig = signal<CardExpensesReportDto | null>(null);
  get cardExpensesData(): CardExpensesReportDto | null {
    return this.cardExpensesDataSig();
  }
  set cardExpensesData(value: CardExpensesReportDto | null) {
    this.cardExpensesDataSig.set(value);
  }

  private readonly cardPaymentsDataSig = signal<CardPaymentsReportDto | null>(null);
  get cardPaymentsData(): CardPaymentsReportDto | null {
    return this.cardPaymentsDataSig();
  }
  set cardPaymentsData(value: CardPaymentsReportDto | null) {
    this.cardPaymentsDataSig.set(value);
  }

  private readonly cardsConsumptionDataSig = signal<CardConsumptionDto[]>([]);
  get cardsConsumptionData(): CardConsumptionDto[] {
    return this.cardsConsumptionDataSig();
  }
  set cardsConsumptionData(value: CardConsumptionDto[]) {
    this.cardsConsumptionDataSig.set(value);
  }

  private readonly merchantsExpensesDataSig = signal<MerchantExpensesReportDto | null>(null);
  get merchantsExpensesData(): MerchantExpensesReportDto | null {
    return this.merchantsExpensesDataSig();
  }
  set merchantsExpensesData(value: MerchantExpensesReportDto | null) {
    this.merchantsExpensesDataSig.set(value);
  }

  private readonly cashExpensesDataSig = signal<CashExpensesReportDto | null>(null);
  get cashExpensesData(): CashExpensesReportDto | null {
    return this.cashExpensesDataSig();
  }
  set cashExpensesData(value: CashExpensesReportDto | null) {
    this.cashExpensesDataSig.set(value);
  }

  private readonly investmentsChartSig = signal<ApexOptions | null>(null);
  get investmentsChart(): ApexOptions | null {
    return this.investmentsChartSig();
  }
  set investmentsChart(value: ApexOptions | null) {
    this.investmentsChartSig.set(value);
  }

  private readonly monthlyBalanceChartSig = signal<ApexOptions | null>(null);
  get monthlyBalanceChart(): ApexOptions | null {
    return this.monthlyBalanceChartSig();
  }
  set monthlyBalanceChart(value: ApexOptions | null) {
    this.monthlyBalanceChartSig.set(value);
  }

  private readonly cardConsumptionChartSig = signal<ApexOptions | null>(null);
  get cardConsumptionChart(): ApexOptions | null {
    return this.cardConsumptionChartSig();
  }
  set cardConsumptionChart(value: ApexOptions | null) {
    this.cardConsumptionChartSig.set(value);
  }

  private readonly merchantsChartSig = signal<ApexOptions | null>(null);
  get merchantsChart(): ApexOptions | null {
    return this.merchantsChartSig();
  }
  set merchantsChart(value: ApexOptions | null) {
    this.merchantsChartSig.set(value);
  }

  private readonly activeTabSig = signal<string>("investments");
  get activeTab(): string {
    return this.activeTabSig();
  }
  set activeTab(value: string) {
    this.activeTabSig.set(value);
  }

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
          this.creditCards[0].codigo ??
          this.creditCards[0].id ??
          null;
      }
    } catch (error) {
      console.error("Error al cargar tarjetas:", error);
      this.alertService.showError("Ocurrió un error. Inténtalo de nuevo.");
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
      this.alertService.showError("Error al cargar el reporte de inversiones");
    } finally {
      this.isLoadingInvestments = false;
    }
  }

  /**
   * Carga el reporte de gastos por tarjeta
   */
  async loadCardExpenses(): Promise<void> {
    if (!this.selectedCardId) return;
    this.isLoadingCardExpenses = true;
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
      this.alertService.showError(
        "Error al cargar los gastos por tarjeta"
      );
    } finally {
      this.isLoadingCardExpenses = false;
    }
  }

  /**
   * Carga el reporte de pagos por tarjeta
   */
  async loadCardPayments(): Promise<void> {
    if (!this.selectedCardId) return;
    this.isLoadingCardPayments = true;
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
      this.alertService.showError("Error al cargar los pagos por tarjeta");
    } finally {
      this.isLoadingCardPayments = false;
    }
  }

  /**
   * Carga el reporte de consumo de tarjetas
   * Nota: Los parámetros de fecha son opcionales según la documentación
   */
  async loadCardsConsumption(): Promise<void> {
    this.isLoadingCardsConsumption = true;
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
      this.alertService.showError(
        "Error al cargar el consumo de tarjetas"
      );
    } finally {
      this.isLoadingCardsConsumption = false;
    }
  }

  /**
   * Carga el reporte de gastos por comercios
   */
  async loadMerchantsExpenses(): Promise<void> {
    this.isLoadingMerchantsExpenses = true;
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
      this.alertService.showError(
        "Error al cargar los gastos por comercios"
      );
    } finally {
      this.isLoadingMerchantsExpenses = false;
    }
  }

  /**
   * Carga el reporte de gastos en efectivo
   */
  async loadCashExpenses(): Promise<void> {
    this.isLoadingCashExpenses = true;
    try {
      const token = this.loginService.token || "";
      const username = this.loginService.username || "";
      this.cashExpensesData = await this.reportsService.getCashExpenses(
        token,
        username,
        this.startDate,
        this.endDate
      );
    } catch (error) {
      this.alertService.showError(
        "Error al cargar los gastos en efectivo"
      );
    } finally {
      this.isLoadingCashExpenses = false;
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
      colors: getReportChartColors(),
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
      colors: [getReportChartColors()[2]],
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
      labels: expenses.map((e) => e.merchantName || "Sin comercio"),
      series: expenses.map((e) => e.amount),
      colors: generateCategoryColors(expenses.length),
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
      colors: [getReportChartColors()[2]],
      series: [
        {
          name: "Utilización (%)",
          data: this.cardsConsumptionData.map(
            (card) => card.utilizationPercentage || 0
          ),
        },
      ],
      xaxis: {
        categories: this.cardsConsumptionData.map(
          (card) => card.bankName || `Tarjeta ${card.creditCardId}`
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
      .sort((a, b) => b.totalAmount - a.totalAmount)
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
      colors: [getReportChartColors()[0]],
      dataLabels: {
        enabled: true,
        formatter: function (val: string | number | number[]) {
          return "$ " + Number(val).toFixed(2);
        },
      },
      series: [
        {
          name: "Total Gastos",
          data: topMerchants.map((m) => m.totalAmount),
        },
      ],
      xaxis: {
        categories: topMerchants.map((m) => m.merchantName),
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
    this.loadCashExpenses();
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

  /**
   * Formatea un rango de fechas (`yyyy-MM-dd`) como `dd/MM/yyyy - dd/MM/yyyy`
   * para la tarjeta KPI "Período".
   */
  formatPeriod(start: string, end: string): string {
    const format = (date: string): string => {
      if (!date) return "—";
      const [year, month, day] = date.split("-");
      return year && month && day ? `${day}/${month}/${year}` : "—";
    };
    return `${format(start)} - ${format(end)}`;
  }
}
