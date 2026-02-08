"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { SidebarMenuButton } from "../ui/sidebar";
import { iconMap } from "@/utils/icon-map";

type NavLinkActiveProps = {
  path: string;
  title: string;
  icon: string;
};

export function NavLinkActive({ path, title, icon }: NavLinkActiveProps) {
  const pathname = usePathname();

  const IconComponent = iconMap[icon as keyof typeof iconMap];

  return (
    <Link href={path}>
      <SidebarMenuButton
        tooltip={title}
        className={
          "cursor-pointer " +
          (pathname === path
            ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
            : "")
        }
      >
        {IconComponent && <IconComponent className="!size-4" />}
        <span>{title}</span>
      </SidebarMenuButton>
    </Link>
  );
}
