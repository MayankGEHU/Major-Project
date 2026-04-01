"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Protect() {
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !overlayRef.current || !textRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(overlayRef.current, { xPercent: -100 });

      gsap.to(overlayRef.current, {
        xPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            const progress = self.progress;

            const value = Math.round(255 * (1 - progress));
            const color = `rgb(${value}, ${value}, ${value})`;

            if (textRef.current) {
              textRef.current.style.color = color;
            }
          },
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[#000000f2]"></div>
      <div ref={overlayRef} className="absolute inset-0 bg-white"></div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <h1
          ref={textRef}
          className="text-white text-5xl md:text-7xl font-bold text-center leading-tight"
        >
          BE THE ONE WHO <br /> DETECTS EVERY THREAT.
        </h1>
      </div>
    </section>
  );
}