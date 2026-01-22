/**
 * Respuesta genérica para operaciones CRUD en métodos de retiro.
 */
export interface WithdrawalMethodOperationResponse {
  success?: boolean;
  message?: string;
  id?: number;
  data?: unknown;
}
