import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Anexo8DTO } from "src/app/application/npr36/anexo8/DTO/Anexo8DTO";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";
import { DataService } from "src/app/core/services/data.service";
import { Anexo8Service } from "src/app/application/npr36/anexo8/Services/Anexo8.service";

@Component({
  selector: "app-nrp36-anexo8",
  templateUrl: "./nrp36-anexo8.component.html",
  styleUrl: "./nrp36-anexo8.component.scss",
})
export class Nrp36Anexo8Component {
  // Table data anexo8
  anexo8List$: BehaviorSubject<Anexo8DTO[]> = new BehaviorSubject<Anexo8DTO[]>(
    []
  );

  // Table data
  anexo8DTO = new Anexo8DTO();
  tableColumns: TableColumn[] = generateTableColumns(this.anexo8DTO);

  // Select options
  selectOptions: { [key: string]: any[] } = {};

  constructor(
    private dataService: DataService,
    private anexo8Service: Anexo8Service
  ) {}

  ngOnInit(): void {
    this.obtenerAnexo8();
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

  async obtenerAnexo8(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.anexo8Service,
      "getListadoAnexo8",
      this.anexo8List$,
      "Error al cargar Anexo8"
    );
  }
  async onAddAnexo8(newAnexo: any): Promise<void> {
    const anexoFiltrado: Anexo8DTO = new Anexo8DTO(newAnexo);
    await this.dataService.agregarRegistro(
      this.anexo8Service,
      "guardarAnexo8",
      anexoFiltrado,
      "Anexo creado correctamente",
      "Error al agregar Anexo8"
    );
    await this.obtenerAnexo8();
  }

  async onEditAnexo8(updatedAnexo: any): Promise<void> {
    const anexoFiltrado: Anexo8DTO = new Anexo8DTO(updatedAnexo);
    await this.dataService.actualizarRegistro(
      this.anexo8Service,
      "editarAnexo8",
      anexoFiltrado,
      "Anexo editado correctamente",
      "Error al editar Anexo8"
    );
    await this.obtenerAnexo8();
  }

  async onDeleteAnexo8(anexo: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.anexo8Service,
      "eliminarAnexo8",
      anexo,
      "Anexo eliminado correctamente",
      "Error al eliminar Anexo8"
    );
    await this.obtenerAnexo8();
  }

  async onDeactivateAnexo8(anexo: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.anexo8Service,
      "desactivarAnexo8",
      anexo.id,
      "Anexo desactivado correctamente",
      "Error al desactivar Anexo8"
    );
    await this.obtenerAnexo8();
  }

  async onActivateAnexo8(anexo: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.anexo8Service,
      "activarAnexo8",
      anexo.id,
      "Anexo activado correctamente",
      "Error al activar Anexo8"
    );
    await this.obtenerAnexo8();
  }

  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo8Service,
      "getListadoAnexo8Excel",
      "Excel",
      "Error al descargar archivo Excel"
    );
  }

  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo8Service,
      "getListadoAnexo8XML",
      "XML",
      "Error al descargar archivo XML"
    );
  }
}
