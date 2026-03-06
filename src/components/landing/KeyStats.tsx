import { motion } from "framer-motion";
import { BarChart3, Clock, Shield } from "lucide-react";

const stats = [
  { icon: Shield, value: "EU AI Act", label: "Articles 9 & 13 Ready" },
  { icon: BarChart3, value: "100%", label: "Open Source" },
  { icon: Clock, value: "Free", label: "For Public Institutions" },
];

export function KeyStats() {
  return (
    <section className="relative bg-background py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container">
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border/50 bg-secondary/50">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
