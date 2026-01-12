import { Injectable, inject, signal, computed } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { SavingsService } from "src/app/application/savings/Services/Savings.service";
import { SavingTransactionDTO, SavingTransactionType } from "src/app/application/savings/DTO/SavingTransactionDTO";
import { LoginService } from "src/app/account/login/Services/LoginService";
import { AlertcustomService } from "src/app/core/services/alertcustom.service";

/**
 * Facade para gestionar el estado de ahorros usando Signals
 * Expone datos como Signals read-only y métodos para cargar datos y registrar movimientos
 */
@Injectable({
  providedIn: "root",
})
export class SavingsFacade {
  private savingsService = inject(SavingsService);
  private loginService = inject(LoginService);
  private alertService = inject(AlertcustomService);

  // Estado privado usando signals
  private _balance = signal<number>(0);
  private _transactions = signal<SavingTransactionDTO[]>([]);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  // Signals read-only expuestos al exterior
  readonly balance = this._balance.asReadonly();
  readonly transactions = this._transactions.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  // Computed signals
  readonly totalDeposits = computed(() =>
    this._transactions()
      .filter((t) => t.transactionType === SavingTransactionType.Deposit)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  readonly totalWithdrawals = computed(() =>
    this._transactions()
      .filter((t) => t.transactionType === SavingTransactionType.Withdrawal)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  readonly transactionsCount = computed(() => this._transactions().length);

  /**
   * Carga el saldo actual de ahorros
   */
  async loadBalance(): Promise<void> {
    try {
      this._loading.set(true);
      this._error.set(null);

      const token = this.loginService.token || "";
      const username = this.loginService.username || "";

      const balance = await this.savingsService.getBalance(token, username);
      this._balance.set(balance);
    } catch (error: any) {
      const errorMessage = error?.message || "Error al cargar el saldo";
      this._error.set(errorMessage);
      this.alertService.showError(errorMessage);
    } finally {
      this._loading.set(false);
    }
  }

  /**
   * Carga el historial de transacciones
   */
  async loadHistory(startDate?: string, endDate?: string): Promise<void> {
    try {
      this._loading.set(true);
      this._error.set(null);

      const token = this.loginService.token || "";
      const username = this.loginService.username || "";

      const transactions = await this.savingsService.getHistory(
        token,
        username,
        startDate,
        endDate
      );
      this._transactions.set(transactions);
    } catch (error: any) {
      const errorMessage = error?.message || "Error al cargar el historial";
      this._error.set(errorMessage);
      this.alertService.showError(errorMessage);
    } finally {
      this._loading.set(false);
    }
  }

  /**
   * Registra una nueva transacción de ahorros
   * Después de registrar exitosamente, recarga automáticamente el balance y el historial
   */
  async registerTransaction(
    date: string,
    amount: number,
    description: string,
    transactionType: SavingTransactionType
  ): Promise<void> {
    try {
      this._loading.set(true);
      this._error.set(null);

      const token = this.loginService.token || "";
      const username = this.loginService.username || "";

      // Preparar el objeto que se enviará
      const transactionData = {
        date,
        amount,
        description,
        transactionType: Number(transactionType), // Asegurar que se envíe como número
      };

      await this.savingsService.registerTransaction(
        transactionData,
        token,
        username
      );

      this.alertService.showSuccess("Transacción registrada correctamente");

      // Recargar balance y historial automáticamente
      await Promise.all([this.loadBalance(), this.loadHistory()]);
    } catch (error: any) {
      const errorMessage = error?.message || "Error al registrar la transacción";
      this._error.set(errorMessage);
      this.alertService.showError(errorMessage);
      throw error;
    } finally {
      this._loading.set(false);
    }
  }

  /**
   * Inicializa el facade cargando balance e historial
   */
  async initialize(): Promise<void> {
    await Promise.all([this.loadBalance(), this.loadHistory()]);
  }
}
