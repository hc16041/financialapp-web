import { IsNumber, IsString, Min } from "class-validator";

export class SaldoCuentaDTO {
  @IsString()
  @Min(1, { message: "El ID_CODIGO_CUENTA debe tener 10 caracteres." })
  ID_CODIGO_CUENTA: string;

  @IsString()
  @Min(1, { message: "El NOM_CUENTA debe tener 10 caracteres." })
  NOM_CUENTA: string;

  @IsNumber()
  @Min(0, { message: "El VALOR debe ser un número positivo." })
  VALOR: number;


  constructor(data?: Partial<SaldoCuentaDTO>) {
    this.ID_CODIGO_CUENTA = data?.ID_CODIGO_CUENTA || "";
    this.NOM_CUENTA = data?.NOM_CUENTA || "";
    this.VALOR = data?.VALOR || 0;
  }
}
