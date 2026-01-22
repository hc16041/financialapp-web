/**
 * Tipo para servicios que tienen métodos de obtención de datos.
 * Acepta cualquier objeto (clases o objetos planos) que tenga métodos con la firma esperada.
 * La validación de que el método existe y es una función se hace en tiempo de ejecución.
 */
export type IDataService<T = unknown> = object;

/**
 * Tipo para servicios que tienen métodos de descarga de archivos.
 * Acepta cualquier objeto (clases o objetos planos) que tenga métodos con la firma esperada.
 * La validación de que el método existe y es una función se hace en tiempo de ejecución.
 */
export type IFileDownloadService = object;

/**
 * Tipo para servicios que tienen métodos de validación XSD.
 * Acepta cualquier objeto (clases o objetos planos) que tenga métodos con la firma esperada.
 * La validación de que el método existe y es una función se hace en tiempo de ejecución.
 */
export type IXsdValidationService = object;

/**
 * Tipo para servicios CRUD genéricos.
 * Acepta cualquier objeto (clases o objetos planos) que tenga métodos con la firma esperada.
 * La validación de que el método existe y es una función se hace en tiempo de ejecución.
 */
export type ICrudService<TData = unknown, TResponse = unknown> = object;

/**
 * Tipo para servicios de eliminación.
 * Acepta cualquier objeto (clases o objetos planos) que tenga métodos con la firma esperada.
 * La validación de que el método existe y es una función se hace en tiempo de ejecución.
 */
export type IDeleteService = object;

/**
 * Tipo para identificar servicios que pueden tener métodos con ID opcional.
 */
export type ServiceWithOptionalId<T = unknown> = {
  [methodName: string]: (
    id?: number | string,
    token?: string,
    usuario?: string
  ) => Promise<T | T[]>;
};

/**
 * Respuesta de error estructurada.
 */
export interface ErrorResponse {
  message?: string;
  error?: {
    message?: string;
  };
  response?: {
    data?: {
      message?: string;
    };
  };
  status?: number;
  stack?: string;
}
