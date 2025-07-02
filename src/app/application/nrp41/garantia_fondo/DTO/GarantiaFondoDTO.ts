import { IsString, IsNumber, Min, Max, Length } from "class-validator";

export class GarantiaFondoDTO {
  @IsString()
  @Length(3, 20, {
    message: "El IDENTIFICACION_GARANTIA debe tener entre 3 y 20 caracteres.",
  })
  IDENTIFICACION_GARANTIA: string;

  @IsNumber()
  @Min(1, { message: "El VALOR_GARANTIA debe ser mayor a 0." })
  VALOR_GARANTIA: number;

  @IsNumber()
  @Min(0, { message: "El VALOR_PORCENTAUAL no puede ser menor a 0." })
  @Max(100, { message: "El VALOR_PORCENTAUAL no puede ser mayor a 100." })
  VALOR_PORCENTUAL: number;

  @IsString()
  @Length(2, 10, {
    message: "El TIPO_FONDO debe tener entre 2 y 10 caracteres.",
  })
  TIPO_FONDO: string;

  @IsString()
  @Length(1, 1, { message: "El ESTADO debe ser un solo carácter." })
  ESTADO: string;

  constructor(data?: Partial<GarantiaFondoDTO>) {
    this.IDENTIFICACION_GARANTIA = data?.IDENTIFICACION_GARANTIA || "";
    this.VALOR_GARANTIA = data?.VALOR_GARANTIA ?? 0;
    this.VALOR_PORCENTUAL = data?.VALOR_PORCENTUAL ?? 0;
    this.TIPO_FONDO = data?.TIPO_FONDO || "";
    this.ESTADO = data?.ESTADO || "";
  }
}
