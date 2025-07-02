import { Type } from "class-transformer";
import {
  IsString,
  IsNumber,
  Min,
  Length,
  IsISO8601,
  IsBoolean,
} from "class-validator";

export class Anexo4DTO {
  @IsNumber()
  @Min(1, { message: "El id debe ser un número mayor o igual a 1." })
  id: number;

  @IsNumber()
  @Min(1, {
    message: "El correlativo_tema debe ser un número mayor o igual a 1.",
  })
  correlativo_tema: number;

  @IsString()
  @Length(3, 100, {
    message: "El tema_capacitacion debe tener entre 3 y 100 caracteres.",
  })
  tema_capacitacion: string;

  @IsNumber()
  @Min(1, {
    message: "El tipo_capacitacion debe ser un número mayor o igual a 1.",
  })
  tipo_capacitacion: number;

  @IsNumber()
  @Min(1, { message: "El mes_ejecucion debe ser un número mayor o igual a 1." })
  mes_ejecucion: number;

  @IsString()
  @Length(2, 50, {
    message: "La duracion debe tener entre 2 y 50 caracteres.",
  })
  duracion: string;

  @IsString()
  @Length(2, 50, {
    message: "El nombre_capacitador debe tener entre 2 y 50 caracteres.",
  })
  nombre_capacitador: string;

  @IsString()
  @Length(2, 50, {
    message: "El apellido_capacitador debe tener entre 2 y 50 caracteres.",
  })
  apellido_capacitador: string;

  @IsString()
  @Length(3, 100, {
    message: "El personal_objetivo debe tener entre 3 y 100 caracteres.",
  })
  personal_objetivo: string;

  @IsNumber()
  @Min(1, {
    message: "El numero_participantes debe ser un número mayor o igual a 1.",
  })
  numero_participantes: number;

  @IsNumber()
  @Min(1, { message: "La modalidad debe ser un número mayor o igual a 1." })
  modalidad: number;

  @IsNumber()
  @Min(1, {
    message: "El registro_asistencia debe ser un número mayor o igual a 1.",
  })
  registro_asistencia: number;

  @IsString()
  @Length(3, 200, {
    message: "La evaluacion debe tener entre 3 y 200 caracteres.",
  })
  evaluacion: string;

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
    message: "El cod_usuario_modificacion debe tener hasta 50 caracteres.",
  })
  @IsString()
  cod_usuario_modificacion: string;

  @IsBoolean()
  activo: boolean;

  constructor(data?: Partial<Anexo4DTO>) {
    this.id = data?.id ?? 0;
    this.correlativo_tema = data?.correlativo_tema ?? 0;
    this.tema_capacitacion = data?.tema_capacitacion || "";
    this.tipo_capacitacion = data?.tipo_capacitacion ?? 0;
    this.mes_ejecucion = data?.mes_ejecucion ?? 0;
    this.duracion = data?.duracion || "";
    this.nombre_capacitador = data?.nombre_capacitador || "";
    this.apellido_capacitador = data?.apellido_capacitador || "";
    this.personal_objetivo = data?.personal_objetivo || "";
    this.numero_participantes = data?.numero_participantes ?? 0;
    this.modalidad = data?.modalidad ?? 0;
    this.registro_asistencia = data?.registro_asistencia ?? 0;
    this.evaluacion = data?.evaluacion || "";
    this.fecha_creacion = data?.fecha_creacion || new Date();
    this.fecha_actualizacion = data?.fecha_actualizacion || new Date();
    this.cod_usuario = data?.cod_usuario || "";
    this.cod_usuario_modificacion = data?.cod_usuario_modificacion || "";
    this.activo = data?.activo ?? true;
  }
}
