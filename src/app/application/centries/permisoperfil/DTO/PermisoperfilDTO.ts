import { IsString, IsNumber, Min, Length } from "class-validator";

export class PermisoperfilDTO {
  @IsNumber()
  @Min(1, { message: "El id_perfil debe ser un número mayor o igual a 1." })
  id_perfil: number;

  @IsNumber()
  @Min(1, { message: "El id_permiso debe ser un número mayor o igual a 1." })
  id_permiso: number;

  @IsString()
  @Length(3, 50, {
    message: "El nombre_permiso debe tener entre 3 y 50 caracteres.",
  })
  nombre_permiso: string;

  @IsString()
  @Length(3, 50, {
    message: "El perfil debe tener entre 3 y 50 caracteres.",
  })
  perfil: string;

  constructor(data?: Partial<PermisoperfilDTO>) {
    this.id_perfil = data?.id_perfil ?? 0;
    this.id_permiso = data?.id_permiso ?? 0;
    this.nombre_permiso = data?.nombre_permiso || "";
    this.perfil = data?.perfil || "";
  }
}
