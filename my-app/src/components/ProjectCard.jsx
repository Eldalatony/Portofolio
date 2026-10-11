import { Link } from "react-router";

function ProjectCard({ project }) {
  return (
    <li className="h-full">
      <Link
        to={`/projects/${project.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-lg border transition-colors hover:border-current/60"
      >
        <div className="aspect-video overflow-hidden border-b bg-current/5">
          <img
            src={project.cover.src}
            alt={project.cover.alt}
            loading="lazy"
            className="size-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <h3 className="leading-snug font-semibold">{project.title}</h3>

          <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {project.tools.map((tool) => (
              <li
                key={tool}
                className="rounded border px-2 py-0.5 text-xs opacity-80"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </li>
  );
}

export default ProjectCard;
