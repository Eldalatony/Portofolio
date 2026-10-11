import { motion } from "motion/react";
import { Link } from "react-router";
import { fadeDown } from "../lib/animations";
import { profile } from "../data/profile";

function SubpageHeader({ backTo, backLabel }) {
  return (
    <motion.header
      variants={fadeDown}
      initial="hidden"
      animate="visible"
      className="site-header"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3.5">
        <Link to="/" className="font-semibold tracking-tight">
          {profile.shortName}
        </Link>
        <Link
          to={backTo}
          className="text-sm text-muted transition-colors hover:text-ink"
        >
          {backLabel}
        </Link>
      </div>
    </motion.header>
  );
}

export default SubpageHeader;
