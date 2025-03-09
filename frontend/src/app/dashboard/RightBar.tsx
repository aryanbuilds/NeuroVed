"use client";
import React from "react";
import { Home, LayoutDashboard, MessageCircle, Info, Brain } from "lucide-react";

type ActiveView = "dash" | "ai" | "data";

interface RightBarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

const RightBar: React.FC<RightBarProps> = ({ activeView, setActiveView }) => {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-20 bg-white shadow-lg flex flex-col items-center py-6 space-y-8">
      {/* Logo or Brand */}
      <div className="p-2">
        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
          NEuroDev
        </div>
      </div>
      
      <div className="space-y-6 flex flex-col items-center">
        <button
          onClick={() => setActiveView("dash")}
          className={`flex items-center justify-center p-2 rounded-full transition ${
            activeView === "dash" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-blue-50"
          }`}
          title="Patient Dashboard"
        >
          <Home className="h-6 w-6" />
        </button>
        
        <button
          onClick={() => setActiveView("ai")}
          className={`flex items-center justify-center p-2 rounded-full transition ${
            activeView === "ai" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-blue-50"
          }`}
          title="AI Doctor"
        >
          <Brain className="h-6 w-6" />
        </button>
        
        <button
          onClick={() => setActiveView("data")}
          className={`flex items-center justify-center p-2 rounded-full transition ${
            activeView === "data" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-blue-50"
          }`}
          title="Data Analytics"
        >
          <LayoutDashboard className="h-6 w-6" />
        </button>
        
        <button 
          className="flex items-center justify-center p-2 rounded-full text-gray-600 hover:bg-blue-50 transition"
          title="Messages"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
        
        <button 
          className="flex items-center justify-center p-2 rounded-full text-gray-600 hover:bg-blue-50 transition"
          title="Information"
        >
          <Info className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default RightBar; 