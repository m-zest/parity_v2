import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Building2,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Database,
  Users,
  Shield,
  BarChart3,
  FileText,
  Layers
} from "lucide-react";

const stats = [
  {
    name: "Total AI Systems",
    value: "86",
    change: "+12 this quarter",
    icon: Database,
    trend: "up"
  },
  {
    name: "Active Teams",
    value: "14",
    change: "+2 this month",
    icon: Users,
    trend: "up"
  },
  {
    name: "Overall Governance Score",
    value: "87.3%",
    change: "+4.2% improvement",
    icon: Shield,
    trend: "up"
  },
  {
    name: "Open Risk Items",
    value: "23",
    change: "-8 from last month",
    icon: AlertTriangle,
    trend: "down"
  },
];

const businessUnits = [
  { name: "Human Resources", systems: 12, compliance: 94, riskLevel: "low" },
  { name: "Finance & Accounting", systems: 18, compliance: 89, riskLevel: "medium" },
  { name: "Customer Service", systems: 15, compliance: 91, riskLevel: "low" },
  { name: "Marketing & Sales", systems: 22, compliance: 82, riskLevel: "medium" },
  { name: "Operations", systems: 10, compliance: 96, riskLevel: "low" },
  { name: "Legal & Compliance", systems: 9, compliance: 98, riskLevel: "low" },
];

const complianceFrameworks = [
  { name: "EU AI Act", progress: 76, deadline: "Aug 2026" },
  { name: "NIST AI RMF", progress: 88, deadline: "Ongoing" },
  { name: "ISO 42001", progress: 72, deadline: "Dec 2026" },
  { name: "Internal AI Policy", progress: 95, deadline: "Ongoing" },
];

const executiveMetrics = [
  { name: "AI Risk Exposure", value: "$2.4M", trend: "down", change: "-18%" },
  { name: "Audit Coverage", value: "78%", trend: "up", change: "+12%" },
  { name: "Policy Compliance", value: "91%", trend: "up", change: "+5%" },
  { name: "Incident Response Time", value: "4.2h", trend: "down", change: "-23%" },
];

const recentActivities = [
  { message: "Quarterly executive AI governance report generated", severity: "low", time: "2 hours ago", team: "Compliance" },
  { message: "Marketing AI system flagged for bias review", severity: "medium", time: "6 hours ago", team: "Marketing" },
  { message: "New AI vendor onboarding initiated", severity: "low", time: "1 day ago", team: "Procurement" },
  { message: "Critical risk identified in legacy ML pipeline", severity: "high", time: "1 day ago", team: "Operations" },
  { message: "EU AI Act compliance gap assessment completed", severity: "medium", time: "2 days ago", team: "Legal" },
];

const Enterprise = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Building2 className="h-8 w-8 text-blue-500" />
            Enterprise AI Governance
          </h1>
          <p className="text-muted-foreground">Cross-Organization AI Risk & Compliance Management</p>
        </div>
        <Badge variant="outline" className="text-blue-500 border-blue-500">
          <TrendingUp className="mr-1 h-3 w-3" />
          Active Monitoring
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-yellow-500'}`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Executive Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Executive Dashboard
          </CardTitle>
          <CardDescription>Key metrics for leadership reporting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {executiveMetrics.map((metric) => (
              <div key={metric.name} className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-sm text-muted-foreground">{metric.name}</p>
                <p className={`text-xs mt-1 ${metric.trend === 'up' ? 'text-green-500' : 'text-yellow-500'}`}>
                  {metric.change} vs last quarter
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Business Units */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Business Unit Overview
            </CardTitle>
            <CardDescription>AI governance by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {businessUnits.map((unit) => (
                <div key={unit.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{unit.name}</p>
                    <p className="text-xs text-muted-foreground">{unit.systems} AI systems</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium">{unit.compliance}%</p>
                      <p className="text-xs text-muted-foreground">Compliance</p>
                    </div>
                    <Badge
                      variant={unit.riskLevel === 'low' ? 'default' : unit.riskLevel === 'medium' ? 'secondary' : 'destructive'}
                    >
                      {unit.riskLevel}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Compliance Frameworks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Compliance Frameworks
            </CardTitle>
            <CardDescription>Regulatory and policy adherence</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceFrameworks.map((framework) => (
                <div key={framework.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{framework.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{framework.deadline}</span>
                      <span className="text-sm">{framework.progress}%</span>
                    </div>
                  </div>
                  <Progress value={framework.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Cross-Team Activity Feed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                {activity.severity === 'high' ? (
                  <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                ) : activity.severity === 'medium' ? (
                  <FileText className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="text-sm">{activity.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">{activity.team}</Badge>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Enterprise;
