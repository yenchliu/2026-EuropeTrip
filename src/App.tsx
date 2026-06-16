import { useState } from "react";
import { ItineraryCard } from "./components/ItineraryCard";
import { ExpenseTracker } from "./components/ExpenseTracker";
import { ToolsTab } from "./components/ToolsTab";
import { itineraryData } from "./data/itinerary";
import { MapIcon, Wallet, Grip, Plane } from "lucide-react";
import { cn } from "./lib/utils";
import { motion, AnimatePresence } from "motion/react";

type Tab = "itinerary" | "tools" | "budget";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("itinerary");
  const [selectedDay, setSelectedDay] = useState(1);

  const activeDayData = itineraryData.find(d => d.day === selectedDay) || itineraryData[0];

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#F8F7F2] font-sans selection:bg-[#EBE9E0] text-[#2D2D2D]">
      {/* Dynamic Header */}
      <div className="sticky top-0 z-40 bg-[#F8F7F2]/80 backdrop-blur-xl pt-14 pb-3 px-4 border-b border-[#E5E3DB]">
        <h1 className="text-2xl font-serif font-light text-[#1A1A1A]">
          {activeTab === "itinerary" ? "2026英法之旅" : activeTab === "tools" ? "旅遊工具箱" : "記帳"}
        </h1>
        
        {/* Day Selector (Only in Itinerary Tab) */}
        {activeTab === "itinerary" && (
          <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1 hide-scrollbar -mx-4 px-4 snap-x">
            {itineraryData.map(day => (
              <button
                key={day.day}
                onClick={() => setSelectedDay(day.day)}
                className={cn(
                  "snap-start shrink-0 flex flex-col items-center justify-center w-14 h-16 rounded-2xl transition-all duration-300",
                  selectedDay === day.day 
                    ? "bg-neutral-900 text-white shadow-md scale-105" 
                    : "bg-white text-neutral-500 border border-neutral-200/60 hover:bg-neutral-50"
                )}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-80 mb-0.5">Day</span>
                <span className="text-lg font-bold leading-none">{day.day}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + selectedDay}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "itinerary" && <ItineraryCard dayInfo={activeDayData} />}
            {activeTab === "tools" && <ToolsTab />}
            {activeTab === "budget" && <ExpenseTracker />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#F8F7F2]/90 backdrop-blur-xl border-t border-[#E5E3DB] pb-safe">
        <div className="flex items-center justify-around px-2 py-3">
          <NavButton 
            icon={<MapIcon className="w-5 h-5" />} 
            label="行程" 
            isActive={activeTab === "itinerary"} 
            onClick={() => setActiveTab("itinerary")} 
          />
          <NavButton 
            icon={<Grip className="w-5 h-5" />} 
            label="工具" 
            isActive={activeTab === "tools"} 
            onClick={() => setActiveTab("tools")} 
          />
          <NavButton 
            icon={<Wallet className="w-5 h-5" />} 
            label="記帳" 
            isActive={activeTab === "budget"} 
            onClick={() => setActiveTab("budget")} 
          />
        </div>
      </div>
    </div>
  );
}

function NavButton({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center w-16 gap-1 transition-colors",
        isActive ? "text-[#2D2D2D]" : "text-[#8C8A82] hover:text-[#2D2D2D]"
      )}
    >
      <div className={cn(
        "p-1.5 rounded-xl transition-all duration-300",
        isActive && "bg-[#EBE9E0]"
      )}>
        {icon}
      </div>
      <span className={cn(
        "text-[10px] font-bold tracking-widest uppercase",
        isActive ? "opacity-100" : "opacity-0 scale-75"
      )}>
        {label}
      </span>
    </button>
  );
}
