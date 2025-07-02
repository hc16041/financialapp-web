import { IsString, Length, IsNumber, Min } from "class-validator";

export class ReferenciaGarantiaDTO {
  @IsString()
  @Length(1, 20, {
    message: "El NUM_REFERENCIA debe tener entre 1 y 20 caracteres.",
  })
  NUM_REFERENCIA: string;

  @IsString()
  @Length(1, 10, {
    message: "El COD_CARTERA debe tener entre 1 y 10 caracteres.",
  })
  COD_CARTERA: string;

  @IsString()
  @Length(1, 10, {
    message: "El COD_ACTIVO debe tener entre 1 y 10 caracteres.",
  })
  COD_ACTIVO: string;

  @IsString()
  @Length(3, 20, {
    message: "La IDENTIFICACION_GARANTIA debe tener entre 3 y 20 caracteres.",
  })
  IDENTIFICACION_GARANTIA: string;

  @IsString()
  @Length(2, 50, {
    message: "El TIPO_GARANTIA debe tener entre 2 y 50 caracteres.",
  })
  TIPO_GARANTIA: string;

  @IsNumber()
  @Min(0, {
    message: "El VALOR_GARANTIA_PROPORCIONAL debe ser mayor o igual a 0.",
  })
  VALOR_GARANTIA_PROPORCIONAL: number;

  constructor(data: Partial<ReferenciaGarantiaDTO> = {}) {
    this.NUM_REFERENCIA = data.NUM_REFERENCIA ?? "";
    this.COD_CARTERA = data.COD_CARTERA ?? "";
    this.COD_ACTIVO = data.COD_ACTIVO ?? "";
    this.IDENTIFICACION_GARANTIA = data.IDENTIFICACION_GARANTIA ?? "";
    this.TIPO_GARANTIA = data.TIPO_GARANTIA ?? "";
    this.VALOR_GARANTIA_PROPORCIONAL = data.VALOR_GARANTIA_PROPORCIONAL ?? 0;
  }
}
