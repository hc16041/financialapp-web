import { Type } from "class-transformer";
import {
  IsString,
  IsNumber,
  Min,
  Length,
  IsISO8601,
  IsBoolean,
} from "class-validator";

export class Anexo3DTO {
  @IsNumber()
  @Min(1, { message: "El id debe ser un número mayor o igual a 1." })
  id: number;

  @IsNumber()
  @Min(0, { message: "El periodo_plan debe ser un número mayor o igual a 0." })
  periodo_plan: number;

  @IsString()
  @Length(2, 100, {
    message:
      "El nombre_responsable_elaboracion debe tener entre 2 y 100 caracteres.",
  })
  nombre_responsable_elaboracion: string;

  @IsString()
  @Length(2, 100, {
    message:
      "El apellido_responsable_elaboracion debe tener entre 2 y 100 caracteres.",
  })
  apellido_responsable_elaboracion: string;

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
  cod_usuario_modificacion: string;

  @IsBoolean()
  activo: boolean;

  constructor(data?: Partial<Anexo3DTO>) {
    this.id = data?.id ?? 0;
    this.periodo_plan = data?.periodo_plan ?? 0;
    this.nombre_responsable_elaboracion =
      data?.nombre_responsable_elaboracion || "";
    this.apellido_responsable_elaboracion =
      data?.apellido_responsable_elaboracion || "";
    this.organo_gobierno = data?.organo_gobierno || "";
    this.numero_acta_aprobacion = data?.numero_acta_aprobacion || "";
    this.numero_punto_acta = data?.numero_punto_acta || "";
    this.fecha_aprobacion = data?.fecha_aprobacion || new Date();
    this.fecha_creacion = data?.fecha_creacion || new Date();
    this.fecha_actualizacion = data?.fecha_actualizacion || new Date();
    this.cod_usuario = data?.cod_usuario || "";
    this.cod_usuario_modificacion = data?.cod_usuario_modificacion || "";
    this.activo = data?.activo ?? true;
  }
}
