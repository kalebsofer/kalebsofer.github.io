import React from "react";
import useReveal from "../hooks/useReveal";
import withLinks from "../lib/withLinks";

export default function SoftmaxNow({ softmax, now }) {
  const bandRef = useReveal();
  const panelRef = useReveal();

  return (
    <section id="softmax" className="softmax-now">
      <div className="softmax rv" ref={bandRef}>
        <p className="eyebrow">{softmax.eyebrow}</p>
        <h2 className="softmax__wordmark">{softmax.name}</h2>
        <p className="softmax__body">{softmax.body}</p>
        <div className="softmax__services">
          {softmax.services.map((service) => (
            <div key={service.title} className="softmax__service">
              <p className="softmax__service-title">{service.title}</p>
              <p className="softmax__service-desc">{service.description}</p>
            </div>
          ))}
        </div>
        <a className="pill pill--ink" href={softmax.url} target="_blank" rel="noopener noreferrer">
          {softmax.cta}
        </a>
      </div>

      <div className="now rv rv--late" ref={panelRef}>
        <p className="eyebrow">{now.eyebrow}</p>
        {now.items.map((item) => (
          <div key={item.key} className="now__row">
            <span className="now__key">{item.key}</span>
            <span className="now__value">{withLinks(item.value)}</span>
          </div>
        ))}
        <div className="now__stats">
          {now.stats.map((stat) => (
            <div key={stat.label}>
              <p className="now__stat-number">{stat.number}</p>
              <p className="now__stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
