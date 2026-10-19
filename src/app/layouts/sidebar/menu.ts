import { MenuItem } from "./menu.model";

/**
 * Fuente única de navegación del sistema de finanzas personales.
 *
 * - Labels por clave i18n (es/en).
 * - Iconos `mdi` coherentes por módulo.
 * - Rutas reales del router (`/formularios/...`, `/settings/biometric`).
 *
 * La sección "Seguridad" (Centries) se añadirá una vez existan sus rutas
 * (SPEC-06); por ahora no se exponen enlaces a rutas inexistentes.
 */
export const MENU: MenuItem[] = [
  {
    label: "MENUITEMS.MENU.TEXT",
    isTitle: true,
  },
  {
    label: "MENUITEMS.FINANCE.DASHBOARD",
    icon: "mdi mdi-view-dashboard-outline",
    link: "/",
  },
  {
    label: "MENUITEMS.FINANCE.MAINTENANCE",
    icon: "mdi mdi-cog-outline",
    subItems: [
      {
        label: "MENUITEMS.FINANCE.CREDIT_CARD",
        icon: "mdi mdi-credit-card-outline",
        link: "/formularios/creditcard",
      },
      {
        label: "MENUITEMS.FINANCE.TRANSACTIONS",
        icon: "mdi mdi-swap-horizontal",
        link: "/formularios/transactions",
      },
      {
        label: "MENUITEMS.FINANCE.MERCHANTS",
        icon: "mdi mdi-store-outline",
        link: "/formularios/merchants",
      },
      {
        label: "MENUITEMS.FINANCE.CATEGORIES",
        icon: "mdi mdi-tag-multiple-outline",
        link: "/formularios/categories",
      },
      {
        label: "MENUITEMS.FINANCE.INVESTMENTS",
        icon: "mdi mdi-trending-up",
        link: "/formularios/investments",
      },
      {
        label: "MENUITEMS.FINANCE.PLATFORMS",
        icon: "mdi mdi-layers-outline",
        link: "/formularios/platforms",
      },
      {
        label: "MENUITEMS.FINANCE.WITHDRAWAL",
        icon: "mdi mdi-bank-transfer-out",
        link: "/formularios/withdrawal-methods",
      },
    ],
  },
  {
    label: "MENUITEMS.FINANCE.SECURITY",
    icon: "mdi mdi-shield-account-outline",
    subItems: [
      {
        label: "MENUITEMS.FINANCE.CENTRIES_USUARIO",
        icon: "mdi mdi-account-outline",
        link: "/formularios/centries/usuario",
      },
      {
        label: "MENUITEMS.FINANCE.CENTRIES_PERFIL",
        icon: "mdi mdi-account-group-outline",
        link: "/formularios/centries/perfil",
      },
      {
        label: "MENUITEMS.FINANCE.CENTRIES_CARGO",
        icon: "mdi mdi-briefcase-outline",
        link: "/formularios/centries/cargo",
      },
      {
        label: "MENUITEMS.FINANCE.CENTRIES_PERMISO_PERFIL",
        icon: "mdi mdi-key-outline",
        link: "/formularios/centries/permisos-perfil",
      },
      {
        label: "MENUITEMS.FINANCE.CENTRIES_USUARIOS_INACTIVOS",
        icon: "mdi mdi-account-off-outline",
        link: "/formularios/centries/usuarios-inactivos",
      },
      {
        label: "MENUITEMS.FINANCE.CENTRIES_BITACORA",
        icon: "mdi mdi-file-clock-outline",
        link: "/formularios/centries/bitacora",
      },
    ],
  },
  {
    label: "MENUITEMS.FINANCE.SAVINGS",
    icon: "mdi mdi-piggy-bank-outline",
    link: "/formularios/savings",
  },
  {
    label: "MENUITEMS.FINANCE.REPORTS",
    icon: "mdi mdi-chart-box-outline",
    link: "/formularios/reports",
  },
  {
    label: "MENUITEMS.FINANCE.SETTINGS",
    icon: "mdi mdi-cog-outline",
    link: "/settings/biometric",
  },
];
