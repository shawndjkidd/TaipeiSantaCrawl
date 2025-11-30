import React, { useState, useEffect } from 'react';
import { Check, QrCode, X, MapPin, Stamp, Star, Copy, Instagram, Facebook, Gift, Sparkles } from 'lucide-react';

// --- CONFIGURATION ---
const EVENT_HEADER_IMAGE = "https://static.accupass.com/eventbanner/2510041041526541207270.jpg";

const CRAWL_DATA = [
  { 
    id: 1, 
    name: "Tiki Taipei", 
    secretPin: "1234", 
    image: "https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/276159466_313720220745291_5809039127744352893_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=2Yk8hrIkAh4Q7kNvwF3Dlmz&_nc_oc=AdmloelnI8sXjP9NBuCzFBwGWm2RK_FQJoUsCh9xi9j-TnjSJtXfFer8ynx-2VglzGvZDVXvsxJUQ4FrTbHufB2L&_nc_zt=23&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=gjX3LBdi7IGDuxI5qkSkzw&oh=00_AfiZ6Z8XbroZhpmc5KQvkyhtYTIcsNlq775BEXi_6SqUOQ&oe=6931D560",
    socialHandle: "@tiki_taipei #TaipeiSantaCrawl",
    instagramUrl: "https://www.instagram.com/tiki_taipei/",
    facebookUrl: "https://www.facebook.com/TikiTaipei",
    address: "No. 1, Yumen St, Zhongshan District (Maji Square)",
    googlePlaceId: "ChIJqY400k-pQjQRQbrs48zkkG4" // Tiki Taipei Google Place ID
  },
  { 
    id: 2, 
    name: "Tacos N' Taps", 
    secretPin: "2025", 
    image: "https://scontent.fhan4-1.fna.fbcdn.net/v/t39.30808-6/306959607_114670831393570_3127851888876946642_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=AJYhxQ8SLNgQ7kNvwH4MYZV&_nc_oc=Adm_SZ0Xsva7T682NH0QdqqVZpuiUr1Y3nCRJOS0hYa70alnGbiK2VWfeZ1Ar_sBftY&_nc_zt=23&_nc_ht=scontent.fhan4-1.fna&_nc_gid=i6b0KZqDp3OYcIt4sfEG2A&oh=00_AfiaffUj3K643hKckG8AIB_Ce903M-Zi-vjahxUCKMrcUg&oe=692DBBDB",
    socialHandle: "@tacos_n_taps #TaipeiSantaCrawl",
    instagramUrl: "https://www.instagram.com/tacos_n_taps/",
    facebookUrl: "https://www.facebook.com/TacosNTaps",
    address: "No. 1, Yumen St, Zhongshan District (Maji Square)",
    googlePlaceId: "" // To be added
  },
  { 
    id: 3, 
    name: "Haku Taipei", 
    secretPin: "5555", 
    image: "https://scontent.fhan4-1.fna.fbcdn.net/v/t39.30808-6/360105182_661531572669873_3750510897453033955_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=jAua-mJML2AQ7kNvwHB3Wwk&_nc_oc=AdlaECayo1PlkIgMhjF9HnLnXZFs2XKlLG9MPHITwV1337FNJ2vkvfatPKoXe4UN4fw&_nc_zt=23&_nc_ht=scontent.fhan4-1.fna&_nc_gid=9dZPE-KW2qeNZXtfw2rTqg&oh=00_AfhIVIJ9JWvfQj0OkZKhDFTen-yA8GCe23P-Wumj28XeiA&oe=692DD604",
    socialHandle: "@hakutaipei #TaipeiSantaCrawl",
    instagramUrl: "https://www.instagram.com/hakutaipei/",
    facebookUrl: "https://www.facebook.com/hakutaipei",
    address: "No. 1, Yumen St, Zhongshan District (Maji Square)",
    googlePlaceId: "" // To be added
  },
  { 
    id: 4, 
    name: "Crafted Taipei", 
    secretPin: "9999", 
    image: "https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-6/305773234_462346825909088_88014592620908795_n.png?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=xD6_oqaOA6oQ7kNvwFkB1qP&_nc_oc=AdkaoesYgDJG76F6xT6sowNqaqlEMiA52T4eoJLAG8FlZNypqdsZ-QnqSjmYaR1L-38&_nc_zt=23&_nc_ht=scontent.fhan4-3.fna&_nc_gid=WkFlr0LXdsmguGMgRKGgKA&oh=00_Afh4e-uLrj8I5XkUVJaxWurqytbGOA4UhRvF9vKigqJXew&oe=692DBDFF",
    socialHandle: "@crafted.tw #TaipeiSantaCrawl",
    instagramUrl: "https://www.instagram.com/crafted.tw/",
    facebookUrl: "https://www.facebook.com/crafted.tw",
    address: "No. 1, Yumen St, Zhongshan District (Maji Square)",
    googlePlaceId: "" // To be added
  },
  { 
    id: 5, 
    name: "After-Party Barcade", 
    secretPin: "8888", 
    image: "https://scontent.fhan4-6.fna.fbcdn.net/v/t39.30808-6/448069062_487057477042299_2725182506313381410_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=iL4wYwFObM4Q7kNvwFe9X7O&_nc_oc=Adlqe_dqNGMOUz39LY2FwWJOL89Jh3aKnHpNYRL5Zgq6PhUgLbo7YxY9Zo0LtebdLhA&_nc_zt=23&_nc_ht=scontent.fhan4-6.fna&_nc_gid=hbgYShUJUlh_hoq0r6FQvg&oh=00_Afhdf7iK7VR9YJyzSvwC4BESigdthjM0RUP8l91Ke45i4w&oe=692DA9C4",
    socialHandle: "@barcadetaiwan #TaipeiSantaCrawl",
    instagramUrl: "https://www.instagram.com/barcadetaiwan/",
    facebookUrl: "https://www.facebook.com/barcadetaiwan",
    address: "177 Heping E Rd Sec 1, B1, Da'an District",
    googlePlaceId: "ChIJEXU2F9yrQjQRQqywwyWrv7g"
  },
];

