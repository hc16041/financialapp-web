import { PermisoperfilDTO } from "../DTO/PermisoperfilDTO";
import { PermisoperfilOperationResponse } from "../DTO/PermisoperfilOperation.dto";

export interface IPermisoperfil {
  obtenerPermisosPerfil(token: string): Promise<PermisoperfilDTO[]>;
  obtenerPermisosPerfilNoAsignados(
    datos: PermisoperfilDTO | Record<string, unknown>,
    token: string
  ): Promise<PermisoperfilDTO[]>;
  guardarPermisosPerfil(datos: PermisoperfilDTO | Record<string, unknown>, token: string): Promise<PermisoperfilOperationResponse>;
  editarPermisosPerfil(datos: PermisoperfilDTO | Record<string, unknown>, token: string): Promise<PermisoperfilOperationResponse>;
  eliminarPermisosPerfil(datos: PermisoperfilDTO | Record<string, unknown>, token: string): Promise<PermisoperfilOperationResponse>;
}
