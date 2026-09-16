import React from "react";

// Full-bleed hero: the portrait is the field, the type is cut into it.
// Always dark, regardless of site theme - the nav renders inside so it sits on the same field.
export default function Hero({ hero, softmaxUrl, nav }) {
  return (
    <header className="hero">
      <div className="hero__backdrop" aria-hidden="true">
        <img
          className="hero__portrait"
          src={`${process.env.PUBLIC_URL}/images/myProfile.png`}
          alt=""
        />
        <div className="hero__fade" />
        <div className="hero__glow" />
      </div>

      {nav}

      <div className="hero__body">
        <p className="hero__availability">{hero.availability}</p>
        <h1 className="hero__headline">
          {hero.headline_line1}
          <span className="hero__comma">,</span>
          <br />
          {hero.headline_line2}
        </h1>

        <div className="hero__foot">
          <div className="hero__copy">
            <p className="hero__lead">
              {hero.lead_before}
              <a
                href={softmaxUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hero__lead-link"
              >
                {hero.lead_link}
              </a>
              {hero.lead_after}
            </p>
            <div className="hero__ctas">
              <a
                className="pill pill--invert"
                href={hero.cta_primary_url || softmaxUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {hero.cta_primary}
              </a>
              <a className="pill pill--outline" href={`mailto:${hero.email}`}>
                {hero.cta_secondary}
              </a>
            </div>
          </div>

          <p className="hero__location">
            {hero.location_lines.map((line, i) => (
              <React.Fragment key={line}>
                {i > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
    </header>
  );
}
