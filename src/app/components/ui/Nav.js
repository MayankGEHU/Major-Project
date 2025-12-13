"use client";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50">
      {/* Glass Layer */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 h-16 flex items-center justify-between text-white">

        {/* LEFT — Logo */}
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold tracking-wide">
            QuantumSentinel IDS
          </h1>
        </div>

        {/* CENTER — Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {["Home", "Dashboard", "About us"].map((item) => (
            <Link
              key={item}
              href="#"
              className="relative group text-white/90 hover:text-white transition"
            >
              {item}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          <Link
            href="/login"
            className="relative group text-white/90 hover:text-white transition"
          >
            Login
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        {/* RIGHT — Buttons */}
        <div className="flex items-center gap-4">
          <button className="px-4 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:shadow-[0_0_12px_rgba(255,255,255,0.3)] transition">
            Start
          </button>

          <button className="px-4 py-1.5 rounded-lg bg-white text-black hover:bg-gray-200 hover:shadow-[0_0_14px_rgba(255,255,255,0.6)] transition">
            Learn
          </button>
        </div>

      </div>
    </nav>
  );
}
