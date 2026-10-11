import { motion } from "motion/react";
import Section from "./Section";
import { fadeUp, inView, stagger } from "../lib/animations";

const groups = [
  {
    label: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "C++", "Java", "SQL"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "HTML5", "CSS3", "Tailwind", "Bootstrap"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "RESTful API design", "MQTT"],
  },
  {
    label: "Databases",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "InfluxDB (time-series)",
      "Supabase",
    ],
  },
  {
    label: "Data & ML",
    items: [
      "Data mining",
      "Classification",
      "Clustering",
      "Forecasting",
      "Anomaly detection",
      "NLP embeddings",
    ],
  },
  {
    label: "Tools & Cloud",
    items: ["Docker", "Docker Compose", "Git", "AWS", "Vercel"],
  },
  {
    label: "Networking",
    items: ["Routing", "Switching", "Network fundamentals"],
  },
];

function Skills() {
  return (
    <Section
      id="skills"
      title="Skills"
      intro="What I reach for, grouped by where it sits in the stack."
    >
      <motion.ul
        variants={stagger}
        {...inView}
        className="grid grid-cols-1 gap-3 md:grid-cols-2"
      >
        {groups.map((group) => (
          <motion.li
            key={group.label}
            variants={fadeUp}
            className="card card-hover rounded-2xl p-5"
          >
            <h3 className="mono-label">{group.label}</h3>

            <ul className="mt-3.5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="chip px-3 py-1 text-[0.8rem]">
                  {item}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}

export default Skills;
