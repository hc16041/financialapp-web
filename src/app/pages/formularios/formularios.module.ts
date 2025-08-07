import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms"; // Importa FormsModule
import { FormulariosRoutingModule } from "./formularios-routing.module";
import { Nrp41PersonasComponent } from "./nrp41/nrp41-personas/nrp41-personas.component";
import {
  NgbPaginationModule,
  NgbHighlight,
  NgbDropdownModule,
  NgbTypeaheadModule,
  NgbPopoverModule,
} from "@ng-bootstrap/ng-bootstrap";
import { GenericTableComponent } from "./genericos/generictable/generictable.component";
import { Nrp41ReferenciaComponent } from "./nrp41/nrp41-referencia/nrp41-referencia.component";
import { Nrp41ReferenciaGarantiaComponent } from "./nrp41/nrp41-referencia-garantia/nrp41-referencia-garantia.component";
import { Nrp41GarantiaHipotecariaComponent } from "./nrp41/nrp41-garantia-hipotecaria/nrp41-garantia-hipotecaria.component";
import { Nrp41GarantiaFiduciariaComponent } from "./nrp41/nrp41-garantia-fiduciaria/nrp41-garantia-fiduciaria.component";
import { Nrp41GarantiaPrendaComponent } from "./nrp41/nrp41-garantia-prenda/nrp41-garantia-prenda.component";
import { Nrp41GarantiaBonoComponent } from "./nrp41/nrp41-garantia-bono/nrp41-garantia-bono.component";
import { Nrp41GarantiaPolizaComponent } from "./nrp41/nrp41-garantia-poliza/nrp41-garantia-poliza.component";
import { Nrp41GarantiaFondoComponent } from "./nrp41/nrp41-garantia-fondo/nrp41-garantia-fondo.component";
import { Nrp41ReferenciaGastoComponent } from "./nrp41/nrp41-referencia-gasto/nrp41-referencia-gasto.component";
import { Nrp41ReferenciaUnidadComponent } from "./nrp41/nrp41-referencia-unidad/nrp41-referencia-unidad.component";
import { Nrp41ReferenciaCanceladaComponent } from "./nrp41/nrp41-referencia-cancelada/nrp41-referencia-cancelada.component";
import { Nrp41SociosSociedadesComponent } from "./nrp41/nrp41-socios-sociedades/nrp41-socios-sociedades.component";
import { Nrp41JuntaDirectivaComponent } from "./nrp41/nrp41-junta-directiva/nrp41-junta-directiva.component";
import { Nrp41GarantiaPrendariaComponent } from "./nrp41/nrp41-garantia-prendaria/nrp41-garantia-prendaria.component";
import { CentriesCargoComponent } from "./centries/centries-cargo/centries-cargo.component";
import { CentriesPerfilComponent } from "./centries/centries-perfil/centries-perfil.component";
import { CentriesPermisoperfilComponent } from "./centries/centries-permisoperfil/centries-permisoperfil.component";
import { GenericModalDialogComponent } from "./genericos/generic-modal-dialog/generic-modal-dialog.component";
import { Nrp41GarantiaAvalComponent } from "./nrp41/nrp41-garantia-aval/nrp41-garantia-aval.component";
import { Nrp41GarantiaPignoradaComponent } from "./nrp41/nrp41-garantia-pignorada/nrp41-garantia-pignorada.component";
import { CentriesUsuarioComponent } from "./centries/centries-usuario/centries-usuario.component";
import { CentriesUsuariosInactivosComponent } from "./centries/centries-usuarios-inactivos/centries-usuarios-inactivos.component";
import { CentriesPermisosComponent } from "./centries/centries-permisos/centries-permisos.component";
import { AccessDeniedComponent } from "./acceso/access-denied/access-denied.component";
import { Nrsf03ClientesComponent } from "./nrsf03/nrsf03-clientes/nsrf03-clientes.component";
import { Nrsf03DepositosComponent } from "./nrsf03/nrsf03-depositos/nrsf03-depositos.component";
import { Nrsf03DocsClienteComponent } from "./nrsf03/nrsf03-docs-cliente/nrsf03-docs-cliente.component";
import { Nrsf03TitularesComponent } from "./nrsf03/nrsf03-titulares/nrsf03-titulares.component";
import { Nrsf03CatalogoAgenciasComponent } from "./nrsf03/nrsf03-catalogo-agencias/nrsf03-catalogo-agencias.component";
import { Nrsf03ProductosComponent } from "./nrsf03/nrsf03-productos/nrsf03-productos.component";
import { Nrsf03FuncionariosEmpleadosComponent } from "./nrsf03/nrsf03-funcionarios-empleados/nrsf03-funcionarios-empleados.component";
import { Nrsf03DepositosGarantizadosComponent } from "./nrsf03/nrsf03-depositos-garantizados/nrsf03-depositos-garantizados.component";
import { Nrsf03AjustesComponent } from "./nrsf03/nrsf03-ajustes/nrsf03-ajustes.component";
import { Nrsf01Anexo1Component } from "./nrsf01/nrsf01-anexo1/nrsf01-anexo1.component";
import { Nrsf01Anexo2Component } from "./nrsf01/nrsf01-anexo2/nrsf01-anexo2.component";
import { Nrsf01Anexo3Component } from "./nrsf01/nrsf01-anexo3/nrsf01-anexo3.component";
import { Nrsf01Anexo4Component } from "./nrsf01/nrsf01-anexo4/nrsf01-anexo4.component";
import { Nrsf01Anexo5Component } from "./nrsf01/nrsf01-anexo5/nrsf01-anexo5.component";
import { Nrsf01Anexo6Component } from "./nrsf01/nrsf01-anexo6/nrsf01-anexo6.component";
import { Nrsf01Anexo7Component } from "./nrsf01/nrsf01-anexo7/nrsf01-anexo7.component";
import { Nrsf01Anexo8Component } from "./nrsf01/nrsf01-anexo8/nrsf01-anexo8.component";
import { Nrfs01Anexo10Component } from "./nrsf01/nrfs01-anexo10/nrfs01-anexo10.component";
import { Nrfs01Anexo11Component } from "./nrsf01/nrfs01-anexo11/nrfs01-anexo11.component";
import { Nrfs01Anexo12Component } from "./nrsf01/nrfs01-anexo12/nrfs01-anexo12.component";
import { Nrp36Anexo1Component } from "./nrp36/nrp36-anexo1/nrp36-anexo1.component";
import { Nrp36Anexo2Component } from "./nrp36/nrp36-anexo2/nrp36-anexo2.component";
import { Nrp36Anexo3Component } from "./nrp36/nrp36-anexo3/nrp36-anexo3.component";
import { Nrp36Anexo4Component } from "./nrp36/nrp36-anexo4/nrp36-anexo4.component";
import { Nrp36Anexo5Component } from "./nrp36/nrp36-anexo5/nrp36-anexo5.component";
import { Nrp36Anexo6Component } from "./nrp36/nrp36-anexo6/nrp36-anexo6.component";
import { Nrp36Anexo7Component } from "./nrp36/nrp36-anexo7/nrp36-anexo7.component";
import { Nrp36Anexo8Component } from "./nrp36/nrp36-anexo8/nrp36-anexo8.component";
import { Nrp51SaldoCuentaComponent } from "./nrp51/nrp51-saldocuenta/nrp51-saldocuenta.component";
import { Nrp51DepositoExtranjeroComponent } from "./nrp51/nrp51-depositoextranjero/nrp51-depositoextranjero.component";
import { Nrp51DatoExtracontableComponent } from "./nrp51/nrp51-datoextracontable/nrp51-datoextracontable.component";
import { Nrp51PrestamoGarantizadoComponent } from "./nrp51/nrp51-prestamogarantizado/nrp51-prestamogarantizado.component";
import { Nrp51AvalGarantizadoComponent } from "./nrp51/nrp51-avalgarantizado/nrp51-avalgarantizado.component";
import { Nrp51DeudaSubordinadaComponent } from "./nrp51/nrp51-deudasubordinada/nrp51-deudasubordinada.component";
import { Nrp51BalanceProyectadoComponent } from "./nrp51/nrp51-balanceproyectado/nrp51-balanceproyectado.component";
import { TokenExpiredComponent } from "./acceso/token-expired/token-expired.component";
import { Nrp51TituloValorExtranjeroComponent } from "./nrp51/nrp51-titulovalorextranjero/nrp51-titulovalorextranjero.component";
import { CentriesBitacoraComponent } from "./centries/centries-bitacora/centries-bitacora.component";
import { CreditcardComponent } from './creditcard/creditcard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { MerchantsComponent } from './merchants/merchants.component';

