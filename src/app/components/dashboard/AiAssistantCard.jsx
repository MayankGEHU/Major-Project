"use client"
import { useState, useEffect, useRef } from "react";
import { FaMicrophone } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import * as THREE from "three";

function Sphere3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    if (mountRef.current.childNodes.length > 0) return;
    const width = 350;
    const height = 350;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(width, height);

    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1.7, 28, 28);

    const material = new THREE.MeshBasicMaterial({
      color: 0xff8c00,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      sphere.rotation.y += 0.0035;
      sphere.rotation.x += 0.0015;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);

      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (
        mountRef.current &&
        renderer.domElement &&
        mountRef.current.contains(renderer.domElement)
      ) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} />;
}

export default function AiAssistantCard({ stats }) {
  const [listening, setListening] = useState(false);

  const fmt = (n) => {
    if (n == null) return "–";
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
    if (n >= 1_000)     return (n / 1_000).toFixed(1) + "K";
    return n.toLocaleString();
  };

  const metrics = [
    { label: "Threats Detected",  value: fmt(stats?.total_threats),    tag: "High" },
    { label: "Packets Analyzed",  value: fmt(stats?.total_detections),  tag: "Real-time" },
    { label: "Blocked Attacks",   value: fmt((stats?.critical_count ?? 0) + (stats?.high_count ?? 0)), tag: "Auto Mitigated" },
  ];

  const handleMicClick = () => {
    setListening(!listening);
  };

  return (
    <div className="bg-[#0b0b0b] text-white rounded-3xl px-5 pt-5 pb-5 w-full max-w-md mx-auto border border-white/5 shadow-sm overflow-hidden">

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-[#1a1a1a] rounded-2xl flex items-center justify-center">
          <HiSparkles className="text-blue-400" size={20} />
        </div>
        <h2 className="text-lg font-medium text-gray-200">
          Gen AI Based IDS
        </h2>
      </div>

      <div className="flex justify-center">
        <Sphere3D />
      </div>

      <div className="-mt-32 relative z-10">

        <div className="
          flex items-center justify-between
          bg-white/5 
          backdrop-blur-xl 
          border border-white/10 
          rounded-2xl px-4 py-3 
          shadow-[0_8px_30px_rgba(0,0,0,0.5)]
        ">
          <h3 className="text-sm text-gray-200 font-medium tracking-wide">
            Gen AI Based IDS
          </h3>
        </div>

        <div className="
          mt-3 p-5 rounded-3xl 
          bg-white/5 
          backdrop-blur-xl 
          border border-white/10 
          shadow-[0_8px_30px_rgba(0,0,0,0.5)]
        ">

          <div>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-base font-medium text-gray-200">
                IDS System Overview
              </h3>
              <div className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-gray-300">
                ↗
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {metrics.map((item, i) => (
                <div
                  key={i}
                  className="
                    bg-white/5 
                    backdrop-blur-md 
                    border border-white/10 
                    py-5 px-3 rounded-2xl text-center
                  "
                >
                  <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                  <p className="text-base font-semibold">{item.value}</p>
                  <div className="mt-3 bg-black/70 text-white text-[11px] px-3 py-[5px] rounded-full inline-block">
                    {item.tag}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md mt-5 p-4 rounded-2xl border border-white/10">
            <p className="text-sm text-gray-300">
              AI-powered IDS achieved <span className="text-green-400 font-semibold">96.7% accuracy</span> with real-time TCP-based threat detection.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}