"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "What exactly does Quantsential IDS do?",
    answer:
      "Quantsential uses Generative AI and advanced machine learning models to detect, analyze, and predict cyber threats in real time. It goes beyond traditional rule-based detection by learning evolving attack patterns automatically.",
  },
  {
    question: "How is it different from traditional IDS systems?",
    answer:
      "Unlike signature or rule-based intrusion detection systems, Quantsential continuously learns from network behavior and adapts to new threats. This allows it to detect zero-day attacks, unknown vulnerabilities, and sophisticated intrusion patterns.",
  },
  {
    question: "Can it work with existing security infrastructure?",
    answer:
      "Yes, Quantsential is designed to integrate seamlessly with existing firewalls, SIEM tools, and monitoring systems. It acts as an intelligent layer that enhances current security pipelines without requiring major infrastructure changes.",
  },
  {
    question: "Does Quantsential generate real-time alerts?",
    answer:
      "Yes, the system provides real-time alerts and threat classification. It prioritizes security risks using AI-driven scoring to help security teams respond quickly and efficiently.",
  },
  {
    question: "How does Quantsential improve long-term cybersecurity?",
    answer:
      "By continuously learning from new data and attack patterns, Quantsential improves detection accuracy over time, reduces false positives, and helps organizations build a proactive and adaptive security defense system.",
  },
];


export default function AboutTheQuantsential() {
  const [openIndex, setOpenIndex] = useState(2);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#f3efeb]">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[85vh]">
        
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 border-r border-gray-300">
          
          <span className="border border-gray-400 text-sm px-5 py-1 rounded-md w-fit mb-10">
            FAQ
          </span>

          <h2 className="text-[40px] md:text-[56px] lg:text-[64px] font-medium leading-[1.15] tracking-tight text-gray-900 max-w-[700px]">
              An overview of how our system goes beyond rule-based methods to deliver adaptive and intelligent results.
          </h2>

        </div>

        {/* RIGHT SIDE FAQ */}
        <div className="flex flex-col">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-300 px-8 md:px-16 lg:px-20 py-10"
            >
              
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="text-xl md:text-2xl font-medium text-gray-900">
                  {item.question}
                </span>

                <ChevronDown
                  size={28}
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openIndex === index ? "max-h-40 mt-6" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 text-lg leading-relaxed max-w-[600px]">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