@NgModule({
  declarations: [
    Nrp41PersonasComponent,
    GenericTableComponent,
    Nrp41ReferenciaComponent,
    Nrp41ReferenciaGarantiaComponent,
    Nrp41GarantiaAvalComponent,
    Nrp41GarantiaHipotecariaComponent,
    Nrp41GarantiaFiduciariaComponent,
    Nrp41GarantiaPignoradaComponent,
    Nrp41GarantiaPrendaComponent,
    Nrp41GarantiaBonoComponent,
    Nrp41GarantiaPolizaComponent,
    Nrp41GarantiaFondoComponent,
    Nrp41ReferenciaGastoComponent,
    Nrp41ReferenciaUnidadComponent,
    Nrp41ReferenciaCanceladaComponent,
    Nrp41SociosSociedadesComponent,
    Nrp41JuntaDirectivaComponent,
    Nrp41GarantiaPrendariaComponent,
    CentriesCargoComponent,
    CentriesPerfilComponent,
    CentriesPermisoperfilComponent,
    GenericModalDialogComponent,
    CentriesUsuarioComponent,
    CentriesUsuariosInactivosComponent,
    CentriesPermisosComponent,
    CentriesPermisoperfilComponent,
    AccessDeniedComponent,
    Nrsf03ClientesComponent,
    Nrsf03DepositosComponent,
    Nrsf03DocsClienteComponent,
    Nrsf03TitularesComponent,
    Nrsf03CatalogoAgenciasComponent,
    Nrsf03ProductosComponent,
    Nrsf03FuncionariosEmpleadosComponent,
    Nrsf03DepositosGarantizadosComponent,
    Nrsf03AjustesComponent,
    Nrsf01Anexo1Component,
    Nrsf01Anexo2Component,
    Nrsf01Anexo3Component,
    Nrsf01Anexo4Component,
    Nrsf01Anexo5Component,
    Nrsf01Anexo6Component,
    Nrsf01Anexo7Component,
    Nrsf01Anexo8Component,
    Nrfs01Anexo10Component,
    Nrfs01Anexo11Component,
    Nrfs01Anexo12Component,
    Nrp36Anexo1Component,
    Nrp36Anexo2Component,
    Nrp36Anexo3Component,
    Nrp36Anexo4Component,
    Nrp36Anexo5Component,
    Nrp36Anexo6Component,
    Nrp36Anexo7Component,
    Nrp36Anexo8Component,
    Nrp51SaldoCuentaComponent,
    Nrp51DepositoExtranjeroComponent,
    Nrp51DatoExtracontableComponent,
    Nrp51TituloValorExtranjeroComponent,
    Nrp51PrestamoGarantizadoComponent,
    Nrp51AvalGarantizadoComponent,
    Nrp51DeudaSubordinadaComponent,
    Nrp51BalanceProyectadoComponent,
    TokenExpiredComponent,
    CentriesBitacoraComponent,
    CreditcardComponent,
    TransactionsComponent,
    MerchantsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FormulariosRoutingModule,
    NgbPaginationModule,
    NgbHighlight,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbTypeaheadModule,
    NgbPopoverModule,
  ],
})
export class FormulariosModule {}
