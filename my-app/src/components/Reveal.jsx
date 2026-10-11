import { motion } from "motion/react";
import { fadeUp, inView } from "../lib/animations";

function Reveal({ children, className }) {
  return (
    <motion.div variants={fadeUp} {...inView} className={className}>
      {children}
    </motion.div>
  );
}

export default Reveal;
