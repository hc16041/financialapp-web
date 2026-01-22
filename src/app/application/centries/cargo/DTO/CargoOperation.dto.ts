/**
 * Respuesta genérica para operaciones CRUD en cargos.
 */
export interface CargoOperationResponse {
  success?: boolean;
  message?: string;
  id?: number;
  data?: unknown;
}
