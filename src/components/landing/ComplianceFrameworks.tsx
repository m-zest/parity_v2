import { motion } from "framer-motion";
import { Globe, Shield, FileCheck, Scale } from "lucide-react";

const frameworks = [
  {
    region: "United States",
    flag: "🇺🇸",
    laws: [
      { name: "NYC LL144", description: "Automated Employment Decision Tools" },
      { name: "Colorado AI Act", description: "High-Risk AI Systems" },
      { name: "Illinois AIVOIA", description: "AI Video Interview Act" },
      { name: "NIST AI RMF", description: "AI Risk Management Framework" },
    ],
  },
  {
    region: "European Union",
    flag: "🇪🇺",
    laws: [
      { name: "EU AI Act", description: "Comprehensive AI Regulation" },
      { name: "GDPR", description: "Data Protection Regulation" },
    ],
  },
  {
    region: "India",
    flag: "🇮🇳",
    laws: [
      { name: "DPDPA 2023", description: "Digital Personal Data Protection Act" },
      { name: "IT Act 2000", description: "Information Technology Act" },
      { name: "IT Rules 2021", description: "Intermediary Guidelines" },
      { name: "NITI Aayog AI", description: "Responsible AI Principles" },
    ],
  },
  {
    region: "International",
    flag: "🌐",
    laws: [
      { name: "ISO 42001", description: "AI Management Systems" },
      { name: "ISO 27001", description: "Information Security" },
    ],
  },
];

export function ComplianceFrameworks() {
  return (
    <section className="relative bg-background py-24">
      {/* Top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
            <Globe className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary">Global Coverage</span>
          </div>
          <h2 className="mb-4 text-4xl font-light text-foreground sm:text-5xl">
            Compliance Frameworks
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Stay compliant with AI regulations worldwide. We support frameworks across US, EU, India, and international standards.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {frameworks.map((region, index) => (
            <motion.div
              key={region.region}
              className="glass group rounded-2xl p-6 transition-all duration-300 hover:border-primary/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl">{region.flag}</span>
                <h3 className="text-lg font-medium text-foreground">{region.region}</h3>
              </div>
              <div className="space-y-3">
                {region.laws.map((law) => (
                  <div 
                    key={law.name}
                    className="rounded-lg border border-border/50 bg-secondary/30 p-3 transition-colors group-hover:border-border"
                  >
                    <p className="text-sm font-medium text-foreground">{law.name}</p>
                    <p className="text-xs text-muted-foreground">{law.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {[
            { icon: Shield, text: "Enterprise Security" },
            { icon: FileCheck, text: "Audit Ready" },
            { icon: Scale, text: "Legally Compliant" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-muted-foreground">
              <item.icon className="h-5 w-5 text-primary" />
              <span className="text-sm">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
