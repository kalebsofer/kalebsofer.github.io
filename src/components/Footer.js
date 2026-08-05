import React from "react";
import useReveal from "../hooks/useReveal";

const ICONS = {
  github: (
    <svg viewBox="0 0 16 16" width="17" height="17" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  ),
  medium: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12Zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42Zm3.04 0c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75c.66 0 1.19 2.58 1.19 5.75Z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
    </svg>
  ),
};

export default function Footer({ writing, footer, social }) {
  const ref = useReveal();

  return (
    <section id="writing" className="footer-band band-invert rv" ref={ref}>
      <h2 className="section-heading">{writing.heading}</h2>
      {writing.posts.map((post) => (
        <a
          key={post.title}
          className="writing__row"
          href={writing.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="writing__title">{post.title}</span>
          <span className="writing__meta">{post.meta}</span>
        </a>
      ))}
      <div className="footer">
        <p className="footer__cta">
          {footer.cta_line1}
          {footer.cta_line2 && (
            <>
              <br />
              {footer.cta_line2}
            </>
          )}
          <span className="accent">.</span>
        </p>
        <div className="footer__contact">
          <a href={`mailto:${footer.email}`}>{footer.email}</a>
          <div className="footer__social">
            {(social || []).map((entry) => (
              <a
                key={entry.name}
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={entry.name}
              >
                {ICONS[entry.name] || entry.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
