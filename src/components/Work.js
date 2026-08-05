import React, { useState } from "react";
import useReveal from "../hooks/useReveal";

function pushedLabel(iso, templates) {
  if (!iso) return null;
  const days = Math.floor((Date.now() - new Date(iso)) / 86400000);
  if (days < 1) return templates.today;
  if (days < 31) return templates.days.replace("{n}", days);
  if (days < 365) return templates.months.replace("{n}", Math.floor(days / 30));
  return templates.years.replace("{n}", Math.floor(days / 365));
}

export default function Work({ work, gh }) {
  const ref = useReveal();
  const [open, setOpen] = useState({});

  const toggle = (repo) => setOpen((prev) => ({ ...prev, [repo]: !prev[repo] }));

  const statusLine =
    gh === null ? work.status.fetching : gh === "failed" ? work.status.failed : work.status.live;

  return (
    <section id="work" className="work rv" ref={ref}>
      <div className="work__head">
        <h2 className="section-heading">{work.heading}</h2>
        <span className="work__status">★ {statusLine}</span>
      </div>
      <p className="work__hint">{work.hint}</p>
      <div className="work__grid">
        {work.projects.map((project) => {
          const live = gh && gh !== "failed" ? gh[project.repo.toLowerCase()] : null;
          const stars = live ? live.stars : project.stars;
          const pushed = live ? pushedLabel(live.pushed, work.pushed) : null;
          const isOpen = !!open[project.repo];

          return (
            <div
              key={project.repo}
              className="work__card"
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              onClick={() => toggle(project.repo)}
              onKeyDown={(e) => {
                if (e.target !== e.currentTarget) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(project.repo);
                }
              }}
            >
              <img
                className="work__cover"
                src={`${process.env.PUBLIC_URL}/${project.image}`}
                alt={project.title}
              />
              <div className="work__body">
                <div className="work__title-row">
                  <h3 className="work__title">{project.title}</h3>
                  <span className="work__stars">{stars}★</span>
                </div>
                <p className="work__meta">
                  {project.year} · {project.primary}
                  {pushed ? ` · ${pushed}` : ""}
                </p>
                {isOpen && (
                  <div className="work__detail">
                    <p className="work__blurb">{project.blurb}</p>
                    <p className="work__tech">{project.techLine}</p>
                    <a
                      className="work__link"
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {work.github_link}
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
