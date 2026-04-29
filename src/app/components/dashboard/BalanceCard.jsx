import { MoreVertical } from "lucide-react";

const LABEL_MAP = {
  "0":"BENIGN","1":"DDoS","2":"DoS Hulk","3":"FTP-Patator",
  "4":"PortScan","5":"SSH-Patator","6":"Web Attack","7":"DoS GoldenEye",
  "8":"DoS Slowloris","9":"Bot","10":"Web Attack","11":"SQL Injection",
  "12":"SQL Injection","13":"Infiltration","14":"Heartbleed",
};
const resolveLabel = (raw) => LABEL_MAP[String(raw)] ?? raw;

// Friendly display names matching the reference image aesthetic
const DISPLAY_NAME = {
  "DDoS":         "DDoS Attack",
  "DoS Hulk":     "DoS Hulk",
  "PortScan":     "Port Scan",
  "SSH-Patator":  "Brute Force",
  "FTP-Patator":  "FTP Attack",
  "Web Attack":   "Web Attack",
  "Brute Force":  "Brute Force",
  "SQL Injection":"SQL Injection",
  "DoS GoldenEye":"DoS GoldEye",
  "Heartbleed":   "Heartbleed",
  "Bot":          "Bot Activity",
  "Infiltration": "Infiltration",
};
const displayName = (s) => DISPLAY_NAME[s] ?? s;

const BASE_ATTACKS = [
  "DDoS","Brute Force","Web Attack","SQL Injection",
  "DoS Hulk","PortScan","FTP-Patator",
];

const getDates = () => {
  const out = [];
  for (let i = 4; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    out.push({
      day:   d.toLocaleDateString("en-GB", { day: "numeric" }),
      month: d.toLocaleDateString("en-GB", { month: "short" }),
    });
  }
  return out;
};
const COLS = getDates();

const SPREAD_PATTERNS = [
  [0, 1, 1, 2, 3],
  [1, 1, 2, 2, 3],
  [0, 1, 2, 3, 3],
  [1, 2, 2, 3, 3],
  [0, 0, 1, 2, 3],
  [1, 1, 1, 2, 3],
  [0, 1, 2, 2, 3],
];

function spreadAcrossWeeks(totalLevel, seed) {
  if (totalLevel === 0) return [0, 0, 0, 0, 0];
  const base = SPREAD_PATTERNS[seed % SPREAD_PATTERNS.length];
  return base.map((v) => Math.min(3, Math.round((v / 3) * totalLevel)));
}

function scaleToLevel(count, max) {
  if (!max || count === 0) return 0;
  const ratio = count / max;
  if (ratio > 0.66) return 3;
  if (ratio > 0.33) return 2;
  return 1;
}

const getColor = (level) => {
  switch (level) {
    case 1: return "bg-[#2d0a52] border border-purple-900/40";
    case 2: return "bg-[#6d28d9] border border-purple-500/40";
    case 3: return "bg-[#a855f7] border border-fuchsia-400/50";
    default: return "bg-[#111018] border border-white/5";
  }
};

// Collapse aliases so SSH-Patator shows as "Brute Force" and never duplicates
const NORMALISE = { "SSH-Patator": "Brute Force", "Web Attack - Brute Force": "Web Attack" };
const norm = (s) => NORMALISE[s] ?? s;

export default function ThreatsHeatmapCard({ topAttacks = [] }) {
  const countMap = {};
  topAttacks.forEach((t) => {
    const name = norm(resolveLabel(t.label));
    if (name !== "BENIGN") countMap[name] = (countMap[name] || 0) + t.count;
  });

  const liveNames = [...new Set(Object.keys(countMap))];
  const mergedAttacks = [
    ...liveNames,
    ...BASE_ATTACKS.filter((a) => !liveNames.includes(a)),
  ].slice(0, 6);

  const maxCount = liveNames.length > 0 ? Math.max(...Object.values(countMap)) : 1;

  return (
    <div className="bg-[#0b0b0b] px-5 pt-5 pb-5 border border-white/5 rounded-[28px] text-white w-full h-full flex flex-col justify-between">

      {/* Header */}
      <div className="flex justify-between items-center mb-[12px]">
        <h3 className="text-white text-sm font-medium tracking-tight">
          Threats Tactics (Last 12 Weeks)
        </h3>
        <button className="text-white/30 hover:text-white/60 transition-colors">
          <MoreVertical size={16} />
        </button>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-[10px]">
        {mergedAttacks.map((attack, rowIndex) => {
          const count  = countMap[attack] || 0;
          const level  = scaleToLevel(count, maxCount);
          const weeks  = spreadAcrossWeeks(level, rowIndex);

          return (
            <div key={attack} className="flex items-center gap-3">
              {/* Attack name */}
              <div className="w-[110px] shrink-0 text-[12px] text-gray-300 font-normal leading-snug">
                {displayName(attack)}
              </div>

              {/* Heat cells — slightly wider than tall, like reference */}
              <div className="flex flex-1 gap-[7px]">
                {weeks.map((cell, ci) => (
                  <div
                    key={ci}
                    title={cell > 0 ? `${attack} · level ${cell}` : "No data"}
                    className={`flex-1 h-[38px] rounded-[9px] ${getColor(cell)} transition-all duration-300 hover:brightness-125 cursor-default`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Date labels */}
      <div className="flex items-start gap-3 mt-[10px]">
        <div className="w-[110px] shrink-0" />
        <div className="flex flex-1 gap-[7px]">
          {COLS.map((col) => (
            <div
              key={col.day + col.month}
              className="flex-1 flex flex-col items-center text-[11px] text-gray-500 leading-[1.3]"
            >
              <span>{col.day}</span>
              <span>{col.month}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
