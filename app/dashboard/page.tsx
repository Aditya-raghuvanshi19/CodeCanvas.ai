"use client";

import React from "react";
import Link from "next/link";
import { NavBar } from "../_components/NavBar";
import { FooterName } from "../_components/FooterName";
import { Code, PenTool } from "lucide-react"; // icons

function Dashboard() {
  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 xl:px-20 py-16">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-white tracking-tight">
            Developer <span className="text-purple-500">Dashboard</span>
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Access powerful AI tools to transform your ideas into code.  
            Pick a tool below to get started.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Wireframe to Code Card */}
          <Link href="/wireframe-to-code" className="block group">
            <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-2xl p-8 shadow-lg 
                            hover:border-purple-500/50 hover:shadow-purple-500/20 transition-all duration-300 
                            group-hover:-translate-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                  <PenTool className="w-6 h-6 text-purple-400" />
                  Wireframe to Code
                </h2>
              </div>
              <p className="text-gray-400 mt-4 mb-6">
                Convert design wireframes directly into clean, production-ready code with AI assistance.
              </p>

              <button className="w-full py-3 rounded-xl font-medium 
                                 bg-gradient-to-r from-purple-600 to-pink-600 text-white
                                 hover:from-purple-500 hover:to-pink-500 
                                 shadow-lg hover:shadow-purple-500/30 
                                 transition-all duration-300">
                🚀 Start Converting
              </button>
            </div>
          </Link>

          {/* Prompt to Code Card */}
          <Link href="/prompt-to-code/second-tool" className="block group">
            <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-2xl p-8 shadow-lg 
                            hover:border-blue-500/50 hover:shadow-blue-500/20 transition-all duration-300 
                            group-hover:-translate-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                  <Code className="w-6 h-6 text-blue-400" />
                  Prompt to Code
                </h2>
              </div>
              <p className="text-gray-400 mt-4 mb-6">
                Generate high-quality, optimized code directly from natural language prompts.
              </p>

              <button className="w-full py-3 rounded-xl font-medium 
                                 bg-gradient-to-r from-blue-600 to-cyan-600 text-white
                                 hover:from-blue-500 hover:to-cyan-500 
                                 shadow-lg hover:shadow-blue-500/30 
                                 transition-all duration-300">
                💡 Start Prompting
              </button>
            </div>
          </Link>
        </div>
      </div>

      <FooterName />
    </>
  );
}

export default Dashboard;
