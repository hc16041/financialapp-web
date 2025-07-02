import { PermisoperfilDTO } from "../DTO/PermisoperfilDTO";

export interface IPermisoperfil {
  obtenerPermisosPerfil(token: string): Promise<PermisoperfilDTO[]>;
  obtenerPermisosPerfilNoAsignados(
    datos: any,
    token: string
  ): Promise<PermisoperfilDTO[]>;
  guardarPermisosPerfil(datos: any, token: string): Promise<any>;
  editarPermisosPerfil(datos: any, token: string): Promise<any>;
  eliminarPermisosPerfil(id: number, token: string): Promise<any>;
}
