/**
 * Respuesta genérica para operaciones CRUD en plataformas.
 */
export interface PlatformOperationResponse {
  success?: boolean;
  message?: string;
  id?: number;
  data?: unknown;
}
