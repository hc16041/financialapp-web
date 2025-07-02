import { Type } from "class-transformer";
import {
  IsString,
  IsNumber,
  IsEmail,
  Length,
  Min,
  Max,
  IsOptional,
  IsDateString,
  IsISO8601,
} from "class-validator";

export class ClientesDTO {
  @IsString()
  @Length(4, 4, { message: "El NIU debe tener exactamente 4 caracteres." })
  NIU: string;

  @IsString()
  @Length(1, 50, {
    message: "El PRIMER_NOMBRE debe tener entre 1 y 50 caracteres.",
  })
  PRIMER_NOMBRE: string;

  @IsOptional()
  @IsString()
  @Length(0, 50, {
    message: "El SEGUNDO_NOMBRE no debe exceder los 50 caracteres.",
  })
  SEGUNDO_NOMBRE?: string;

  @IsOptional()
  @IsString()
  @Length(0, 50, {
    message: "El TERCER_NOMBRE no debe exceder los 50 caracteres.",
  })
  TERCER_NOMBRE?: string;

  @IsString()
  @Length(1, 50, {
    message: "El PRIMER_APELLIDO debe tener entre 1 y 50 caracteres.",
  })
  PRIMER_APELLIDO: string;

  @IsOptional()
  @IsString()
  @Length(0, 50, {
    message: "El SEGUNDO_APELLIDO no debe exceder los 50 caracteres.",
  })
  SEGUNDO_APELLIDO?: string;

  @IsOptional()
  @IsString()
  @Length(0, 50, {
    message: "El APELLIDO_CASADA no debe exceder los 50 caracteres.",
  })
  APELLIDO_CASADA?: string;

  @IsOptional()
  @IsString()
  @Length(0, 100, {
    message: "La RAZON_SOCIAL no debe exceder los 100 caracteres.",
  })
  RAZON_SOCIAL?: string;

  @IsString()
  @Length(1, 1, {
    message: "El TIPO_PERSONA debe tener exactamente 1 caracter.",
  })
  TIPO_PERSONA: string;

  @IsString()
  @Length(4, 4, {
    message: "La NACIONALIDAD debe tener exactamente 4 caracteres.",
  })
  NACIONALIDAD: string;

  @IsString()
  @Length(6, 6, {
    message: "La ACTIVIDAD_ECONOMICA debe tener exactamente 6 caracteres.",
  })
  ACTIVIDAD_ECONOMICA: string;

  @IsString()
  @Length(4, 4, {
    message: "El PAIS_RESIDENCIA debe tener exactamente 4 caracteres.",
  })
  PAIS_RESIDENCIA: string;

  @IsString()
  @Length(2, 2, {
    message: "El DEPARTAMENTO debe tener exactamente 2 caracteres.",
  })
  DEPARTAMENTO: string;

  @IsString()
  @Length(2, 2, { message: "El DISTRITO debe tener exactamente 2 caracteres." })
  DISTRITO: string;

  @IsString()
  @Length(5, 255, {
    message: "La DIRECCION debe tener entre 5 y 255 caracteres.",
  })
  DIRECCION: string;

  @IsOptional()
  @IsString()
  @Length(8, 9, {
    message: "El NUMERO_TELEFONO_FIJO debe tener entre 8 y 9 caracteres.",
  })
  NUMERO_TELEFONO_FIJO?: string;

  @IsString()
  @Length(8, 9, {
    message: "El NUMERO_CELULAR debe tener entre 8 y 9 caracteres.",
  })
  NUMERO_CELULAR: string;

  @IsEmail({}, { message: "El CORREO_ELECTRONICO debe ser un email válido." })
  CORREO_ELECTRONICO: string;

  @IsString()
  @Length(1, 1, {
    message: "El ES_RESIDENTE debe tener exactamente 1 caracter.",
  })
  ES_RESIDENTE: string;

  @IsString()
  @Length(1, 1, {
    message: "El TIPO_SECTOR debe tener exactamente 1 caracter.",
  })
  TIPO_SECTOR: string;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_NACIMIENTO: Date;

  @IsString()
  @Length(1, 1, { message: "El GENERO debe tener exactamente 1 caracter." })
  GENERO: string;

  @IsString()
  @Length(1, 1, {
    message: "El ESTADO_CIVIL debe tener exactamente 1 caracter.",
  })
  ESTADO_CIVIL: string;

  @IsString()
  @Length(2, 2, {
    message: "La CLASIFICACION_RIESGO debe tener exactamente 2 caracteres.",
  })
  CLASIFICACION_RIESGO: string;

  @IsString()
  @Length(1, 1, {
    message: "El TIPO_RELACION debe tener exactamente 1 caracter.",
  })
  TIPO_RELACION: string;

  @IsString()
  @Length(1, 1, { message: "La AGENCIA debe tener exactamente 1 caracter." })
  AGENCIA: string;

  @IsNumber()
  @Min(0, { message: "El SALDO_GARANTIZADO no puede ser menor a 0." })
  SALDO_GARANTIZADO: number;

  constructor(data?: Partial<ClientesDTO>) {
    this.NIU = data?.NIU || "";
    this.PRIMER_NOMBRE = data?.PRIMER_NOMBRE || "";
    this.SEGUNDO_NOMBRE = data?.SEGUNDO_NOMBRE || "";
    this.TERCER_NOMBRE = data?.TERCER_NOMBRE || "";
    this.PRIMER_APELLIDO = data?.PRIMER_APELLIDO || "";
    this.SEGUNDO_APELLIDO = data?.SEGUNDO_APELLIDO || "";
    this.APELLIDO_CASADA = data?.APELLIDO_CASADA || "";
    this.RAZON_SOCIAL = data?.RAZON_SOCIAL || "";
    this.TIPO_PERSONA = data?.TIPO_PERSONA || "";
    this.NACIONALIDAD = data?.NACIONALIDAD || "";
    this.ACTIVIDAD_ECONOMICA = data?.ACTIVIDAD_ECONOMICA || "";
    this.PAIS_RESIDENCIA = data?.PAIS_RESIDENCIA || "";
    this.DEPARTAMENTO = data?.DEPARTAMENTO || "";
    this.DISTRITO = data?.DISTRITO || "";
    this.DIRECCION = data?.DIRECCION || "";
    this.NUMERO_TELEFONO_FIJO = data?.NUMERO_TELEFONO_FIJO || "";
    this.NUMERO_CELULAR = data?.NUMERO_CELULAR || "";
    this.CORREO_ELECTRONICO = data?.CORREO_ELECTRONICO || "";
    this.ES_RESIDENTE = data?.ES_RESIDENTE || "";
    this.TIPO_SECTOR = data?.TIPO_SECTOR || "";
    this.FECHA_NACIMIENTO = data?.FECHA_NACIMIENTO || new Date();
    this.GENERO = data?.GENERO || "";
    this.ESTADO_CIVIL = data?.ESTADO_CIVIL || "";
    this.CLASIFICACION_RIESGO = data?.CLASIFICACION_RIESGO || "";
    this.TIPO_RELACION = data?.TIPO_RELACION || "";
    this.AGENCIA = data?.AGENCIA || "";
    this.SALDO_GARANTIZADO = data?.SALDO_GARANTIZADO ?? 0;
  }
}
