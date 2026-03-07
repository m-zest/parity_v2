import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  ChevronDown,
  ChevronRight,
  Shield,
  Download,
  Printer,
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useModels } from "@/hooks/useModels";
import { useCompliance } from "@/hooks/useCompliance";

// Framework requirements templates
const frameworkTemplates = {
  "EU AI Act": [
    { id: "art9-1", name: "Risk Management System", article: "Art. 9(1)" },
    { id: "art9-2", name: "Risk Identification", article: "Art. 9(2)" },
    { id: "art9-3", name: "Risk Mitigation", article: "Art. 9(3)" },
    { id: "art10-1", name: "Data Governance", article: "Art. 10(1)" },
    { id: "art10-2", name: "Data Quality", article: "Art. 10(2)" },
    { id: "art10-3", name: "Bias Examination", article: "Art. 10(3)" },
    { id: "art13-1", name: "Transparency", article: "Art. 13(1)" },
    { id: "art13-2", name: "Instructions for Use", article: "Art. 13(2)" },
    { id: "art14-1", name: "Human Oversight Design", article: "Art. 14(1)" },
    { id: "art14-2", name: "Human Override", article: "Art. 14(2)" },
  ],
  "NIST AI RMF": [
    { id: "gov-1", name: "Governance Structure", category: "GOVERN" },
    { id: "gov-2", name: "Risk Tolerance", category: "GOVERN" },
    { id: "map-1", name: "Context Mapping", category: "MAP" },
    { id: "map-2", name: "Stakeholder Analysis", category: "MAP" },
    { id: "mea-1", name: "Performance Metrics", category: "MEASURE" },
    { id: "mea-2", name: "Bias Testing", category: "MEASURE" },
    { id: "man-1", name: "Risk Treatment", category: "MANAGE" },
    { id: "man-2", name: "Incident Response", category: "MANAGE" },
  ],
  "ISO 42001": [
    { id: "4.1", name: "Context of Organization", clause: "4.1" },
    { id: "4.2", name: "Interested Parties", clause: "4.2" },
    { id: "5.1", name: "Leadership Commitment", clause: "5.1" },
    { id: "6.1", name: "Risk & Opportunity Assessment", clause: "6.1" },
    { id: "7.1", name: "Resources", clause: "7.1" },
    { id: "7.2", name: "Competence", clause: "7.2" },
    { id: "8.1", name: "Operational Planning", clause: "8.1" },
    { id: "9.1", name: "Monitoring & Measurement", clause: "9.1" },
    { id: "10.1", name: "Continual Improvement", clause: "10.1" },
  ],
  "NYC LL144": [
    { id: "ll144-1", name: "Bias Audit Conducted", section: "§20-871(a)" },
    { id: "ll144-2", name: "Audit by Independent Auditor", section: "§20-871(b)" },
    { id: "ll144-3", name: "Summary Published", section: "§20-871(c)" },
    { id: "ll144-4", name: "Candidate Notice", section: "§20-871(d)" },
    { id: "ll144-5", name: "Alternative Process", section: "§20-871(e)" },
  ],
};

// Generate compliance status based on model data
function generateFrameworkData(model: any) {
  const statuses = ["compliant", "partial", "non-compliant"];
  const data: Record<string, { score: number; requirements: any[] }> = {};

  Object.entries(frameworkTemplates).forEach(([framework, requirements]) => {
    const reqs = requirements.map((req) => {
      // Randomize but weight towards compliant
      const rand = Math.random();
      const status = rand > 0.3 ? "compliant" : rand > 0.1 ? "partial" : "non-compliant";
      const details = {
        compliant: "Requirement fully met",
        partial: "Partially implemented, improvements needed",
        "non-compliant": "Not yet implemented",
      }[status];

      return {
        ...req,
        status,
        details,
      };
    });

    const compliantCount = reqs.filter((r) => r.status === "compliant").length;
    const partialCount = reqs.filter((r) => r.status === "partial").length;
    const score = Math.round(
      ((compliantCount + partialCount * 0.5) / reqs.length) * 100
    );

    data[framework] = { score, requirements: reqs };
  });

  return data;
}

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case "compliant":
      return <CheckCircle className="h-4 w-4 text-emerald-500" />;
    case "partial":
      return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    case "non-compliant":
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Clock className="h-4 w-4 text-muted-foreground" />;
  }
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    compliant: { color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20", label: "Compliant" },
    partial: { color: "bg-amber-500/10 text-amber-500 border-amber-500/20", label: "Partial" },
    "non-compliant": { color: "bg-red-500/10 text-red-500 border-red-500/20", label: "Non-Compliant" },
  };
  const { color, label } = config[status as keyof typeof config] || config.partial;
  return <Badge variant="outline" className={color}>{label}</Badge>;
}

