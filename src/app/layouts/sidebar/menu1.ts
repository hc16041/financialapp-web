import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: "MENUITEMS.MENU.TEXT",
    isTitle: true,
  },
  {
    id: 2,
    label: "Formularios",
    icon: "mdi mdi-finance",
    isCollapsed: true,
    subItems: [
      {
        id: 3,
        label: "Tarjetas de Crédito",
        link: "/creditcard",
        parentId: 2,
      },
      {
        id: 4,
        label: "Transacciones",
        link: "/transactions",
        parentId: 2,
      },
      {
        id: 5,
        label: "Comercios",
        link: "/merchants",
        parentId: 2,
      },
      {
        id: 6,
        label: "Inversiones",
        link: "/investments",
        parentId: 2,
      },
      {
        id: 7,
        label: "Plataformas",
        link: "/platforms",
        parentId: 2,
      },
      {
        id: 8,
        label: "Métodos de Retiro",
        link: "/withdrawal-methods",
        parentId: 2,
      },
    ],
  },
];
