import { useState } from "react";
import {
  Download,
  Copy,
  Check,
  Shield,
  AlertTriangle,
  Users,
  Database,
  Scale,
  FileText,
  Eye,
  Code,
  Image,
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
import { useModels } from "@/hooks/useModels";

// Sample system for preview
const defaultSystem = {
  name: "AI System Name",
  version: "1.0.0",
  department: "Department Name",
  riskLevel: "limited",
  purpose: "Describe the purpose of this AI system",
  intendedUse: "Describe the intended use cases",
  outOfScope: "List uses that are out of scope",
  dataInputs: ["Input 1", "Input 2"],
  dataOutput: "Describe the outputs",
  modelType: "Model architecture type",
  trainingData: "Description of training data",
  humanOversight: "Describe human oversight measures",
  appealProcess: "Describe the appeal process",
  biasEvaluations: [
    { category: "Gender", result: "Pass", date: "2025-01-01" },
    { category: "Age", result: "Pass", date: "2025-01-01" },
  ],
  limitations: ["Limitation 1", "Limitation 2"],
  ethicalConsiderations: ["Consideration 1", "Consideration 2"],
  complianceFrameworks: ["EU AI Act", "NIST AI RMF"],
  lastUpdated: new Date().toISOString().split("T")[0],
  contactEmail: "ai-governance@example.gov",
};

function SystemCardPreview({ data }: { data: typeof defaultSystem }) {
  const riskColors = {
    high: "border-red-500 bg-red-500/10 text-red-500",
    limited: "border-amber-500 bg-amber-500/10 text-amber-500",
    minimal: "border-emerald-500 bg-emerald-500/10 text-emerald-500",
  };

  return (
    <div className="rounded-2xl border-2 border-border bg-card p-6">
      {/* Header */}
      <div className="mb-6 border-b border-border pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <img src="/logo-icon.svg" alt="Parity AI" className="h-5 w-5" />
              <span className="text-xs font-medium text-muted-foreground">AI SYSTEM CARD</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground">{data.name || "System Name"}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {data.department || "Department"} • Version {data.version || "1.0"}
            </p>
          </div>
          <Badge
            variant="outline"
            className={`${riskColors[data.riskLevel as keyof typeof riskColors] || riskColors.limited} px-3 py-1 text-xs font-medium capitalize`}
          >
            {data.riskLevel || "limited"} Risk
          </Badge>
        </div>
      </div>

      {/* Purpose */}
      <div className="mb-4">
        <h3 className="mb-1 flex items-center gap-2 text-xs font-semibold text-foreground">
          <Eye className="h-3.5 w-3.5 text-primary" />
          Purpose
        </h3>
        <p className="text-sm text-muted-foreground">{data.purpose || "No purpose defined"}</p>
      </div>

      {/* Data Inputs */}
      <div className="mb-4">
        <h3 className="mb-1 flex items-center gap-2 text-xs font-semibold text-foreground">
          <Database className="h-3.5 w-3.5 text-primary" />
          Data Inputs
        </h3>
        <div className="flex flex-wrap gap-1">
          {(data.dataInputs || []).map((input) => (
            <Badge key={input} variant="secondary" className="text-xs">
              {input}
            </Badge>
          ))}
        </div>
      </div>

      {/* Human Oversight */}
      <div className="mb-4 rounded-lg border border-primary/30 bg-primary/5 p-3">
        <h3 className="mb-1 flex items-center gap-2 text-xs font-semibold text-foreground">
          <Users className="h-3.5 w-3.5 text-primary" />
          Human Oversight
        </h3>
        <p className="text-sm text-muted-foreground">{data.humanOversight || "Not specified"}</p>
      </div>

      {/* Appeal Process */}
      <div className="mb-4">
        <h3 className="mb-1 flex items-center gap-2 text-xs font-semibold text-foreground">
          <Scale className="h-3.5 w-3.5 text-primary" />
          Appeal Process
        </h3>
        <p className="text-sm text-muted-foreground">{data.appealProcess || "Not specified"}</p>
      </div>

      {/* Bias Evaluations */}
      {data.biasEvaluations && data.biasEvaluations.length > 0 && (
        <div className="mb-4">
          <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold text-foreground">
            <Shield className="h-3.5 w-3.5 text-primary" />
            Bias Testing
          </h3>
          <div className="grid grid-cols-2 gap-1.5">
            {data.biasEvaluations.map((eval_) => (
              <div
                key={eval_.category}
                className="flex items-center justify-between rounded bg-secondary/50 px-2 py-1"
              >
                <span className="text-xs text-muted-foreground">{eval_.category}</span>
                <Badge
                  variant="outline"
                  className={`text-[10px] ${
                    eval_.result === "Pass"
                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                  }`}
                >
                  {eval_.result}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Limitations */}
      {data.limitations && data.limitations.length > 0 && (
        <div className="mb-4">
          <h3 className="mb-1 flex items-center gap-2 text-xs font-semibold text-foreground">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
            Limitations
          </h3>
          <ul className="space-y-0.5 text-sm text-muted-foreground">
            {data.limitations.slice(0, 3).map((limitation, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                {limitation}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Compliance */}
      <div className="mb-4">
        <h3 className="mb-1 flex items-center gap-2 text-xs font-semibold text-foreground">
          <FileText className="h-3.5 w-3.5 text-primary" />
          Compliance
        </h3>
        <div className="flex flex-wrap gap-1">
          {(data.complianceFrameworks || []).map((framework) => (
            <Badge key={framework} variant="outline" className="text-[10px]">
              {framework}
            </Badge>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[10px] text-muted-foreground">
        <span>Updated: {data.lastUpdated || "N/A"}</span>
        <span>{data.contactEmail || ""}</span>
      </div>
    </div>
  );
}

export default function SystemCardGenerator() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState(defaultSystem);
  const [selectedModelId, setSelectedModelId] = useState<string>("");
  const { data: models } = useModels();

  const handleCopyEmbed = () => {
    const embedCode = `<iframe src="${window.location.origin}/embed/system-card/${formData.name.toLowerCase().replace(/\s+/g, '-')}" width="100%" height="600" frameborder="0"></iframe>`;
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadModel = (modelId: string) => {
    const model = models?.find(m => m.id === modelId);
    if (model) {
      setFormData({
        ...formData,
        name: model.name,
        version: model.version || "1.0.0",
        department: model.department || "Not specified",
        riskLevel: model.risk_level === "high" ? "high" : model.risk_level === "low" ? "minimal" : "limited",
        purpose: model.description || "",
        modelType: model.type || "",
      });
      setSelectedModelId(modelId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">AI System Card Generator</h1>
          <p className="text-sm text-muted-foreground">
            Create shareable, embeddable cards for your AI deployments
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => console.log("Exporting PDF")}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button onClick={handleCopyEmbed}>
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Code className="mr-2 h-4 w-4" />
                Copy Embed
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Load from existing model */}
      {models && models.length > 0 && (
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
          <Label className="text-sm font-medium">Quick Start: Load from existing model</Label>
          <Select value={selectedModelId} onValueChange={handleLoadModel}>
            <SelectTrigger className="mt-2 w-full max-w-md">
              <SelectValue placeholder="Select a model to pre-fill data..." />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form */}
        <div className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="basic" className="flex-1">Basic</TabsTrigger>
              <TabsTrigger value="data" className="flex-1">Data</TabsTrigger>
              <TabsTrigger value="oversight" className="flex-1">Oversight</TabsTrigger>
              <TabsTrigger value="evaluation" className="flex-1">Evaluation</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>System Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Version</Label>
                  <Input
                    value={formData.version}
                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Department</Label>
                  <Input
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Risk Level</Label>
                  <Select
                    value={formData.riskLevel}
                    onValueChange={(value) => setFormData({ ...formData, riskLevel: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High Risk</SelectItem>
                      <SelectItem value="limited">Limited Risk</SelectItem>
                      <SelectItem value="minimal">Minimal Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Purpose</Label>
                <Textarea
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <Label>Intended Use</Label>
                <Textarea
                  value={formData.intendedUse}
                  onChange={(e) => setFormData({ ...formData, intendedUse: e.target.value })}
                  rows={2}
                />
              </div>
            </TabsContent>

            <TabsContent value="data" className="space-y-4 pt-4">
              <div>
                <Label>Data Inputs (comma separated)</Label>
                <Textarea
                  value={formData.dataInputs.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dataInputs: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  rows={2}
                />
              </div>
              <div>
                <Label>Output Description</Label>
                <Textarea
                  value={formData.dataOutput}
                  onChange={(e) => setFormData({ ...formData, dataOutput: e.target.value })}
                  rows={2}
                />
              </div>
              <div>
                <Label>Model Type</Label>
                <Input
                  value={formData.modelType}
                  onChange={(e) => setFormData({ ...formData, modelType: e.target.value })}
                />
              </div>
              <div>
                <Label>Training Data Description</Label>
                <Textarea
                  value={formData.trainingData}
                  onChange={(e) => setFormData({ ...formData, trainingData: e.target.value })}
                  rows={2}
                />
              </div>
            </TabsContent>

            <TabsContent value="oversight" className="space-y-4 pt-4">
              <div>
                <Label>Human Oversight Process</Label>
                <Textarea
                  value={formData.humanOversight}
                  onChange={(e) => setFormData({ ...formData, humanOversight: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <Label>Appeal Process</Label>
                <Textarea
                  value={formData.appealProcess}
                  onChange={(e) => setFormData({ ...formData, appealProcess: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <Label>Contact Email</Label>
                <Input
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                />
              </div>
            </TabsContent>

            <TabsContent value="evaluation" className="space-y-4 pt-4">
              <div>
                <Label>Known Limitations (one per line)</Label>
                <Textarea
                  value={formData.limitations.join("\n")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      limitations: e.target.value.split("\n").filter(Boolean),
                    })
                  }
                  rows={3}
                />
              </div>
              <div>
                <Label>Ethical Considerations (one per line)</Label>
                <Textarea
                  value={formData.ethicalConsiderations.join("\n")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ethicalConsiderations: e.target.value.split("\n").filter(Boolean),
                    })
                  }
                  rows={3}
                />
              </div>
              <div>
                <Label>Compliance Frameworks (comma separated)</Label>
                <Input
                  value={formData.complianceFrameworks.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      complianceFrameworks: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
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
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Image className="mr-1.5 h-3 w-3" />
                  PNG
                </Button>
                <Button variant="outline" size="sm">
                  <Code className="mr-1.5 h-3 w-3" />
                  JSON
                </Button>
              </div>
            </div>
            <div className="rounded-xl border border-border/50 bg-secondary/20 p-4">
              <SystemCardPreview data={formData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
