import { useEffect, useState } from "react";

function TableOfContents({ items }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (sections.length === 0) return;

    let timer;

    const update = () => {
      timer = undefined;
      const triggerY = window.innerHeight * 0.3;

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (atBottom) {
        setActiveId(sections[sections.length - 1].id);
        return;
      }

      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top > triggerY) break;
        current = section.id;
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (timer === undefined) timer = setTimeout(update, 60);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  return (
    <nav aria-label="On this page">
      <p className="text-[0.7rem] tracking-[0.18em] text-muted uppercase">
        On this page
      </p>

      <ul className="mt-5 flex flex-col gap-1 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              data-active={activeId === item.id}
              aria-current={activeId === item.id ? "location" : undefined}
              className="toc-link block py-1 pl-4"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TableOfContents;
