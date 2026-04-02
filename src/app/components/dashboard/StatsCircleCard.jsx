import React, { useState } from "react";

export default function StatsCircleCard() {
  const [hovered, setHovered] = useState(null);

  const data = [
    { time: "6 PM", spyware: 20, virus: 40, malware: 30 },
    { time: "7 PM", spyware: 35, virus: 20, malware: 25 },
    { time: "8 PM", spyware: 45, virus: 30, malware: 35 },
    { time: "9 PM", spyware: 25, virus: 50, malware: 20 },
    { time: "10 PM", spyware: 30, virus: 25, malware: 40 },
    { time: "11 PM", spyware: 50, virus: 35, malware: 45 },
  ];

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

      <div className="flex gap-5 text-xs text-white/60 mb-6">
        <Legend color="bg-purple-400" label="Virus" />
        <Legend color="bg-yellow-400" label="Spyware" />
        <Legend color="bg-pink-400" label="Malware" />
      </div>

      <div className="relative flex items-end justify-between h-[200px] px-2 pb-1">
        
        <div className="absolute inset-0 flex items-end justify-between px-2">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="w-[6px] bg-white/5 rounded-full h-full" />
          ))}
        </div>

        {data.map((item, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="flex flex-col items-center flex-1 relative z-10 cursor-pointer"
          >
            <div className="flex items-end gap-[4px] h-full">
              <Bar h={item.virus} color="bg-purple-400" active={hovered === i} />
              <Bar h={item.spyware} color="bg-yellow-400" active={hovered === i} />
              <Bar h={item.malware} color="bg-pink-400" active={hovered === i} />
            </div>

            <span className="text-[10px] text-white/40 mt-[2px]">
              {item.time}
            </span>

            {hovered === i && (
              <div className="absolute -top-24 bg-[#111] border border-white/10 rounded-xl p-3 text-xs text-white/70 shadow-xl w-[150px] animate-fadeIn">
                
                <div className="flex justify-between mb-2 text-white/80">
                  <span>12 May</span>
                  <span>{item.time}</span>
                </div>

                <TooltipRow color="bg-yellow-400" label="Spyware" value={item.spyware} />
                <TooltipRow color="bg-purple-400" label="Virus" value={item.virus} />
                <TooltipRow color="bg-pink-400" label="Malware" value={item.malware} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const Bar = ({ h, color, active }) => (
  <div
    className={`w-[6px] ${color} rounded-full transition-all duration-300 ${
      active ? "opacity-100 scale-110" : "opacity-70"
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