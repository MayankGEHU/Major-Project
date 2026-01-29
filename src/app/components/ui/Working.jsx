"use client";

import localFont from "next/font/local";

const fellixNumber = localFont({
  src: "../../../../public/fonts/Fellix-Medium.ttf",
  weight: "500",
  style: "normal",
});

const fellixText = localFont({
  src: "../../../../public/fonts/Fellix-Regular.ttf",
  weight: "400",
  style: "normal",
});

const calSans = localFont({
  src: "../../../../public/fonts/Fellix-Medium.ttf",
  weight: "400",
  style: "normal",
});

export default function Working() {
  return (
    <section className="relative w-full bg-black text-white pt-40 pb-56 overflow-hidden">
      <div
        className="
            absolute
            -top-[220%]
            w-[1000px]
            h-[1000px]
            rounded-full
            bg-[radial-gradient(circle,rgba(37,99,235,0.22),transparent_65%)]
            blur-[2px]
            z-0
          "
      />
      <h2
        className={`
  ${calSans.className}
  relative z-10
  text-center
  text-[61px]
  leading-[60px]
  text-white
  mb-40
  [text-shadow:1px_0_0_white,_-1px_0_0_white,_0_1px_0_white,_0_-1px_0_white]
`}

      >
        From Detection <br /> to Defense.
      </h2>

      <div className="relative max-w-[1600px] mx-auto px-24">

        <div className="absolute left-0 right-0 top-[96px] border-t border-dashed border-white/20 z-20" />

        <div className="grid grid-cols-4 gap-28">

          {[
            {
              num: "01",
              title: "Monitoring",
              text: "Continuously observes network traffic, system logs, and user behavior in real time.",
              icon: (
                <>
                  <circle cx="9" cy="9" r="7" />
                  <line x1="9" y1="2" x2="9" y2="16" />
                  <line x1="2" y1="9" x2="16" y2="9" />
                </>
              ),
            },
            {
              num: "02",
              title: "Context Building",
              text: "Transforms raw activity into meaningful patterns using behavioral baselines and context.",
              icon: (
                <path d="M9 2v14M2 9h14M4 4l10 10M14 4L4 14" />
              ),
            },
            {
              num: "03",
              title: "Threat Detection",
              text: "Generative AI identifies anomalies, zero-day threats, and malicious intent with precision.",
              icon: (
                <path d="M3 9h12M6 6l-3 3 3 3M12 6l3 3-3 3" />
              ),
            },
            {
              num: "04",
              title: "Adaptive Response",
              text: "Triggers intelligent alerts, automated mitigation, and continuously learns from attacks.",
              icon: (
                <>
                  <path d="M3 15V3M3 15c5-6 9-6 14-11" />
                  <path d="M13 3h4v4" />
                </>
              ),
            },
          ].map((step, i) => (
            <div key={i} className="relative">

              <div className="absolute top-0 left-0 h-[96px] overflow-hidden pointer-events-none">
                <span
                  className={`
                    ${fellixNumber.className}
                    block
                    text-[176px]
                    leading-[176px]
                    font-medium
                    text-[rgb(20,20,20)]
                  `}
                >
                  {step.num}
                </span>
              </div>

              <div className="absolute top-[112px] left-0 z-30">
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.4"
                >
                  {step.icon}
                </svg>
              </div>

              <div className="pt-48">
                <h3
                  className={`
                    ${fellixText.className}
                    text-[32px]
                    leading-[35px]
                    font-normal
                    text-white
                    mb-6
                  `}
                >
                  {step.title}
                </h3>

                <p
                  className={`
                    ${fellixText.className}
                    text-[26px]
                    leading-[38px]
                    font-normal
                    text-[rgba(255,255,255,0.55)]
                    max-w-[420px]
                  `}
                >
                  {step.text}
                </p>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
