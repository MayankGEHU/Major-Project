// "use client";
// import Link from "next/link";
// import { Geist } from "next/font/google";


// const geist = Geist({
//   subsets: ["latin"],
//   weight: ["600"],
// });

// export default function Hero() {
//   return (
//     <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden bg-black">
      
//       {/* VIDEO BACKGROUND */}
//  <video
//   className="absolute inset-0 w-full h-full object-cover z-0"
//   src="/hero.mp4"
//   autoPlay
//   loop
//   muted
//   playsInline
// />


//       {/* DARK OVERLAY */}
//       <div className="absolute inset-0 bg-black/60 z-10" />

//       {/* BACKGROUND DECOR */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
//         <div className="absolute top-[-160px] left-[-160px] w-[320px] h-[320px] rounded-full border border-white/15" />
//         <div className="absolute bottom-[-160px] right-[-160px] w-[320px] h-[320px] rounded-full border border-white/15" />
//       </div>

//       {/* CONTENT */}
//       <div className="relative z-30 w-full max-w-6xl px-6 pt-28 pb-24 text-center">
        
//         {/* VERTICAL GRID LINES */}
//         <div className="hidden lg:block absolute top-15 bottom-12 left-[8%] border-l border-dashed border-white/30" />
//         <div className="hidden lg:block absolute top-15 bottom-12 right-[8%] border-l border-dashed border-white/30" />

//         {/* TOP LINE */}
//         <div className="relative mb-8">
//           <div className="mx-auto w-[97%] border-b border-dashed border-white/30" />
//         </div>

//         {/* HEADING */}
//         <h1
//           className={`
//             ${geist.className}
//             text-[40px]
//             sm:text-[52px]
//             md:text-[64px]
//             lg:text-[74px]
//             leading-tight
//             font-semibold
//             text-[rgb(237,237,237)]
//             mb-6
//           `}
//         >
//           QuantumSentinel IDS
//         </h1>

//         {/* LINE */}
//         <div className="relative mb-10">
//           <div className="mx-auto w-[97%] border-b border-dashed border-white/30" />
//         </div>

//         {/* SUBTEXT */}
//         <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-[30px] md:leading-[36px] text-[rgb(136,136,136)] max-w-3xl mx-auto mb-12">
//           Used by next-generation cyber platforms, this system enables you to
//           detect{" "}
//           <span className="text-white font-semibold">
//             real-time security threats
//           </span>{" "}
//           with adaptive intelligence powered by Generative AI.
//         </p>

//         {/* LINE */}
//         <div className="relative mb-12">
//           <div className="mx-auto w-[97%] border-b border-dashed border-white/30" />
//         </div>

//         {/* BUTTONS */}
//         <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
//           <Link
//             href="/mlmodel"
//             className="px-8 py-3 rounded-lg bg-white text-black font-semibold text-base sm:text-lg transition hover:bg-gray-200"
//           >
//             Get Started
//           </Link>

//           <Link
//             href="/learn"
//             className="px-8 py-3 rounded-lg border border-gray-600 text-gray-300 font-semibold text-base sm:text-lg transition hover:border-gray-300 hover:text-white"
//           >
//             Learn More
//           </Link>
//         </div>

//         {/* FOOTNOTE */}
//         <p className="text-gray-500 mt-6 text-sm">
//           ~ AI-IDS • powered by Generative Intelligence
//         </p>

//         {/* BOTTOM LINE */}
//         <div className="relative mt-10">
//           <div className="mx-auto w-[97%] border-b border-dashed border-white/30" />
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";
import Link from "next/link";
import { Geist } from "next/font/google";
import SignupButton from "./SignupButton";

const geist = Geist({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center text-white overflow-hidden bg-black">
      
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

      <div className="absolute inset-0 bg-black/60 z-10" />

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
