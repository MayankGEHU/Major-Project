"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./experience.module.css";

import localFont from "next/font/local";

const calSans = localFont({
  src: "../../../../public/fonts/CalSans-Regular.ttf",
  weight: "400",
  display: "swap",
});

export default function Experience() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(textRef.current, {
      xPercent: -342,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
        // markers: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.experience}>
      <h2
        ref={textRef}
        className={`${styles.text} ${calSans.className}`}
      >
        Understanding Instructions with Gen-AI
      </h2>
    </section>
  );
}

// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import styles from "./experience.module.css";
// import localFont from "next/font/local";

// const freshmanFont = localFont({
//   src: "../../../../public/fonts/CalSans-Regular.ttf",
//   weight: "800",
//   display: "swap",
// });

// export default function Experience() {
//   const sectionRef = useRef(null);
//   const textRef = useRef(null);

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     const textEl = textRef.current;
//     const sectionEl = sectionRef.current;

//     const scrollWidth = textEl.scrollWidth;
//     const viewportWidth = window.innerWidth;

//     const ctx = gsap.context(() => {
//       gsap.to(textEl, {
//         x: -(scrollWidth - viewportWidth),
//         ease: "none",
//         scrollTrigger: {
//           trigger: sectionEl,
//           start: "top top",
//           end: () => `+=${scrollWidth * 1.15}`, 
//           scrub: 1.3, 
//           pin: true,
//           anticipatePin: 1,
//         },
//       });
//     }, sectionEl);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section ref={sectionRef} className={styles.experience}>
//       <h2
//         ref={textRef}
//         className={`${styles.text} ${freshmanFont.className}`}
//       >
//         Understanding Instructions with Gen-AI
//       </h2>
//     </section>
//   );
// }
