"use client";
import { Sparkles } from "lucide-react";
import React from "react";

export default function LoadingScreen() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-white">
      {/* Logo / Icon */}
      <div className="flex items-center space-x-3 mb-6">
        <Sparkles className="h-10 w-10 text-purple-500 animate-pulse" />
        <span className="text-2xl font-bold">DevCanvas.ai</span>
      </div>

      {/* Spinner */}
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 border-gray-700 animate-spin"></div>
      </div>

      {/* Loading Text */}
      <p className="text-neutral-400 animate-pulse ml-3">Loading....</p>
    </div>
  );
}
