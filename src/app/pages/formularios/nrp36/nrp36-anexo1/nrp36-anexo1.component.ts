import { Component } from "@angular/core";
import { Anexo1DTO } from "src/app/application/npr36/anexo1/DTO/Anexo1DTO";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { BehaviorSubject } from "rxjs";
import { generateTableColumns } from "src/app/utils/table-utils";
import { DataService } from "src/app/core/services/data.service";
import { Anexo1Service } from "src/app/application/npr36/anexo1/Services/Anexo1.service";
import { IAnexo1Edit } from "src/app/application/npr36/anexo1/Interfaces/IAnexo1.interface";

@Component({
  selector: "app-nrp36-anexo1",
  templateUrl: "./nrp36-anexo1.component.html",
  styleUrl: "./nrp36-anexo1.component.scss",
})
export class Nrp36Anexo1Component {
  // Table data anexo1
  anexo1List$: BehaviorSubject<Anexo1DTO[]> = new BehaviorSubject<Anexo1DTO[]>(
    []
  );

  // Table data
  anexo1DTO = new Anexo1DTO();
  tableColumns: TableColumn[] = generateTableColumns(this.anexo1DTO);

  // Select options
  selectOptions: { [key: string]: any[] } = {};

  constructor(
    private dataService: DataService,
    private anexo1Service: Anexo1Service
  ) {}

  ngOnInit(): void {
    this.obtenerAnexo1();
  }

  private mapToAnexoEdit(editAnexo: any): IAnexo1Edit {
    return {
      id: editAnexo.id,
      dependencia_jerarquica: editAnexo.dependencia_jerarquica,
      numero_personal: editAnexo.numero_personal,
      organo_gobierno_autorizo: editAnexo.organo_gobierno_autorizo,
      fecha_aprobacion: editAnexo.fecha_aprobacion,
      numero_acta_aprobacion: editAnexo.numero_acta_aprobacion,
      cod_usuario: editAnexo.cod_usuario,
    };
  }

  /**
   * Obtiene el listado de anexo1 y emite los datos a anexo1List$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerAnexo1(): Promise<void> {
    // console.log(this.anexo1List$);
    return this.dataService.obtenerDatos(
      this.anexo1Service,
      "getListadoAnexo1",
      this.anexo1List$,
      "Error al cargar anexo1"
    );
    // console.log(this.anexo1List$);
  }

  async onAddAnexo1(newAnexo: any): Promise<void> {
    const anexoFiltrado: IAnexo1Edit = this.mapToAnexoEdit(newAnexo);
    await this.dataService.agregarRegistro(
      this.anexo1Service,
      "guardarAnexo1",
      anexoFiltrado,
      "Anexo creado correctamente",
      "Error al agregar anexo1"
    );

    await this.obtenerAnexo1();
  }

  async onEditAnexo1(updatedAnexo: any): Promise<void> {
    const anexoFiltrado: IAnexo1Edit = this.mapToAnexoEdit(updatedAnexo);
    await this.dataService.actualizarRegistro(
      this.anexo1Service,
      "editarAnexo1",
      anexoFiltrado,
      "Anexo actualizado con éxito",
      "Error al actualizar el anexo"
    );

    await this.obtenerAnexo1();
  }

  async onDeleteAnexo1(anexo: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.anexo1Service,
      "eliminarAnexo1",
      anexo.id,
      "Anexo eliminado correctamente",
      "Error al eliminar anexo1"
    );

    await this.obtenerAnexo1();
  }

  async onDeactivateAnexo1(anexo: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.anexo1Service,
      "desactivarAnexo1",
      anexo.id,
      "Anexo desactivado correctamente",
      "Error al desactivar Anexo1"
    );

    await this.obtenerAnexo1();
  }
  async onActivateAnexo1(anexo: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.anexo1Service,
      "activarAnexo1",
      anexo.id,
      "Anexo activado correctamente",
      "Error al activar Anexo1"
    );

    await this.obtenerAnexo1();
  }

  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo1Service,
      "getListadoAnexo1XML",
      "XML",
      "Error al descargar el archivo de anexo1"
    );
  }

  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo1Service,
      "getListadoAnexo1Excel",
      "Excel",
      "Error al descargar el archivo de anexo1"
    );
  }
}
