import { IsString, Length } from "class-validator";

export class DocsClienteDTO {
  @IsString()
  @Length(4, 10, { message: "El NIU debe tener entre 4 y 10 caracteres." })
  NIU: string;

  @IsString()
  @Length(2, 5, {
    message: "El CODIGO_DOCUMENTO debe tener entre 2 y 5 caracteres.",
  })
  CODIGO_DOCUMENTO: string;

  @IsString()
  @Length(9, 20, {
    message: "El NUMERO_DOCUMENTO debe tener entre 9 y 20 caracteres.",
  })
  NUMERO_DOCUMENTO: string;

  constructor(data?: Partial<DocsClienteDTO>) {
    this.NIU = data?.NIU || "";
    this.CODIGO_DOCUMENTO = data?.CODIGO_DOCUMENTO || "";
    this.NUMERO_DOCUMENTO = data?.NUMERO_DOCUMENTO || "";
  }
}
