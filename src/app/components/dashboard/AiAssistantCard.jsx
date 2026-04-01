import { useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

export default function AiAssistantCard() {
  const [query, setQuery] = useState("");
  const [listening, setListening] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;

    console.log("User Query:", query);

    // 👉 connect your AI / backend here
    alert(`Searching for: ${query}`);

    setQuery("");
  };

  const handleMicClick = () => {
    setListening(!listening);
    console.log("Mic clicked");
  };

  return (
    <>
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .animate-gradient {
            background-size: 300% 300%;
            animation: gradientMove 6s ease infinite;
          }
        `}
      </style>

      <div className="bg-[#f3f3f3] text-black rounded-3xl px-5 pt-5 pb-3 w-full max-w-md mx-auto shadow-sm">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            <HiSparkles className="text-blue-500" size={20} />
          </div>
          <h2 className="text-lg font-medium">
            AI Security Assistant
          </h2>
        </div>

        {/* ORB */}
        <div className="flex justify-center -mb-39">
          <div className="w-74 h-74 rounded-full relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 via-blue-400 to-yellow-300 animate-gradient blur-[10px] opacity-90" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 via-blue-400 to-yellow-300 animate-gradient blur-[40px] opacity-40" />
          </div>
        </div>

        {/* INTERACTIVE INPUT */}
        <div className="relative z-10 mt-10 flex items-center bg-[#2563eb] rounded-2xl px-4 py-2 shadow-md">

          {/* INPUT */}
          <input
            type="text"
            placeholder="Ask Assistant..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 bg-transparent outline-none text-white placeholder-white text-sm"
          />

          {/* MIC */}
          <div
            onClick={handleMicClick}
            className={`w-10 h-10 ml-3 rounded-xl flex items-center justify-center text-white cursor-pointer transition 
              ${listening ? "bg-red-500 scale-110" : "bg-black"}`}
          >
            <FaMicrophone size={16} />
          </div>
        </div>

        {/* SUMMARY */}
        <div className="bg-[#eaeaea] mt-3 p-5 rounded-3xl shadow-inner flex flex-col justify-between">

          <div>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-base font-medium">
                Financial Summary
              </h3>
              <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm">
                ↗
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Total Income", value: "$128,400", tag: "+6% YoY" },
                { label: "Total Expenses", value: "$92,150", tag: "+3% YoY" },
                { label: "Net Savings", value: "$36,250", tag: "Growth" },
              ].map((item, i) => (
                <div key={i} className="bg-[#dddddd] py-5 px-3 rounded-2xl text-center">
                  <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                  <p className="text-base font-semibold">{item.value}</p>
                  <div className="mt-3 bg-black text-white text-[11px] px-3 py-[5px] rounded-full inline-block">
                    {item.tag}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#f1f1f1] mt-5 p-4 rounded-2xl">
            <p className="text-sm text-gray-600 leading-relaxed">
              Overall financial health improved by 6% year-over-year. Expense growth is controlled, while income streams remain stable.
            </p>
          </div>

        </div>

      </div>
    </>
  );
}