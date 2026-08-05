import React from "react";
import useReveal from "../hooks/useReveal";

export default function Intro({ intro, softmaxUrl }) {
  const leftRef = useReveal();
  const rightRef = useReveal();

  return (
    <section className="intro">
      <div className="intro__copy rv" ref={leftRef}>
        <p className="intro__lead">
          {intro.lead_before}
          <a href={softmaxUrl} target="_blank" rel="noopener noreferrer" className="intro__lead-link">
            {intro.lead_link}
          </a>
          {intro.lead_after}
        </p>
        <div className="intro__ctas">
          <a
            className="pill pill--invert"
            href={intro.cta_primary_url || softmaxUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {intro.cta_primary}
          </a>
          <a className="pill pill--outline" href={`mailto:${intro.email}`}>
            {intro.cta_secondary}
          </a>
        </div>
      </div>
      <div className="intro__photo rv rv--late" ref={rightRef}>
        <img src={`${process.env.PUBLIC_URL}/images/myProfile.png`} alt="Kaleb Sofer" />
        <p className="intro__photo-caption">{intro.photo_caption}</p>
      </div>
    </section>
  );
}
