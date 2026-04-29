"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Bell, ChevronDown, FileText, Loader2 } from "lucide-react";

import AiAssistantCard    from "./AiAssistantCard";
import BalanceCard        from "./BalanceCard";
import IncomeExpenseCard  from "./IncomeExpenseCard";
import ProfitCard         from "./ProfitCard";
import StatsCircleCard    from "./StatsCircleCard";
import DetailsOfRisks     from "./DetailsOfRisks";

import { generateReport }                          from "../../../utils/generateReport";
import { fetchStats, fetchStatsByRange,
         fetchAlerts, fetchAlertsByRange,
         deleteAlert, getWsUrl }                   from "../../../lib/api";

// ── localStorage helpers ──────────────────────────────────────────────────────
const CACHE_STATS   = "qs_stats_cache";
const CACHE_THREATS = "qs_threats_cache";
function readCache(key)      { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } }
function writeCache(key,val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }

// ── Date helpers ──────────────────────────────────────────────────────────────
const toInputDate = (d) => d.toISOString().slice(0, 10);          // "YYYY-MM-DD"
const fmtDisplay  = (s) => {
  if (!s) return "";
  const d = new Date(s + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"numeric" });
};

export default function Dashboard() {
  // ── Live data state ──────────────────────────────────────────────────────
  const [stats,   setStats]   = useState(null);
  const [threats, setThreats] = useState([]);
  const wsRef = useRef(null);

  // ── Date-range picker state ──────────────────────────────────────────────
  const today    = new Date();
  const weekAgo  = new Date(today); weekAgo.setDate(today.getDate() - 7);
  const [fromDate,    setFromDate]    = useState(toInputDate(weekAgo));
  const [toDate,      setToDate]      = useState(toInputDate(today));
  const [pickerOpen,  setPickerOpen]  = useState(false);
  const [draftFrom,   setDraftFrom]   = useState(toInputDate(weekAgo));
  const [draftTo,     setDraftTo]     = useState(toInputDate(today));
  const pickerRef = useRef(null);

  // ── Report generation state ──────────────────────────────────────────────
  const [reporting, setReporting] = useState(false);

  // ── Fetch live data ──────────────────────────────────────────────────────
  const loadData = async () => {
    try {
      const [s, a] = await Promise.all([
        fetchStats("week"),
        fetchAlerts({ threats_only: true, page_size: 20 }),
      ]);
      setStats(s);
      setThreats(a.items || []);
      writeCache(CACHE_STATS,   s);
      writeCache(CACHE_THREATS, a.items || []);
    } catch (e) { console.warn("Dashboard fetch:", e.message); }
  };

  useEffect(() => {
    const cs = readCache(CACHE_STATS);
    const ct = readCache(CACHE_THREATS);
    if (cs) setStats(cs);
    if (ct) setThreats(ct);

    loadData();
    const iv = setInterval(loadData, 10000);

    try {
      const ws = new WebSocket(getWsUrl());
      wsRef.current = ws;
      ws.onmessage = (e) => {
        try { const m = JSON.parse(e.data); if (m.event === "new_alert") loadData(); } catch {}
      };
    } catch {}

    // Close picker on outside click
    const handleClick = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) setPickerOpen(false);
    };
    document.addEventListener("mousedown", handleClick);

    return () => {
      clearInterval(iv);
      wsRef.current?.close();
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteAlert(id);
      setThreats((prev) => prev.filter((t) => t.id !== id));
    } catch (e) { console.warn("Delete error:", e.message); }
  };

  // ── Apply date range from picker ─────────────────────────────────────────
  const applyDateRange = () => {
    setFromDate(draftFrom);
    setToDate(draftTo);
    setPickerOpen(false);
  };

  // ── Generate report with real DB data ────────────────────────────────────
  const handleGenerateReport = async () => {
    setReporting(true);
    try {
      const [reportStats, reportAlerts] = await Promise.all([
        fetchStatsByRange(fromDate, toDate),
        fetchAlertsByRange(fromDate, toDate),
      ]);
      generateReport({
        stats:    reportStats,
        alerts:   reportAlerts.items || [],
        fromDate,
        toDate,
      });
    } catch (e) {
      console.error("Report error:", e);
      alert(`Report failed: ${e?.message || e}`);
    } finally {
      setReporting(false);
    }
  };

  const topAttacks = stats?.top_attack_types || [];

  return (
    <div className="min-h-screen bg-black text-white p-3 sm:p-4 md:p-6">

      {/* ── Nav ── */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {["Overview","Analytics","Transactions","Accounts","Settings"].map((item, i) => (
            <button key={i}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm ${
                i === 0 ? "bg-white text-black" : "bg-[#1a1a1a] text-gray-300"
              }`}>{item}</button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Bell size={18} />
          <div className="w-10 h-10 rounded-full bg-yellow-400" />
        </div>
      </div>

      {/* ── Title + date picker ── */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <h1 className="text-xl md:text-2xl font-semibold">QuantumSentinel IDS</h1>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="bg-[#1a1a1a] p-2 rounded-lg"><Search size={14} /></div>

          {/* ── Date-range picker ── */}
          <div className="relative" ref={pickerRef}>
            <button
              onClick={() => { setDraftFrom(fromDate); setDraftTo(toDate); setPickerOpen(v => !v); }}
              className="bg-[#1a1a1a] px-3 py-2 rounded-lg text-xs flex items-center gap-2 hover:bg-[#2a2a2a] transition-colors"
            >
              <span className="text-white/60">{fmtDisplay(fromDate)}</span>
              <span className="text-white/30">→</span>
              <span className="text-white/60">{fmtDisplay(toDate)}</span>
              <ChevronDown size={12} className={`text-white/40 transition-transform ${pickerOpen ? "rotate-180" : ""}`} />
            </button>

            {pickerOpen && (
              <div className="absolute right-0 top-full mt-2 z-50 bg-[#111] border border-white/10 rounded-2xl p-4 shadow-2xl w-[300px]">
                <p className="text-xs text-white/50 mb-3 font-medium">Select date range</p>

                <div className="flex flex-col gap-3">
                  <div>
                    <label className="text-[10px] text-white/40 mb-1 block">From</label>
                    <input
                      type="date"
                      value={draftFrom}
                      max={draftTo}
                      onChange={(e) => setDraftFrom(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white
                        [color-scheme:dark] focus:outline-none focus:border-purple-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-white/40 mb-1 block">To</label>
                    <input
                      type="date"
                      value={draftTo}
                      min={draftFrom}
                      max={toInputDate(new Date())}
                      onChange={(e) => setDraftTo(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white
                        [color-scheme:dark] focus:outline-none focus:border-purple-500/50"
                    />
                  </div>
                </div>

                {/* Quick presets */}
                <div className="flex gap-2 mt-3 flex-wrap">
                  {[
                    { label: "Today",   days: 0 },
                    { label: "7 days",  days: 7 },
                    { label: "30 days", days: 30 },
                    { label: "90 days", days: 90 },
                  ].map(({ label, days }) => (
                    <button
                      key={label}
                      onClick={() => {
                        const t = new Date();
                        const f = new Date(t);
                        f.setDate(t.getDate() - days);
                        setDraftFrom(toInputDate(f));
                        setDraftTo(toInputDate(t));
                      }}
                      className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] text-white/60 transition-colors"
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={applyDateRange}
                  className="mt-4 w-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium py-2 rounded-xl transition-colors"
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* ── Generate Report ── */}
          <button
            onClick={handleGenerateReport}
            disabled={reporting}
            className="bg-[#1a1a1a] hover:bg-[#2a2a2a] disabled:opacity-50 px-3 py-2 rounded-lg text-xs
              flex items-center gap-2 transition-colors"
          >
            {reporting
              ? <><Loader2 size={12} className="animate-spin" /> Generating…</>
              : <><FileText size={12} /> Generate Report</>
            }
          </button>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        <AiAssistantCard stats={stats} />
        <div className="lg:col-span-2 grid grid-cols-2 gap-4" style={{ gridAutoRows: "370px" }}>
          <BalanceCard     topAttacks={topAttacks} />
          <IncomeExpenseCard topAttacks={topAttacks} />
          <ProfitCard      recentAlerts={stats?.recent_detections || []} />
          <StatsCircleCard stats={stats} topAttacks={topAttacks} recentAlerts={threats} />
        </div>
      </div>

      {/* ── Threat table ── */}
      <div className="mt-5">
        <DetailsOfRisks threats={threats} onDelete={handleDelete} />
      </div>
    </div>
  );
}
