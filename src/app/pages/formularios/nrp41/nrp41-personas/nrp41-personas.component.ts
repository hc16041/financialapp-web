import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TableColumn } from "../../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";
import { DataService } from "../../../../core/services/data.service";
import { PersonaDTO } from "src/app/application/nrp41/personas/DTO/PersonaDTO";
import { PersonaService } from "src/app/application/nrp41/personas/Services/personas.service";

@Component({
  selector: "app-nrp41-personas",
  templateUrl: "./nrp41-personas.component.html",
  styleUrl: "./nrp41-personas.component.scss",
})
export class Nrp41PersonasComponent {
  //Table data personas
  personasList$: BehaviorSubject<PersonaDTO[]> = new BehaviorSubject<
    PersonaDTO[]
  >([]);

  // Table data
  personaDTO = new PersonaDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.personaDTO);

  constructor(
    private dataService: DataService,
    private personaService: PersonaService
  ) {}

  ngOnInit(): void {
    this.obtenerPersonas();
  }

  /**
   * Obtiene el listado de personas y emite los datos a personasList$.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la carga de los datos.
   */
  async obtenerPersonas(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.personaService,
      "getListadoPersonas",
      this.personasList$,
      "Error al cargar personas"
    );
  }

  /**
   * Descarga un archivo XML que contiene el listado de personas.
   * Hace una solicitud al servicio para obtener los datos XML y
   * utiliza el servicio de descarga para guardar el archivo.
   * Muestra un mensaje de error si la descarga falla.
   *
   * @returns {Promise<void>} Promesa que se resuelve cuando el archivo se ha descargado.
   */

  async descargarArchivoXML(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.personaService,
      "getListadoPersonasXML",
      "XML",
      "Error al descargar el archivo de personas"
    );
  }

  /**
   * Descarga un archivo Excel que contiene el listado de personas.
   * Hace una solicitud al servicio para obtener los datos Excel y
   * utiliza el servicio de descarga para guardar el archivo.
   * Muestra un mensaje de error si la descarga falla.
   *
   * @returns {Promise<void>} Promesa que se resuelve cuando el archivo se ha descargado.
   */
  async descargarArchivoExcel(): Promise<void> {
    return this.dataService.descargarArchivo(
      this.personaService,
      "getListadoPersonasExcel",
      "Excel",
      "Error al descargar el archivo de personas"
    );
  }
}
