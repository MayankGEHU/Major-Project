"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const progressBarRef = useRef(null);
  const percentageRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(preloaderRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            if (preloaderRef.current) {
              preloaderRef.current.style.display = "none";
            }
            onComplete && onComplete();
          },
        });
      },
    });

    // Name animation
    tl.fromTo(
      nameRef.current,
      { opacity: 0, y: 30, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }
    );

    // Progress bar animation
    tl.to(
      progressBarRef.current,
      {
        width: "100%",
        duration: 2,
        ease: "power2.out",
        onUpdate: function () {
          if (percentageRef.current) {
            const progress = Math.round(this.progress() * 100);
            percentageRef.current.textContent = `${progress}%`;
          }
        },
      },
      "-=0.4"
    );

    // Percentage fade out
    tl.to(percentageRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.3,
      ease: "power2.in",
    });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      {/* Subtle atmospheric overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-pink-900/10" />

      {/* Floating glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-purple-500/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-pink-500/10 blur-[100px] animate-pulse delay-1000" />

      {/* Project Name */}
      <h1
        ref={nameRef}
        className="relative font-display text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-12 tracking-wider"
      >
        QuantumSentinel
      </h1>

      {/* Progress Section */}
      <div className="relative w-64 md:w-80">
        <div className="relative h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="absolute left-0 top-0 h-full w-0 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #a855f7, #ec4899, #3b82f6)",
              boxShadow: "0 0 20px rgba(168,85,247,0.6)",
            }}
          />
        </div>

        <div className="flex justify-center mt-4">
          <span
            ref={percentageRef}
            className="text-sm tracking-widest text-white/70"
          >
            0%
          </span>
        </div>
      </div>

      {/* Corner Decorations */}
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

    </div>
  );
};

export default Preloader;
