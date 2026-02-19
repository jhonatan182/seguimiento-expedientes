import { IMenuItem } from "@/interfaces";

export function buildMenu(isJefe: string): IMenuItem[] {
  const defaultMenu: IMenuItem[] = [
    {
      title: "Expediente",
      url: "#",
      icon: "IconFileWord",
      path: "/",
    },
    // {
    //   title: "Resumen Semanal",
    //   url: "#",
    //   icon: "IconListDetails",
    //   path: "/resumen-semanal",
    // },
  ];

  // if (isJefe === "S") {
  //   defaultMenu.push({
  //     title: "Resumen de Unidad",
  //     url: "#",
  //     icon: "IconInnerShadowTop",
  //     path: "/resumen-unidad",
  //   });
  // }

  return defaultMenu;
}
