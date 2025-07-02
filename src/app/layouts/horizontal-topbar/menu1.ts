import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: "MENUITEMS.MENU.TEXT",
    isTitle: true,
  },
  {
    id: 2,
    label: "MENUITEMS.DASHBOARD.TEXT",
    icon: "mdi mdi-speedometer",
    subItems: [
      {
        id: 3,
        label: "MENUITEMS.DASHBOARD.LIST.ANALYTICS",
        link: "/nrp41",
        parentId: 2,
      },
    ],
  },
];
