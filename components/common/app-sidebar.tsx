"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  BriefcaseBusinessIcon,
  CalendarClockIcon,
  HandCoinsIcon,
  HandshakeIcon,
  Home,
  ReceiptIndianRupeeIcon,
  ReceiptTextIcon,
  UsersIcon,
} from "lucide-react";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Bills",
    icon: HandCoinsIcon,
    disabled: true,
    children: [
      {
        title: "Monthly Bills",
        url: "/monthly-bills",
        icon: ReceiptTextIcon,
      },
      {
        title: "Daily Bills",
        url: "/daily-bills",
        icon: ReceiptIndianRupeeIcon,
      },
    ],
  },
  {
    title: "Attendance",
    url: "/attendance",
    icon: CalendarClockIcon,
  },
  {
    title: "Employees",
    url: "/employees",
    icon: UsersIcon,
  },
  {
    title: "Ecommerce",
    url: "/ecommerce",
    icon: BriefcaseBusinessIcon,
  },
  {
    title: "Customers",
    url: "/customers",
    icon: HandshakeIcon,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>Sri Manujanatha</SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <Collapsible key={item.url}>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        // className={`${item.disabled ? "pointer-events-none opacity-60" : ""}`}
                        asChild
                      >
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    {item.children && (
                      <CollapsibleContent>
                        {item.children.map((child) => (
                          <SidebarMenuItem key={child.url}>
                            <SidebarMenuButton asChild>
                              <a href={child.url}>
                                <child.icon />
                                <span>{child.title}</span>
                              </a>
                            </SidebarMenuButton>
                            <SidebarSeparator />
                          </SidebarMenuItem>
                        ))}
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
