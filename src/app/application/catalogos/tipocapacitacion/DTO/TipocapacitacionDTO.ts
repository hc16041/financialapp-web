export class TipocapacitacionDTO {
  codigo: number;
  descripcion: string;

  constructor(codigo: number = 0, descripcion: string = "") {
    this.codigo = codigo;
    this.descripcion = descripcion;
  }
}
