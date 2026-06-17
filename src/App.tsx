import React, { useState, useEffect } from "react";
import { ItineraryCard } from "./components/ItineraryCard";
import { ExpenseTracker } from "./components/ExpenseTracker";
import { ToolsTab } from "./components/ToolsTab";
import { itineraryData } from "./data/itinerary";
import { MapIcon, Wallet, Grip, Plane, X } from "lucide-react";
import { cn } from "./lib/utils";
import { motion, AnimatePresence } from "motion/react";

type Tab = "itinerary" | "tools" | "budget";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("itinerary");
  const [selectedDay, setSelectedDay] = useState(1);
  const [showFlightInfo, setShowFlightInfo] = useState(false);

  const activeDayData = itineraryData.find(d => d.day === selectedDay) || itineraryData[0];

  useEffect(() => {
    if (showFlightInfo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showFlightInfo]);

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#F8F7F2] font-sans selection:bg-[#EBE9E0] text-[#2D2D2D]">
      {/* Dynamic Header */}
      <div className="sticky top-0 z-40 bg-[#F8F7F2]/80 backdrop-blur-xl pt-14 pb-3 px-4 border-b border-[#E5E3DB]">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-serif font-light text-[#1A1A1A]">
            {activeTab === "itinerary" ? "2026英法之旅" : activeTab === "tools" ? "旅遊工具箱" : "記帳"}
          </h1>
          {activeTab === "itinerary" && (
            <button 
              onClick={() => setShowFlightInfo(true)}
              className="p-1.5 bg-neutral-100 rounded-full text-neutral-600 hover:bg-neutral-200 transition-colors"
            >
              <Plane className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {/* Day Selector (Only in Itinerary Tab) */}
        {activeTab === "itinerary" && (
          <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1 hide-scrollbar -mx-4 px-4 snap-x">
            {itineraryData.map(day => (
              <button
                key={day.day}
                onClick={() => setSelectedDay(day.day)}
                className={cn(
                  "snap-start shrink-0 flex flex-col items-center justify-center w-[60px] h-[72px] rounded-2xl transition-all duration-300",
                  selectedDay === day.day 
                    ? "bg-neutral-900 text-white shadow-md scale-105" 
                    : "bg-white text-neutral-500 border border-neutral-200/60 hover:bg-neutral-50"
                )}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-80 mb-0.5">Day</span>
                <span className="text-lg font-bold leading-none">{day.day}</span>
                <span className="text-[9px] font-medium opacity-60 mt-1">{day.date.substring(5, 10)}</span>
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

      {/* Flight Info Modal */}
      <AnimatePresence>
        {showFlightInfo && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
              onClick={() => setShowFlightInfo(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-4 right-4 top-[15%] z-[70] bg-[#F8F7F2] rounded-[24px] shadow-2xl p-6 flex flex-col gap-5 border border-white/50"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-[#A6A49B] tracking-widest uppercase flex items-center gap-2">
                  <Plane className="w-4 h-4" />
                  航班資訊
                </h3>
                <button 
                  onClick={() => setShowFlightInfo(false)}
                  className="p-1.5 bg-[#EBE9E0] rounded-full text-[#8C8A82] hover:text-[#1A1A1A] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <div className="bg-white p-4 rounded-xl border border-[#EBE9E0] shadow-sm flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-neutral-900 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">已排定</div>
                  <span className="text-[10px] font-bold tracking-widest text-[#8C8A82] uppercase mb-2">去程 | 2026/06/27 (六)</span>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-lg text-[#2D2D2D]">長榮 BR67</span>
                    <span className="text-sm font-medium bg-[#F1F0E9] px-2 py-1 rounded text-[#2D2D2D]">航廈 2 / 登機台 C2</span>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-3 border-t border-dashed border-[#E5E3DB]">
                    <div className="flex flex-col">
                      <span className="text-xl font-serif text-[#1A1A1A]">08:15</span>
                      <span className="text-[10px] font-bold text-[#8C8A82]">台北 (TPE)</span>
                    </div>
                    <div className="flex-1 px-4 flex flex-col items-center">
                      <span className="text-[10px] text-[#A6A49B]">18h 5m</span>
                      <div className="w-full h-[1px] bg-[#E5E3DB] relative my-1">
                        <Plane className="w-3 h-3 text-[#A6A49B] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      <span className="text-[10px] text-green-600 font-bold">準點</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-xl font-serif text-[#1A1A1A]">19:20</span>
                      <span className="text-[10px] font-bold text-[#8C8A82]">倫敦 (LHR)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#EBE9E0] shadow-sm flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-neutral-900 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">已排定</div>
                  <span className="text-[10px] font-bold tracking-widest text-[#8C8A82] uppercase mb-2">回程 | 2026/07/06 (一)</span>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-lg text-[#2D2D2D]">長榮 BR88</span>
                    <span className="text-sm font-medium bg-[#F1F0E9] px-2 py-1 rounded text-[#2D2D2D]">航廈 1 / 登機台 待定</span>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-3 border-t border-dashed border-[#E5E3DB]">
                    <div className="flex flex-col">
                      <span className="text-xl font-serif text-[#1A1A1A]">11:20</span>
                      <span className="text-[10px] font-bold text-[#8C8A82]">巴黎 (CDG)</span>
                    </div>
                    <div className="flex-1 px-4 flex flex-col items-center">
                      <span className="text-[10px] text-[#A6A49B]">13h 40m</span>
                      <div className="w-full h-[1px] bg-[#E5E3DB] relative my-1">
                        <Plane className="w-3 h-3 text-[#A6A49B] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      <span className="text-[10px] text-green-600 font-bold">準點</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-xl font-serif text-[#1A1A1A]">07:00</span>
                      <span className="text-[10px] font-bold text-[#8C8A82]">台北 (TPE)</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#F8F7F2]/90 backdrop-blur-xl border-t border-[#E5E3DB] pb-safe">
        <div className="flex items-center justify-around px-2 py-3">
          <NavButton 
            icon={<Grip className="w-5 h-5" />} 
            label="工具" 
            isActive={activeTab === "tools"} 
            onClick={() => setActiveTab("tools")} 
          />
          <NavButton 
            icon={<MapIcon className="w-5 h-5" />} 
            label="行程" 
            isActive={activeTab === "itinerary"} 
            onClick={() => setActiveTab("itinerary")} 
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
