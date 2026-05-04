"use client";
import { useState } from "react";

const LABEL_MAP = {
  "0":"BENIGN","1":"DDoS","2":"DoS Hulk","3":"FTP-Patator",
  "4":"PortScan","5":"SSH-Patator","6":"Web Attack","7":"DoS GoldenEye",
  "8":"DoS Slowloris","9":"Bot","10":"Web Attack","11":"SQL Injection",
  "12":"SQL Injection","13":"Infiltration","14":"Heartbleed",
};
const resolveLabel = (raw) => (raw ? (LABEL_MAP[String(raw)] ?? raw) : null);

const COLORS = ["bg-purple-400", "bg-yellow-400", "bg-pink-400"];

function getLastSixHours() {
  const now = new Date();
  const slots = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now);
    d.setHours(now.getHours() - i, 0, 0, 0);
    const label = d.toLocaleTimeString([], { hour: "numeric", hour12: true });
    slots.push({ hourKey: d.getHours(), label });
  }
  return slots;
}

function buildHourlyBuckets(alerts) {
  const buckets = {};
  alerts.forEach((a) => {
    if (!a.created_at) return;
    const label = resolveLabel(a.predicted_label);
    if (!label || label === "BENIGN") return;
    const h = new Date(a.created_at).getHours();
    if (!buckets[h]) buckets[h] = {};
    buckets[h][label] = (buckets[h][label] || 0) + 1;
  });
  return buckets;
}

const FALLBACK_CATS = [
  { name: "DoS Hulk", count: 45 },
  { name: "DDoS", count: 30 },
  { name: "PortScan", count: 20 },
];

const FALLBACK_HEIGHTS = [
  [20, 32, 25],
  [35, 18, 28],
  [46, 40, 35],
  [50, 27, 22],
  [29, 36, 44],
  [41, 50, 47],
];

export default function StatsCircleCard({ stats, topAttacks = [], recentAlerts = [] }) {
  const [hovered, setHovered] = useState(null);

  const cleaned = topAttacks
    .map((t) => ({ name: resolveLabel(t.label), count: t.count }))
    .filter((t) => t.name !== "BENIGN")
    .sort((a, b) => b.count - a.count);

  const categories = cleaned.length > 0 ? cleaned.slice(0, 3) : FALLBACK_CATS;

  const slots = getLastSixHours();
  const buckets = buildHourlyBuckets(recentAlerts);
  const hasReal = Object.keys(buckets).length > 0;

  let globalMax = 1;
  if (hasReal) {
    slots.forEach(({ hourKey }) => {
      categories.forEach((cat) => {
        const v = buckets[hourKey]?.[cat.name] ?? 0;
        if (v > globalMax) globalMax = v;
      });
    });
  }

  const chartData = slots.map(({ hourKey, label }, si) => ({
    time: label,
    bars: categories.map((cat, ci) => {
      let h;
      if (hasReal) {
        const count = buckets[hourKey]?.[cat.name] ?? 0;
        h = count === 0 ? 0 : Math.max(8, Math.round((count / globalMax) * 50));
      } else {
        h = FALLBACK_HEIGHTS[si][ci];
      }
      return { name: cat.name, h };
    }),
  }));

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-4 w-full relative overflow-hidden">

      <h2 className="text-white text-sm mb-4">Open alerts by classification</h2>

      <div className="relative flex items-end justify-between h-[200px] px-2 pb-1">

        <div className="relative h-full flex items-end justify-between gap-[2px] px-1 pb-[20px] w-full">
          {chartData.map((slot, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center relative cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Bars */}
              <div className="flex items-end gap-[3px]">
                {slot.bars.map((bar, bi) => (
                  <div
                    key={bi}
                    className={`w-[5px] ${COLORS[bi]} rounded-full`}
                    style={{
                      height: bar.h > 0 ? `${bar.h * 2}px` : "3px",
                      opacity: bar.h === 0 ? 0.15 : hovered === i ? 1 : 0.7,
                    }}
                  />
                ))}
              </div>

              <span className="absolute bottom-0 translate-y-[105%] text-[9px] text-white/40">
                {slot.time}
              </span>

              {hovered === i && (
                <div className="absolute -top-24 bg-[#111] border border-white/10 rounded-xl p-3 text-xs text-white/70 shadow-xl w-[150px]">

                  <div className="flex justify-between mb-2 text-white/80">
                    <span>12 May</span>
                    <span>{slot.time}</span> 
                  </div>

                  {slot.bars.map((bar, idx) => (
                    <div key={idx} className="flex justify-between text-[11px] mb-1">
                      <span>{bar.name}</span>
                      <span>{bar.h}</span>
                    </div>
                  ))}

                </div>
              )}

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}