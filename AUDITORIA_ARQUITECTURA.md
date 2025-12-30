# 📋 REPORTE DE AUDITORÍA DE ARQUITECTURA LIMPIA

**Fecha:** 2025-01-29  
**Alcance:** `src/app`  
**Basado en:** `.cursorrules` - Angular Clean Architecture & Best Practices

---

## 🔴 CRÍTICO

### 1. Violación de Capas: Llamadas HTTP Directas en Componentes

**Problema:** Componentes están haciendo llamadas HTTP directas y accediendo a `sessionStorage`/`localStorage` en lugar de usar `DataService`.

| Componente | Ubicación | Problema | Impacto |
|------------|-----------|----------|---------|
| `InvestmentsComponent` | `investments.component.ts:161-164` | Llama directamente a `investmentsService.getInvestments()` con `sessionStorage` | Bypass de `DataService`, inconsistencia arquitectónica |
| `TransactionsComponent` | `transactions.component.ts:145-189` | Acceso directo a `sessionStorage` y llamada HTTP directa | Mismo patrón de violación |
| `CentriesPerfilComponent` | `centries-perfil.component.ts:53` | Acceso a `localStorage` directamente | Inconsistencia (otros usan `sessionStorage`) |
| `DashboardComponent` | `dashboard.component.ts:44-50` | Acceso directo a `sessionStorage` | Violación de encapsulación |

**Evidencia:**
```typescript
// ❌ MAL: investments.component.ts:161
const data = await this.investmentsService.getInvestments(
  sessionStorage.getItem("authToken") || "",
  sessionStorage.getItem("username") || ""
);
```

**Solución:** Usar `DataService.obtenerDatos()` como en `PlatformsComponent` y `WithdrawalMethodsComponent`.

---

### 2. Lógica de Negocio Duplicada: Cálculo de Comisión

**Problema:** La misma lógica de cálculo de comisión está duplicada en dos componentes con variaciones sutiles.

| Ubicación | Método | Líneas | Problema |
|-----------|--------|--------|----------|
| `investments.component.ts` | `calcularComision()` | 200-259 | Lógica de negocio en componente |
| `generic-modal-dialog.component.ts` | `calcularComisionInversiones()` | 628-750 | Misma lógica duplicada con variaciones |

**Evidencia de Duplicación:**
- Ambos calculan comisión según método de retiro (Bitcoin 1%, Tarjeta 2.6% + $1.30)
- Ambos verifican si es Purchase vs Payment
- Ambos manejan `libreDeComision`
- Diferencias sutiles pueden causar bugs

**Solución:** Extraer a `CommissionCalculationService` o `InvestmentsFacadeService`.

---

### 3. Suscripciones Manuales Sin Cleanup (Riesgo de Memory Leaks)

**Problema:** Múltiples componentes tienen suscripciones a `BehaviorSubject` sin `ngOnDestroy` para limpiarlas.

| Componente | Ubicación | Suscripciones | Cleanup |
|------------|-----------|---------------|---------|
| `InvestmentsComponent` | `investments.component.ts:87-126` | 4 suscripciones a BehaviorSubjects | ❌ No hay `ngOnDestroy` |
| `TransactionsComponent` | `transactions.component.ts:65-82` | 3 suscripciones | ❌ No hay `ngOnDestroy` |
| `CentriesUsuarioComponent` | `centries-usuario.component.ts:76-91` | 2 suscripciones | ❌ No hay `ngOnDestroy` |
| `Nrp36Anexo4Component` | `nrp36-anexo4.component.ts:115-145` | Múltiples suscripciones | ❌ No hay `ngOnDestroy` |
| `GenericModalDialogComponent` | `generic-modal-dialog.component.ts:68` | 1 suscripción con debounce | ✅ Tiene `ngOnDestroy` pero solo hace `complete()` |

**Evidencia:**
```typescript
// ❌ MAL: investments.component.ts:87-126
private setupSubscriptions(): void {
  this.platformsList$.subscribe((platforms) => { ... }); // Sin unsubscribe
  this.transactionTypesList$.subscribe(...); // Sin unsubscribe
  this.withdrawalMethodsList$.subscribe(...); // Sin unsubscribe
  this.creditCardsList$.subscribe(...); // Sin unsubscribe
}
// No hay ngOnDestroy() para limpiar
```

**Solución:** Usar `async` pipe en templates o `takeUntilDestroyed()` con `DestroyRef`.

---

## 🟡 MEDIO

### 4. Código Repetido: Funciones de Mapeo para Select Options

**Problema:** Funciones de mapeo idénticas se repiten en múltiples componentes.

