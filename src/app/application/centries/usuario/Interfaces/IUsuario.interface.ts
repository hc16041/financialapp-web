import { UsuarioDTO } from "../DTO/UsuarioDTO";
import { UsuarioOperationResponse } from "../DTO/UsuarioOperation.dto";

export interface IUsuario {
  getListadoUsuarioActivo(token: string): Promise<UsuarioDTO[]>;
  getListadoUsuarioInactivo(token: string): Promise<UsuarioDTO[]>;
  getListadoUsuarioId(idusuario: number, token: string): Promise<UsuarioDTO>;
  guardarUsuario(datos: UsuarioDTO | Record<string, unknown>, token: string): Promise<UsuarioOperationResponse>;
  editarUsuario(datos: UsuarioDTO | Record<string, unknown>, token: string): Promise<UsuarioOperationResponse>;
  inactivarUsuario(idusuario: number, token: string): Promise<UsuarioOperationResponse>;
  activarUsuario(idusuario: number, token: string): Promise<UsuarioOperationResponse>;
  resetearClave(idusuario: number, token: string): Promise<UsuarioOperationResponse>;
}

export interface IUsuarioEdit {
  id: number;
  usuario: string;
  nom_colaborador: string;
  id_cargo: number;
  id_perfil: number;
  btn_insertar: boolean;
  btn_actualizar: boolean;
  btn_eliminar: boolean;
  btn_activar: boolean;
  btn_desactivar: boolean;
  btn_descarga_xml: boolean;
  btn_descarga_texto_plano: boolean;
  btn_descarga_excel: boolean;
  btn_descarga_excel_plantilla: boolean;
}
