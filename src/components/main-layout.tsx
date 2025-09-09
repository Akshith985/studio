
// src/components/main-layout.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartPulse, LayoutDashboard, LogIn, LogOut, MessageCircle, Phone, Sparkles, Trophy, User, UserPlus, Users, Users2, Wind } from "lucide-react";
import { useAuth } from "@/context/auth-provider";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { usePoints } from "@/context/points-provider";

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
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

const pageTitles: { [key: string]: string } = {
    '/': 'Dashboard',
    '/profile': 'Profile',
    '/unwind': 'Unwind Corner',
    '/chat-room': 'Chat Room',
    '/chatbot': 'AI Wellness Coach',
    '/contact': 'Book a Session',
    '/video-call': 'Video Call',
    '/login': 'Login',
    '/register': 'Register'
};


export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const { points } = usePoints();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;
  const pageTitle = pageTitles[pathname] || 'SereneMind';

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
              <h2 className="text-lg font-semibold tracking-tight">SereneMind</h2>
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
            {!loading && user && (
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/profile")} tooltip={{children: "Profile"}}>
                  <Link href="/profile">
                    <User/>
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/unwind")}
                tooltip={{ children: "Unwind Corner" }}
              >
                <Link href="/unwind">
                  <Wind />
                  <span>Unwind Corner</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/chat-room")}
                tooltip={{ children: "Chat Room" }}
              >
                <Link href="/chat-room">
                  <Users2 />
                  <span>Chat Room</span>
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
             <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/video-call")}
                tooltip={{ children: "Video Call" }}
              >
                <Link href="/video-call">
                  <Phone />
                  <span>Video Call</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4 space-y-4">
            {!loading && user && (
                <div className="rounded-lg bg-accent/50 p-3 space-y-2 group-data-[collapsible=icon]:hidden">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <Trophy className="h-5 w-5 text-yellow-500"/>
                           <span className="font-semibold text-sm">Wellness Level 5</span>
                        </div>
                        <span className="text-xs text-muted-foreground">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                </div>
            )}
            <SidebarSeparator />
            <SidebarMenu>
              {!loading && user ? (
                  <SidebarMenuItem>
                      <SidebarMenuButton onClick={handleLogout} tooltip={{children: "Logout"}}>
                          <LogOut/>
                          <span>Logout</span>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
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
      <SidebarInset className="p-4 lg:p-6 flex flex-col">
        <header className="mb-6 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden" />
                <h1 className="text-2xl font-bold tracking-tight">{pageTitle}</h1>
             </div>
            {!loading && user && (
                <div className="flex items-center gap-2 rounded-full bg-accent/80 px-4 py-2 text-sm font-semibold text-accent-foreground">
                    <Sparkles className="h-5 w-5 text-primary"/>
                    <span>{points.toLocaleString()} Points</span>
                </div>
            )}
        </header>
        <div className="flex-1">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
