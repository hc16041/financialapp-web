/**
 * Respuesta genérica para operaciones CRUD en comercios.
 */
export interface MerchantOperationResponse {
  success?: boolean;
  message?: string;
  id?: number;
  data?: unknown;
}
