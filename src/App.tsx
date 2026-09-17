/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from 'react';
import { getRandomQuestions, Question } from './data/questions';
import { submitScore, syncPendingSubmissions, getLeaderboard, LeaderboardEntry } from './lib/sync';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Timer, ChevronRight, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

type ViewState = 'register' | 'quiz' | 'result' | 'leaderboard';

const INDIAN_CITIES = [
  "Agra", "Ahmedabad", "Amritsar", "Aurangabad", "Bengaluru", "Bhopal", 
  "Chennai", "Delhi", "Faridabad", "Ghaziabad", "Hyderabad", "Indore", 
  "Jaipur", "Kalyan-Dombivli", "Kanpur", "Kolkata", "Lucknow", "Ludhiana", 
  "Meerut", "Mumbai", "Nagpur", "Nashik", "Patna", "Pimpri-Chinchwad", 
  "Pune", "Rajkot", "Srinagar", "Surat", "Thane", "Vadodara", "Varanasi", 
  "Vasai-Virar", "Visakhapatnam"
];

export default function App() {
  const [view, setViewState] = useState<ViewState>('register');
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // User details
  const [name, setName] = useState('');
  const [cityState, setCityState] = useState('');
  const [phone, setPhone] = useState('');

  // Quiz State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isErrorState, setIsErrorState] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);

  // GP Mode State
  const [streak, setStreak] = useState(0);
  const [madeMistake, setMadeMistake] = useState(false);
  const isGpMode = streak >= 5;

  // Visual Effects State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const audioRef = useRef<HTMLAudioElement>(null);

  // Leaderboard
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      syncPendingSubmissions().then(() => {
        if (view === 'leaderboard') fetchLeaderboard();
      });
    };
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [view]);

  // Live Timer
  useEffect(() => {
    let animationFrameId: number;
    if (view === 'quiz' && startTime > 0 && !timeTaken) {
      const updateTimer = () => {
        setElapsedMs(Date.now() - startTime);
        animationFrameId = requestAnimationFrame(updateTimer);
      };
      animationFrameId = requestAnimationFrame(updateTimer);
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [view, startTime, timeTaken]);

  const startQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !cityState || !phone) return;
    
    // Play Motorcycle Rev Sound reliably via ref
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log('Audio playback prevented:', e));
    }

    setQuestions(getRandomQuestions(10));
    setCurrentIndex(0);
    setStartTime(Date.now());
    setTimeTaken(0);
    setElapsedMs(0);
    setStreak(0);
    setMadeMistake(false);
    setViewState('quiz');
    setSelectedOptionIndex(null);
    setIsErrorState(false);
  };

  const handleOptionSelect = (index: number) => {
    if (selectedOptionIndex !== null && !isErrorState) return; // Prevent clicking after correct answer

    const currentQuestion = questions[currentIndex];
    setSelectedOptionIndex(index);

    if (index === currentQuestion.correctAnswerIndex) {
      setIsErrorState(false);
      if (!madeMistake) {
        setStreak(s => s + 1);
      }
      
      // Move to next question after delay
      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setSelectedOptionIndex(null);
          setMadeMistake(false);
        } else {
          finishQuiz();
        }
      }, 800);
    } else {
      setIsErrorState(true);
      setMadeMistake(true);
      setStreak(0);
      // Allow them to click again immediately, but keep the red state for the wrong one
    }
  };

  const finishQuiz = async () => {
    const endTime = Date.now();
    const totalTime = endTime - startTime;
    setTimeTaken(totalTime);
    setElapsedMs(totalTime); // lock the final time
    setViewState('result');

    // Submit score
    await submitScore({
      name,
      cityState,
      phone,
      timeTaken: totalTime,
    });
  };

  const fetchLeaderboard = async () => {
    setIsLoadingLeaderboard(true);
    const data = await getLeaderboard();
    setLeaderboard(data);
    setIsLoadingLeaderboard(false);
    setViewState('leaderboard');
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = ms % 1000;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${Math.floor(milliseconds / 10).toString().padStart(2, '0')}`;
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 text-slate-900 font-sans flex flex-col relative overflow-hidden ${isGpMode ? 'bg-gradient-to-br from-[#e2001a] to-[#80000a]' : 'bg-[#f4f4f4]'}`}>
      
      {/* Preload Audio */}
      <audio ref={audioRef} src="https://actions.google.com/sounds/v1/transportation/motorcycle_rev.ogg" preload="auto" />

      {/* Mouse Follower Glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${isGpMode ? 'rgba(255,255,255,0.15)' : 'rgba(226,0,26,0.08)'}, transparent 40%)`
        }}
      />

      {/* GP Mode Speed Lines */}
      {isGpMode && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] bg-gradient-to-b from-transparent via-white/40 to-transparent animate-speed-drop"
              style={{
                height: `${Math.random() * 200 + 100}px`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 0.4 + 0.2}s`,
                animationDelay: `${Math.random() * 0.5}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <header className={`backdrop-blur-md shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-10 transition-colors duration-500 ${isGpMode ? 'bg-white/10 border-b border-white/20' : 'bg-white/80 border-b border-slate-200'}`}>
        <div className="flex items-center gap-4">
          <img src="/motul.png" alt="Motul" className="h-[18px] sm:h-[24px] object-contain" />
          <span className={isGpMode ? "text-white/30" : "text-slate-300"}>|</span>
          <img src="/motogp.png" alt="MotoGP" className="h-[18px] sm:h-[24px] object-contain" />
        </div>
        {isOffline && (
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full text-sm font-semibold">
            <AlertCircle size={16} />
            <span className="hidden sm:inline">Offline Mode</span>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative z-10">
        
        {/* GP Mode Badge */}
        <AnimatePresence>
          {isGpMode && view === 'quiz' && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mb-6 bg-white text-[#e2001a] font-black italic tracking-widest px-6 py-2 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)] border-2 border-white uppercase flex items-center gap-2"
            >
              <Timer className="animate-pulse" size={20} /> GP Mode: ON
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`w-full max-w-2xl rounded-2xl overflow-hidden relative transition-all duration-700 ${isGpMode ? 'bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(226,0,26,0.3)]' : 'bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl'}`}>
          
          <AnimatePresence mode="wait">
            {view === 'register' && (
              <motion.div
                key="register"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-8 sm:p-12"
              >
                <div className="text-center mb-8">
                  <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 uppercase tracking-tight">
                    Motul GP Mode Qualifiers
                  </h1>
                  <p className="text-slate-600 font-medium">Test your MotoGP knowledge. Fastest times win.</p>
                </div>

                <form onSubmit={startQuiz} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-200 focus:border-[#e2001a] focus:ring-2 focus:ring-[#e2001a]/20 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">City (India)</label>
                    <select
                      required
                      value={cityState}
                      onChange={e => setCityState(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-200 focus:border-[#e2001a] focus:ring-2 focus:ring-[#e2001a]/20 outline-none transition-all appearance-none"
                    >
                      <option value="" disabled>Select your city</option>
                      {INDIAN_CITIES.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-200 focus:border-[#e2001a] focus:ring-2 focus:ring-[#e2001a]/20 outline-none transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#e2001a] hover:bg-[#c40017] text-white font-bold py-4 rounded-xl mt-4 flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(226,0,26,0.4)]"
                  >
                    START ENGINE <ChevronRight size={20} />
                  </button>
                </form>
              </motion.div>
            )}

            {view === 'quiz' && questions.length > 0 && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 sm:p-12 flex flex-col h-full min-h-[500px]"
              >
                {/* Physical Stopwatch UI */}
                <div className="flex flex-col items-center mb-8 relative">
                  <div className={`w-32 h-32 rounded-full border-[10px] flex flex-col items-center justify-center relative shadow-lg transition-colors duration-500 ${isGpMode ? 'border-white bg-white/90 text-[#e2001a]' : 'border-slate-800 bg-white/90 text-slate-900'}`}>
                    {/* Top Button */}
                    <div className={`absolute -top-5 left-1/2 -translate-x-1/2 w-5 h-3 rounded-t-md transition-colors ${isGpMode ? 'bg-white' : 'bg-slate-800'}`}></div>
                    <div className={`absolute -top-7 left-1/2 -translate-x-1/2 w-3 h-2 rounded-t-sm transition-colors ${isGpMode ? 'bg-white/80' : 'bg-slate-600'}`}></div>
                    {/* Side Button */}
                    <div className={`absolute top-1 -right-3 w-4 h-3 rounded-t-md rotate-45 transform origin-bottom-left transition-colors ${isGpMode ? 'bg-white' : 'bg-slate-800'}`}></div>

                    <span className="text-xl font-mono font-black tracking-tighter tabular-nums">
                      {formatTime(elapsedMs)}
                    </span>
                    <span className={`text-[10px] uppercase font-bold mt-1 ${isGpMode ? 'text-red-500' : 'text-slate-500'}`}>Live Time</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className={`text-sm font-bold uppercase tracking-wider ${isGpMode ? 'text-red-600' : 'text-slate-500'}`}>
                    Question {currentIndex + 1} / 10
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 leading-tight drop-shadow-sm">
                  {questions[currentIndex].text}
                </h2>

                <div className="space-y-3 mt-auto">
                  {questions[currentIndex].options.map((option, idx) => {
                    const isCorrect = idx === questions[currentIndex].correctAnswerIndex;
                    const isSelected = selectedOptionIndex === idx;
                    
                    let btnClass = "w-full text-left px-6 py-4 rounded-xl border-2 font-semibold transition-all relative overflow-hidden backdrop-blur-sm ";
                    let icon = null;

                    if (isSelected) {
                      if (isCorrect) {
                        btnClass += "border-green-500 bg-green-100 text-green-900 shadow-[0_0_15px_rgba(34,197,94,0.4)]";
                        icon = <CheckCircle2 className="text-green-600 absolute right-6 top-1/2 -translate-y-1/2" />;
                      } else {
                        btnClass += "border-red-500 bg-red-100 text-red-900";
                        icon = <XCircle className="text-red-600 absolute right-6 top-1/2 -translate-y-1/2" />;
                      }
                    } else if (selectedOptionIndex !== null && isCorrect && !isErrorState) {
                      // Show the correct answer briefly before advancing
                      btnClass += "border-green-500 bg-green-100 text-green-900 shadow-[0_0_15px_rgba(34,197,94,0.4)]";
                      icon = <CheckCircle2 className="text-green-600 absolute right-6 top-1/2 -translate-y-1/2" />;
                    } else {
                      btnClass += "border-slate-200 bg-white/60 hover:border-[#e2001a] hover:bg-white/90 text-slate-800";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionSelect(idx)}
                        disabled={selectedOptionIndex !== null && !isErrorState} // Disable if they got it right and we are transitioning
                        className={btnClass}
                      >
                        <span className="pr-8 block">{option}</span>
                        {icon}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {view === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 sm:p-12 text-center"
              >
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
                  <CheckCircle2 size={48} className="text-green-600" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-2 uppercase">Quiz Completed!</h2>
                <p className="text-slate-600 font-medium mb-8">You successfully finished the racing trivia.</p>
                
                <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl p-6 mb-8 inline-block min-w-[250px] shadow-sm">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Your Time</p>
                  <p className="text-4xl font-mono font-black text-[#e2001a]">
                    {formatTime(timeTaken)}
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={fetchLeaderboard}
                    className="w-full bg-[#111] hover:bg-black text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg"
                  >
                    <Trophy size={20} /> VIEW LEADERBOARD
                  </button>
                  <button
                    onClick={() => {
                      setQuestions(getRandomQuestions(10));
                      setCurrentIndex(0);
                      setStartTime(Date.now());
                      setTimeTaken(0);
                      setElapsedMs(0);
                      setStreak(0);
                      setMadeMistake(false);
                      setViewState('quiz');
                      setSelectedOptionIndex(null);
                      setIsErrorState(false);
                    }}
                    className="w-full bg-white/60 hover:bg-white/90 text-slate-800 border border-slate-300 font-bold py-4 rounded-xl transition-colors backdrop-blur-sm"
                  >
                    TRY AGAIN
                  </button>
                </div>
              </motion.div>
            )}

            {view === 'leaderboard' && (
              <motion.div
                key="leaderboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 sm:p-12"
              >
                <div className="text-center mb-8">
                  <Trophy size={40} className="text-[#e2001a] mx-auto mb-4 drop-shadow-md" />
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Top Racers</h2>
                  {isOffline && (
                    <p className="text-amber-600 text-sm mt-2 font-semibold">
                      Offline. Showing local/cached results.
                    </p>
                  )}
                </div>

                {isLoadingLeaderboard ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e2001a]"></div>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {leaderboard.length === 0 ? (
                      <p className="text-center text-slate-500 font-medium py-8">No times recorded yet. Be the first!</p>
                    ) : (
                      leaderboard.map((entry, idx) => (
                        <div 
                          key={entry.id || idx} 
                          className={`flex items-center justify-between p-4 rounded-xl border ${idx === 0 ? 'bg-amber-50/80 border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : idx === 1 ? 'bg-slate-100/80 border-slate-300' : idx === 2 ? 'bg-orange-50/80 border-orange-200' : 'bg-white/60 border-slate-200'} backdrop-blur-sm transition-all`}
                        >
                          <div className="flex items-center gap-4">
                            <span className={`text-lg font-black w-6 text-center ${idx === 0 ? 'text-amber-500' : idx === 1 ? 'text-slate-500' : idx === 2 ? 'text-orange-400' : 'text-slate-400'}`}>
                              #{idx + 1}
                            </span>
                            <div>
                              <p className="font-bold text-slate-900">{entry.name}</p>
                              <p className="text-xs text-slate-600 font-medium">{entry.cityState}</p>
                            </div>
                          </div>
                          <span className="font-mono font-black text-[#e2001a] text-lg">{formatTime(entry.timeTaken)}</span>
                        </div>
                      ))
                    )}
                  </div>
                )}
                
                <button
                  onClick={() => setViewState('register')}
                  className="w-full bg-slate-200/50 backdrop-blur-sm hover:bg-slate-200 text-slate-800 font-bold py-4 rounded-xl mt-8 transition-colors border border-slate-300"
                >
                  BACK TO START
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
