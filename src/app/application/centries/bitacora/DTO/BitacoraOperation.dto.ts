/**
 * Respuesta genérica para operaciones de bitácora.
 */
export interface BitacoraOperationResponse {
  success?: boolean;
  message?: string;
  id?: number;
  data?: unknown;
}

/**
 * Request para descarga de archivo de bitácora.
 */
export interface BitacoraFileRequest {
  id: number;
  tipo_archivo?: string;
}
