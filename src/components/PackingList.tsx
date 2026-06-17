import React, { useState, useEffect } from "react";
import { subscribeToPackingItems, addPackingItem, updatePackingItem, PackingItem, deletePackingItem } from "../lib/firebase";
import { CheckSquare, Square, ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

export function PackingList() {
  const [items, setItems] = useState<PackingItem[]>([]);
  const [expandedType, setExpandedType] = useState<'carry-on' | 'checked' | null>(null);
  const [newItemName, setNewItemName] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToPackingItems(setItems);
    return () => unsubscribe();
  }, []);

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

  const handleToggleCheck = async (item: PackingItem) => {
    if (!item.id) return;
    await updatePackingItem(item.id, { isChecked: !item.isChecked });
  };

  const handleDelete = async (item: PackingItem) => {
    if (!item.id) return;
    await deletePackingItem(item.id);
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || !expandedType) return;
    
    await addPackingItem({
      name: newItemName.trim(),
      isChecked: false,
      type: expandedType
    });
    setNewItemName("");
  };

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
              className="border-t border-[#EBE9E0]"
            >
              <div className="flex flex-col p-4 gap-3">
                {sectionItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between group">
                    <button
                      onClick={() => handleToggleCheck(item)}
                      className={cn(
                        "flex items-center gap-3 text-left flex-1",
                        item.isChecked ? "text-[#A6A49B] line-through" : "text-[#2D2D2D]"
                      )}
                    >
                      {item.isChecked ? (
                        <CheckSquare className="w-5 h-5 text-[#8C8A82] shrink-0" />
                      ) : (
                        <Square className="w-5 h-5 text-[#8C8A82] shrink-0" />
                      )}
                      <span className="text-sm">{item.name}</span>
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-[#A6A49B] hover:text-red-500 transition-all shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                <form onSubmit={handleAddItem} className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="輸入物品名稱..."
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
      <h3 className="text-[10px] font-bold text-[#A6A49B] tracking-widest uppercase flex items-center gap-2">
        <CheckSquare className="w-3.5 h-3.5" />
        打包清單 / PACKING
      </h3>
      <div className="flex flex-col gap-3">
        {renderSection('carry-on', '隨身行李打包清單', carryOnItems)}
        {renderSection('checked', '托運行李打包清單', checkedItems)}
      </div>
    </div>
  );
}
