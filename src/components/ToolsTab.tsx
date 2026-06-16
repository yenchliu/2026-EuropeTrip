import { Plane, Phone, Info, ShieldAlert } from "lucide-react";

export function ToolsTab() {
  return (
    <div className="flex flex-col gap-6 p-6 pb-12">
      {/* Flight Info */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[10px] font-bold text-[#A6A49B] tracking-widest uppercase flex items-center gap-2">
          <Plane className="w-3.5 h-3.5" />
          航班資訊 / FLIGHT
        </h3>
        
        <div className="flex flex-col gap-3">
          <div className="bg-white p-4 rounded-xl border border-[#EBE9E0] shadow-sm flex flex-col">
            <span className="text-[10px] font-bold tracking-widest text-[#8C8A82] uppercase mb-1.5">去程 | 2026/06/27 (六)</span>
            <div className="flex justify-between items-center">
              <span className="font-medium text-[#2D2D2D]">長榮航空 BR67</span>
              <span className="text-sm font-serif italic text-blue-700">08:15 - 19:20</span>
            </div>
            <span className="text-xs text-[#8C8A82] mt-1">台北桃園(TPE) ✈ 倫敦希斯洛(LHR)</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#EBE9E0] shadow-sm flex flex-col opacity-80">
            <span className="text-[10px] font-bold tracking-widest text-[#8C8A82] uppercase mb-1.5">回程 | 2026/07/06 (一)</span>
            <div className="flex justify-between items-center">
              <span className="font-medium text-[#2D2D2D]">長榮航空 BR88</span>
              <span className="text-sm font-serif italic text-blue-700">11:20 - 07:00(+1)</span>
            </div>
            <span className="text-xs text-[#8C8A82] mt-1">巴黎戴高樂(CDG) ✈ 台北桃園(TPE)</span>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[10px] font-bold text-[#A6A49B] tracking-widest uppercase flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5" />
          緊急聯絡電話 / SOS
        </h3>
        
        <div className="bg-white p-5 rounded-xl border border-[#EBE9E0] shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-dashed border-[#E5E3DB] pb-3">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[#2D2D2D]">旅外國人急難救助全球免付費專線</span>
            </div>
            <a href="tel:800-0885-0885" className="bg-rose-50 text-rose-600 p-2 rounded-full hover:bg-rose-100 transition-colors">
              <Phone className="w-4 h-4" />
            </a>
          </div>
          
          <div className="flex items-center justify-between border-b border-dashed border-[#E5E3DB] pb-3">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[#2D2D2D]">參團領隊: 林佩君</span>
              <span className="text-xs text-[#8C8A82]">台灣手機</span>
            </div>
            <a href="tel:0952520435" className="bg-[#F1F0E9] text-[#2D2D2D] p-2 rounded-full hover:bg-[#EBE9E0] transition-colors">
              <Phone className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[#2D2D2D]">桃園二航廈代表送機協助</span>
            </div>
            <a href="tel:0988-236335" className="bg-[#F1F0E9] text-[#2D2D2D] p-2 rounded-full hover:bg-[#EBE9E0] transition-colors">
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[10px] font-bold text-[#A6A49B] tracking-widest uppercase flex items-center gap-2">
          <Info className="w-3.5 h-3.5" />
          旅遊須知 / INFO
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-xl border border-[#EBE9E0] shadow-sm flex flex-col gap-1">
            <span className="text-[10px] font-bold tracking-widest text-[#8C8A82] uppercase">英國時差</span>
            <span className="text-sm font-medium text-[#2D2D2D]">夏令慢 7 小時</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-[#EBE9E0] shadow-sm flex flex-col gap-1">
            <span className="text-[10px] font-bold tracking-widest text-[#8C8A82] uppercase">法國時差</span>
            <span className="text-sm font-medium text-[#2D2D2D]">夏令慢 6 小時</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-[#EBE9E0] shadow-sm flex flex-col gap-1">
            <span className="text-[10px] font-bold tracking-widest text-[#8C8A82] uppercase">英國電壓</span>
            <span className="text-sm font-medium text-[#2D2D2D]">220V 三腳扁型</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-[#EBE9E0] shadow-sm flex flex-col gap-1">
            <span className="text-[10px] font-bold tracking-widest text-[#8C8A82] uppercase">法國電壓</span>
            <span className="text-sm font-medium text-[#2D2D2D]">220V 雙腳圓型</span>
          </div>
        </div>
      </div>
    </div>
  );
}
