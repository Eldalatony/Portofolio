import { Link } from "react-router";
import PageShell from "../components/PageShell";

function NotFound({
  title = "Page not found",
  message = "There's nothing at this address — it may have moved.",
}) {
  return (
    <PageShell>
      <title>{title}</title>

      <main className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-6 py-24">
        <h1 className="gradient-text text-4xl font-bold tracking-tight">
          {title}
        </h1>
        <p className="max-w-[52ch] leading-relaxed text-muted">{message}</p>

        <div className="flex flex-wrap gap-3">
          <Link to="/projects" className="btn btn-primary">
            Browse all projects
          </Link>
          <Link to="/" className="btn chip">
            Back home
          </Link>
        </div>
      </main>
    </PageShell>
  );
}

export default NotFound;
