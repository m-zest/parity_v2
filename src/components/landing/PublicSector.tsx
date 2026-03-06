import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, Scale, Users, FileCheck, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const useCases = [
  {
    icon: Building2,
    title: "National Governments",
    description: "Comply with EU AI Act requirements. Document high-risk systems. Generate transparency reports for citizens.",
    examples: ["AI Act Article 9 compliance", "National AI registry", "Cross-ministry oversight"],
  },
  {
    icon: Scale,
    title: "Municipal Authorities",
    description: "Govern local AI deployments in hiring, benefits, and public services with full audit trails.",
    examples: ["Hiring algorithm audits", "Benefits system monitoring", "Citizen-facing transparency"],
  },
  {
    icon: Users,
    title: "Public Healthcare",
    description: "Ensure diagnostic and treatment AI meets safety, fairness, and documentation requirements.",
    examples: ["Clinical decision support", "Resource allocation AI", "Patient data protection"],
  },
  {
    icon: FileCheck,
    title: "Regulatory Bodies",
    description: "Tools for national competent authorities to audit AI systems across their jurisdiction.",
    examples: ["Conformity assessments", "Incident tracking", "Compliance verification"],
  },
];

export function PublicSector() {
  return (
    <section id="public-sector" className="relative bg-background py-24">
      {/* Top border gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Building2 className="h-4 w-4" />
            For Public Institutions
          </div>
          <h2 className="mb-4 text-4xl font-light text-foreground sm:text-5xl">
            Built for Government
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Purpose-built for the unique requirements of democratic institutions.
            Free pilots for qualifying public sector organizations.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              className="group rounded-2xl border border-border/50 bg-card/50 p-8 transition-all hover:border-primary/30 hover:bg-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-border/50 bg-secondary/50 transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                <useCase.icon className="h-6 w-6 text-foreground transition-colors group-hover:text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-medium text-foreground">
                {useCase.title}
              </h3>
              <p className="mb-6 text-muted-foreground">
                {useCase.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {useCase.examples.map((example) => (
                  <span
                    key={example}
                    className="rounded-full bg-secondary/50 px-3 py-1 text-xs text-muted-foreground"
                  >
                    {example}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="mb-6 text-muted-foreground">
            Public institution? Contact us for a free pilot program.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-primary/50 px-8"
              onClick={() => window.open('mailto:pilots@parityai.io?subject=Public Sector Pilot Inquiry', '_blank')}
            >
              Request Pilot Access
            </Button>
            <Link to="/dashboard">
              <Button size="lg" className="rounded-full bg-primary px-8 text-primary-foreground">
                Try Demo Now
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
