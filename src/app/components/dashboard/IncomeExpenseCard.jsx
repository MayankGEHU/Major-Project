const LABEL_MAP = {
  "0":"BENIGN","1":"DDoS","2":"DoS Hulk","3":"FTP-Patator",
  "4":"PortScan","5":"SSH-Patator","6":"Web Attack","7":"DoS GoldenEye",
  "8":"DoS Slowloris","9":"Bot","10":"Web Attack","11":"SQL Injection",
  "12":"SQL Injection","13":"Infiltration","14":"Heartbleed",
};
const resolveLabel = (raw) => LABEL_MAP[String(raw)] ?? raw;

const NORMALISE = { "SSH-Patator": "Brute Force", "Web Attack - Brute Force": "Web Attack" };
const norm = (s) => NORMALISE[s] ?? s;

const BASE_ATTACKS = [
  "DDoS","Brute Force","Web Attack","SQL Injection",
  "DoS Hulk","PortScan","FTP-Patator",
];

const SHORT_LABEL = {
  "DDoS":          "DDoS",
  "Brute Force":   "Brute",
  "Web Attack":    "Web",
  "SQL Injection": "SQL",
  "DoS Hulk":      "Hulk",
  "PortScan":      "PScan",
  "FTP-Patator":   "FTP",
  "DoS GoldenEye": "GoldE",
  "DoS Slowloris": "Slow",
  "Bot":           "Bot",
  "Infiltration":  "Infil",
  "Heartbleed":    "HBled",
};
const shorten = (s) => SHORT_LABEL[s] ?? (s.length > 6 ? s.slice(0, 5) + "…" : s);

const FALLBACK_HEIGHTS = [88, 55, 67, 42, 78, 50, 35];

export default function IncomeExpenseCard({ topAttacks = [] }) {
  const countMap = {};
  topAttacks.forEach((t) => {
    const label = norm(resolveLabel(t.label));
    if (label !== "BENIGN") countMap[label] = (countMap[label] || 0) + t.count;
  });

  const liveNames = [...new Set(Object.keys(countMap))];
  const hasLive   = liveNames.length > 0;

  const mergedAttacks = [
    ...liveNames,
    ...BASE_ATTACKS.filter((a) => !liveNames.includes(a)),
  ].slice(0, 6);   

  const maxCount = hasLive ? Math.max(...Object.values(countMap)) : 1;

  const bars = mergedAttacks.map((label, i) => ({
    label: shorten(label),
    value: hasLive
      ? Math.max(20, Math.round(((countMap[label] || 0) / maxCount) * 92))
      : FALLBACK_HEIGHTS[i] ?? 50,
  }));

  return (
    <div className="rounded-[28px] bg-white/5 backdrop-blur-xl border border-white/10
      shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] px-5 pt-5 pb-4
      overflow-hidden relative h-full flex flex-col">

      <h3 className="text-white text-sm font-medium mb-5 shrink-0">
        Top Active Ports
      </h3>

      <div className="flex items-end gap-[10px] flex-1 min-h-[110px]">
        {bars.map((b, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
            <div
              className="w-full rounded-full transition-all duration-700"
              style={{
                height: `${b.value}%`,
                background:
                  "linear-gradient(180deg,#a5f3fc 0%,#67e8f9 15%,#22d3ee 35%,#3b82f6 65%,#1d4ed8 100%)",
                boxShadow: "0 0 12px rgba(103,232,249,0.25)",
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-[10px] mt-[10px] shrink-0">
        {bars.map((b, i) => (
          <span key={i} className="flex-1 text-center text-[10px] text-white/40 leading-tight">
            {b.label}
          </span>
        ))}
      </div>
    </div>
  );
}
