import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: "MENUITEMS.MENU.TEXT",
    isTitle: true,
  },
  {
    id: 2,
    // label: "MENUITEMS.DASHBOARD.TEXT",
    label: "Formularios",
    icon: "mdi mdi-finance",
    isCollapsed: true,
    subItems: [
      {
        id: 3,
        // label: "MENUITEMS.DASHBOARD.LIST.ANALYTICS",
        label: "NRP41",
        parentId: 2,
        isCollapsed: true,
        subItems: [
          {
            id: 3,
            label: "1. Personas",
            link: "/nrp41-personas",
          },
          {
            id: 3,
            label: "2. Referencia",
            link: "/nrp41-referencia",
          },
          {
            id: 3,
            label: "3. Referencia Garantia",
            link: "/nrp41-referencia_garantia",
          },
          {
            id: 3,
            label: "4. Garantia Hipotecaria",
            link: "/nrp41-garantia_hipotecaria",
          },
          {
            id: 3,
            label: "5. Garantia Fiduciaria",
            link: "/nrp41-garantia_fiduciaria",
          },
          {
            id: 3,
            label: "6. Garantia Aval",
            link: "/nrp41-garantia_aval",
          },
          {
            id: 3,
            label: "7. Garantia Pignorada",
            link: "/nrp41-garantia_pignorada",
          },
          {
            id: 3,
            label: "8. Garantia Prenda",
            link: "/nrp41-garantia_prenda",
          },
          {
            id: 3,
            label: "9. Garantia Bono",
            link: "/nrp41-garantia_bono",
          },
          {
            id: 3,
            label: "10. Garantia Poliza",
            link: "/nrp41-garantia_poliza",
          },
          {
            id: 3,
            label: "11. Garantia Fondo",
            link: "/nrp41-garantia_fondo",
          },
          {
            id: 3,
            label: "12. Referencia Gasto",
            link: "/nrp41-referencia_gasto",
          },
          {
            id: 3,
            label: "13. Referencia Unidad",
            link: "/nrp41-referencia_unidad",
          },
          {
            id: 3,
            label: "14. Referencia Cancelada",
            link: "/nrp41-referencia_cancelada",
          },
          {
            id: 3,
            label: "15. Socios Sociedades",
            link: "/nrp41-socios_sociedades",
          },
          {
            id: 3,
            label: "16. Junta Directiva",
            link: "/nrp41-junta_directiva",
          },
          {
            id: 3,
            label: "17. Garantia Prendaria",
            link: "/nrp41-garantia_prendaria",
          },
        ],
      },
      {
        id: 4,
        label: "NRSF03",
        parentId: 2,
        isCollapsed: true,
        subItems: [
          {
            id: 5,
            label: "1. Clientes",
            link: "/nrsf03-clientes",
          },
          {
            id: 5,
            label: "2. Depositos",
            link: "/nrsf03-depositos",
          },
          {
            id: 5,
            label: "3. Docs Clientes",
            link: "/nrsf03-docs-cliente",
          },
          {
            id: 5,
            label: "4. Titulares",
            link: "/nrsf03-titulares",
          },
          {
            id: 5,
            label: "5. Catalogo Agencias",
            link: "/nrsf03-catalogo-agencias",
          },
          {
            id: 5,
            label: "6. Productos",
            link: "/nrsf03-productos",
          },
          {
            id: 5,
            label: "7. Funcionarios Empleados",
            link: "/nrsf03-funcionarios-empleados",
          },
          {
            id: 5,
            label: "8. Depositos Garantizados",
            link: "/nrsf03-depositos-garantizados",
          },
          {
            id: 5,
            label: "9. Ajustes",
            link: "/nrsf03-ajustes",
          },
        ],
      },
      {
        id: 5,
        label: "NRSF01",
        parentId: 2,
        isCollapsed: true,
        subItems: [
          {
            id: 6,
            label: "1. ANEXO 1",
            link: "/nrsf01-anexo1",
          },
          {
            id: 6,
            label: "2. ANEXO 2",
            link: "/nrsf01-anexo2",
          },
          {
            id: 6,
            label: "3. ANEXO 3",
            link: "/nrsf01-anexo3",
          },
          {
            id: 6,
            label: "4. ANEXO 4",
            link: "/nrsf01-anexo4",
          },
          {
            id: 6,
            label: "5. ANEXO 5",
            link: "/nrsf01-anexo5",
          },
          {
            id: 6,
            label: "6. ANEXO 6",
            link: "/nrsf01-anexo6",
          },
          {
            id: 6,
            label: "7. ANEXO 7",
            link: "/nrsf01-anexo7",
          },
          {
            id: 6,
            label: "8. ANEXO 8",
            link: "/nrsf01-anexo8",
          },
          {
            id: 6,
            label: "9. ANEXO 10",
            link: "/nrsf01-anexo10",
          },
          {
            id: 6,
            label: "10. ANEXO 11",
            link: "/nrsf01-anexo11",
          },
          {
            id: 6,
            label: "11. ANEXO 12",
            link: "/nrsf01-anexo12",
          },
        ],
      },
      {
        id: 6,
        label: "NRP36",
        parentId: 2,
        isCollapsed: true,
        subItems: [
          {
            id: 7,
            label: "1. ANEXO 1",
            link: "/nrp36-anexo1",
          },
          {
            id: 7,
            label: "2. ANEXO 2",
            link: "/nrp36-anexo2",
          },
          {
            id: 7,
            label: "3. ANEXO 3",
            link: "/nrp36-anexo3",
          },
          {
            id: 7,
            label: "4. ANEXO 4",
            link: "/nrp36-anexo4",
          },
          {
            id: 7,
            label: "5. ANEXO 5",
            link: "/nrp36-anexo5",
          },
          {
            id: 7,
            label: "6. ANEXO 6",
            link: "/nrp36-anexo6",
          },
          {
            id: 7,
            label: "7. ANEXO 7",
            link: "/nrp36-anexo7",
          },
          {
            id: 7,
            label: "8. ANEXO 8",
            link: "/nrp36-anexo8",
          },
        ],
      },
      {
        id: 7,
        label: "NRP51",
        parentId: 2,
        isCollapsed: true,
        subItems: [
          {
            id: 8,
            label: "1. SALDO CUENTA",
            link: "/nrp51-saldo_cuenta",
          },
          {
            id: 8,
            label: "2. DEPOSITO EXTRANJERO",
            link: "/nrp51-deposito_extranjero",
          },
          {
            id: 8,
            label: "3. DATO EXTRACONTABLE",
            link: "/nrp51-dato_extracontable",
          },
          {
            id: 8,
            label: "4. TITULO VALOR EXTRANJERO",
            link: "/nrp51-titulo_valor_extranjero",
          },
          {
            id: 8,
            label: "5. PRESTAMO GARANTIZADO",
            link: "/nrp51-prestamo_garantizado",
          },
          {
            id: 8,
            label: "6. AVAL GARANTIZADO",
            link: "/nrp51-aval_garantizado",
          },
          {
            id: 8,
            label: "7. DEUDA SUBORDINADA",
            link: "/nrp51-deuda_subordinada",
          },
          {
            id: 8,
            label: "8. BALANCE PROYECTADO",
            link: "/nrp51-balance_proyectado",
          },
        ],
      },
    ],
  },

  {
    id: 5,
    label: "Mantenimientos",
    icon: "mdi mdi-cog",
    isCollapsed: true,
    subItems: [
      {
        id: 6,
        label: "Cargo",
        link: "/centries-cargo",
        parentId: 5,
      },
      {
        id: 6,
        label: "Perfil",
        link: "/centries-perfil",
        parentId: 5,
      },
      {
        id: 6,
        label: "Permiso Perfil",
        link: "/centries-permisoperfil",
        parentId: 6,
      },
      {
        id: 6,
        label: "Usuarios Activos",
        link: "/centries-usuario",
        parentId: 5,
      },
      {
        id: 6,
        label: "Usuarios Inactivos",
        link: "/centries-usuario-inactivos",
        parentId: 5,
      },
      {
        id: 6,
        label: "Bitacora",
        link: "/centries-bitacora",
        parentId: 5,
      },
    ],
  },
  {
    id: 6,
    label: "Tarjetas de Crédito",
    link: "/creditcard",
    parentId: 5,
  },
  {
    id: 6,
    label: "Transacciones",
    link: "/transactions",
    parentId: 5,
  },
];
