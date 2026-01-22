/**
 * Respuesta genérica para operaciones CRUD en inversiones.
 */
export interface InvestmentOperationResponse {
  success?: boolean;
  message?: string;
  id?: number;
  data?: unknown;
}
