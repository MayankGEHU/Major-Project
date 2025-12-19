const glassCard =
  "relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0b1220]/80 to-[#020617]/90 backdrop-blur-xl shadow-inner";

function EndpointIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="relative w-5 h-5 text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,1)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <line x1="8" y1="20" x2="16" y2="20" />
    </svg>
  );
}

function SessionIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="relative w-5 h-5 text-yellow-400 drop-shadow-[0_0_12px_rgba(234,179,8,1)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 8a5 5 0 00-10 0" />
      <circle cx="12" cy="14" r="4" />
    </svg>
  );
}

function ThreatIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="relative w-5 h-5 text-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,1)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l9 16H3L12 3z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function BlockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="relative w-5 h-5 text-red-400 drop-shadow-[0_0_12px_rgba(248,113,113,1)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <line x1="5" y1="5" x2="19" y2="19" />
    </svg>
  );
}

function GlowIcon({ children, color }) {
  return (
    <div className="relative w-8 h-8 flex items-center justify-center">
      <div
        className={`absolute inset-0 blur-2xl opacity-70 ${color}`}
      />
      {children}
    </div>
  );
}

export default function StatCards() {
  const data = [
    {
      title: "Monitored Endpoints",
      value: "12,585",
      change: "+3.2%",
      description: "Active devices continuously monitored by the AI-driven intrusion detection engine.",
      icon: <EndpointIcon />,
      glow: "bg-blue-500/30",
    },
    {
      title: "Suspicious Sessions",
      value: "1,248",
      change: "-1.1%",
      description: "Anomalous user and network sessions flagged by behavioral analysis models.",
      icon: <SessionIcon />,
      glow: "bg-yellow-400/30",
    },
    {
      title: "AI-Detected Threats",
      value: "3,962",
      change: "+5.8%",
      description: "Threat patterns identified using deep learning and real-time correlation.",
      icon: <ThreatIcon />,
      glow: "bg-purple-500/30",
    },
    {
      title: "Blocked Intrusions",
      value: "742",
      change: "-0.6%",
      description: "Confirmed malicious activities automatically blocked by prevention rules.",
      icon: <BlockIcon />,
      glow: "bg-red-500/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {data.map((item, i) => (
        <div key={i} className={`${glassCard} p-6`}>

          <div className="absolute top-3 right-3">
            <GlowIcon color={item.glow}>
              {item.icon}
            </GlowIcon>
          </div>

          <p className="text-white/60 text-sm mb-2">
            {item.title}
          </p>

          <h2 className="text-2xl font-semibold mb-1">
            {item.value}
          </h2>

          <p
            className={`text-sm mb-2 ${
              item.change.includes("+")
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {item.change}
          </p>

          <p className="text-white/40 text-xs leading-relaxed">
            {item.description}
          </p>

        </div>
      ))}
    </div>
  );
}
