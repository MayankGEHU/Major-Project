"use client";

import React from "react";
import Nav from "./components/ui/Nav";
import Hero from "./components/ui/Hero";
import About from "./components/ui/About";
import Features from "./components/ui/Features";
import OurQuality from "./components/ui/OurQuality";
import Experience from "./components/experience/Experience";
import Working from "./components/ui/Working";
import Footer from "./components/ui/Footer";

import ReactLenis from "lenis/react";

export default function Page() {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
      }}
    >
      <Nav />

      <section id="hero">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="features">
        <Features />
      </section>

      <section id="quality">
        <OurQuality />
      </section>

      <section id="experience">
        <Experience />
      </section>

      <section id="working">
        <Working />
      </section>

      {/* Sticky Footer Section */}
      <div
        className="relative h-[800px]"
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      >
        <div className="relative h-[calc(100vh+800px)] -top-[100vh]">
          <div className="sticky top-[calc(100vh-800px)] h-[800px]">
            <Footer />
          </div>
        </div>
      </div>
    </ReactLenis>
  );
}
