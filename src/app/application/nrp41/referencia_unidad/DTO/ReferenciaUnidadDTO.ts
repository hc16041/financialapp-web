import { IsString, IsNumber, Length, Min } from "class-validator";

export class ReferenciaUnidadDTO {
  @IsString()
  @Length(2, 2, { message: "COD_CARTERA debe tener 2 caracteres" })
  COD_CARTERA: string;

  @IsString()
  @Length(2, 2, { message: "COD_ACTIVO debe tener 2 caracteres" })
  COD_ACTIVO: string;

  @IsString()
  @Length(6, 6, { message: "NUM_REFERENCIA debe tener 6 caracteres" })
  NUM_REFERENCIA: string;

  @IsString()
  CODIGO_UNIDAD: string;

  @IsNumber()
  @Min(0, { message: "CANTIDAD_UNIDAD no puede ser negativo" })
  CANTIDAD_UNIDAD: number;

  constructor(data?: Partial<ReferenciaUnidadDTO>) {
    this.COD_CARTERA = data?.COD_CARTERA || "";
    this.COD_ACTIVO = data?.COD_ACTIVO || "";
    this.NUM_REFERENCIA = data?.NUM_REFERENCIA || "";
    this.CODIGO_UNIDAD = data?.CODIGO_UNIDAD || "";
    this.CANTIDAD_UNIDAD = data?.CANTIDAD_UNIDAD ?? 0;
  }
}
