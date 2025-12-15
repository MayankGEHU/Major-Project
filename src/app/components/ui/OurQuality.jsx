"use client";

export default function OurQuality() {
    return (
        <section className="relative w-full bg-black text-white py-40 overflow-hidden">
            <h2 className="text-center text-[44px] md:text-[56px] font-light leading-tight mb-36">
                Intelligence That <br /> Detects Everything
            </h2>

            <div className="max-w-[1600px] mx-auto px-12 grid grid-cols-1 md:grid-cols-2 gap-40 items-start">

                <div className="relative flex flex-col items-center">
                    <svg width="560" height="560" viewBox="0 0 560 560">
                        <circle
                            cx="280"
                            cy="280"
                            r="260"
                            fill="none"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeDasharray="1.5 12"
                            strokeLinecap="round"
                            opacity="0.95"
                        />

                        <text
                            x="280"
                            y="200"
                            textAnchor="middle"
                            fontSize="10"
                            letterSpacing="0.25em"
                            fill="white"
                            opacity="0.18"
                        >
                            THERE ARE PATHS IN THE WORLD THAT CAN’T BE SEEN
                        </text>

                        <text
                            x="280"
                            y="340"
                            textAnchor="middle"
                            fontSize="160"
                            fontWeight="300"
                            fill="white"
                        >
                            100%
                        </text>
                    </svg>

                    <p className="mt-20 text-center text-[15px] leading-relaxed text-white/80 max-w-md">
                        Of security threats were accurately classified <br />
                        by our generative AI engine
                    </p>
                </div>

                <div className="relative flex flex-col items-center">
                    <svg width="600" height="560" viewBox="0 0 560 560">
                        <circle
                            cx="220"
                            cy="280"
                            r="240"
                            fill="none"
                            stroke="white"
                            strokeWidth="1"
                            opacity="0.25"
                        />
                        <circle
                            cx="310"
                            cy="280"
                            r="240"
                            fill="none"
                            stroke="white"
                            strokeWidth="1"
                            opacity="0.25"
                        />
                        <circle
                            cx="280"
                            cy="280"
                            r="160"
                            fill="none"
                            stroke="white"
                            strokeWidth="1"
                            opacity="0.25"
                        />
                        <text
                            x="270"
                            y="340"
                            textAnchor="middle"
                            fontSize="160"
                            fontWeight="300"
                            fill="white"
                        >
                            +250%
                        </text>
                    </svg>

                    <p className="mt-20 text-center text-[15px] leading-relaxed text-white/80 max-w-md">
                        Proven intrusion detection performance <br />
                        powered by generative intelligence
                    </p>

                </div>
            </div>
        </section>
    );
}
