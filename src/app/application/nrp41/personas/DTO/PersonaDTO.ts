import {
  IsString,
  IsNumber,
  IsISO8601,
  IsIn,
  IsOptional,
  Length,
  Min,
  Max,
} from "class-validator";
import { Type } from "class-transformer";

export class PersonaDTO {
  @IsString()
  @Length(14, 14, { message: "NIT_PERSONA debe tener 14 caracteres" })
  NIT_PERSONA: string;

  @IsString()
  @Length(9, 9, { message: "DUI debe tener 9 caracteres" })
  DUI: string;

  @IsString()
  PRIMER_APELLIDO: string;

  @IsOptional()
  @IsString()
  SEGUNDO_APELLIDO?: string | null;

  @IsOptional()
  @IsString()
  APELLIDO_CASADA?: string | null;

  @IsString()
  PRIMER_NOMBRE: string;

  @IsOptional()
  @IsString()
  SEGUNDO_NOMBRE?: string | null;

  @IsOptional()
  @IsString()
  NOMBRE_SOCIEDAD?: string | null;

  @IsString()
  @IsIn(["F", "J"], { message: "TIPO_PERSONA debe ser F o J" })
  TIPO_PERSONA: string;

  @IsOptional()
  @IsString()
  TIPO_RELACION?: string | null;

  @IsOptional()
  @IsString()
  TIPO_IDENTIFICADOR?: string | null;

  @IsOptional()
  @IsString()
  NIT_DESACTUALIZADO?: string | null;

  @IsString()
  RESIDENTE: string;

  @IsString()
  GIRO_PERSONA: string;

  @IsString()
  TAMANO_EMPRESA: string;

  @IsOptional()
  @IsString()
  TIPO_EMPRESA?: string | null;

  @IsNumber()
  @Min(0)
  RESERVA: number;

  @IsString()
  CATEGORIA_RIESGO: string;

  @IsString()
  NUMERO_CLIENTE: string;

  @IsString()
  ID_ALTERNO: string;

  @IsOptional()
  @IsString()
  TIPO_ID_ALTERNO?: string | null;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_NACIMIENTO: Date;

  @IsNumber()
  PAIS_RESIDENCIA: number;

  @IsNumber()
  RIESGO_CONSOLIDADO: number;

  @IsString()
  SEXO_PERSONA: string;

  @IsString()
  OCUPACION: string;

  @IsOptional()
  @IsString()
  ID_PAIS_ORIGEN?: string | null;

  @IsNumber()
  NACIONALIDAD: number;

  @IsOptional()
  @IsString()
  NIT_ANTERIOR?: string | null;

  @IsOptional()
  @IsString()
  TIPO_IDENT_ANTERIOR?: string | null;

  @IsOptional()
  @IsString()
  DISTRITO_RESIDENCIA?: string | null;

  constructor(data?: Partial<PersonaDTO>) {
    this.NIT_PERSONA = data?.NIT_PERSONA || "";
    this.DUI = data?.DUI || "";
    this.PRIMER_APELLIDO = data?.PRIMER_APELLIDO || "";
    this.SEGUNDO_APELLIDO = data?.SEGUNDO_APELLIDO || null;
    this.APELLIDO_CASADA = data?.APELLIDO_CASADA || null;
    this.PRIMER_NOMBRE = data?.PRIMER_NOMBRE || "";
    this.SEGUNDO_NOMBRE = data?.SEGUNDO_NOMBRE || null;
    this.NOMBRE_SOCIEDAD = data?.NOMBRE_SOCIEDAD || null;
    this.TIPO_PERSONA = data?.TIPO_PERSONA || "";
    this.TIPO_RELACION = data?.TIPO_RELACION || null;
    this.TIPO_IDENTIFICADOR = data?.TIPO_IDENTIFICADOR || null;
    this.NIT_DESACTUALIZADO = data?.NIT_DESACTUALIZADO || null;
    this.RESIDENTE = data?.RESIDENTE || "";
    this.GIRO_PERSONA = data?.GIRO_PERSONA || "";
    this.TAMANO_EMPRESA = data?.TAMANO_EMPRESA || "";
    this.TIPO_EMPRESA = data?.TIPO_EMPRESA || null;
    this.RESERVA = data?.RESERVA ?? 0;
    this.CATEGORIA_RIESGO = data?.CATEGORIA_RIESGO || "";
    this.NUMERO_CLIENTE = data?.NUMERO_CLIENTE || "";
    this.ID_ALTERNO = data?.ID_ALTERNO || "";
    this.TIPO_ID_ALTERNO = data?.TIPO_ID_ALTERNO || null;
    this.FECHA_NACIMIENTO = data?.FECHA_NACIMIENTO || new Date();
    this.PAIS_RESIDENCIA = data?.PAIS_RESIDENCIA ?? 0;
    this.RIESGO_CONSOLIDADO = data?.RIESGO_CONSOLIDADO ?? 0;
    this.SEXO_PERSONA = data?.SEXO_PERSONA || "";
    this.OCUPACION = data?.OCUPACION || "";
    this.ID_PAIS_ORIGEN = data?.ID_PAIS_ORIGEN || null;
    this.NACIONALIDAD = data?.NACIONALIDAD ?? 0;
    this.NIT_ANTERIOR = data?.NIT_ANTERIOR || null;
    this.TIPO_IDENT_ANTERIOR = data?.TIPO_IDENT_ANTERIOR || null;
    this.DISTRITO_RESIDENCIA = data?.DISTRITO_RESIDENCIA || null;
  }
}
