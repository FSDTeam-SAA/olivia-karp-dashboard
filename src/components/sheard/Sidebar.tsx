"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Settings,
  Users,
  MonitorPlay,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Bell,
  Search,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type SidebarProps = React.HTMLAttributes<HTMLDivElement>;

const menuItems = [
  {
    title: "Dashboard Overview",
    icon: LayoutDashboard,
    href: "/dashboard-overview",
  },
  {
    title: "Content Management",
    icon: MonitorPlay,
    href: "/content-management",
  },
  {
    title: "Opportunities Management",
    icon: Briefcase,
    href: "/opportunities",
  },
  {
    title: "Mentor & Coaches",
    icon: Users,
    href: "/mentors",
  },
  {
    title: "Courses",
    icon: GraduationCap,
    href: "/courses",
  },
  {
    title: "Notification",
    icon: MessageSquare,
    href: "/notifications",
  },
  {
    title: "Request Massage",
    icon: Bell,
    href: "/request-massage",
  },
  {
    title: "User Data",
    icon: Search,
    href: "/user-data",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-white shadow-sm border-r w-72",
        className,
      )}
    >
      {/* Brand Section */}
      <div className="p-8 flex flex-col items-center justify-center">
        <Link
          href="/dashboard-overview"
          className="flex flex-col items-center gap-2"
        >
          <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-2 space-y-3 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-4 px-4 py-4 text-[15px] font-semibold rounded-xl transition-all duration-200",
                isActive
                  ? "bg-primary text-white shadow-lg shadow-[#00474b]/20"
                  : "text-primary hover:bg-primary/5",
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5",
                  isActive ? "text-white" : "text-primary",
                )}
              />
              <div className="flex-1 flex items-center justify-between">
                <span>{item.title}</span>
                {item.title === "Content Management" && !isActive && (
                  <span className="text-primary opacity-40">
                    <svg
                      width="6"
                      height="10"
                      viewBox="0 0 6 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 9L5 5L1 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User Session Section */}
      <div className="p-6 mt-auto">
        <div className="flex items-center gap-3 mb-6 px-2">
          <Avatar className="h-12 w-12 border-2 border-white shadow-md">
            <AvatarImage
              src="/images/avatar-placeholder.png"
              alt="Olivia Karp"
            />
            <AvatarFallback className="bg-[#00474b]/10 text-[#00474b] font-bold">
              OK
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#00474b]">
              Olivia Karp
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              Admin
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full justify-center gap-2 border-[1.5px] border-[#ff6b6b] text-[#ff6b6b] hover:bg-[#ff6b6b] hover:text-white transition-all duration-300 rounded-xl h-11 font-bold"
        >
          <LogOut className="h-5 w-5 transform rotate-180" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
