import { Type } from "class-transformer";
import { IsString, Length, IsOptional, IsISO8601 } from "class-validator";

export class FuncionariosEmpleadosDTO {
  @IsString()
  @Length(1, 50, {
    message: "El PRIMER_NOMBRE debe tener entre 1 y 50 caracteres.",
  })
  PRIMER_NOMBRE: string;

  @IsString()
  @IsOptional()
  @Length(1, 50, {
    message: "El SEGUNDO_NOMBRE debe tener entre 1 y 50 caracteres.",
  })
  SEGUNDO_NOMBRE?: string;

  @IsString()
  @Length(1, 50, {
    message: "El PRIMER_APELLIDO debe tener entre 1 y 50 caracteres.",
  })
  PRIMER_APELLIDO: string;

  @IsString()
  @IsOptional()
  @Length(1, 50, {
    message: "El SEGUNDO_APELLIDO debe tener entre 1 y 50 caracteres.",
  })
  SEGUNDO_APELLIDO?: string;

  @IsString()
  @IsOptional()
  @Length(1, 50, {
    message: "El APELLIDO_CASADA debe tener entre 1 y 50 caracteres.",
  })
  APELLIDO_CASADA?: string;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_INGRESO: Date;

  @IsString()
  @Length(1, 100, { message: "El CARGO debe tener entre 1 y 100 caracteres." })
  CARGO: string;

  @IsString()
  @Length(4, 4, { message: "El NIU debe tener exactamente 4 caracteres." })
  NIU: string;

  @IsString()
  @Length(3, 3, {
    message: "El CODIGO_DOCUMENTO debe tener exactamente 3 caracteres.",
  })
  CODIGO_DOCUMENTO: string;

  @IsString()
  @Length(10, 10, {
    message:
      "El NUMERO_DOCUMENTO debe tener exactamente 10 caracteres con guion.",
  })
  NUMERO_DOCUMENTO: string;

  @IsString()
  @Length(8, 8, {
    message: "El NUMERO_TELEFONICO debe tener exactamente 8 caracteres.",
  })
  NUMERO_TELEFONICO: string;

  @IsString()
  @Length(1, 100, {
    message: "El DEPARTAMENTO debe tener entre 1 y 100 caracteres.",
  })
  DEPARTAMENTO: string;

  @IsString()
  @Length(1, 1, {
    message: "El RELACIONADO_ADMINISTRACION debe tener exactamente 1 carácter.",
  })
  RELACIONADO_ADMINISTRACION: string;

  constructor(data?: Partial<FuncionariosEmpleadosDTO>) {
    this.PRIMER_NOMBRE = data?.PRIMER_NOMBRE || "";
    this.SEGUNDO_NOMBRE = data?.SEGUNDO_NOMBRE || "";
    this.PRIMER_APELLIDO = data?.PRIMER_APELLIDO || "";
    this.SEGUNDO_APELLIDO = data?.SEGUNDO_APELLIDO || "";
    this.APELLIDO_CASADA = data?.APELLIDO_CASADA || "";
    this.FECHA_INGRESO = data?.FECHA_INGRESO || new Date();
    this.CARGO = data?.CARGO || "";
    this.NIU = data?.NIU || "";
    this.CODIGO_DOCUMENTO = data?.CODIGO_DOCUMENTO || "";
    this.NUMERO_DOCUMENTO = data?.NUMERO_DOCUMENTO || "";
    this.NUMERO_TELEFONICO = data?.NUMERO_TELEFONICO || "";
    this.DEPARTAMENTO = data?.DEPARTAMENTO || "";
    this.RELACIONADO_ADMINISTRACION = data?.RELACIONADO_ADMINISTRACION || "";
  }
}
