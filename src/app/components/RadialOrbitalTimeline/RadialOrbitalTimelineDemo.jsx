"use client";

import { Calendar, Code, FileText, User, Clock } from "lucide-react";
import RadialOrbitalTimeline from "./RadialOrbitalTimeline";
const timelineData = [
  {
    id: 1,
    title: "Research",
    date: "Jan 2024",
    content:
      "Analyzed modern cyber threats, attack vectors, and anomaly patterns to define objectives for the AI-powered intrusion detection system.",
    category: "Research",
    icon: Calendar,
    relatedIds: [2],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    title: "Architecture",
    date: "Feb 2024",
    content:
      "Designed scalable system architecture, data pipelines, and feature extraction for real-time threat detection.",
    category: "Architecture",
    icon: FileText,
    relatedIds: [1, 3],
    status: "completed",
    energy: 90,
  },
  {
    id: 3,
    title: "AI Models",
    date: "Mar 2024",
    content:
      "Built and trained machine learning models to detect anomalies, intrusions, and zero-day attacks.",
    category: "AI",
    icon: Code,
    relatedIds: [2, 4],
    status: "in-progress",
    energy: 65,
  },
  {
    id: 4,
    title: "Monitoring",
    date: "Apr 2024",
    content:
      "Integrated real-time network monitoring, alerting mechanisms, and evaluated detection accuracy.",
    category: "Monitoring",
    icon: User,
    relatedIds: [3, 5],
    status: "pending",
    energy: 35,
  },
  {
    id: 5,
    title: "Deployment",
    date: "May 2024",
    content:
      "Deployed the AI-powered IDS with performance optimization, security hardening, and model fine-tuning.",
    category: "Deployment",
    icon: Clock,
    relatedIds: [4],
    status: "pending",
    energy: 15,
  },
];

export default function RadialOrbitalTimelineDemo() {
  return <RadialOrbitalTimeline timelineData={timelineData} />;
}
