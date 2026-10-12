import Reveal from "../Reveal";

function FigureList({ figures, plate = false }) {
  return (
    <ul className="flex flex-col gap-12">
      {figures.map((figure) => (
        <li key={figure.src}>
          <Reveal>
            <figure className={figure.narrow ? "mx-auto max-w-xs" : undefined}>
              <div
                className={`card overflow-hidden rounded-2xl ${plate ? "plate p-2.5" : "p-1.5"}`}
              >
                <img
                  src={figure.src}
                  alt={figure.alt}
                  width={figure.width}
                  height={figure.height}
                  loading="lazy"
                  className="h-auto w-full rounded-xl"
                />
              </div>
              {figure.caption && (
                <figcaption className="mt-3.5 max-w-[62ch] text-sm leading-relaxed text-muted">
                  {figure.caption}
                </figcaption>
              )}
            </figure>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

export default FigureList;
