export interface ICargo {
  getListadoCargo(token: string): Promise<any>;
  getListadoCargoId(idcargo: number, token: string): Promise<any>;
  guardarCargo(datos: any, token: string): Promise<any>;
  editarCargo(datos: any, token: string): Promise<any>;
  eliminarCargo(id: number, token: string): Promise<any>;
}
