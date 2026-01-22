import { TransactionsDTO } from "../DTO/TransactionsDTO";
import {
  TransactionOperationResponse,
  TransactionsSummary,
} from "../DTO/TransactionOperation.dto";

export interface ITransactions {
  getListadoTransactions(
    token: string,
    usuario: string,
    startDate?: string,
    endDate?: string
  ): Promise<TransactionsDTO[]>;
  guardarTransactions(
    datos: TransactionsDTO | Record<string, unknown>,
    token: string,
    usuario: string
  ): Promise<TransactionOperationResponse>;
  editarTransactions(
    datos: TransactionsDTO | Record<string, unknown>,
    token: string,
    usuario: string
  ): Promise<TransactionOperationResponse>;
  eliminarTransactions(
    datos: Record<string, unknown>,
    token: string,
    usuario: string
  ): Promise<TransactionOperationResponse>;
  getTransactionsById(
    id: number,
    token: string,
    usuario: string
  ): Promise<TransactionsDTO>;
  getTransactionsByCreditCard(
    creditCardId: number,
    token: string,
    usuario: string
  ): Promise<TransactionsDTO[]>;
  getTransactionsByType(
    type: number,
    token: string,
    usuario: string
  ): Promise<TransactionsDTO[]>;
  getCashTransactionsByDateRange(
    startDate: string,
    endDate: string,
    token: string
  ): Promise<TransactionsDTO[]>;
  getTransactionsByDateRange(
    fechaInicio: string,
    fechaFin: string,
    token: string,
    usuario: string
  ): Promise<TransactionsDTO[]>;
  getTransactionsPendientes(
    token: string,
    usuario: string
  ): Promise<TransactionsDTO[]>;
  procesarTransaction(
    id: number,
    token: string,
    usuario: string
  ): Promise<TransactionOperationResponse>;
}

export interface ITransactionsEdit {
  amount: number;
  type: number;
  description: string;
  date: Date;
  transactionDate: Date;
  paymentMethod: number;
  creditCardId?: number | null;
  merchantId: number;
}

export interface ITransactionsCreate {
  amount: number;
  type: number;
  description: string;
  paymentMethod: number;
  creditCardId?: number | null;
  transactionDate: Date;
  merchantId: number;
}

export interface ITransactionType {
  id: number;
  name: string;
  description?: string;
}
