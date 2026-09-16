import React, { useState } from "react";

export default function Nav({ nav, lang, onPickLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const cvHref = `${process.env.PUBLIC_URL}/docs/KSoferCV.pdf`;

  const links = nav.links.map((link) => (
    <a key={link.target} href={`#${link.target}`} onClick={() => setMenuOpen(false)}>
      {link.label}
    </a>
  ));

  const langSwitch = (
    <span className="nav__lang">
      <button
        type="button"
        className={lang === "en" ? "is-active" : ""}
        onClick={() => onPickLang("en")}
      >
        EN
      </button>
      <span className="nav__lang-sep">/</span>
      <button
        type="button"
        className={lang === "es" ? "is-active" : ""}
        onClick={() => onPickLang("es")}
      >
        ES
      </button>
    </span>
  );

  return (
    <nav className="nav">
      <span className="nav__logo">
        KALEB SOFER<span className="accent">.</span>
      </span>

      <div className="nav__links">
        {links}
        {langSwitch}
        <a className="pill pill--invert" href={cvHref} download>
          {nav.cv}
        </a>
      </div>

      <button
        type="button"
        className="nav__menu-btn"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? nav.close : nav.menu}
      </button>

      {menuOpen && (
        <div className="nav__sheet">
          {links}
          <div className="nav__sheet-row">
            {langSwitch}
            <a className="pill pill--invert" href={cvHref} download onClick={() => setMenuOpen(false)}>
              {nav.cv}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
