import React from "react";

// Two counter-rotating rows on desktop; the second row is hidden on mobile.
// Each half of the 200%-wide track repeats the phrase so the -50% translate loops seamlessly.
export default function Marquee({ text }) {
  const chunk = text + text;
  return (
    <div className="marquee band-invert" aria-hidden="true">
      <div className="marquee__row marquee__row--one">
        <span>{chunk}</span>
        <span>{chunk}</span>
      </div>
      <div className="marquee__row marquee__row--two">
        <span>{chunk}</span>
        <span>{chunk}</span>
      </div>
    </div>
  );
}
