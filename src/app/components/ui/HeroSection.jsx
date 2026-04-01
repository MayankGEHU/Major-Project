export default function HeroSection() {
    const systems = [
        { name: "NETWORK TRAFFIC", status: "safe" },
        { name: "INTRUSION DETECTION", status: "safe" },
        { name: "FIREWALL STATUS", status: "safe" },
        { name: "PACKET INSPECTION", status: "safe" },
        { name: "THREAT INTELLIGENCE", status: "danger" },
        { name: "ANOMALY DETECTION", status: "warning" },
        { name: "DATA ENCRYPTION", status: "safe" },
        { name: "LOG MONITORING", status: "safe" },
    ];

    return (
        <section className="w-full h-screen flex overflow-hidden">

            {/* LEFT SECTION */}
            <div className="w-[75%] bg-[#FF5841] relative overflow-hidden">

                {/* HERO TEXT */}
                <div className="absolute top-[18%] left-10 z-10 max-w-[800px]">
                    <h1 className="text-[120px] leading-[105px] font-bold tracking-[-2px] text-black">
                        IDS/
                        <br />
                        QuantumSentinel
                    </h1>

                    <p className="mt-6 text-lg font-medium text-black">
                        Used by next-generation cyber platforms, this system enables you to detect real-time security threats with adaptive intelligence powered by Generative AI.
                    </p>
                </div>

                {/* IMAGE */}
                <div className="absolute bottom-0 left-0 w-full h-[35%]">
                    <img
                        src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1974&auto=format&fit=crop"
                        alt="background"
                        className="w-full h-full object-cover grayscale"
                    />
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="w-[25%] flex flex-col h-full">

                {/* TOP GRAY SECTION (INCREASED) */}
                <div className="bg-[#d9d9d9] h-[35%] p-6 flex items-start pt-10 border-b border-black/10">
                    <p className="text-base font-medium text-black">
                        Powering actionable insights for intelligent threat detection and autonomous defense using Generative AI-driven Intrusion Detection Systems.
                    </p>
                </div>

                {/* IDS PANEL */}
                <div className="bg-[#050505] px-6 py-6 h-[65%] overflow-y-auto">

                    {/* TITLE */}
                    <h2 className="text-[18px] text-green-400 mb-5 font-mono tracking-wide">
                        Threat Monitoring
                    </h2>

                    {/* SYSTEM LIST */}
                    <div className="grid grid-cols-[1fr_auto] gap-y-1 font-mono text-[12px] text-gray-400">
                        {systems.map((item, i) => {
                            const color =
                                item.status === "safe"
                                    ? "bg-green-400"
                                    : item.status === "warning"
                                        ? "bg-yellow-400"
                                        : "bg-red-500";

                            return (
                                <div key={i} className="contents">

                                    <div className="tracking-[2px] uppercase">
                                        {String(i + 1).padStart(2, "0")}. {item.name}
                                    </div>

                                    <div className="flex justify-end items-center">
                                        <span
                                            className={`w-2 h-2 rounded-full ${color} animate-pulse`}
                                        ></span>
                                    </div>

                                </div>
                            );
                        })}
                    </div>

                    {/* LOG SECTION */}
                    <div className="mt-8 flex gap-4">

                        {/* BRACKET */}
                        <div className="relative w-3">
                            <div className="absolute left-0 top-0 w-[2px] h-full bg-green-500/40"></div>
                            <div className="absolute left-0 top-0 w-2 h-[2px] bg-green-500/40"></div>
                            <div className="absolute left-0 bottom-0 w-2 h-[2px] bg-green-500/40"></div>
                        </div>

                        {/* LOG TEXT */}
                        <div className="font-mono text-[11px] text-green-400/70 leading-6">
                            <p>ALERT: Suspicious packet detected</p>
                            <p>SCAN: Port 443 anomaly</p>
                            <p>AUTH: Login attempt blocked</p>

                            <div className="h-2"></div> {/* small gap */}

                            <p>LOG: Firewall rules updated</p>
                            <p>SYS: Encryption active</p>
                            <p>NET: Traffic stable</p>

                            <div className="h-2"></div> {/* small gap */}

                            <p>AI: Pattern anomaly flagged</p>
                            <p>IDS: Monitoring active</p>
                            <p>SEC: No breach detected</p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}