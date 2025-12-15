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

    tl.fromTo(
      nameRef.current,
      { opacity: 0, y: 30, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power2.out",
      }
    );

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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden px-4"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-pink-900/10" />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full bg-purple-500/10 blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 rounded-full bg-pink-500/10 blur-[90px] animate-pulse delay-1000" />

      {/* Title (WHITE) */}
      <h1
        ref={nameRef}
        className="
          relative
          font-display
          font-bold
          text-white
          tracking-wider
          mb-8 sm:mb-12
          text-4xl
          sm:text-6xl
          md:text-7xl
          lg:text-8xl
          text-center
        "
      >
        QuantumSentinel
      </h1>

      {/* Progress bar */}
      <div className="relative w-56 sm:w-64 md:w-80">
        <div className="relative h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="absolute left-0 top-0 h-full w-0 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #ffffff, #e5e7eb, #ffffff)",
              boxShadow: "0 0 18px rgba(255,255,255,0.6)",
            }}
          />
        </div>

        <div className="flex justify-center mt-3 sm:mt-4">
          <span
            ref={percentageRef}
            className="text-xs sm:text-sm tracking-widest text-white/80"
          >
            0%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
