import React, { useState, useEffect } from 'react';
import { MapPin, Check, X, PartyPopper, Snowflake, Lock, QrCode } from 'lucide-react';

// --- CONFIGURATION ---
// Replace these URLs with your actual event header and business logo images.
const EVENT_HEADER_IMAGE = "https://placehold.co/600x250/b91c1c/ffffff?text=SANTA+CRAWL+2024&font=roboto";

const CRAWL_DATA = [
  { id: 1, name: "The North Pole Pub", location: "123 Main St", secretPin: "1234", image: "https://placehold.co/150x150/2b2d42/ffffff?text=NPP+Logo" },
  { id: 2, name: "Rudolph's Red Nose Bar", location: "45 Elm St", secretPin: "2025", image: "https://placehold.co/150x150/ef233c/ffffff?text=Rudolph's" },
  { id: 3, name: "Frosty's Lounge", location: "88 Snow Ave", secretPin: "5555", image: "https://placehold.co/150x150/8d99ae/ffffff?text=Frosty's" },
  { id: 4, name: "Santa's Workshop", location: "99 Toy Ln", secretPin: "9999", image: "https://placehold.co/150x150/d90429/ffffff?text=Workshop" },
  { id: 5, name: "The Sleigh Stop", location: "101 Sky Way", secretPin: "7777", image: "https://placehold.co/150x150/edf2f4/2b2d42?text=Sleigh+Stop" },
];

const STORAGE_KEY = 'santa_crawl_progress_v3';

