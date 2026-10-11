const layout = [
  {
    style: {
      "--x": "-29%",
      "--y": "6%",
      "--r": "-8.5deg",
      "--hx": "-34%",
      "--hy": "3%",
      "--hr": "-11.5deg",
    },
    z: "z-10",
  },
  {
    style: { "--x": "0%", "--y": "-3%", "--r": "0deg", "--hy": "-8%" },
    z: "z-20",
  },
  {
    style: {
      "--x": "29%",
      "--y": "6%",
      "--r": "8.5deg",
      "--hx": "34%",
      "--hy": "3%",
      "--hr": "11.5deg",
    },
    z: "z-10",
  },
];

function pickThree(project) {
  if (project.showcase) return project.showcase;

  const rest = (project.gallery ?? []).filter(
    (figure) => figure.src !== project.cover.src,
  );

  return [rest[0] ?? project.cover, project.cover, rest[1] ?? project.cover];
}

function ProjectShowcase({ project }) {
  const figures = pickThree(project);

  return (
    <div className="fan mx-auto aspect-[3/2] w-[92%] max-w-[34rem] lg:w-[94%] lg:max-w-none">
      {figures.map((figure, i) => (
        <div
          key={`${figure.src}-${i}`}
          style={layout[i].style}
          className={`fan-card ${layout[i].z} overflow-hidden rounded-xl border`}
        >
          <div className="aspect-[16/10] bg-surface-solid">
            <img
              src={figure.src}
              alt={figure.alt}
              loading="lazy"
              className="size-full object-cover object-top"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectShowcase;
