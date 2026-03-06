import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tv,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  Video,
  Target,
  Eye,
  FileText
} from "lucide-react";

const stats = [
  {
    name: "Content Systems",
    value: "12",
    change: "+1 this month",
    icon: Video,
    trend: "up"
  },
  {
    name: "Moderation Decisions",
    value: "1.2M",
    change: "+180K this week",
    icon: MessageSquare,
    trend: "up"
  },
  {
    name: "Fairness Score",
    value: "89.4%",
    change: "+3.1% improvement",
    icon: Target,
    trend: "up"
  },
  {
    name: "Bias Incidents",
    value: "7",
    change: "-4 from last month",
    icon: AlertTriangle,
    trend: "down"
  },
];

const contentSystems = [
  { name: "Video Recommendation Engine", status: "compliant", fairnessScore: 91, category: "Recommendations", volume: "850K/day" },
  { name: "Content Moderation AI", status: "review", fairnessScore: 84, category: "Moderation", volume: "2.1M/day" },
  { name: "Ad Targeting System", status: "compliant", fairnessScore: 88, category: "Advertising", volume: "450K/day" },
  { name: "Search Ranking Algorithm", status: "compliant", fairnessScore: 93, category: "Search", volume: "1.5M/day" },
  { name: "Personalization Engine", status: "flagged", fairnessScore: 76, category: "Recommendations", volume: "680K/day" },
];

const biasMetrics = [
  { category: "Political Viewpoints", score: 87, status: "acceptable" },
  { category: "Cultural Content", score: 82, status: "review" },
  { category: "Age-Appropriate", score: 94, status: "acceptable" },
  { category: "Language/Region", score: 79, status: "review" },
];

const transparencyMetrics = [
  { name: "Algorithm Explainability", progress: 78 },
  { name: "User Control Options", progress: 85 },
  { name: "Audit Trail Completeness", progress: 92 },
  { name: "Public Reporting", progress: 70 },
];

const recentAlerts = [
  { message: "Personalization Engine showing regional bias patterns", severity: "high", time: "1 hour ago" },
  { message: "Content Moderation AI inconsistency in political content", severity: "medium", time: "4 hours ago" },
  { message: "Ad Targeting passed quarterly diversity audit", severity: "low", time: "12 hours ago" },
  { message: "New DSA transparency requirements effective next month", severity: "medium", time: "1 day ago" },
];

const ContentGuard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Tv className="h-8 w-8 text-purple-500" />
            ContentGuard
          </h1>
          <p className="text-muted-foreground">Media & Content AI Governance - Algorithmic Fairness</p>
        </div>
        <Badge variant="outline" className="text-purple-500 border-purple-500">
          <Eye className="mr-1 h-3 w-3" />
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

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Content Systems Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Content & Recommendation Systems
            </CardTitle>
            <CardDescription>AI systems processing user content and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contentSystems.map((system) => (
                <div key={system.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{system.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{system.category}</span>
                      <span>•</span>
                      <span>{system.volume}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium">{system.fairnessScore}%</p>
                      <p className="text-xs text-muted-foreground">Fairness</p>
                    </div>
                    <Badge
                      variant={system.status === 'compliant' ? 'default' : system.status === 'review' ? 'secondary' : 'destructive'}
                    >
                      {system.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bias Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Content Bias Analysis</CardTitle>
            <CardDescription>Cross-category fairness metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {biasMetrics.map((metric) => (
                <div key={metric.category} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-sm font-medium">{metric.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{metric.score}%</span>
                    <Badge variant={metric.status === 'acceptable' ? 'default' : 'secondary'}>
                      {metric.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transparency Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Algorithmic Transparency</CardTitle>
            <CardDescription>DSA & platform transparency compliance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transparencyMetrics.map((metric) => (
                <div key={metric.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metric.name}</span>
                    <span className="text-sm text-muted-foreground">{metric.progress}%</span>
                  </div>
                  <Progress value={metric.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Recent Alerts & Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAlerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                {alert.severity === 'high' ? (
                  <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                ) : alert.severity === 'medium' ? (
                  <FileText className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="text-sm">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentGuard;
