import Reveal from "./Reveal";

function Section({ id, title, intro, action, children }) {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <hr className="rule" />
      <section
        id={id}
        aria-labelledby={`${id}-heading`}
        className="scroll-mt-28 py-14"
      >
        <Reveal className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div>
            <h2 id={`${id}-heading`} className="section-title">
              {title}
            </h2>
            {intro && (
              <p className="mt-2.5 max-w-[62ch] text-[0.975rem] leading-relaxed text-muted">
                {intro}
              </p>
            )}
          </div>
          {action}
        </Reveal>

        <div className="mt-7">{children}</div>
      </section>
    </div>
  );
}

export default Section;
