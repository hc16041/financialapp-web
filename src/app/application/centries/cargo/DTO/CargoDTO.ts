export class CargoDTO {
  id_cargo: number = 0;
  cargo: string = "";

  /**
   * Constructor de la clase.
   * @param init Un objeto que contiene los valores iniciales de los campos de la clase.
   * Los campos no proporcionados se establecer n en sus valores por defecto.
   */
  constructor(init?: Partial<CargoDTO>) {
    Object.assign(this, init);
  }
}
