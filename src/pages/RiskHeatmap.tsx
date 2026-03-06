import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  AlertTriangle,
  Shield,
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  Info,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { useModels } from "@/hooks/useModels";
import { useIncidents } from "@/hooks/useIncidents";

// Risk categories
const riskCategories = [
  { id: "bias", name: "Bias & Fairness", weight: 0.25 },
  { id: "transparency", name: "Transparency", weight: 0.20 },
  { id: "security", name: "Security", weight: 0.20 },
  { id: "accountability", name: "Accountability", weight: 0.15 },
  { id: "reliability", name: "Reliability", weight: 0.10 },
  { id: "compliance", name: "Regulatory", weight: 0.10 },
];

// Generate department data based on models
function generateDepartmentRisks(models: any[], incidents: any[]) {
  const departments = [
    { id: "social-services", name: "Social Services", abbreviation: "DSS" },
    { id: "hr", name: "Human Resources", abbreviation: "HR" },
    { id: "transportation", name: "Transportation", abbreviation: "DOT" },
    { id: "revenue", name: "Revenue & Taxation", abbreviation: "REV" },
    { id: "citizen-services", name: "Citizen Services", abbreviation: "CS" },
    { id: "public-works", name: "Public Works", abbreviation: "PW" },
    { id: "health", name: "Public Health", abbreviation: "PH" },
    { id: "education", name: "Education", abbreviation: "EDU" },
  ];

  const modelCount = models?.length || 0;
  const incidentCount = incidents?.length || 0;

  return departments.map((dept, index) => {
    // Distribute models across departments
    const deptModels = Math.max(1, Math.floor(modelCount / departments.length) + (index < modelCount % departments.length ? 1 : 0));
    const deptIncidents = Math.floor(incidentCount / departments.length);

    // Generate realistic risk scores
    const baseScore = 70 + Math.random() * 25;
    const risks = {
      bias: { score: Math.round(baseScore + (Math.random() - 0.5) * 20), trend: ["improving", "stable", "declining"][Math.floor(Math.random() * 3)], incidents: Math.floor(Math.random() * 2) },
      transparency: { score: Math.round(baseScore + (Math.random() - 0.5) * 15), trend: "stable", incidents: 0 },
      security: { score: Math.round(baseScore + (Math.random() - 0.5) * 10), trend: "stable", incidents: Math.floor(Math.random() * 2) },
      accountability: { score: Math.round(baseScore + (Math.random() - 0.5) * 12), trend: ["improving", "stable"][Math.floor(Math.random() * 2)], incidents: 0 },
      reliability: { score: Math.round(baseScore + (Math.random() - 0.5) * 18), trend: ["improving", "stable", "declining"][Math.floor(Math.random() * 3)], incidents: Math.floor(Math.random() * 3) },
      compliance: { score: Math.round(baseScore + (Math.random() - 0.5) * 8), trend: "stable", incidents: 0 },
    };

    const overallScore = Math.round(
      Object.entries(risks).reduce((acc, [key, value]) => {
        const category = riskCategories.find(c => c.id === key);
        return acc + value.score * (category?.weight || 0.1);
      }, 0)
    );

    return {
      id: dept.id,
      name: dept.name,
      abbreviation: dept.abbreviation,
      aiSystems: deptModels || Math.floor(Math.random() * 4) + 1,
      risks,
      overallScore,
      highRiskSystems: Math.floor(Math.random() * 3),
    };
  });
}

function getRiskColor(score: number): string {
  if (score >= 90) return "bg-emerald-500";
  if (score >= 80) return "bg-emerald-400";
  if (score >= 70) return "bg-amber-400";
  if (score >= 60) return "bg-amber-500";
  return "bg-red-500";
}

function getRiskBgColor(score: number): string {
  if (score >= 90) return "bg-emerald-500/20";
  if (score >= 80) return "bg-emerald-400/20";
  if (score >= 70) return "bg-amber-400/20";
  if (score >= 60) return "bg-amber-500/20";
  return "bg-red-500/20";
}

function TrendIcon({ trend }: { trend: string }) {
  switch (trend) {
    case "improving":
      return <TrendingUp className="h-3 w-3 text-emerald-500" />;
    case "declining":
      return <TrendingDown className="h-3 w-3 text-red-500" />;
    default:
      return <Minus className="h-3 w-3 text-muted-foreground" />;
  }
}

