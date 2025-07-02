import { Type } from "class-transformer";
import {
  IsString,
  IsOptional,
  IsNumber,
  Min,
  IsDateString,
  Length,
  IsISO8601,
} from "class-validator";

export class GarantiaPrendaDTO {
  @IsString()
  @Length(3, 20, {
    message: "El IDENTIFICACION_GARANTIA debe tener entre 3 y 20 caracteres.",
  })
  IDENTIFICACION_GARANTIA: string;

  @IsOptional()
  @IsString()
  @Length(3, 100, {
    message: "La DENOMINACION_TITULO debe tener entre 3 y 100 caracteres.",
  })
  DENOMINACION_TITULO?: string | null;

  @IsString()
  @Length(1, 1, {
    message: "El LOCAL_EXTRANJERA debe ser 'L' (Local) o 'E' (Extranjera).",
  })
  LOCAL_EXTRANJERA: string;

  @IsNumber()
  @Min(0, { message: "El MONTO_INVERSION debe ser mayor o igual a 0." })
  MONTO_INVERSION: number;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_VENCIMIENTO: Date;

  @IsString()
  @Length(2, 50, {
    message: "La CLASIFICACION debe tener entre 2 y 50 caracteres.",
  })
  CLASIFICACION: string;

  @IsString()
  @Length(3, 100, {
    message: "El NOMBRE_CLASIFICADORA debe tener entre 3 y 100 caracteres.",
  })
  NOMBRE_CLASIFICADORA: string;

  constructor(data: Partial<GarantiaPrendaDTO> = {}) {
    this.IDENTIFICACION_GARANTIA = data.IDENTIFICACION_GARANTIA ?? "";
    this.DENOMINACION_TITULO = data.DENOMINACION_TITULO ?? null;
    this.LOCAL_EXTRANJERA = data.LOCAL_EXTRANJERA ?? "L";
    this.MONTO_INVERSION = data.MONTO_INVERSION ?? 0;
    this.FECHA_VENCIMIENTO = data.FECHA_VENCIMIENTO ?? new Date();
    this.CLASIFICACION = data.CLASIFICACION ?? "";
    this.NOMBRE_CLASIFICADORA = data.NOMBRE_CLASIFICADORA ?? "";
  }
}
