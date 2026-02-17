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
import { Link } from "react-router-dom";

const mainItems = [
  { title: "Components", url: "/components", icon: Component },
  { title: "Templates", url: "/templates", icon: BookTemplate },
  { title: "Forms", url: "/forms", icon: Form },
  { title: "FormArray", url: "/formarray", icon: ScrollText },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarHeader className="text-sm font-bold">
              shadcn ui
            </SidebarHeader>
            <SidebarMenu>
              {mainItems?.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-4 text-black hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                      <item.icon className="h-4 w-4 shrink-0 text-black" />
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
