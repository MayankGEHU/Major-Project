"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import myImg from "../../assets/prof.png";

const testimonials = [
  {
    img: myImg,
    name: "Mayank Singh",
  },
  {
    img: myImg,
    name: "Vanshika Dixit",
  },
  {
    img: myImg,
    name: "Harleen Kaur",
  },
];

export const Component = () => {
  const testimonialsRef = useRef(null);
  const [active, setActive] = useState(0);
  const [autorotate, setAutorotate] = useState(true);
  const autorotateTiming = 7000;

  useEffect(() => {
    if (!autorotate) return;

    const interval = setInterval(() => {
      setActive((prev) =>
        prev + 1 === testimonials.length ? 0 : prev + 1
      );
    }, autorotateTiming);

    return () => clearInterval(interval);
  }, [autorotate]);

  const heightFix = () => {
    if (testimonialsRef.current?.parentElement) {
      testimonialsRef.current.parentElement.style.height =
        `${testimonialsRef.current.clientHeight}px`;
    }
  };

  useEffect(() => {
    heightFix();
  }, []);

  return (
    <div className="mx-auto w-full max-w-3xl text-center">
      {/* ===== AVATAR ORBIT ===== */}
      <div className="relative h-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-gradient-to-b before:from-blue-500/25 before:via-blue-500/5 before:via-25% before:to-blue-500/0 before:to-75%">
          <div className="h-32 [mask-image:_linear-gradient(0deg,transparent,theme(colors.white)_20%,theme(colors.white))]">
            {testimonials.map((testimonial, index) => (
              <Transition
                as="div"
                key={index}
                show={active === index}
                className="absolute inset-0 -z-10 h-full"
                enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                enterFrom="opacity-0 -rotate-[60deg]"
                enterTo="opacity-100 rotate-0"
                leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700"
                leaveFrom="opacity-100 rotate-0"
                leaveTo="opacity-0 rotate-[60deg]"
                beforeEnter={heightFix}
              >
                <Image
                  className="relative left-1/2 top-11 -translate-x-1/2 rounded-full"
                  src={testimonial.img}
                  width={56}
                  height={56}
                  alt={testimonial.name}
                />
              </Transition>
            ))}
          </div>
        </div>
      </div>

      {/* ===== CONTROLS (NAMES ONLY) ===== */}
      <div className="-m-1.5 flex flex-wrap justify-center">
        {testimonials.map((testimonial, index) => (
          <button
            key={index}
            className={`m-1.5 inline-flex justify-center whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium shadow-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-300 ${
              active === index
                ? "bg-blue-500 text-white shadow-blue-950/10"
                : "bg-white text-blue-900 hover:bg-blue-100"
            }`}
            onClick={() => {
              setActive(index);
              setAutorotate(false);
            }}
          >
            {testimonial.name}
          </button>
        ))}
      </div>
    </div>
  );
};