function FrameworkSection({
  framework,
  data,
}: {
  framework: string;
  data: { score: number; requirements: any[] };
}) {
  const [isOpen, setIsOpen] = useState(true);

  const compliant = data.requirements.filter((r) => r.status === "compliant").length;
  const partial = data.requirements.filter((r) => r.status === "partial").length;
  const nonCompliant = data.requirements.filter((r) => r.status === "non-compliant").length;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <div className="flex cursor-pointer items-center justify-between rounded-lg border border-border/50 bg-card p-4 transition-colors hover:bg-muted/50">
          <div className="flex items-center gap-3">
            {isOpen ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
            <div>
              <h3 className="font-medium text-foreground">{framework}</h3>
              <p className="text-xs text-muted-foreground">
                {data.requirements.length} requirements • {compliant} compliant, {partial} partial, {nonCompliant} gaps
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xl font-semibold text-foreground">{data.score}%</p>
              <p className="text-xs text-muted-foreground">Score</p>
            </div>
            <div className="h-10 w-10">
              <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="hsl(160 84% 54%)"
                  strokeWidth="3"
                  strokeDasharray={`${data.score * 0.94} 100`}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2 space-y-1.5 pl-7">
          {data.requirements.map((req) => (
            <motion.div
              key={req.id}
              className="flex items-center justify-between rounded-lg border border-border/30 bg-muted/30 px-4 py-2.5"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3">
                <StatusIcon status={req.status} />
                <div>
                  <p className="text-sm font-medium text-foreground">{req.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {req.article || req.category || req.clause || req.section} • {req.details}
                  </p>
                </div>
              </div>
              <StatusBadge status={req.status} />
            </motion.div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default function FrameworkComparison() {
  const { data: models } = useModels();
  const [selectedSystem, setSelectedSystem] = useState<string>("");
  const [frameworkData, setFrameworkData] = useState<ReturnType<typeof generateFrameworkData> | null>(null);

  // Initialize with first model
  useState(() => {
    if (models && models.length > 0 && !selectedSystem) {
      setSelectedSystem(models[0].id);
      setFrameworkData(generateFrameworkData(models[0]));
    }
  });

  const handleModelChange = (modelId: string) => {
    setSelectedSystem(modelId);
    const model = models?.find((m) => m.id === modelId);
    if (model) {
      setFrameworkData(generateFrameworkData(model));
    }
  };

  const selectedModel = models?.find((m) => m.id === selectedSystem);

  // Calculate overall stats
  const frameworks = frameworkData ? Object.keys(frameworkData) : [];
  const avgScore = frameworkData
    ? Math.round(
        Object.values(frameworkData).reduce((acc, f) => acc + f.score, 0) / frameworks.length
      )
    : 0;
  const totalRequirements = frameworkData
    ? Object.values(frameworkData).reduce((acc, f) => acc + f.requirements.length, 0)
    : 0;
  const totalCompliant = frameworkData
    ? Object.values(frameworkData).reduce(
        (acc, f) => acc + f.requirements.filter((r) => r.status === "compliant").length,
        0
      )
    : 0;

  // Get all gaps
  const allGaps = frameworkData
    ? Object.entries(frameworkData).flatMap(([framework, data]) =>
        data.requirements
          .filter((r) => r.status !== "compliant")
          .map((req) => ({ framework, ...req }))
      )
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Comparative Framework View</h1>
          <p className="text-sm text-muted-foreground">
            See how your AI system maps to multiple compliance frameworks
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* System Selector */}
      <div className="rounded-lg border border-border/50 bg-card p-4">
        <label className="mb-2 block text-sm font-medium text-foreground">Select AI System</label>
        <Select value={selectedSystem} onValueChange={handleModelChange}>
          <SelectTrigger className="w-full max-w-md">
            <SelectValue placeholder="Choose a model to analyze..." />
          </SelectTrigger>
          <SelectContent>
            {models?.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                <div className="flex items-center gap-2">
                  <span>{model.name}</span>
                  <Badge
                    variant="outline"
                    className={
                      model.risk_level === "high"
                        ? "bg-red-500/10 text-red-500 border-red-500/20"
                        : model.risk_level === "medium"
                        ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                        : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    }
                  >
                    {model.risk_level || "medium"}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {frameworkData && (
        <>
          {/* Overview Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-border/50 bg-card p-4">
              <p className="text-sm text-muted-foreground">Frameworks</p>
              <p className="text-2xl font-semibold text-foreground">{frameworks.length}</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-4">
              <p className="text-sm text-muted-foreground">Avg Compliance</p>
              <p className="text-2xl font-semibold text-primary">{avgScore}%</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-4">
              <p className="text-sm text-muted-foreground">Requirements</p>
              <p className="text-2xl font-semibold text-foreground">{totalRequirements}</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-4">
              <p className="text-sm text-muted-foreground">Compliant</p>
              <p className="text-2xl font-semibold text-emerald-500">{totalCompliant}</p>
            </div>
          </div>

          {/* Selected Model Info */}
          {selectedModel && (
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <h2 className="font-medium text-foreground">{selectedModel.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    Compliance status across {frameworks.length} regulatory frameworks
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Framework Sections */}
          <div className="space-y-3">
            {Object.entries(frameworkData).map(([framework, data]) => (
              <FrameworkSection key={framework} framework={framework} data={data} />
            ))}
          </div>

          {/* Gap Analysis */}
          {allGaps.length > 0 && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6">
              <h3 className="mb-4 flex items-center gap-2 font-medium text-foreground">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Gap Analysis ({allGaps.length} items need attention)
              </h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {allGaps.map((gap, i) => (
                  <div
                    key={`${gap.framework}-${gap.id}`}
                    className="flex items-center justify-between rounded-lg bg-background/50 px-4 py-2"
                  >
                    <div className="flex items-center gap-3">
                      <StatusIcon status={gap.status} />
                      <div>
                        <p className="text-sm font-medium text-foreground">{gap.name}</p>
                        <p className="text-xs text-muted-foreground">{gap.framework}</p>
                      </div>
                    </div>
                    <StatusBadge status={gap.status} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {!frameworkData && models && models.length === 0 && (
        <div className="rounded-xl border border-border/50 bg-card p-12 text-center">
          <Shield className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 font-medium text-foreground">No Models Found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Add models to your inventory to see framework comparison analysis.
          </p>
        </div>
      )}
    </div>
  );
}
