"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Target, Activity, Award } from "lucide-react";

export default function PerformanceMetrics({ metrics }) {
  const metricCards = [
    {
      label: "Accuracy",
      value: metrics.accuracy,
      icon: Target,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Precision",
      value: metrics.precision,
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Recall",
      value: metrics.recall,
      icon: Activity,
      color: "from-orange-500 to-yellow-500",
    },
    {
      label: "F1-Score",
      value: metrics.f1Score,
      icon: Award,
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metricCards.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="relative group"
        >
          <div className="relative overflow-hidden rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-purple-500/5 backdrop-blur-sm p-6 hover:border-blue-500/40 transition-all duration-300">
            {/* Glow Effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <metric.icon className="text-gray-400" size={24} />
                <div
                  className={`px-2 py-1 rounded-full bg-gradient-to-r ${metric.color} text-xs font-semibold`}
                >
                  {metric.value}%
                </div>
              </div>

              <h3 className="text-sm font-medium text-gray-400 mb-2">
                {metric.label}
              </h3>

              {/* Animated Progress Bar */}
              <div className="bg-gray-700/30 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.value}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`h-full bg-gradient-to-r ${metric.color}`}
                />
              </div>
            </div>

            {/* Corner Accent */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}