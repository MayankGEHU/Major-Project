"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import localFont from "next/font/local";

import PageTransition from "../transition/PageTransition";

const calSans = localFont({
    src: "../../../../public/fonts/Fellix-Medium.ttf",
    weight: "400",
    style: "normal",
});

const DATA = [
{
  title: "#1 Who we are",
  paragraph:
    "QuantumSentinel IDS is a forward-looking cybersecurity initiative focused on building an intelligent and reliable Intrusion Detection System. We are a team driven by curiosity, innovation, and a strong interest in secure system design. This major project is aimed at detecting, analyzing, and responding to suspicious network activities in real time using modern computing and security principles. QuantumSentinel IDS emphasizes accuracy, scalability, and performance, ensuring robust protection against evolving cyber threats. Through this project, we aim to bridge theoretical knowledge with practical implementation, delivering a solution that reflects industry-relevant security practices and a deep understanding of network defense mechanisms.",
  codeTitle: "// Support",
  code: 'const support = "24/7 Help";',
},
{
  title: "#2 About the Project",
  paragraph:
    "QuantumSentinel IDS is a next-generation intrusion detection system designed to identify, analyze, and respond to malicious activities in real time. The system leverages machine learning models to detect anomalies in network traffic and combines them with rule-based detection to ensure high accuracy. QuantumSentinel IDS is built to scale across modern cloud and on-premise infrastructures while maintaining low latency and high throughput.",
  codeTitle: "// Services",
  code: 'const services = "Security & AI";',
},
{
  title: "#3 How QuantumSentinel IDS Works",
  paragraph:
    "QuantumSentinel IDS continuously monitors incoming and outgoing network traffic. First, raw packets are collected and preprocessed to extract meaningful features. These features are passed through trained ML models that detect abnormal patterns indicative of potential intrusions. Simultaneously, signature-based rules validate known attack vectors. The system then correlates results, assigns a threat score, and triggers alerts or automated responses, ensuring fast and reliable protection against cyber threats.",
  codeTitle: "// Mission",
  code: 'const mission = "Create Impact";',
},
];

export default function LearnMore() {
    const [active, setActive] = useState(0);
    const [scrollX, setScrollX] = useState(0);
    const refs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActive(Number(entry.target.dataset.index));
                    }
                });
            },
            { threshold: 0.6 }
        );

        refs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight =
                document.body.scrollHeight - window.innerHeight;

            const progress = scrollTop / docHeight;
            setScrollX(progress * 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
       <PageTransition>
         <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
            {/* RIGHT BOTTOM PANEL */}
            <div className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 w-[260px] lg:w-[300px] z-50">
                <div className="bg-[#0b0b0b] rounded-lg px-3 py-3 shadow-lg">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-white/40">
                            {DATA[active].codeTitle}
                        </span>
                        <span className="text-white/30 text-xs">⧉</span>
                    </div>

                    <pre className="text-xs lg:text-sm font-mono">
                        <span className="text-[#2563eb]">const</span>{" "}
                        <span className="text-white">
                            {DATA[active].code.split(" ")[1]}
                        </span>{" "}
                        <span className="text-white/50">=</span>{" "}
                        <span className="text-white">
                            {DATA[active].code.split("=")[1]}
                        </span>
                    </pre>
                </div>

                {/* BAR */}
                <div className="mt-2 bg-[#0b0b0b] rounded-lg h-8 relative overflow-hidden px-2">
                    <div className="absolute inset-0 flex items-center justify-between">
                        {Array.from({ length: 24 }).map((_, i) => (
                            <div key={i} className="w-[1px] h-2 bg-white/20" />
                        ))}
                    </div>

                    <motion.div
                        className="absolute top-1/2 -translate-y-1/2 h-4 w-[4px] rounded-full bg-[#2563eb]"
                        animate={{ left: `${scrollX}%` }}
                        transition={{ ease: "linear", duration: 0.1 }}
                    />
                </div>
            </div>

            {/* LEFT CONTENT */}
            <div className="max-w-screen-lg xl:max-w-3xl mt-20 mx-auto px-6">
                {DATA.map((item, index) => (
                    <section
                        key={index}
                        ref={(el) => (refs.current[index] = el)}
                        data-index={index}
                        className="min-h-[65vh] lg:min-h-[70vh] pt-12 flex flex-col justify-center"
                    >
                        <h2 className="text-xl lg:text-2xl font-semibold text-white/60 mb-4">
                            {item.title}
                        </h2>

                        <p
                            className={`${calSans.className} text-white/30 leading-relaxed text-base lg:text-lg text-justify`}
                        >
                            {item.paragraph.repeat(2)}
                        </p>
                    </section>
                ))}
            </div>
        </div>
       </PageTransition>
    );
}
