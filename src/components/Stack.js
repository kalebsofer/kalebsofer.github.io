import React, { useEffect, useRef, useState } from "react";
import useReveal from "../hooks/useReveal";

// Collapsed rows show one truncated line of items; open rows wrap the full list.
// When the row is wide enough for every item there is nothing to expand, so the
// toggle is hidden until the viewport shrinks again.
function StackRow({ group }) {
  const [open, setOpen] = useState(false);
  const [fits, setFits] = useState(false);
  const rowRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const row = rowRef.current;
    const el = lineRef.current;
    if (!row || !el) return;

    // Measure the single-line width regardless of the current open state.
    const measure = () => {
      const prev = el.style.whiteSpace;
      el.style.whiteSpace = "nowrap";
      setFits(el.scrollWidth <= el.clientWidth);
      el.style.whiteSpace = prev;
    };

    measure();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);

    // Observe the row, not the line: inline-level grid items do not report resizes.
    if ("ResizeObserver" in window) {
      const observer = new ResizeObserver(measure);
      observer.observe(row);
      return () => observer.disconnect();
    }
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [group.items]);

  const className = ["stack__row", open && "is-open", fits && "is-fit"].filter(Boolean).join(" ");

  return (
    <div className={className}>
      <button
        type="button"
        className="stack__summary"
        ref={rowRef}
        aria-expanded={open}
        disabled={fits}
        onClick={() => setOpen(!open)}
      >
        <span className="stack__name">{group.name}</span>
        <span className="stack__line" ref={lineRef}>
          {group.items.join(" · ")}
        </span>
        <span className="stack__toggle" aria-hidden="true" />
      </button>
    </div>
  );
}

export default function Stack({ stack }) {
  const ref = useReveal();

  return (
    <section id="stack" className="stack rv" ref={ref}>
      <div className="stack__head">
        <h2 className="section-heading">{stack.heading}</h2>
        <span className="stack__updated">{stack.updated}</span>
      </div>
      {stack.groups.map((group) => (
        <StackRow key={group.name} group={group} />
      ))}
    </section>
  );
}
