"use client";
import React, { useState } from "react";
import { Search, SlidersHorizontal, Trash2 } from "lucide-react";

const initialData = [
  {
    title: "Cross-Platform attack in data",
    time: "10:45 AM",
    risk: 35,
    date: "Apr 12, 2025",
    source: "192.168.1.10",
    prevention:
      "Apply latest patches, enable firewall rules, and monitor unusual traffic patterns across all nodes.",
  },
  {
    title: "Cross-Platform attack missed alert",
    time: "11:20 AM",
    risk: 65,
    date: "Apr 14, 2025",
    source: "172.31.31.22",
    prevention:
      "Update IDS signatures and enable real-time monitoring. Ensure alerts are routed to the security team.",
  },
  {
    title: "Successful console brute force",
    time: "01:10 PM",
    risk: 55,
    date: "Apr 15, 2025",
    source: "10.0.0.5",
    prevention:
      "Enable MFA, rate-limit login attempts, and monitor authentication logs for repeated failures.",
  },
];

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

export default function DetailsOfRisks() {
  const [data, setData] = useState(initialData);

  const handleDelete = (index) => {
    const updated = data.filter((_, i) => i !== index);
    setData(updated);
  };

  const gridLayout =
    "grid-cols-[2fr_1fr_1fr_1.2fr_2fr_1.5fr_0.7fr]";

  return (
    <div className="w-full rounded-[28px] border border-white/10 bg-[#0b0b10]/90 backdrop-blur-xl p-4 sm:p-8 text-white shadow-2xl">

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-lg sm:text-xl font-medium">
          Security threats
        </h2>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center w-full sm:w-auto bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm">
            <Search size={16} className="mr-2 text-white/40" />
            <input
              placeholder="Search"
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
          <div>Source</div>
          <div>Prevention</div>
          <div>Risk</div>
          <div className="text-right pr-4">Action</div>
        </div>

        <div className="mt-2 min-w-[1000px]">
          {data.map((item, i) => (
            <div
              key={i}
              className={`grid ${gridLayout} items-center py-4 border-b border-white/5 hover:bg-white/[0.02] pl-6 sm:pl-10`}
            >
              <p className="text-sm text-white/90 truncate pr-4">
                {item.title}
              </p>

              <p className="text-sm text-white/50">{item.time}</p>
              <p className="text-sm text-white/50">{item.date}</p>

              <div className="flex items-center gap-2.5">
                <div className="relative flex items-center justify-center">
                  <span className="pulse-ring absolute"></span>
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                </div>
                <p className="text-sm text-white/80 font-mono">
                  {item.source}
                </p>
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
                  onClick={() => handleDelete(i)}
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
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: rgba(74, 222, 128, 0.4);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          70% { transform: scale(3); opacity: 0; }
          100% { opacity: 0; }
        }

        /* optional: hide scrollbar on mobile */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}