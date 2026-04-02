// import React from "react";

// export default function ThreatsPerfectCard() {
//   const orbits = [
//     { w: 48, h: 38, rx: 24, ry: 19 },
//     { w: 82, h: 62, rx: 41, ry: 31 },
//   ];

//   const nodes = [
//     { value: 3548, size: 68, orbit: null, angle: 0, color: "from-pink-500 to-purple-600" },
//     { value: 3012, size: 52, orbit: 0, angle: -35, color: "from-blue-500 to-indigo-600" },
//     { value: 2487, size: 48, orbit: 0, angle: 155, color: "from-orange-400 to-yellow-500" },
//     { value: 2957, size: 54, orbit: 1, angle: 210, color: "from-purple-500 to-indigo-600" },
//     { value: 1938, size: 44, orbit: 1, angle: 30, color: "from-yellow-400 to-orange-500" },
//   ];

//   const getPosition = (orbitIndex, angleDeg) => {
//     const centerX = 50;
//     const centerY = 50;
//     if (orbitIndex === null) return { left: `${centerX}%`, top: `${centerY}%` };
//     const orbit = orbits[orbitIndex];
//     const angleRad = (angleDeg * Math.PI) / 180;
//     const x = centerX + orbit.rx * Math.cos(angleRad);
//     const y = centerY + orbit.ry * Math.sin(angleRad);
//     return { left: `${x}%`, top: `${y}%` };
//   };

//   return (
//     <div className="relative w-full h-[300px] rounded-[32px] p-7 bg-[#080808] border border-white/10 shadow-2xl text-white overflow-hidden font-sans">
      
//       <div className="relative z-10 flex justify-between items-center">
//         <h3 className="text-gray-200 text-lg font-semibold tracking-tight">
//           Attack Vectors <span className="text-gray-500 font-normal ml-1 text-sm">(Last 2 weeks)</span>
//         </h3>
//         <button className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 hover:bg-white/10 transition-colors">
//           All <span className="ml-1 opacity-60">▾</span>
//         </button>
//       </div>

//       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//         {orbits.map((orbit, i) => (
//           <div
//             key={i}
//             className="absolute border border-white/[0.06] rounded-full"
//             style={{ width: `${orbit.w}%`, height: `${orbit.h}%` }}
//           />
//         ))}

//         <div className="relative w-full h-full pointer-events-auto">
//           {nodes.map((node, i) => {
//             const pos = getPosition(node.orbit, node.angle);
//             return (
//               <div
//                 key={i}
//                 className="absolute flex items-center justify-center transition-all duration-700 ease-in-out hover:scale-110 cursor-pointer group"
//                 style={{
//                   ...pos,
//                   transform: "translate(-50%, -50%)",
//                   width: node.size,
//                   height: node.size,
//                 }}
//               >
//                 <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${node.color} opacity-15 blur-xl group-hover:opacity-30 transition-opacity duration-500`} />
//                 <div className={`w-full h-full rounded-full bg-gradient-to-br ${node.color} p-[1.5px] shadow-lg`}>
//                   <div className="w-full h-full rounded-full bg-[#080808] flex items-center justify-center p-0.5">
//                     <div className="w-full h-full rounded-full border border-white/10 flex items-center justify-center bg-white/[0.03] backdrop-blur-sm">
//                       <span className="text-[10px] font-bold text-gray-200 tracking-tighter">
//                         {node.value}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       <div className="absolute bottom-7 left-0 right-0 flex justify-center gap-7 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
//         <LegendItem color="bg-pink-500" label="Ransomware" />
//         <LegendItem color="bg-purple-500" label="SQL Injection" />
//         <LegendItem color="bg-indigo-400" label="Brute Force" />
//         <LegendItem color="bg-yellow-400" label="Phishing" />
//       </div>
//     </div>
//   );
// }

// function LegendItem({ color, label }) {
//   return (
//     <div className="flex items-center gap-2 hover:text-gray-300 transition-colors">
//       <span className={`w-2 h-2 rounded-full ${color} shadow-[0_0_8px_rgba(255,255,255,0.1)]`} />
//       {label}
//     </div>
//   );
// }

export default function ThreatsHeatmapCard() {
  const rows = [
    "DDoS Attack",
    "Brute Force",
    "Phishing",
    "SQL Injection",
    "Malware",
    "Zero-Day Exploit", // NEW ROW
  ];

  const cols = ["15 Oct", "16 Oct", "17 Oct", "18 Oct", "19 Oct"];

  const data = [
    [1, 2, 3, 2, 3],
    [0, 2, 1, 2, 1],
    [1, 3, 2, 2, 3],
    [0, 1, 2, 1, 2],
    [1, 2, 2, 3, 2],
    [2, 3, 1, 2, 3], // NEW DATA ROW
  ];

  const getColor = (level) => {
    switch (level) {
      case 1:
        return "bg-purple-900/50";
      case 2:
        return "bg-purple-600/70";
      case 3:
        return "bg-purple-500";
      default:
        return "bg-[#1a1a1a]";
    }
  };

  return (
    <div className="bg-[#0b0b0b] p-4 sm:p-5 border border-white/5 rounded-[22px] sm:rounded-[26px] md:rounded-[28px] text-white w-full h-full">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-gray-300 text-sm sm:text-base font-medium">
          Threats Tactics (Last 12 Weeks)
        </h3>
        <div className="text-gray-400 text-lg cursor-pointer">⋮</div>
      </div>

      {/* Heatmap */}
      <div className="mt-6 w-full">
        
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-center gap-4 mb-3">
            
            {/* Label */}
            <div className="w-[130px] text-xs text-gray-400 flex items-center h-7">
              {rows[rowIndex]}
            </div>

            {/* Cells */}
            <div className="flex flex-1 gap-2">
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className={`flex-1 h-6 sm:h-7 rounded-lg ${getColor(
                    cell
                  )} transition-all duration-300 hover:scale-105`}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Dates */}
        <div className="flex items-center gap-4 mt-3">
          <div className="w-[130px]" />
          <div className="flex flex-1 gap-2 text-xs text-gray-500">
            {cols.map((col, i) => (
              <span key={i} className="flex-1 text-center">
                {col}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}