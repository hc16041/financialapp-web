import { IsString, IsNumber, Length, Min, Max } from "class-validator";
export class SociosSociedadesDTO {
  @IsString()
  @Length(14, 14, {
    message: "El NIT_DEUDOR debe tener exactamente 14 caracteres.",
  })
  NIT_DEUDOR: string;

  @IsString()
  @Length(14, 14, {
    message: "El NIT_SOCIO debe tener exactamente 14 caracteres.",
  })
  NIT_SOCIO: string;

  @IsNumber()
  @Min(0, { message: "El PORCENTAJE_PARTICIPACION no puede ser menor a 0." })
  @Max(100, {
    message: "El PORCENTAJE_PARTICIPACION no puede ser mayor a 100.",
  })
  PORCENTAJE_PARTICIPACION: number;

  constructor(data?: Partial<SociosSociedadesDTO>) {
    this.NIT_DEUDOR = data?.NIT_DEUDOR || "";
    this.NIT_SOCIO = data?.NIT_SOCIO || "";
    this.PORCENTAJE_PARTICIPACION = data?.PORCENTAJE_PARTICIPACION ?? 0;
  }
}
