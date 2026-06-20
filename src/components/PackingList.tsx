import React, { useState, useEffect } from "react";
import { CheckSquare, Square, ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

export interface PackingItem {
  id: string;
  name: string;
  isChecked: boolean;
  type: 'carry-on' | 'checked';
  createdAt: number;
}

const SwipeableItem: React.FC<{ item: PackingItem, onToggle: () => void, onDelete: () => void }> = ({ item, onToggle, onDelete }) => {
  const [showDelete, setShowDelete] = useState(false);
  
  return (
    <div className="relative overflow-hidden w-full group border-b border-[#F8F7F2] last:border-0">
      {/* Delete Background Button */}
      <div 
        className="absolute right-0 top-0 bottom-0 flex items-center justify-end w-20 bg-red-50 text-red-500 pr-4"
      >
        <button onClick={onDelete} className="p-2 hover:bg-red-100 rounded-full transition-colors relative z-0">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <motion.div
        drag="x"
        dragConstraints={{ left: showDelete ? -60 : 0, right: 0 }}
        dragElastic={0.2}
        animate={{ x: showDelete ? -60 : 0 }}
        onDragEnd={(e, info) => {
          if (info.offset.x < -30) {
            setShowDelete(true);
          } else {
            setShowDelete(false);
          }
        }}
        className="relative bg-white flex items-center justify-between z-10 w-full"
      >
        <div
          onClick={() => {
            if (showDelete) setShowDelete(false);
            else onToggle();
          }}
          className={cn(
            "flex items-center gap-3 text-left w-full py-3 px-4 cursor-pointer",
            item.isChecked ? "text-[#A6A49B] line-through" : "text-[#2D2D2D]"
          )}
        >
          {item.isChecked ? (
            <CheckSquare className="w-5 h-5 text-[#A6A49B] shrink-0" />
          ) : (
            <Square className="w-5 h-5 text-[#8C8A82] shrink-0" />
          )}
          <span className="text-sm select-none">{item.name}</span>
        </div>
      </motion.div>
    </div>
  )
}

export function PackingList() {
  const [items, setItems] = useState<PackingItem[]>([]);
  const [expandedType, setExpandedType] = useState<'carry-on' | 'checked' | null>(null);
  const [newItemName, setNewItemName] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  useEffect(() => {
    // Load local storage items
    const saved = localStorage.getItem("local_packing_items_req_v2");
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      // Seed default items
      const newCarryOnItems = [
        "🌟🌟🌟護照🌟🌟🌟",
        "2寸照片*2張（萬一護照不見可以補辦）",
        "歐元、英鎊、台幣、美金",
        "信用卡💳",
        "原子筆",
        "機票證明",
        "飯店證明",
        "sim卡",
        "手機",
        "耳機",
        "行動電源（記得用夾鏈袋裝起來）",
        "充電器(充電線跟豆腐頭可以帶上飛機 也可以托運）",
        "酒精（小於100ml 記得用夾鏈袋裝）",
        "衛生紙、濕紙巾",
        "口罩",
        "衛生棉（女生）",
        "護手霜（小於100ml)",
        "水壺（安檢前要記得把水倒掉）",
        "暈車藥",
        "備用藥（第一天夠吃即可）",
        "墨鏡",
        "薄外套",
        "絲巾",
        "圍巾",
        "補妝用品",
        "遮陽帽",
        "行李秤(電池的拔起來用夾鏈袋裝著)"
      ];

      const defaultCheckedItems = [
        "衣服、褲子、內衣、內褲",
        "襪子",
        "睡衣",
        "浴巾",
        "毛巾",
        "泳衣",
        "雨傘（記得用一個塑膠袋裝著 如果下雨才不會都濕濕的）",
        "萬用轉接頭",
        "熱水壺(記得注意電壓或者是準備可以110V 、220V切換",
        "拖鞋（洗澡穿）",
        "鞋子（穿搭用）",
        "眼鏡",
        "隱形眼鏡",
        "隱眼藥水",
        "食鹽水",
        "棉花棒",
        "塑膠袋（裝髒衣服）",
        "夾鏈袋",
        "化妝品",
        "卸妝用品",
        "乳液",
        "洗髮精",
        "沐浴乳",
        "洗面乳",
        "護髮素",
        "髮油",
        "牙膏",
        "牙刷",
        "防曬",
        "藥物（暈車藥、腸胃藥、止痛藥、綜合感冒藥、OK蹦、優碘、個人用藥、貼布、透氣膠、紗布、小剪刀）",
        "自拍棒（超過60公分要托運 有電池要記得拔起來放隨身行李）",
        "零食（要注意有沒有豬肉）",
        "泡麵（不可以帶有豬肉的）",
        "免洗筷",
        "面紙",
        "濕紙巾",
        "衛生棉（女生）",
        "梳子",
        "衣架",
        "刀子（食用當地水果）",
        "指甲剪",
        "酒精"
      ];

      let initialItems: PackingItem[] = [];
      const now = Date.now();
      
      newCarryOnItems.forEach((name, i) => {
        initialItems.push({
          id: `c_${now}_${i}`,
          name,
          isChecked: false,
          type: 'carry-on',
          createdAt: now + i
        });
      });

      defaultCheckedItems.forEach((name, i) => {
        initialItems.push({
          id: `ch_${now}_${i}`,
          name,
          isChecked: false,
          type: 'checked',
          createdAt: now + i + 1000
        });
      });

      setItems(initialItems);
      localStorage.setItem("local_packing_items_req_v2", JSON.stringify(initialItems));
    }
    setLoaded(true);
  }, []);

  const updateItems = (newItems: PackingItem[]) => {
    setItems(newItems);
    localStorage.setItem("local_packing_items_req_v2", JSON.stringify(newItems));
  };

  const carryOnItems = items.filter(item => item.type === 'carry-on');
  const checkedItems = items.filter(item => item.type === 'checked');

  const handleToggleExpand = (type: 'carry-on' | 'checked') => {
    if (expandedType === type) {
      setExpandedType(null);
    } else {
      setExpandedType(type);
      setNewItemName("");
    }
  };

  const handleToggleCheck = (id: string) => {
    const newItems = items.map(item => item.id === id ? { ...item, isChecked: !item.isChecked } : item);
    updateItems(newItems);
  };

  const handleDelete = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    updateItems(newItems);
  };

  const handleClearAll = () => {
    updateItems([]);
    setShowConfirmClear(false);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || !expandedType) return;
    
    const newItem: PackingItem = {
      id: `new_${Date.now()}`,
      name: newItemName.trim(),
      isChecked: false,
      type: expandedType,
      createdAt: Date.now()
    };

    updateItems([...items, newItem]);
    setNewItemName("");
  };

  if (!loaded) return null;

  const renderSection = (type: 'carry-on' | 'checked', title: string, sectionItems: PackingItem[]) => {
    const isExpanded = expandedType === type;
    const completedCount = sectionItems.filter(i => i.isChecked).length;
    
    return (
      <div className="bg-white rounded-xl border border-[#EBE9E0] shadow-sm overflow-hidden flex flex-col">
        <button
          onClick={() => handleToggleExpand(type)}
          className="flex items-center justify-between p-4 bg-white hover:bg-[#F9F8F6] transition-colors"
        >
          <div className="flex flex-col text-left">
            <span className="text-sm font-medium text-[#2D2D2D]">{title}</span>
            <span className="text-xs text-[#8C8A82]">
              已準備 {completedCount} / {sectionItems.length}
            </span>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-[#8C8A82]" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[#8C8A82]" />
          )}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-[#EBE9E0] bg-[#FAFAFA]"
            >
              <div className="flex flex-col">
                {sectionItems.map((item) => (
                  <SwipeableItem 
                    key={item.id} 
                    item={item} 
                    onToggle={() => handleToggleCheck(item.id)}
                    onDelete={() => handleDelete(item.id)}
                  />
                ))}
                
                <form onSubmit={handleAddItem} className="flex items-center gap-2 p-4 bg-white border-t border-[#EBE9E0] mt-auto">
                  <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="新增項目..."
                    className="flex-1 bg-[#F1F0E9] border border-transparent rounded-lg px-3 py-2 text-sm outline-none focus:border-[#EBE9E0] focus:bg-white text-[#2D2D2D] transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!newItemName.trim()}
                    className="bg-black text-white p-2 rounded-lg disabled:opacity-50 transition-opacity shrink-0"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
         <h3 className="text-[10px] font-bold text-[#A6A49B] tracking-widest uppercase flex items-center gap-2">
           <CheckSquare className="w-3.5 h-3.5" />
           打包清單 / PACKING
         </h3>
         <div className="flex items-center gap-2">
           <span className="text-[10px] text-[#A6A49B] bg-[#EBE9E0] px-2 py-0.5 rounded font-bold">按住左滑刪除</span>
           {items.length > 0 && !showConfirmClear && (
             <button 
               onClick={() => setShowConfirmClear(true)}
               className="text-[10px] text-red-500 bg-red-50 hover:bg-red-100 px-2 py-0.5 rounded font-bold transition-colors"
             >
               一鍵清空
             </button>
           )}
           {showConfirmClear && (
             <div className="flex items-center gap-1">
               <span className="text-[10px] text-red-500 font-bold">確定清空?</span>
               <button 
                 onClick={handleClearAll}
                 className="text-[10px] text-white bg-red-500 hover:bg-red-600 px-2 py-0.5 rounded font-bold transition-colors"
               >
                 確定
               </button>
               <button 
                 onClick={() => setShowConfirmClear(false)}
                 className="text-[10px] text-[#A6A49B] bg-[#EBE9E0] hover:bg-[#DEDCD2] px-2 py-0.5 rounded font-bold transition-colors"
               >
                 取消
               </button>
             </div>
           )}
         </div>
      </div>
      <div className="flex flex-col gap-3">
        {renderSection('carry-on', '隨身行李打包清單', carryOnItems)}
        {renderSection('checked', '托運行李打包清單', checkedItems)}
      </div>
    </div>
  );
}
