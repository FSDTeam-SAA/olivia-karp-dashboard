"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowUp,
  ArrowDown,
  PlusSquare,
  Upload,
  FileText,
  Image as ImageIcon,
  Users,
  FileDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const stats = [
  {
    title: "New Members",
    value: "12,426",
    change: "+ 36%",
    trend: "up",
  },
  {
    title: "Total Submissions",
    value: "1248",
    change: "+ 36%",
    trend: "up",
  },
  {
    title: "Pending Submissions",
    value: "758",
    change: "- 14%",
    trend: "down",
  },
  {
    title: "Active Mentors",
    value: "105",
    change: "+ 36%",
    trend: "up",
  },
];

const chartData = [
  { name: "Jan", value1: 1000, value2: 800 },
  { name: "Feb", value1: 1500, value2: 1200 },
  { name: "Mar", value1: 1300, value2: 1100 },
  { name: "Apr", value1: 2000, value2: 1400 },
  { name: "May", value1: 1800, value2: 1600 },
  { name: "Jun", value1: 2500, value2: 1900 },
  { name: "Jul", value1: 2200, value2: 2100 },
  { name: "Aug", value1: 3000, value2: 2500 },
];

const quickActions = [
  { icon: PlusSquare, label: "Job Post" },
  { icon: Upload, label: "Upload Course" },
  { icon: FileText, label: "Create Blog" },
  { icon: ImageIcon, label: "Add Media" },
  { icon: Users, label: "Add Mentor & Coaches" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border border-[#E2E8F0] shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <span className="text-[#64748B] text-sm font-medium">
                  {stat.title}
                </span>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold text-[#1A1A1A]">
                    {stat.value}
                  </span>
                  <div
                    className={`flex items-center text-xs font-semibold ${
                      stat.trend === "up" ? "text-[#10B981]" : "text-[#EF4444]"
                    }`}
                  >
                    {stat.change}{" "}
                    {stat.trend === "up" ? (
                      <ArrowUp className="ml-1 h-3 w-3" />
                    ) : (
                      <ArrowDown className="ml-1 h-3 w-3" />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 lg:grid-cols-4">
        {/* Chart Card */}
        <Card className="lg:col-span-3 border border-[#E2E8F0] shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-8">
            <CardTitle className="text-lg font-bold text-[#1A1A1A]">
              New Members
            </CardTitle>
            <div className="flex items-center gap-4">
              <Tabs defaultValue="7days" className="w-auto">
                <TabsList className="bg-[#F1F5F9] h-9 p-1">
                  <TabsTrigger value="7days" className="text-xs px-4">
                    7 Days
                  </TabsTrigger>
                  <TabsTrigger value="30days" className="text-xs px-4">
                    30 Days
                  </TabsTrigger>
                  <TabsTrigger value="6months" className="text-xs px-4">
                    6 Months
                  </TabsTrigger>
                  <TabsTrigger value="12months" className="text-xs px-4">
                    12 Months
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              {/* <Button variant="outline" size="sm" className="h-9 gap-2 border-[#E2E8F0] text-[#64748B]">
                                <FileDown className="h-4 w-4" />
                                Export PDF
                            </Button> */}
            </div>
          </CardHeader>
          <CardContent className="h-[400px] w-full pr-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="#F1F5F9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value1"
                  stroke="#6366F1"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: "#004242" }}
                />
                <Line
                  type="monotone"
                  dataKey="value2"
                  stroke="#94A3B8"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card className="lg:col-span-1 border border-[#E2E8F0] shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-[#1A1A1A]">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            {quickActions.map((action, i) => (
              <Button
                key={i}
                variant="ghost"
                className="w-full justify-start h-14 gap-4 text-[#004242] font-semibold hover:bg-[#F8FAFB] border border-transparent hover:border-[#E2E8F0] rounded-xl px-4"
              >
                <div className="bg-[#F8FAFB] p-2 rounded-lg group-hover:bg-[#E2E8F0] transition-colors">
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="text-sm">{action.label}</span>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
