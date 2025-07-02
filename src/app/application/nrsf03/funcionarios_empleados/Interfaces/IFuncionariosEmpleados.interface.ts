import { FuncionariosEmpleadosDTO } from "../DTO/FuncionariosEmpleadosDTO";

export interface IFuncionariosEmpleados {
  getListadoFuncionariosEmpleados(
    token: string,
    usuario: string
  ): Promise<FuncionariosEmpleadosDTO[]>;
  getListadoFuncionariosEmpleadosXML(
    token: string,
    usuario: string
  ): Promise<any>;
  getListadoFuncionariosEmpleadosExcel(
    token: string,
    usuario: string
  ): Promise<any>;
  getListadoFuncionariosEmpleadosTexto(
    token: string,
    usuario: string
  ): Promise<any>;
}
