import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Anexo7DTO } from "src/app/application/npr36/anexo7/DTO/Anexo7DTO";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";
import { DataService } from "src/app/core/services/data.service";
import { Anexo7Service } from "src/app/application/npr36/anexo7/Services/Anexo7.service";
import { ActividadinformadaDTO } from "../../../../application/catalogos/actividadinformada/DTO/ActividadinformadaDTO";
import { ActividadinformadaService } from "src/app/application/catalogos/actividadinformada/Services/Actividadinformada.service";

@Component({
  selector: "app-nrp36-anexo7",
  templateUrl: "./nrp36-anexo7.component.html",
  styleUrl: "./nrp36-anexo7.component.scss",
})
export class Nrp36Anexo7Component {
  // Table data anexo7
  anexo7List$: BehaviorSubject<Anexo7DTO[]> = new BehaviorSubject<Anexo7DTO[]>(
    []
  );

  // Table Actividad Informada
  actividadInformadaList$: BehaviorSubject<ActividadinformadaDTO[]> =
    new BehaviorSubject<ActividadinformadaDTO[]>([]);

  // Table data
  anexo7DTO = new Anexo7DTO();
  tableColumns: TableColumn[] = generateTableColumns(this.anexo7DTO);

  // Select options
  selectOptions: { [key: string]: any[] } = {};

  constructor(
    private dataService: DataService,
    private anexo7Service: Anexo7Service,
    private actividadInformadaService: ActividadinformadaService
  ) {}

  ngOnInit(): void {
    this.obtenerAnexo7();
    this.obtenerActividadInformada();
    this.initializeSelectOptions();
    this.setupSubscriptions();
  }

  private initializeSelectOptions(): void {
    this.selectOptions = {
      // Initialize select options here if needed
      actividad_informada: this.mapActividadInformada(
        this.actividadInformadaList$.getValue()
      ),
    };
  }

  private setupSubscriptions(): void {
    // Setup subscriptions for select options if needed
    this.actividadInformadaList$.subscribe((actividadInformadaList) => {
      this.selectOptions = {
        ...this.selectOptions,
        actividad_informada: this.mapActividadInformada(actividadInformadaList),
      };
    });
  }

  private mapActividadInformada(
    actividadInformadaList: ActividadinformadaDTO[]
  ): any[] {
    return actividadInformadaList.map((actividad) => ({
      value: actividad.codigo,
      label: actividad.descripcion,
    }));
  }

  async obtenerActividadInformada(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.actividadInformadaService,
      "getListadoActividadInformada",
      this.actividadInformadaList$,
      "Error al cargar Actividad Informada"
    );
  }

  async obtenerAnexo7(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.anexo7Service,
      "getListadoAnexo7",
      this.anexo7List$,
      "Error al cargar Anexo7"
    );
  }

  async onAddAnexo7(newAnexo: any): Promise<void> {
    const anexoFiltrado: Anexo7DTO = new Anexo7DTO(newAnexo);
    await this.dataService.agregarRegistro(
      this.anexo7Service,
      "guardarAnexo7",
      anexoFiltrado,
      "Anexo creado correctamente",
      "Error al guardar Anexo7"
    );

    await this.obtenerAnexo7();
  }

  async onEditAnexo7(updatedAnexo: any): Promise<void> {
    const anexoFiltrado: Anexo7DTO = new Anexo7DTO(updatedAnexo);
    await this.dataService.actualizarRegistro(
      this.anexo7Service,
      "editarAnexo7",
      anexoFiltrado,
      "Anexo editado correctamente",
      "Error al editar Anexo7"
    );

    await this.obtenerAnexo7();
  }

  async onDeleteAnexo7(anexo: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.anexo7Service,
      "eliminarAnexo7",
      anexo,
      "Anexo eliminado correctamente",
      "Error al eliminar Anexo7"
    );

    await this.obtenerAnexo7();
  }

  async onDeactivateAnexo7(anexo: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.anexo7Service,
      "desactivarAnexo7",
      anexo.id,
      "Anexo desactivado correctamente",
      "Error al desactivar Anexo7"
    );

    await this.obtenerAnexo7();
  }

  async onActivateAnexo7(anexo: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.anexo7Service,
      "activarAnexo7",
      anexo.id,
      "Anexo activado correctamente",
      "Error al activar Anexo7"
    );

    await this.obtenerAnexo7();
  }

  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo7Service,
      "getListadoAnexo7Excel",
      "Excel",
      "Error al descargar el archivo de anexo7"
    );
  }

  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo7Service,
      "getListadoAnexo7XML",
      "XML",
      "Error al descargar el archivo de anexo7"
    );
  }
}
