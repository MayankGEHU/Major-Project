"use client";

import { Search, Calendar, Bell } from "lucide-react";

import AiAssistantCard from "./AiAssistantCard";
import BalanceCard from "./BalanceCard";
import IncomeExpenseCard from "./IncomeExpenseCard";
import ProfitCard from "./ProfitCard";
import StatsCircleCard from "./StatsCircleCard";

import DetailsOfRisks from "./DetailsOfRisks";

import { generateReport } from "../../../utils/generateReport";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-3 sm:p-4 md:p-6 flex flex-col">

      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {["Overview", "Analytics", "Transactions", "Accounts", "Settings"].map(
            (item, i) => (
              <button
                key={i}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm ${i === 0
                  ? "bg-white text-black"
                  : "bg-[#1a1a1a] text-gray-300"
                  }`}
              >
                {item}
              </button>
            )
          )}
        </div>

        <div className="flex items-center gap-3">
          <Bell size={18} />
          <div className="w-10 h-10 rounded-full bg-yellow-400" />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <h1 className="text-xl md:text-2xl font-semibold">
          QuantumSentinel IDS
        </h1>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="bg-[#1a1a1a] p-2 rounded-lg">
            <Search size={14} />
          </div>
          <div className="bg-[#1a1a1a] p-2 rounded-lg">
            <Calendar size={14} />
          </div>

          <button className="bg-[#1a1a1a] px-3 py-2 rounded-lg text-xs">
            01 Jan 2025 - 31 Dec 2025
          </button>

          <button
            onClick={generateReport}
            className="bg-[#1a1a1a] px-3 py-2 rounded-lg text-xs"
          >
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">

        <AiAssistantCard />

        <div className="lg:col-span-2 grid grid-rows-2 gap-4">

          <div className="grid md:grid-cols-2 gap-4">
            <BalanceCard />
            <IncomeExpenseCard />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <ProfitCard />
            <StatsCircleCard />
          </div>

        </div>
      </div>
      <div className="mt-5">
        <DetailsOfRisks />
      </div>
    </div>
  );
}