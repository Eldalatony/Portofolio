import { motion } from "motion/react";
import { fadeUp, inView, stagger } from "../../lib/animations";

function RowList({ rows }) {
  return (
    <motion.ul
      variants={stagger}
      {...inView}
      className="grid grid-cols-1 gap-3 md:grid-cols-2"
    >
      {rows.map((row) => (
        <motion.li
          key={row.name}
          variants={fadeUp}
          className="card card-hover rounded-2xl p-5"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <h3 className="font-semibold">{row.name}</h3>
            <span className="font-mono text-[0.7rem] tracking-tight text-accent">
              {row.role}
            </span>
          </div>
          <p className="mt-2.5 text-sm leading-relaxed text-muted">
            {row.detail}
          </p>
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default RowList;
