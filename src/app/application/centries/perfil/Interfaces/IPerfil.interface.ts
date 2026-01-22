import { PerfilDTO } from "../DTO/PerfilDTO";
import { PerfilOperationResponse } from "../DTO/PerfilOperation.dto";

export interface IPerfil {
  getListadoPerfil(token: string): Promise<PerfilDTO[]>;
  getListadoPerfilId(idperfil: number, token: string): Promise<PerfilDTO>;
  guardarPerfil(datos: PerfilDTO | Record<string, unknown>, token: string): Promise<PerfilOperationResponse>;
  editarPerfil(datos: PerfilDTO | Record<string, unknown>, token: string): Promise<PerfilOperationResponse>;
  eliminarPerfil(idperfil: number, token: string): Promise<PerfilOperationResponse>;
}
