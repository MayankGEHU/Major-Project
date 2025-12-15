"use client";

import localFont from "next/font/local";

const freshmanFont = localFont({
  src: "../../../../public/fonts/CalSans-Regular.ttf",
  weight: "800",
  display: "swap",
});

export default function Footer() {
  return (
    <footer className="relative w-full min-h-screen bg-black text-white overflow-hidden">

      {/* ✨ ONLY GLOW OVERLAY */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute
            top-[-30%]
            left-[-20%]
            w-[90vw]
            h-[90vw]
            rounded-full
             bg-[radial-gradient(circle,rgba(37,99,235,0.18),transparent_65%)]
          "
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen px-6 md:px-12 py-10">

        {/* MAIN LOGO */}
        <div className="flex justify-center items-center flex-1">
          <h1
            className={`
              ${freshmanFont.className}
              text-[10vw]
              leading-none
              tracking-tight
              relative
            `}
          >
            QuantumSentinel
            <span className="absolute -top-[12%] -right-[6%] text-[3vw]">®</span>
          </h1>
        </div>

        {/* SUBSCRIBE */}
        <div className="text-center max-w-xl mx-auto">
          <p className="text-sm md:text-base opacity-80 leading-relaxed">
            Stay ahead of threats. Get early access to QuantumSentinel updates,
            intelligent intrusion detection insights, and the latest innovations
            in AI-powered cybersecurity. Subscribe to our newsletter.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Your email"
              className="
                bg-transparent
                outline-none
                text-white
                placeholder-white/70
                italic
                text-sm
                w-48
                text-center
                caret-white
              "
            />
            <button
              type="submit"
              className="text-xl hover:translate-x-1 transition-transform duration-200"
            >
              →
            </button>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex justify-between items-end text-xs opacity-80 mt-16">
          <div>
            <p className="italic">(socials)</p>
            <p className="mt-1">IG &nbsp; VI &nbsp; FB</p>
          </div>

          <div className="text-center">
            <p>2025 © QuantumSentinel. All rights reserved.</p>
          </div>

          <div className="text-right">
            <p className="italic">(contact)</p>
            <p className="mt-1">INFO@QuantumSentinel.com</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
