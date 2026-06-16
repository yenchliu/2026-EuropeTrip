import { useEffect, useState } from "react";
import { addExpense, deleteExpense, subscribeToExpenses, Expense } from "../lib/firebase";
import { Plus, Trash2, Wallet } from "lucide-react";
import { cn } from "../lib/utils";

const CATEGORY_COLORS = {
  Food: "bg-[#FDE68A] text-[#2D2D2D]",
  Transport: "bg-[#E5E3DB] text-[#2D2D2D]",
  Shopping: "bg-[#D1FAE5] text-[#2D2D2D]",
  Accommodation: "bg-[#2D2D2D] text-white",
  Other: "bg-[#F1F0E9] text-[#8C8A82]"
};

const CATEGORY_LABELS = {
  Food: "飲食",
  Transport: "交通",
  Shopping: "購物",
  Accommodation: "住宿",
  Other: "其他"
};

export function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<'EUR' | 'GBP' | 'TWD'>("EUR");
  const [category, setCategory] = useState<Expense['category']>("Food");

  useEffect(() => {
    const unsub = subscribeToExpenses((data) => {
      setExpenses(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount || isNaN(Number(amount))) return;
    
    // date in YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
    
    await addExpense({
      name,
      amount: Number(amount),
      currency,
      category,
      date: today
    });
    
    setName("");
    setAmount("");
  };

  const totalEUR = expenses.filter(e => e.currency === 'EUR').reduce((sum, e) => sum + e.amount, 0);
  const totalGBP = expenses.filter(e => e.currency === 'GBP').reduce((sum, e) => sum + e.amount, 0);
  const totalTWD = expenses.filter(e => e.currency === 'TWD').reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#EBE9E0] flex flex-col items-center justify-center">
          <span className="text-[10px] font-bold text-[#A6A49B] tracking-widest uppercase mb-1">歐元 EUR</span>
          <span className="font-serif italic text-[#1A1A1A] text-xl">€{totalEUR.toFixed(2)}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#EBE9E0] flex flex-col items-center justify-center">
          <span className="text-[10px] font-bold text-[#A6A49B] tracking-widest uppercase mb-1">英鎊 GBP</span>
          <span className="font-serif italic text-[#1A1A1A] text-xl">£{totalGBP.toFixed(2)}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#EBE9E0] flex flex-col items-center justify-center">
          <span className="text-[10px] font-bold text-[#A6A49B] tracking-widest uppercase mb-1">台幣 TWD</span>
          <span className="font-serif italic text-[#1A1A1A] text-xl">NT${totalTWD.toLocaleString()}</span>
        </div>
      </div>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="bg-white p-5 rounded-[24px] shadow-sm border border-[#EBE9E0] flex flex-col gap-4">
        <h3 className="text-[10px] font-bold text-[#A6A49B] tracking-widest uppercase flex items-center gap-2">
          <Wallet className="w-3.5 h-3.5" />
          新增記帳 / ADD EXPENSE
        </h3>
        
        <div className="flex flex-col gap-3">
          <input 
            type="text" 
            placeholder="支出項目 (例: 牛津大學紀念品)" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#F1F0E9] border border-transparent rounded-xl px-4 py-3 text-sm focus:border-[#EBE9E0] focus:bg-white outline-none transition-colors text-[#2D2D2D] placeholder-[#8C8A82]"
            required
          />
          
          <div className="flex gap-2">
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value as any)}
              className="bg-[#F1F0E9] border border-transparent rounded-xl px-3 py-3 text-sm focus:border-[#EBE9E0] focus:bg-white outline-none text-[#2D2D2D]"
            >
              <option value="EUR">€ EUR</option>
              <option value="GBP">£ GBP</option>
              <option value="TWD">$ TWD</option>
            </select>
            <input 
              type="number" 
              placeholder="金額 / Amount" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.01"
              min="0"
              className="flex-1 min-w-0 bg-[#F1F0E9] border border-transparent rounded-xl px-4 py-3 text-sm focus:border-[#EBE9E0] focus:bg-white outline-none transition-colors text-[#2D2D2D] placeholder-[#8C8A82]"
              required
            />
          </div>

          <div className="flex gap-2.5 overflow-x-auto pb-1 hide-scrollbar">
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setCategory(key as any)}
                className={cn(
                  "whitespace-nowrap px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-colors border",
                  category === key 
                    ? "bg-[#2D2D2D] text-white border-transparent" 
                    : "bg-white text-[#8C8A82] border-[#EBE9E0] hover:bg-[#F1F0E9]"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <button 
            type="submit"
            className="w-full bg-black text-white rounded-xl py-3.5 text-[10px] font-bold tracking-widest uppercase hover:bg-[#2D2D2D] transition-colors mt-2"
          >
            加入紀錄
          </button>
        </div>
      </form>

      {/* List */}
      <div className="flex flex-col gap-3">
        <h3 className="text-[10px] font-bold text-[#A6A49B] tracking-widest uppercase px-1">歷史紀錄 / HISTORY</h3>
        {loading ? (
          <div className="text-center text-[#8C8A82] text-sm py-4">載入中...</div>
        ) : expenses.length === 0 ? (
          <div className="text-center text-[#8C8A82] text-sm py-4 bg-white rounded-2xl border border-[#EBE9E0]">尚未有任何記帳紀錄</div>
        ) : (
          <div className="flex flex-col gap-2">
            {expenses.map(expense => (
              <div key={expense.id} className="bg-white p-4 rounded-2xl shadow-sm border border-[#EBE9E0] flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className={cn("px-2 py-0.5 rounded-sm text-[9px] font-bold tracking-widest uppercase", CATEGORY_COLORS[expense.category])}>
                    {CATEGORY_LABELS[expense.category]}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-[#2D2D2D]">{expense.name}</span>
                    <span className="text-xs text-[#8C8A82]">{expense.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-serif italic text-base text-[#1A1A1A]">
                    {expense.currency === 'EUR' ? '€' : expense.currency === 'GBP' ? '£' : 'NT$'}
                    {expense.amount.toLocaleString(undefined, { minimumFractionDigits: expense.currency !== 'TWD' ? 2 : 0, maximumFractionDigits: expense.currency !== 'TWD' ? 2 : 0 })}
                  </span>
                  <button 
                    onClick={() => expense.id && deleteExpense(expense.id)}
                    className="text-[#E5E3DB] hover:text-red-500 p-1 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
