import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Nrp41PersonasComponent } from "./nrp41/nrp41-personas/nrp41-personas.component";
import { Nrp41ReferenciaGarantiaComponent } from "./nrp41/nrp41-referencia-garantia/nrp41-referencia-garantia.component";
import { Nrp41ReferenciaComponent } from "./nrp41/nrp41-referencia/nrp41-referencia.component";
import { Nrp41GarantiaHipotecariaComponent } from "./nrp41/nrp41-garantia-hipotecaria/nrp41-garantia-hipotecaria.component";
import { Nrp41GarantiaFiduciariaComponent } from "./nrp41/nrp41-garantia-fiduciaria/nrp41-garantia-fiduciaria.component";
import { Nrp41GarantiaPrendaComponent } from "./nrp41/nrp41-garantia-prenda/nrp41-garantia-prenda.component";
import { Nrp41GarantiaBonoComponent } from "./nrp41/nrp41-garantia-bono/nrp41-garantia-bono.component";
import { Nrp41GarantiaFondoComponent } from "./nrp41/nrp41-garantia-fondo/nrp41-garantia-fondo.component";
import { Nrp41GarantiaPolizaComponent } from "./nrp41/nrp41-garantia-poliza/nrp41-garantia-poliza.component";
import { Nrp41ReferenciaGastoComponent } from "./nrp41/nrp41-referencia-gasto/nrp41-referencia-gasto.component";
import { Nrp41ReferenciaUnidadComponent } from "./nrp41/nrp41-referencia-unidad/nrp41-referencia-unidad.component";
import { Nrp41ReferenciaCanceladaComponent } from "./nrp41/nrp41-referencia-cancelada/nrp41-referencia-cancelada.component";
import { Nrp41SociosSociedadesComponent } from "./nrp41/nrp41-socios-sociedades/nrp41-socios-sociedades.component";
import { Nrp41JuntaDirectivaComponent } from "./nrp41/nrp41-junta-directiva/nrp41-junta-directiva.component";
import { Nrp41GarantiaPrendariaComponent } from "./nrp41/nrp41-garantia-prendaria/nrp41-garantia-prendaria.component";
import { CentriesCargoComponent } from "./centries/centries-cargo/centries-cargo.component";
import { CentriesPerfilComponent } from "./centries/centries-perfil/centries-perfil.component";
import { CentriesPermisoperfilComponent } from "./centries/centries-permisoperfil/centries-permisoperfil.component";
import { Nrp41GarantiaAvalComponent } from "./nrp41/nrp41-garantia-aval/nrp41-garantia-aval.component";
import { Nrp41GarantiaPignoradaComponent } from "./nrp41/nrp41-garantia-pignorada/nrp41-garantia-pignorada.component";
import { CentriesUsuarioComponent } from "./centries/centries-usuario/centries-usuario.component";
import { CentriesUsuariosInactivosComponent } from "./centries/centries-usuarios-inactivos/centries-usuarios-inactivos.component";
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
import { Nrsf01Anexo8Component } from "./nrsf01/nrsf01-anexo8/nrsf01-anexo8.component";
import { Nrsf01Anexo7Component } from "./nrsf01/nrsf01-anexo7/nrsf01-anexo7.component";
import { Nrsf01Anexo6Component } from "./nrsf01/nrsf01-anexo6/nrsf01-anexo6.component";
import { Nrsf01Anexo5Component } from "./nrsf01/nrsf01-anexo5/nrsf01-anexo5.component";
import { Nrsf01Anexo4Component } from "./nrsf01/nrsf01-anexo4/nrsf01-anexo4.component";
import { Nrsf01Anexo3Component } from "./nrsf01/nrsf01-anexo3/nrsf01-anexo3.component";
import { Nrsf01Anexo2Component } from "./nrsf01/nrsf01-anexo2/nrsf01-anexo2.component";
import { Nrfs01Anexo10Component } from "./nrsf01/nrfs01-anexo10/nrfs01-anexo10.component";
import { Nrfs01Anexo11Component } from "./nrsf01/nrfs01-anexo11/nrfs01-anexo11.component";
import { Nrfs01Anexo12Component } from "./nrsf01/nrfs01-anexo12/nrfs01-anexo12.component";
import { Nrp36Anexo1Component } from "./nrp36/nrp36-anexo1/nrp36-anexo1.component";
import { Nrp36Anexo2Component } from "./nrp36/nrp36-anexo2/nrp36-anexo2.component";
import { Nrp36Anexo3Component } from "./nrp36/nrp36-anexo3/nrp36-anexo3.component";
import { Nrp36Anexo4Component } from "./nrp36/nrp36-anexo4/nrp36-anexo4.component";
import { Nrp36Anexo5Component } from "./nrp36/nrp36-anexo5/nrp36-anexo5.component";
import { Nrp36Anexo6Component } from "./nrp36/nrp36-anexo6/nrp36-anexo6.component";
import { Nrp51SaldoCuentaComponent } from "./nrp51/nrp51-saldocuenta/nrp51-saldocuenta.component";
import { Nrp51DepositoExtranjeroComponent } from "./nrp51/nrp51-depositoextranjero/nrp51-depositoextranjero.component";
import { Nrp51DatoExtracontableComponent } from "./nrp51/nrp51-datoextracontable/nrp51-datoextracontable.component";
import { Nrp51PrestamoGarantizadoComponent } from "./nrp51/nrp51-prestamogarantizado/nrp51-prestamogarantizado.component";
import { Nrp51AvalGarantizadoComponent } from "./nrp51/nrp51-avalgarantizado/nrp51-avalgarantizado.component";
import { Nrp51DeudaSubordinadaComponent } from "./nrp51/nrp51-deudasubordinada/nrp51-deudasubordinada.component";
import { Nrp51BalanceProyectadoComponent } from "./nrp51/nrp51-balanceproyectado/nrp51-balanceproyectado.component";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { TokenExpiredComponent } from "./acceso/token-expired/token-expired.component";
import { Nrp36Anexo7Component } from "./nrp36/nrp36-anexo7/nrp36-anexo7.component";
import { Nrp36Anexo8Component } from "./nrp36/nrp36-anexo8/nrp36-anexo8.component";
import { Nrp51TituloValorExtranjeroComponent } from "./nrp51/nrp51-titulovalorextranjero/nrp51-titulovalorextranjero.component";
import { CentriesBitacoraComponent } from "./centries/centries-bitacora/centries-bitacora.component";
import { CreditcardComponent } from "./creditcard/creditcard.component";
import { TransactionsComponent } from "./transactions/transactions.component";
import { MerchantsComponent } from "./merchants/merchants.component";

