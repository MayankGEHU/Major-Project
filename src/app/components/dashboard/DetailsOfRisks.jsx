"use client";
import React, { useState } from "react";
import { Search, SlidersHorizontal, Trash2 } from "lucide-react";

const RiskBar = ({ value }) => {
  const segments = 12;
  const active = Math.round((value / 100) * segments);
  return (
    <div className="flex gap-[4px] min-w-[120px]">
      {Array.from({ length: segments }).map((_, i) => (
        <div
          key={i}
          className={`h-2 w-3 rounded-sm ${
            i < active
              ? "bg-gradient-to-r from-purple-400 to-indigo-500"
              : "bg-white/10"
          }`}
        />
      ))}
    </div>
  );
};

const fmtTime = (iso) => {
  if (!iso) return "–";
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
};

const fmtDate = (iso) => {
  if (!iso) return "–";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const LABEL_MAP = {
  "0":"BENIGN","1":"DDoS","2":"DoS Hulk","3":"FTP-Patator",
  "4":"PortScan","5":"SSH-Patator","6":"Web Attack","7":"DoS GoldenEye",
  "8":"DoS Slowloris","9":"Bot","10":"Web Attack","11":"SQL Injection",
  "12":"SQL Injection","13":"Infiltration","14":"Heartbleed",
};
const resolveLabel = (raw) => (raw ? (LABEL_MAP[String(raw)] ?? raw) : null);

const mapThreat = (a) => {
  const resolved = resolveLabel(a.predicted_label);
  return {
  id:         a.id,
  title:      resolved && resolved !== "BENIGN"
                ? resolved
                : a.file_name || "Unknown Threat",
  time:       fmtTime(a.created_at),
  date:       fmtDate(a.created_at),
  source:     a.src_ip || a.file_path?.split("\\").pop() || "–",
  prevention: a.ai_mitigation
                ? a.ai_mitigation.slice(0, 120).replace(/\n/g, " ")
                : "Review and block the source. Enable additional monitoring.",
  risk:       a.risk_score ?? 50,
  };
};

export default function DetailsOfRisks({ threats = [], onDelete }) {
  const [search, setSearch] = useState("");

  const rows = threats.map(mapThreat).filter(
    (r) =>
      !search ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.source.includes(search)
  );

  const handleDelete = (id) => {
    if (onDelete) onDelete(id);
  };

  const gridLayout = "grid-cols-[2fr_1fr_1fr_1.2fr_2fr_1.5fr_0.7fr]";

  return (
    <div className="w-full rounded-[28px] bg-white/5 backdrop-blur-xl border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] backdrop-blur-xl p-4 sm:p-8 text-white">

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-lg sm:text-xl font-medium">Security threats</h2>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center w-full sm:w-auto bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm">
            <Search size={16} className="mr-2 text-white/40" />
            <input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-white placeholder:text-white/30 w-full sm:w-64"
            />
          </div>
          <button className="p-2.5 rounded-full bg-white/5 border border-white/10">
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto scrollbar-hide">

        <div className={`min-w-[1000px] grid ${gridLayout} items-center text-xs font-medium text-white/40 pb-4 border-b border-white/10 pl-6 sm:pl-10`}>
          <div>Title</div>
          <div>Time</div>
          <div>Date</div>
          <div>Source IP</div>
          <div>Prevention</div>
          <div>Risk</div>
          <div className="text-right pr-4">Action</div>
        </div>

        <div className="mt-2 min-w-[1000px]">
          {rows.length === 0 && (
            <p className="text-white/30 text-sm text-center py-8">
              {threats.length === 0 ? "No threats detected yet." : "No results match your search."}
            </p>
          )}
          {rows.map((item) => (
            <div
              key={item.id}
              className={`grid ${gridLayout} items-center py-4 border-b border-white/5 hover:bg-white/[0.02] pl-6 sm:pl-10`}
            >
              <p className="text-sm text-white/90 truncate pr-4">{item.title}</p>

              <p className="text-sm text-white/50">{item.time}</p>
              <p className="text-sm text-white/50">{item.date}</p>

              <div className="flex items-center gap-2.5">
                <div className="relative flex items-center justify-center">
                  <span className="pulse-ring absolute"></span>
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                </div>
                <p className="text-sm text-white/80 font-mono">{item.source}</p>
              </div>

              <div className="pr-4">
                <p className="text-xs leading-relaxed text-white/60 line-clamp-2">
                  {item.prevention}
                </p>
              </div>

              <div className="flex items-center">
                <RiskBar value={item.risk} />
              </div>

              <div className="flex justify-end pr-4 min-w-[60px]">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-lg bg-white/5 border border-white/5 text-white/40 hover:text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .pulse-ring {
          width: 8px; height: 8px; border-radius: 9999px;
          background: rgba(74, 222, 128, 0.4);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%   { transform: scale(1); opacity: 1; }
          70%  { transform: scale(3); opacity: 0; }
          100% { opacity: 0; }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
