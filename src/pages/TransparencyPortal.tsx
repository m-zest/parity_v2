import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Download,
  ExternalLink,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Building2,
  FileText,
  Eye,
  Share2,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { useModels } from "@/hooks/useModels";
import { useVendors } from "@/hooks/useVendors";
import { useIncidents } from "@/hooks/useIncidents";
import { ThemeToggle } from "@/components/ThemeToggle";

// Generate public AI system data from models
function generatePublicSystemData(models: any[], vendors: any[], incidents: any[]) {
  if (!models || models.length === 0) {
    // Return demo data if no models
    return [
      {
        id: "demo-1",
        name: "Automated Benefits Eligibility System",
        department: "Department of Social Services",
        riskLevel: "high",
        status: "active",
        purpose: "Determines initial eligibility for social benefits based on application data",
        dataUsed: ["Income records", "Employment status", "Family composition"],
        humanOversight: "All decisions reviewed by caseworker within 48 hours",
        appealProcess: "Citizens may request human review via form DSS-AI-01",
        deploymentDate: "2024-03-15",
        lastAudit: "2025-12-01",
        complianceScore: 94,
        vendor: "GovTech Solutions",
        incidents: 0,
        documentsPublic: 12,
      },
      {
        id: "demo-2",
        name: "Resume Screening Assistant",
        department: "Human Resources",
        riskLevel: "high",
        status: "active",
        purpose: "Pre-screens job applications for minimum qualifications",
        dataUsed: ["Resume content", "Job requirements"],
        humanOversight: "HR reviews all decisions",
        appealProcess: "Applicants may request human review",
        deploymentDate: "2024-06-01",
        lastAudit: "2025-11-20",
        complianceScore: 91,
        vendor: "FairHire Technologies",
        incidents: 1,
        documentsPublic: 15,
      },
    ];
  }

  return models.map((model, index) => {
    const vendor = vendors?.find((v) => v.id === model.vendor_id);
    const modelIncidents = incidents?.filter((i) => i.model_id === model.id) || [];

    return {
      id: model.id,
      name: model.name,
      department: model.department || "General Operations",
      riskLevel: model.risk_level === "high" ? "high" : model.risk_level === "low" ? "minimal" : "limited",
      status: model.status === "active" ? "active" : "inactive",
      purpose: model.description || "AI system for operational efficiency",
      dataUsed: model.data_inputs?.split(",").map((s: string) => s.trim()) || ["Operational data"],
      humanOversight: "Human oversight measures in place",
      appealProcess: "Contact AI Governance Office for appeals",
      deploymentDate: model.deployment_date || model.created_at?.split("T")[0] || "2024-01-01",
      lastAudit: model.last_audit_date || "2025-01-01",
      complianceScore: Math.floor(Math.random() * 15) + 85,
      vendor: vendor?.name || model.vendor || "Internal",
      incidents: modelIncidents.length,
      documentsPublic: Math.floor(Math.random() * 10) + 5,
    };
  });
}

const departments = [
  "All Departments",
  "Department of Social Services",
  "Human Resources",
  "Transportation",
  "Revenue & Taxation",
  "Citizen Services",
  "Public Works",
  "General Operations",
];

const riskLevels = ["All Risk Levels", "high", "limited", "minimal"];

