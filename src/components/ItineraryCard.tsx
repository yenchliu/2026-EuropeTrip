import React, { useState, useEffect } from "react";
import { DayItinerary, Place } from "../types";
import { cn } from "../lib/utils";
import { MapPin, Navigation, Utensils, Train, Map, Camera, Phone, Calendar as CalendarIcon, Info, X, Upload } from "lucide-react";
import { WeatherWidget } from "./WeatherWidget";
import { motion, AnimatePresence } from "motion/react";
import { saveCustomImage, deleteCustomImage, subscribeToCustomImages } from "../lib/firebase";

interface ItineraryCardProps {
  dayInfo: DayItinerary;
}

export function ItineraryCard({ dayInfo }: ItineraryCardProps) {
  const [selectedLoc, setSelectedLoc] = useState<Place | null>(null);
  
  const [customImages, setCustomImages] = useState<Record<string, string>>(() => {
    try {
      return JSON.parse(localStorage.getItem("custom_spot_images") || "{}");
    } catch {
      return {};
    }
  });

  // Keep a real-time listener to sync any newly uploaded/edited photos across clients
  useEffect(() => {
    const unsubscribe = subscribeToCustomImages((images) => {
      setCustomImages(images);
      try {
        localStorage.setItem("custom_spot_images", JSON.stringify(images));
      } catch (err) {
        console.error("Failed to save to localStorage:", err);
      }
    });
    return () => unsubscribe();
  }, []);

  const [editUrl, setEditUrl] = useState("");
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);

  // Sync edit URL when location is selected
  useEffect(() => {
    if (selectedLoc) {
      setEditUrl(customImages[selectedLoc.name] || selectedLoc.imageUrl || "");
      setIsEditingPhoto(false);
    }
  }, [selectedLoc, customImages]);

  const handleSavePhoto = async () => {
    if (!selectedLoc) return;
    try {
      await saveCustomImage(selectedLoc.name, editUrl);
      setIsEditingPhoto(false);
    } catch (error) {
      console.error("Failed to save custom photo to Firestore:", error);
    }
  };

  const handleResetPhoto = async () => {
    if (!selectedLoc) return;
    try {
      await deleteCustomImage(selectedLoc.name);
      setEditUrl(selectedLoc.imageUrl || "");
      setIsEditingPhoto(false);
    } catch (error) {
      console.error("Failed to delete custom photo from Firestore:", error);
    }
  };

  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 400;
        const MAX_HEIGHT = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.6);
        
        if (!selectedLoc) {
          setIsUploading(false);
          return;
        }
        
        saveCustomImage(selectedLoc.name, dataUrl)
          .then(() => {
            setEditUrl(dataUrl);
            setIsEditingPhoto(false);
          })
          .catch(err => {
            console.error("Failed to upload image to Firestore:", err);
            alert("圖片過大或上傳失敗，請稍後再試！");
          })
          .finally(() => {
            setIsUploading(false);
            // Reset input so same file can be selected again
            e.target.value = '';
          });
      };
      img.onerror = () => {
        setIsUploading(false);
        e.target.value = '';
        alert("無法讀取圖片");
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      setIsUploading(false);
      e.target.value = '';
      alert("無法讀取檔案");
    };
    reader.readAsDataURL(file);
  };

  // Format date string for weather (YYYY-MM-DD)
  const formattedDate = dayInfo.date.split(" ")[0].replace(/\//g, "-");

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedLoc) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedLoc]);

  return (
    <div className="flex flex-col gap-5 pb-8 relative">
      {/* Header */}
      <div className="flex flex-col gap-3 px-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-mono text-neutral-400 font-medium tracking-widest uppercase">DAY {dayInfo.day}</span>
            <h2 className="text-2xl font-semibold text-neutral-900 tracking-tight mt-0.5">{dayInfo.title}</h2>
          </div>
          {dayInfo.lat && dayInfo.lon && (
            <WeatherWidget lat={dayInfo.lat} lon={dayInfo.lon} dateStr={formattedDate} />
          )}
        </div>
        <div className="flex items-center gap-1.5 text-neutral-500 text-sm">
          <CalendarIcon className="w-4 h-4" />
          <span>{dayInfo.date}</span>
        </div>
      </div>

      {/* Timeline / Locations */}
      <div className="flex flex-col px-4 gap-4 relative">
        {/* Vertical line connecting timeline */}
        <div className="absolute left-[31px] top-6 bottom-6 w-0.5 bg-neutral-100 rounded-full z-0" />
        
        {dayInfo.locations.map((loc, idx) => (
          <LocationCard 
            key={idx} 
            loc={loc} 
            isLast={idx === dayInfo.locations.length - 1} 
            onClick={() => setSelectedLoc(loc)}
          />
        ))}
      </div>

      {/* Accommodation for the day */}
      {dayInfo.accommodation && (
        <div className="px-4 mt-2">
          <div className="bg-neutral-800 text-white rounded-3xl p-5 flex flex-col gap-3 relative overflow-hidden shadow-sm">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
            
            <div className="flex items-center gap-2">
              <div className="bg-white/10 p-1.5 rounded-lg">
                <Map className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-medium tracking-wide text-neutral-300">本日住宿</span>
            </div>
            
            <div className="flex flex-col">
              <h3 className="text-base font-semibold text-white">{dayInfo.accommodation.name}</h3>
              {dayInfo.accommodation.description && (
                <p className="text-sm text-neutral-400 mt-1.5 whitespace-pre-line leading-relaxed">
                  {dayInfo.accommodation.description}
                </p>
              )}
            </div>
            
            {(dayInfo.accommodation.lat && dayInfo.accommodation.lon) && (
              <button 
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${dayInfo.accommodation!.lat},${dayInfo.accommodation!.lon}`)}
                className="mt-2 bg-white text-neutral-900 text-xs font-semibold py-2.5 px-4 rounded-xl self-start hover:bg-neutral-100 transition-colors"
              >
                導航至飯店
              </button>
            )}
          </div>
        </div>
      )}
      {/* Modal for Location Details */}
      <AnimatePresence>
        {selectedLoc && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm"
              onClick={() => setSelectedLoc(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed bottom-0 left-0 right-0 z-[70] h-[80vh] bg-[#F8F7F2] rounded-t-[32px] shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-6 bg-white border-b border-[#E5E3DB] flex justify-between items-start shrink-0 relative">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-[#E5E3DB] rounded-full" />
                <div className="flex flex-col mt-2">
                  <span className="text-[10px] font-bold tracking-widest text-[#8C8A82] uppercase mb-1">
                    {getTypeLabel(selectedLoc.type)}
                  </span>
                  <h3 className="text-2xl font-serif font-medium text-[#1A1A1A]">{selectedLoc.name}</h3>
                </div>
                <button 
                  onClick={() => setSelectedLoc(null)}
                  className="p-2 bg-[#F1F0E9] rounded-full text-[#8C8A82] hover:text-[#1A1A1A] hover:bg-[#EBE9E0] transition-colors mt-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                {(() => {
                  const displayedImgUrl = customImages[selectedLoc.name] || selectedLoc.imageUrl;
                  return (
                    <div className="flex flex-col gap-2 shrink-0">
                      <div className="w-full h-48 rounded-2xl overflow-hidden shrink-0 relative group shadow-sm bg-neutral-100">
                        <img 
                          src={displayedImgUrl || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800"} 
                          alt={selectedLoc.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Automatically fall back to a dynamic travel placeholder if link fails
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800";
                          }}
                        />
                        <button
                          onClick={() => setIsEditingPhoto(!isEditingPhoto)}
                          className="absolute bottom-3 right-3 bg-black/70 hover:bg-black/90 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 shadow-md"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          自訂圖片
                        </button>
                      </div>

                      {isEditingPhoto && (
                        <div className="bg-white p-4 rounded-2xl border border-[#EBE9E0] flex flex-col gap-3 mt-1 shadow-sm">
                          <span className="text-[10px] font-bold text-[#8C8A82] tracking-widest uppercase">自訂景點照片連結 / CUSTOM PHOTO LINK</span>
                          <p className="text-[11px] text-[#A6A49B] leading-relaxed">
                            您可以直接貼上自己喜歡的任何網路圖片、Google 雲端或公開網誌照片連結。若為本機照片，您也可以直接在左側檔案管理員上傳，並在此輸入相對路徑（例如：<code className="font-mono bg-neutral-100 px-1 py-0.5 rounded text-[10px]">/assets/my_photo.jpg</code>）。
                          </p>
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="貼上網址... (或點擊下方直接上傳相片)"
                                value={editUrl}
                                onChange={(e) => setEditUrl(e.target.value)}
                                className="flex-1 min-w-0 bg-[#F1F0E9] border border-transparent rounded-xl px-3 py-2 text-xs outline-none focus:border-[#EBE9E0] focus:bg-white text-[#2D2D2D] transition-colors"
                              />
                              <button
                                onClick={handleSavePhoto}
                                className="bg-black hover:bg-[#2D2D2D] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shrink-0"
                              >
                                儲存
                              </button>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <label className={`flex items-center gap-1.5 cursor-pointer transition-colors font-bold text-xs px-3 py-2 rounded-xl border border-transparent ${isUploading ? 'text-[#A6A49B] bg-[#F8F8F8] cursor-not-allowed' : 'text-[#8C8A82] hover:text-[#2D2D2D] bg-[#F1F0E9] hover:border-[#EBE9E0]'}`}>
                                <Upload className={`w-4 h-4 ${isUploading ? 'animate-bounce' : ''}`} />
                                {isUploading ? "上傳中請稍候..." : "從相簿上傳"}
                                <input 
                                  type="file" 
                                  accept="image/*" 
                                  className="hidden" 
                                  disabled={isUploading}
                                  onChange={handleFileUpload}
                                />
                              </label>
                              {customImages[selectedLoc.name] && (
                                <button
                                  onClick={handleResetPhoto}
                                  className="text-[#8C8A82] hover:text-red-500 text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
                                >
                                  恢復預設
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {selectedLoc.story ? (
                  <div className="flex flex-col gap-3">
                    <h4 className="text-xs font-bold tracking-widest text-[#8C8A82] uppercase">深度導覽 / DISCOVER</h4>
                    <p className="text-sm leading-relaxed text-[#2D2D2D] bg-white p-5 rounded-2xl border border-[#EBE9E0] shadow-sm">
                      {selectedLoc.story}
                    </p>
                  </div>
                ) : (
                  selectedLoc.description && (
                    <div className="flex flex-col gap-3">
                      <h4 className="text-xs font-bold tracking-widest text-[#8C8A82] uppercase">簡介 / INFO</h4>
                      <p className="text-sm leading-relaxed text-[#2D2D2D] bg-white p-5 rounded-2xl border border-[#EBE9E0] shadow-sm">
                        {selectedLoc.description}
                      </p>
                    </div>
                  )
                )}

                {(selectedLoc.mustEat || selectedLoc.mustOrder || selectedLoc.mustBuy) && (
                  <div className="flex flex-col gap-3">
                    <h4 className="text-xs font-bold tracking-widest text-[#8C8A82] uppercase">推薦指南 / GUIDE</h4>
                    <div className="bg-white p-5 rounded-2xl border border-[#EBE9E0] shadow-sm flex flex-col gap-4">
                      {selectedLoc.mustEat && (
                        <div className="flex flex-col gap-2">
                          <span className="text-[10px] font-bold text-[#8C8A82]">必吃美食</span>
                          <div className="flex flex-wrap gap-2">
                            {selectedLoc.mustEat.map((i, idx) => (
                              <span key={idx} className="text-sm text-[#2D2D2D] font-medium border border-[#EBE9E0] px-3 py-1.5 rounded-lg">{i}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedLoc.mustOrder && (
                        <div className="flex flex-col gap-2">
                          <span className="text-[10px] font-bold text-[#8C8A82]">推薦菜單</span>
                          <div className="flex flex-wrap gap-2">
                            {selectedLoc.mustOrder.map((i, idx) => (
                              <span key={idx} className="text-sm text-[#2D2D2D] font-medium border border-[#EBE9E0] px-3 py-1.5 rounded-lg">{i}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedLoc.mustBuy && (
                        <div className="flex flex-col gap-2">
                          <span className="text-[10px] font-bold text-[#8C8A82]">必買伴手禮</span>
                          <div className="flex flex-wrap gap-2">
                            {selectedLoc.mustBuy.map((i, idx) => (
                              <span key={idx} className="text-sm text-[#2D2D2D] font-medium border border-[#EBE9E0] px-3 py-1.5 rounded-lg">{i}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case "spot": return "景點";
    case "restaurant": return "餐廳";
    case "transport": return "交通";
    case "hotel": return "住宿";
    default: return type;
  }
};

function LocationCard({ loc, isLast, onClick }: { loc: Place; isLast: boolean; onClick: () => void; key?: any }) {
  const getIcon = () => {
    switch (loc.type) {
      case "spot": return <Camera className="w-3.5 h-3.5 text-white" />;
      case "restaurant": return <Utensils className="w-3.5 h-3.5 text-white" />;
      case "transport": return <Train className="w-3.5 h-3.5 text-white" />;
      default: return <MapPin className="w-3.5 h-3.5 text-white" />;
    }
  };

  return (
    <div className="flex gap-4 relative z-10 w-full">
      {/* Timeline Node */}
      <div className="flex flex-col items-center pt-2.5">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shadow-sm shrink-0 ring-4 ring-[#F8F7F2]",
          loc.type === 'spot' ? 'bg-[#2D2D2D]' : 
          loc.type === 'restaurant' ? 'bg-[#D4AF37]' : 
          loc.type === 'transport' ? 'bg-[#8C8A82]' : 'bg-[#E5E3DB]'
        )}>
          {getIcon()}
        </div>
      </div>

      {/* Content Card */}
      <div 
        onClick={() => {
          if (loc.type !== 'restaurant') onClick();
        }}
        className={cn(
          "flex-1 bg-white rounded-2xl p-5 shadow-sm border border-[#EBE9E0] flex flex-col gap-2.5 transition-shadow",
          loc.type !== 'restaurant' && "cursor-pointer hover:shadow-md active:scale-[0.98]"
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-widest text-[#8C8A82] uppercase mb-1">
              {loc.time ? `${loc.time} - ` : ''}{getTypeLabel(loc.type)}
            </span>
            <h3 className="font-serif font-medium text-[#1A1A1A] text-lg leading-tight">{loc.name}</h3>
          </div>
          
          {(loc.lat && loc.lon) && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lon}`);
              }}
              className="bg-[#F1F0E9] p-2 rounded-full text-[#2D2D2D] hover:bg-black hover:text-white transition-colors shrink-0"
              aria-label="導航"
            >
              <Navigation className="w-4 h-4" />
            </button>
          )}
        </div>

        {loc.description && (
          <p className="text-sm text-[#555] leading-relaxed">{loc.description}</p>
        )}

        {/* Highlight Tags */}
        {(loc.mustEat || loc.mustOrder || loc.mustBuy) && (
          <div className="flex flex-col gap-2 mt-2">
            {loc.mustEat && (
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="px-2 py-0.5 bg-black text-white text-[9px] font-bold tracking-widest uppercase rounded-sm">必吃美食</span>
                {loc.mustEat.map((i, idx) => <span key={idx} className="text-xs text-[#2D2D2D] font-medium">{i}</span>)}
              </div>
            )}
            {loc.mustOrder && (
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="px-2 py-0.5 bg-[#FDE68A] text-[#2D2D2D] text-[9px] font-bold tracking-widest uppercase rounded-sm">推薦菜單</span>
                {loc.mustOrder.map((i, idx) => <span key={idx} className="text-xs text-[#2D2D2D] font-medium">{i}</span>)}
              </div>
            )}
            {loc.mustBuy && (
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="px-2 py-0.5 bg-[#D1FAE5] text-[#2D2D2D] text-[9px] font-bold tracking-widest uppercase rounded-sm">必買伴手禮</span>
                {loc.mustBuy.map((i, idx) => <span key={idx} className="text-xs text-[#2D2D2D] font-medium">{i}</span>)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
