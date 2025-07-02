import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Anexo5DTO } from "src/app/application/npr36/anexo5/DTO/Anexo5DTO";
import { Anexo5Service } from "src/app/application/npr36/anexo5/Services/Anexo5.service";
import { DataService } from "src/app/core/services/data.service";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";
import { ActividadinformadaDTO } from "../../../../application/catalogos/actividadinformada/DTO/ActividadinformadaDTO";
import { ActividadinformadaService } from "../../../../application/catalogos/actividadinformada/Services/Actividadinformada.service";

@Component({
  selector: "app-nrp36-anexo5",
  templateUrl: "./nrp36-anexo5.component.html",
  styleUrl: "./nrp36-anexo5.component.scss",
})
export class Nrp36Anexo5Component {
  // Table data anexo5
  anexo5List$: BehaviorSubject<Anexo5DTO[]> = new BehaviorSubject<Anexo5DTO[]>(
    []
  );
  // table actividad informada
  actividadInformadaList$: BehaviorSubject<ActividadinformadaDTO[]> =
    new BehaviorSubject<ActividadinformadaDTO[]>([]);

  // Table data
  anexo5DTO = new Anexo5DTO();
  tableColumns: TableColumn[] = generateTableColumns(this.anexo5DTO);

  // Select options
  selectOptions: { [key: string]: any[] } = {};

  constructor(
    private dataService: DataService,
    private anexo5Service: Anexo5Service,
    private actividadInformadaService: ActividadinformadaService
  ) {}

  ngOnInit(): void {
    this.obtenerAnexo5();
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
      "Error al cargar actividad informada"
    );
  }

  async obtenerAnexo5(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.anexo5Service,
      "getListadoAnexo5",
      this.anexo5List$,
      "Error al cargar anexo5"
    );
  }

  async onAddAnexo5(newAnexo: any): Promise<void> {
    const anexoFiltrado: Anexo5DTO = new Anexo5DTO(newAnexo);
    await this.dataService.agregarRegistro(
      this.anexo5Service,
      "guardarAnexo5",
      anexoFiltrado,
      "Anexo creado correctamente",
      "Error al agregar anexo5"
    );
    this.obtenerAnexo5(); // Refresh the list after adding a new record
  }
  async onEditAnexo5(anexo: Anexo5DTO): Promise<void> {
    await this.dataService.actualizarRegistro(
      this.anexo5Service,
      "editarAnexo5",
      anexo,
      "Anexo actualizado correctamente",
      "Error al actualizar anexo5"
    );
    this.obtenerAnexo5(); // Refresh the list after editing a record
  }
  async onDeleteAnexo5(anexo: Anexo5DTO): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.anexo5Service,
      "eliminarAnexo5",
      anexo.id,
      "Anexo eliminado correctamente",
      "Error al eliminar anexo5"
    );
    this.obtenerAnexo5(); // Refresh the list after deleting a record
  }

  async onDeactivateAnexo5(anexo: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.anexo5Service,
      "desactivarAnexo5",
      anexo.id,
      "Anexo desactivado correctamente",
      "Error al desactivar anexo5"
    );
    this.obtenerAnexo5(); // Refresh the list after deactivating a record
  }

  async onActivateAnexo5(anexo: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.anexo5Service,
      "activarAnexo5",
      anexo.id,
      "Anexo activado correctamente",
      "Error al activar anexo5"
    );
    this.obtenerAnexo5(); // Refresh the list after activating a record
  }

  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo5Service,
      "getListadoAnexo5XML",
      "XML",
      "Error al descargar el archivo de anexo5"
    );
  }
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo5Service,
      "getListadoAnexo5Excel",
      "Excel",
      "Error al descargar el archivo de anexo5"
    );
  }
}
