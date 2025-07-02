import { Type } from "class-transformer";
import {
  IsString,
  IsNumber,
  Min,
  Length,
  IsDateString,
  IsISO8601,
} from "class-validator";

export class GarantiaBonoDTO {
  @IsString()
  @Length(3, 20, {
    message: "El IDENTIFICACION_GARANTIA debe tener entre 3 y 20 caracteres.",
  })
  IDENTIFICACION_GARANTIA: string;

  @IsString()
  @Length(2, 10, {
    message: "El TIPO_PRENDA debe tener entre 2 y 10 caracteres.",
  })
  TIPO_PRENDA: string;

  @IsString()
  @Length(5, 255, {
    message: "La DESCRIPCION debe tener entre 5 y 255 caracteres.",
  })
  DESCRIPCION: string;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_CERTIFICADO: Date;

  @IsNumber()
  @Min(1, { message: "El VALOR_PRENDA debe ser mayor a 0." })
  VALOR_PRENDA: number;

  @IsNumber()
  @Min(0, { message: "El SALDO_PRENDA no puede ser menor a 0." })
  SALDO_PRENDA: number;

  @IsString()
  @Length(3, 20, {
    message: "El COD_ALMACENADORA debe tener entre 3 y 20 caracteres.",
  })
  COD_ALMACENADORA: string;

  constructor(data?: Partial<GarantiaBonoDTO>) {
    this.IDENTIFICACION_GARANTIA = data?.IDENTIFICACION_GARANTIA || "";
    this.TIPO_PRENDA = data?.TIPO_PRENDA || "";
    this.DESCRIPCION = data?.DESCRIPCION || "";
    this.FECHA_CERTIFICADO = data?.FECHA_CERTIFICADO || new Date();
    this.VALOR_PRENDA = data?.VALOR_PRENDA ?? 0;
    this.SALDO_PRENDA = data?.SALDO_PRENDA ?? 0;
    this.COD_ALMACENADORA = data?.COD_ALMACENADORA || "";
  }
}
