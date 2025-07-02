import { IsNumber, Min } from "class-validator";

export class Anexo10DTO {
  @IsNumber()
  @Min(1, { message: "El CODIGO_MONTO_DEPOSITO debe ser un número positivo." })
  CODIGO_MONTO_DEPOSITO: number;

  @IsNumber()
  @Min(1, { message: "El TIPO_CUENTA debe ser un número positivo." })
  TIPO_CUENTA: number;

  @IsNumber()
  @Min(0, { message: "El MONTO_DEPOSITO debe ser un número positivo." })
  MONTO_DEPOSITO: number;

  @IsNumber()
  @Min(0, {
    message: "La CANTIDAD_CUENTA_HOMBRES debe ser un número positivo.",
  })
  CANTIDAD_CUENTA_HOMBRES: number;

  @IsNumber()
  @Min(0, {
    message: "La CANTIDAD_CUENTA_MUJERES debe ser un número positivo.",
  })
  CANTIDAD_CUENTA_MUJERES: number;

  @IsNumber()
  @Min(0, {
    message: "La CANTIDAD_CUENTA_JURIDICAS debe ser un número positivo.",
  })
  CANTIDAD_CUENTA_JURIDICAS: number;

  @IsNumber()
  @Min(0, {
    message: "La CANTIDAD_DEPOSITANTE_HOMBRES debe ser un número positivo.",
  })
  CANTIDAD_DEPOSITANTE_HOMBRES: number;

  @IsNumber()
  @Min(0, {
    message: "La CANTIDAD_DEPOSITANTE_MUJERES debe ser un número positivo.",
  })
  CANTIDAD_DEPOSITANTE_MUJERES: number;

  @IsNumber()
  @Min(0, {
    message: "La CANTIDAD_DEPOSITANTE_JURIDICAS debe ser un número positivo.",
  })
  CANTIDAD_DEPOSITANTE_JURIDICAS: number;

  constructor(data?: Partial<Anexo10DTO>) {
    this.CODIGO_MONTO_DEPOSITO = data?.CODIGO_MONTO_DEPOSITO || 0;
    this.TIPO_CUENTA = data?.TIPO_CUENTA || 0;
    this.MONTO_DEPOSITO = data?.MONTO_DEPOSITO || 0;
    this.CANTIDAD_CUENTA_HOMBRES = data?.CANTIDAD_CUENTA_HOMBRES || 0;
    this.CANTIDAD_CUENTA_MUJERES = data?.CANTIDAD_CUENTA_MUJERES || 0;
    this.CANTIDAD_CUENTA_JURIDICAS = data?.CANTIDAD_CUENTA_JURIDICAS || 0;
    this.CANTIDAD_DEPOSITANTE_HOMBRES = data?.CANTIDAD_DEPOSITANTE_HOMBRES || 0;
    this.CANTIDAD_DEPOSITANTE_MUJERES = data?.CANTIDAD_DEPOSITANTE_MUJERES || 0;
    this.CANTIDAD_DEPOSITANTE_JURIDICAS =
      data?.CANTIDAD_DEPOSITANTE_JURIDICAS || 0;
  }
}
