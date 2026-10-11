import { motion } from "motion/react";
import { fadeUp, inView, stagger } from "../../lib/animations";

function Prose({ body }) {
  return (
    <motion.div variants={stagger} {...inView} className="flex flex-col gap-5">
      {body.map((paragraph) => (
        <motion.p
          key={paragraph}
          variants={fadeUp}
          className="max-w-[65ch] text-[0.975rem] leading-[1.75] text-muted"
        >
          {paragraph}
        </motion.p>
      ))}
    </motion.div>
  );
}

export default Prose;
