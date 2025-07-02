import { Type } from "class-transformer";
import {
  IsString,
  IsNumber,
  Min,
  Length,
  IsISO8601,
  IsBoolean,
} from "class-validator";

export class Anexo7DTO {
  @IsNumber()
  @Min(1, { message: "El id debe ser un número mayor o igual a 1." })
  id: number;

  @IsString()
  @Length(1, 50, {
    message: "El numero_informe debe tener entre 1 y 50 caracteres.",
  })
  numero_informe: string;

  @IsNumber()
  @Min(0, {
    message: "El correlativo_hallazgo debe ser un número mayor o igual a 0.",
  })
  correlativo_hallazgo: number;

  @IsNumber()
  @Min(0, {
    message: "La actividad_informada debe ser un número mayor o igual a 0.",
  })
  actividad_informada: number;

  @IsString()
  @Length(3, 100, {
    message: "El titulo_hallazgo debe tener entre 3 y 100 caracteres.",
  })
  titulo_hallazgo: string;

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

  constructor(data?: Partial<Anexo7DTO>) {
    this.id = data?.id ?? 0;
    this.numero_informe = data?.numero_informe || "";
    this.correlativo_hallazgo = data?.correlativo_hallazgo ?? 0;
    this.actividad_informada = data?.actividad_informada ?? 0;
    this.titulo_hallazgo = data?.titulo_hallazgo || "";
    this.fecha_creacion = data?.fecha_creacion || new Date();
    this.fecha_actualizacion = data?.fecha_actualizacion || new Date();
    this.cod_usuario = data?.cod_usuario || "";
    this.cod_usuario_modificacion = data?.cod_usuario_modificacion || "";
    this.activo = data?.activo ?? true;
  }
}
