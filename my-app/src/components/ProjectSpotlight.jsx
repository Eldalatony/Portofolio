import { motion } from "motion/react";
import { Link } from "react-router";
import ProjectShowcase from "./ProjectShowcase";
import { fadeUp, inView, stagger } from "../lib/animations";
import { newTab } from "../data/profile";

const maxStats = 3;

function ProjectSpotlight({ project, index }) {
  const href = `/projects/${project.slug}`;
  const flipped = index % 2 === 1;
  const stats = (project.stats ?? []).slice(0, maxStats);

  return (
    <section
      id={project.slug}
      aria-labelledby={`${project.slug}-title`}
      className="scroll-mt-24"
    >
      <motion.div
        variants={stagger}
        {...inView}
        className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
      >
        <motion.div
          variants={fadeUp}
          className={flipped ? "lg:order-2" : undefined}
        >
          <p className="font-mono text-[0.7rem] tracking-[0.2em] text-muted uppercase">
            {String(index + 1).padStart(2, "0")}
            {project.meta?.[1] && <span> · {project.meta[1].value}</span>}
          </p>

          <h2
            id={`${project.slug}-title`}
            className="mt-3 text-2xl leading-tight font-bold tracking-tight sm:text-3xl"
          >
            <Link to={href} className="transition-opacity hover:opacity-70">
              {project.title}
            </Link>
          </h2>

          <p className="mt-3 text-lg leading-snug">{project.tagline}</p>

          <p className="mt-4 max-w-[52ch] leading-relaxed text-muted">
            {project.hook ?? project.summary}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <li key={tool} className="chip px-3 py-1 text-[0.8rem]">
                {tool}
              </li>
            ))}
          </ul>

          {stats.length > 0 && (
            <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-xl font-semibold tracking-tight">
                      {stat.value}
                    </span>
                    <span className="mt-0.5 block text-[0.78rem] text-muted">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to={href} className="btn btn-primary">
              Read the case study →
            </Link>

            {project.links?.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...newTab}
                className="link text-sm"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className={flipped ? "lg:order-1" : undefined}
        >
          <Link
            to={href}
            aria-label={`Read the ${project.title} case study`}
            className="block"
          >
            <ProjectShowcase project={project} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default ProjectSpotlight;
