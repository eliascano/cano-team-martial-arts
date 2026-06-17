import { motion } from "framer-motion";

function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`mb-12 md:mb-16 max-w-2xl ${
        isCenter ? "mx-auto text-center" : "text-left"
      }`}
    >
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}

      <h2 className="display text-4xl md:text-5xl font-bold text-balance text-foreground">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 text-base md:text-lg leading-relaxed text-muted text-pretty">
          {subtitle}
        </p>
      )}

      <div
        className={`mt-6 h-1 w-16 rounded-full bg-brand ${
          isCenter ? "mx-auto" : ""
        }`}
      />
    </motion.div>
  );
}

export default SectionHeading;