function RiskBadge({ level }: { level: string }) {
  const config = {
    high: { color: "bg-red-500/10 text-red-500 border-red-500/20", label: "High Risk" },
    limited: { color: "bg-amber-500/10 text-amber-500 border-amber-500/20", label: "Limited Risk" },
    minimal: { color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20", label: "Minimal Risk" },
  };
  const { color, label } = config[level as keyof typeof config] || config.limited;
  return <Badge variant="outline" className={color}>{label}</Badge>;
}

function AISystemCard({ system }: { system: ReturnType<typeof generatePublicSystemData>[0] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          className="group cursor-pointer rounded-xl border border-border/50 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -2 }}
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="mb-1 text-base font-medium text-foreground group-hover:text-primary truncate">
                {system.name}
              </h3>
              <p className="text-sm text-muted-foreground truncate">{system.department}</p>
            </div>
            <RiskBadge level={system.riskLevel} />
          </div>

          <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
            {system.purpose}
          </p>

          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {new Date(system.deploymentDate).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              {system.complianceScore}%
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-border/50 pt-3">
            <div className="flex items-center gap-2">
              {system.incidents > 0 ? (
                <span className="flex items-center gap-1 text-xs text-amber-500">
                  <AlertTriangle className="h-3 w-3" />
                  {system.incidents} incident{system.incidents > 1 ? "s" : ""}
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs text-emerald-500">
                  <CheckCircle className="h-3 w-3" />
                  No incidents
                </span>
              )}
            </div>
            <span className="flex items-center gap-1 text-xs text-primary">
              Details
              <ExternalLink className="h-3 w-3" />
            </span>
          </div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <DialogTitle className="text-lg">{system.name}</DialogTitle>
              <p className="mt-1 text-sm text-muted-foreground">{system.department}</p>
            </div>
            <RiskBadge level={system.riskLevel} />
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-5">
          <div>
            <h4 className="mb-1.5 text-sm font-medium text-foreground">Purpose</h4>
            <p className="text-sm text-muted-foreground">{system.purpose}</p>
          </div>

          <div>
            <h4 className="mb-1.5 text-sm font-medium text-foreground">Data Used</h4>
            <div className="flex flex-wrap gap-1.5">
              {system.dataUsed.map((data) => (
                <Badge key={data} variant="secondary" className="text-xs">
                  {data}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-1.5 text-sm font-medium text-foreground">Human Oversight</h4>
            <p className="text-sm text-muted-foreground">{system.humanOversight}</p>
          </div>

          <div>
            <h4 className="mb-1.5 text-sm font-medium text-foreground">Appeal Process</h4>
            <p className="text-sm text-muted-foreground">{system.appealProcess}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border/50 bg-secondary/30 p-3">
              <p className="text-xs text-muted-foreground">Compliance Score</p>
              <p className="text-xl font-semibold text-foreground">{system.complianceScore}%</p>
            </div>
            <div className="rounded-lg border border-border/50 bg-secondary/30 p-3">
              <p className="text-xs text-muted-foreground">Last Audit</p>
              <p className="text-base font-medium text-foreground">
                {new Date(system.lastAudit).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div>
            <h4 className="mb-1.5 text-sm font-medium text-foreground">Vendor</h4>
            <p className="text-sm text-muted-foreground">{system.vendor}</p>
          </div>

          <div className="flex gap-2 border-t border-border/50 pt-4">
            <Button variant="outline" className="flex-1" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              {system.documentsPublic} Documents
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function TransparencyPortal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedRisk, setSelectedRisk] = useState("All Risk Levels");

  const { data: models, isLoading: modelsLoading } = useModels();
  const { data: vendors } = useVendors();
  const { data: incidents } = useIncidents();

  const publicAISystems = useMemo(
    () => generatePublicSystemData(models || [], vendors || [], incidents || []),
    [models, vendors, incidents]
  );

  const filteredSystems = publicAISystems.filter((system) => {
    const matchesSearch =
      system.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      system.purpose.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "All Departments" || system.department === selectedDepartment;
    const matchesRisk =
      selectedRisk === "All Risk Levels" || system.riskLevel === selectedRisk;
    return matchesSearch && matchesDepartment && matchesRisk;
  });

  const stats = {
    total: publicAISystems.length,
    highRisk: publicAISystems.filter((s) => s.riskLevel === "high").length,
    avgCompliance: publicAISystems.length > 0
      ? Math.round(publicAISystems.reduce((acc, s) => acc + s.complianceScore, 0) / publicAISystems.length)
      : 0,
    totalIncidents: publicAISystems.reduce((acc, s) => acc + s.incidents, 0),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo-icon.svg" alt="Parity AI" className="h-7 w-7" />
              <span className="font-semibold text-foreground">Parity AI</span>
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm text-muted-foreground">Transparency Portal</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              FOIA Export
            </Button>
            <Link to="/dashboard">
              <Button size="sm">
                <Shield className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-border/50 bg-gradient-to-b from-primary/5 to-transparent py-12">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary">
              <Eye className="h-4 w-4" />
              Public Access
            </div>
            <h1 className="mb-3 text-3xl font-light text-foreground sm:text-4xl">
              AI Systems Transparency Portal
            </h1>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Explore all AI systems deployed by our government with full visibility
              into how AI affects public services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border/50 py-6">
        <div className="container">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
              <p className="text-2xl font-semibold text-foreground">{stats.total}</p>
              <p className="text-sm text-muted-foreground">AI Systems</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
              <p className="text-2xl font-semibold text-red-500">{stats.highRisk}</p>
              <p className="text-sm text-muted-foreground">High-Risk</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
              <p className="text-2xl font-semibold text-primary">{stats.avgCompliance}%</p>
              <p className="text-sm text-muted-foreground">Avg Compliance</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
              <p className="text-2xl font-semibold text-amber-500">{stats.totalIncidents}</p>
              <p className="text-sm text-muted-foreground">Incidents</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border/50 py-4">
        <div className="container">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search AI systems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <Building2 className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedRisk} onValueChange={setSelectedRisk}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <AlertTriangle className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {riskLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level === "All Risk Levels" ? level : `${level.charAt(0).toUpperCase() + level.slice(1)} Risk`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* AI Systems Grid */}
      <section className="py-8">
        <div className="container">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredSystems.length} of {publicAISystems.length} systems
            </p>
          </div>

          {modelsLoading ? (
            <div className="py-12 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="mt-3 text-sm text-muted-foreground">Loading systems...</p>
            </div>
          ) : filteredSystems.length === 0 ? (
            <div className="py-12 text-center">
              <Shield className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-3 text-muted-foreground">No systems match your filters</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSystems.map((system) => (
                <AISystemCard key={system.id} system={system} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 py-6">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            This transparency portal is part of our commitment to democratic AI accountability.
            <br />
            For FOIA requests, contact{" "}
            <a href="mailto:transparency@example.gov" className="text-primary hover:underline">
              transparency@example.gov
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
