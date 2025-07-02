import { Type } from "class-transformer";
import {
  IsString,
  IsNumber,
  Min,
  Length,
  IsISO8601,
  IsBoolean,
} from "class-validator";

export class Anexo6DTO {
  @IsNumber()
  @Min(1, { message: "El id debe ser un número mayor o igual a 1." })
  id: number;

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
    message: "El numero_hallazgos debe ser un número mayor o igual a 0.",
  })
  numero_hallazgos: number;

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

  constructor(data?: Partial<Anexo6DTO>) {
    this.id = data?.id ?? 0;
    this.numero_documento = data?.numero_documento || "";
    this.primer_nombre = data?.primer_nombre || "";
    this.segundo_nombre = data?.segundo_nombre || "";
    this.primer_apellido = data?.primer_apellido || "";
    this.segundo_apellido = data?.segundo_apellido || "";
    this.apellido_casada = data?.apellido_casada || "";
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
    this.numero_hallazgos = data?.numero_hallazgos ?? 0;
    this.fecha_creacion = data?.fecha_creacion || new Date();
    this.fecha_actualizacion = data?.fecha_actualizacion || new Date();
    this.cod_usuario = data?.cod_usuario || "";
    this.cod_usuario_modificacion = data?.cod_usuario_modificacion || "";
    this.activo = data?.activo ?? true;
  }
}
