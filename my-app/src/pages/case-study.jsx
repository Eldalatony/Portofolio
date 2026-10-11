import { motion } from "motion/react";
import { Link, useParams } from "react-router";
import PageShell from "../components/PageShell";
import SubpageHeader from "../components/SubpageHeader";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import TableOfContents from "../components/TableOfContents";
import CaseSection from "../components/case-study/CaseSection";
import Prose from "../components/case-study/Prose";
import RowList from "../components/case-study/RowList";
import StatGrid from "../components/case-study/StatGrid";
import FigureList from "../components/case-study/FigureList";
import EndpointTable from "../components/case-study/EndpointTable";
import NotFound from "./not-found";
import { fadeUp, inView, stagger } from "../lib/animations";
import { getProject } from "../data/projects";
import { newTab } from "../data/profile";

function contentsFor(project) {
  return [
    { id: "overview", label: "Overview" },
    project.demoVideo && { id: "demo", label: "Demo" },
    project.problem && { id: "problem", label: "The problem" },
    project.pipeline && { id: "how-it-works", label: "How it works" },
    project.services && { id: "architecture", label: "Architecture" },
    project.hardware && { id: "hardware", label: "Hardware" },
    project.security && { id: "security", label: "Security" },
    project.intelligence && { id: "intelligence", label: "AI & analytics" },
    project.endpoints && { id: "api", label: "API reference" },
    project.gallery && { id: "screens", label: "Screens" },
    project.diagrams && { id: "diagrams", label: "Diagrams" },
    project.testing && { id: "testing", label: "Testing" },
    project.challenges && { id: "challenges", label: "Challenges" },
    project.stack && { id: "stack", label: "Full stack" },
    project.future && { id: "future", label: "Future work" },
  ].filter(Boolean);
}

