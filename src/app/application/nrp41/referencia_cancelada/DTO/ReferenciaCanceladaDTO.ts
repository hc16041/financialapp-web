import { Type } from "class-transformer";
import {
  IsString,
  IsNumber,
  Length,
  Min,
  IsISO8601,
  IsDateString,
} from "class-validator";

export class ReferenciaCanceladaDTO {
  @IsString()
  @Length(2, 2, { message: "COD_CARTERA debe tener 2 caracteres" })
  COD_CARTERA: string;

  @IsString()
  @Length(2, 2, { message: "COD_ACTIVO debe tener 2 caracteres" })
  COD_ACTIVO: string;

  @IsString()
  @Length(6, 6, { message: "NUM_REFERENCIA debe tener 6 caracteres" })
  NUM_REFERENCIA: string;

  @IsString()
  @Length(2, 2, { message: "COD_CARTERA_CANC debe tener 2 caracteres" })
  COD_CARTERA_CANC: string;

  @IsString()
  @Length(2, 2, { message: "COD_ACTIVO_CANC debe tener 2 caracteres" })
  COD_ACTIVO_CANC: string;

  @IsString()
  @Length(6, 6, { message: "NUM_REFERENCIA_CANC debe tener 6 caracteres" })
  NUM_REFERENCIA_CANC: string;

  @IsNumber()
  @Min(0, { message: "PAGO_CAPITAL no puede ser negativo" })
  PAGO_CAPITAL: number;

  @IsNumber()
  @Min(0, { message: "PAGO_INTERES no puede ser negativo" })
  PAGO_INTERES: number;

  @IsNumber()
  @Min(0, { message: "SALDO_TOTAL_INTERES no puede ser negativo" })
  SALDO_TOTAL_INTERES: number;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_CANCELACION: Date;

  constructor(data?: Partial<ReferenciaCanceladaDTO>) {
    this.COD_CARTERA = data?.COD_CARTERA || "";
    this.COD_ACTIVO = data?.COD_ACTIVO || "";
    this.NUM_REFERENCIA = data?.NUM_REFERENCIA || "";
    this.COD_CARTERA_CANC = data?.COD_CARTERA_CANC || "";
    this.COD_ACTIVO_CANC = data?.COD_ACTIVO_CANC || "";
    this.NUM_REFERENCIA_CANC = data?.NUM_REFERENCIA_CANC || "";
    this.PAGO_CAPITAL = data?.PAGO_CAPITAL ?? 0;
    this.PAGO_INTERES = data?.PAGO_INTERES ?? 0;
    this.SALDO_TOTAL_INTERES = data?.SALDO_TOTAL_INTERES ?? 0;
    this.FECHA_CANCELACION = data?.FECHA_CANCELACION || new Date();
  }
}
