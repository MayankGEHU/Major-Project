"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import FileUpload from "./components/FileUpload";
import AttackTypeChart from "./components/AttackTypeChart";
import PerformanceMetrics from "./components/PerformanceMetrics";
import ThreatTimeline from "./components/ThreatTimeline";
import ConfusionMatrix from "./components/ConfusionMatrix";
import ModelInsights from "./components/ModelInsights";

export default function MLModelPage() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    
    // Simulate API call - replace with your actual backend call
    setTimeout(() => {
      setAnalysisResults({
        attackTypes: [
          { name: "DDoS", value: 35, color: "#3b82f6" },
          { name: "SQL Injection", value: 25, color: "#8b5cf6" },
          { name: "XSS", value: 20, color: "#ec4899" },
          { name: "Brute Force", value: 15, color: "#f59e0b" },
          { name: "Normal", value: 5, color: "#10b981" },
        ],
        metrics: {
          accuracy: 96.8,
          precision: 94.2,
          recall: 95.5,
          f1Score: 94.8,
        },
        timeline: generateTimelineData(),
        confusionMatrix: [
          [450, 12, 8, 5],
          [10, 380, 15, 7],
          [5, 18, 420, 9],
          [8, 6, 10, 395],
        ],
        insights: {
          topFeatures: ["Packet Size", "Protocol Type", "Destination Port"],
          confidence: 97.3,
          threatLevel: "High",
        },
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0f1c3a] to-[#1a2645] text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-blue-500/20 bg-black/20 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            ML Model Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Analyze network traffic and detect threats using Generative AI
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* File Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FileUpload onFileUpload={handleFileUpload} />
        </motion.div>

        {/* Analysis Results */}
        {analysisResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-8 space-y-6"
          >
            {/* Performance Metrics */}
            <PerformanceMetrics metrics={analysisResults.metrics} />

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AttackTypeChart data={analysisResults.attackTypes} />
              <ThreatTimeline data={analysisResults.timeline} />
            </div>

            {/* Confusion Matrix & Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ConfusionMatrix matrix={analysisResults.confusionMatrix} />
              <ModelInsights insights={analysisResults.insights} />
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!analysisResults && !uploadedFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 text-center"
          >
            <div className="text-6xl mb-4">🔒</div>
            <h3 className="text-2xl font-semibold text-gray-300 mb-2">
              Ready to Analyze
            </h3>
            <p className="text-gray-500">
              Upload a network traffic file to begin threat detection
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Helper function to generate mock timeline data
function generateTimelineData() {
  const data = [];
  const now = Date.now();
  for (let i = 23; i >= 0; i--) {
    data.push({
      time: new Date(now - i * 3600000).toLocaleTimeString("en-US", {
        hour: "2-digit",
      }),
      threats: Math.floor(Math.random() * 50) + 10,
      normal: Math.floor(Math.random() * 100) + 50,
    });
  }
  return data;
}