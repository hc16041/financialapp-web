import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
} from "@angular/core";
import { CommonModule, DatePipe, CurrencyPipe } from "@angular/common";
import { SavingTransactionDTO, SavingTransactionType } from "src/app/application/savings/DTO/SavingTransactionDTO";

/**
 * Componente Dumb para mostrar el historial de transacciones y el saldo
 * Recibe datos via inputs, no tiene dependencias de servicios
 */
@Component({
  selector: "app-savings-list",
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe],
  templateUrl: "./savings-list.component.html",
  styleUrl: "./savings-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavingsListComponent {
  // Inputs
  balance = input.required<number>();
  transactions = input.required<SavingTransactionDTO[]>();
  loading = input<boolean>(false);

  // Computed para estadísticas
  readonly totalDeposits = computed(() =>
    this.transactions()
      .filter((t) => t.transactionType === SavingTransactionType.Deposit)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  readonly totalWithdrawals = computed(() =>
    this.transactions()
      .filter((t) => t.transactionType === SavingTransactionType.Withdrawal)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  readonly transactionTypeEnum = SavingTransactionType;

  getTransactionTypeLabel(type: SavingTransactionType): string {
    return type === SavingTransactionType.Deposit ? "Depósito" : "Retiro";
  }

  getTransactionTypeClass(type: SavingTransactionType): string {
    return type === SavingTransactionType.Deposit
      ? "badge bg-success"
      : "badge bg-danger";
  }
}
