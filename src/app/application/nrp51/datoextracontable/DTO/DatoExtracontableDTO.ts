import { IsNumber, IsString, Min } from "class-validator";

export class DatoExtracontableDTO {
  @IsString()
  @Min(1, { message: "El ID_CODIGO_EXTRACONTABLE debe tener 10 caracteres." })
  ID_CODIGO_EXTRACONTABLE: string;

  @IsString()
  @Min(1, { message: "El DESC_EXTRA_CONTABLE debe tener 10 caracteres." })
  DESC_EXTRA_CONTABLE: string;

  @IsNumber()
  @Min(0, { message: "El VALOR debe ser un número positivo." })
  VALOR: number;


  constructor(data?: Partial<DatoExtracontableDTO>) {
    this.ID_CODIGO_EXTRACONTABLE = data?.ID_CODIGO_EXTRACONTABLE || "";
    this.DESC_EXTRA_CONTABLE = data?.DESC_EXTRA_CONTABLE || "";
    this.VALOR = data?.VALOR || 0;
  }
}
