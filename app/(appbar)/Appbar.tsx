"use client";

import { AddItemForm } from "@/components/common/add-item";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const Appbar = () => {
    const navigationItems = [
        {
          label: "Item One",
          links: ["Link 1", "Link 2", "Link 3"],
        },
        {
          label: "Item Two",
          links: ["Submenu 1", "Submenu 2"],
        },
      ];
  return (
    <NavigationMenu>
    <NavigationMenuList>
      {/* Sidebar Trigger */}
      <SidebarTrigger />

      {/* Dynamic Navigation Items */}
      {navigationItems.map((item, index) => (
        <NavigationMenuItem key={index}>
          <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
          <NavigationMenuContent>
            {item.links.map((link, i) => (
              <NavigationMenuLink key={i}>{link}</NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      ))}

      {/* Billing Dialog */}
      <NavigationMenuItem>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">Bill</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you are done.
              </DialogDescription>
            </DialogHeader>
            <AddItemForm />
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </NavigationMenuItem>

      {/* Mode Toggle */}
      <NavigationMenuItem>
        <ModeToggle />
      </NavigationMenuItem>

      {/* Additional Static Items */}
      <NavigationMenuItem>
        <NavigationMenuTrigger>More Options</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink>About</NavigationMenuLink>
          <NavigationMenuLink>Contact</NavigationMenuLink>
          <NavigationMenuLink>Support</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
  );
};

export default Appbar;
