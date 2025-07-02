import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Anexo4DTO } from "src/app/application/npr36/anexo4/DTO/Anexo4DTO";
import { generateTableColumns } from "src/app/utils/table-utils";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { DataService } from "src/app/core/services/data.service";
import { IAnexo4Edit } from "src/app/application/npr36/anexo4/Interfaces/IAnexo4.interface";
import { Anexo4Service } from "src/app/application/npr36/anexo4/Services/Anexo4.service";
import { TipocapacitacionDTO } from "src/app/application/catalogos/tipocapacitacion/DTO/TipocapacitacionDTO";
import { RegistroasistenciaDTO } from "../../../../application/catalogos/registroasistencia/DTO/RegistroasistenciaDTO";
import { ModalidadDTO } from "src/app/application/catalogos/modalidad/DTO/ModalidadDTO";
import { TipocapacitacionService } from "../../../../application/catalogos/tipocapacitacion/Services/Tipocapacitacion.service";
import { ModalidadService } from "../../../../application/catalogos/modalidad/Services/Modalidad.service";
import { RegistroasistenciaService } from "../../../../application/catalogos/registroasistencia/Services/Registroasistencia.service";
import { MesejecucionDTO } from "src/app/application/catalogos/mesejecucion/DTO/MesejecucionDTO";
import { MesejecucionService } from "src/app/application/catalogos/mesejecucion/Services/Mesejecucion.service";

@Component({
  selector: "app-nrp36-anexo4",
  templateUrl: "./nrp36-anexo4.component.html",
  styleUrl: "./nrp36-anexo4.component.scss",
})
export class Nrp36Anexo4Component {
  // Table data anexo4
  anexo4List$: BehaviorSubject<Anexo4DTO[]> = new BehaviorSubject<Anexo4DTO[]>(
    []
  );
  tipo_capacitacionList$: BehaviorSubject<TipocapacitacionDTO[]> =
    new BehaviorSubject<TipocapacitacionDTO[]>([]);

  registro_asistenciaList$: BehaviorSubject<RegistroasistenciaDTO[]> =
    new BehaviorSubject<RegistroasistenciaDTO[]>([]);

  modalidadList$: BehaviorSubject<ModalidadDTO[]> = new BehaviorSubject<
    ModalidadDTO[]
  >([]);

  mes_ejecucionList$: BehaviorSubject<MesejecucionDTO[]> = new BehaviorSubject<
    MesejecucionDTO[]
  >([]);

  // Table data
  anexo4DTO = new Anexo4DTO();
  tableColumns: TableColumn[] = generateTableColumns(this.anexo4DTO);

  // Select options
  selectOptions: { [key: string]: any[] } = {};

  constructor(
    private dataService: DataService,
    private anexo4Service: Anexo4Service,
    private tipocapacitacionService: TipocapacitacionService,
    private registroasistenciaService: RegistroasistenciaService,
    private modalidadService: ModalidadService,
    private mesejecucionService: MesejecucionService
  ) {}
  ngOnInit(): void {
    this.obtenerAnexo4();
    this.obtenerTipoCapacitacion();
    this.obtenerRegistroAsistencia();
    this.obtenerModalidad();
    this.obtenerMesEjecucion();

    this.initializeSelectOptions();
    this.setupSubscriptions();
  }