| Patrón | Archivos Afectados | Función Repetida |
|--------|-------------------|------------------|
| `mapPlatforms()` | `investments.component.ts:130` | Mapea plataformas a `{value, label}` |
| `mapTransactionTypes()` | `investments.component.ts:139`, `transactions.component.ts:92` | Mapea tipos de transacción |
| `mapCreditCards()` / `mapCreditCardCodes()` | `investments.component.ts:152`, `transactions.component.ts:85` | Mapea tarjetas (nombres diferentes) |
| `mapCargos()` | `centries-usuario.component.ts:95` | Mapea cargos |
| `mapPerfiles()` | `centries-usuario.component.ts:102` | Mapea perfiles |
| `initializeSelectOptions()` | 10+ archivos | Inicializa `selectOptions` |
| `setupSubscriptions()` | 10+ archivos | Configura suscripciones a BehaviorSubjects |

**Evidencia:**
```typescript
// Patrón repetido en múltiples componentes:
private mapPlatforms(platforms: any[]): any[] {
  return platforms.map((p: any) => ({
    value: p.id || p.platformId,
    label: p.name || p.description || `Plataforma ${p.id}`,
  }));
}
```

**Solución:** Crear `SelectOptionsMapperService` o utilidad `mapToSelectOptions()`.

---

### 5. Alto Acoplamiento: Componente Conoce Demasiados Servicios

**Problema:** `InvestmentsComponent` tiene demasiadas dependencias directas.

| Componente | Servicios Inyectados | Problema |
|------------|---------------------|----------|
| `InvestmentsComponent` | 6 servicios: `DataService`, `InvestmentsService`, `PlatformsService`, `TransactionsService`, `WithdrawalMethodsService`, `CreditcardService` | Alto acoplamiento, viola Single Responsibility |

**Evidencia:**
```typescript
constructor(
  private dataService: DataService,
  private investmentsService: InvestmentsService,
  private platformsService: PlatformsService,
  private transactionsService: TransactionsService,
  private withdrawalMethodsService: WithdrawalMethodsService,
  private creditcardService: CreditcardService
) {}
```

**Solución:** Crear `InvestmentsFacadeService` que encapsule toda esta lógica y orqueste estos servicios.

---

### 6. Lógica de Negocio en Componente: Validaciones y Transformaciones

**Problema:** Componentes contienen lógica de negocio que debería estar en servicios.

| Componente | Métodos con Lógica de Negocio | Líneas |
|------------|------------------------------|--------|
| `InvestmentsComponent` | `calcularComision()`, `requiereTarjeta()`, `esPurchase()`, `esBitcoin()`, `updateReadonlyFields()` | ~150 líneas |
| `InvestmentsComponent` | `onAddInvestment()`, `onEditInvestment()` - transformación de datos, mapeo `withdrawalMethod` → `withdrawalMethodId` | ~100 líneas |
| `TransactionsComponent` | `mapToTransactionCreate()`, `generateCustomColumns()`, lógica de fechas | ~50 líneas |

**Evidencia:**
```typescript
// ❌ Lógica de negocio en componente:
private calcularComision(amount, withdrawalMethodId, transactionTypeId, libreDeComision): number {
  // 60+ líneas de lógica de cálculo
}
```

**Solución:** Mover a `InvestmentsFacadeService` o `CommissionCalculationService`.

---

### 7. God Component: GenericTableComponent

**Problema:** Componente masivo que viola Single Responsibility Principle.

| Componente | Líneas | Problema |
|------------|--------|----------|
| `GenericTableComponent` | **1,622 líneas** | Violación de Single Responsibility, contiene template inline masivo |

**Evidencia:** Template inline de ~500 líneas + lógica compleja de filtrado, ordenamiento, paginación, modales.

**Solución:** Dividir en:
- `GenericTableComponent` (orquestación)
- `GenericTableHeaderComponent` (header y filtros)
- `GenericTableBodyComponent` (filas y datos)
- `GenericTablePaginationComponent` (paginación)

---

## 🟢 BAJO

### 8. Deuda Técnica: Uso de `*ngIf`/`*ngFor` en lugar de `@if`/`@for`

**Problema:** Templates usan sintaxis legacy de Angular en lugar de Control Flow moderno.

| Archivo | Líneas con `*ngIf`/`*ngFor` | Estado |
|---------|----------------------------|--------|
| `generic-modal-dialog.component.html` | Múltiples (líneas 13, 16, 26, 40, 51) | Legacy |
| `generictable.component.ts` (template inline) | Múltiples instancias | Legacy |
| `biometric-settings.component.html` | Varias instancias | Legacy |

**Evidencia:**
```html
<!-- ❌ Legacy: -->
<form *ngIf="!showConfirmButtons">
  <div *ngFor="let field of fields">
```

**Solución:** Migrar a `@if` y `@for` (Angular 17+).

---

### 9. Constructor Injection en lugar de `inject()`

**Problema:** Todos los componentes usan constructor injection en lugar de función `inject()`.

| Categoría | Cantidad | Estado |
|-----------|----------|--------|
| Componentes con `constructor()` | **67 archivos** | Legacy |
| Componentes con `inject()` | **0 archivos** | No implementado |

**Evidencia:** Todos los componentes usan constructor injection.

**Solución:** Migrar gradualmente a `inject()`.

---

### 10. ChangeDetectionStrategy.Default en lugar de OnPush

