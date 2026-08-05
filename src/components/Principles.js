import React from "react";
import useReveal from "../hooks/useReveal";

export default function Principles({ principles }) {
  const ref = useReveal();

  return (
    <section className="principles rv" ref={ref}>
      <h2 className="section-heading">{principles.heading}</h2>
      <div className="principles__grid">
        {principles.items.map((item) => (
          <div key={item.number} className="principles__item">
            <p className="principles__number">{item.number}</p>
            <h3 className="principles__title">{item.title}</h3>
            <p className="principles__desc">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
