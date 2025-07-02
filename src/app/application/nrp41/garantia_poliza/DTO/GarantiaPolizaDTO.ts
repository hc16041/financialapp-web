import { Type } from "class-transformer";
import {
  IsString,
  IsNumber,
  Min,
  Length,
  IsDateString,
  IsISO8601,
} from "class-validator";

export class GarantiaPolizaDTO {
  @IsString()
  @Length(3, 20, {
    message: "El IDENTIFICACION_GARANTIA debe tener entre 3 y 20 caracteres.",
  })
  IDENTIFICACION_GARANTIA: string;

  @IsNumber()
  @Min(1, { message: "El MONTO_POLIZA debe ser mayor a 0." })
  MONTO_POLIZA: number;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_INICIAL: Date;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_FINAL: Date;

  @IsString()
  @Length(3, 100, {
    message: "El NOMBRE_ASEGURADO debe tener entre 3 y 100 caracteres.",
  })
  NOMBRE_ASEGURADO: string;

  @IsNumber()
  @Min(0, { message: "El MONTO_RESERVA no puede ser menor a 0." })
  MONTO_RESERVA: number;

  @IsNumber()
  @Min(1, { message: "El VALOR_GARANTIA debe ser mayor a 0." })
  VALOR_GARANTIA: number;

  constructor(data?: Partial<GarantiaPolizaDTO>) {
    this.IDENTIFICACION_GARANTIA = data?.IDENTIFICACION_GARANTIA || "";
    this.MONTO_POLIZA = data?.MONTO_POLIZA ?? 0;
    this.FECHA_INICIAL = data?.FECHA_INICIAL || new Date();
    this.FECHA_FINAL = data?.FECHA_FINAL || new Date();
    this.NOMBRE_ASEGURADO = data?.NOMBRE_ASEGURADO || "";
    this.MONTO_RESERVA = data?.MONTO_RESERVA ?? 0;
    this.VALOR_GARANTIA = data?.VALOR_GARANTIA ?? 0;
  }
}
