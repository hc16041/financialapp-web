import { TransactionsDTO } from "../DTO/TransactionsDTO";

export interface ITransactions {
  getListadoTransactions(
    token: string,
    usuario: string
  ): Promise<TransactionsDTO[]>;
  guardarTransactions(datos: any, token: string, usuario: string): Promise<any>;
  editarTransactions(datos: any, token: string, usuario: string): Promise<any>;
  eliminarTransactions(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any>;
  getListadoTransactionsXML(token: string, usuario: string): Promise<any>;
  getListadoTransactionsExcel(token: string, usuario: string): Promise<any>;
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
  procesarTransaction(id: number, token: string, usuario: string): Promise<any>;
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
  description: string;
}
