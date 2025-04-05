import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import CVOptimizerApp from "./CVOptimizerApp";
import { Sparkles } from "lucide-react";

function Home() {
  return (
    <div className="w-screen min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4 mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-[#2B6CB0] to-[#4299E1] p-2 rounded-lg shadow-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#2B6CB0] font-playfair tracking-tight">
              Q-Genics<span className="text-[#4299E1]">AI</span>
            </h1>
          </div>
        </div>
      </header>
      <main>
        <CVOptimizerApp />
      </main>
      <footer className="mt-12 py-6 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Q-Genics AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;
