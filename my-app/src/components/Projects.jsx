import { Link } from "react-router";
import Section from "./Section";
import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";

function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
      intro="A selection of things I've designed, built, and shipped."
      action={
        <Link to="/projects" className="link text-sm">
          View all projects →
        </Link>
      }
    >
      <Reveal>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}

export default Projects;
