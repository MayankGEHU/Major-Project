const glassCard =
  "rounded-[28px] border border-white/10 bg-[#0b0b0b] backdrop-blur-xl shadow-inner";

export default function IncomeExpenseCard() {
  const barData = [45, 75, 50, 65, 40, 60, 30, 48, 72];

  return (
    <div className={`${glassCard} p-2 overflow-hidden relative`}>
      <h3 className="font-medium mb-6">Top Active Ports</h3>

      <div className="absolute inset-6 flex justify-between pointer-events-none">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="w-px bg-white/5" />
        ))}
      </div>

      <div className="relative h-56 flex items-end gap-3">
        {barData.map((h, i) => (
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
      </div>

      <div className="flex justify-between text-xs text-white/40 mt-4">
        {["28", "32", "36", "42", "56", "68", "72", "85", "92"].map((v) => (
          <span key={v}>{v}</span>
        ))}
      </div>
    </div>
  );
}