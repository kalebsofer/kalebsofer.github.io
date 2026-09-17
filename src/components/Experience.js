import React from "react";
import useReveal from "../hooks/useReveal";
import withLinks from "../lib/withLinks";

// Timeline section — used for both "Where I've been" (jobs) and
// "Where I've learnt" (education), which share the same row structure.
export default function Experience({ experience }) {
  const ref = useReveal();
  const rows = experience.jobs || experience.items;

  return (
    <section className="experience rv" ref={ref}>
      <h2 className="section-heading">{experience.heading}</h2>
      <div className="experience__timeline">
        {rows.map((job) => (
          <div key={`${job.company}-${job.years}`} className="experience__row">
            <span className="experience__dot" />
            <span className="experience__years">{job.years}</span>
            <div>
              <h3 className="experience__title">{job.title}</h3>
              <p className="experience__company">{withLinks(job.company)}</p>
              {job.summary && <p className="experience__summary">{job.summary}</p>}
            </div>
            <div className="experience__pills">
              {(job.mainTech || []).map((tech) => (
                <span key={tech} className="tech-pill tech-pill--main">
                  {tech}
                </span>
              ))}
              {(job.technologies || []).map((tech) => (
                <span key={tech} className="tech-pill">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