function HeatmapCell({
  score,
  trend,
  incidents,
  department,
  category,
}: {
  score: number;
  trend: string;
  incidents: number;
  department: string;
  category: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className={`relative flex h-14 w-full min-w-[70px] cursor-pointer items-center justify-center rounded-lg ${getRiskBgColor(score)} transition-all hover:ring-2 hover:ring-primary/50`}
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-base font-semibold text-foreground">{score}</span>
            {incidents > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {incidents}
              </span>
            )}
            <span className="absolute bottom-1 right-1">
              <TrendIcon trend={trend} />
            </span>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm">
            <p className="font-medium">{department}</p>
            <p className="text-muted-foreground">{category}: {score}%</p>
            {incidents > 0 && (
              <p className="text-red-400">{incidents} incident{incidents > 1 ? "s" : ""}</p>
            )}
            <p className="capitalize text-muted-foreground">Trend: {trend}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function RiskHeatmap() {
  const [timeRange, setTimeRange] = useState("30d");
  const [refreshKey, setRefreshKey] = useState(0);
  const { data: models, isLoading: modelsLoading } = useModels();
  const { data: incidents, isLoading: incidentsLoading } = useIncidents();

  const [departmentRisks, setDepartmentRisks] = useState<ReturnType<typeof generateDepartmentRisks>>([]);

  useEffect(() => {
    setDepartmentRisks(generateDepartmentRisks(models || [], incidents || []));
  }, [models, incidents, refreshKey]);

  const isLoading = modelsLoading || incidentsLoading;

  // Calculate totals
  const totalSystems = departmentRisks.reduce((acc, d) => acc + d.aiSystems, 0);
  const totalHighRisk = departmentRisks.reduce((acc, d) => acc + d.highRiskSystems, 0);
  const avgScore = departmentRisks.length > 0
    ? Math.round(departmentRisks.reduce((acc, d) => acc + d.overallScore, 0) / departmentRisks.length)
    : 0;
  const totalIncidents = departmentRisks.reduce(
    (acc, d) => acc + Object.values(d.risks).reduce((a, r) => a + r.incidents, 0),
    0
  );

  // Sort departments by overall score for ranking
  const sortedDepts = [...departmentRisks].sort((a, b) => a.overallScore - b.overallScore);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">AI Risk Heatmap</h1>
          <p className="text-sm text-muted-foreground">
            Visual dashboard showing AI risk across government departments
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={() => setRefreshKey(k => k + 1)}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border/50 bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{departmentRisks.length}</p>
              <p className="text-sm text-muted-foreground">Departments</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{totalSystems}</p>
              <p className="text-sm text-muted-foreground">AI Systems</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-4">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${getRiskBgColor(avgScore)}`}>
              <span className="text-lg font-bold text-foreground">{avgScore}</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Risk Score</p>
              <p className="text-xs text-emerald-500">+2.3% from last month</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-red-500">{totalIncidents}</p>
              <p className="text-sm text-muted-foreground">Active Incidents</p>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border/50 bg-card p-4">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Risk Score:</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded bg-emerald-500" />
            <span className="text-xs text-muted-foreground">90-100</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded bg-emerald-400" />
            <span className="text-xs text-muted-foreground">80-89</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded bg-amber-400" />
            <span className="text-xs text-muted-foreground">70-79</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded bg-amber-500" />
            <span className="text-xs text-muted-foreground">60-69</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded bg-red-500" />
            <span className="text-xs text-muted-foreground">&lt;60</span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-emerald-500" />
            <span className="text-xs text-muted-foreground">Improving</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingDown className="h-3 w-3 text-red-500" />
            <span className="text-xs text-muted-foreground">Declining</span>
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground w-[200px]">
                  Department
                </th>
                {riskCategories.map((cat) => (
                  <th key={cat.id} className="px-2 py-3 text-center text-xs font-medium text-muted-foreground">
                    <div>{cat.name}</div>
                    <div className="font-normal opacity-70">({(cat.weight * 100).toFixed(0)}%)</div>
                  </th>
                ))}
                <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground w-[100px]">
                  Overall
                </th>
              </tr>
            </thead>
            <tbody>
              {departmentRisks.map((dept) => (
                <tr key={dept.id} className="border-b border-border/30 hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono text-xs">
                        {dept.abbreviation}
                      </Badge>
                      <div>
                        <p className="font-medium text-foreground text-sm">{dept.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {dept.aiSystems} AI • {dept.highRiskSystems} high-risk
                        </p>
                      </div>
                    </div>
                  </td>
                  {riskCategories.map((cat) => (
                    <td key={cat.id} className="px-2 py-2">
                      <HeatmapCell
                        score={dept.risks[cat.id as keyof typeof dept.risks].score}
                        trend={dept.risks[cat.id as keyof typeof dept.risks].trend}
                        incidents={dept.risks[cat.id as keyof typeof dept.risks].incidents}
                        department={dept.name}
                        category={cat.name}
                      />
                    </td>
                  ))}
                  <td className="px-2 py-2">
                    <div
                      className={`flex h-14 items-center justify-center rounded-lg ${getRiskBgColor(dept.overallScore)} font-bold`}
                    >
                      <span className="text-lg text-foreground">{dept.overallScore}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6">
          <h3 className="mb-4 flex items-center gap-2 font-medium text-foreground">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Departments Needing Attention
          </h3>
          <div className="space-y-3">
            {sortedDepts.slice(0, 3).map((dept) => (
              <div
                key={dept.id}
                className="flex items-center justify-between rounded-lg bg-background/50 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-foreground">{dept.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {dept.highRiskSystems} high-risk systems
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-foreground">{dept.overallScore}</p>
                  <p className="text-xs text-muted-foreground">Risk Score</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
          <h3 className="mb-4 flex items-center gap-2 font-medium text-foreground">
            <Shield className="h-5 w-5 text-emerald-500" />
            Top Performing Departments
          </h3>
          <div className="space-y-3">
            {sortedDepts.slice(-3).reverse().map((dept) => (
              <div
                key={dept.id}
                className="flex items-center justify-between rounded-lg bg-background/50 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-foreground">{dept.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {dept.aiSystems} AI systems
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-emerald-500">{dept.overallScore}</p>
                  <p className="text-xs text-muted-foreground">Risk Score</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
