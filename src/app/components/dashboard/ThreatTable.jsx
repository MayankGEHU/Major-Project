const glassCard =
  "rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0b1220]/80 to-[#020617]/90 backdrop-blur-xl shadow-inner";

export default function ThreatTable() {
  return (
    <div className={`${glassCard} p-6`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white/90 text-[15px] font-medium">
          2,163 Monitored Endpoints · GenAI IDS
        </h3>

        <input
          placeholder="Search threats, IPs, models..."
          className="bg-[#0B1220] px-5 py-2 rounded-full text-sm outline-none text-white/60 border border-white/5"
        />
      </div>

      <div className="rounded-2xl border border-white/[0.06] overflow-hidden">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-white/[0.04] text-white/50">
              <th className="px-4 py-4 text-left font-medium">
                Threat Level
              </th>
              <th className="px-4 py-4 text-left font-medium">
                AI Detection Summary
              </th>
              <th className="px-4 py-4 text-left font-medium">
                Model Confidence
              </th>
              <th className="px-4 py-4 text-left font-medium">
                Last Observed
              </th>
              <th className="px-4 py-4 text-left font-medium">
                First Detected (UTC)
              </th>
              <th className="px-4 py-4 text-left font-medium">
                Affected Assets
              </th>
              <th className="px-4 py-4 text-right font-medium">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {[
              {
                level: "Medium",
                summary:
                  "Anomalous DNS behavior detected using sequence-based LLM analysis",
                confidence: "87% Confidence",
                last: "2025-02-21",
                detected: "2025-02-12",
                assets: 235,
                color: "bg-yellow-400",
              },
              {
                level: "High",
                summary:
                  "Potential data exfiltration pattern identified via GenAI traffic modeling",
                confidence: "94% Confidence",
                last: "2025-02-22",
                detected: "2025-02-19",
                assets: 356,
                color: "bg-red-400",
              },
              {
                level: "Low",
                summary:
                  "Unusual ICMP echo response classified as benign by AI correlation engine",
                confidence: "72% Confidence",
                last: "2025-02-23",
                detected: "2025-02-21",
                assets: 380,
                color: "bg-green-400",
              },
            ].map((row, i) => (
              <tr
                key={i}
                className="border-t border-white/[0.04] text-white/70 hover:bg-white/[0.02]"
              >
                <td className="px-4 py-5">
                  {row.level}
                </td>

                <td className="px-4 py-5 max-w-[420px] truncate text-white/80">
                  {row.summary}
                </td>

                <td className="px-4 py-5">
                  <div className="flex items-center gap-3 text-white/60">
                    <span
                      className={`w-2 h-2 rounded-full ${row.color}`}
                    />
                    {row.confidence}
                  </div>
                </td>

                <td className="px-4 py-5 text-white/50">
                  {row.last}
                </td>

                <td className="px-4 py-5 text-white/50">
                  {row.detected}
                </td>

                <td className="px-4 py-5">
                  {row.assets}
                </td>

                <td className="px-4 py-5 text-right text-white/40">
                  ⋮
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
