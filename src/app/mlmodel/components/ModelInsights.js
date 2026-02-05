"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, AlertTriangle, TrendingUp } from "lucide-react";

export default function ModelInsights({ insights }) {
  const threatLevelColor = {
    Low: "text-green-400 bg-green-500/20",
    Medium: "text-yellow-400 bg-yellow-500/20",
    High: "text-red-400 bg-red-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="border border-blue-500/20 rounded-xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 backdrop-blur-sm p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Brain className="text-purple-400" size={24} />
        <h2 className="text-xl font-semibold text-gray-200">Model Insights</h2>
      </div>

      {/* Confidence Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Confidence Score</span>
          <span className="text-2xl font-bold text-blue-400">
            {insights.confidence}%
          </span>
        </div>
        <div className="bg-gray-700/30 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${insights.confidence}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          />
        </div>
      </div>

      {/* Threat Level */}
      <div className="mb-6 p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="text-red-400" size={20} />
            <span className="text-sm text-gray-400">Threat Level</span>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              threatLevelColor[insights.threatLevel]
            }`}
          >
            {insights.threatLevel}
          </span>
        </div>
      </div>

      {/* Top Features */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <TrendingUp className="text-green-400" size={18} />
          <h3 className="text-sm font-semibold text-gray-300">
            Top Contributing Features
          </h3>
        </div>

        <div className="space-y-3">
          {insights.topFeatures.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-300 mb-1">{feature}</div>
                <div className="bg-gray-700/30 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${90 - index * 15}%` }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                    className="h-full bg-gradient-to-r from-blue-400 to-purple-400"
                  />
                </div>
              </div>
              <span className="text-xs text-gray-500 w-12 text-right">
                {90 - index * 15}%
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Badge */}
      <div className="mt-6 pt-4 border-t border-blue-500/20">
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
          <span>Powered by Generative AI</span>
        </div>
      </div>
    </motion.div>
  );
}