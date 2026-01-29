import React from "react";
import Nav from "./components/ui/Nav";
import Hero from "./components/ui/Hero";
import About from "./components/ui/About";
import Features from "./components/ui/Features";
import OurQuality from "./components/ui/OurQuality";
import Experience from "./components/experience/Experience";
import Working from "./components/ui/Working";
import Footer from "./components/ui/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Features />
      <OurQuality />
      <Experience />
      <Working />

      {/* Sticky reveal footer (layout only) */}
      <div
        className="relative h-[800px]"
        style={{ clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)" }}
      >
        <div className="relative h-[calc(100vh+800px)] -top-[100vh]">
          <div className="sticky top-[calc(100vh-800px)] h-[800px]">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
