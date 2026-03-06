import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { ArrowUpRight, Shield, Users, Globe, Code, Scale, Heart } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  {
    icon: Shield,
    title: "Transparency First",
    description: "Every algorithm affecting citizens should be explainable. We build tools that make AI decisions auditable and understandable.",
  },
  {
    icon: Users,
    title: "Democratic Accountability",
    description: "Public institutions answer to citizens. Our platform ensures AI systems meet the same standard of accountability.",
  },
  {
    icon: Globe,
    title: "Open Source",
    description: "Critical infrastructure for democracy shouldn't be proprietary. Our code is open, auditable, and free to deploy.",
  },
  {
    icon: Scale,
    title: "Regulatory Ready",
    description: "Built from day one for the EU AI Act. We track evolving requirements so public institutions stay compliant.",
  },
];

const timeline = [
  {
    year: "2024",
    title: "The Problem",
    description: "Governments worldwide began deploying AI in hiring, benefits, healthcare, and law enforcement — often without adequate oversight or documentation.",
  },
  {
    year: "2025",
    title: "EU AI Act Takes Effect",
    description: "The world's first comprehensive AI regulation created urgent need for compliance infrastructure, especially for high-risk public sector applications.",
  },
  {
    year: "2026",
    title: "Parity AI Launches",
    description: "We built the open infrastructure that public institutions need to deploy AI responsibly — with transparency, accountability, and citizen trust.",
  },
];

export default function About() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 sm:py-32">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background: `
                radial-gradient(ellipse 80% 50% at 50% -10%, hsl(160 84% 54% / 0.12), transparent),
                radial-gradient(ellipse 60% 40% at 80% 60%, hsl(160 84% 54% / 0.06), transparent)
              `,
            }}
            aria-hidden="true"
          />

          <div className="container relative">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="mb-6 text-4xl font-light tracking-tight text-foreground sm:text-5xl md:text-6xl">
                AI Governance for the{" "}
                <span className="text-primary">Public Good</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                We believe that when governments deploy AI, citizens have a right to know how those systems work,
                what decisions they make, and how they're being held accountable.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="border-y border-border/50 bg-card/30 py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="mb-8 text-3xl font-light text-foreground sm:text-4xl">
                  Our Mission
                </h2>
                <div className="space-y-6 text-muted-foreground">
                  <p className="text-lg">
                    Parity AI provides <strong className="text-foreground">open infrastructure for democratic AI accountability</strong>.
                    We help governments and public institutions verify, audit, and document the AI systems they deploy.
                  </p>
                  <p>
                    The EU AI Act represents a historic moment: the first comprehensive regulation of artificial intelligence.
                    But regulation without implementation is just words. Public institutions need practical tools to actually
                    achieve compliance — tools that don't lock them into expensive vendor contracts or proprietary systems.
                  </p>
                  <p>
                    That's why Parity AI is <strong className="text-foreground">open source</strong>. We believe the infrastructure
                    for AI accountability should be as transparent as the accountability it enables. National competent authorities,
                    municipal governments, and public agencies can deploy our platform on their own terms.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24">
          <div className="container">
            <motion.div
              className="mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-4 text-3xl font-light text-foreground sm:text-4xl">
                What We Stand For
              </h2>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="rounded-2xl border border-border/50 bg-card/50 p-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-medium text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="border-y border-border/50 bg-card/30 py-24">
          <div className="container">
            <motion.div
              className="mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-4 text-3xl font-light text-foreground sm:text-4xl">
                Why Now
              </h2>
            </motion.div>

            <div className="mx-auto max-w-3xl">
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    className="relative flex gap-8"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary bg-primary/10">
                        <span className="text-sm font-semibold text-primary">{item.year}</span>
                      </div>
                      {index < timeline.length - 1 && (
                        <div className="h-full w-px bg-border/50" />
                      )}
                    </div>
                    <div className="pb-12">
                      <h3 className="mb-2 text-xl font-medium text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EU AI Act Section */}
        <section className="py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10">
                    <Globe className="h-7 w-7 text-blue-400" />
                  </div>
                  <h2 className="text-3xl font-light text-foreground sm:text-4xl">
                    The EU AI Act Context
                  </h2>
                </div>
                <div className="space-y-6 text-muted-foreground">
                  <p>
                    The EU AI Act classifies AI systems by risk level. <strong className="text-foreground">High-risk systems</strong> —
                    which include most public sector applications in employment, education, healthcare, and law enforcement —
                    face stringent requirements under Articles 9 (risk management) and 13 (transparency).
                  </p>
                  <p>
                    National competent authorities must soon begin auditing AI systems across their jurisdictions.
                    Municipal governments deploying hiring algorithms or benefits systems need documentation that
                    meets regulatory standards. Healthcare institutions using diagnostic AI must prove their systems are fair and accountable.
                  </p>
                  <p>
                    Parity AI provides the practical infrastructure to meet these requirements — not as a checkbox exercise,
                    but as genuine democratic accountability that citizens can trust.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Open Source Section */}
        <section className="border-t border-border/50 bg-card/30 py-24">
          <div className="container">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Code className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="mb-4 text-3xl font-light text-foreground sm:text-4xl">
                Open Source Commitment
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Parity AI is released under the Apache 2.0 license. Governments can deploy it on-premise,
                modify it for their needs, and contribute improvements back to the community.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href="https://github.com/parity-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-primary/50 px-8"
                  >
                    View on GitHub
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <Link to="/dashboard">
                  <Button size="lg" className="rounded-full bg-primary px-8 text-primary-foreground">
                    Try Live Demo
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10">
                  <Heart className="h-8 w-8 text-rose-400" />
                </div>
              </div>
              <h2 className="mb-4 text-3xl font-light text-foreground sm:text-4xl">
                Join the Movement
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Whether you're a government official, a civic technologist, or a citizen who cares about
                AI accountability — we'd love to hear from you.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-primary/50 px-8"
                  onClick={() => window.open('mailto:hello@parityai.io?subject=Partnership Inquiry', '_blank')}
                >
                  Contact Us
                </Button>
                <Link to="/auth">
                  <Button size="lg" className="rounded-full bg-primary px-8 text-primary-foreground">
                    Get Started Free
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
