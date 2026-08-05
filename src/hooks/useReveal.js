import { useEffect, useRef } from "react";

// Scroll-reveal: adds .rv-in when the element enters the viewport (~7% threshold).
// Skipped under prefers-reduced-motion; a safety sweep reveals everything after a
// few seconds so content is never stuck hidden.
export default function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      el.classList.add("rv-in");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("rv-in");
          observer.disconnect();
        }
      },
      { threshold: 0.07 }
    );
    observer.observe(el);

    const sweep = setTimeout(() => el.classList.add("rv-in"), 4000);

    return () => {
      observer.disconnect();
      clearTimeout(sweep);
    };
  }, []);

  return ref;
}
