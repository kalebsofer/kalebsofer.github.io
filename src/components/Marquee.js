import React from "react";

// Two counter-rotating rows on desktop (tools on top, capabilities beneath);
// the second row is hidden on mobile. Each half of the 200%-wide track repeats
// the phrase so the -50% translate loops seamlessly.
export default function Marquee({ rows }) {
  return (
    <div className="marquee band-invert" aria-hidden="true">
      {rows.map((text, i) => {
        const chunk = text + text;
        return (
          <div key={text} className={`marquee__row marquee__row--${i === 0 ? "one" : "two"}`}>
            <span>{chunk}</span>
            <span>{chunk}</span>
          </div>
        );
      })}
    </div>
  );
}
