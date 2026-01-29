"use client";
import { useSession } from "next-auth/react";

import {
  IconFileWord,
  IconInnerShadowTop,
  IconListDetails,
} from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

const items = [
  {
    title: "Expediente",
    url: "#",
    icon: IconFileWord,
    path: "/",
  },
  {
    title: "Resumen Semanal",
    url: "#",
    icon: IconListDetails,
    path: "/resumen-semanal",
  },
  {
    title: "Resumen de Unidad",
    url: "#",
    icon: IconInnerShadowTop,
    path: "/resumen-unidad",
  },
];

export function NavMain() {
  const pathname = usePathname();

  const { data: session } = useSession();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Inicio</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            if (
              session?.user.isJefe !== "S" &&
              item.path === "/resumen-unidad"
            ) {
              return null;
            }

            return (
              <SidebarMenuItem key={item.title}>
                <Link href={item.path}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={
                      "cursor-pointer " +
                      (pathname === item.path
                        ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
                        : "")
                    }
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
