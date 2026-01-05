import { Injectable, inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DataService } from "src/app/core/services/data.service";
import { InvestmentsService } from "src/app/application/Investments/Services/Investments.service";
import { PlatformsService } from "src/app/application/Platforms/Services/Platforms.service";
import { TransactionsService } from "src/app/application/transactions/Services/Transactions.service";
import { WithdrawalMethodsService } from "src/app/application/WithdrawalMethods/Services/WithdrawalMethods.service";
import { CreditcardService } from "src/app/application/creditcard/Services/Creditcard.service";
import { LoginService } from "src/app/account/login/Services/LoginService";
import { InvestmentsDTO } from "src/app/application/Investments/DTO/InvestmentsDTO";
import { AlertcustomService } from "src/app/core/services/alertcustom.service";
import {
  SelectOptionsMapperService,
  SelectOption,
} from "src/app/core/services/select-options-mapper.service";

/**
 * Información del método de retiro para uso interno
 */
export interface WithdrawalMethodInfo {
  id: number;
  name: string;
  requiresCreditCard: boolean;
}

/**
 * Información del tipo de transacción para uso interno
 */
export interface TransactionTypeInfo {
  id: number;
  name: string;
}

// SelectOption ahora se importa desde SelectOptionsMapperService

/**
 * Facade para orquestar todos los servicios relacionados con Investments
 *
 * Responsabilidades:
 * - Cargar datos de inversiones y listados relacionados
 * - Mapear datos para formularios
 * - Transformar datos entre formato API y formato UI
 * - Gestionar estado mediante BehaviorSubjects
 */
@Injectable({
  providedIn: "root",
})
export class InvestmentsFacade {
  private dataService = inject(DataService);
  private investmentsService = inject(InvestmentsService);
  private platformsService = inject(PlatformsService);
  private transactionsService = inject(TransactionsService);
  private withdrawalMethodsService = inject(WithdrawalMethodsService);
  private creditcardService = inject(CreditcardService);
  private loginService = inject(LoginService);
  private alertService = inject(AlertcustomService);
  private selectOptionsMapper = inject(SelectOptionsMapperService);

  // BehaviorSubjects para estado reactivo
  investmentsList$ = new BehaviorSubject<InvestmentsDTO[]>([]);
  platformsList$ = new BehaviorSubject<any[]>([]);
  transactionTypesList$ = new BehaviorSubject<any[]>([]);
  withdrawalMethodsList$ = new BehaviorSubject<any[]>([]);
  creditCardsList$ = new BehaviorSubject<any[]>([]);

  // Información estructurada para cálculos y validaciones
  withdrawalMethodsInfo = new Map<number, WithdrawalMethodInfo>();
  transactionTypesInfo = new Map<number, TransactionTypeInfo>();

  // Opciones de select mapeadas
  selectOptions: { [key: string]: SelectOption[] } = {
    platformId: [],
    transactionType: [],
    withdrawalMethod: [],
    creditCardId: [],
  };

  /**
   * Inicializa el Facade cargando todos los datos necesarios
   */
  async initialize(): Promise<void> {
    await Promise.all([
      this.loadInvestments(),
      this.loadPlatforms(),
      this.loadTransactionTypes(),
      this.loadWithdrawalMethods(),
      this.loadCreditCards(),
    ]);
    this.setupSubscriptions();
  }

  /**
   * Carga las inversiones usando DataService
   * Transforma withdrawalMethodId a withdrawalMethod para el formulario
   */
  async loadInvestments(): Promise<void> {
    try {
      // Establecer fechas por defecto (primer y último día del mes actual)
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      // Formatear fechas al formato YYYY-MM-DD
      const formatDateForInput = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      const startDate = formatDateForInput(firstDayOfMonth);
      const endDate = formatDateForInput(lastDayOfMonth);

      // Llamar al método con fechas por defecto
      await this.loadInvestmentsByDateRange(startDate, endDate);
    } catch (error) {
      console.error("Error al cargar inversiones:", error);
      this.alertService.showError("Error al cargar inversiones");
    }
  }

  /**
   * Carga las inversiones por rango de fechas
   */
  async loadInvestmentsByDateRange(
    startDate: string,
    endDate: string
  ): Promise<void> {
    try {
      // Obtener token y username del LoginService
      const token = this.loginService.token || "";
      const username = this.loginService.username || "";

      // Si las fechas están vacías, establecer fechas por defecto
      let finalStartDate = startDate;
      let finalEndDate = endDate;

      if (!finalStartDate || !finalEndDate) {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDayOfMonth = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          0
        );

        const formatDateForInput = (date: Date): string => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        };

        finalStartDate = formatDateForInput(firstDayOfMonth);
        finalEndDate = formatDateForInput(lastDayOfMonth);
      }

      const data = await this.investmentsService.getInvestmentsByDateRange(
        token,
        username,
        finalStartDate,
        finalEndDate
      );

