import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface Model {
  id: string;
  name: string;
  status: string;
  risk_level: string | null;
  created_at: string;
}

interface Incident {
  id: string;
  title: string;
  status: string;
  severity: string;
  created_at: string;
}

interface QuickViewPanelsProps {
  recentModels: Model[] | undefined;
  recentIncidents: Incident[] | undefined;
  isLoading: boolean;
}

const statusColors: Record<string, string> = {
  approved: "bg-green-500/10 text-green-600 dark:text-green-500",
  pending: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500",
  restricted: "bg-orange-500/10 text-orange-600 dark:text-orange-500",
  blocked: "bg-destructive/10 text-destructive",
};

const severityColors: Record<string, string> = {
  critical: "bg-destructive/10 text-destructive",
  high: "bg-orange-500/10 text-orange-600 dark:text-orange-500",
  medium: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500",
  low: "bg-blue-500/10 text-blue-600 dark:text-blue-500",
};

const incidentStatusColors: Record<string, string> = {
  open: "bg-destructive/10 text-destructive",
  investigating: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500",
  mitigated: "bg-blue-500/10 text-blue-600 dark:text-blue-500",
  closed: "bg-green-500/10 text-green-600 dark:text-green-500",
};

export function QuickViewPanels({ recentModels, recentIncidents, isLoading }: QuickViewPanelsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[...Array(4)].map((_, j) => (
                  <Skeleton key={j} className="h-12 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Recent Models */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Database className="h-5 w-5 text-primary" />
              Recent Models
            </CardTitle>
            <CardDescription>Latest AI models in your inventory</CardDescription>
          </div>
          <Link to="/models">
            <Button variant="ghost" size="sm">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {recentModels && recentModels.length > 0 ? (
            <div className="space-y-3">
              {recentModels.map((model) => (
                <div
                  key={model.id}
                  className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/20 p-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-foreground">{model.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Added {formatDistanceToNow(new Date(model.created_at), { addSuffix: true })}
                    </p>
                  </div>
                  <Badge className={statusColors[model.status] || "bg-muted"}>
                    {model.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[120px] items-center justify-center text-muted-foreground">
              No models registered yet
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Incidents */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Recent Incidents
            </CardTitle>
            <CardDescription>Latest reported incidents</CardDescription>
          </div>
          <Link to="/incidents">
            <Button variant="ghost" size="sm">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {recentIncidents && recentIncidents.length > 0 ? (
            <div className="space-y-3">
              {recentIncidents.map((incident) => (
                <div
                  key={incident.id}
                  className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/20 p-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-foreground">{incident.title}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant="outline" className={severityColors[incident.severity]}>
                        {incident.severity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(incident.created_at), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                  <Badge className={incidentStatusColors[incident.status] || "bg-muted"}>
                    {incident.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[120px] items-center justify-center text-muted-foreground">
              No incidents reported
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
