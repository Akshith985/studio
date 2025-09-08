"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrainCircuit, HeartPulse, LayoutDashboard, MessageCircle, Settings, User, Users, Wind } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
  SidebarGroup,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
             <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10" asChild>
                <Link href="/">
                    <HeartPulse className="h-6 w-6" />
                </Link>
            </Button>
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold tracking-tight">Mindful Moment</h2>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/")}
                tooltip={{ children: "Dashboard" }}
              >
                <Link href="/">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/meditation")}
                tooltip={{ children: "Meditation" }}
              >
                <Link href="/meditation">
                  <BrainCircuit />
                  <span>Guided Meditation</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/breathing")}
                tooltip={{ children: "Breathing" }}
              >
                <Link href="/breathing">
                  <Wind />
                  <span>Breathing Exercises</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/chatbot")}
                tooltip={{ children: "AI Coach" }}
              >
                <Link href="/chatbot">
                  <MessageCircle />
                  <span>AI Coach</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/contact")}
                tooltip={{ children: "Contact Counsellor" }}
              >
                <Link href="/contact">
                  <Users />
                  <span>Contact Counsellor</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={{children: "Profile"}}>
                        <Link href="#">
                            <User/>
                            <span>Profile</span>
                        </Link>
                    </SidebarMenuButton>
                 </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={{children: "Settings"}}>
                        <Link href="#">
                            <Settings/>
                            <span>Settings</span>
                        </Link>
                    </SidebarMenuButton>
                 </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="p-4 lg:p-6">
        <header className="mb-6 flex items-center justify-between md:hidden">
             <Link href="/" className="flex items-center gap-2 text-primary">
                <HeartPulse className="h-6 w-6" />
                <span className="text-lg font-bold">Mindful Moment</span>
            </Link>
            <SidebarTrigger />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
