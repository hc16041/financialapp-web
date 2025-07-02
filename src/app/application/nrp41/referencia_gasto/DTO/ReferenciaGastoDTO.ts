import { IsString, IsNumber, Length, Min } from "class-validator";

export class ReferenciaGastoDTO {
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
  CODIGO_GASTO: string;

  @IsString()
  TIPO_GASTO: string;

  @IsNumber()
  @Min(0, { message: "MONTO_GASTO no puede ser negativo" })
  MONTO_GASTO: number;

  constructor(data?: Partial<ReferenciaGastoDTO>) {
    this.COD_CARTERA = data?.COD_CARTERA || "";
    this.COD_ACTIVO = data?.COD_ACTIVO || "";
    this.NUM_REFERENCIA = data?.NUM_REFERENCIA || "";
    this.CODIGO_GASTO = data?.CODIGO_GASTO || "";
    this.TIPO_GASTO = data?.TIPO_GASTO || "";
    this.MONTO_GASTO = data?.MONTO_GASTO ?? 0;
  }
}
