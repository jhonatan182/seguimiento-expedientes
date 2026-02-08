import { redirect } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { auth } from "@/app/auth.config";
import { NavLinkActive } from "./nav-link-active";

export async function NavMain() {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

  const { menuOptions } = session.user;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Inicio</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {menuOptions?.map((item) => (
            <SidebarMenuItem key={item.title}>
              <NavLinkActive
                path={item.path}
                title={item.title}
                icon={item.icon}
              />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
