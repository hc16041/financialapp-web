import { IsNumber, Min } from "class-validator";

export class Anexo3DTO {
  @IsNumber()
  @Min(1, { message: "El TIPO_CUENTA debe ser un número positivo." })
  TIPO_CUENTA: number;

  @IsNumber()
  @Min(1, { message: "El CODIGO_MONTO_DEPOSITO debe ser un número positivo." })
  CODIGO_MONTO_DEPOSITO: number;

  @IsNumber()
  @Min(1, { message: "El TIPO_PERSONA debe ser un número positivo." })
  TIPO_PERSONA: number;

  @IsNumber()
  @Min(1, { message: "La CANTIDAD_CUENTA debe ser un número positivo." })
  CANTIDAD_CUENTA: number;

  @IsNumber()
  @Min(0, { message: "El SALDO_DEPOSITANTE debe ser un número positivo." })
  SALDO_DEPOSITO: number;

  constructor(data?: Partial<Anexo3DTO>) {
    this.TIPO_CUENTA = data?.TIPO_CUENTA || 1;
    this.CODIGO_MONTO_DEPOSITO = data?.CODIGO_MONTO_DEPOSITO || 1;
    this.TIPO_PERSONA = data?.TIPO_PERSONA || 1;
    this.CANTIDAD_CUENTA = data?.CANTIDAD_CUENTA || 1;
    this.SALDO_DEPOSITO = data?.SALDO_DEPOSITO || 0;
  }
}
