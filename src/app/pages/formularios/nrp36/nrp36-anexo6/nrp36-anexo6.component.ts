import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Anexo6DTO } from "src/app/application/npr36/anexo6/DTO/Anexo6DTO";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";
import { DataService } from "src/app/core/services/data.service";
import { Anexo6Service } from "src/app/application/npr36/anexo6/Services/Anexo6.service";

@Component({
  selector: "app-nrp36-anexo6",
  templateUrl: "./nrp36-anexo6.component.html",
  styleUrl: "./nrp36-anexo6.component.scss",
})
export class Nrp36Anexo6Component {
  // Table data anexo6
  anexo6List$: BehaviorSubject<Anexo6DTO[]> = new BehaviorSubject<Anexo6DTO[]>(
    []
  );

  // Table data
  anexo6DTO = new Anexo6DTO();
  tableColumns: TableColumn[] = generateTableColumns(this.anexo6DTO);

  // Select options
  selectOptions: { [key: string]: any[] } = {};

  constructor(
    private dataService: DataService,
    private anexo6Service: Anexo6Service
  ) {}

  ngOnInit(): void {
    this.obtenerAnexo6();
    this.initializeSelectOptions();
    this.setupSubscriptions();
  }

  private initializeSelectOptions(): void {
    this.selectOptions = {
      // Initialize select options here if needed
    };
  }

  private setupSubscriptions(): void {
    // Setup subscriptions for select options if needed
  }

  async obtenerAnexo6(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.anexo6Service,
      "getListadoAnexo6",
      this.anexo6List$,
      "Error al cargar Anexo6"
    );
  }

  async onAddAnexo6(newAnexo: any): Promise<void> {
    const anexoFiltrado: Anexo6DTO = new Anexo6DTO(newAnexo);
    await this.dataService.agregarRegistro(
      this.anexo6Service,
      "guardarAnexo6",
      anexoFiltrado,
      "Anexo creado correctamente",
      "Error al agregar Anexo6"
    );

    await this.obtenerAnexo6();
  }

  async onEditAnexo6(updatedAnexo: any): Promise<void> {
    await this.dataService.actualizarRegistro(
      this.anexo6Service,
      "editarAnexo6",
      updatedAnexo,
      "Anexo editado correctamente",
      "Error al editar Anexo6"
    );

    await this.obtenerAnexo6();
  }

  async onDeleteAnexo6(anexo: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.anexo6Service,
      "eliminarAnexo6",
      anexo.id,
      "Anexo eliminado correctamente",
      "Error al eliminar anexo6"
    );

    await this.obtenerAnexo6();
  }

  async onDeactivateAnexo6(anexo: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.anexo6Service,
      "desactivarAnexo6",
      anexo.id,
      "Anexo desactivado correctamente",
      "Error al desactivar Anexo6"
    );

    await this.obtenerAnexo6();
  }

  async onActivateAnexo6(anexo: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.anexo6Service,
      "activarAnexo6",
      anexo.id,
      "Anexo activado correctamente",
      "Error al activar Anexo6"
    );

    await this.obtenerAnexo6();
  }

  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo6Service,
      "getListadoAnexo6XML",
      "XML",
      "Error al descargar el archivo de anexo6"
    );
  }

  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo6Service,
      "getListadoAnexo6Excel",
      "Excel",
      "Error al descargar el archivo de anexo6"
    );
  }
}
