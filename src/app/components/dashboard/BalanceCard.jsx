export default function ThreatsHeatmapCard() {
  const rows = [
    "DDoS Attack",
    "Brute Force",
    "Phishing",
    "SQL Injection",
    "Malware",
  ];

  const cols = ["15 Oct", "16 Oct", "17 Oct", "18 Oct", "19 Oct"];

  const data = [
    [1, 2, 3, 2, 3],
    [0, 2, 1, 2, 1],
    [1, 3, 2, 2, 3],
    [0, 1, 2, 1, 2],
    [1, 2, 2, 3, 2],
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