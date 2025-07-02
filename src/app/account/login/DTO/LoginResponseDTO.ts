export class LoginResponseDTO {
  token?: string;
  respuesta: string;

  constructor(data: Partial<LoginResponseDTO>) {
    // Validar si la respuesta está presente y no vacía
    if (!data.respuesta || data.respuesta.trim() === "") {
      throw new Error('El campo "respuesta" es obligatorio.');
    }

    // El token puede estar presente o ser opcional
    if (data.token && data.token.trim() === "") {
      throw new Error(
        'El campo "token", si se proporciona, no puede estar vacío.'
      );
    }

    this.token = data.token || undefined;
    this.respuesta = data.respuesta;
  }
}
