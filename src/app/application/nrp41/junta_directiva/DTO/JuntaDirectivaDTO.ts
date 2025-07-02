import { Type } from "class-transformer";
import { IsString, Length, IsDateString, IsISO8601 } from "class-validator";

export class JuntaDirectivaDTO {
  @IsString()
  @Length(14, 14, {
    message: "El NIT_DEUDOR debe tener exactamente 14 caracteres.",
  })
  NIT_DEUDOR: string;

  @IsString()
  @Length(14, 14, {
    message: "El NIT_MIEMBRO debe tener exactamente 14 caracteres.",
  })
  NIT_MIEMBRO: string;

  @IsString()
  @Length(2, 2, {
    message: "El COD_CARGO debe tener exactamente 2 caracteres.",
  })
  COD_CARGO: string;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_INICIAL_JD: Date;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_FINAL_JD: Date;

  @IsString()
  @Length(17, 17, {
    message: "El NUMERO_CREDENCIAL debe tener exactamente 17 caracteres.",
  })
  NUMERO_CREDENCIAL: string;

  constructor(data?: Partial<JuntaDirectivaDTO>) {
    this.NIT_DEUDOR = data?.NIT_DEUDOR || "";
    this.NIT_MIEMBRO = data?.NIT_MIEMBRO || "";
    this.COD_CARGO = data?.COD_CARGO || "";
    this.FECHA_INICIAL_JD = data?.FECHA_INICIAL_JD || new Date();
    this.FECHA_FINAL_JD = data?.FECHA_FINAL_JD || new Date();
    this.NUMERO_CREDENCIAL = data?.NUMERO_CREDENCIAL || "";
  }
}
