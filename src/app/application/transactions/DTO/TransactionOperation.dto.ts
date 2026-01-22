/**
 * Respuesta genérica para operaciones CRUD en transacciones.
 */
export interface TransactionOperationResponse {
  success?: boolean;
  message?: string;
  id?: number;
  data?: unknown;
}

/**
 * Tipo de transacción.
 */
export interface TransactionType {
  id: number;
  name: string;
  description?: string;
}

/**
 * Resumen de transacciones por tarjeta.
 */
export interface TransactionsSummary {
  creditCardId: number;
  totalTransactions: number;
  totalAmount: number;
  pendingAmount: number;
  processedAmount: number;
}

/**
 * Respuesta para exportación de archivos (XML/Excel).
 */
export interface FileExportResponse {
  fileName: string;
  content: string | Blob;
  contentType?: string;
}
