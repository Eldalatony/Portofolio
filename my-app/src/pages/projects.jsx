import { motion } from "motion/react";
import PageShell from "../components/PageShell";
import SubpageHeader from "../components/SubpageHeader";
import ProjectSpotlight from "../components/ProjectSpotlight";
import Footer from "../components/Footer";
import { fadeUp, stagger } from "../lib/animations";
import { projects } from "../data/projects";
import { profile } from "../data/profile";

function ProjectsPage() {
  return (
    <PageShell>
      <title>{`Projects — ${profile.name}`}</title>
      <meta
        name="description"
        content="Case studies of things I've designed, built, and shipped — architecture, code, and results."
      />

      <SubpageHeader backTo="/#projects" backLabel="← Back home" />

      <main className="mx-auto max-w-6xl px-6 pb-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="py-16 sm:py-20"
        >
          <motion.p variants={fadeUp} className="eyebrow">
            Case studies
          </motion.p>

          <motion.h1 variants={fadeUp} className="gradient-text page-title mt-4">
            Projects
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-[58ch] text-lg leading-relaxed text-muted"
          >
            Each project has its own case study: the problem, how the system is
            put together, the engineering behind it, and what the results were.
          </motion.p>
        </motion.div>

        {projects.map((project, i) => (
          <div key={project.slug}>
            {i > 0 && <hr className="rule my-20 sm:my-28" />}
            <ProjectSpotlight project={project} index={i} />
          </div>
        ))}
      </main>

      <Footer />
    </PageShell>
  );
}

export default ProjectsPage;
