"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import localFont from "next/font/local";

const calSans = localFont({
  src: "../../../../public/fonts/CalSans-Regular.ttf", 
  weight: "400",
  display: "swap",
});

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const wordVariant = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: "blur(14px)",
    color: "#2563eb",
    textShadow: "0 0 18px rgba(37,99,235,0.9)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    color: "#ffffff",
    textShadow: "0 0 0px rgba(37,99,235,0)",
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export default function About() {
  const ref = useRef(null);

  const text = [
    "QuantumSentinel",
    "GenAI",
    "Intrusion",
    "Detection",
    "System",
    "for",
    "the",
    "Future",
    "of",
    "Cyber",
    "Security",
  ];

  return (
    <section
      ref={ref}
      className="
        relative
        min-h-screen
        bg-black
        flex
        items-center
        justify-start
        overflow-hidden
      "
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)]" />
      <div
        className="
          absolute
          top-1/2
          -right-[35%]
          -translate-y-1/2
          w-[90vw]
          h-[90vw]
          pointer-events-none
          bg-[radial-gradient(circle,rgba(37,99,235,0.18),transparent_65%)]
        "
      />

      <motion.div
        className="
          relative
          z-10
          w-full
          max-w-[1400px]
          px-6
          sm:px-10
          md:px-16
          lg:px-20
          xl:px-24
        "
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.4,
        }}
      >
        <h2
          className={`
            ${calSans.className}
            text-white
            text-left
            text-[38px]
            sm:text-[56px]
            md:text-[76px]
            lg:text-[92px]
            xl:text-[104px]
            leading-[1.05]
            tracking-tight
            font-light
          `}
        >
          {text.map((w, i) => (
            <motion.span
              key={i}
              variants={wordVariant}
              className="inline-block mr-4"
            >
              {w}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="
            mt-10
            text-sm
            sm:text-base
            text-white/60
            max-w-2xl
            text-left
          "
        >
          Invitation only access to next-generation digital assets, powered by
          intelligent security and decentralized trust.
        </motion.p>
      </motion.div>
    </section>
  );
}
