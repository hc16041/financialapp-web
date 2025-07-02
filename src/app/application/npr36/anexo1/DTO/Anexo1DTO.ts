import { Type } from "class-transformer";
import {
  IsString,
  IsNumber,
  Min,
  Length,
  IsDateString,
  IsISO8601,
  IsBoolean,
} from "class-validator";

export class Anexo1DTO {
  @IsNumber()
  @Type(() => Number)
  @Min(1, { message: "El id debe ser un número mayor o igual a 1." })
  id: number;

  @IsString()
  @Length(3, 100, {
    message: "La dependencia_jerarquica debe tener entre 3 y 100 caracteres.",
  })
  dependencia_jerarquica: string;

  @IsNumber()
  @Type(() => Number)
  @Min(1, {
    message: "El numero_personal debe ser un número mayor o igual a 1.",
  })
  numero_personal: number;

  @IsString()
  @Length(3, 100, {
    message: "El organo_gobierno_autorizo debe tener entre 3 y 100 caracteres.",
  })
  organo_gobierno_autorizo: string;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  fecha_aprobacion: Date;

  @IsString()
  @Length(1, 50, {
    message: "El numero_acta_aprobacion debe tener entre 1 y 50 caracteres.",
  })
  numero_acta_aprobacion: string;

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
  constructor(data?: Partial<Anexo1DTO>) {
    this.id = data?.id ?? 0;
    this.dependencia_jerarquica = data?.dependencia_jerarquica || "";
    this.numero_personal = data?.numero_personal ?? 0;
    this.organo_gobierno_autorizo = data?.organo_gobierno_autorizo || "";
    this.fecha_aprobacion = data?.fecha_aprobacion || new Date();
    this.numero_acta_aprobacion = data?.numero_acta_aprobacion || "";
    this.fecha_creacion = data?.fecha_creacion || new Date();
    this.fecha_actualizacion = data?.fecha_actualizacion || new Date();
    this.cod_usuario = data?.cod_usuario || "";
    this.cod_usuario_modificacion = data?.cod_usuario_modificacion || "";
    this.activo = data?.activo ?? true;
  }
}
