import { IsNumber, Min, IsString, Length } from "class-validator";

export class Anexo8DTO {
  @IsString()
  @Length(3, 3, {
    message: "El CODIGO_MONEDA_EXTRANJERA debe tener exactamente 3 caracteres.",
  })
  CODIGO_MONEDA_EXTRANJERA: string;

  @IsNumber()
  @Min(0, {
    message: "El SALDO_MONEDA_EXTRANJERA debe ser un número positivo.",
  })
  SALDO_MONEDA_EXTRANJERA: number;

  @IsNumber()
  @Min(0, { message: "El SALDO_DOLAR debe ser un número positivo." })
  SALDO_DOLAR: number;

  constructor(data?: Partial<Anexo8DTO>) {
    this.CODIGO_MONEDA_EXTRANJERA = data?.CODIGO_MONEDA_EXTRANJERA || "USD";
    this.SALDO_MONEDA_EXTRANJERA = data?.SALDO_MONEDA_EXTRANJERA || 0;
    this.SALDO_DOLAR = data?.SALDO_DOLAR || 0;
  }
}
