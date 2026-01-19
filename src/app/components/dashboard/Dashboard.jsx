"use client";
import TopBar from "./TopBar";
import StatCards from "./StatCards";
import TrafficOverview from "./TrafficOverview";
import ActivePorts from "./ActivePorts";
import ThreatTable from "./ThreatTable";
import PageTransition from "../transition/PageTransition";

export default function Dashboard() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white p-6">
      <TopBar />
      <StatCards />

      <div className="grid grid-cols-1 lg:grid-cols-[2.2fr_0.8fr] gap-6 mb-6">
        <TrafficOverview />
        <ActivePorts />
      </div>

      <ThreatTable />
    </div>
      </PageTransition>
  );
}
