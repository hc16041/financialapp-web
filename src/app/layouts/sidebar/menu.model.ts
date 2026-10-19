/**
 * Modelo de navegación del menú lateral (fuente única).
 *
 * Todas las fuentes de menú (`sidebar`, `horizontal-topbar`,
 * `two-column-sidebar`) comparten esta interfaz.
 */
export interface MenuItemBadge {
  /** Clave i18n del texto del badge. */
  text: string;
  /** Variante Bootstrap del badge (ej: `bg-success`). */
  variant: string;
}

export interface MenuItem {
  id?: number;
  /** Clave i18n del label (ej: `MENUITEMS.FINANCE.DASHBOARD`). */
  label: string;
  /** Clases `mdi` del icono (ej: `mdi mdi-view-dashboard-outline`). */
  icon?: string;
  /** Ruta absoluta de la aplicación. */
  link?: string;
  subItems?: MenuItem[];
  isTitle?: boolean;
  badge?: MenuItemBadge;
  parentId?: number;
  isCollapsed?: boolean;
  // Campos requeridos por los layouts alternativos (horizontal/two-column),
  // que consumen esta misma fuente de navegación.
  collapseid?: string;
  childItem?: MenuItem[];
  isLayout?: boolean;
}
