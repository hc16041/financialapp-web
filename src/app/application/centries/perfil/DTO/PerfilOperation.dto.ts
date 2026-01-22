/**
 * Respuesta genérica para operaciones CRUD en perfiles.
 */
export interface PerfilOperationResponse {
  success?: boolean;
  message?: string;
  id?: number;
  data?: unknown;
}
