import { motion } from "motion/react";
import Section from "./Section";
import { fadeUp, inView, stagger } from "../lib/animations";

const paragraphs = [
  "I build software end to end. That means the front end a person actually clicks, the backend services and REST APIs behind it, the relational and NoSQL data layers underneath, and the containerized deployment that puts the whole thing somewhere real.",
  "Alongside that I have an applied background in data mining and machine learning — classification, clustering, forecasting and anomaly detection — which is usually where a system stops reporting what happened and starts being useful about what is coming.",
];

function About() {
  return (
    <Section id="about" title="About">
      <motion.div
        variants={stagger}
        {...inView}
        className="flex flex-col gap-5"
      >
        {paragraphs.map((paragraph) => (
          <motion.p
            key={paragraph}
            variants={fadeUp}
            className="max-w-[65ch] text-[0.975rem] leading-[1.75] text-muted"
          >
            {paragraph}
          </motion.p>
        ))}
      </motion.div>
    </Section>
  );
}

export default About;
