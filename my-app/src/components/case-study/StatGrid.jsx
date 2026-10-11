import { motion } from "motion/react";
import { fadeUp, inView, stagger } from "../../lib/animations";

function StatGrid({ stats }) {
  return (
    <motion.ul
      variants={stagger}
      {...inView}
      className="grid grid-cols-2 gap-3 lg:grid-cols-3"
    >
      {stats.map((stat) => (
        <motion.li
          key={stat.label}
          variants={fadeUp}
          className="card card-hover rounded-2xl p-5"
        >
          <p className="gradient-text text-3xl font-bold tabular-nums">
            {stat.value}
          </p>
          <p className="mt-1.5 text-sm font-medium">{stat.label}</p>
          {stat.note && (
            <p className="mt-2 text-xs leading-relaxed text-muted">
              {stat.note}
            </p>
          )}
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default StatGrid;
