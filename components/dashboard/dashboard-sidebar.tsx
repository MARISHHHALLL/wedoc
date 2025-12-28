import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import SidebarAppComponent from "./sidebar-app";

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarAppComponent />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
