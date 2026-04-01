export default function BalanceCard() {
  const data = [
    { value: 40, label: "Jun" },
    { value: 20, label: "Jul" },
    { value: 60, label: "Aug" },
    { value: 35, label: "Sep" },
    { value: 80, label: "Oct", highlight: true },
    { value: 55, label: "Nov" },
    { value: 30, label: "Dec" },
  ];

  return (
    <div className="bg-[#111111] p-4 sm:p-5  border border-white/5 rounded-[22px] sm:rounded-[26px] md:rounded-[28px]  flex flex-col text-white h-full">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h3 className="text-gray-300 text-sm sm:text-base font-medium">
          Alert Volume
        </h3>
        <div className="text-gray-400 text-lg cursor-pointer">⋮</div>
      </div>

      {/* GRAPH AREA */}
      <div className="flex flex-col justify-end flex-1 mt-6">
        
        <div className="flex items-end gap-3 h-44">
          {data.map((item, i) => (
            <div key={i} className="flex flex-col items-center w-full h-full">
              
              {item.highlight && (
                <div className="mb-2 bg-[#2563eb] text-black text-xs px-2 py-1 rounded-full">
                  +80%
                </div>
              )}

              <div className="w-full flex items-end justify-center h-full">
                <div
                  className={`w-full rounded-xl relative ${
                    item.highlight ? "" : "bg-gray-700"
                  }`}
                  style={{
                    height: `${item.value}%`,
                    ...(item.highlight && {
                      background:
                        "linear-gradient(180deg, #67e8f9 0%, #2563eb 70%, rgba(37,99,235,0.1) 100%)",
                    }),
                  }}
                >
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-5 h-[3px] bg-white rounded-full" />
                </div>
              </div>

              <span className="text-xs text-gray-400 mt-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}