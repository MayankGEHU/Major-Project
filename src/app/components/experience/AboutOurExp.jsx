"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./aboutOurExp.module.css";

import PulseBeamsFirstDemo from "./PulseBeamsFirstDemo";

gsap.registerPlugin(ScrollTrigger);

export default function AboutOurExp() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const scrollTextRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollText = scrollTextRef.current;

    if (!container) return;

    const totalScroll = container.scrollWidth - window.innerWidth;

    const scrollTween = gsap.to(container, {
      x: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${totalScroll}`,
        scrub: true,
        pin: true,
      },
    });

    gsap.to(scrollText, {
      opacity: 1,
      x: 0,
      scrollTrigger: {
        trigger: scrollText,
        containerAnimation: scrollTween,
        start: "left 100%",
        end: "center 70%",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <section ref={sectionRef} className={styles.scrollSection}>
        <div ref={containerRef} className={styles.cardContainer}>

          <div className={styles.heading}>
            <div className={styles.pillWrapper}>
              <div className={`${styles.pill} ${styles.pillTop}`}>
                Threat Intelligence
              </div>
              <div className={`${styles.pill} ${styles.pillBottom}`}>
                That's right, Anything
              </div>
            </div>

            <p className={styles.headingDesc}>
              QuantumSentinel is an intelligent security system enabling real-time
              monitoring, anomaly detection, and proactive, reliable threat prevention.
            </p>
          </div>

          {/* 🔥 REPLACED IMAGE CARD WITH PULSE BEAMS */}
          <div className={styles.card}>
            <PulseBeamsFirstDemo />
          </div>

          <div ref={scrollTextRef} className={styles.scrollText}>
            QuantumSentinel is a smart security system that monitors behavior,
            detects anomalies in real time, and prevents potential threats.
          </div>

        </div>
      </section>
    </div>
  );
}
