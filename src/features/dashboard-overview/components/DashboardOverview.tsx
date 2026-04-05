"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Briefcase,
  Users,
  Clock,
  ChevronRight,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    icon: TrendingUp,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Active Projects",
    value: "12",
    change: "+3",
    trend: "up",
    icon: Briefcase,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "New Clients",
    value: "2,350",
    change: "+180",
    trend: "up",
    icon: Users,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Avg. Response Time",
    value: "2.4h",
    change: "-12%",
    trend: "down",
    icon: Clock,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

const recentProjects = [
  {
    id: 1,
    name: "Branding for Olivia",
    category: "Design",
    status: "In Progress",
    members: ["OK", "JD", "AS"],
    progress: 65,
  },
  {
    id: 2,
    name: "Mobile App Development",
    category: "Development",
    status: "Review",
    members: ["JD", "LK"],
    progress: 90,
  },
  {
    id: 3,
    name: "Marketing Campaign Q2",
    category: "Marketing",
    status: "Planned",
    members: ["OK", "AS"],
    progress: 15,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Good morning, Olivia
          </h1>
          <p className="text-muted-foreground mt-1">
            Here&apos;s what&apos;s happening with your projects today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-10 hover:bg-muted transition-colors"
          >
            Download Report
          </Button>
          <Button className="h-10 px-4 bg-primary text-white shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, i) => (
          <motion.div key={i} variants={item}>
            <Card className="hover:shadow-lg transition-all duration-300 border-none bg-card/60 backdrop-blur-sm group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <stat.icon className="h-12 w-12" />
              </div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div
                  className={`${stat.bg} ${stat.color} p-2 rounded-lg transition-transform group-hover:rotate-12`}
                >
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center mt-1">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-4 w-4 text-orange-500" />
                  )}
                  <span
                    className={`text-xs font-medium ${stat.trend === "up" ? "text-emerald-500" : "text-orange-500"}`}
                  >
                    {stat.change}
                  </span>
                  <span className="ml-1 text-[10px] text-muted-foreground">
                    from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Content: Recent Projects */}
        <Card className="lg:col-span-4 border-none bg-card/60 backdrop-blur-sm shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>
                You have 12 active projects this month.
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:bg-primary/5"
            >
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center font-bold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {project.name.charAt(0)}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold leading-none group-hover:text-primary transition-colors cursor-pointer">
                        {project.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {project.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="hidden md:flex -space-x-3">
                      {project.members.map((member, i) => (
                        <Avatar
                          key={i}
                          className="h-8 w-8 border-2 border-background ring-2 ring-transparent group-hover:ring-primary/20 transition-all"
                        >
                          <AvatarFallback className="bg-muted text-[10px] font-bold">
                            {member}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <div className="w-24 hidden lg:block">
                      <div className="flex justify-between text-[10px] mb-1 font-medium">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-primary rounded-full shadow-sm"
                        />
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Content: Notifications/Messages */}
        <Card className="lg:col-span-3 border-none bg-card/60 backdrop-blur-sm shadow-md">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Tasks requiring your attention.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                time: "09:00 AM",
                task: "Product Team Sync",
                desc: "Design Review",
              },
              {
                time: "11:30 AM",
                task: "Client Presentation",
                desc: "Strategy Deck",
              },
              { time: "03:00 PM", task: "QA Testing", desc: "Mobile App v2.1" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
              >
                <div className="text-xs font-semibold text-primary w-16 pt-1">
                  {item.time}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold">{item.task}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full mt-4 h-10 border-dashed hover:border-primary hover:text-primary transition-all"
            >
              View Schedule
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
