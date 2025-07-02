import { Type } from "class-transformer";
import {
  IsString,
  IsNumber,
  IsISO8601,
  IsBoolean,
  Length,
} from "class-validator";

export class Anexo8DTO {
  @IsNumber()
  id: number;

  @IsString()
  @Length(1, 50, { message: "La referencia del documento es obligatoria." })
  ref_documento: string;

  @IsString()
  @Length(3, 100, { message: "El nombre del documento debe ser válido." })
  nombre_documento: string;

  @IsString()
  @Length(1, 20, { message: "El número de versión debe ser válido." })
  numero_version: string;

  @IsString()
  @Length(2, 50, { message: "El nombre del elaborador debe ser válido." })
  nombre_elaborado: string;

  @IsString()
  @Length(2, 50, { message: "El apellido del elaborador debe ser válido." })
  apellido_elaborado: string;

  @IsString()
  @Length(2, 50, { message: "El nombre del revisor debe ser válido." })
  nombre_revisado: string;

  @IsString()
  @Length(2, 50, { message: "El apellido del revisor debe ser válido." })
  apellido_revisado: string;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  fecha_elaboracion: Date;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  fecha_presentacion: Date;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  fecha_autorizacion: Date;

  @IsString()
  @Length(1, 50, { message: "El número de acta es obligatorio." })
  numero_acta_aprobacion: string;

  @IsString()
  @Length(1, 50, { message: "El punto de acta es obligatorio." })
  numero_punto_acta: string;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  fecha_vigencia: Date;

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
  @Length(0, 50, {
    message: "El cod_usuario_modificacion debe tener entre 0 y 50 caracteres.",
  })
  @IsString()
  cod_usuario_modificacion: string;

  @IsBoolean({ message: "El campo activo debe ser booleano." })
  activo: boolean;

  constructor(data?: Partial<Anexo8DTO>) {
    this.id = data?.id ?? 0;
    this.ref_documento = data?.ref_documento || "";
    this.nombre_documento = data?.nombre_documento || "";
    this.numero_version = data?.numero_version || "";
    this.nombre_elaborado = data?.nombre_elaborado || "";
    this.apellido_elaborado = data?.apellido_elaborado || "";
    this.nombre_revisado = data?.nombre_revisado || "";
    this.apellido_revisado = data?.apellido_revisado || "";
    this.fecha_elaboracion = data?.fecha_elaboracion || new Date();
    this.fecha_presentacion = data?.fecha_presentacion || new Date();
    this.fecha_autorizacion = data?.fecha_autorizacion || new Date();
    this.numero_acta_aprobacion = data?.numero_acta_aprobacion || "";
    this.numero_punto_acta = data?.numero_punto_acta || "";
    this.fecha_vigencia = data?.fecha_vigencia || new Date();
    this.fecha_creacion = data?.fecha_creacion || new Date();
    this.fecha_actualizacion = data?.fecha_actualizacion || new Date();
    this.cod_usuario = data?.cod_usuario || "";
    this.cod_usuario_modificacion = data?.cod_usuario_modificacion || "";
    this.activo = data?.activo ?? true;
  }
}
