import { IsString, Length } from "class-validator";

export class TitularesDTO {
  @IsString()
  @Length(4, 10, { message: "El NIU debe tener entre 4 y 10 caracteres." })
  NIU: string;

  @IsString()
  @Length(10, 20, {
    message: "El NUMERO_CUENTA debe tener entre 10 y 20 caracteres.",
  })
  NUMERO_CUENTA: string;

  constructor(data?: Partial<TitularesDTO>) {
    this.NIU = data?.NIU || "";
    this.NUMERO_CUENTA = data?.NUMERO_CUENTA || "";
  }
}
