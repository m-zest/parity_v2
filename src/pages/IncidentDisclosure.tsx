import { useState, useEffect } from "react";
import {
  AlertTriangle,
  Download,
  Copy,
  Check,
  FileText,
  Users,
  Clock,
  Shield,
  ChevronRight,
  Eye,
  Printer,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIncidents } from "@/hooks/useIncidents";

const defaultIncident = {
  id: "INC-2025-0001",
  title: "AI System Incident",
  system: "AI System Name",
  department: "Department Name",
  severity: "medium",
  dateDiscovered: new Date().toISOString().split("T")[0],
  dateResolved: "",
  affectedCitizens: 0,
  summary: "Brief summary of what happened",
  whatHappened: "Detailed description of what occurred",
  impact: "Description of how citizens were affected",
  rootCause: "Analysis of why this happened",
  remediation: ["Action taken 1", "Action taken 2"],
  preventionMeasures: ["Prevention measure 1", "Prevention measure 2"],
  contactInfo: {
    office: "AI Governance Office",
    email: "ai-incidents@example.gov",
    phone: "(555) 123-4567",
    appealForm: "AI-APPEAL-01",
  },
};

function DisclosurePreview({ data }: { data: typeof defaultIncident }) {
  const isResolved = !!data.dateResolved;

  return (
    <div className="rounded-xl border-2 border-border bg-card p-5 text-foreground">
      {/* Header */}
      <div className="mb-5 border-b border-border pb-4">
        <div className="flex items-center gap-2 text-primary">
          <img src="/logo-icon.svg" alt="Parity AI" className="h-5 w-5" />
          <span className="text-xs font-medium">PUBLIC INCIDENT DISCLOSURE</span>
        </div>
        <h2 className="mt-3 text-lg font-semibold">{data.title || "Incident Title"}</h2>
        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span>ID: {data.id}</span>
          <span>•</span>
          <span>Published: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Quick Facts */}
      <div className="mb-5 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-border/50 bg-secondary/30 p-2.5">
          <p className="text-[10px] text-muted-foreground">AI System</p>
          <p className="text-xs font-medium truncate">{data.system || "N/A"}</p>
        </div>
        <div className="rounded-lg border border-border/50 bg-secondary/30 p-2.5">
          <p className="text-[10px] text-muted-foreground">Department</p>
          <p className="text-xs font-medium truncate">{data.department || "N/A"}</p>
        </div>
        <div className="rounded-lg border border-border/50 bg-secondary/30 p-2.5">
          <p className="text-[10px] text-muted-foreground">Citizens Affected</p>
          <p className="text-xs font-medium">{(data.affectedCitizens || 0).toLocaleString()}</p>
        </div>
        <div className="rounded-lg border border-border/50 bg-secondary/30 p-2.5">
          <p className="text-[10px] text-muted-foreground">Status</p>
          <Badge
            variant="outline"
            className={`mt-0.5 text-[10px] ${
              isResolved
                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                : "bg-amber-500/10 text-amber-500 border-amber-500/20"
            }`}
          >
            {isResolved ? "Resolved" : "In Progress"}
          </Badge>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-4">
        <h3 className="mb-1 flex items-center gap-1.5 text-xs font-semibold">
          <FileText className="h-3.5 w-3.5 text-primary" />
          Summary
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{data.summary || "No summary provided"}</p>
      </div>

      {/* What Happened */}
      <div className="mb-4">
        <h3 className="mb-1 flex items-center gap-1.5 text-xs font-semibold">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
          What Happened
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{data.whatHappened || "Details not provided"}</p>
      </div>

      {/* Impact */}
      <div className="mb-4">
        <h3 className="mb-1 flex items-center gap-1.5 text-xs font-semibold">
          <Users className="h-3.5 w-3.5 text-primary" />
          Impact on Citizens
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{data.impact || "Impact not described"}</p>
      </div>

      {/* Actions Taken */}
      {data.remediation && data.remediation.length > 0 && data.remediation[0] && (
        <div className="mb-4">
          <h3 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold">
            <Check className="h-3.5 w-3.5 text-emerald-500" />
            Actions Taken
          </h3>
          <ul className="space-y-1">
            {data.remediation.filter(Boolean).slice(0, 4).map((item, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Prevention */}
      {data.preventionMeasures && data.preventionMeasures.length > 0 && data.preventionMeasures[0] && (
        <div className="mb-4">
          <h3 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold">
            <Shield className="h-3.5 w-3.5 text-primary" />
            Prevention Measures
          </h3>
          <ul className="space-y-1">
            {data.preventionMeasures.filter(Boolean).slice(0, 4).map((item, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Timeline */}
      <div className="mb-4">
        <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold">
          <Clock className="h-3.5 w-3.5 text-primary" />
          Timeline
        </h3>
        <div className="flex items-center gap-2">
          <div className="rounded border border-border/50 bg-secondary/30 px-2.5 py-1.5">
            <p className="text-[10px] text-muted-foreground">Discovered</p>
            <p className="text-xs font-medium">
              {data.dateDiscovered ? new Date(data.dateDiscovered).toLocaleDateString() : "N/A"}
            </p>
          </div>
          <div className="h-px flex-1 bg-border" />
          <div
            className={`rounded border px-2.5 py-1.5 ${
              isResolved
                ? "border-emerald-500/30 bg-emerald-500/10"
                : "border-amber-500/30 bg-amber-500/10"
            }`}
          >
            <p className="text-[10px] text-muted-foreground">{isResolved ? "Resolved" : "Target"}</p>
            <p className="text-xs font-medium">
              {data.dateResolved ? new Date(data.dateResolved).toLocaleDateString() : "Pending"}
            </p>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="mt-5 rounded-lg border border-primary/30 bg-primary/5 p-3">
        <h3 className="mb-2 text-xs font-semibold">Questions or Concerns?</h3>
        <div className="grid grid-cols-2 gap-1.5 text-[10px] text-muted-foreground">
          <p><span className="font-medium">Office:</span> {data.contactInfo.office}</p>
          <p><span className="font-medium">Email:</span> {data.contactInfo.email}</p>
          <p><span className="font-medium">Phone:</span> {data.contactInfo.phone}</p>
          <p><span className="font-medium">Appeal:</span> {data.contactInfo.appealForm}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 text-center text-[10px] text-muted-foreground">
        <p>This disclosure is part of our commitment to AI transparency.</p>
      </div>
    </div>
  );
}

export default function IncidentDisclosure() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState(defaultIncident);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>("");
  const { data: incidents } = useIncidents();

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadIncident = (incidentId: string) => {
    const incident = incidents?.find((i) => i.id === incidentId);
    if (incident) {
      setFormData({
        ...formData,
        id: `INC-${new Date().getFullYear()}-${String(incidents?.indexOf(incident) || 0 + 1).padStart(4, "0")}`,
        title: incident.title,
        system: incident.model_name || "Unknown System",
        severity: incident.severity,
        dateDiscovered: incident.reported_date?.split("T")[0] || "",
        dateResolved: incident.resolved_date?.split("T")[0] || "",
        summary: incident.description || "",
        whatHappened: incident.description || "",
        impact: `This incident affected operations related to ${incident.model_name || "the AI system"}.`,
      });
      setSelectedIncidentId(incidentId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Incident Public Disclosure</h1>
          <p className="text-sm text-muted-foreground">
            Generate citizen-facing incident disclosure templates
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Load from existing incident */}
      {incidents && incidents.length > 0 && (
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
          <Label className="text-sm font-medium">Quick Start: Load from existing incident</Label>
          <Select value={selectedIncidentId} onValueChange={handleLoadIncident}>
            <SelectTrigger className="mt-2 w-full max-w-md">
              <SelectValue placeholder="Select an incident to pre-fill data..." />
            </SelectTrigger>
            <SelectContent>
              {incidents.map((incident) => (
                <SelectItem key={incident.id} value={incident.id}>
                  <div className="flex items-center gap-2">
                    <span>{incident.title}</span>
                    <Badge
                      variant="outline"
                      className={
                        incident.severity === "critical"
                          ? "bg-red-500/10 text-red-500"
                          : incident.severity === "high"
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-blue-500/10 text-blue-500"
                      }
                    >
                      {incident.severity}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form */}
        <div className="space-y-6">
          <Tabs defaultValue="incident" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="incident" className="flex-1">Incident</TabsTrigger>
              <TabsTrigger value="impact" className="flex-1">Impact</TabsTrigger>
              <TabsTrigger value="contact" className="flex-1">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="incident" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Incident ID</Label>
                  <Input
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Severity</Label>
                  <Select
                    value={formData.severity}
                    onValueChange={(value) => setFormData({ ...formData, severity: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Incident Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>AI System</Label>
                  <Input
                    value={formData.system}
                    onChange={(e) => setFormData({ ...formData, system: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Department</Label>
                  <Input
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Summary</Label>
                <Textarea
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  rows={2}
                />
              </div>
              <div>
                <Label>What Happened</Label>
                <Textarea
                  value={formData.whatHappened}
                  onChange={(e) => setFormData({ ...formData, whatHappened: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <Label>Root Cause</Label>
                <Textarea
                  value={formData.rootCause}
                  onChange={(e) => setFormData({ ...formData, rootCause: e.target.value })}
                  rows={2}
                />
              </div>
            </TabsContent>

            <TabsContent value="impact" className="space-y-4 pt-4">
              <div>
                <Label>Citizens Affected</Label>
                <Input
                  type="number"
                  value={formData.affectedCitizens}
                  onChange={(e) =>
                    setFormData({ ...formData, affectedCitizens: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
              <div>
                <Label>Impact Description</Label>
                <Textarea
                  value={formData.impact}
                  onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date Discovered</Label>
                  <Input
                    type="date"
                    value={formData.dateDiscovered}
                    onChange={(e) => setFormData({ ...formData, dateDiscovered: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Date Resolved</Label>
                  <Input
                    type="date"
                    value={formData.dateResolved}
                    onChange={(e) => setFormData({ ...formData, dateResolved: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Actions Taken (one per line)</Label>
                <Textarea
                  value={formData.remediation.join("\n")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      remediation: e.target.value.split("\n"),
                    })
                  }
                  rows={3}
                />
              </div>
              <div>
                <Label>Prevention Measures (one per line)</Label>
                <Textarea
                  value={formData.preventionMeasures.join("\n")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preventionMeasures: e.target.value.split("\n"),
                    })
                  }
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4 pt-4">
              <div>
                <Label>Office Name</Label>
                <Input
                  value={formData.contactInfo.office}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactInfo: { ...formData.contactInfo, office: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  value={formData.contactInfo.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactInfo: { ...formData.contactInfo, email: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={formData.contactInfo.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactInfo: { ...formData.contactInfo, phone: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <Label>Appeal Form ID</Label>
                <Input
                  value={formData.contactInfo.appealForm}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactInfo: { ...formData.contactInfo, appealForm: e.target.value },
                    })
                  }
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview */}
        <div>
          <div className="sticky top-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Eye className="h-4 w-4" />
                Live Preview
              </h3>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="mr-1.5 h-3 w-3" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-1.5 h-3 w-3" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <div className="rounded-xl border border-border/50 bg-secondary/20 p-3">
              <DisclosurePreview data={formData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
