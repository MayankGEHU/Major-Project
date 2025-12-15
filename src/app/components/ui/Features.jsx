"use client";

function BlinkingText({ text }) {
  const words = text.split(" ");

  return (
    <p className="text-[11px] leading-relaxed tracking-wide max-w-xs">
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block mr-1 animate-blink"
          style={{ animationDelay: `${i * 0.15}s` }}
        >
          {word}
        </span>
      ))}
    </p>
  );
}

export default function Features() {
  return (
    <section className="relative w-full bg-black text-white">
      <div className="max-w-7xl mx-auto px-8 py-16 md:py-20 grid grid-cols-1 md:grid-cols-4 gap-16">

        {/* COLUMN 1 */}
        <div className="relative">
          <span className="text-[10px] tracking-[0.3em] text-gray-500 uppercase">
            Vision
          </span>

          <div className="absolute top-0 right-0 h-full w-px bg-white/10" />

          <div className="mt-8">
            <BlinkingText text="QuantumSentinel is built for a future where cyber threats evolve faster than traditional defenses can respond." />
          </div>
        </div>

        {/* COLUMN 2 */}
        <div className="relative">
          <span className="text-[10px] tracking-[0.3em] text-gray-500 uppercase">
            Technology
          </span>

          <div className="absolute top-0 right-0 h-full w-px bg-white/10" />

          <div className="mt-8">
            <BlinkingText text="Powered by Generative AI the system continuously learns patterns adapts to anomalies and strengthens detection accuracy." />
          </div>
        </div>

        {/* COLUMN 3 */}
        <div className="relative">
          <span className="text-[10px] tracking-[0.3em] text-gray-500 uppercase">
            Real Time Defense
          </span>

          <div className="absolute top-0 right-0 h-full w-px bg-white/10" />

          <div className="mt-8">
            <BlinkingText text="Threats are identified in real time enabling rapid response before breaches can escalate into critical incidents." />
          </div>
        </div>

        {/* COLUMN 4 */}
        <div>
          <span className="text-[10px] tracking-[0.3em] text-gray-500 uppercase">
            Intelligence Layer
          </span>

          <div className="mt-8">
            <BlinkingText text="Used by next generation cyber platforms QuantumSentinel delivers adaptive security intelligence designed for modern attack surfaces." />
          </div>
        </div>

      </div>
      <style jsx global>{`
        @keyframes blinkColor {
          0% { color: #3b82f6; }   /* blue */
          33% { color: #ffffff; } /* white */
          66% { color: #9ca3af; } /* gray */
          100% { color: #3b82f6; }
        }

        .animate-blink {
          animation: blinkColor 3s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}
