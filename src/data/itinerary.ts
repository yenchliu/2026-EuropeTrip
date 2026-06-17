import { DayItinerary } from "../types";
import airportImage from "../assets/images/regenerated_image_1781674448435.png";

export const itineraryData: DayItinerary[] = [
  {
    day: 1,
    date: "2026/06/27 (六)",
    title: "啟程：前往浪漫之都",
    lat: 51.4815,
    lon: -0.4533,
    locations: [
      {
        name: "台灣桃園機場 → 倫敦希斯洛機場",
        type: "transport",
        time: "08:15 - 19:20",
        description: "長榮航空 BR67，平穩的飛行中安靜休息。班機於當日晚間抵達倫敦。",
        imageUrl: airportImage
      }
    ],
    accommodation: {
      name: "Renaissance London Heathrow Hotel",
      type: "hotel",
      lat: 51.4815,
      lon: -0.4533,
      description: "地址：Bath Road, Hounslow, London Heathrow, TW6 2AQ\n電話：+44-2088976363"
    }
  },
  {
    day: 2,
    date: "2026/06/28 (日)",
    title: "英國皇室與神秘巨石群",
    lat: 51.4839,
    lon: -0.6044,
    locations: [
      {
        name: "倫敦 London → 溫莎小鎮 Windsor",
        type: "transport"
      },
      {
        name: "溫莎古堡",
        type: "spot",
        lat: 51.4839,
        lon: -0.6044,
        description: "征服者威廉所建的木製防衛要塞，現為宏偉的華麗宮殿，收藏英國王室珍寶，瑪麗皇后娃娃屋。",
        story: "溫莎古堡是世上最大且最古老、並仍有人居住的城堡。許多英國君主都將其視為自己的家。這裡也是已故英國女王伊莉莎白二世最鍾愛的週末宅邸。有趣的是，當女王在城堡內時，圓塔上升起的是皇家旗幟（Royal Standard），而她不在時，則升起英國國旗（Union Jack）。",
        imageUrl: "https://images.unsplash.com/photo-1590059030511-b3e8022d40c5?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "史前巨石群 Stonehenge",
        type: "spot",
        lat: 51.1789,
        lon: -1.8262,
        description: "4000多年前出現的神祕史前巨石，排列規則可觀測天體運行。",
        story: "巨石陣的建造過程至今仍是未解之謎。最重的石頭（Sarsen）重達25噸，是從約30公里外的地方運來；而較小的藍石（Bluestone）則來自250公里外的威爾斯！這些石頭的排列完美對齊了夏至日出和冬至日落的方向，證明了古人對天文學的驚人掌握。",
        imageUrl: "https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "中式料理七菜一湯",
        type: "restaurant",
      },
      {
        name: "飯店主廚精緻料理",
        type: "restaurant",
      }
    ],
    accommodation: {
      name: "DoubleTree by Hilton Swindon",
      type: "hotel",
      lat: 51.5604,
      lon: -1.8335,
      description: "地址：Lydiard Fields, Great Western Way, Swindon\n電話：+44-1793881777"
    }
  },
  {
    day: 3,
    date: "2026/06/29 (一)",
    title: "漫步牛津大學城",
    lat: 51.7520,
    lon: -1.2577,
    locations: [
      {
        name: "牛津 Oxford",
        type: "spot",
        lat: 51.7520,
        lon: -1.2577,
        description: "英語世界中最古老的大學城，歌德式的尖塔林立，沒有圍牆。",
        story: "牛津不僅是英語世界中最古老的大學城，更是一個沒有圍牆的城市。整座城市與大學校園完全融為一體，走在街上就能浸潤在學術氣息中。這裡培養了無數社會名流，包括26位英國首相與69位諾貝爾獎得主。",
        imageUrl: "https://images.unsplash.com/photo-1549887255-a2491bbfc6e8?auto=format&fit=crop&q=80&w=800",
        mustBuy: ["牛津大學周邊連帽T恤", "愛麗絲夢遊仙境周邊產品"]
      },
      {
        name: "基督教會學院",
        type: "spot",
        lat: 51.7502,
        lon: -1.2559,
        description: "牛津大學最大的學院，近200年內產生了16位英國首相。作為《哈利波特》霍格華茲魔法學院大食堂的拍攝地。",
        story: "基督教會學院是牛津最大、最貴族的學院。這裡最著名的莫過於作為《哈利波特》中霍格華茲大食堂的取景地——學院的偉大餐廳（The Great Hall）。四周掛滿了歷任校長的油畫，漫步其中彷彿隨時會遇到魔法師。",
        imageUrl: "https://images.unsplash.com/photo-1558231229-3f0e0ca59b85?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "博德利圖書館",
        type: "spot",
        lat: 51.7540,
        lon: -1.2530,
        description: "建於西元1378年全英格蘭最古老的圖書館。",
        story: "全英格蘭最古老的博德利圖書館建於1378年，擁有數百萬冊藏書。這裡一直堅持「不外借」原則，連國王來借書也會被拒絕！這裡也是《哈利波特》中變形學教室和醫務室的拍攝場地。",
        imageUrl: "https://images.unsplash.com/photo-1557992260-ec58e38d363c?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "英國國會大廈、大笨鐘",
        type: "spot",
        lat: 51.5007,
        lon: -0.1246,
        description: "英國歷史及政治的樞紐，新哥德式的宏偉建築是倫敦的地標。",
        story: "大笨鐘（Big Ben）其實是鐘塔內部那座重達13.5噸的大銅鐘的名字，而非鐘塔本身（現在名為伊莉莎白塔）。作為英國政治的樞紐，當國會開會時，鐘塔頂端會放出光芒，是倫敦夜晚最亮眼的地標之一。",
        imageUrl: "https://images.unsplash.com/photo-1520986606214-8b456906a811?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "西敏寺",
        type: "spot",
        lat: 51.4993,
        lon: -0.1273,
        description: "歷代英國君王加冕典禮及皇室婚禮聖地，美麗的歌德式外觀。",
        story: "西敏寺是英國皇室的專屬禮拜堂，自1066年以來幾乎所有的英國君主都在這裡加冕。這裡也是威廉王子與凱特王妃舉行世紀婚禮的地方。裡面安葬了許多歷史名人，包括牛頓 and 達爾文。",
        imageUrl: "https://images.unsplash.com/photo-1582239454131-01f1ae43dae3?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "當地美食探索",
        type: "restaurant",
      },
      {
        name: "英式炸魚薯條風味餐",
        type: "restaurant",
        mustEat: ["炸魚薯條 (Fish & Chips)", "特製塔塔醬"]
      }
    ],
    accommodation: {
      name: "The Gantry London, Curio Collection",
      type: "hotel",
      lat: 51.5436,
      lon: -0.0075,
      description: "地址：40 Celebration Ave, East Village, London\n電話：+44-2045497600"
    }
  },
  {
    day: 4,
    date: "2026/06/30 (二)",
    title: "大英博物館與倫敦市區",
    lat: 51.5194,
    lon: -0.1269,
    locations: [
      {
        name: "大英博物館 British Museum",
        type: "spot",
        lat: 51.5194,
        lon: -0.1269,
        description: "世界三大博物館之一，館藏1300多萬件。",
        story: "大英博物館成立於1753年，是世界上第一座國家級的公共博物館。館內的「羅塞塔石碑」不僅是鎮館之寶，更是解密古埃及象形文字的關鍵鑰匙。博物館雖然擁有超過800萬件藏品，但平時展出的只佔總館藏的1%左右！",
        imageUrl: "https://images.unsplash.com/photo-1572953254133-cff8d92949ff?auto=format&fit=crop&q=80&w=800",
        mustBuy: ["羅塞塔石碑周邊", "古埃及木乃伊周邊明信片"]
      },
      {
        name: "白金漢宮",
        type: "spot",
        lat: 51.5014,
        lon: -0.1419,
        description: "英國國王的官方宅邸，新古典主義建築風格。",
        story: "白金漢宮是英國君主的官方寢宮。若建築上方飄揚著君主旗（Royal Standard），就代表國王目前在宮內。這裡著名的衛兵交接儀式，更是吸引全球遊客必看的經典傳統。",
        imageUrl: "https://images.unsplash.com/photo-1569074187119-c87815b476da?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "柯芬園",
        type: "spot",
        lat: 51.5120,
        lon: -0.1228,
        description: "倫敦第一個廣場，充滿藝術與休閒購物風貌的古物市集。",
        story: "柯芬園從一開始的果菜市場，轉變為如今充滿藝術與街頭表演的購物勝地。電影《窈窕淑女》中奧黛麗赫本賣花的情景也是以此為背景，充滿浪漫的復古情懷。",
        imageUrl: "https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&q=80&w=800",
        mustBuy: ["Whittard 英國熱茶", "Jo Malone 香水"]
      },
      {
        name: "攝政街",
        type: "spot",
        lat: 51.5113,
        lon: -0.1388,
        description: "著名購物大街。",
        story: "攝政街以壯麗的圓弧形建築排列聞名，被譽為倫敦最美的購物大街。這條街最初是為了連接皇家公園與攝政王的皇宮而設計，如今則是世界頂級品牌的聚集地。",
        imageUrl: "https://images.unsplash.com/photo-1532454979102-1598462002f2?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "港式飲茶風味餐",
        type: "restaurant",
      },
      {
        name: "焰火烤龍蝦套餐佐檸檬奶油",
        type: "restaurant",
        mustOrder: ["烤龍蝦佐檸檬奶油"]
      }
    ],
    accommodation: {
      name: "The Gantry London, Curio Collection",
      type: "hotel",
      lat: 51.5436,
      lon: -0.0075,
      description: "地址：40 Celebration Ave, East Village, London\n電話：+44-2045497600"
    }
  },
  {
    day: 5,
    date: "2026/07/01 (三)",
    title: "穿越海底隧道前往巴黎",
    lat: 48.8566,
    lon: 2.3522,
    locations: [
      {
        name: "倫敦塔",
        type: "spot",
        lat: 51.5081,
        lon: -0.0759,
        description: "公元11世紀的防禦城堡，皇家宮殿、寶庫、監獄。必看珠寶室。",
        story: "倫敦塔曾是堡壘、皇宮，甚至是關押政治犯的監獄。最引人注目的莫過於珍寶館中閃亮的皇冠寶石。傳說塔內如果不飼養烏鴉，倫敦塔與大英帝國就會垮台，因此塔裡至今都有專人照顧著一群渡鴉。",
        imageUrl: "https://images.unsplash.com/photo-1584967918940-a7d51b064268?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "倫敦塔橋",
        type: "spot",
        lat: 51.5055,
        lon: -0.0754,
        description: "倫敦最經典地標之一，哥德式外觀建築於1894年完工。",
        story: "倫敦塔橋是一座高塔式鐵橋，有著華麗的哥德式雙塔。這座橋最大的特色在於下層橋面可以從中間升起，讓大型船隻通過。常常有人將它與旁邊樸實的「倫敦橋」搞混！",
        imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "歐洲之星Eurostar (倫敦 → 巴黎)",
        type: "transport",
        time: "14:31 - 17:48",
        description: "穿越英吉利海峽，跨國海底隧道，2.5小時直達巴黎。"
      },
      {
        name: "越式Pho料理風味餐",
        type: "restaurant",
        mustEat: ["越南生牛肉河粉 Pho"]
      }
    ],
    accommodation: {
      name: "Novotel Paris La Defense",
      type: "hotel",
      lat: 48.8897,
      lon: 2.2223,
      description: "地址：14 Rue des Trois Fontanot, Nanterre\n電話：+33-185781513"
    }
  },
  {
    day: 6,
    date: "2026/07/02 (四)",
    title: "文藝巴黎：蒙馬特與左岸",
    lat: 48.8867,
    lon: 2.3431,
    locations: [
      {
        name: "蒙馬特聖心堂",
        type: "spot",
        lat: 48.8867,
        lon: 2.3431,
        description: "俯瞰巴黎市區最佳位置的羅馬拜占庭色彩白色教堂。",
        story: "位於巴黎最高點的聖心堂，由會分泌方解石的特殊白石岩建造，只要遇到雨水就會越洗越白，因此一百多年來始終保持著無瑕的潔白外觀，是俯瞰巴黎全景的最佳地點。",
        imageUrl: "https://images.unsplash.com/photo-1508189860359-777ad1a8b7a1?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "畫家村",
        type: "spot",
        lat: 48.8864,
        lon: 2.3400,
        description: "感受充滿文藝氣息的街頭藝術畫家為你速寫肖像畫。",
        story: "帖特廣場（Place du Tertre）也就是著名的畫家村，曾是畢卡索、梵谷等印象派大師的聚集地。現在廣場上充滿了街頭畫家，你可以在一杯咖啡的時間裡，請他們為你畫一張屬於巴黎的肖像速寫。",
        imageUrl: "https://images.unsplash.com/photo-1549413180-2070e6093fb6?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "巴黎聖母院",
        type: "spot",
        lat: 48.8530,
        lon: 2.3499,
        description: "西堤島上的典型歌德式建築，浪漫之都巴黎起點(原點 Point Zéro)。",
        story: "巴黎聖母院是典型的哥德式建築，也是大文豪雨果《鐘樓怪人》的靈感來源。廣場上有一個「原點（Point Zéro）」，傳說只要踩上原點，未來就一定會再回到巴黎。",
        imageUrl: "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "莎士比亞書店",
        type: "spot",
        lat: 48.8525,
        lon: 2.3471,
        description: "海明威《流動的饗宴》與多部電影取景的經典百年獨立書店。",
        story: "這間英文獨立書店不僅是《情迷午夜巴黎》和《日落之前》的拍攝地，在20世紀初也曾是海明威、喬伊斯等文學巨匠的庇護所。店裡的古董打字機與堆積如山的書籍，散發出獨特的藝文氣息。",
        imageUrl: "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "左岸咖啡區",
        type: "spot",
        lat: 48.8539,
        lon: 2.3330,
        description: "塞納河左岸知性象徵。",
        story: "塞納河左岸是知性的代名詞，其中以「花神咖啡館」和「雙叟咖啡館」最為著名。畢卡索、西蒙波娃等無數法國文人和藝術家都曾在這裡高談闊論，點一杯咖啡，品味的其實是歷史與浪漫。",
        imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
        mustEat: ["花神咖啡館", "雙叟咖啡館"]
      },
      {
        name: "百年皇宮藍火車餐(含葡萄酒)",
        type: "restaurant",
        mustOrder: ["法式傳統烤雞", "精選葡萄酒"]
      }
    ],
    accommodation: {
      name: "Novotel Paris La Defense",
      type: "hotel",
      lat: 48.8897,
      lon: 2.2223,
      description: "地址：14 Rue des Trois Fontanot, Nanterre\n電話：+33-185781513"
    }
  },
  {
    day: 7,
    date: "2026/07/03 (五)",
    title: "時尚巴黎與香榭大道",
    lat: 48.8738,
    lon: 2.2950,
    locations: [
      {
        name: "LVMH莎瑪麗丹百貨",
        type: "spot",
        lat: 48.8587,
        lon: 2.3421,
        description: "NETFLIX人氣影集《Emily in Paris》及周杰倫MV取景地。",
        story: "莎瑪麗丹百貨擁有150年歷史，歷經長達16年的翻修後再度驚艷世界。融合了新藝術和裝飾藝術風格，那搶眼的黃色波浪型玻璃天棚和鑄鐵樓梯，讓這裡成為影集《Emily in Paris》最美的取景地之一。",
        imageUrl: "https://images.unsplash.com/photo-1620000617482-821324eb9a14?auto=format&fit=crop&q=80&w=800",
        mustBuy: ["法國小眾香水", "設計師精品"]
      },
      {
        name: "凱旋門",
        type: "spot",
        lat: 48.8738,
        lon: 2.2950,
        description: "香榭大道的起點，巴黎十二條大道匯集中心。",
        story: "1806年由拿破崙下令建造，以紀念奧斯特利茨戰役的勝利。凱旋門位於戴高樂廣場中央，巴黎的12條大道以此為中心呈星狀放射，無論從哪個角度看，它都展現了法蘭西帝國的輝煌與氣度。",
        imageUrl: "https://images.unsplash.com/photo-1509305717900-84f40e786d82?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "香榭麗舍大道",
        type: "spot",
        lat: 48.8698,
        lon: 2.3075,
        description: "巴黎浪漫代名詞，MUST-HAVE EXPERIENCE。",
        story: "這條被文人徐志摩翻譯為「香榭麗舍」的大道，意為希臘神話中聖潔的「愛麗舍田園」。西起凱旋門、東至協和廣場，沿途精品店林立，漫步在此絕對是體驗巴黎浪漫的必辦事項。",
        imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "協和廣場",
        type: "spot",
        lat: 48.8656,
        lon: 2.3212,
        description: "廣場配有方尖碑，歌頌法國路易十五光榮而建。",
        story: "協和廣場見證了法國歷史的最動盪時期，法國大革命期間，路易十六與瑪麗皇后都在此上了斷頭台。如今廣場中央矗立著擁有3300年歷史的埃及方尖碑，是埃及政府贈送給法國的珍貴禮物。",
        imageUrl: "https://images.unsplash.com/photo-1563234971-d6a0d2f8cb20?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "法式烤田螺+油封鴨料理",
        type: "restaurant",
        mustOrder: ["法式烤田螺 Escargots", "油封鴨腿 Confit de Canard"]
      },
      {
        name: "百年咖啡廳風味餐",
        type: "restaurant"
      }
    ],
    accommodation: {
      name: "Novotel Paris La Defense",
      type: "hotel",
      lat: 48.8897,
      lon: 2.2223,
      description: "地址：14 Rue des Trois Fontanot, Nanterre\n電話：+33-185781513"
    }
  },
  {
    day: 8,
    date: "2026/07/04 (六)",
    title: "羅浮宮與百年香水精華",
    lat: 48.8606,
    lon: 2.3376,
    locations: [
      {
        name: "羅浮宮 Louvre Museum",
        type: "spot",
        lat: 48.8606,
        lon: 2.3376,
        description: "世界三大博物館。必看三寶：蒙娜麗莎的微笑、勝利女神像、米洛的維納斯。",
        story: "羅浮宮最初是作為中世紀的防禦堡壘而建。1989年由知名建築師貝聿銘設計的玻璃金字塔，在建造初期曾遭受超過九成法國人的強烈反對，認為這座現代建築會破壞古典宮殿之優雅。如今，金字塔不僅負責引入自然光，更帶來了完美的動線設計，成為巴黎最具代表性的地標之一。",
        imageUrl: "https://images.unsplash.com/photo-1601887389937-0b02c26b6c3c?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "巴黎加尼葉歌劇院",
        type: "spot",
        lat: 48.8719,
        lon: 2.3316,
        description: "新巴洛克式建築，《歌劇魅影》故事背景與靈感發源地。",
        story: "這座奢華的新巴洛克式建築耗時15年才完成，大理石樓梯與華麗的吊燈令人目不暇給。最為人津津樂道的是，歌劇院底下真的有一座暗湖，這正是經典音樂劇《歌劇魅影》故事的靈感發源地！",
        imageUrl: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "Fragonard 香水博物館",
        type: "spot",
        lat: 48.8715,
        lon: 2.3302,
        description: "揭開生產香水的神秘面紗，見證自古埃及的香水歷史與珍貴容器。",
        story: "花宮娜是一家歷史悠久的家族香水企業。在這間具有濃厚古典氣息的博物館中，你可以看到古埃及時代的香水瓶，並了解萃取、蒸餾等百年香水工藝，是一場嗅覺與視覺的法式饗宴。",
        imageUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
        mustBuy: ["玫瑰香精", "特色香水與香膏禮盒"]
      },
      {
        name: "拉法葉百貨＋春天百貨",
        type: "spot",
        lat: 48.8738,
        lon: 2.3323,
        description: "法國百年規模最大的時尚百貨購物天堂。",
        story: "來到巴黎怎能錯過購物狂的朝聖地！拉法葉百貨和春天百貨都有著超過百年的歷史。最令人震撼的是拉法葉百貨內部高達43米的拜占庭風格彩繪玻璃穹頂，站在底下仰望絕對是奢華極致的體驗。",
        imageUrl: "https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&q=80&w=800",
        mustBuy: ["法國美妝保養", "知名馬卡龍 Pierre Hermé"]
      },
      {
        name: "法式海鮮拚盤+法式排餐(紅酒一杯)",
        type: "restaurant",
        mustOrder: ["時令新鮮生蠔", "干貝與法國牛排"]
      }
    ],
    accommodation: {
      name: "Novotel Paris La Defense",
      type: "hotel",
      lat: 48.8897,
      lon: 2.2223,
      description: "地址：14 Rue des Trois Fontanot, Nanterre\n電話：+33-185781513"
    }
  },
  {
    day: 9,
    date: "2026/07/05 (日)",
    title: "鐵塔映象與凡爾賽宮",
    lat: 48.8584,
    lon: 2.2945,
    locations: [
      {
        name: "艾菲爾鐵塔",
        type: "spot",
        lat: 48.8584,
        lon: 2.2945,
        description: "巴黎重要地標，1889年為萬國博覽會打造的高達300米鋼鐵建築。",
        story: "為了迎接1889年的世界博覽會，艾菲爾鐵塔破土動工。當時這座由一萬多塊鋼鐵組成的建築，被許多巴黎文藝界人士視為「巨大的鐵怪」，甚至聯署抗議要求拆除。原計畫20年後拆除的鐵塔，因為在一戰期間被用作軍事無線電發射塔而免於被拆卸的命運，最終成為法蘭西精神的最佳象徵。",
        imageUrl: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "塞納河遊船",
        type: "spot",
        lat: 48.8614,
        lon: 2.3333,
        description: "搭船一小時欣賞奧賽美術館、新橋等知名風光。",
        story: "塞納河被譽為巴黎的生命線。搭乘遊船是飽覽巴黎景點最悠閒的方式，水上視角能將艾菲爾鐵塔、聖母院、奧賽美術館等左岸與右岸的風華盡收眼底，尤其在夕陽西下時分更是浪漫無比。",
        imageUrl: "https://images.unsplash.com/photo-1524338198850-8a2ff63a103f?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "凡爾賽宮 Château de Versailles",
        type: "spot",
        lat: 48.8049,
        lon: 2.1204,
        description: "建於路易十四，歐洲最大最豪華的宮殿建築與花園。",
        story: "凡爾賽宮最初只是路易十三的狩獵小屋，後來被路易十四擴建為全歐洲最奢華的宮殿。「鏡廳」是其中最著名的房間，由357面鏡子組成，當年凡爾賽條約就是在這個璀璨奪目的廳堂裡簽署的。",
        imageUrl: "https://images.unsplash.com/photo-1524099163253-32b7f0256868?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "塞納河遊船饗宴",
        type: "restaurant",
        mustEat: ["遊船精緻前菜與香檳"]
      },
      {
        name: "中式料理七菜一湯",
        type: "restaurant"
      }
    ],
    accommodation: {
      name: "Jangle Hotel Paris CDG Airport",
      type: "hotel",
      lat: 49.0205,
      lon: 2.5801,
      description: "地址：Rue de la Chapelle, Le Mesnil Amelot, 77990\n電話：+33-160036300"
    }
  },
  {
    day: 10,
    date: "2026/07/06 (一)",
    title: "滿載而歸",
    lat: 49.0097,
    lon: 2.5479,
    locations: [
      {
        name: "巴黎戴高樂機場 → 台灣桃園機場",
        type: "transport",
        time: "11:20 出發",
        description: "長榮航空 BR88，辦理退稅及出境等手續，搭機飛返台北。"
      }
    ]
  },
  {
    day: 11,
    date: "2026/07/07 (二)",
    title: "抵達家門",
    lat: 25.0797,
    lon: 121.2342,
    locations: [
      {
        name: "抵達台灣桃園機場",
        type: "transport",
        time: "07:00 抵達",
        description: "為辛勞的歐洲浪漫之旅畫下完美句點。"
      }
    ]
  }
];
