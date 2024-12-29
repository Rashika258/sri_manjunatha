"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/index";

import {
  BoxesIcon,
  BriefcaseBusinessIcon,
  CalendarClockIcon,
  HandshakeIcon,
  Home,
  Package2,
  ReceiptIndianRupeeIcon,
  ReceiptTextIcon,
  UsersIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
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
  {
    title: "Product Category",
    url: "/product-category",
    icon: BoxesIcon,
  },

  {
    title: "Products",
    url: "/products",
    icon: Package2,
  },
  {
    title: "Customers",
    url: "/customers",
    icon: HandshakeIcon,
  },

  {
    title: "Employees",
    url: "/employees",
    icon: UsersIcon,
  },
  {
    title: "Attendance",
    url: "/attendance",
    icon: CalendarClockIcon,
  },
  {
    title: "Ecommerce",
    url: "/ecommerce",
    icon: BriefcaseBusinessIcon,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader className="caveat__font text-slate-600 text-lg">
            Sri Manjunatha Engineering Works
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    variant={pathname === item.url ? "default" : null}
                    isActive={pathname === item.url}
                    asChild
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
