
"use client";

import { Card,CardContent,CardHeader,CardTitle } from "../../app/components/ui/card";
import { Button } from "../../app/components/ui/button";
import { Progress } from "../../app/components/ui/progress";
import { Tabs,TabsList,TabsTrigger,TabsContent } from "../../app/components/ui/tabs";
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger } from "../../app/components/ui/dropdown-menu";
import { ChartContainer,ChartTooltip,ChartTooltipContent } from "../../app/components/ui/chart";
import { Bar, Line, LineChart, XAxis, YAxis, Area, AreaChart, PieChart, Pie, Cell,BarChart } from "recharts";
import { Activity, Target, Globe, MoreHorizontal } from "lucide-react";

export default function AnalyticsDashboard({
  performanceData,
  skillsData,
  categoryData
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <Card className="lg:col-span-2 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <span>Performance Analytics</span>
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white shadow-lg rounded-md border border-gray-100">
                <DropdownMenuItem className="hover:bg-blue-50 px-4 py-2 cursor-pointer">Export Data</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-blue-50 px-4 py-2 cursor-pointer">View Details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="success">Success Rate</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <ChartContainer
                config={{
                  applications: { label: "Applications", color: "hsl(var(--chart-1))" },
                  interviews: { label: "Interviews", color: "hsl(var(--chart-2))" },
                  hired: { label: "Hired", color: "hsl(var(--chart-3))" }
                }}
                className="h-[300px]"
              >
                <AreaChart data={performanceData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="applications" stackId="1" stroke="var(--color-applications)" fill="var(--color-applications)" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="interviews" stackId="1" stroke="var(--color-interviews)" fill="var(--color-interviews)" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="hired" stackId="1" stroke="var(--color-hired)" fill="var(--color-hired)" fillOpacity={0.6} />
                </AreaChart>
              </ChartContainer>
            </TabsContent>
            <TabsContent value="applications" className="mt-4">
              <ChartContainer
                config={{
                  applications: { label: "Applications", color: "hsl(var(--chart-1))" }
                }}
                className="h-[300px]"
              >
                <BarChart data={performanceData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="applications" fill="var(--color-applications)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </TabsContent>
            <TabsContent value="success" className="mt-4">
              <ChartContainer
                config={{
                  success: { label: "Success Rate", color: "hsl(var(--chart-3))" }
                }}
                className="h-[300px]"
              >
                <LineChart data={performanceData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="success" stroke="var(--color-success)" strokeWidth={3} dot={{ fill: "var(--color-success)", strokeWidth: 2, r: 6 }} />
                </LineChart>
              </ChartContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-purple-500" />
              <span>Skills Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillsData.map((skill) => (
                <div key={skill.skill} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{skill.skill}</span>
                    <span className="text-muted-foreground">{skill.proficiency}%</span>
                  </div>
                  <div className="flex space-x-2">
                    <Progress value={skill.proficiency} className="flex-1" />
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1" style={{ opacity: skill.demand / 100 }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-green-500" />
              <span>Job Categories</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: { label: "Jobs", color: "hsl(var(--chart-1))" }
              }}
              className="h-[200px]"
            >
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
