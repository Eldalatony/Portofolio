import { motion } from "motion/react";
import { fadeUp, stagger } from "../lib/animations";
import { profile } from "../data/profile";

const actions = [
  { label: "View projects", href: "#projects", style: "btn-primary" },
  { label: "Get in touch", href: `mailto:${profile.email}`, style: "chip" },
  {
    label: "Download résumé",
    href: profile.resumeHref,
    style: "chip",
    download: true,
  },
];

function Hero() {
  return (
    <motion.section
      id="hero"
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-6xl scroll-mt-28 px-6 py-20 sm:py-24"
    >
      <motion.p variants={fadeUp} className="eyebrow">
        {profile.location}
      </motion.p>

      <motion.h1
        variants={fadeUp}
        className="gradient-text page-title mt-4 max-w-[16ch]"
      >
        {profile.name}
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="mt-4 text-xl font-medium tracking-tight sm:text-2xl"
      >
        {profile.title}
      </motion.p>

      <motion.p
        variants={fadeUp}
        className="mt-5 max-w-[58ch] text-lg leading-relaxed text-muted"
      >
        {profile.pitch}
      </motion.p>

      <motion.p
        variants={fadeUp}
        className="chip mt-8 inline-block px-3.5 py-1.5 text-sm"
      >
        {profile.availability}
      </motion.p>

      <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
        {actions.map((action) => (
          <a
            key={action.label}
            href={action.href}
            download={action.download}
            className={`btn ${action.style}`}
          >
            {action.label}
          </a>
        ))}
      </motion.div>
    </motion.section>
  );
}

export default Hero;
