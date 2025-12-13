"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import FloatingOrbs from './FloatingOrbs';
import SplineBackground from './SplineBackground';
import Link from "next/link";

const HeroSection = () => {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const decorRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
    );

    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      "-=0.5"
    );

    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.4"
    );

    tl.fromTo(
      decorRef.current?.querySelectorAll(".decor-line"),
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.1 },
      "-=0.4"
    );

    return () => tl.kill();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-start overflow-hidden"
    >
      {/* Spline Background */}
      <SplineBackground />

      {/* Floating Orbs */}
      <FloatingOrbs />

      <div className="absolute inset-0 atmospheric-light pointer-events-none z-10" />
      <div className="absolute inset-0 scanlines pointer-events-none z-20 opacity-30" />

      {/* Content */}
      <div className="relative z-30 container mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl">
          
          {/* Decorative lines */}
          <div ref={decorRef} className="mb-8">
            <div className="decor-line h-px w-24 bg-gradient-to-r from-primary via-accent to-transparent origin-left" />
            <div className="decor-line h-px w-16 bg-gradient-to-r from-secondary to-transparent origin-left mt-2 ml-4" />
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-white"
            style={{ opacity: 0 }}
          >
            <span className="block text-white">QuantumSentinel</span>
            <span className="block text-white/80 text-3xl sm:text-4xl md:text-5xl mt-4">
              Intrution Detection System
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-white/70 max-w-xl mb-10 leading-relaxed"
            style={{ opacity: 0 }}
          >
            Used by next-generation cyber platforms, this system enables you to detect{" "}
            <span className="text-white font-semibold">real-time security threats</span>{" "}
            with adaptive intelligence powered by Generative AI.
          </p>

          {/* LEFT-ALIGNED BUTTON (FIXED) */}
          <div className="mt-10">
            <Link
              href="/mlmodel"
              ref={ctaRef}
              style={{ opacity: 0 }}
              className="
                relative 
                px-12 py-4 
                rounded-2xl 
                text-white 
                font-semibold 
                text-xl
                border 
                border-white/80 
                backdrop-blur-md
                bg-black/30
                transition-all 
                duration-300 
                hover:border-white 
                hover:bg-black/50
                hover:shadow-[0_0_35px_rgba(200,150,255,0.9)]
              "
            >
              Get Started
            </Link>
          </div>

        </div>
      </div>

      {/* Corner frames */}
{/* TOP LEFT */}
<div className="absolute top-8 left-8 w-16 h-16 pointer-events-none">
  <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500" />
  <span className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500" />
</div>

{/* TOP RIGHT */}
<div className="absolute top-8 right-8 w-16 h-16 pointer-events-none">
  <span className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-purple-500 via-pink-500 to-blue-500" />
  <span className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500" />
</div>

{/* BOTTOM LEFT */}
<div className="absolute bottom-8 left-8 w-16 h-16 pointer-events-none">
  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500" />
  <span className="absolute bottom-0 left-0 w-[2px] h-full bg-gradient-to-t from-purple-500 via-pink-500 to-blue-500" />
</div>

{/* BOTTOM RIGHT */}
<div className="absolute bottom-8 right-8 w-16 h-16 pointer-events-none">
  <span className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-purple-500 via-pink-500 to-blue-500" />
  <span className="absolute bottom-0 right-0 w-[2px] h-full bg-gradient-to-t from-purple-500 via-pink-500 to-blue-500" />
</div>


      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-30 pointer-events-none" />
    </section>
  );
};

export default HeroSection;
