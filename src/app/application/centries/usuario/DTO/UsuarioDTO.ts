import { IsString, IsNumber, IsDateString, IsBoolean } from "class-validator";
import { isBoolean } from "lodash";

export class UsuarioDTO {
  @IsNumber()
  id: number;

  @IsString()
  usuario: string;

  @IsString()
  nom_colaborador: string;

  @IsNumber()
  id_cargo: number;

  @IsString()
  cargo: string;

  @IsString()
  codigo_vendedor: string;

  @IsString()
  mac_maquina: string;

  @IsDateString()
  fec_ultimo_inicio: string;

  @IsDateString()
  fecha: string;

  @IsString()
  perfil: string;

  @IsNumber()
  id_perfil: number;

  @IsBoolean()
  btn_insertar: boolean;

  @IsBoolean()
  btn_actualizar: boolean;

  @IsBoolean()
  btn_eliminar: boolean;

  @IsBoolean()
  btn_activar: boolean;

  @IsBoolean()
  btn_desactivar: boolean;

  @IsBoolean()
  btn_descarga_xml: boolean;

  @IsBoolean()
  btn_descarga_texto_plano: boolean;

  @IsBoolean()
  btn_descarga_excel: boolean;

  @IsBoolean()
  btn_descarga_excel_plantilla: boolean;

  constructor(data?: Partial<UsuarioDTO>) {
    this.id = data?.id || 0;
    this.usuario = data?.usuario || "";
    this.nom_colaborador = data?.nom_colaborador || "";
    this.id_cargo = data?.id_cargo || 0;
    this.cargo = data?.cargo || "";
    this.codigo_vendedor = data?.codigo_vendedor || "-";
    this.mac_maquina = data?.mac_maquina || "-";
    this.fec_ultimo_inicio =
      data?.fec_ultimo_inicio || new Date().toISOString();
    this.fecha = data?.fecha || new Date().toISOString();
    this.perfil = data?.perfil || "";
    this.id_perfil = data?.id_perfil || 0;
    this.btn_insertar = data?.btn_insertar || false;
    this.btn_actualizar = data?.btn_actualizar || false;
    this.btn_eliminar = data?.btn_eliminar || false;
    this.btn_activar = data?.btn_activar || false;
    this.btn_desactivar = data?.btn_desactivar || false;
    this.btn_descarga_xml = data?.btn_descarga_xml || false;
    this.btn_descarga_texto_plano = data?.btn_descarga_texto_plano || false;
    this.btn_descarga_excel = data?.btn_descarga_excel || false;
    this.btn_descarga_excel_plantilla =
      data?.btn_descarga_excel_plantilla || false;
  }
}
