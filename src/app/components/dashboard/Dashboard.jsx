"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Bell, ChevronDown, FileText, Loader2 } from "lucide-react";

import AiAssistantCard from "./AiAssistantCard";
import BalanceCard from "./BalanceCard";
import IncomeExpenseCard from "./IncomeExpenseCard";
import ProfitCard from "./ProfitCard";
import StatsCircleCard from "./StatsCircleCard";
import DetailsOfRisks from "./DetailsOfRisks";

import { generateReport } from "../../../utils/generateReport";
import {
  fetchStats,
  fetchStatsByRange,
  fetchAlerts,
  fetchAlertsByRange,
  deleteAlert,
  getWsUrl,
} from "../../../lib/api";

const toInputDate = (d) => d.toISOString().slice(0, 10);

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [threats, setThreats] = useState([]);
  const wsRef = useRef(null);

  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);

  const [fromDate, setFromDate] = useState(toInputDate(weekAgo));
  const [toDate, setToDate] = useState(toInputDate(today));

  const [pickerOpen, setPickerOpen] = useState(false);
  const [draftFrom, setDraftFrom] = useState(toInputDate(weekAgo));
  const [draftTo, setDraftTo] = useState(toInputDate(today));
  const pickerRef = useRef(null);

  const [reporting, setReporting] = useState(false);

  useEffect(() => {
    loadData();

    const ws = new WebSocket(getWsUrl());
    wsRef.current = ws;
    ws.onmessage = () => loadData();

    return () => ws.close();
  }, []);

  const loadData = async () => {
    try {
      const [s, a] = await Promise.all([
        fetchStats("week"),
        fetchAlerts({ threats_only: true, page_size: 20 }),
      ]);
      setStats(s);
      setThreats(a.items || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleGenerateReport = async () => {
    setReporting(true);
    try {
      const [reportStats, reportAlerts] = await Promise.all([
        fetchStatsByRange(fromDate, toDate),
        fetchAlertsByRange(fromDate, toDate),
      ]);

      generateReport({
        stats: reportStats,
        alerts: reportAlerts.items || [],
        fromDate,
        toDate,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setReporting(false);
    }
  };

  const applyDateRange = () => {
    setFromDate(draftFrom);
    setToDate(draftTo);
    setPickerOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">QuantumSentinel IDS</h1>

        <div className="flex items-center gap-2">

          <div className="relative" ref={pickerRef}>
            <button
              onClick={() => setPickerOpen(!pickerOpen)}
              className="bg-[#1a1a1a] px-3 py-2 rounded-lg text-xs flex items-center gap-2"
            >
              {fromDate} → {toDate}
              <ChevronDown size={12} />
            </button>

            {pickerOpen && (
              <div className="absolute top-12 right-0 bg-[#111] p-4 rounded-xl w-64 z-50">

                <div className="flex flex-col gap-3">
                  <input
                    type="date"
                    value={draftFrom}
                    onChange={(e) => setDraftFrom(e.target.value)}
                    className="bg-black border p-2 rounded"
                  />

                  <input
                    type="date"
                    value={draftTo}
                    onChange={(e) => setDraftTo(e.target.value)}
                    className="bg-black border p-2 rounded"
                  />
                </div>

                <button
                  onClick={applyDateRange}
                  className="mt-3 w-full bg-purple-600 py-2 rounded"
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          <button
            onClick={handleGenerateReport}
            disabled={reporting}
            className="bg-[#1a1a1a] px-3 py-2 rounded-lg text-xs flex items-center gap-2"
          >
            {reporting ? (
              <>
                <Loader2 size={12} className="animate-spin" /> Generating
              </>
            ) : (
              <>
                <FileText size={12} /> Report
              </>
            )}
          </button>

        </div>
      </div>
s
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <AiAssistantCard stats={stats} />

        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <BalanceCard />
          <IncomeExpenseCard />
          <ProfitCard />
          <StatsCircleCard stats={stats} />
        </div>
      </div>

      <div className="mt-5">
        <DetailsOfRisks threats={threats} />
      </div>

    </div>
  );
}