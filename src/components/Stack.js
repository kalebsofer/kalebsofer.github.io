import React from "react";
import useReveal from "../hooks/useReveal";

export default function Stack({ stack, icons }) {
  const ref = useReveal();

  return (
    <section id="stack" className="stack rv" ref={ref}>
      <h2 className="section-heading">{stack.heading}</h2>
      {stack.groups.map((group) => (
        <div key={group.name} className="stack__row">
          <p className="stack__name">{group.name}</p>
          <p className="stack__line">{group.line}</p>
        </div>
      ))}
      {icons && icons.length > 0 && (
        <div className="stack__icons" aria-hidden="true">
          {icons.map((icon) => (
            <i key={icon.name} className={icon.class} title={icon.name} />
          ))}
        </div>
      )}
    </section>
  );
}
