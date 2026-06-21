import React, { useState, useEffect } from "react";
import { CheckSquare, Square, ChevronDown, ChevronUp, Plus, Trash2, ListTodo } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

export interface TodoItem {
  id: string;
  name: string;
  isChecked: boolean;
  createdAt: number;
}

const SwipeableTodoItem: React.FC<{ item: TodoItem, onToggle: () => void, onDelete: () => void }> = ({ item, onToggle, onDelete }) => {
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

export function TodoList() {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [newItemName, setNewItemName] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  useEffect(() => {
    // Load local storage items
    const saved = localStorage.getItem("local_todo_items_req_v1");
    if (saved) {
      setItems(JSON.parse(saved));
    }
    setLoaded(true);
  }, []);

  const updateItems = (newItems: TodoItem[]) => {
    setItems(newItems);
    localStorage.setItem("local_todo_items_req_v1", JSON.stringify(newItems));
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) {
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
    if (!newItemName.trim() || !isExpanded) return;
    
    const newItem: TodoItem = {
      id: `todo_${Date.now()}`,
      name: newItemName.trim(),
      isChecked: false,
      createdAt: Date.now()
    };

    updateItems([...items, newItem]);
    setNewItemName("");
  };

  if (!loaded) return null;

  const completedCount = items.filter(i => i.isChecked).length;
    
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
         <h3 className="text-[10px] font-bold text-[#A6A49B] tracking-widest uppercase flex items-center gap-2">
           <ListTodo className="w-3.5 h-3.5" />
           待辦/購買清單 / TODO LIST
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
        <div className="bg-white rounded-xl border border-[#EBE9E0] shadow-sm overflow-hidden flex flex-col">
          <button
            onClick={handleToggleExpand}
            className="flex items-center justify-between p-4 bg-white hover:bg-[#F9F8F6] transition-colors"
          >
            <div className="flex flex-col text-left">
              <span className="text-sm font-medium text-[#2D2D2D]">待辦 / 預定購買事項</span>
              <span className="text-xs text-[#8C8A82]">
                已完成 {completedCount} / {items.length}
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
                  {items.map((item) => (
                    <SwipeableTodoItem 
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
      </div>
    </div>
  );
}