export default function App() {
  const [stamps, setStamps] = useState<number[]>([]);
  const [selectedBar, setSelectedBar] = useState<any>(null);
  const [pinInput, setPinInput] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showScanHelp, setShowScanHelp] = useState(false);

  // Load progress on mount
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

  // --- NEW: URL PARAMETER SCANNING LOGIC ---
  useEffect(() => {
    // This allows users to scan a QR code like: https://yourapp.com/?pin=1234
    // The app will open, read '1234', find the matching bar, and stamp it automatically.
    const params = new URLSearchParams(window.location.search);
    const pinFromUrl = params.get('pin');

    if (pinFromUrl) {
      const foundBar = CRAWL_DATA.find(b => b.secretPin === pinFromUrl);
      
      if (foundBar) {
        setStamps(prev => {
          // Only stamp if not already stamped
          if (!prev.includes(foundBar.id)) {
            // Trigger success modal
            setTimeout(() => setShowSuccess(true), 500); 
            // Auto hide success modal after 4 seconds (longer for bartender verification)
            setTimeout(() => setShowSuccess(false), 4500);
            return [...prev, foundBar.id];
          }
          return prev;
        });
      }

      // Clean the URL so refreshing doesn't re-trigger logic (optional but clean)
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Save progress whenever stamps change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stamps));
  }, [stamps]);

  const handleBarClick = (bar: any) => {
    if (stamps.includes(bar.id)) return; // Already stamped
    setSelectedBar(bar);
    setPinInput('');
    setError('');
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBar) return;

    if (pinInput === selectedBar.secretPin) {
      stampLocation(selectedBar.id);
      setSelectedBar(null);
    } else {
      setError('Incorrect PIN! Ask the bartender.');
      setPinInput('');
    }
  };

  const stampLocation = (barId: number) => {
    const newStamps = [...stamps, barId];
    setStamps(newStamps);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  const handleReset = () => {
    setStamps([]);
    setShowResetConfirm(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getProgress = () => {
    return Math.round((stamps.length / CRAWL_DATA.length) * 100);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans relative overflow-hidden">
      {/* Snow Background Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-md mx-auto min-h-screen flex flex-col shadow-2xl">
        
        {/* Event Header Image */}
        <div className="relative bg-red-900">
          <img src={EVENT_HEADER_IMAGE} alt="Santa Crawl Event Header" className="w-full h-auto object-cover max-h-48" />
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-red-900 to-transparent"></div>
        </div>

        {/* Progress Section */}
        <div className="bg-red-800 p-6 rounded-b-3xl shadow-lg border-b-4 border-yellow-500 relative overflow-hidden">
          {/* Snowflakes for decoration */}
          <div className="absolute top-2 left-4 text-red-950 opacity-20 pointer-events-none">
            <Snowflake size={40} />
          </div>
          <div className="absolute bottom-2 right-4 text-red-950 opacity-20 pointer-events-none">
            <Snowflake size={30} />
          </div>
          
          <h2 className="text-xl font-bold text-white drop-shadow-md text-center mb-4">
            OFFICIAL STAMP CARD
          </h2>
          
          {/* Progress Bar */}
          <div className="bg-red-950/50 rounded-full h-5 w-full overflow-hidden border-2 border-yellow-500 shadow-inner">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-full transition-all duration-500 ease-out"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-3">
            <p className="text-sm text-yellow-100 font-bold">
              {stamps.length} of {CRAWL_DATA.length} STOPS COLLECTED
            </p>
            {/* Scan Help Button */}
            <button 
              onClick={() => setShowScanHelp(true)}
              className="text-xs flex items-center gap-1 bg-red-900 hover:bg-red-700 px-3 py-1.5 rounded-full text-white transition-colors border border-red-600"
            >
              <QrCode size={14} />
              How to Scan?
            </button>
          </div>
        </div>

        {/* Bar List */}
        <div className="flex-1 p-4 space-y-4 pb-20 bg-slate-100">
          {CRAWL_DATA.map((bar) => {
            const isStamped = stamps.includes(bar.id);
            return (
              <button
                key={bar.id}
                onClick={() => handleBarClick(bar)}
                disabled={isStamped}
                className={`w-full text-left relative overflow-hidden transition-all duration-300 transform 
                  ${isStamped 
                    ? 'bg-white border-green-500 shadow-md scale-[0.99]' 
                    : 'bg-white hover:bg-gray-50 border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5'
                  } 
                  rounded-2xl border-2 p-4 group`}
              >
                <div className="flex items-center justify-between relative z-10">
                  {/* Bar Info & Logo */}
                  <div className="flex-1 flex items-center mr-4">
                    <img 
                      src={bar.image} 
                      alt={`${bar.name} logo`} 
                      className={`w-14 h-14 rounded-xl border bg-white object-contain p-1 mr-4 shadow-sm ${isStamped ? 'border-green-500' : 'border-slate-100 filter grayscale contrast-75 opacity-80'}`}
                    />
                    <div>
                      <h3 className={`font-bold text-lg leading-tight ${isStamped ? 'text-green-800' : 'text-slate-800'}`}>
                        {bar.name}
                      </h3>
                      <div className="flex items-center space-x-1 mt-1">
                        <MapPin size={14} className={isStamped ? 'text-green-600' : 'text-red-400'} />
                        <span className={`text-sm ${isStamped ? 'text-green-700' : 'text-slate-500'}`}>
                          {bar.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stamp Visual - Business Logo as the stamp */}
                  <div className={`
                    w-20 h-20 rounded-full border-4 flex items-center justify-center transform rotate-6 transition-all relative overflow-hidden bg-white shadow-sm
                    ${isStamped 
                      ? 'border-green-500' 
                      : 'border-slate-100 group-hover:border-red-200'
                    }
                  `}>
                    <img 
                      src={bar.image} 
                      alt={`${bar.name} stamp`}
                      className={`w-full h-full object-cover transition-all duration-300 p-0.5 rounded-full ${isStamped ? '' : 'filter grayscale contrast-50 opacity-40 scale-95'}`}
                     />
                    
                    {isStamped ? (
                      <div className="absolute inset-0 bg-green-600/40 flex items-center justify-center backdrop-blur-[1px]">
                        <Check size={48} strokeWidth={5} className="text-white drop-shadow-lg" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-[0.65rem] font-black text-center leading-tight text-slate-400 bg-white/90 p-1.5 rounded-lg uppercase tracking-wider">
                          Tap to<br/>Stamp
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Decorative "STAMPED" Overlay Text */}
                {isStamped && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 rotate-[-12deg]">
                    <span className="text-4xl font-black text-green-900 border-4 border-green-900 p-2 rounded-lg dashed">
                      STAMPED
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 flex justify-center bg-slate-100">
           <button 
             onClick={() => setShowResetConfirm(true)}
             className="text-xs text-slate-400 underline hover:text-red-500 transition-colors"
           >
             Reset Progress
           </button>
        </div>
      </div>

      {/* MANUAL PIN ENTRY MODAL (Fallback) */}
      {selectedBar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-4 bg-[repeating-linear-gradient(45deg,#b91c1c,#b91c1c_10px,#ffffff_10px,#ffffff_20px)]"></div>
            
            <button 
              onClick={() => setSelectedBar(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X size={24} />
            </button>

            <div className="text-center mt-6">
              <img src={selectedBar.image} alt={selectedBar.name} className="w-20 h-20 mx-auto rounded-full border-4 border-red-100 object-contain bg-white p-1 mb-4" />
              <h3 className="text-xl font-bold text-slate-800">Collect Stamp at:</h3>
              <h4 className="text-lg font-black text-red-700 leading-tight mt-1">{selectedBar.name}</h4>
            </div>

            <div className="mt-8 space-y-6">
              {/* Option A: Scan */}
              <div className="bg-slate-50 p-4 rounded-xl border-2 border-slate-100 text-center relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-2 opacity-10"><QrCode size={64} className="text-slate-900"/></div>
                 <p className="text-sm font-bold text-slate-700 mb-2 relative z-10">Option 1: Scan QR Code</p>
                 <p className="text-xs text-slate-500 relative z-10">
                   Use your <strong>Phone Camera</strong> to scan the poster at the bar.
                 </p>
              </div>

              {/* Option B: PIN */}
              <div>
                <p className="text-sm font-bold text-slate-700 mb-3 text-center">Option 2: Enter Bartender PIN</p>
                <form onSubmit={handlePinSubmit}>
                  <input
                    type="tel"
                    maxLength={4}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="••••"
                    className="w-full text-center text-3xl font-bold tracking-[1em] py-4 border-b-2 border-slate-200 focus:border-red-500 outline-none text-slate-800 placeholder:text-slate-300 placeholder:tracking-normal"
                    autoFocus
                  />
                  
                  {error && (
                    <p className="text-red-500 text-sm text-center mt-2 font-bold animate-pulse">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full mt-6 bg-red-700 hover:bg-red-800 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95"
                  >
                    STAMP IT!
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HOW TO SCAN MODAL */}
      {showScanHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-sm p-8 shadow-2xl text-center">
             <div className="mx-auto w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-600 mb-4">
                <QrCode size={40} />
             </div>
             <h3 className="text-2xl font-bold text-slate-800 mb-2">How to Scan</h3>
             <p className="text-slate-600 mb-8 text-base leading-relaxed">
               Look for the QR code poster at each location. Simply open your phone's <strong>Camera App</strong> and point it at the code. Tap the link that appears to get your stamp!
             </p>
             <button 
               onClick={() => setShowScanHelp(false)}
               className="w-full bg-red-700 text-white font-bold py-4 rounded-xl hover:bg-red-800 transition-colors"
             >
               Got it!
             </button>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-green-900/95 backdrop-blur-md animate-in zoom-in duration-300">
          <div className="text-center text-white w-full max-w-sm relative">
            {/* Confetti background effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 text-yellow-400 opacity-50 animate-ping"><PartyPopper size={24} /></div>
                <div className="absolute top-1/3 right-1/4 text-red-400 opacity-50 animate-ping delay-300"><PartyPopper size={32} /></div>
                <div className="absolute bottom-1/4 left-1/3 text-blue-400 opacity-50 animate-ping delay-700"><PartyPopper size={20} /></div>
            </div>
            
            <div className="inline-block p-6 bg-white rounded-full text-green-600 mb-6 shadow-xl animate-bounce relative z-10">
              <Check size={64} strokeWidth={4} />
            </div>
            <h2 className="text-5xl font-black italic transform -rotate-6 text-yellow-400 drop-shadow-xl mb-6 relative z-10">
              STAMPED!
            </h2>
            <div className="bg-white/10 p-8 rounded-2xl border-2 border-white/30 backdrop-blur-lg relative z-10">
              <p className="text-green-100 uppercase tracking-widest text-sm font-bold mb-2">
                Verification Complete
              </p>
              <p className="text-white font-bold text-3xl leading-tight">
                Show this screen to Bartender for your Free Shot!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* RESET CONFIRMATION */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl p-8 w-full max-w-xs text-center text-slate-800 shadow-2xl">
            <h3 className="font-bold text-2xl">Start Over?</h3>
            <p className="text-base text-slate-500 mt-4 mb-8">This will erase all your collected stamps and progress.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-3 bg-slate-100 font-bold rounded-xl hover:bg-slate-200 transition-colors text-slate-700"
              >
                Cancel
              </button>
              <button 
                onClick={handleReset}
                className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}