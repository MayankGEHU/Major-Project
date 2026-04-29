
"use client";

import { useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "About us", href: "/learn" },
  ];

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-transparent text-white">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <h1 className="text-lg font-semibold">
          Gen AI Based IDS
        </h1>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative group"
            >
              {item.name}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex">
          <Link
            href="/login"
            className="px-4 py-1 rounded-lg bg-white text-black hover:bg-gray-200 transition"
          >
            Login
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-[5px]"
        >
          <span
            className={`h-[2px] w-6 bg-white transition ${
              open ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-white transition ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-white transition ${
              open ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-black/90 backdrop-blur-md transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center gap-6 py-8 text-sm font-medium">
          {links.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="relative group"
            >
              {item.name}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="px-6 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}