  private obtenerTipoCapacitacion(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.tipocapacitacionService,
      "getListadoTipoCapacitacion",
      this.tipo_capacitacionList$,
      "Error al obtener el listado de tipo capacitacion"
    );
  }
  private obtenerRegistroAsistencia(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.registroasistenciaService,
      "getListadoRegistroAsistencia",
      this.registro_asistenciaList$,
      "Error al obtener el listado de registro asistencia"
    );
  }

  private obtenerModalidad(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.modalidadService,
      "getListadoModalidad",
      this.modalidadList$,
      "Error al obtener el listado de modalidad"
    );
  }
  private obtenerMesEjecucion(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.mesejecucionService,
      "getListadoMesEjecucion",
      this.mes_ejecucionList$,
      "Error al obtener el listado de mes de ejecución"
    );
  }

  private initializeSelectOptions(): void {
    this.selectOptions = {
      tipo_capacitacion: this.mapTipoCapacitacion(
        this.tipo_capacitacionList$.getValue()
      ),
      registro_asistencia: this.mapRegistroAsistencia(
        this.registro_asistenciaList$.getValue()
      ),
      modalidad: this.mapModalidad(this.modalidadList$.getValue()),
      mes_ejecucion: this.mapMesEjecucion(this.mes_ejecucionList$.getValue()),
    };
  }

  private setupSubscriptions(): void {
    // Suscripción para tipo de capacitación
    this.tipo_capacitacionList$.subscribe((tipoCapacitacion) => {
      this.selectOptions = {
        ...this.selectOptions,
        tipo_capacitacion: this.mapTipoCapacitacion(tipoCapacitacion),
      };
    });
    // Suscripción para registro de asistencia
    this.registro_asistenciaList$.subscribe((registroAsistencia) => {
      this.selectOptions = {
        ...this.selectOptions,
        registro_asistencia: this.mapRegistroAsistencia(registroAsistencia),
      };
    });
    // Suscripción para modalidad
    this.modalidadList$.subscribe((modalidad) => {
      this.selectOptions = {
        ...this.selectOptions,
        modalidad: this.mapModalidad(modalidad),
      };
    });

    // Suscripción para mes de ejecución
    this.mes_ejecucionList$.subscribe((mesEjecucion) => {
      this.selectOptions = {
        ...this.selectOptions,
        mes_ejecucion: this.mapMesEjecucion(mesEjecucion),
      };
    });
  }

  private mapTipoCapacitacion(tipoCapacitacion: TipocapacitacionDTO[]): any[] {
    return tipoCapacitacion.map((tipo) => ({
      value: tipo.codigo,
      label: tipo.descripcion,
    }));
  }
  private mapRegistroAsistencia(
    registroAsistencia: RegistroasistenciaDTO[]
  ): any[] {
    return registroAsistencia.map((registro) => ({
      value: registro.codigo,
      label: registro.descripcion,
    }));
  }

  private mapModalidad(modalidad: ModalidadDTO[]): any[] {
    return modalidad.map((mod) => ({
      value: mod.codigo,
      label: mod.descripcion,
    }));
  }

  private mapMesEjecucion(mesEjecucion: MesejecucionDTO[]): any[] {
    return mesEjecucion.map((mes) => ({
      value: mes.codigo,
      label: mes.descripcion,
    }));
  }

  private mapToAnexoEdit(editAnexo: any): IAnexo4Edit {
    return {
      id: editAnexo.id,
      correlativo_tema: editAnexo.correlativo_tema,
      tema_capacitacion: editAnexo.tema_capacitacion,
      tipo_capacitacion: editAnexo.tipo_capacitacion,
      mes_ejecucion: editAnexo.mes_ejecucion,
      duracion: editAnexo.duracion,
      nombre_capacitador: editAnexo.nombre_capacitador,
      apellido_capacitador: editAnexo.apellido_capacitador,
      personal_objetivo: editAnexo.personal_objetivo,
      numero_participantes: editAnexo.numero_participantes,
      modalidad: editAnexo.modalidad,
      registro_asistencia: editAnexo.registro_asistencia,
      evaluacion: editAnexo.evaluacion,
      cod_usuario: editAnexo.cod_usuario,
    };
  }

  private obtenerAnexo4(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.anexo4Service,
      "getListadoAnexo4",
      this.anexo4List$,
      "Error al obtener el listado de Anexo 4"
    );
  }

  async onAddAnexo4(newAnexo: any): Promise<void> {
    const anexoFiltrado: IAnexo4Edit = this.mapToAnexoEdit(newAnexo);
    await this.dataService.agregarRegistro(
      this.anexo4Service,
      "guardarAnexo4",
      anexoFiltrado,
      "Anexo creado correctamente",
      "Error al agregar anexo4"
    );

    await this.obtenerAnexo4();
  }

  async onEditAnexo4(updatedAnexo: any): Promise<void> {
    const anexoFiltrado: IAnexo4Edit = this.mapToAnexoEdit(updatedAnexo);
    await this.dataService.actualizarRegistro(
      this.anexo4Service,
      "editarAnexo4",
      anexoFiltrado,
      "Anexo actualizado con éxito",
      "Error al actualizar el anexo4"
    );

    await this.obtenerAnexo4();
  }

  async onDeleteAnexo4(anexo: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.anexo4Service,
      "eliminarAnexo4",
      anexo.id,
      "Anexo eliminado correctamente",
      "Error al eliminar el anexo4"
    );

    await this.obtenerAnexo4();
  }

  async onDeactivateAnexo4(anexo: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.anexo4Service,
      "desactivarAnexo4",
      anexo.id,
      "Anexo desactivado correctamente",
      "Error al desactivar el anexo4"
    );

    await this.obtenerAnexo4();
  }
  async onActivateAnexo4(anexo: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.anexo4Service,
      "activarAnexo4",
      anexo.id,
      "Anexo activado correctamente",
      "Error al activar el anexo4"
    );

    await this.obtenerAnexo4();
  }

  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo4Service,
      "getListadoAnexo4XML",
      "XML",
      "Error al descargar el archivo de anexo4"
    );
  }

  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo4Service,
      "getListadoAnexo4Excel",
      "Excel",
      "Error al descargar el archivo de anexo4"
    );
  }
}
