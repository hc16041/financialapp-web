import { IsString, Length, IsOptional } from "class-validator";

export class CatalogoAgenciasDTO {
  @IsString()
  @Length(7, 7, {
    message: "El CODIGO_AGENCIA debe tener exactamente 7 caracteres.",
  })
  CODIGO_AGENCIA: string;

  @IsString()
  @Length(1, 100, {
    message: "El NOMBRE_AGENCIA debe tener entre 1 y 100 caracteres.",
  })
  NOMBRE_AGENCIA: string;

  @IsString()
  @Length(1, 200, {
    message: "La UBICACION_AGENCIA debe tener entre 1 y 200 caracteres.",
  })
  UBICACION_AGENCIA: string;

  @IsString()
  @Length(2, 2, {
    message: "El CODIGO_DEPARTAMENTO debe tener exactamente 2 caracteres.",
  })
  CODIGO_DEPARTAMENTO: string;

  @IsString()
  @Length(2, 2, {
    message: "El CODIGO_DISTRITO debe tener exactamente 2 caracteres.",
  })
  CODIGO_DISTRITO: string;

  @IsString()
  @Length(1, 1, {
    message: "El ESTADO_AGENCIA debe tener exactamente 1 carácter.",
  })
  ESTADO_AGENCIA: string;

  constructor(data?: Partial<CatalogoAgenciasDTO>) {
    this.CODIGO_AGENCIA = data?.CODIGO_AGENCIA || "";
    this.NOMBRE_AGENCIA = data?.NOMBRE_AGENCIA || "";
    this.UBICACION_AGENCIA = data?.UBICACION_AGENCIA || "";
    this.CODIGO_DEPARTAMENTO = data?.CODIGO_DEPARTAMENTO || "";
    this.CODIGO_DISTRITO = data?.CODIGO_DISTRITO || "";
    this.ESTADO_AGENCIA = data?.ESTADO_AGENCIA || "";
  }
}
