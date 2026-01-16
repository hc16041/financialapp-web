# Documentación técnica - Financial App (Frontend Angular)

## Resumen
Aplicación frontend Angular 18 que orquesta módulos de autenticación, catálogos y formularios financieros (transacciones, inversiones, ahorros, etc.). Sigue un esquema modular con `LayoutsModule` + `PagesModule` protegido por `AuthGuard`. Usa NgRx para parte del estado global y servicios core para comunicación HTTP y utilitarios.

## Arquitectura y capas
- **Presentación**: componentes en `src/app/pages` (formularios, dashboards) y `src/app/layouts` para contenedores. Templates usan `ng-bootstrap`, `@ng-select`, tablas genéricas y modales. Control de idioma con `@ngx-translate`.
- **Aplicación/Dominio**: servicios específicos por dominio dentro de `src/app/application/**` y `src/app/core/services` (por ejemplo `DataService`, `CommissionCalculationService`, `SelectOptionsMapperService`). Algunas piezas de estado usan `BehaviorSubject`; NgRx se monta en `StoreModule.forRoot`.
- **Infraestructura**: `ApiConnectionService` encapsula llamadas HTTP crudas, `DataService` y `FileDownloadService` abstraen operaciones de CRUD/descargas. Interceptores (`JwtInterceptor`, `ErrorInterceptor`, `FakeBackendInterceptor`) añaden token, manejan errores y mock.
- **Seguridad**: `AuthNewService` gestiona login/register, guarda JWT en `sessionStorage` (`authToken`), navegación post-logout; `AuthGuard` protege rutas. `BiometricService` permite WebAuthn.

## Estructura relevante
- `src/app/app.module.ts`: registra interceptores, NgRx y traducciones.
- `src/app/app-routing.module.ts`: shell con `LayoutComponent` + lazy load de `PagesModule`; `/auth` carga `AccountModule`.
- `src/app/core`: servicios singleton, guards, helpers, models, pipes.
- `src/app/pages`: vistas y componentes funcionales (transacciones, inversiones, catálogos, reportes).
- `src/app/features`: feature modules nuevos (ej. `features/savings`).
- `src/app/application`: DTOs/Services por agregado de negocio.
- `src/assets/i18n`: archivos de traducción.

## Flujo de datos típico
1. Componente contenedor (p.ej. `TransactionsComponent`) solicita datos al `DataService`.
2. `DataService` invoca el método del servicio de dominio (`TransactionsService`) con token/usuario y publica en `BehaviorSubject`.
3. El componente se suscribe (idealmente con `takeUntilDestroyed` o Signals) y actualiza `selectOptions`/tabla.
4. Para crear/actualizar, el componente mapea DTO de UI → contrato backend y llama `DataService.agregarRegistro`/`actualizarRegistro`.
5. Descargas se canalizan por `FileDownloadService` que construye blobs (XML, Excel, PDF, TXT).

## Autenticación y seguridad
- JWT almacenado en `sessionStorage` (`authToken`, `currentUser`). `AuthNewService` expone `login`, `register`, `isAuthenticated`, `getUserId`, `logout`.
- `JwtInterceptor` adjunta token a las peticiones; `ErrorInterceptor` captura respuestas no exitosas.
- WebAuthn opcional mediante `BiometricService` (`registerWebAuthnCredential`, `authenticateWithWebAuthn`).

## Construcción y ejecución
- **Instalación**: `npm install`
- **Desarrollo**: `npm start` (equivale a `ng serve`)
- **Build prod**: `npm run build:prod`
- **Tests unitarios**: `npm test` (Karma/Jasmine)
- Proxy/API: configurar endpoints en `src/environments/*.ts` y `GlobalComponent.AUTH_API`.

## Dependencias principales
Angular 18, NgRx Store/Effects, `@ngx-translate`, `@ng-bootstrap`, `@ng-select`, `sweetalert2`, `ngx-mask`, `apexcharts/echarts`, `leaflet`, CKEditor, `auth0/angular-jwt`.

## Estilo y pautas (Clean Architecture)
- Componentes standalone y de presentación sin lógica de negocio; delegar a servicios/fachadas.
- No exponer DTO de backend en templates; mapear a modelos UI.
- Evitar `subscribe` manual; preferir Signals o `takeUntilDestroyed`.
- Control flow moderno `@if/@for` y `NgOptimizedImage` cuando aplique.
- Uso de `inject()` y `ChangeDetectionStrategy.OnPush`.

## Observaciones y riesgos actuales
- Varios componentes aún acceden directo a `sessionStorage` y hacen llamadas HTTP en la vista (ver `TransactionsComponent`, `InvestmentsComponent`); mover a facades.
- Lógica de cálculo de comisiones duplicada; consolidar en `CommissionCalculationService`.
- `GenericTableComponent` es muy grande y debería dividirse (header/body/paginación).
- Migrar `*ngIf/*ngFor` legacy a control flow Angular 17+.

## Próximos pasos sugeridos
- Introducir facades por feature (`investments`, `transactions`) con Signals de lectura.
- Centralizar mapeos de selects en `SelectOptionsMapperService` (ya creado) y usarlo consistentemente.
- Incorporar pruebas unitarias en servicios core (`DataService`, `ApiConnectionService`) con mocks de HttpClient.
- Revisar uso de NgRx y consolidar el estado global vs locales en `BehaviorSubject`.
