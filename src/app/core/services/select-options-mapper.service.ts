import { Injectable } from "@angular/core";

/**
 * Interfaz para opciones de select mapeadas
 */
export interface SelectOption {
  value: number | string;
  label: string;
}

/**
 * Servicio utilitario para mapear datos a formato de opciones de select
 *
 * Centraliza las funciones de mapeo repetidas en múltiples componentes
 * para seguir el principio DRY (Don't Repeat Yourself)
 */
@Injectable({
  providedIn: "root",
})
export class SelectOptionsMapperService {
  /**
   * Mapea plataformas a formato de select
   *
   * @param platforms Array de plataformas con propiedades id/platformId y name/description
   * @returns Array de opciones de select con value y label
   */
  mapPlatforms(platforms: any[]): SelectOption[] {
    return platforms.map((p: any) => ({
      value: p.id || p.platformId,
      label: p.name || p.description || `Plataforma ${p.id || p.platformId}`,
    }));
  }

  /**
   * Mapea tipos de transacción a formato de select
   *
   * @param transactionTypes Array de tipos de transacción con propiedades id/transactionType y name/description
   * @returns Array de opciones de select con value y label
   */
  mapTransactionTypes(transactionTypes: any[]): SelectOption[] {
    return transactionTypes.map((t: any) => ({
      value: t.id || t.transactionType,
      label: t.name || t.description || `Tipo ${t.id || t.transactionType}`,
    }));
  }

  /**
   * Mapea tarjetas de crédito a formato de select
   * Usa codigo como value y descripcion como label
   *
   * @param creditCards Array de tarjetas de crédito con propiedades codigo y descripcion
   * @returns Array de opciones de select con value y label
   */
  mapCreditCards(creditCards: any[]): SelectOption[] {
    return creditCards.map((c: any) => ({
      value: c.codigo,
      label: c.descripcion,
    }));
  }

  /**
   * Mapea códigos de tarjetas de crédito a formato de select
   * Alias de mapCreditCards para mantener compatibilidad con nombres diferentes
   *
   * @param creditCardCodes Array de códigos de tarjetas con propiedades codigo y descripcion
   * @returns Array de opciones de select con value y label
   */
  mapCreditCardCodes(creditCardCodes: any[]): SelectOption[] {
    return this.mapCreditCards(creditCardCodes);
  }

  /**
   * Mapea cargos a formato de select
   *
   * @param cargos Array de cargos con propiedades id_cargo y cargo
   * @returns Array de opciones de select con value y label
   */
  mapCargos(cargos: any[]): SelectOption[] {
    return cargos.map((c: any) => ({
      value: c.id_cargo,
      label: c.cargo,
    }));
  }

  /**
   * Mapea perfiles a formato de select
   *
   * @param perfiles Array de perfiles con propiedades id_perfil y perfil
   * @returns Array de opciones de select con value y label
   */
  mapPerfiles(perfiles: any[]): SelectOption[] {
    return perfiles.map((p: any) => ({
      value: p.id_perfil,
      label: p.perfil,
    }));
  }

  /**
   * Mapea métodos de retiro a formato de select
   *
   * @param withdrawalMethods Array de métodos de retiro con propiedades id/withdrawalMethod y name/description
   * @returns Array de opciones de select con value y label
   */
  mapWithdrawalMethods(withdrawalMethods: any[]): SelectOption[] {
    return withdrawalMethods.map((w: any) => ({
      value: w.id || w.withdrawalMethod,
      label: w.name || w.description || `Método ${w.id || w.withdrawalMethod}`,
    }));
  }

  /**
   * Mapea merchants a formato de select
   *
   * @param merchants Array de merchants con propiedades id y name
   * @returns Array de opciones de select con value y label
   */
  mapMerchants(merchants: any[]): SelectOption[] {
    return merchants.map((m: any) => ({
      value: m.id,
      label: m.name || m.description || `Merchant ${m.id}`,
    }));
  }

  /**
   * Método genérico para mapear cualquier array a formato de select
   * Útil cuando se necesita un mapeo personalizado
   *
   * @param items Array de items a mapear
   * @param valueKey Clave para el valor (puede ser función o string)
   * @param labelKey Clave para el label (puede ser función o string)
   * @param fallbackLabel Función opcional para generar label si no existe
   * @returns Array de opciones de select con value y label
   */
  mapGeneric<T>(
    items: T[],
    valueKey: string | ((item: T) => number | string),
    labelKey: string | ((item: T) => string),
    fallbackLabel?: (item: T, index: number) => string
  ): SelectOption[] {
    return items.map((item: T, index: number) => {
      const value =
        typeof valueKey === "function"
          ? valueKey(item)
          : (item as any)[valueKey];
      const label =
        typeof labelKey === "function"
          ? labelKey(item)
          : (item as any)[labelKey] ||
            (fallbackLabel ? fallbackLabel(item, index) : String(value));

      return {
        value,
        label,
      };
    });
  }
}
