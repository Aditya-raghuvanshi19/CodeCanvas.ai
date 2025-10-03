"use client";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import Lookup from "@/data/Lookup";

export function SparklesPreview() {
  return (
    <div className="relative flex items-center justify-center w-full overflow-visible">
      <div className="relative flex flex-col items-center w-full">
        {/* Heading - responsive and never clipped */}
        <h1
          className="whitespace-nowrap 
                     text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 
                     font-bold text-white relative z-20 text-center px-4"
        >
          {Lookup.HERO_HEADING}
        </h1>

        {/* Sparkle underline */}
        <div className="relative w-full max-w-7xl h-20 mt-3">
          {/* Blue Gradient Lines */}
          <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] blur-sm" />
          <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[3px] w-2/3 mx-auto blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-2/3 mx-auto" />

          {/* Sparkles animation */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1.2}
            particleDensity={900}
            className="w-full h-full"
            particleColor="#3b82f6" // nice Tailwind blue
          />

          {/* Soft fade edges */}
          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(500px_150px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
    </div>
  );
}
