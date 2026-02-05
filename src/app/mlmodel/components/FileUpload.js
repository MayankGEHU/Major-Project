"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, File, CheckCircle, X } from "lucide-react";

export default function FileUpload({ onFileUpload }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    []
  );

  const handleChange = useCallback((e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, []);

  const handleFile = (file) => {
    setUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setUploadedFile(file);
      setUploading(false);
      onFileUpload(file);
    }, 1000);
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        {!uploadedFile ? (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`
              relative border-2 border-dashed rounded-xl p-12 text-center
              transition-all duration-300 cursor-pointer
              bg-gradient-to-br from-blue-500/5 to-purple-500/5
              backdrop-blur-sm
              ${
                dragActive
                  ? "border-blue-500 bg-blue-500/10 scale-[1.02]"
                  : "border-blue-500/30 hover:border-blue-500/50"
              }
            `}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleChange}
              accept=".csv,.pcap,.json"
            />

            <label htmlFor="file-upload" className="cursor-pointer">
              <motion.div
                animate={uploading ? { scale: [1, 1.1, 1] } : {}}
                transition={{ repeat: uploading ? Infinity : 0, duration: 1 }}
              >
                <Upload
                  className={`mx-auto mb-4 ${
                    uploading ? "text-blue-400 animate-pulse" : "text-blue-500"
                  }`}
                  size={48}
                />
              </motion.div>

              <h3 className="text-xl font-semibold text-gray-200 mb-2">
                {uploading ? "Uploading..." : "Upload Network Traffic File"}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Drag and drop or click to browse
              </p>
              <p className="text-gray-500 text-xs">
                Supported formats: CSV, PCAP, JSON
              </p>
            </label>

            {/* Animated Grid Background */}
            <div className="absolute inset-0 -z-10 opacity-20">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: "20px 20px",
                }}
              />
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-blue-500/30 rounded-xl p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <File className="text-blue-400" size={24} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-200">
                      {uploadedFile.name}
                    </h4>
                    <CheckCircle className="text-green-400" size={20} />
                  </div>
                  <p className="text-sm text-gray-400">
                    {(uploadedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={removeFile}
                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <X className="text-red-400" size={20} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 bg-gray-700/30 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}