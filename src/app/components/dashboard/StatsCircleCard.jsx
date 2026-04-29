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
const HEX    = ["#c084fc",       "#facc15",       "#f472b6"];

// ── Build the last 6 real hours ending NOW ─────────────────────────────────
function getLastSixHours() {
  const now = new Date();
  const slots = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now);
    d.setHours(now.getHours() - i, 0, 0, 0);
    const h = d.getHours();
    // Format: "2 PM", "10 AM", etc.
    const label = d.toLocaleTimeString([], { hour: "numeric", hour12: true });
    slots.push({ hourKey: h, label });
  }
  return slots;
}

// ── Group alerts into hourly buckets per attack type ───────────────────────
function buildHourlyBuckets(alerts) {
  // { hourNum: { attackLabel: count } }
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

// ── Fallback categories (when no live data yet) ────────────────────────────
const FALLBACK_CATS = [
  { name: "DoS Hulk", count: 45 },
  { name: "DDoS",     count: 30 },
  { name: "PortScan", count: 20 },
];

// Static height patterns used ONLY for fallback (no random = no flicker)
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

  // ── Determine top-3 categories ──────────────────────────────────────────
  const cleaned = topAttacks
    .map((t) => ({ name: resolveLabel(t.label), count: t.count }))
    .filter((t) => t.name !== "BENIGN")
    .sort((a, b) => b.count - a.count);

  const categories = cleaned.length > 0 ? cleaned.slice(0, 3) : FALLBACK_CATS;

  // ── Build real-time chart data ──────────────────────────────────────────
  const slots    = getLastSixHours();
  const buckets  = buildHourlyBuckets(recentAlerts);
  const hasReal  = Object.keys(buckets).length > 0;

  // Max count across all slots × categories (for scaling bar height)
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
        // Scale to 0–50 pixel-units; 0 stays 0 (slot had no activity)
        h = count === 0 ? 0 : Math.max(8, Math.round((count / globalMax) * 50));
      } else {
        // Stable fallback (no random)
        h = FALLBACK_HEIGHTS[si][ci];
      }
      return { name: cat.name, h };
    }),
  }));

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] rounded-[28px] p-4 w-full relative overflow-hidden">

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-white text-sm font-medium">
          Open alerts by classification
        </h2>
        <div className="text-xs text-white/60 bg-white/5 px-3 py-1 rounded-full">
          Today
        </div>
      </div>

      {/* ── Severity badges ── */}
      {stats && (
        <div className="flex gap-2 text-[10px] mb-3 flex-wrap">
          <span className="bg-red-500/20    text-red-400    border border-red-500/30    px-2 py-0.5 rounded-full">
            Critical: {stats.critical_count ?? 0}
          </span>
          <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded-full">
            High: {stats.high_count ?? 0}
          </span>
          <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded-full">
            Medium: {stats.medium_count ?? 0}
          </span>
          <span className="bg-green-500/20  text-green-400  border border-green-500/30  px-2 py-0.5 rounded-full">
            Low: {stats.low_count ?? 0}
          </span>
        </div>
      )}

      {/* ── Legend — real attack names ── */}
      <div className="flex gap-4 text-xs text-white/60 mb-3 flex-wrap">
        {categories.map((cat, i) => (
          <div key={i} className="flex items-center gap-1.5 min-w-0">
            <span className={`w-2 h-2 shrink-0 ${COLORS[i]} rounded-full`} />
            <span className="truncate">{cat.name}</span>
          </div>
        ))}
      </div>

      <div className="relative flex items-end justify-between h-[200px] px-2 pb-1">

        <div className="absolute inset-0 flex items-end justify-between px-2">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="w-[6px] bg-white/5 rounded-full h-full" />
          ))}
        </div>

        {/* Bars + time labels */}
        <div className="relative h-full flex items-end justify-between gap-[2px] px-1 pb-[20px]">
          {chartData.map((slot, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center relative cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Three bars */}
              <div className="flex items-end gap-[3px]">
                {slot.bars.map((bar, bi) => (
                  <div
                    key={bi}
                    className={`w-[5px] ${COLORS[bi % 3]} rounded-full transition-all duration-500`}
                    style={{
                      height: bar.h > 0 ? `${bar.h * 2}px` : "3px",
                      opacity: bar.h === 0 ? 0.15 : hovered === i ? 1 : 0.72,
                      transform: hovered === i ? "scaleX(1.2)" : "scaleX(1)",
                    }}
                  />
                ))}
              </div>

              {/* Time label — real current time */}
              <span className="absolute bottom-0 translate-y-[105%] text-[9px] text-white/40 whitespace-nowrap">
                {slot.time}
              </span>

            {hovered === i && (
              <div className="absolute -top-24 bg-[#111] border border-white/10 rounded-xl p-3 text-xs text-white/70 shadow-xl w-[150px] animate-fadeIn">

                <div className="flex justify-between mb-2 text-white/80">
                  <span>12 May</span>
                  <span>{item.time}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

const Bar = ({ h, color, active }) => (
  <div
    className={`w-[6px] ${color} rounded-full transition-all duration-300 ${active ? "opacity-100 scale-110" : "opacity-70"
      }`}
    style={{ height: `${h * 2}px` }}
  />
);

const Legend = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <span className={`w-2 h-2 ${color} rounded-full`} />
    {label}
  </div>
);

const TooltipRow = ({ color, label, value }) => (
  <div className="flex justify-between mb-1">
    <span className="flex items-center gap-2">
      <span className={`w-2 h-2 ${color} rounded-full`} />
      {label}
    </span>
    <span>{value}%</span>
  </div>
);
