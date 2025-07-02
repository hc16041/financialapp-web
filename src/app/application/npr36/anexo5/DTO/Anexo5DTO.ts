import { Type } from "class-transformer";
import {
  IsString,
  IsNumber,
  Min,
  Length,
  IsISO8601,
  IsBoolean,
} from "class-validator";

export class Anexo5DTO {
  @IsNumber()
  @Min(1, { message: "El id debe ser un número mayor o igual a 1." })
  id: number;

  @IsString()
  @Length(3, 100, {
    message: "El numero_informe debe tener entre 3 y 100 caracteres.",
  })
  numero_informe: string;

  @IsString()
  @Length(3, 200, {
    message: "El asunto_informe debe tener entre 3 y 200 caracteres.",
  })
  asunto_informe: string;

  @IsString()
  @Length(3, 100, {
    message:
      "El nombre_responsable_elaboracion debe tener entre 3 y 100 caracteres.",
  })
  nombre_responsable_elaboracion: string;

  @IsString()
  @Length(3, 100, {
    message:
      "El apellido_responsable_elaboracion debe tener entre 3 y 100 caracteres.",
  })
  apellido_responsable_elaboracion: string;

  @IsString()
  @Length(3, 100, {
    message: "El destinatario debe tener entre 3 y 100 caracteres.",
  })
  destinatario: string;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  fecha_elaboracion: Date;

  @IsString()
  @Length(3, 100, {
    message: "El organo_gobierno debe tener entre 3 y 100 caracteres.",
  })
  organo_gobierno: string;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  fecha_presentacion: Date;

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

  @IsNumber()
  @Min(0, {
    message: "La actividad_informada debe ser un número mayor o igual a 0.",
  })
  actividad_informada: number;

  @IsString()
  @Length(3, 500, {
    message: "El resultado_informado debe tener entre 3 y 500 caracteres.",
  })
  resultado_informado: string;

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

  constructor(data?: Partial<Anexo5DTO>) {
    this.id = data?.id ?? 0;
    this.numero_informe = data?.numero_informe || "";
    this.asunto_informe = data?.asunto_informe || "";
    this.nombre_responsable_elaboracion =
      data?.nombre_responsable_elaboracion || "";
    this.apellido_responsable_elaboracion =
      data?.apellido_responsable_elaboracion || "";
    this.destinatario = data?.destinatario || "";
    this.fecha_elaboracion = data?.fecha_elaboracion || new Date();
    this.organo_gobierno = data?.organo_gobierno || "";
    this.fecha_presentacion = data?.fecha_presentacion || new Date();
    this.numero_acta_aprobacion = data?.numero_acta_aprobacion || "";
    this.numero_punto_acta = data?.numero_punto_acta || "";
    this.actividad_informada = data?.actividad_informada ?? 0;
    this.resultado_informado = data?.resultado_informado || "";
    this.fecha_creacion = data?.fecha_creacion || new Date();
    this.fecha_actualizacion = data?.fecha_actualizacion || new Date();
    this.cod_usuario = data?.cod_usuario || "";
    this.cod_usuario_modificacion = data?.cod_usuario_modificacion || "";
    this.activo = data?.activo ?? true;
  }
}
