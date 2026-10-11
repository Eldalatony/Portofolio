import { motion } from "motion/react";
import Section from "./Section";
import Reveal from "./Reveal";
import { fadeUp, inView, stagger } from "../lib/animations";

const degree = {
  title: "B.Sc. Computer Science",
  period: "Oct 2022 — 2026",
  institution: "Arab Academy for Science, Technology & Maritime Transport",
  location: "Cairo, Egypt",
};

const certifications = [
  {
    title: "Front-End Web Development",
    detail: "React · Bootstrap · JavaScript · HTML5 & CSS3",
  },
  {
    title: "CCNA — Networking",
    detail: "Routing, switching, and network fundamentals",
  },
  {
    title: "Cloud Computing",
    detail: "AWS: EC2, S3, Lambda, IAM, VPC, RDS, CloudWatch",
  },
];

const languages = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "Professional working proficiency" },
];

function Education() {
  return (
    <Section id="education" title="Education & certifications">
      <Reveal className="card rounded-2xl p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-lg font-semibold">{degree.title}</h3>
          <span className="font-mono text-[0.7rem] tracking-tight text-accent">
            {degree.period}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {degree.institution} · {degree.location}
        </p>
      </Reveal>

      <h3 className="mono-label mt-10 text-muted">Courses & certifications</h3>
      <motion.ul
        variants={stagger}
        {...inView}
        className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3"
      >
        {certifications.map((cert) => (
          <motion.li
            key={cert.title}
            variants={fadeUp}
            className="card card-hover rounded-2xl p-5"
          >
            <h4 className="leading-snug font-semibold">{cert.title}</h4>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">
              {cert.detail}
            </p>
          </motion.li>
        ))}
      </motion.ul>

      <h3 className="mono-label mt-10 text-muted">Languages</h3>
      <motion.ul
        variants={stagger}
        {...inView}
        className="mt-4 flex flex-wrap gap-3"
      >
        {languages.map((language) => (
          <motion.li
            key={language.name}
            variants={fadeUp}
            className="chip px-4 py-2 text-sm"
          >
            <span className="font-medium">{language.name}</span>
            <span className="text-muted"> — {language.level}</span>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}

export default Education;