const routes: Routes = [
  {
    path: "nrp41-personas",
    component: Nrp41PersonasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp41-referencia_garantia",
    component: Nrp41ReferenciaGarantiaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp41-referencia",
    component: Nrp41ReferenciaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp41-garantia_aval",
    component: Nrp41GarantiaAvalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp41-garantia_hipotecaria",
    component: Nrp41GarantiaHipotecariaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp41-garantia_fiduciaria",
    component: Nrp41GarantiaFiduciariaComponent,
  },
  {
    path: "nrp41-garantia_pignorada",
    component: Nrp41GarantiaPignoradaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp41-garantia_prenda",
    component: Nrp41GarantiaPrendaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp41-garantia_bono",
    component: Nrp41GarantiaBonoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp41-garantia_poliza",
    component: Nrp41GarantiaPolizaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp41-garantia_fondo",
    component: Nrp41GarantiaFondoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp41-referencia_gasto",
    component: Nrp41ReferenciaGastoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp41-referencia_unidad",
    component: Nrp41ReferenciaUnidadComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp41-referencia_cancelada",
    component: Nrp41ReferenciaCanceladaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp41-socios_sociedades",
    component: Nrp41SociosSociedadesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp41-junta_directiva",
    component: Nrp41JuntaDirectivaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp41-garantia_prendaria",
    component: Nrp41GarantiaPrendariaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "centries-cargo",
    component: CentriesCargoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "centries-perfil",
    component: CentriesPerfilComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "centries-permisoperfil",
    component: CentriesPermisoperfilComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "centries-usuario",
    component: CentriesUsuarioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "centries-usuario-inactivos",
    component: CentriesUsuariosInactivosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "access-denied",
    component: AccessDeniedComponent,
  },
  {
    path: "nrsf03-clientes",
    component: Nrsf03ClientesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrsf03-depositos",
    component: Nrsf03DepositosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrsf03-docs-cliente",
    component: Nrsf03DocsClienteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrsf03-titulares",
    component: Nrsf03TitularesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrsf03-catalogo-agencias",
    component: Nrsf03CatalogoAgenciasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrsf03-productos",
    component: Nrsf03ProductosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrsf03-funcionarios-empleados",
    component: Nrsf03FuncionariosEmpleadosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrsf03-depositos-garantizados",
    component: Nrsf03DepositosGarantizadosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrsf03-ajustes",
    component: Nrsf03AjustesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrsf01-anexo1",
    component: Nrsf01Anexo1Component,
    canActivate: [AuthGuard],
  },
  {
    path: "nrsf01-anexo2",
    component: Nrsf01Anexo2Component,
    canActivate: [AuthGuard],
  },
  {
    path: "nrsf01-anexo3",
    component: Nrsf01Anexo3Component,
    canActivate: [AuthGuard],
  },
  {
    path: "nrsf01-anexo4",
    component: Nrsf01Anexo4Component,
    canActivate: [AuthGuard],
  },
  {
    path: "nrsf01-anexo5",
    component: Nrsf01Anexo5Component,
    canActivate: [AuthGuard],
  },
  {
    path: "nrsf01-anexo6",
    component: Nrsf01Anexo6Component,
    canActivate: [AuthGuard],
  },
  {
    path: "nrsf01-anexo7",
    component: Nrsf01Anexo7Component,
    canActivate: [AuthGuard],
  },
  {
    path: "nrsf01-anexo8",
    component: Nrsf01Anexo8Component,
    canActivate: [AuthGuard],
  },
  {
    path: "nrsf01-anexo10",
    component: Nrfs01Anexo10Component,
    canActivate: [AuthGuard],
  },
  {
    path: "nrsf01-anexo11",
    component: Nrfs01Anexo11Component,
    canActivate: [AuthGuard],
  },
  {
    path: "nrsf01-anexo12",
    component: Nrfs01Anexo12Component,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp36-anexo1",
    component: Nrp36Anexo1Component,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp36-anexo2",
    component: Nrp36Anexo2Component,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp36-anexo3",
    component: Nrp36Anexo3Component,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp36-anexo4",
    component: Nrp36Anexo4Component,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp36-anexo5",
    component: Nrp36Anexo5Component,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp36-anexo6",
    component: Nrp36Anexo6Component,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp36-anexo7",
    component: Nrp36Anexo7Component,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp36-anexo8",
    component: Nrp36Anexo8Component,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp51-saldo_cuenta",
    component: Nrp51SaldoCuentaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp51-deposito_extranjero",
    component: Nrp51DepositoExtranjeroComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp51-dato_extracontable",
    component: Nrp51DatoExtracontableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp51-titulo_valor_extranjero",
    component: Nrp51TituloValorExtranjeroComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp51-prestamo_garantizado",
    component: Nrp51PrestamoGarantizadoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp51-aval_garantizado",
    component: Nrp51AvalGarantizadoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp51-deuda_subordinada",
    component: Nrp51DeudaSubordinadaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nrp51-balance_proyectado",
    component: Nrp51BalanceProyectadoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "token-expired",
    component: TokenExpiredComponent,
  },
  {
    path: "centries-bitacora",
    component: CentriesBitacoraComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "creditcard",
    component: CreditcardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "transactions",
    component: TransactionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "merchants",
    component: MerchantsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormulariosRoutingModule {}
