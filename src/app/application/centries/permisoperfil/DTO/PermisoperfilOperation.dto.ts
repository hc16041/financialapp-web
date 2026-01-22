/**
 * Respuesta genérica para operaciones CRUD en permisos por perfil.
 */
export interface PermisoperfilOperationResponse {
  success?: boolean;
  message?: string;
  id?: number;
  data?: unknown;
}