      // Mapear withdrawalMethodId o withdrawalMethod cuando se reciben datos del servidor
      const mappedData = data.map((investment: any) => {
        const mappedInvestment = { ...investment };

        // Caso 1: El servidor envía withdrawalMethodId (puede ser objeto o número)
        if (investment.hasOwnProperty("withdrawalMethodId")) {
          const withdrawalMethodValue =
            typeof investment.withdrawalMethodId === "object" &&
            investment.withdrawalMethodId !== null
              ? investment.withdrawalMethodId?.id ||
                investment.withdrawalMethodId
              : investment.withdrawalMethodId;

          mappedInvestment.withdrawalMethod = withdrawalMethodValue;
        }
        // Caso 2: El servidor envía withdrawalMethod como objeto (extraer solo el ID)
        else if (
          investment.hasOwnProperty("withdrawalMethod") &&
          typeof investment.withdrawalMethod === "object" &&
          investment.withdrawalMethod !== null
        ) {
          // Si es un objeto, extraer solo el ID
          mappedInvestment.withdrawalMethod =
            investment.withdrawalMethod?.id || investment.withdrawalMethod;
        }

        return mappedInvestment;
      });

      this.investmentsList$.next(mappedData);
    } catch (error) {
      console.error("Error al cargar inversiones por fecha:", error);
      this.alertService.showError("Error al cargar inversiones por fecha");
    }
  }

  /**
   * Carga las plataformas usando DataService
   */
  async loadPlatforms(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.platformsService,
      "getPlatforms",
      this.platformsList$,
      "Error al cargar plataformas"
    );
  }

  /**
   * Carga los tipos de transacción usando DataService
   * Solo toma los primeros dos elementos según requerimiento
   */
  async loadTransactionTypes(): Promise<void> {
    try {
      const tempSubject = new BehaviorSubject<any[]>([]);

      await this.dataService.obtenerDatos(
        this.transactionsService,
        "getTransactionTypes",
        tempSubject,
        "Error al cargar tipos de transacción"
      );

      // Solo tomar los primeros dos elementos
      const data = tempSubject.value.slice(0, 2);
      this.transactionTypesList$.next(data);
    } catch (error) {
      console.error("Error al cargar tipos de transacción:", error);
      this.alertService.showError("Error al cargar tipos de transacción");
    }
  }

  /**
   * Carga los métodos de retiro usando DataService
   */
  async loadWithdrawalMethods(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.withdrawalMethodsService,
      "getWithdrawalMethods",
      this.withdrawalMethodsList$,
      "Error al cargar métodos de retiro"
    );
  }

  /**
   * Carga las tarjetas de crédito
   * NOTA: getCreditCardCodes solo recibe token, no username
   * Por lo tanto, se maneja de forma especial usando LoginService para obtener el token
   */
  async loadCreditCards(): Promise<void> {
    try {
      const token = this.loginService.token || "";
      const data = await this.creditcardService.getCreditCardCodes(token);
      this.creditCardsList$.next(data);
    } catch (error) {
      console.error("Error al cargar tarjetas de crédito:", error);
      this.alertService.showError("Error al cargar tarjetas de crédito");
    }
  }

  /**
   * Configura las suscripciones para actualizar selectOptions y Maps cuando cambien los datos
   */
  private setupSubscriptions(): void {
    // Suscripción para plataformas
    this.platformsList$.subscribe((platforms) => {
      this.selectOptions = {
        ...this.selectOptions,
        platformId: this.mapPlatforms(platforms),
      };
    });

    // Suscripción para tipos de transacción
    this.transactionTypesList$.subscribe((transactionTypes) => {
      // Guardar información de los tipos de transacción
      transactionTypes.forEach((t: any) => {
        this.transactionTypesInfo.set(t.id || t.transactionType, {
          id: t.id || t.transactionType,
          name: t.name || t.description || "",
        });
      });
      this.selectOptions = {
        ...this.selectOptions,
        transactionType: this.mapTransactionTypes(transactionTypes),
      };
    });

    // Suscripción para métodos de retiro
    this.withdrawalMethodsList$.subscribe((withdrawalMethods) => {
      // Guardar información de los métodos de retiro
      withdrawalMethods.forEach((w: any) => {
        this.withdrawalMethodsInfo.set(w.id, {
          id: w.id,
          name: w.name || w.description || "",
          requiresCreditCard: w.requiresCreditCard || false,
        });
      });
      this.selectOptions = {
        ...this.selectOptions,
        withdrawalMethod: this.mapWithdrawalMethods(withdrawalMethods),
      };
    });

    // Suscripción para tarjetas de crédito
    this.creditCardsList$.subscribe((creditCards) => {
      this.selectOptions = {
        ...this.selectOptions,
        creditCardId: this.mapCreditCards(creditCards),
      };
    });
  }

  /**
   * Mapea plataformas a formato de select
   * Delega al servicio de mapeo
   */
  private mapPlatforms(platforms: any[]): SelectOption[] {
    return this.selectOptionsMapper.mapPlatforms(platforms);
  }

  /**
   * Mapea tipos de transacción a formato de select
   * Delega al servicio de mapeo
   */
  private mapTransactionTypes(transactionTypes: any[]): SelectOption[] {
    return this.selectOptionsMapper.mapTransactionTypes(transactionTypes);
  }

  /**
   * Mapea métodos de retiro a formato de select
   * Delega al servicio de mapeo
   */
  private mapWithdrawalMethods(withdrawalMethods: any[]): SelectOption[] {
    return this.selectOptionsMapper.mapWithdrawalMethods(withdrawalMethods);
  }

  /**
   * Mapea tarjetas de crédito a formato de select
   * Delega al servicio de mapeo
   */
  private mapCreditCards(creditCards: any[]): SelectOption[] {
    return this.selectOptionsMapper.mapCreditCards(creditCards);
  }

  /**
   * Agrega una nueva inversión usando DataService
   */
  async addInvestment(investment: any): Promise<void> {
    // Transformar withdrawalMethod a withdrawalMethodId para la API
    const investmentToSave = this.transformInvestmentForApi(investment);

    await this.dataService.agregarRegistro(
      this.investmentsService,
      "guardarInvestments",
      investmentToSave,
      "Inversión agregada correctamente",
      "Error al agregar inversión"
    );

    // Recargar inversiones después de agregar
    await this.loadInvestments();
  }

  /**
   * Actualiza una inversión existente usando DataService
   */
  async updateInvestment(investment: any): Promise<void> {
    // Transformar withdrawalMethod a withdrawalMethodId para la API
    const investmentToSave = this.transformInvestmentForApi(investment);

    await this.dataService.actualizarRegistro(
      this.investmentsService,
      "editarInvestments",
      investmentToSave,
      "Inversión actualizada correctamente",
      "Error al actualizar inversión"
    );

    // Recargar inversiones después de actualizar
    await this.loadInvestments();
  }

  /**
   * Elimina una inversión usando DataService
   */
  async deleteInvestment(id: number): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.investmentsService,
      "eliminarInvestments",
      id,
      "Inversión eliminada correctamente",
      "Error al eliminar inversión"
    );

    // Recargar inversiones después de eliminar
    await this.loadInvestments();
  }

  /**
   * Transforma un objeto de inversión del formato UI al formato API
   * - Elimina libreDeComision (solo para UI)
   * - Convierte campos numéricos a Number
   * - Mapea withdrawalMethod a withdrawalMethodId
   */
  private transformInvestmentForApi(investment: any): any {
    // Eliminar el campo libreDeComision antes de guardar (es solo para UI)
    const { libreDeComision, ...investmentToSave } = investment;

    // Asegurar que los campos numéricos sean números y no strings
    if (
      investmentToSave.amount !== undefined &&
      investmentToSave.amount !== null
    ) {
      investmentToSave.amount = Number(investmentToSave.amount);
    }
    if (
      investmentToSave.commission !== undefined &&
      investmentToSave.commission !== null
    ) {
      investmentToSave.commission = Number(investmentToSave.commission);
    }
    if (
      investmentToSave.platformId !== undefined &&
      investmentToSave.platformId !== null
    ) {
      investmentToSave.platformId = Number(investmentToSave.platformId);
    }
    if (
      investmentToSave.transactionType !== undefined &&
      investmentToSave.transactionType !== null
    ) {
      investmentToSave.transactionType = Number(
        investmentToSave.transactionType
      );
    }
    if (
      investmentToSave.creditCardId !== undefined &&
      investmentToSave.creditCardId !== null
    ) {
      investmentToSave.creditCardId = Number(investmentToSave.creditCardId);
    }

    // Mapear withdrawalMethod a withdrawalMethodId para la API
    if (investmentToSave.hasOwnProperty("withdrawalMethod")) {
      investmentToSave.withdrawalMethodId = Number(
        investmentToSave.withdrawalMethod
      );
      delete investmentToSave.withdrawalMethod;
    }

    return investmentToSave;
  }

  /**
   * Verifica si un método de retiro requiere tarjeta de crédito
   */
  requiresCreditCard(withdrawalMethodId: number): boolean {
    const methodInfo = this.withdrawalMethodsInfo.get(withdrawalMethodId);
    if (!methodInfo) {
      return false;
    }
    const methodName = methodInfo.name.toLowerCase();
    return (
      methodInfo.requiresCreditCard ||
      methodName.includes("tarjeta") ||
      methodName.includes("credito") ||
      methodName.includes("card")
    );
  }

  /**
   * Verifica si un tipo de transacción es Purchase
   */
  isPurchase(transactionTypeId: number): boolean {
    const transactionTypeInfo =
      this.transactionTypesInfo.get(transactionTypeId);
    if (!transactionTypeInfo) {
      return false;
    }
    const transactionTypeName = transactionTypeInfo.name.toLowerCase();
    return (
      transactionTypeName.includes("purchase") ||
      transactionTypeName.includes("compra")
    );
  }

  /**
   * Verifica si un método de retiro es Bitcoin
   */
  isBitcoin(withdrawalMethodId: number): boolean {
    const methodInfo = this.withdrawalMethodsInfo.get(withdrawalMethodId);
    if (!methodInfo) {
      return false;
    }
    const methodName = methodInfo.name.toLowerCase();
    return methodName.includes("bitcoin") || methodName.includes("btc");
  }
}
