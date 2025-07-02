import { IsNumber, IsString, Min } from "class-validator";

export class TituloValorExtranjeroDTO {
  @IsString()
  @Min(1, { message: "El ID_CODIGO_TITULO_EXTRANJERO debe tener 10 caracteres." })
  ID_CODIGO_TITULO_EXTRANJERO: string;

  @IsString()
  @Min(1, { message: "El DESC_TV_EXTRANJ debe tener 10 caracteres." })
  DESC_TV_EXTRANJ: string;

  @IsNumber()
  @Min(0, { message: "El VALOR_TV_EXTRANJ debe ser un número positivo." })
  VALOR_TV_EXTRANJ: number;


  constructor(data?: Partial<TituloValorExtranjeroDTO>) {
    this.ID_CODIGO_TITULO_EXTRANJERO = data?.ID_CODIGO_TITULO_EXTRANJERO || "";
    this.DESC_TV_EXTRANJ = data?.DESC_TV_EXTRANJ || "";
    this.VALOR_TV_EXTRANJ = data?.VALOR_TV_EXTRANJ || 0;
  }
}
