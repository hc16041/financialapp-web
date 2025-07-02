import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TipocomunicacionDTO } from "src/app/application/catalogos/tipocomunicacion/DTO/TipocomunicacionDTO";
import { generateTableColumns } from "src/app/utils/table-utils";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { DataService } from "src/app/core/services/data.service";
import { IAnexo3Edit } from "src/app/application/npr36/anexo3/Interfaces/IAnexo3.interface";
import { Anexo3DTO } from "src/app/application/npr36/anexo3/DTO/Anexo3DTO";
import { Anexo3Service } from "src/app/application/npr36/anexo3/Services/Anexo3.service";

@Component({
  selector: "app-nrp36-anexo3",
  templateUrl: "./nrp36-anexo3.component.html",
  styleUrl: "./nrp36-anexo3.component.scss",
})
export class Nrp36Anexo3Component {
  // Table data anexo3
  anexo3List$: BehaviorSubject<Anexo3DTO[]> = new BehaviorSubject<Anexo3DTO[]>(
    []
  );

  rol_oficialesList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  tipo_comunicacionList$: BehaviorSubject<TipocomunicacionDTO[]> =
    new BehaviorSubject<TipocomunicacionDTO[]>([]);

  // Table data
  anexo3DTO = new Anexo3DTO();
  tableColumns: TableColumn[] = generateTableColumns(this.anexo3DTO);

  // Select options
  selectOptions: { [key: string]: any[] } = {};

  constructor(
    private dataService: DataService,
    private anexo3Service: Anexo3Service
  ) {}
  ngOnInit(): void {
    this.obtenerAnexo3();
  }
  private mapToAnexoEdit(editAnexo: any): IAnexo3Edit {
    return {
      id: editAnexo.id,
      periodo_plan: editAnexo.periodo_plan,
      nombre_responsable_elaboracion: editAnexo.nombre_responsable_elaboracion,
      apellido_responsable_elaboracion:
        editAnexo.apellido_responsable_elaboracion,
      organo_gobierno: editAnexo.organo_gobierno,
      numero_acta_aprobacion: editAnexo.numero_acta_aprobacion,
      numero_punto_acta: editAnexo.numero_punto_acta,
      fecha_aprobacion: editAnexo.fecha_aprobacion,
      cod_usuario: editAnexo.cod_usuario,
    };
  }

  private obtenerAnexo3(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.anexo3Service,
      "getListadoAnexo3",
      this.anexo3List$,
      "Error al obtener el listado de Anexo 3"
    );
  }

  async onAddAnexo3(newAnexo: any): Promise<void> {
    const anexoFiltrado: IAnexo3Edit = this.mapToAnexoEdit(newAnexo);
    await this.dataService.agregarRegistro(
      this.anexo3Service,
      "guardarAnexo3",
      anexoFiltrado,
      "Anexo creado correctamente",
      "Error al agregar anexo3"
    );

    await this.obtenerAnexo3();
  }

  async onEditAnexo3(updatedAnexo: any): Promise<void> {
    const anexoFiltrado: IAnexo3Edit = this.mapToAnexoEdit(updatedAnexo);
    await this.dataService.actualizarRegistro(
      this.anexo3Service,
      "editarAnexo3",
      anexoFiltrado,
      "Anexo actualizado con éxito",
      "Error al actualizar el anexo3"
    );

    await this.obtenerAnexo3();
  }

  async onDeleteAnexo3(anexo: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.anexo3Service,
      "eliminarAnexo3",
      anexo.id,
      "Anexo eliminado correctamente",
      "Error al eliminar anexo3"
    );

    await this.obtenerAnexo3();
  }

  async onDeactivateAnexo3(anexo: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.anexo3Service,
      "desactivarAnexo3",
      anexo.id,
      "Anexo desactivado correctamente",
      "Error al desactivar anexo3"
    );

    await this.obtenerAnexo3();
  }
  async onActivateAnexo3(anexo: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.anexo3Service,
      "activarAnexo3",
      anexo.id,
      "Anexo activado correctamente",
      "Error al activar anexo3"
    );

    await this.obtenerAnexo3();
  }

  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo3Service,
      "getListadoAnexo3XML",
      "XML",
      "Error al descargar el archivo de anexo3"
    );
  }

  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.anexo3Service,
      "getListadoAnexo3Excel",
      "Excel",
      "Error al descargar el archivo de anexo3"
    );
  }
}
