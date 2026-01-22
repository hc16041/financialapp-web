/**
 * Respuesta genérica para operaciones CRUD en tarjetas de crédito.
 */
export interface CreditCardOperationResponse {
  success?: boolean;
  message?: string;
  id?: number;
  data?: unknown;
}

/**
 * Request para crear/editar una tarjeta de crédito.
 */
export interface CreditCardCreateRequest {
  bankName: string;
  creditLimit: number;
  cutOffDay: number;
  paymentDueDay: number;
  annualInterestRate?: number;
  currentBalance?: number;
}

/**
 * Request para activar/desactivar una tarjeta de crédito.
 */
export interface CreditCardStatusRequest {
  id: number;
  codusuario: string;
}
