// "use client";

// import { useState } from "react";
// import Link from "next/link";

// export default function Nav() {
//   const [open, setOpen] = useState(false);

//   const links = [
//     { name: "Home", href: "/" },
//     { name: "About", href: "/learn" },
//     { name: "Dashboard", href: "/dashboard" },
//   ];

//   return (
//     <nav className="fixed top-0 left-0 z-50 w-full bg-black text-white border-b border-white/10">
//       <div className="h-20 flex items-center">

//         {/* LOGO */}
//         <div className="h-full px-8 flex items-center border-r border-white/10">
//           <h1 className="text-base font-semibold tracking-wide uppercase">
//             QuantumSentinel
//           </h1>
//         </div>

//         {/* NAV LINKS */}
//         <div className="hidden md:flex flex-1 h-full items-center justify-center gap-12 text-sm uppercase tracking-widest">
//           {links.map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               className="relative text-gray-300 hover:text-white transition"
//             >
//               {item.name}
//               <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
//             </Link>
//           ))}
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="hidden md:flex h-full items-center">
//           <Link
//             href="/login"
//             className="h-full px-8 flex items-center border-l border-white/10 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition"
//           >
//             Login
//           </Link>
//         </div>

//         {/* MOBILE MENU BUTTON */}
//         <button
//           onClick={() => setOpen(!open)}
//           className="ml-auto mr-6 md:hidden flex flex-col gap-1"
//         >
//           <span
//             className={`h-[2px] w-7 bg-white transition ${
//               open ? "rotate-45 translate-y-[7px]" : ""
//             }`}
//           />
//           <span
//             className={`h-[2px] w-7 bg-white transition ${
//               open ? "opacity-0" : ""
//             }`}
//           />
//           <span
//             className={`h-[2px] w-7 bg-white transition ${
//               open ? "-rotate-45 -translate-y-[7px]" : ""
//             }`}
//           />
//         </button>
//       </div>

//       {/* MOBILE MENU */}
//       <div
//         className={`md:hidden absolute top-20 left-0 w-full bg-black border-t border-white/10 transition-all duration-300 ${
//           open ? "opacity-100 visible" : "opacity-0 invisible"
//         }`}
//       >
//         <div className="flex flex-col items-center py-10 gap-6 text-sm uppercase tracking-widest">
//           {links.map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               onClick={() => setOpen(false)}
//               className="text-gray-300 hover:text-white transition"
//             >
//               {item.name}
//             </Link>
//           ))}

//           <Link
//             href="/login"
//             onClick={() => setOpen(false)}
//             className="mt-4 px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition"
//           >
//             Login
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }


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
          QuantumSentinel IDS
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