const STORAGE_KEY = 'santa_crawl_progress_2025';

function SantaCrawlApp() {
  const [stamps, setStamps] = useState([]);
  const [selectedBar, setSelectedBar] = useState(null);
  const [pinInput, setPinInput] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const [showReward, setShowReward] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [language, setLanguage] = useState('en'); // 'en' or 'zh'
  const [adminCode, setAdminCode] = useState('');

  const ADMIN_CODE = '2025SANTA'; // Change this to your desired admin code

  // Translations
  const translations = {
    en: {
      title: "TAIPEI SANTA CRAWL",
      subtitle: "2025",
      photoCaption: "Official Stamp Card - December 2025",
      progress: "★ PROGRESS ★",
      collectStamps: "★ CLICK EACH LOCATION · SCAN QR & GET YOUR FREE DRINK · PLEASE BUY SOMETHING & SUPPORT THE VENUE! ★",
      freeShot: "One FREE Shot!",
      reset: "◄ RESET",
      info: "INFO",
      instructions: "INSTRUCTIONS",
      step1: "Visit each bar on the crawl route",
      step2: "Show this app to the bartender",
      step3: "Scan QR code OR enter secret PIN",
      step4: "Collect all stamps for free drinks!",
      shareMedia: "Share on social media & tag the venues!",
      gotIt: "GOT IT!",
      validate: "VALIDATE",
      approved: "APPROVED!",
      stampCollected: "STAMP COLLECTED",
      winner: "WINNER!",
      allStampsCollected: "ALL {count} STAMPS COLLECTED",
      rewardAwaits: "🎁 YOUR REWARD AWAITS 🎁",
      showScreen: "Show this screen to any venue to claim your prize!",
      awesome: "AWESOME!",
      startNewCrawl: "Start New Crawl →",
      warning: "WARNING!",
      eraseStamps: "This will erase all your collected stamps!",
      cancel: "CANCEL",
      shareTagUs: "★ SHARE & TAG US ★",
      insta: "INSTA",
      facebook: "FACEBOOK",
      review: "REVIEW",
      googleReview: "Google Review",
      tags: "TAGS",
      tagsCopied: "TAGS COPIED!",
      orEnterCode: "OR ENTER CODE",
      incorrectPin: "Incorrect PIN! Ask the bartender for help.",
      incorrectAdmin: "Incorrect admin code!",
      enterAdminCode: "ENTER ADMIN CODE:",
      scanQrCode: "SCAN QR CODE",
      lookForQr: "Look for the official QR code poster at this venue!",
      howToScan: "📱 HOW TO SCAN:",
      scanIphone: "• iPhone: Open Camera app",
      scanAndroid: "• Android: Open Camera or use Google Lens",
      pointAt: "• Point at the QR code",
      tapNotification: "• Tap the notification to get your stamp!",
      askBartender: "Or ask the bartender for the secret PIN code!",
    },
    zh: {
      title: "台北聖誕酒吧巡遊",
      subtitle: "2025",
      photoCaption: "官方集章卡 - 2025年12月",
      progress: "★ 進度 ★",
      collectStamps: "★ 點擊每個地點 · 掃描即可獲得免費飲品 · 請購買其他商品並支持店家！ ★",
      freeShot: "免費一杯烈酒！",
      reset: "◄ 重置",
      info: "資訊",
      instructions: "使用說明",
      step1: "前往巡遊路線上的每間酒吧",
      step2: "向調酒師出示此應用程式",
      step3: "掃描二維碼或輸入密碼",
      step4: "收集所有印章即可享用免費飲品！",
      shareMedia: "在社群媒體上分享並標記店家！",
      gotIt: "知道了！",
      validate: "驗證",
      approved: "已批准！",
      stampCollected: "印章已收集",
      winner: "優勝者！",
      allStampsCollected: "已收集全部 {count} 個印章",
      rewardAwaits: "🎁 您的獎品等著您 🎁",
      showScreen: "向任何店家出示此畫面即可領取獎品！",
      awesome: "太棒了！",
      startNewCrawl: "開始新的巡遊 →",
      warning: "警告！",
      eraseStamps: "這將刪除您收集的所有印章！",
      cancel: "取消",
      shareTagUs: "★ 分享並標記我們 ★",
      insta: "IG",
      facebook: "臉書",
      review: "評論",
      googleReview: "Google 評論",
      tags: "標籤",
      tagsCopied: "標籤已複製！",
      orEnterCode: "或輸入密碼",
      incorrectPin: "密碼錯誤！請詢問調酒師。",
      incorrectAdmin: "管理員密碼錯誤！",
      enterAdminCode: "輸入管理員密碼：",
      scanQrCode: "掃描二維碼",
      lookForQr: "尋找此店家的官方二維碼海報！",
      howToScan: "📱 如何掃描：",
      scanIphone: "• iPhone：打開相機應用程式",
      scanAndroid: "• Android：打開相機或使用 Google Lens",
      pointAt: "• 對準二維碼",
      tapNotification: "• 點擊通知即可獲得印章！",
      askBartender: "或向調酒師詢問密碼！",
    }
  };

  const t = translations[language];

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { 
        setStamps(JSON.parse(saved)); 
      } catch (e) { 
        console.error("Failed to load progress"); 
      }
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pinFromUrl = params.get('pin');
    if (pinFromUrl) {
      const foundBar = CRAWL_DATA.find(b => b.secretPin === pinFromUrl);
      if (foundBar && !stamps.includes(foundBar.id)) {
        setStamps(prev => [...prev, foundBar.id]);
        setTimeout(() => setShowSuccess(true), 300);
        setTimeout(() => setShowSuccess(false), 3000);
      }
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stamps));
    if (stamps.length === CRAWL_DATA.length && stamps.length > 0) {
      setTimeout(() => setShowReward(true), 500);
    }
  }, [stamps]);

  const handleBarClick = (bar) => {
    if (stamps.includes(bar.id)) return;
    setSelectedBar(bar);
    setPinInput('');
    setError('');
    setCopySuccess('');
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (!selectedBar) return;
    
    if (pinInput === selectedBar.secretPin) {
      setStamps(prev => [...prev, selectedBar.id]);
      setSelectedBar(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      setError(t.incorrectPin);
      setPinInput('');
    }
  };

  const handleReset = () => {
    if (adminCode !== ADMIN_CODE) {
      setError(t.incorrectAdmin || 'Incorrect admin code!');
      return;
    }
    setStamps([]);
    setShowResetConfirm(false);
    setShowReward(false);
    setAdminCode('');
    setError('');
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleCopyTag = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      setCopySuccess('Failed to copy');
    }
    document.body.removeChild(textArea);
  };

  const openSocialApp = (platform, text) => {
    handleCopyTag(text);
    if (platform === 'instagram') {
      window.location.href = "instagram://camera";
    } else if (platform === 'facebook') {
      window.location.href = "fb://composer";
    }
  };

  const getProgress = () => {
    return Math.round((stamps.length / CRAWL_DATA.length) * 100);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-gray-900">
      
      {/* Retro TV scan lines effect */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
        }}></div>
      </div>

      {/* Animated snow effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-fall text-white opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-20px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          >
            ❄️
          </div>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Special+Elite&family=Fredoka:wght@700&family=Righteous&family=Bungee&display=swap');
        
        @keyframes fall {
          to { transform: translateY(100vh); }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
        .retro-text {
          text-shadow: 3px 3px 0px #000, 5px 5px 0px rgba(255,107,53,0.5);
        }
        .paper-texture {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* Main Container */}
      <div className="relative z-10 max-w-md mx-auto min-h-screen flex flex-col bg-amber-50 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        
        {/* Header */}
        <div className="bg-gradient-to-b from-red-700 via-orange-600 to-red-700 p-1 relative">
          <div className="absolute inset-0 border-4 border-yellow-500 opacity-80"></div>
          <div className="absolute top-0 left-0 w-4 h-4 bg-yellow-500 rounded-full"></div>
          <div className="absolute top-0 right-0 w-4 h-4 bg-yellow-500 rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 bg-yellow-500 rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-yellow-500 rounded-full"></div>
          
          <div className="bg-green-800 p-4 relative">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
              className="absolute top-4 right-4 bg-yellow-500 text-stone-900 px-3 py-1 font-black text-xs border-2 border-stone-900 shadow-[2px_2px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all z-10"
              style={{ fontFamily: 'Special Elite, cursive' }}
            >
              {language === 'en' ? '中文' : 'EN'}
            </button>

            {/* Title */}
            <div className="text-center mb-3">
              <h1 className="text-5xl font-black text-yellow-500 tracking-wide retro-text" style={{ fontFamily: 'Fredoka, cursive', letterSpacing: '0.05em' }}>
                {t.title}
              </h1>
              <div className="flex items-center justify-center gap-2 mt-1">
                <div className="h-1 w-12 bg-yellow-500"></div>
                <span className="text-amber-50 text-xs font-bold tracking-[0.3em]" style={{ fontFamily: 'Special Elite, cursive' }}>
                  {t.subtitle}
                </span>
                <div className="h-1 w-12 bg-yellow-500"></div>
              </div>
            </div>

            {/* Event Photo Frame */}
            <div className="relative bg-stone-900 p-2 border-4 border-yellow-500 shadow-[8px_8px_0px_rgba(0,0,0,0.3)]">
              <div className="relative border-2 border-orange-600">
                <img 
                  src={EVENT_HEADER_IMAGE} 
                  alt="Event" 
                  className="w-full h-40 object-cover"
                  style={{ 
                    filter: 'contrast(1.1) saturate(1.2) sepia(0.15)',
                  }}
                />
                <div className="absolute inset-0 paper-texture opacity-30 mix-blend-overlay"></div>
              </div>
              
              <div className="bg-amber-50 p-2 text-center border-t-2 border-yellow-600">
                <p className="text-xs font-bold text-stone-900" style={{ fontFamily: 'Special Elite, cursive' }}>
                  {t.photoCaption}
                </p>
              </div>
            </div>
            
            {/* Progress Tracker */}
            <div className="mt-4 bg-amber-50 border-4 border-stone-900 p-3 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-red-700 tracking-wider" style={{ fontFamily: 'Special Elite, cursive' }}>
                  {t.progress}
                </span>
                <span className="text-2xl font-black text-green-800" style={{ fontFamily: 'Bungee, cursive' }}>
                  {stamps.length}/{CRAWL_DATA.length}
                </span>
              </div>
              <div className="relative h-6 bg-stone-900 border-2 border-green-800 overflow-hidden">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
                }}></div>
                
                <div 
                  className="h-full bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-600 transition-all duration-500 relative"
                  style={{ 
                    width: `${getProgress()}%`,
                    backgroundSize: '20px 20px',
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.2) 5px, rgba(0,0,0,0.2) 10px)'
                  }}
                >
                  {getProgress() > 0 && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-black text-stone-900">
                      {getProgress()}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mx-4 my-4 relative">
          <div className="bg-yellow-500 border-4 border-stone-900 p-1 shadow-[6px_6px_0px_rgba(0,0,0,0.4)]">
            <div className="bg-red-700 border-2 border-dashed border-yellow-500 p-3 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #fbbf24 10px, #fbbf24 20px)'
              }}></div>
              
              <p className="text-sm font-black text-amber-50 text-center relative z-10 tracking-wide" style={{ fontFamily: 'Special Elite, cursive' }}>
                {t.collectStamps}
              </p>
            </div>
          </div>
        </div>

        {/* Location Cards */}
        <div className="flex-1 p-4 space-y-4 pb-24">
          {CRAWL_DATA.map((bar, index) => {
            const isStamped = stamps.includes(bar.id);
            return (
              <button
                key={bar.id}
                onClick={() => handleBarClick(bar)}
                disabled={isStamped}
                className={`w-full text-left relative transition-all duration-300 
                  ${isStamped ? 'opacity-80 grayscale' : 'hover:scale-[1.02] active:scale-[0.98]'} 
                  bg-amber-50 overflow-hidden border-4 border-stone-900 shadow-[6px_6px_0px_rgba(0,0,0,0.5)]
                  ${!isStamped ? 'hover:shadow-[8px_8px_0px_rgba(0,0,0,0.5)] hover:-translate-y-1' : ''}`}
              >
                {/* Perforated edge */}
                <div className="absolute left-0 top-0 bottom-0 w-6 flex flex-col justify-around items-center bg-stone-900 border-r-2 border-dashed border-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-3 h-3 rounded-full bg-amber-50 border-2 border-stone-900"></div>
                  ))}
                </div>

                <div className="flex h-28 ml-6">
                  {/* Number Badge */}
                  <div className={`w-20 flex flex-col items-center justify-center relative
                    ${isStamped ? 'bg-green-800' : 'bg-gradient-to-b from-orange-600 to-red-700'}
                    border-r-4 border-stone-900`}>
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)'
                    }}></div>
                    <span className="text-6xl font-black text-yellow-500 z-10" style={{ 
                      fontFamily: 'Bungee, cursive',
                      textShadow: '3px 3px 0px #000'
                    }}>
                      {index + 1}
                    </span>
                  </div>

                  {/* Bar Info */}
                  <div className="flex-1 p-3 flex flex-col justify-center relative bg-amber-50 border-r-2 border-dashed border-stone-900">
                    <div className="absolute inset-0 opacity-5" style={{
                      backgroundImage: 'radial-gradient(circle, #1c1917 1px, transparent 1px)',
                      backgroundSize: '10px 10px'
                    }}></div>
                    
                    <h3 className={`text-lg font-black text-stone-900 mb-1 relative z-10 leading-tight
                      ${isStamped ? 'line-through decoration-4 decoration-red-700' : ''}`}
                      style={{ fontFamily: 'Special Elite, cursive' }}>
                      {bar.name}
                    </h3>
                    <div className="flex items-center text-orange-600 text-xs font-bold gap-1 z-10" style={{ fontFamily: 'Special Elite, cursive' }}>
                      <Star size={12} fill="currentColor" />
                      <span>{t.freeShot}</span>
                    </div>
                  </div>

                  {/* Stamp Area */}
                  <div className="w-28 relative bg-amber-50 flex items-center justify-center overflow-hidden">
                    {/* Stamp perforated edges */}
                    <div className="absolute top-0 left-0 right-0 h-2 flex justify-around">
                      {[...Array(7)].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-stone-900"></div>
                      ))}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-2 flex justify-around">
                      {[...Array(7)].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-stone-900"></div>
                      ))}
                    </div>
                    <div className="absolute top-0 bottom-0 left-0 w-2 flex flex-col justify-around items-center">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-stone-900"></div>
                      ))}
                    </div>
                    <div className="absolute top-0 bottom-0 right-0 w-2 flex flex-col justify-around items-center">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-stone-900"></div>
                      ))}
                    </div>

                    {/* Stamp border */}
                    <div className="absolute inset-2 border-2 border-dashed border-orange-600"></div>
                    
                    {/* Venue logo */}
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <img 
                        src={bar.image} 
                        alt={bar.name}
                        className="max-w-full max-h-full object-contain"
                        style={{ 
                          opacity: isStamped ? 0.4 : 1,
                          filter: isStamped ? 'grayscale(1) sepia(0.3)' : 'sepia(0.1)'
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    
                    {isStamped && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                        <div className="relative transform -rotate-12">
                          <div className="w-20 h-20 border-4 border-red-700 rounded-full flex items-center justify-center bg-red-700/10 backdrop-blur-sm">
                            <div className="absolute inset-0 border-2 border-dashed border-red-700 rounded-full m-1"></div>
                            <Check size={40} className="text-red-700" strokeWidth={4} />
                          </div>
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-500 px-2 py-0.5 border-2 border-stone-900 whitespace-nowrap">
                            <span className="text-[0.5rem] font-black text-stone-900" style={{ fontFamily: 'Special Elite, cursive' }}>
                              APPROVED
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto">
          <div className="bg-gradient-to-r from-red-700 via-orange-600 to-red-700 p-1 border-t-4 border-yellow-500">
            <div className="bg-stone-900 p-3 flex justify-between items-center">
              <button 
                onClick={() => setShowResetConfirm(true)}
                className="text-yellow-500 text-xs font-black underline hover:text-orange-600 transition-colors tracking-wider"
                style={{ fontFamily: 'Special Elite, cursive' }}
              >
                {t.reset}
              </button>
              <button 
                onClick={() => setShowInfo(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-stone-900 px-4 py-2 font-black shadow-[4px_4px_0px_rgba(234,179,8,0.5)] hover:shadow-[2px_2px_0px_rgba(234,179,8,0.5)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all border-2 border-stone-900"
                style={{ fontFamily: 'Special Elite, cursive' }}
              >
                <QrCode size={16} />
                {t.info}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PIN Entry Modal */}
      {selectedBar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/95 backdrop-blur-sm">
          <div className="bg-yellow-500 p-2 shadow-[12px_12px_0px_rgba(0,0,0,0.8)] max-w-sm w-full border-8 border-stone-900">
            <div className="bg-amber-50 p-6 relative paper-texture">
              <button 
                onClick={() => setSelectedBar(null)}
                className="absolute top-2 right-2 w-8 h-8 bg-red-700 text-white font-black flex items-center justify-center border-2 border-stone-900 hover:bg-orange-600 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-6">
                <button
                  onClick={() => setShowQRScanner(true)}
                  className="inline-block bg-gradient-to-r from-red-700 via-orange-600 to-red-700 p-1 mb-4 border-4 border-stone-900 shadow-[4px_4px_0px_rgba(0,0,0,0.5)] hover:shadow-[2px_2px_0px_rgba(0,0,0,0.5)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                  <div className="bg-yellow-500 p-3 border-2 border-stone-900">
                    <QrCode className="text-stone-900" size={40} />
                  </div>
                </button>
                <h3 className="text-2xl font-black text-stone-900 mb-1" style={{ fontFamily: 'Special Elite, cursive' }}>
                  {selectedBar.name}
                </h3>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="h-1 w-16 bg-red-700"></div>
                  <div className="h-1 w-16 bg-red-700"></div>
                </div>
              </div>

              {/* Social Media Share */}
              <div className="bg-red-700 border-4 border-stone-900 p-4 mb-4 shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
                <div className="bg-yellow-500 border-4 border-stone-900 px-4 py-2 mb-4 w-full text-center shadow-[3px_3px_0px_rgba(0,0,0,0.3)]">
                  <p className="text-base font-black text-stone-900 tracking-wider" style={{ fontFamily: 'Fredoka, cursive' }}>
                    {t.shareTagUs}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => {
                      handleCopyTag(selectedBar.socialHandle);
                      // Open venue's Instagram page
                      const igUrl = selectedBar.instagramUrl || 'https://www.instagram.com/';
                      window.open(igUrl, '_blank');
                    }}
                    className="bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 text-white py-4 px-4 font-black border-4 border-stone-900 shadow-[3px_3px_0px_rgba(0,0,0,0.5)] hover:shadow-[1px_1px_0px_rgba(0,0,0,0.5)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
                    title="Copy tags & open Instagram page"
                  >
                    <Instagram size={28} strokeWidth={2.5} />
                    <span className="text-base" style={{ fontFamily: 'Fredoka, cursive' }}>{t.insta}</span>
                  </button>
                  <button 
                    onClick={() => {
                      handleCopyTag(selectedBar.socialHandle);
                      // Open venue's Facebook page
                      const fbUrl = selectedBar.facebookUrl || 'https://www.facebook.com/';
                      window.open(fbUrl, '_blank');
                    }}
                    className="bg-blue-600 text-white py-4 px-4 font-black border-4 border-stone-900 shadow-[3px_3px_0px_rgba(0,0,0,0.5)] hover:shadow-[1px_1px_0px_rgba(0,0,0,0.5)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
                    title="Copy tags & open Facebook page"
                  >
                    <Facebook size={28} strokeWidth={2.5} fill="currentColor" />
                    <span className="text-base" style={{ fontFamily: 'Fredoka, cursive' }}>{t.facebook}</span>
                  </button>
                  <button 
                    onClick={() => {
                      // Open Google search for the venue which shows reviews
                      const searchQuery = encodeURIComponent(`${selectedBar.name} Taipei reviews`);
                      window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
                    }}
                    className="bg-white text-red-700 py-4 px-4 font-black border-4 border-stone-900 shadow-[3px_3px_0px_rgba(0,0,0,0.5)] hover:shadow-[1px_1px_0px_rgba(0,0,0,0.5)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
                    title="Find on Google & leave review"
                  >
                    <svg width="28" height="28" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      {/* Google "G" */}
                      <text x="50" y="45" fontSize="48" fontWeight="bold" textAnchor="middle" fontFamily="Product Sans, Arial, sans-serif">
                        <tspan fill="#4285F4">G</tspan>
                      </text>
                      {/* 5 Stars */}
                      <g transform="translate(10, 55)">
                        <polygon points="8,3 10,9 16,9 11,13 13,19 8,15 3,19 5,13 0,9 6,9" fill="#FBBC04"/>
                        <polygon points="24,3 26,9 32,9 27,13 29,19 24,15 19,19 21,13 16,9 22,9" fill="#FBBC04"/>
                        <polygon points="40,3 42,9 48,9 43,13 45,19 40,15 35,19 37,13 32,9 38,9" fill="#FBBC04"/>
                        <polygon points="56,3 58,9 64,9 59,13 61,19 56,15 51,19 53,13 48,9 54,9" fill="#FBBC04"/>
                        <polygon points="72,3 74,9 80,9 75,13 77,19 72,15 67,19 69,13 64,9 70,9" fill="#FBBC04"/>
                      </g>
                    </svg>
                    <span className="text-base" style={{ fontFamily: 'Fredoka, cursive' }}>{t.googleReview}</span>
                  </button>
                  <button 
                    onClick={() => handleCopyTag(selectedBar.socialHandle)}
                    className="bg-yellow-500 text-stone-900 py-4 px-4 font-black border-4 border-stone-900 shadow-[3px_3px_0px_rgba(0,0,0,0.5)] hover:shadow-[1px_1px_0px_rgba(0,0,0,0.5)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
                    title="Copy tags to clipboard"
                  >
                    <Copy size={28} strokeWidth={2.5} />
                    <span className="text-base" style={{ fontFamily: 'Fredoka, cursive' }}>{t.tags}</span>
                  </button>
                </div>
                {copySuccess && (
                  <div className="mt-3 bg-yellow-500 border-4 border-stone-900 p-2 text-center shadow-[2px_2px_0px_rgba(0,0,0,0.3)]">
                    <p className="text-sm text-stone-900 font-black animate-pulse" style={{ fontFamily: 'Fredoka, cursive' }}>
                      ✓ {t.tagsCopied}
                    </p>
                  </div>
                )}
              </div>

              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-dashed border-stone-900"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-amber-50 px-3 text-xs font-black text-red-700" style={{ fontFamily: 'Special Elite, cursive' }}>
                    {t.orEnterCode}
                  </span>
                </div>
              </div>

              {/* PIN Input */}
              <form onSubmit={handlePinSubmit}>
                <div className="bg-stone-900 border-4 border-orange-600 p-2 mb-3 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.5)]">
                  <input 
                    type="tel"
                    inputMode="numeric"
                    maxLength={4}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="****"
                    className="w-full text-center text-5xl font-black tracking-[0.5em] py-3 bg-stone-900 text-orange-600 placeholder:text-orange-600/30 outline-none"
                    style={{ 
                      fontFamily: 'Bungee, cursive',
                      textShadow: '0 0 10px rgba(255,107,53,0.5)'
                    }}
                    autoFocus
                  />
                </div>
                {error && (
                  <div className="mb-3 bg-red-700 border-4 border-stone-900 p-2 text-center shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
                    <p className="text-xs text-yellow-500 font-black" style={{ fontFamily: 'Special Elite, cursive' }}>
                      ✗ {error}
                    </p>
                  </div>
                )}
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-700 via-orange-600 to-red-700 text-yellow-500 font-black py-3 border-4 border-stone-900 shadow-[6px_6px_0px_rgba(0,0,0,0.5)] hover:shadow-[3px_3px_0px_rgba(0,0,0,0.5)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all text-lg tracking-wider"
                  style={{ fontFamily: 'Fredoka, cursive' }}
                >
                  {t.validate}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/95 backdrop-blur-sm">
          <div className="bg-yellow-500 p-2 shadow-[12px_12px_0px_rgba(0,0,0,0.8)] max-w-sm w-full border-8 border-stone-900">
            <div className="bg-amber-50 p-6 paper-texture">
              <div className="text-center mb-4">
                <div className="inline-block bg-red-700 px-4 py-2 border-4 border-stone-900 mb-2 shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
                  <h3 className="text-2xl font-black text-yellow-500" style={{ fontFamily: 'Fredoka, cursive' }}>
                    {t.instructions}
                  </h3>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                {[
                  { num: '1', text: t.step1 },
                  { num: '2', text: t.step2 },
                  { num: '3', text: t.step3 },
                  { num: '4', text: t.step4 }
                ].map((step) => (
                  <div key={step.num} className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-red-700 to-orange-600 border-4 border-stone-900 flex items-center justify-center shadow-[3px_3px_0px_rgba(0,0,0,0.3)]">
                      <span className="text-xl font-black text-yellow-500" style={{ fontFamily: 'Bungee, cursive' }}>
                        {step.num}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-stone-900 pt-2" style={{ fontFamily: 'Special Elite, cursive' }}>
                      {step.text}
                    </p>
                  </div>
                ))}
                
                <div className="flex gap-3 items-start bg-green-800 border-4 border-stone-900 p-3 shadow-[3px_3px_0px_rgba(0,0,0,0.3)]">
                  <div className="flex-shrink-0 w-10 h-10 bg-yellow-500 border-4 border-stone-900 flex items-center justify-center">
                    <span className="text-xl" style={{ fontFamily: 'Fredoka, cursive' }}>📸</span>
                  </div>
                  <p className="text-sm font-bold text-yellow-500 pt-2" style={{ fontFamily: 'Special Elite, cursive' }}>
                    {t.shareMedia}
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => setShowInfo(false)}
                className="w-full bg-gradient-to-r from-red-700 via-orange-600 to-red-700 text-yellow-500 font-black py-3 border-4 border-stone-900 shadow-[6px_6px_0px_rgba(0,0,0,0.5)] hover:shadow-[3px_3px_0px_rgba(0,0,0,0.5)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all text-lg"
                style={{ fontFamily: 'Fredoka, cursive' }}
              >
                {t.gotIt}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Animation */}
      {showSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-green-800/98 backdrop-blur-md">
          <div className="text-center">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-yellow-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <Star size={120} className="text-yellow-500 relative animate-bounce" fill="currentColor" />
              <Check size={60} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-stone-900" strokeWidth={5} />
            </div>
            <div className="bg-yellow-500 border-8 border-stone-900 p-6 inline-block shadow-[12px_12px_0px_rgba(0,0,0,0.8)] mb-4">
              <h2 className="text-6xl font-black text-stone-900 retro-text mb-2" style={{ fontFamily: 'Fredoka, cursive' }}>
                {t.approved}
              </h2>
              <div className="h-2 w-full bg-stone-900 mb-2"></div>
              <p className="text-xl font-black text-red-700" style={{ fontFamily: 'Special Elite, cursive' }}>
                {t.stampCollected}
              </p>
            </div>
            <div className="bg-stone-900 border-4 border-yellow-500 px-6 py-2 inline-block">
              <p className="text-2xl font-black text-yellow-500" style={{ fontFamily: 'Bungee, cursive' }}>
                {stamps.length} / {CRAWL_DATA.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Reward Modal */}
      {showReward && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-gradient-to-br from-red-700 via-orange-600 to-yellow-500">
          <div className="bg-stone-900 p-3 shadow-[16px_16px_0px_rgba(0,0,0,0.8)] max-w-sm w-full border-8 border-yellow-500">
            <div className="bg-amber-50 p-6 text-center relative overflow-hidden paper-texture">
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'radial-gradient(circle, #ea580c 2px, transparent 2px), radial-gradient(circle, #eab308 2px, transparent 2px)',
                backgroundSize: '40px 40px, 60px 60px',
                backgroundPosition: '0 0, 30px 30px'
              }}></div>

              <div className="relative z-10">
                <div className="mb-4">
                  <Gift size={80} className="mx-auto text-red-700 animate-bounce" />
                </div>
                
                <div className="bg-yellow-500 border-6 border-stone-900 p-4 mb-4 shadow-[6px_6px_0px_rgba(0,0,0,0.5)]">
                  <h2 className="text-5xl font-black text-stone-900 retro-text mb-2" style={{ fontFamily: 'Fredoka, cursive' }}>
                    {t.winner}
                  </h2>
                  <div className="h-1 w-full bg-stone-900 mb-2"></div>
                  <p className="text-lg font-black text-red-700" style={{ fontFamily: 'Special Elite, cursive' }}>
                    {t.allStampsCollected.replace('{count}', CRAWL_DATA.length)}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-800 to-green-700 border-4 border-stone-900 p-4 mb-6 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
                  <p className="text-sm font-black text-yellow-500 mb-2 tracking-wider" style={{ fontFamily: 'Special Elite, cursive' }}>
                    {t.rewardAwaits}
                  </p>
                  <div className="h-1 w-full bg-yellow-500 mb-2"></div>
                  <p className="text-xs font-bold text-amber-50" style={{ fontFamily: 'Special Elite, cursive' }}>
                    {t.showScreen}
                  </p>
                </div>

                <button 
                  onClick={() => setShowReward(false)}
                  className="w-full bg-gradient-to-r from-red-700 via-orange-600 to-red-700 text-yellow-500 font-black py-3 border-4 border-stone-900 shadow-[6px_6px_0px_rgba(0,0,0,0.5)] hover:shadow-[3px_3px_0px_rgba(0,0,0,0.5)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all text-lg mb-3"
                  style={{ fontFamily: 'Fredoka, cursive' }}
                >
                  {t.awesome}
                </button>
                
                <button 
                  onClick={() => setShowResetConfirm(true)}
                  className="text-xs font-bold text-stone-900 underline hover:text-red-700 transition-colors"
                  style={{ fontFamily: 'Special Elite, cursive' }}
                >
                  {t.startNewCrawl}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/95">
          <div className="bg-orange-600 p-2 shadow-[12px_12px_0px_rgba(0,0,0,0.8)] max-w-xs w-full border-8 border-stone-900">
            <div className="bg-amber-50 p-6 text-center border-4 border-red-700">
              <div className="mb-4">
                <div className="inline-block bg-red-700 px-4 py-2 border-4 border-stone-900 shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
                  <h3 className="text-xl font-black text-yellow-500" style={{ fontFamily: 'Fredoka, cursive' }}>
                    {t.warning}
                  </h3>
                </div>
              </div>
              
              <p className="text-sm font-bold text-stone-900 mb-4" style={{ fontFamily: 'Special Elite, cursive' }}>
                {t.eraseStamps}
              </p>

              {/* Admin Code Input */}
              <div className="mb-4">
                <p className="text-xs font-bold text-red-700 mb-2" style={{ fontFamily: 'Special Elite, cursive' }}>
                  {t.enterAdminCode || 'ENTER ADMIN CODE:'}
                </p>
                <div className="bg-stone-900 border-4 border-red-700 p-2 mb-2">
                  <input 
                    type="text"
                    value={adminCode}
                    onChange={(e) => {
                      setAdminCode(e.target.value.toUpperCase());
                      setError('');
                    }}
                    placeholder="ADMIN CODE"
                    className="w-full text-center text-2xl font-black tracking-wider py-2 bg-stone-900 text-orange-600 placeholder:text-orange-600/30 outline-none uppercase"
                    style={{ fontFamily: 'Bungee, cursive' }}
                    autoFocus
                  />
                </div>
                {error && (
                  <p className="text-xs text-red-700 font-black" style={{ fontFamily: 'Special Elite, cursive' }}>
                    {error}
                  </p>
                )}
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    setShowResetConfirm(false);
                    setAdminCode('');
                    setError('');
                  }}
                  className="flex-1 py-3 bg-green-800 text-yellow-500 font-black border-4 border-stone-900 shadow-[4px_4px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  style={{ fontFamily: 'Special Elite, cursive' }}
                >
                  {t.cancel}
                </button>
                <button 
                  onClick={handleReset}
                  className="flex-1 py-3 bg-red-700 text-yellow-500 font-black border-4 border-stone-900 shadow-[4px_4px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  style={{ fontFamily: 'Special Elite, cursive' }}
                >
                  {t.reset}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR Scanner Helper Modal */}
      {showQRScanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/95">
          <div className="bg-yellow-500 p-2 shadow-[12px_12px_0px_rgba(0,0,0,0.8)] max-w-sm w-full border-8 border-stone-900">
            <div className="bg-amber-50 p-6 text-center border-4 border-orange-600 paper-texture">
              <div className="mb-4">
                <div className="inline-block bg-orange-600 px-4 py-2 border-4 border-stone-900 shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
                  <h3 className="text-xl font-black text-yellow-500" style={{ fontFamily: 'Fredoka, cursive' }}>
                    {t.scanQrCode}
                  </h3>
                </div>
              </div>
              
              <div className="bg-white border-4 border-stone-900 p-6 mb-4">
                <QrCode size={80} className="mx-auto text-stone-900 mb-3" />
                <p className="text-sm font-bold text-stone-900" style={{ fontFamily: 'Special Elite, cursive' }}>
                  {t.lookForQr}
                </p>
              </div>

              <div className="bg-red-700 border-4 border-stone-900 p-3 mb-4">
                <p className="text-xs font-bold text-yellow-500 mb-2" style={{ fontFamily: 'Special Elite, cursive' }}>
                  {t.howToScan}
                </p>
                <div className="text-left space-y-2">
                  <p className="text-xs text-amber-50 font-bold" style={{ fontFamily: 'Special Elite, cursive' }}>
                    {t.scanIphone}
                  </p>
                  <p className="text-xs text-amber-50 font-bold" style={{ fontFamily: 'Special Elite, cursive' }}>
                    {t.scanAndroid}
                  </p>
                  <p className="text-xs text-amber-50 font-bold" style={{ fontFamily: 'Special Elite, cursive' }}>
                    {t.pointAt}
                  </p>
                  <p className="text-xs text-amber-50 font-bold" style={{ fontFamily: 'Special Elite, cursive' }}>
                    {t.tapNotification}
                  </p>
                </div>
              </div>
              
              <p className="text-xs font-bold text-green-800 mb-4" style={{ fontFamily: 'Special Elite, cursive' }}>
                {t.askBartender}
              </p>

              <button 
                onClick={() => setShowQRScanner(false)}
                className="w-full bg-gradient-to-r from-red-700 via-orange-600 to-red-700 text-yellow-500 font-black py-3 border-4 border-stone-900 shadow-[6px_6px_0px_rgba(0,0,0,0.5)] hover:shadow-[3px_3px_0px_rgba(0,0,0,0.5)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all text-lg"
                style={{ fontFamily: 'Fredoka, cursive' }}
              >
                {t.gotIt}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SantaCrawlApp;
