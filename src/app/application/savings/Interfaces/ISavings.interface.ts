import { SavingTransactionDTO } from "../DTO/SavingTransactionDTO";

export interface ISavings {
  registerTransaction(
    datos: RegisterSavingTransactionRequest,
    token: string,
    usuario: string
  ): Promise<number>;
  getBalance(token: string, usuario: string): Promise<number>;
  getHistory(
    token: string,
    usuario: string,
    startDate?: string,
    endDate?: string
  ): Promise<SavingTransactionDTO[]>;
}

export interface RegisterSavingTransactionRequest {
  date: string; // YYYY-MM-DD
  amount: number;
  description: string;
  transactionType: number; // 1 = Deposit, 2 = Withdrawal
}
