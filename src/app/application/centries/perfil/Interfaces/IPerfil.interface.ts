export interface IPerfil {
  getListadoPerfil(token: string): Promise<any>;
  getListadoPerfilId(idperfil: number, token: string): Promise<any>;
  guardarPerfil(datos: any, token: string): Promise<any>;
  editarPerfil(datos: any, token: string): Promise<any>;
  eliminarPerfil(idperfil: number, token: string): Promise<any>;
}
