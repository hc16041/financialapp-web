import { IsNumber, Min } from "class-validator";

export class Anexo5DTO {
  @IsNumber()
  @Min(1, {
    message: "El CODIGO_DIAS_VENCIMIENTO debe ser un número positivo.",
  })
  CODIGO_DIAS_VENCIMIENTO: number;

  @IsNumber()
  @Min(0, {
    message: "El SALDO_DEPOSITO_VENCIMIENTO debe ser un número positivo.",
  })
  SALDO_DEPOSITO_VENCIMIENTO: number;

  @IsNumber()
  @Min(1, { message: "La CANTIDAD_CUENTA debe ser un número positivo." })
  CANTIDAD_CUENTA: number;

  @IsNumber()
  @Min(1, { message: "La CANTIDAD_DEPOSITANTE debe ser un número positivo." })
  CANTIDAD_DEPOSITANTE: number;

  constructor(data?: Partial<Anexo5DTO>) {
    this.CODIGO_DIAS_VENCIMIENTO = data?.CODIGO_DIAS_VENCIMIENTO || 1;
    this.SALDO_DEPOSITO_VENCIMIENTO = data?.SALDO_DEPOSITO_VENCIMIENTO || 0;
    this.CANTIDAD_CUENTA = data?.CANTIDAD_CUENTA || 1;
    this.CANTIDAD_DEPOSITANTE = data?.CANTIDAD_DEPOSITANTE || 1;
  }
}
