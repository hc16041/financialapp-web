export interface IAnexo7 {
  getListadoAnexo7(token: string, usuario: string): Promise<any[]>;
  guardarAnexo7(datos: any, token: string, usuario: string): Promise<any>;
  editarAnexo7(datos: any, token: string, usuario: string): Promise<any>;
  eliminarAnexo7(datos: any, token: string, usuario: string): Promise<any>;
  desactivarAnexo7(datos: any, token: string, usuario: string): Promise<any>;
  getListadoAnexo7XML(token: string, usuario: string): Promise<any>;
  getListadoAnexo7Excel(token: string, usuario: string): Promise<any>;
}
