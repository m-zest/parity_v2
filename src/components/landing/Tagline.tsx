import { motion } from "framer-motion";

export function Tagline() {
  return (
    <section className="relative bg-background py-32">
      <div className="container">
        <motion.p
          className="mx-auto max-w-4xl text-center text-3xl font-light leading-relaxed text-foreground sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          When citizens interact with AI,
          <br />
          they deserve to know how decisions are made.
          <br />
          <span className="text-primary">We build the tools that make that possible.</span>
        </motion.p>
      </div>
    </section>
  );
}
