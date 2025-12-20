"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Zap } from "lucide-react";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";

export default function RadialOrbitalTimeline({ timelineData }) {
  const [expandedItems, setExpandedItems] = useState({});
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState({});
  const [activeNodeId, setActiveNodeId] = useState(null);

  const containerRef = useRef(null);
  const orbitRef = useRef(null);
  const nodeRefs = useRef({});

  const handleContainerClick = (e) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id) => {
    setExpandedItems((prev) => {
      const next = {};
      Object.keys(prev).forEach((k) => (next[k] = false));

      const isOpening = !prev[id];
      next[id] = isOpening;

      if (isOpening) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const related = getRelatedItems(id);
        const pulse = {};
        related.forEach((r) => (pulse[r] = true));
        setPulseEffect(pulse);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return next;
    });
  };

  useEffect(() => {
    if (!autoRotate) return;
    const timer = setInterval(
      () => setRotationAngle((a) => (a + 0.3) % 360),
      50
    );
    return () => clearInterval(timer);
  }, [autoRotate]);

  const centerViewOnNode = (id) => {
    const index = timelineData.findIndex((i) => i.id === id);
    const angle = (index / timelineData.length) * 360;
    setRotationAngle(270 - angle);
  };

  const calculateNodePosition = (index, total) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 160; // ↓ reduced radius
    const rad = (angle * Math.PI) / 180;

    return {
      x: radius * Math.cos(rad),
      y: radius * Math.sin(rad),
      zIndex: Math.round(100 + 50 * Math.cos(rad)),
      opacity: Math.max(0.45, Math.min(1, 0.5 + 0.5 * Math.sin(rad))),
    };
  };

  const getRelatedItems = (id) =>
    timelineData.find((i) => i.id === id)?.relatedIds || [];

  const getStatusStyles = (status) =>
    status === "completed"
      ? "text-white bg-black border-white"
      : status === "in-progress"
      ? "text-black bg-white border-black"
      : "text-white bg-black/40 border-white/50";

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className="w-full h-[520px] flex items-center justify-center  overflow-hidden"
    >
      <div className="relative w-full max-w-4xl h-[520px] flex items-center justify-center">
        <div
          ref={orbitRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* CENTER CORE */}
          <div className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse z-10 flex items-center justify-center">
            <div className="w-7 h-7 rounded-full bg-white/80" />
          </div>

          {/* ORBIT */}
          <div className="absolute w-80 h-80 rounded-full border border-white/10" />

          {timelineData.map((item, index) => {
            const pos = calculateNodePosition(index, timelineData.length);
            const expanded = expandedItems[item.id];
            const related = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px)`,
                  zIndex: expanded ? 200 : pos.zIndex,
                  opacity: expanded ? 1 : pos.opacity,
                }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    expanded
                      ? "bg-white text-black scale-150 border-white"
                      : related
                      ? "bg-white/50 text-black border-white animate-pulse"
                      : "bg-black text-white border-white/40"
                  }`}
                >
                  <Icon size={16} />
                </div>

                <div className="absolute top-12 text-xs text-white/70 whitespace-nowrap">
                  {item.title}
                </div>

                {expanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-black/90 border-white/30">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge className={getStatusStyles(item.status)}>
                          {item.status.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-white/50">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-sm mt-2">
                        {item.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="text-xs text-white/80">
                      {item.content}

                      <div className="mt-3">
                        <Zap size={10} /> Energy: {item.energy}%
                        <div className="h-1 bg-white/10 mt-1">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${item.energy}%` }}
                          />
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4">
                          {item.relatedIds.map((rid) => {
                            const rel = timelineData.find(
                              (i) => i.id === rid
                            );
                            return (
                              <Button
                                key={rid}
                                size="sm"
                                variant="outline"
                                className="text-xs mr-1"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleItem(rid);
                                }}
                              >
                                {rel?.title}
                                <ArrowRight size={8} className="ml-1" />
                              </Button>
                            );
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
