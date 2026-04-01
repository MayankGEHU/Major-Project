const glassCard =
  "rounded-[28px] border border-white/10 bg-[#111111] backdrop-blur-xl shadow-inner";

export default function IncomeExpenseCard() {
  return (
    <div className={`${glassCard} p-2 overflow-hidden`}>
      <h3 className="font-medium mb-6">Top Active Ports</h3>

      <div className="absolute inset-6 flex justify-between pointer-events-none">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="w-px bg-white/5" />
        ))}
      </div>

      <div className="relative h-56 flex items-end gap-3">
        {[45, 75, 50, 65, 40, 60, 30, 48, 72].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-full"
            style={{
              height: `${h}%`,
              background:
                "linear-gradient(180deg, #67e8f9 0%, #2563eb 70%, rgba(37,99,235,0.1) 100%)",
            }}
          />
        ))}

        <svg
          className="absolute inset-0"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polyline
            points="5,55 16,45 27,60 38,50 49,65 60,55 71,70 82,50 93,40"
            fill="none"
            stroke="#facc15"
            strokeWidth="1.0"
          />

          {[
            [5, 55],
            [16, 45],
            [27, 60],
            [38, 50],
            [49, 65],
            [60, 55],
            [71, 70],
            [82, 50],
            [93, 40],
          ].map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="1.5"
              fill="#0b1220"
              stroke="white"
              strokeWidth="0.5"
            />
          ))}
        </svg>
      </div>

      <div className="flex justify-between text-xs text-white/40 mt-4">
        {["28", "32", "36", "42", "56", "68", "72", "85", "92"].map((v) => (
          <span key={v}>{v}</span>
        ))}
      </div>
    </div>
  );
}