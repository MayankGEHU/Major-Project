"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ConfusionMatrix({ matrix }) {
  const labels = ["DDoS", "SQL Inj", "XSS", "Brute Force"];
  const maxValue = Math.max(...matrix.flat());

  const getColor = (value) => {
    const intensity = value / maxValue;
    if (intensity > 0.8) return "bg-blue-500";
    if (intensity > 0.6) return "bg-blue-600";
    if (intensity > 0.4) return "bg-blue-700";
    if (intensity > 0.2) return "bg-blue-800";
    return "bg-blue-900";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="border border-blue-500/20 rounded-xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 backdrop-blur-sm p-6"
    >
      <h2 className="text-xl font-semibold text-gray-200 mb-4">
        Confusion Matrix
      </h2>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Header */}
          <div className="flex items-end mb-2 ml-24">
            <div className="text-center text-xs text-gray-400 mb-1 flex-1">
              Predicted
            </div>
          </div>

          <div className="flex">
            {/* Y-axis label */}
            <div className="flex items-center mr-2">
              <div
                className="text-xs text-gray-400"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                Actual
              </div>
            </div>

            {/* Matrix */}
            <div className="flex-1">
              {/* Column labels */}
              <div className="flex mb-2">
                <div className="w-20" />
                {labels.map((label, i) => (
                  <div
                    key={i}
                    className="flex-1 text-center text-xs text-gray-400 font-medium"
                  >
                    {label}
                  </div>
                ))}
              </div>

              {/* Matrix cells */}
              {matrix.map((row, i) => (
                <div key={i} className="flex items-center mb-2">
                  {/* Row label */}
                  <div className="w-20 text-xs text-gray-400 font-medium pr-2 text-right">
                    {labels[i]}
                  </div>

                  {/* Cells */}
                  {row.map((value, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: (i + j) * 0.05 }}
                      className="flex-1 mx-1"
                    >
                      <div
                        className={`
                          ${getColor(value)}
                          rounded-lg p-4 text-center font-semibold
                          ${i === j ? "ring-2 ring-green-400" : ""}
                          hover:scale-105 transition-transform cursor-pointer
                        `}
                      >
                        {value}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-blue-500/20">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Darker = Lower Values</span>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-blue-900" />
            <div className="w-3 h-3 rounded bg-blue-700" />
            <div className="w-3 h-3 rounded bg-blue-500" />
            <span>Lighter = Higher Values</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}