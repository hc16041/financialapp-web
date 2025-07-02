import { IsString, Length } from "class-validator";

export class GarantiaFiduciariaDTO {
  @IsString()
  @Length(3, 20, {
    message: "El NUM_REFERENCIA debe tener entre 3 y 20 caracteres.",
  })
  NUM_REFERENCIA: string;

  @IsString()
  @Length(2, 10, {
    message: "El COD_CARTERA debe tener entre 2 y 10 caracteres.",
  })
  COD_CARTERA: string;

  @IsString()
  @Length(2, 10, {
    message: "El COD_ACTIVO debe tener entre 2 y 10 caracteres.",
  })
  COD_ACTIVO: string;

  @IsString()
  @Length(5, 20, {
    message: "El NIT_FIADOR_CODEUDOR debe tener entre 5 y 20 caracteres.",
  })
  NIT_FIADOR_CODEUDOR: string;

  @IsString()
  @Length(5, 100, {
    message: "El FIADOR_CODEUDOR debe tener entre 5 y 100 caracteres.",
  })
  FIADOR_CODEUDOR: string;

  constructor(data?: Partial<GarantiaFiduciariaDTO>) {
    this.NUM_REFERENCIA = data?.NUM_REFERENCIA || "";
    this.COD_CARTERA = data?.COD_CARTERA || "";
    this.COD_ACTIVO = data?.COD_ACTIVO || "";
    this.NIT_FIADOR_CODEUDOR = data?.NIT_FIADOR_CODEUDOR || "";
    this.FIADOR_CODEUDOR = data?.FIADOR_CODEUDOR || "";
  }
}
