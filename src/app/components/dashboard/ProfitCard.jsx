const LABEL_MAP = {
  "0":"BENIGN","1":"DDoS","2":"DoS Hulk","3":"FTP-Patator",
  "4":"PortScan","5":"SSH-Patator","6":"Web Attack","7":"DoS GoldenEye",
  "8":"DoS Slowloris","9":"Bot","10":"Web Attack","11":"SQL Injection",
  "12":"SQL Injection","13":"Infiltration","14":"Heartbleed",
};
const resolveLabel = (raw) => (raw ? (LABEL_MAP[String(raw)] ?? raw) : null);

export default function ProfitCard({ recentAlerts = [] }) {

  const severityToAmount = (sev) => {
    if (sev === "CRITICAL") return "Critical";
    if (sev === "HIGH")     return "High";
    if (sev === "MEDIUM")   return "Medium";
    return "Safe";
  };

  const fmtTime = (iso) => {
    if (!iso) return "--:--";
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  };

  // Build display rows from live data, fall back to static placeholders if empty
  const fallback = [
    { time: "–", title: "Threat Detected",     subtitle: "SQL Injection Attempt",  amount: "High"     },
    { time: "–", title: "Anomaly Found",        subtitle: "Unusual Traffic Spike",  amount: "Medium"   },
    { time: "–", title: "Blocked Attack",       subtitle: "Brute Force Login",      amount: "Critical" },
    { time: "–", title: "Suspicious Activity",  subtitle: "IP Reputation Low",      amount: "Medium"   },
    { time: "–", title: "Malware Alert",        subtitle: "File Upload Risk",       amount: "High"     },
    { time: "–", title: "System Scan",          subtitle: "No Threats Found",       amount: "Safe"     },
  ];

  const data = recentAlerts.length > 0
    ? recentAlerts.slice(0, 6).map((a) => ({
        time:     fmtTime(a.created_at),
        title:    resolveLabel(a.predicted_label) || (a.detection_type === "endpoint" ? "File Threat" : "Network Alert"),
        subtitle: a.src_ip ? `${a.src_ip} → ${a.dst_ip || "?"}` : (a.file_name || ""),
        amount:   severityToAmount(a.severity),
      }))
    : fallback;

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]
    px-4 sm:px-5 pt-4 sm:pt-5 pb-2 rounded-[28px] flex flex-col gap-3 h-full">

      <div>
        <h2 className="text-white text-sm sm:text-base font-medium">
          AI Security Monitor
        </h2>
        <p className="text-gray-400 text-xs">Live Threat Logs</p>
      </div>

      <div className="flex flex-col gap-3">
        {data.map((item, index) => {

          const getStatusStyle = () => {
            if (item.amount === "High")     return "bg-red-500/20 text-red-400 border border-red-500/30";
            if (item.amount === "Critical") return "bg-red-600/25 text-red-300 border border-red-600/40";
            if (item.amount === "Safe")     return "bg-green-500/20 text-green-400 border border-green-500/30";
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
