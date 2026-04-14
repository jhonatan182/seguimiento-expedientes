import {
  SidebarInset,
  SidebarProvider,
} from "@/shared/components/ui/sidebar";
import { auth } from "../auth.config";
import { redirect } from "next/navigation";
import { TourProvider } from "@/shared/components/tour/tour-provider";
import { AutoTourProvider } from "@/shared/components/tour/auto-tour-provider";
import { AppSidebar } from "@/shared/components/sidebar/app-sidebar";
import { SiteHeader } from "@/shared/components/header/site-header";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children}
            </div>
          </div>
        </div>
        <TourProvider />
        <AutoTourProvider />
      </SidebarInset>
    </SidebarProvider>
  );
}
