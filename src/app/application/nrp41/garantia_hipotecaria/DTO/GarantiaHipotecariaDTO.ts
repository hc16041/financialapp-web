import { Type } from "class-transformer";
import { IsString, IsNumber, IsISO8601, Min, Length } from "class-validator";

export class GarantiaHipotecariaDTO {
  @IsString()
  IDENTIFICACION_GARANTIA: string;

  @IsString()
  NUMERO_REGISTRO: string;

  @IsString()
  @Length(14, 14, { message: "NIT_PROPIETARIO debe tener 14 caracteres" })
  NIT_PROPIETARIO: string;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_REGISTRO: Date;

  @IsString()
  ESTADO: string;

  @IsString()
  COD_UBICACION: string;

  @IsString()
  DESCRIPCION: string;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_VALUO: Date;

  @IsNumber()
  @Min(0)
  VALOR_PERICIAL: number;

  @IsNumber()
  @Min(0)
  VALOR_CONTRACTUAL: number;

  @IsNumber()
  @Min(0)
  VALOR_MERCADO: number;

  @IsNumber()
  @Min(0)
  GRADO_HIPOTECA: number;

  @IsString()
  DIRECCION_GTIA: string;

  @IsString()
  COD_PERITO: string;

  @IsString()
  NOMBRE_PERITO: string;

  @IsString()
  TIPO_PERITO: string;

  constructor(data?: Partial<GarantiaHipotecariaDTO>) {
    this.IDENTIFICACION_GARANTIA = data?.IDENTIFICACION_GARANTIA || "";
    this.NUMERO_REGISTRO = data?.NUMERO_REGISTRO || "";
    this.NIT_PROPIETARIO = data?.NIT_PROPIETARIO || "";
    this.FECHA_REGISTRO = data?.FECHA_REGISTRO || new Date();
    this.ESTADO = data?.ESTADO || "";
    this.COD_UBICACION = data?.COD_UBICACION || "";
    this.DESCRIPCION = data?.DESCRIPCION || "";
    this.FECHA_VALUO = data?.FECHA_VALUO || new Date();
    this.VALOR_PERICIAL = data?.VALOR_PERICIAL ?? 0;
    this.VALOR_CONTRACTUAL = data?.VALOR_CONTRACTUAL ?? 0;
    this.VALOR_MERCADO = data?.VALOR_MERCADO ?? 0;
    this.GRADO_HIPOTECA = data?.GRADO_HIPOTECA ?? 0;
    this.DIRECCION_GTIA = data?.DIRECCION_GTIA || "";
    this.COD_PERITO = data?.COD_PERITO || "";
    this.NOMBRE_PERITO = data?.NOMBRE_PERITO || "";
    this.TIPO_PERITO = data?.TIPO_PERITO || "";
  }
}
