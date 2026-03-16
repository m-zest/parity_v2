import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Radar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useDashboardStats, useRecentActivity } from "@/hooks/useDashboardStats";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { QuickViewPanels } from "@/components/dashboard/QuickViewPanels";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

const Dashboard = () => {
  const { data: dashboardData, isLoading: statsLoading } = useDashboardStats();
  const { data: activities, isLoading: activitiesLoading } = useRecentActivity();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">FairHire AI - HR Governance Overview</p>
        </div>
        <div className="flex gap-2">
          <Link to="/models">
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Model
            </Button>
          </Link>
          <Link to="/vendors">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Vendor
            </Button>
          </Link>
        </div>
      </div>

      {/* RegulatoryRadar Highlight */}
      <Link to="/regulatory-radar" className="block">
        <Card className="border-primary/30 bg-gradient-to-r from-primary/5 via-primary/10 to-transparent hover:border-primary/50 transition-colors cursor-pointer">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Radar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">RegulatoryRadar</h3>
                <p className="text-xs text-muted-foreground">
                  Autonomous compliance scanning — monitor EU AI Act, NIST, NYC LL144 & more with AI-powered agents
                </p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </CardContent>
        </Card>
      </Link>

      {/* Stats Grid */}
      <DashboardStats stats={dashboardData?.stats} isLoading={statsLoading} />

      {/* Charts Row */}
      <DashboardCharts
        taskData={dashboardData?.taskData}
        incidentData={dashboardData?.incidentData}
        riskDistribution={dashboardData?.riskDistribution}
        isLoading={statsLoading}
      />

      {/* Quick View Panels - Recent Models & Incidents */}
      <QuickViewPanels
        recentModels={dashboardData?.recentModels}
        recentIncidents={dashboardData?.recentIncidents}
        isLoading={statsLoading}
      />

      {/* Recent Activity */}
      <RecentActivity activities={activities} isLoading={activitiesLoading} />
    </div>
  );
};

export default Dashboard;
