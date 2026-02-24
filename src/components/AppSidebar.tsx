import { BookTemplate, Component, Form, ScrollText } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

const mainItems = [
  { title: "Components", url: "/components", icon: Component },
  { title: "Templates", url: "/templates", icon: BookTemplate },
  { title: "Forms", url: "/forms", icon: Form },
  { title: "FormArray", url: "/formarray", icon: ScrollText },
];


export function AppSidebar() {
  const location = useLocation();
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarHeader className="text-sm font-bold">
            </SidebarHeader>
            <SidebarMenu>
              {mainItems?.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} className={location.pathname === item.url ? "bg-blue-200 text-sidebar-accent-foreground" : ""}>
                    <Link
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-4 text-black"
                    >
                      <item.icon className="text-black" />
                      <span className="text-black font-normal ">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
