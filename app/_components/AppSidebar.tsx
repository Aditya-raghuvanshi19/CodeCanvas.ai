"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Home, Paintbrush, CircleDollarSign, LogOut } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { auth } from "@/configs/firebaseConfig";
import { signOut } from "firebase/auth"; // ✅ adjust to your firebase config

const items = [
  { title: "Workspace", url: "/dashboard", icon: Home },
  { title: "My Projects", url: "/designs", icon: Paintbrush },
  { title: "Credits", url: "/credits", icon: CircleDollarSign },
];

export function AppSidebar() {
  const path = usePathname();
  const router = useRouter();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        router.replace("/"); // redirect to login/home after logout
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <Sidebar className="bg-background border-r border-border flex flex-col">
      {/* Header / Branding */}
      <SidebarHeader>
        <div className="px-4 py-3 flex items-center gap-3">
          <Image src="/visioncode.png" alt="logo" width={45} height={40} />
          <h2 className="font-semibold text-lg text-foreground">
            Wireframe<span className="text-primary">2Code</span>
          </h2>
        </div>
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="mt-3">
              {items.map((item, index) => {
                const isActive = path === item.url;
                return (
                  <a
                    href={item.url}
                    key={index}
                    className={`
                      p-2 flex gap-3 items-center text-sm font-medium rounded-md
                      transition-colors duration-200
                      ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }
                    `}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span>{item.title}</span>
                  </a>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with Sign Out */}
      <SidebarFooter>
        <div className="flex flex-col gap-3 px-3 py-4 border-t border-border">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 text-sm"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            © CodeCanvas.AI
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
