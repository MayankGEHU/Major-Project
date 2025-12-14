"use client";
import Link from "next/link";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center text-white overflow-hidden">
      {/* BACKGROUND DECOR */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-140px] left-[-140px] w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full border border-white/15" />
        <div className="absolute bottom-[-140px] right-[-140px] w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full border border-white/15" />
      </div>

      {/* CONTENT */}
      <div className="relative w-full max-w-5xl px-4 sm:px-6 pt-24 pb-20 text-center">
        {/* VERTICAL GRID LINES (HIDDEN ON MOBILE) */}
        <div className="hidden md:block absolute top-0 bottom-0 left-0 border-l border-dashed border-white/30" />
        <div className="hidden md:block absolute top-0 bottom-0 right-0 border-l border-dashed border-white/30" />

        {/* TOP LINE */}
        <div className="relative mb-6">
          <div className="mx-auto w-full md:w-[70vw] border-b border-dashed border-white/30" />
        </div>

        {/* HEADING */}
        <h1
          className={`
            ${geist.className}
            text-[38px]
            sm:text-[52px]
            md:text-[64px]
            lg:text-[74px]
            leading-[1.1]
            font-semibold
            text-[rgb(237,237,237)]
            mb-6
          `}
        >
          QuantumSentinel IDS
        </h1>

        {/* LINE */}
        <div className="relative mb-8">
          <div className="mx-auto w-full md:w-[70vw] border-b border-dashed border-white/30" />
        </div>

        {/* SUBHEADING */}
        <p
          className="
            text-[16px]
            sm:text-[18px]
            md:text-[20px]
            leading-[28px]
            sm:leading-[32px]
            md:leading-[36px]
            text-[rgb(136,136,136)]
            max-w-3xl
            mx-auto
            mb-10
          "
        >
          Used by next-generation cyber platforms, this system enables you to
          detect{" "}
          <span className="text-white font-semibold">
            real-time security threats
          </span>{" "}
          with adaptive intelligence powered by Generative AI.
        </p>

        {/* LINE */}
        <div className="relative mb-10">
          <div className="mx-auto w-full md:w-[70vw] border-b border-dashed border-white/30" />
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-10">
          <Link
            href="/mlmodel"
            className="
              w-full sm:w-auto
              px-8 py-3
              rounded-lg
              bg-white
              text-black
              font-semibold
              text-base sm:text-lg
              transition
              hover:bg-gray-200
            "
          >
            Get Started
          </Link>

          <Link
            href="/learn"
            className="
              w-full sm:w-auto
              px-8 py-3
              rounded-lg
              border border-gray-600
              text-gray-300
              font-semibold
              text-base sm:text-lg
              transition
              hover:border-gray-300
              hover:text-white
            "
          >
            Learn More
          </Link>
        </div>

        {/* FOOTNOTE */}
        <p className="text-gray-500 mt-6 text-sm">
          ~ AI-IDS • powered by Generative Intelligence
        </p>

        {/* FOOTER LINE */}
        <div className="relative mt-8">
          <div className="mx-auto w-full md:w-[70vw] border-b border-dashed border-white/30" />
        </div>
      </div>
    </section>
  );
}
