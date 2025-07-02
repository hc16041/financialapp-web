import { IsString, IsNumber } from "class-validator";

export class PerfilDTO {
  @IsNumber()
  id_perfil: number;

  @IsString()
  perfil: string;

  constructor(data?: Partial<PerfilDTO>) {
    this.id_perfil = data?.id_perfil || 0;
    this.perfil = data?.perfil || "";
  }
}
