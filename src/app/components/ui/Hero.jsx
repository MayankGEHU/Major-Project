
"use client";
import Link from "next/link";
import { Geist } from "next/font/google";
import GetStatButton from "./herobuttons/GetStatButton";
import LearnMoreButton from "./herobuttons/LearnMoreButton";

import PageTransition from "../transition/PageTransition";

const geist = Geist({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Hero() {
  return (
          <section className="relative min-h-screen flex items-center text-white overflow-hidden">
      
      <video
        className="
          absolute inset-0 
          w-full h-full 
          object-cover 
          sm:w-[110%] 
          sm:translate-x-[6%] 
          z-0
        "
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="relative z-20 w-full max-w-7xl px-5 sm:px-6 md:px-12 pt-24 sm:pt-28 pb-20 sm:pb-24">
        <div className="max-w-[620px]">
          
          <h1
            className={`
              ${geist.className}
              text-[32px]
              sm:text-[38px]
              md:text-[62px]
              lg:text-[72px]
              leading-[1.08]
              font-semibold
              text-[rgb(237,237,237)]
              mb-5 sm:mb-6
            `}
          >
            QuantumSentinel
          </h1>

          <p className="text-[15px] sm:text-[16px] md:text-[19px] leading-[28px] md:leading-[34px] text-[rgb(185,185,185)] mb-8 sm:mb-12">
            Used by next-generation cyber platforms, this system enables you to
            detect{" "}
            <span className="text-blue font-semibold">
              real-time security threats
            </span>{" "}
            with adaptive intelligence powered by Generative AI.
          </p>

          <div className="flex flex-row sm:flex-row items-center gap-3 sm:gap-6">
            <Link
              href="/mlmodel"
              className="
                flex-1 sm:flex-none
                text-center
                px-4 sm:px-8
                py-3
                rounded-lg
                bg-white
                text-black
                font-semibold
                text-sm sm:text-lg
                transition
                hover:bg-gray-200
              "
            >
              Get Started
            </Link>

            {/* <GetStatButton/> */}

            <Link
              href="/learn"
              className="
                flex-1 sm:flex-none
                text-center
                px-4 sm:px-8
                py-3
                rounded-lg
                border border-gray-600
                text-gray-300
                font-semibold
                text-sm sm:text-lg
                transition
                hover:border-gray-300 hover:text-white
              "
            >
              Learn More
            </Link>

            {/* <LearnMoreButton/> */}
          </div>

          <p className="text-gray-400 mt-6 text-sm flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-800 opacity-70"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-800"></span>
            </span>
            Powered by Generative Intelligence
          </p>

        </div>
      </div>
    </section>
  );
}
