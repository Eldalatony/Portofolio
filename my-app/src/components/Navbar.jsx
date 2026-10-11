import { motion } from "motion/react";
import { Link } from "react-router";
import { fadeDown } from "../lib/animations";
import { profile } from "../data/profile";

const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

function Navbar() {
  return (
    <motion.header
      variants={fadeDown}
      initial="hidden"
      animate="visible"
      className="site-header"
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-3.5"
      >
        <Link to="/" className="font-semibold tracking-tight">
          {profile.shortName}
        </Link>

        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          {sections.map((section) => (
            <li key={section.id}>
              <Link
                to={`/#${section.id}`}
                className="text-muted transition-colors hover:text-ink"
              >
                {section.label}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={profile.resumeHref}
          download
          className="chip px-4 py-1.5 text-sm font-medium"
        >
          Résumé
        </a>
      </nav>
    </motion.header>
  );
}

export default Navbar;
