import { Type } from "class-transformer";
import {
  IsString,
  IsNumber,
  Min,
  Length,
  IsDateString,
  IsISO8601,
  IsEmail,
  IsBoolean,
} from "class-validator";

export class Anexo2DTO {
  @IsNumber()
  @Min(1, { message: "El id debe ser un número mayor o igual a 1." })
  id: number;

  @IsNumber()
  @Min(1, { message: "El rol_oficial debe ser un número mayor o igual a 1." })
  rol_oficial: number;

  @IsString()
  @Length(8, 20, {
    message: "El numero_documento debe tener entre 8 y 20 caracteres.",
  })
  numero_documento: string;

  @IsString()
  @Length(2, 50, {
    message: "El primer_nombre debe tener entre 2 y 50 caracteres.",
  })
  primer_nombre: string;

  @IsString()
  @Length(2, 50, {
    message: "El segundo_nombre debe tener entre 2 y 50 caracteres.",
  })
  segundo_nombre: string;

  @IsString()
  @Length(2, 50, {
    message: "El primer_apellido debe tener entre 2 y 50 caracteres.",
  })
  primer_apellido: string;

  @IsString()
  @Length(2, 50, {
    message: "El segundo_apellido debe tener entre 2 y 50 caracteres.",
  })
  segundo_apellido: string;

  @IsString()
  @Length(2, 50, {
    message: "El apellido_casada debe tener entre 2 y 50 caracteres.",
  })
  apellido_casada: string;

  @IsString()
  @Length(3, 100, {
    message: "El titulo_universitario debe tener entre 3 y 100 caracteres.",
  })
  titulo_universitario: string;

  @IsString()
  @Length(3, 100, {
    message: "El nombre_cargo debe tener entre 3 y 100 caracteres.",
  })
  nombre_cargo: string;

  @IsString()
  @Length(3, 100, {
    message: "El lugar_residencia debe tener entre 3 y 100 caracteres.",
  })
  lugar_residencia: string;

  @IsNumber()
  @Min(1, {
    message: "El tipo_comunicacion debe ser un número mayor o igual a 1.",
  })
  tipo_comunicacion: number;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  fecha_efectiva: Date;

  @IsString()
  @Length(3, 100, {
    message: "El organo_gobierno debe tener entre 3 y 100 caracteres.",
  })
  organo_gobierno: string;

  @IsString()
  @Length(1, 50, {
    message: "El numero_acta_aprobacion debe tener entre 1 y 50 caracteres.",
  })
  numero_acta_aprobacion: string;

  @IsString()
  @Length(1, 50, {
    message: "El numero_punto_acta debe tener entre 1 y 50 caracteres.",
  })
  numero_punto_acta: string;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  fecha_aprobacion: Date;

  @IsEmail({}, { message: "El correo_electronico debe ser un correo válido." })
  correo_electronico: string;

  @IsString()
  @Length(8, 15, {
    message: "El numero_telefono debe tener entre 8 y 15 caracteres.",
  })
  numero_telefono: string;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  fecha_creacion: Date;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  fecha_actualizacion: Date;

  @IsString()
  @Length(3, 50, {
    message: "El cod_usuario debe tener entre 3 y 50 caracteres.",
  })
  cod_usuario: string;

  @IsString()
  @Length(3, 50, {
    message: "El cod_usuario_modificacion debe tener entre 3 y 50 caracteres.",
  })
  @IsString()
  cod_usuario_modificacion: string;

  @IsBoolean()
  activo: boolean;

  constructor(data?: Partial<Anexo2DTO>) {
    this.id = data?.id ?? 0;
    this.rol_oficial = data?.rol_oficial ?? 0;
    this.numero_documento = data?.numero_documento || "";
    this.primer_nombre = data?.primer_nombre || "";
    this.segundo_nombre = data?.segundo_nombre || "";
    this.primer_apellido = data?.primer_apellido || "";
    this.segundo_apellido = data?.segundo_apellido || "";
    this.apellido_casada = data?.apellido_casada || "";
    this.titulo_universitario = data?.titulo_universitario || "";
    this.nombre_cargo = data?.nombre_cargo || "";
    this.lugar_residencia = data?.lugar_residencia || "";
    this.tipo_comunicacion = data?.tipo_comunicacion ?? 0;
    this.fecha_efectiva = data?.fecha_efectiva || new Date();
    this.organo_gobierno = data?.organo_gobierno || "";
    this.numero_acta_aprobacion = data?.numero_acta_aprobacion || "";
    this.numero_punto_acta = data?.numero_punto_acta || "";
    this.fecha_aprobacion = data?.fecha_aprobacion || new Date();
    this.correo_electronico = data?.correo_electronico || "";
    this.numero_telefono = data?.numero_telefono || "";
    this.fecha_creacion = data?.fecha_creacion || new Date();
    this.fecha_actualizacion = data?.fecha_actualizacion || new Date();
    this.cod_usuario = data?.cod_usuario || "";
    this.cod_usuario_modificacion = data?.cod_usuario_modificacion || "";
    this.activo = data?.activo ?? true;
  }
}
