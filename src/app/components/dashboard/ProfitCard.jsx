export default function ProfitCard() {
  const data = [
    { time: "09:30", title: "Threat Detected", subtitle: "SQL Injection Attempt", amount: "High", highlight: true },
    { time: "10:15", title: "Anomaly Found", subtitle: "Unusual Traffic Spike", amount: "Medium" },
    { time: "11:40", title: "Blocked Attack", subtitle: "Brute Force Login", amount: "Critical" },
    { time: "13:05", title: "Suspicious Activity", subtitle: "IP Reputation Low", amount: "Medium" },
    { time: "15:20", title: "Malware Alert", subtitle: "File Upload Risk", amount: "High" },
    { time: "17:45", title: "System Scan", subtitle: "No Threats Found", amount: "Safe" },
  ];

  return (
    <div className="bg-[#0b0b0b] p-4 sm:p-5 border border-white/5  rounded-[22px] sm:rounded-[26px] md:rounded-[28px]  flex flex-col gap-3">
      <div>
        <h2 className="text-white text-sm sm:text-base font-medium">
          AI Security Monitor
        </h2>
        <p className="text-gray-400 text-xs">Live Threat Logs</p>
      </div>

      <div className="flex flex-col gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">

            <div className="flex items-center gap-2 sm:gap-3">

              <div
                className={`px-2 py-1 rounded-full text-[10px] sm:text-xs ${
                  item.highlight
                    ? "bg-black text-white"
                    : "border border-gray-500 text-gray-300"
                }`}
              >
                {item.time}
              </div>

              <div>
                <p className="text-white text-xs sm:text-sm font-medium leading-tight">
                  {item.title}
                </p>
                <p className="text-gray-400 text-[10px] sm:text-xs leading-tight">
                  {item.subtitle}
                </p>
              </div>
            </div>

            <div
              className={`px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-medium ${
                item.highlight
                  ? "bg-red-500 text-white"
                  : item.amount === "Safe"
                  ? "bg-green-500 text-white"
                  : "bg-[#2a2a2a] text-gray-200"
              }`}
            >
              {item.amount}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}