// src/components/main-layout.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrainCircuit, HeartPulse, LayoutDashboard, LogIn, LogOut, MessageCircle, Settings, User, UserPlus, Users, Wind } from "lucide-react";
import { useAuth } from "@/context/auth-provider";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

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
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    await signOut(auth);
    // This is a client component, so we can't use `cookies().delete` directly.
    // A server action would be needed to clear the cookie.
    // For now, we redirect and the middleware will handle unauthenticated state.
    document.cookie = 'firebaseIdToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/login');
  };

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
              {!loading && user ? (
                <>
                  <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={isActive("/profile")} tooltip={{children: "Profile"}}>
                          <Link href="/profile">
                              <User/>
                              <span>Profile</span>
                          </Link>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                      <SidebarMenuButton onClick={handleLogout} tooltip={{children: "Logout"}}>
                          <LogOut/>
                          <span>Logout</span>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              ) : !loading && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/login")} tooltip={{children: "Login"}}>
                        <Link href="/login">
                            <LogIn/>
                            <span>Login</span>
                        </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/register")} tooltip={{children: "Register"}}>
                        <Link href="/register">
                            <UserPlus/>
                            <span>Register</span>
                        </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}
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
