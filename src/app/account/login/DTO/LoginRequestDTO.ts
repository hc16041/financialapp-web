export class LoginRequestDTO {
  usuario: string;
  clave: string;
  mac_addres: string;

  constructor(data: Partial<LoginRequestDTO>) {
    if (!data.usuario || data.usuario.trim() === "") {
      throw new Error('El campo "usuario" es obligatorio.');
    }
    if (!data.clave || data.clave.trim() === "") {
      throw new Error('El campo "clave" es obligatorio.');
    }
    if (!data.mac_addres || data.mac_addres.trim() === "") {
      throw new Error('El campo "mac_addres" es obligatorio.');
    }

    this.usuario = data.usuario;
    this.clave = data.clave;
    this.mac_addres = data.mac_addres;
  }
}
