export class ChangedPassRequestDTO {
  id: number;
  usuario: string;
  clave: string;
  clave_nueva: string;

  constructor(data: Partial<ChangedPassRequestDTO>) {
    if (data.id === undefined) {
      throw new Error('El campo "id" es obligatorio.');
    }
    if (!data.usuario || data.usuario.trim() === "") {
      throw new Error('El campo "usuario" es obligatorio.');
    }
    if (!data.clave || data.clave.trim() === "") {
      throw new Error('El campo "clave" es obligatorio.');
    }
    if (!data.clave_nueva || data.clave_nueva.trim() === "") {
      throw new Error('El campo "clave_nueva" es obligatorio.');
    }

    this.id = data.id;
    this.usuario = data.usuario;
    this.clave = data.clave;
    this.clave_nueva = data.clave_nueva;
  }
}
