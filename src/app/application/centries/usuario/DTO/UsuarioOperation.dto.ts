/**
 * Respuesta genérica para operaciones CRUD en usuarios.
 */
export interface UsuarioOperationResponse {
  success?: boolean;
  message?: string;
  id?: number;
  data?: unknown;
}
