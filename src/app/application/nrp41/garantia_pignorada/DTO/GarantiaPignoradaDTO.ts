import { Type } from "class-transformer";
import { IsString, IsNumber, IsISO8601, Length, Min } from "class-validator";

export class GarantiaPignoradaDTO {
  @IsString()
  IDENTIFICACION_GARANTIA: string;

  @IsString()
  @Length(14, 14, { message: "NIT_DEPOSITANTE debe tener 14 caracteres" })
  NIT_DEPOSITANTE: string;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_DEPOSITO: Date;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_VENCIMIENTO: Date;

  @IsNumber()
  @Min(0, { message: "VALOR_DEPOSITO no puede ser negativo" })
  VALOR_DEPOSITO: number;

  @IsString()
  TIPO_DEPOSITO: string;

  @IsString()
  COD_BANCO: string;

  constructor(data?: Partial<GarantiaPignoradaDTO>) {
    this.IDENTIFICACION_GARANTIA = data?.IDENTIFICACION_GARANTIA || "";
    this.NIT_DEPOSITANTE = data?.NIT_DEPOSITANTE || "";
    this.FECHA_DEPOSITO = data?.FECHA_DEPOSITO || new Date();
    this.FECHA_VENCIMIENTO = data?.FECHA_VENCIMIENTO || new Date();
    this.VALOR_DEPOSITO = data?.VALOR_DEPOSITO ?? 0;
    this.TIPO_DEPOSITO = data?.TIPO_DEPOSITO || "";
    this.COD_BANCO = data?.COD_BANCO || "";
  }
}
