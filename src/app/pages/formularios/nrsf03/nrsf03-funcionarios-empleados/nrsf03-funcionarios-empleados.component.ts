import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FuncionariosEmpleadosDTO } from "src/app/application/nrsf03/funcionarios_empleados/DTO/FuncionariosEmpleadosDTO";
import { FuncionariosEmpleadosService } from "src/app/application/nrsf03/funcionarios_empleados/Services/FuncionariosEmpleados.service";
import { DataService } from "src/app/core/services/data.service";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";

@Component({
  selector: "app-nrsf03-funcionarios-empleados",
  templateUrl: "./nrsf03-funcionarios-empleados.component.html",
  styleUrl: "./nrsf03-funcionarios-empleados.component.scss",
})
export class Nrsf03FuncionariosEmpleadosComponent {
  //table data funcionarios empleados
  funcionariosEmpleadosList$: BehaviorSubject<FuncionariosEmpleadosDTO[]> =
    new BehaviorSubject<FuncionariosEmpleadosDTO[]>([]);

  // Table data
  funcionariosEmpleadosDTO = new FuncionariosEmpleadosDTO();
  tableColumns: TableColumn[] = generateTableColumns(
    this.funcionariosEmpleadosDTO
  );

  constructor(
    private funcionariosEmpleadosService: FuncionariosEmpleadosService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.obtenerFuncionariosEmpleados();
  }

  /**
   * Obtiene el listado de funcionarios empleados y emite los datos a funcionariosEmpleadosList$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerFuncionariosEmpleados(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.funcionariosEmpleadosService,
      "getListadoFuncionariosEmpleados",
      this.funcionariosEmpleadosList$,
      "Error al cargar funcionarios empleados"
    );
  }

  /**
   * Descarga el archivo XML de los funcionarios empleados.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */

  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.funcionariosEmpleadosService,
      "getListadoFuncionariosEmpleadosXML",
      "XML",
      "Error al descargar el archivo de funcionarios empleados"
    );
  }

  /**
   * Descarga el archivo Excel de los funcionarios empleados.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */

  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.funcionariosEmpleadosService,
      "getListadoFuncionariosEmpleadosExcel",
      "Excel",
      "Error al descargar el archivo de funcionarios empleados"
    );
  }

  /**
   * Descarga el archivo PDF de los funcionarios empleados.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */

  async descargarArchivoPDF(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.funcionariosEmpleadosService,
      "getListadoFuncionariosEmpleadosPDF",
      "PDF",
      "Error al descargar el archivo de funcionarios empleados"
    );
  }

  /**
   * Descarga el archivo de texto plano de los funcionarios empleados.
   * Emite un mensaje de error si ocurre un error al descargar el archivo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la descarga del archivo.
   */

  async descargarArchivoTexto(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.funcionariosEmpleadosService,
      "getListadoFuncionariosEmpleadosTexto",
      "Texto",
      "Error al descargar el archivo de funcionarios empleados"
    );
  }
}
