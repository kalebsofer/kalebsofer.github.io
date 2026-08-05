import React, { useEffect, useRef } from "react";

// Hero flow-field canvas, ported from the design handoff reference
// (reference/FlowField.jsx). The visual character depends on these exact
// constants — tune with care.

const PALETTE = {
  light: { wash: "rgba(242,240,236,0.028)", clear: "#f2f0ec", ink: "rgba(20,19,18,0.5)" },
  dark: { wash: "rgba(19,18,17,0.032)", clear: "#131211", ink: "rgba(226,222,214,0.42)" },
};

const COUNT = 460; // particles
const SPEED = 2.8; // px per frame at canvas scale (backing store is 2x)
const TIME_STEP = 0.006;
const ACCENT = "#e4572e";

export default function HeroFlowField({ theme, hero }) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0.5, y: 0.5, on: false }); // ref, not state — must not re-render

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const x = c.getContext("2d");
    const w = c.width,
      h = c.height;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = window.matchMedia("(max-width: 900px)").matches ? 200 : COUNT;

    let pts = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      life: Math.random() * 260,
    }));

    // Fresh background whenever the theme flips, otherwise the old wash persists in the trail buffer.
    const pal = PALETTE[theme] || PALETTE.light;
    x.fillStyle = pal.clear;
    x.fillRect(0, 0, w, h);

    let t = 0;
    let raf;

    const frame = () => {
      t += TIME_STEP;

      // Translucent wash over the previous frame = trails.
      x.fillStyle = pal.wash;
      x.fillRect(0, 0, w, h);

      const mx = mouse.current.x * w;
      const my = mouse.current.y * h;

      pts.forEach((p, i) => {
        // Base field: two out-of-phase sinusoids -> smooth curl.
        let a = Math.sin(p.x * 0.0035 + t) + Math.cos(p.y * 0.0045 - t * 0.55);

        // Pointer adds a rotational term that falls off with distance.
        if (mouse.current.on) {
          const dx = p.x - mx,
            dy = p.y - my,
            d2 = dx * dx + dy * dy;
          a += (46000 / (d2 + 26000)) * Math.atan2(dy, dx) * 0.55;
        }

        const nx = p.x + Math.cos(a * 2.1) * SPEED;
        const ny = p.y + Math.sin(a * 2.1) * SPEED;

        // Every 5th particle carries the accent colour.
        x.strokeStyle = i % 5 === 0 ? ACCENT : pal.ink;
        x.lineWidth = i % 5 === 0 ? 2.4 : 1.3;
        x.beginPath();
        x.moveTo(p.x, p.y);
        x.lineTo(nx, ny);
        x.stroke();

        p.life -= 1;
        if (p.life < 0 || nx < 0 || nx > w || ny < 0 || ny > h) {
          p.x = Math.random() * w;
          p.y = Math.random() * h;
          p.life = 160 + Math.random() * 260;
        } else {
          p.x = nx;
          p.y = ny;
        }
      });

      if (!reduce) raf = requestAnimationFrame(frame);
    };

    frame(); // one frame always paints (covers reduced-motion)
    return () => cancelAnimationFrame(raf);
  }, [theme]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouse.current = {
      x: (e.clientX - r.left) / r.width,
      y: (e.clientY - r.top) / r.height,
      on: true,
    };
  };

  return (
    <header className="hero">
      <canvas
        ref={canvasRef}
        className="hero__canvas"
        aria-hidden="true"
        width={2480}
        height={900}
        onMouseMove={onMove}
        onMouseLeave={() => {
          mouse.current.on = false;
        }}
      />
      <div className="hero__overlay">
        <p className="hero__availability">{hero.availability}</p>
        <h1 className="hero__headline">
          {hero.headline_line1}
          <br />
          {hero.headline_line2}
          <span className="hero__comma">,</span> {hero.headline_line3}
        </h1>
      </div>
      <span className="hero__caption">{hero.caption}</span>
    </header>
  );
}