**Problema:** Componentes no usan `OnPush` para optimización de rendimiento.

| Componente | Estrategia Actual | Problema |
|------------|------------------|----------|
| `GenericModalDialogComponent` | `Default` (comentado OnPush) | Rendimiento subóptimo |

**Evidencia:**
```typescript
// changeDetection: ChangeDetectionStrategy.OnPush, // Comentado
changeDetection: ChangeDetectionStrategy.Default,
```

**Solución:** Habilitar `OnPush` y usar Signals para reactividad.

---

### 11. Uso Extensivo de BehaviorSubject en lugar de Signals

**Problema:** Todos los componentes usan `BehaviorSubject` cuando podrían usar Signals.

| Categoría | Cantidad | Estado |
|-----------|----------|--------|
| Componentes usando `BehaviorSubject` | **72+ archivos** | Legacy |
| Componentes usando `signal()` | **0 archivos** | No implementado |

**Evidencia:** Todos los componentes usan `BehaviorSubject` para estado local.

**Solución:** Migrar a Signals (`signal()`, `computed()`, `effect()`).

---

## 📊 RESUMEN PRIORIZADO

| Prioridad | Categoría | Problemas | Archivos Afectados | Esfuerzo |
|-----------|-----------|-----------|-------------------|----------|
| 🔴 **CRÍTICO** | Violación de Capas | HTTP directo, sessionStorage | 4 componentes | Alto |
| 🔴 **CRÍTICO** | Lógica Duplicada | Cálculo de comisión | 2 componentes | Medio |
| 🔴 **CRÍTICO** | Memory Leaks | Suscripciones sin cleanup | 14+ componentes | Alto |
| 🟡 **MEDIO** | DRY Violation | Funciones de mapeo repetidas | 10+ componentes | Bajo |
| 🟡 **MEDIO** | Alto Acoplamiento | 6 servicios en 1 componente | 1 componente | Medio |
| 🟡 **MEDIO** | God Component | GenericTableComponent 1,622 líneas | 1 componente | Alto |
| 🟢 **BAJO** | Legacy Patterns | `*ngIf`/`*ngFor`, constructor injection | 67+ componentes | Bajo-Medio |

---

## 🎯 RECOMENDACIONES DE REFACTORIZACIÓN (ORDEN SUGERIDO)

### Fase 1: Crítico - Estabilidad y Arquitectura
1. **Crear `InvestmentsFacadeService`** para encapsular lógica de negocio y reducir acoplamiento
2. **Extraer `CommissionCalculationService`** para eliminar duplicación
3. **Migrar suscripciones a `async` pipe** o `takeUntilDestroyed()` para prevenir memory leaks
4. **Corregir llamadas HTTP directas** usando `DataService` consistentemente

### Fase 2: Medio - Mantenibilidad
5. **Crear `SelectOptionsMapperService`** para centralizar funciones de mapeo
6. **Refactorizar `GenericTableComponent`** dividiéndolo en subcomponentes más pequeños
7. **Migrar lógica de transformación** de componentes a servicios

### Fase 3: Bajo - Modernización
8. **Migrar gradualmente a Signals** reemplazando `BehaviorSubject`
9. **Actualizar templates** a `@if`/`@for` (Control Flow moderno)
10. **Migrar a `inject()`** en lugar de constructor injection
11. **Habilitar `OnPush`** en todos los componentes

---

## 📈 MÉTRICAS DE IMPACTO

- **Componentes afectados:** 67+
- **Archivos con violaciones críticas:** 20+
- **Líneas de código duplicado:** ~500+
- **Riesgo de memory leaks:** Alto (14+ componentes)
- **Deuda técnica estimada:** 2-3 semanas de refactorización

---

## 🔍 DETALLES ADICIONALES

### Patrones Repetidos Identificados

1. **Patrón de inicialización:**
   ```typescript
   ngOnInit(): void {
     this.obtenerXXX();
     this.obtenerYYY();
     this.initializeSelectOptions();
     this.setupSubscriptions();
   }
   ```

2. **Patrón de mapeo:**
   ```typescript
   private mapXXX(items: any[]): any[] {
     return items.map((item: any) => ({
       value: item.id || item.xxxId,
       label: item.name || item.description || `XXX ${item.id}`,
     }));
   }
   ```

3. **Patrón de suscripción:**
   ```typescript
   private setupSubscriptions(): void {
     this.xxxList$.subscribe((items) => {
       this.selectOptions = {
         ...this.selectOptions,
         xxxId: this.mapXXX(items),
       };
     });
   }
   ```

---

## ✅ COMPONENTES QUE SIGUEN BUENAS PRÁCTICAS

- `PlatformsComponent` - Usa `DataService` correctamente
- `WithdrawalMethodsComponent` - Arquitectura limpia, sin lógica de negocio
- `Nrp41JuntaDirectivaComponent` - Patrón consistente con `DataService`

---

**Generado por:** Auditoría Automática de Arquitectura  
**Última actualización:** 2025-01-29

