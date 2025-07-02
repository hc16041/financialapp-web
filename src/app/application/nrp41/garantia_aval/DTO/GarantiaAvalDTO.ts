import { Type } from "class-transformer";
import {
  IsString,
  IsNumber,
  Length,
  Min,
  IsISO8601,
  IsOptional,
} from "class-validator";

export class GarantiaAvalDTO {
  @IsString()
  @Length(6, 6, { message: "NUM_REFERENCIA debe tener 6 caracteres" })
  NUM_REFERENCIA: string;

  @IsString()
  @Length(2, 2, { message: "COD_CARTERA debe tener 2 caracteres" })
  COD_CARTERA: string;

  @IsString()
  @Length(2, 2, { message: "COD_ACTIVO debe tener 2 caracteres" })
  COD_ACTIVO: string;

  @IsString()
  IDENTIFICACION_GARANTIA: string;

  @IsString()
  COD_BANCO: string;

  @IsNumber()
  @Min(0, { message: "MONTO_AVAL no puede ser negativo" })
  MONTO_AVAL: number;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_OTORGAMIENTO: Date;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_VENCIMIENTO: Date;

  constructor(data?: Partial<GarantiaAvalDTO>) {
    this.NUM_REFERENCIA = data?.NUM_REFERENCIA || "";
    this.COD_CARTERA = data?.COD_CARTERA || "";
    this.COD_ACTIVO = data?.COD_ACTIVO || "";
    this.IDENTIFICACION_GARANTIA = data?.IDENTIFICACION_GARANTIA || "";
    this.COD_BANCO = data?.COD_BANCO || "";
    this.MONTO_AVAL = data?.MONTO_AVAL ?? 0;
    this.FECHA_OTORGAMIENTO = data?.FECHA_OTORGAMIENTO || new Date();
    this.FECHA_VENCIMIENTO = data?.FECHA_VENCIMIENTO || new Date();
  }
}
