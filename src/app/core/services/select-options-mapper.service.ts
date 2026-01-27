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
  mapPlatforms(platforms: unknown[]): SelectOption[] {
    return platforms.map((p) => {
      const platform = p as Record<string, unknown>;
      return {
        value: (platform['id'] as number) || (platform['platformId'] as number),
        label: (platform['name'] as string) || (platform['description'] as string) || `Plataforma ${(platform['id'] as number) || (platform['platformId'] as number)}`,
      };
    });
  }

  /**
   * Mapea tipos de transacción a formato de select
   *
   * @param transactionTypes Array de tipos de transacción con propiedades id/transactionType y name/description
   * @returns Array de opciones de select con value y label
   */
  mapTransactionTypes(transactionTypes: unknown[]): SelectOption[] {
    return transactionTypes.map((t) => {
      const type = t as Record<string, unknown>;
      return {
        value: (type['id'] as number) || (type['transactionType'] as number),
        label: (type['name'] as string) || (type['description'] as string) || `Tipo ${(type['id'] as number) || (type['transactionType'] as number)}`,
      };
    });
  }

  /**
   * Mapea tarjetas de crédito a formato de select
   * Usa codigo como value y descripcion como label
   *
   * @param creditCards Array de tarjetas de crédito con propiedades codigo y descripcion
   * @returns Array de opciones de select con value y label
   */
  mapCreditCards(creditCards: unknown[]): SelectOption[] {
    return creditCards.map((c) => {
      const card = c as Record<string, unknown>;
      return {
        value: card['codigo'] as number,
        label: card['descripcion'] as string,
      };
    });
  }

  /**
   * Mapea códigos de tarjetas de crédito a formato de select
   * Alias de mapCreditCards para mantener compatibilidad con nombres diferentes
   * Soporta tanto el formato antiguo (codigo/descripcion) como el nuevo (id/bankName)
   *
   * @param creditCardCodes Array de códigos de tarjetas con propiedades codigo/descripcion o id/bankName
   * @returns Array de opciones de select con value y label
   */
  mapCreditCardCodes(creditCardCodes: unknown[]): SelectOption[] {
    return creditCardCodes.map((c) => {
      const card = c as Record<string, unknown>;
      // Si tiene codigo y descripcion (formato antiguo)
      if (card['codigo'] !== undefined && card['descripcion'] !== undefined) {
        return {
          value: card['codigo'] as number,
          label: card['descripcion'] as string,
        };
      }
      // Si tiene id y bankName (formato nuevo CreditcardDTO)
      if (card['id'] !== undefined && card['bankName'] !== undefined) {
        return {
          value: card['id'] as number,
          label: card['bankName'] as string,
        };
      }
      // Fallback: intentar usar cualquier propiedad numérica como value y string como label
      const id = (card['id'] as number) || (card['codigo'] as number) || 0;
      const label = (card['bankName'] as string) || (card['descripcion'] as string) || `Tarjeta ${id}`;
      return { value: id, label };
    });
  }

  /**
   * Mapea cargos a formato de select
   *
   * @param cargos Array de cargos con propiedades id_cargo y cargo
   * @returns Array de opciones de select con value y label
   */
  mapCargos(cargos: unknown[]): SelectOption[] {
    return cargos.map((c) => {
      const cargo = c as Record<string, unknown>;
      return {
        value: cargo['id_cargo'] as number,
        label: cargo['cargo'] as string,
      };
    });
  }

  /**
   * Mapea perfiles a formato de select
   *
   * @param perfiles Array de perfiles con propiedades id_perfil y perfil
   * @returns Array de opciones de select con value y label
   */
  mapPerfiles(perfiles: unknown[]): SelectOption[] {
    return perfiles.map((p) => {
      const perfil = p as Record<string, unknown>;
      return {
        value: perfil['id_perfil'] as number,
        label: perfil['perfil'] as string,
      };
    });
  }

  /**
   * Mapea métodos de retiro a formato de select
   *
   * @param withdrawalMethods Array de métodos de retiro con propiedades id/withdrawalMethod y name/description
   * @returns Array de opciones de select con value y label
   */
  mapWithdrawalMethods(withdrawalMethods: unknown[]): SelectOption[] {
    return withdrawalMethods.map((w) => {
      const method = w as Record<string, unknown>;
      return {
        value: (method['id'] as number) || (method['withdrawalMethod'] as number),
        label: (method['name'] as string) || (method['description'] as string) || `Método ${(method['id'] as number) || (method['withdrawalMethod'] as number)}`,
      };
    });
  }

  /**
   * Mapea merchants a formato de select
   *
   * @param merchants Array de merchants con propiedades id y name
   * @returns Array de opciones de select con value y label
   */
  mapMerchants(merchants: unknown[]): SelectOption[] {
    return merchants.map((m) => {
      const merchant = m as Record<string, unknown>;
      return {
        value: merchant['id'] as number,
        label: (merchant['name'] as string) || (merchant['description'] as string) || `Merchant ${merchant['id'] as number}`,
      };
    });
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
  mapGeneric<T extends Record<string, unknown>>(
    items: T[],
    valueKey: string | ((item: T) => number | string),
    labelKey: string | ((item: T) => string),
    fallbackLabel?: (item: T, index: number) => string
  ): SelectOption[] {
    return items.map((item: T, index: number) => {
      const value =
        typeof valueKey === "function"
          ? valueKey(item)
          : (item[valueKey] as number | string);
      const label =
        typeof labelKey === "function"
          ? labelKey(item)
          : (item[labelKey] as string) ||
            (fallbackLabel ? fallbackLabel(item, index) : String(value));

      return {
        value,
        label,
      };
    });
  }
}
