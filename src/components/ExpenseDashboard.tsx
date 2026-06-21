import React, { useState, useEffect, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Expense } from "../lib/firebase";
import { LayoutDashboard } from "lucide-react";

interface ExpenseDashboardProps {
  expenses: Expense[];
}

export function ExpenseDashboard({ expenses }: ExpenseDashboardProps) {
  const [rates, setRates] = useState<{ EUR: number; GBP: number; TWD: number } | null>(null);

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/TWD")
      .then(res => res.json())
      .then(data => {
        setRates({
          EUR: 1 / data.rates.EUR,
          GBP: 1 / data.rates.GBP,
          TWD: 1
        });
      })
      .catch(err => {
        console.error("Failed to fetch rates for dashboard", err);
        // Fallback approximate rates just in case
        setRates({ EUR: 35, GBP: 41, TWD: 1 });
      });
  }, []);

  const data = useMemo(() => {
    if (!rates) return { todayTotal: 0, overallTotal: 0, chartData: [] };

    let todayTotal = 0;
    let overallTotal = 0;
    
    // YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    const dailyMap: Record<string, { date: string, EUR: number, GBP: number, TWD: number }> = {};

    expenses.forEach(exp => {
      // Calculate TWD value
      const valTWD = exp.amount * rates[exp.currency];
      
      overallTotal += valTWD;
      if (exp.date === today) {
        todayTotal += valTWD;
      }

      if (!dailyMap[exp.date]) {
        dailyMap[exp.date] = { date: exp.date, EUR: 0, GBP: 0, TWD: 0 };
      }
      dailyMap[exp.date][exp.currency] += valTWD;
    });

    const chartData = Object.values(dailyMap).sort((a, b) => a.date.localeCompare(b.date));

    return { todayTotal, overallTotal, chartData };
  }, [expenses, rates]);

  if (!rates) return null;

  return (
    <div className="bg-white p-5 rounded-[24px] shadow-sm border border-[#EBE9E0] flex flex-col gap-5">
      <h3 className="text-[10px] font-bold text-[#A6A49B] tracking-widest uppercase flex items-center gap-2">
        <LayoutDashboard className="w-3.5 h-3.5" />
        消費 Dashboard / OVERVIEW
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#F8F7F2] p-4 rounded-xl flex flex-col">
          <span className="text-xs font-medium text-[#8C8A82]">今日消費 (TWD)</span>
          <span className="font-serif italic text-2xl text-[#2D2D2D]">NT$ {Math.round(data.todayTotal).toLocaleString()}</span>
        </div>
        <div className="bg-[#F8F7F2] p-4 rounded-xl flex flex-col">
          <span className="text-xs font-medium text-[#8C8A82]">總消費 (TWD)</span>
          <span className="font-serif italic text-2xl text-[#2D2D2D]">NT$ {Math.round(data.overallTotal).toLocaleString()}</span>
        </div>
      </div>

      {data.chartData.length > 0 && (
        <div className="h-56 mt-2 w-full pb-4">
          <span className="text-[10px] font-bold text-[#8C8A82] tracking-widest uppercase mb-2 block">每日消費圖表</span>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.chartData} margin={{ top: 0, right: 0, left: 0, bottom: 10 }}>
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#8C8A82' }} tickLine={false} axisLine={false} />
              <YAxis tickFormatter={(val) => `${val / 1000}k`} tick={{ fontSize: 10, fill: '#8C8A82' }} tickLine={false} axisLine={false} width={45} />
              <Tooltip 
                cursor={{ fill: '#F1F0E9' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number, name: string) => [`NT$ ${Math.round(value).toLocaleString()}`, name]}
                labelStyle={{ color: '#2D2D2D', fontWeight: 'bold', marginBottom: '4px' }}
              />
              <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} iconType="circle" />
              <Bar dataKey="EUR" stackId="a" fill="#FFD65A" name="歐元花費" />
              <Bar dataKey="GBP" stackId="a" fill="#A1BC98" name="英鎊花費" />
              <Bar dataKey="TWD" stackId="a" fill="#DCCFC0" name="台幣花費" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
