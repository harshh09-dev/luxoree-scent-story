import { useEffect, useRef } from "react";

export function GrainAndCursorLight() {
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          if (lightRef.current) {
            lightRef.current.style.transform = `translate(${x - 250}px, ${y - 250}px)`;
          }
          raf = 0;
        });
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={lightRef} className="cursor-light hidden md:block" aria-hidden />
      <div className="grain" aria-hidden />
    </>
  );
}
