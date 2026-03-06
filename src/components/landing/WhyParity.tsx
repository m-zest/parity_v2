import { motion } from "framer-motion";
import { Shield, Zap, TrendingDown, Tv } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "EU AI Act Compliance",
    description: "Purpose-built for Articles 9 & 13 — risk management and transparency requirements for public sector AI.",
  },
  {
    icon: Zap,
    title: "Instant Transparency",
    description: "Generate public-facing compliance reports that citizens and oversight bodies can actually read.",
  },
  {
    icon: TrendingDown,
    title: "Algorithmic Accountability",
    description: "Detect bias, document decisions, and create audit trails for democratic oversight.",
  },
  {
    icon: Tv,
    title: "Open Source",
    description: "Fully transparent codebase. No vendor lock-in. Deploy on your own infrastructure.",
  },
];

export function WhyParity() {
  return (
    <section id="why-parity" className="relative bg-background py-24">
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
          <h2 className="mb-4 text-4xl font-light text-foreground sm:text-5xl">
            Built for Democratic Institutions
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            When governments deploy AI, citizens deserve transparency. Parity AI provides the infrastructure for public accountability.
          </p>
        </motion.div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border/50 bg-border/50 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative bg-card/80 p-8 backdrop-blur-sm transition-colors hover:bg-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-border/50 bg-secondary/50 transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                <feature.icon className="h-6 w-6 text-foreground transition-colors group-hover:text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-medium text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
