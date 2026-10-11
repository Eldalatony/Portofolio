import Reveal from "../Reveal";

function CaseSection({ id, title, children }) {
  return (
    <>
      <hr className="rule" />
      <section id={id} className="scroll-mt-28 py-14">
        <Reveal>
          <h2 className="section-title">{title}</h2>
        </Reveal>
        <div className="mt-7">{children}</div>
      </section>
    </>
  );
}

export default CaseSection;
