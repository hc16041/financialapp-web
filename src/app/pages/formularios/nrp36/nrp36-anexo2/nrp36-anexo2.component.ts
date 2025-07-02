import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";
import { DataService } from "src/app/core/services/data.service";
import { Anexo2Service } from "src/app/application/npr36/anexo2/Services/Anexo2.service";
import { IAnexo2Edit } from "src/app/application/npr36/anexo2/Interfaces/IAnexo2.interface";
import { Anexo2DTO } from "src/app/application/npr36/anexo2/DTO/Anexo2DTO";
import { RoloficialDTO } from "src/app/application/catalogos/roloficial/DTO/RoloficialDTO";
import { RoloficialService } from "src/app/application/catalogos/roloficial/Services/Roloficial.service";
import { TipocomunicacionDTO } from "src/app/application/catalogos/tipocomunicacion/DTO/TipocomunicacionDTO";
import { TipocomunicacionService } from "../../../../application/catalogos/tipocomunicacion/Services/Tipocomunicacion.service";

@Component({
  selector: "app-nrp36-anexo2",
  templateUrl: "./nrp36-anexo2.component.html",
  styleUrl: "./nrp36-anexo2.component.scss",
})
export class Nrp36Anexo2Component {
  // Table data anexo2
  anexo2List$: BehaviorSubject<Anexo2DTO[]> = new BehaviorSubject<Anexo2DTO[]>(
    []
  );

  rol_oficialesList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  tipo_comunicacionList$: BehaviorSubject<TipocomunicacionDTO[]> =
    new BehaviorSubject<TipocomunicacionDTO[]>([]);

  // Table data
  anexo2DTO = new Anexo2DTO();
  tableColumns: TableColumn[] = generateTableColumns(this.anexo2DTO);

  // Select options
  selectOptions: { [key: string]: any[] } = {};

  constructor(
    private dataService: DataService,
    private anexo2Service: Anexo2Service,
    private rolOficialService: RoloficialService,
    private tipoComunicacion: TipocomunicacionService
  ) {}
  ngOnInit(): void {
    this.obtenerAnexo2();
    this.obtenerRolOficiales();
    this.obtenerTipoComunicacion();

    this.initializeSelectOptions();
    this.setupSubscriptions();
  }

  private initializeSelectOptions(): void {
    this.selectOptions = {
      rol_oficial: this.mapRoles(this.rol_oficialesList$.getValue()),
      tipo_comunicacion: this.mapTipoComunicacion(
        this.tipo_comunicacionList$.getValue()
      ),
    };
  }

  private setupSubscriptions(): void {
    // Suscripción para perfiles
    this.rol_oficialesList$.subscribe((roles) => {
      this.selectOptions = {
        ...this.selectOptions,
        rol_oficial: this.mapRoles(roles),
      };
    });
    // Suscripción para tipo de comunicación
    this.tipo_comunicacionList$.subscribe((tipoComunicacion) => {
      this.selectOptions = {
        ...this.selectOptions,
        tipo_comunicacion: this.mapTipoComunicacion(tipoComunicacion),
      };
    });
  }

  private mapRoles(roles: RoloficialDTO[]): any[] {
    return roles.map((p) => ({
      value: p.codigo,
      label: p.descripcion,
    }));
  }

  private mapTipoComunicacion(tipoComunicacion: TipocomunicacionDTO[]): any[] {
    return tipoComunicacion.map((p) => ({
      value: p.codigo,
      label: p.descripcion,
    }));
  }

  private mapToAnexoEdit(editAnexo: any): IAnexo2Edit {
    return {
      id: editAnexo.id,
      rol_oficial: editAnexo.rol_oficial,
      numero_documento: editAnexo.numero_documento,
      primer_nombre: editAnexo.primer_nombre,
      segundo_nombre: editAnexo.segundo_nombre,
      primer_apellido: editAnexo.primer_apellido,
      segundo_apellido: editAnexo.segundo_apellido,
      apellido_casada: editAnexo.apellido_casada,
      titulo_universitario: editAnexo.titulo_universitario,
      nombre_cargo: editAnexo.nombre_cargo,
      lugar_residencia: editAnexo.lugar_residencia,
      tipo_comunicacion: editAnexo.tipo_comunicacion,
      fecha_efectiva: editAnexo.fecha_efectiva,
      organo_gobierno: editAnexo.organo_gobierno,
      numero_acta_aprobacion: editAnexo.numero_acta_aprobacion,
      numero_punto_acta: editAnexo.numero_punto_acta,
      fecha_aprobacion: editAnexo.fecha_aprobacion,
      correo_electronico: editAnexo.correo_electronico,
      numero_telefono: editAnexo.numero_telefono,
      cod_usuario: editAnexo.cod_usuario,
    };
  }

  async obtenerRolOficiales(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.rolOficialService,
      "getListadoRoloficial",
      this.rol_oficialesList$,
      "Error al cargar roles oficiales"
    );
  }

  async obtenerTipoComunicacion(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.tipoComunicacion,
      "getListadoTipoComunicacion",
      this.tipo_comunicacionList$,
      "Error al cargar tipo de comunicación"
    );
  }

  /**
   * Obtiene el listado de anexo2 y emite los datos a anexo2List$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerAnexo2(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.anexo2Service,
      "getListadoAnexo2",
      this.anexo2List$,
      "Error al cargar anexo2"
    );
  }

  async onAddAnexo2(newAnexo: any): Promise<void> {
    const anexoFiltrado: Anexo2DTO = new Anexo2DTO(newAnexo);
    await this.dataService.agregarRegistro(
      this.anexo2Service,
      "guardarAnexo2",
      anexoFiltrado,
      "Anexo creado correctamente",
      "Error al agregar anexo2"
    );

    await this.obtenerAnexo2();
  }

  async onEditAnexo2(updatedAnexo: any): Promise<void> {
    const anexoFiltrado: Anexo2DTO = new Anexo2DTO(updatedAnexo);
    await this.dataService.actualizarRegistro(
      this.anexo2Service,
      "editarAnexo2",
      anexoFiltrado,
      "Anexo actualizado con éxito",
      "Error al actualizar el anexo"
    );

    await this.obtenerAnexo2();
  }

  async onDeleteAnexo2(anexo: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.anexo2Service,
      "eliminarAnexo2",
      anexo.id,
      "Anexo eliminado correctamente",
      "Error al eliminar anexo2"
    );

    await this.obtenerAnexo2();
  }

  async onDeactivateAnexo2(anexo: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.anexo2Service,
      "desactivarAnexo2",
      anexo.id,
      "Anexo desactivado correctamente",
      "Error al desactivar anexo2"
    );

    await this.obtenerAnexo2();
  }

  async onActivateAnexo2(anexo: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.anexo2Service,
      "activarAnexo2",
      anexo.id,
      "Anexo activado correctamente",
      "Error al activar anexo2"
    );

    await this.obtenerAnexo2();
  }

  /**
   * Descarga el archivo XML de las anexo2.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo2Service,
      "getListadoAnexo2XML",
      "XML",
      "Error al descargar el archivo de anexo2"
    );
  }
  /**
   * Descarga el archivo Excel de las anexo2.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo2Service,
      "getListadoAnexo2Excel",
      "Excel",
      "Error al descargar el archivo de anexo2"
    );
  }
}
