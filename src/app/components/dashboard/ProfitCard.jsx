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
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] 
    p-4 sm:p-5 rounded-[28px] flex flex-col gap-3">

      <div>
        <h2 className="text-white text-sm sm:text-base font-medium">
          AI Security Monitor
        </h2>
        <p className="text-gray-400 text-xs">Live Threat Logs</p>
      </div>

      <div className="flex flex-col gap-3">
        {data.map((item, index) => {

          const getStatusStyle = () => {
            if (item.amount === "High") {
              return "bg-red-500/20 text-red-400 border border-red-500/30";
            }
            if (item.amount === "Critical") {
              return "bg-red-600/25 text-red-300 border border-red-600/40";
            }
            if (item.amount === "Safe") {
              return "bg-green-500/20 text-green-400 border border-green-500/30";
            }
            return "bg-white/5 text-gray-300 border border-white/10";
          };

          return (
            <div key={index} className="flex items-center justify-between">

              <div className="flex items-center gap-3">
  
                <div className="px-3 py-1 rounded-full text-[10px] sm:text-xs 
                bg-white/5 backdrop-blur-md border border-white/10 text-gray-300">
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
                className={`px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-medium backdrop-blur-md ${getStatusStyle()}`}
              >
                {item.amount}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}