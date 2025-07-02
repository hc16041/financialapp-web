import { IsNumber, Min } from "class-validator";

export class Anexo6DTO {
  @IsNumber()
  @Min(1, { message: "El NUMERO_CORRELATIVO debe ser un número positivo." })
  NUMERO_CORRELATIVO: number;

  @IsNumber()
  @Min(1, { message: "El TIPO_PERSONA debe ser un número positivo." })
  TIPO_PERSONA: number;

  @IsNumber()
  @Min(0, { message: "El SALDO_ACUMULADO debe ser un número positivo." })
  SALDO_ACUMULADO: number;

  @IsNumber()
  @Min(1, { message: "La CANTIDAD_CUENTA debe ser un número positivo." })
  CANTIDAD_CUENTA: number;

  @IsNumber()
  @Min(1, { message: "La RELACION_BANCO debe ser un número positivo." })
  RELACION_BANCO: number;

  constructor(data?: Partial<Anexo6DTO>) {
    this.NUMERO_CORRELATIVO = data?.NUMERO_CORRELATIVO || 1;
    this.TIPO_PERSONA = data?.TIPO_PERSONA || 1;
    this.SALDO_ACUMULADO = data?.SALDO_ACUMULADO || 0;
    this.CANTIDAD_CUENTA = data?.CANTIDAD_CUENTA || 1;
    this.RELACION_BANCO = data?.RELACION_BANCO || 1;
  }
}
