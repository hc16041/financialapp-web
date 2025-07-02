import { IsNumber, Min } from "class-validator";

export class Anexo1DTO {
  @IsNumber()
  @Min(1, { message: "La CLASE_DEPOSITO debe ser un número positivo." })
  CLASE_DEPOSITO: number;

  @IsNumber()
  @Min(1, { message: "El TIPO_CUENTA debe ser un número positivo." })
  TIPO_CUENTA: number;

  @IsNumber()
  @Min(0, { message: "El MONTO_DEPOSITO debe ser un número positivo." })
  MONTO_DEPOSITO: number;

  @IsNumber()
  @Min(1, { message: "La CANTIDAD_CUENTA debe ser un número positivo." })
  CANTIDAD_CUENTA: number;

  @IsNumber()
  @Min(1, { message: "La CANTIDAD_DEPOSITANTE debe ser un número positivo." })
  CANTIDAD_DEPOSITANTE: number;

  constructor(data?: Partial<Anexo1DTO>) {
    this.CLASE_DEPOSITO = data?.CLASE_DEPOSITO || 1;
    this.TIPO_CUENTA = data?.TIPO_CUENTA || 1;
    this.MONTO_DEPOSITO = data?.MONTO_DEPOSITO || 0;
    this.CANTIDAD_CUENTA = data?.CANTIDAD_CUENTA || 1;
    this.CANTIDAD_DEPOSITANTE = data?.CANTIDAD_DEPOSITANTE || 1;
  }
}
