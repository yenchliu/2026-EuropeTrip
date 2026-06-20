import { useState, useEffect } from "react";
import { ArrowRight, RefreshCw, Calculator } from "lucide-react";

export function CurrencyConverter() {
  const [rates, setRates] = useState<{ EUR: number; GBP: number } | null>(null);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<"EUR" | "GBP">("GBP");
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchRates = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://open.er-api.com/v6/latest/TWD");
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      const twdToEur = data.rates.EUR;
      const twdToGbp = data.rates.GBP;
      setRates({
        EUR: 1 / twdToEur,
        GBP: 1 / twdToGbp,
      });
      const date = new Date(data.time_last_update_unix * 1000);
      setLastUpdated(date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    } catch (error) {
      console.error("Failed to fetch rates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const rate = rates ? rates[currency] : 0;
  const numAmount = parseFloat(amount) || 0;
  const result = Math.round(numAmount * rate);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-bold text-[#A6A49B] tracking-widest uppercase flex items-center gap-2">
          <Calculator className="w-3.5 h-3.5" />
          匯率轉換器 / CURRENCY
        </h3>
        <button 
          onClick={fetchRates} 
          disabled={loading}
          className="text-[#8C8A82] hover:text-[#2D2D2D] transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#EBE9E0] shadow-sm p-4 flex flex-col gap-4">
        {rates && (
          <div className="flex items-center justify-between text-xs text-[#8C8A82]">
            <span>1 {currency === "GBP" ? "英鎊 (£)" : "歐元 (€)"} ≈ {rate.toFixed(2)} 台幣 (NT$)</span>
            <span>更新於: {lastUpdated}</span>
          </div>
        )}

        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex-1 flex bg-[#F1F0E9] rounded-lg overflow-hidden border border-transparent focus-within:border-[#EBE9E0] focus-within:bg-white transition-colors">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as "EUR" | "GBP")}
              className="bg-transparent text-sm font-medium border-none outline-none pl-2.5 pr-1 py-3 text-[#2D2D2D]"
            >
              <option value="GBP">£</option>
              <option value="EUR">€</option>
            </select>
            <input
              type="text"
              inputMode="decimal"
              pattern="[0-9]*"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="金額"
              className="flex-1 w-full min-w-0 bg-transparent border-none outline-none pr-3 py-3 text-sm text-[#2D2D2D]"
            />
          </div>

          <ArrowRight className="w-4 h-4 text-[#8C8A82] shrink-0" />

          <div className="flex-1 flex items-center gap-1.5 bg-[#F8F7F2] rounded-lg px-3 py-3 border border-[#EBE9E0]">
            <span className="text-sm font-medium text-[#8C8A82]">NT$</span>
            <span className="text-sm font-bold text-[#2D2D2D] flex-1 truncate select-all">
              {result.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
