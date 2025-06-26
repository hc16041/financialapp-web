export interface TransactionFilter {
  creditCardId?: number;
  startDate?: string; // Formato: YYYY-MM-DD
  endDate?: string;   // Formato: YYYY-MM-DD
  type?: number;      // Tipo de transacción
  minAmount?: number;
  maxAmount?: number;
  isProcessed?: boolean;
}