function CaseStudy() {
  const { slug } = useParams();
  const project = getProject(slug);

  if (!project) {
    return (
      <NotFound
        title="Project not found"
        message="That case study does not exist — it may have been renamed."
      />
    );
  }

  const contents = contentsFor(project);

  return (
    <PageShell>
      <title>{`${project.title} — Case Study`}</title>
      <meta name="description" content={project.tagline} />

      <SubpageHeader backTo="/projects" backLabel="← All projects" />

      <main className="mx-auto max-w-6xl px-6 pb-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="py-16 sm:py-20"
        >
          <motion.p variants={fadeUp} className="eyebrow">
            Case study
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="gradient-text page-title mt-4 max-w-[18ch]"
          >
            {project.title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted"
          >
            {project.tagline}
          </motion.p>

          {project.meta && (
            <motion.dl
              variants={fadeUp}
              className="mt-11 grid grid-cols-2 gap-6 sm:grid-cols-4"
            >
              {project.meta.map((fact) => (
                <div
                  key={fact.label}
                  className="border-l-2 border-line-strong pl-4"
                >
                  <dt className="text-[0.68rem] tracking-[0.14em] text-muted uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium">{fact.value}</dd>
                </div>
              ))}
            </motion.dl>
          )}

          <motion.ul
            variants={fadeUp}
            className="mt-11 flex flex-wrap items-center gap-2.5"
          >
            {project.tools.map((tool) => (
              <li key={tool} className="chip px-3.5 py-1.5 text-sm">
                {tool}
              </li>
            ))}
          </motion.ul>

          {project.links && (
            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  {...newTab}
                  className={`btn ${link.primary ? "btn-primary" : "chip"}`}
                >
                  {link.label} ↗
                </a>
              ))}
            </motion.div>
          )}
        </motion.div>

        <div className="lg:grid lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:gap-14">
          <aside className="hidden lg:block">
            <div className="toc-scroll sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto py-10">
              <TableOfContents items={contents} />
            </div>
          </aside>

          <article>
            <details className="card mt-4 rounded-2xl p-4 lg:hidden">
              <summary className="cursor-pointer text-sm font-semibold">
                On this page
              </summary>
              <ul className="mt-3.5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
                {contents.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </details>

            <section id="overview" className="scroll-mt-28 py-14">
              <Reveal>
                <h2 className="section-title">Overview</h2>
              </Reveal>
              {project.summary && (
                <Reveal>
                  <p className="mt-7 max-w-[65ch] text-[0.975rem] leading-[1.75] text-muted">
                    {project.summary}
                  </p>
                </Reveal>
              )}
              {project.stats && (
                <div className="mt-10">
                  <StatGrid stats={project.stats} />
                </div>
              )}
            </section>

            {project.demoVideo && (
              <CaseSection id="demo" title="Demo">
                <Reveal>
                  <div className="card overflow-hidden rounded-2xl p-1.5">
                    <video
                      controls
                      muted
                      playsInline
                      preload="metadata"
                      poster={project.demoVideo.poster}
                      className="h-auto w-full rounded-xl"
                    >
                      <source src={project.demoVideo.src} type="video/mp4" />
                      Your browser does not support embedded video.
                    </video>
                  </div>
                  <p className="mt-3.5 max-w-[62ch] text-sm leading-relaxed text-muted">
                    A walkthrough of the running system: live readings arriving
                    from the plug, appliance control, and the analytics views.
                  </p>
                </Reveal>
              </CaseSection>
            )}

            {project.problem && (
              <CaseSection id="problem" title={project.problem.heading}>
                <Prose body={project.problem.body} />
              </CaseSection>
            )}

            {project.pipeline && (
              <CaseSection id="how-it-works" title="How it works">
                {project.approach && (
                  <div className="mb-10">
                    <Prose body={project.approach.body} />
                  </div>
                )}
                <motion.ol
                  variants={stagger}
                  {...inView}
                  className="flex flex-col gap-3"
                >
                  {project.pipeline.map((step) => (
                    <motion.li
                      key={step.step}
                      variants={fadeUp}
                      className="card card-hover grid gap-2 rounded-2xl p-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6"
                    >
                      <span className="font-mono text-sm font-semibold text-accent">
                        {step.step}
                      </span>
                      <span className="text-sm leading-relaxed text-muted">
                        {step.detail}
                      </span>
                    </motion.li>
                  ))}
                </motion.ol>
              </CaseSection>
            )}

            {project.services && (
              <CaseSection id="architecture" title="Architecture">
                <Reveal>
                  <h3 className="section-label mb-4">Services</h3>
                </Reveal>
                <RowList rows={project.services} />

                {project.dataStores && (
                  <>
                    <Reveal>
                      <h3 className="section-label mt-12 mb-4">
                        Data stores — and why three
                      </h3>
                    </Reveal>
                    <RowList rows={project.dataStores} />
                  </>
                )}
              </CaseSection>
            )}

            {project.hardware && (
              <CaseSection id="hardware" title="Hardware">
                <RowList rows={project.hardware} />
              </CaseSection>
            )}

            {project.security && (
              <CaseSection id="security" title={project.security.heading}>
                <Prose body={project.security.body} />
                {project.securityLayers && (
                  <div className="mt-10">
                    <RowList rows={project.securityLayers} />
                  </div>
                )}
              </CaseSection>
            )}

            {project.intelligence && (
              <CaseSection id="intelligence" title="AI & analytics">
                <RowList rows={project.intelligence} />
              </CaseSection>
            )}

            {project.endpoints && (
              <CaseSection id="api" title="API reference">
                <Reveal>
                  <p className="mb-7 max-w-[62ch] text-sm leading-relaxed text-muted">
                    Everything the dashboard calls. Analytics routes are proxied
                    through the backend, so the Python service is never exposed
                    to a browser directly.
                  </p>
                </Reveal>
                <EndpointTable endpoints={project.endpoints} />
              </CaseSection>
            )}

            {project.gallery && (
              <CaseSection id="screens" title="Screens">
                <FigureList figures={project.gallery} />
              </CaseSection>
            )}

            {project.diagrams && (
              <CaseSection id="diagrams" title="Diagrams">
                <FigureList figures={project.diagrams} plate />
              </CaseSection>
            )}

            {project.testing && (
              <CaseSection id="testing" title="Testing & validation">
                <RowList rows={project.testing} />
              </CaseSection>
            )}

            {project.challenges && (
              <CaseSection id="challenges" title="Engineering challenges">
                <motion.ul
                  variants={stagger}
                  {...inView}
                  className="flex flex-col gap-4"
                >
                  {project.challenges.map((challenge) => (
                    <motion.li
                      key={challenge.title}
                      variants={fadeUp}
                      className="card card-hover rounded-2xl p-6"
                    >
                      <h3 className="font-semibold">{challenge.title}</h3>
                      <p className="mt-2.5 max-w-[65ch] text-sm leading-relaxed text-muted">
                        {challenge.body}
                      </p>
                    </motion.li>
                  ))}
                </motion.ul>
              </CaseSection>
            )}

            {project.stack && (
              <CaseSection id="stack" title="Full stack">
                <motion.ul
                  variants={stagger}
                  {...inView}
                  className="flex flex-col gap-6"
                >
                  {project.stack.map((group) => (
                    <motion.li key={group.group} variants={fadeUp}>
                      <h3 className="section-label">{group.group}</h3>
                      <ul className="mt-2.5 flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <li key={item} className="chip px-3 py-1 text-sm">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.li>
                  ))}
                </motion.ul>
              </CaseSection>
            )}

            {project.future && (
              <CaseSection id="future" title="Future work">
                <motion.ul
                  variants={stagger}
                  {...inView}
                  className="flex flex-col gap-3"
                >
                  {project.future.map((item) => (
                    <motion.li
                      key={item}
                      variants={fadeUp}
                      className="flex gap-3.5 text-[0.975rem] leading-relaxed text-muted"
                    >
                      <span aria-hidden="true" className="text-accent">
                        →
                      </span>
                      <span className="max-w-[60ch]">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </CaseSection>
            )}

            <hr className="rule" />
            <div className="py-14">
              <Link
                to="/projects"
                className="chip inline-block px-5 py-2.5 text-sm"
              >
                ← Back to all projects
              </Link>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </PageShell>
  );
}

export default CaseStudy;
