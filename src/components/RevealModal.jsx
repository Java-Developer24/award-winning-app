import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import DigitReveal from './DigitReveal';
import ConfettiCelebration from './ConfettiCelebration';

const RevealModal = ({ isOpen, onClose, finalists }) => {
  const [step, setStep] = useState(0);
  const [viewState, setViewState] = useState('intro'); // intro, revealing, celebrated
  const [showConfetti, setShowConfetti] = useState(false);
  
  const currentWinner = finalists[step];
  const isFinished = step >= finalists.length;

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setViewState('intro');
      setShowConfetti(false);
      // Lock scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  // Dev shortcut (Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
         handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, viewState]);

  const startReveal = () => setViewState('revealing');

  const handleRevealComplete = () => {
    setViewState('celebrated');
    setShowConfetti(true);
  };

  const handleNext = () => {
    if (step < finalists.length - 1) {
      setStep(s => s + 1);
      setViewState('intro');
      setShowConfetti(false);
    } else {
      setStep(s => s + 1);
      setShowConfetti(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" role="dialog" aria-modal="true">
      
      {/* Immersive Backdrop with Blur */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-luxury-black/95 backdrop-blur-2xl"
      >
         <div className="absolute inset-0 bg-[url('/assets/bg-aurora.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
      </motion.div>

      {showConfetti && <ConfettiCelebration />}

      <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
        
        {/* --- FINAL SUMMARY --- */}
        {step >= finalists.length ? (
          <motion.div
            key="summary"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-5xl glass-panel rounded-3xl p-8 md:p-16 text-center relative overflow-hidden border-t border-luxury-gold/30"
          >
             {/* Glow effects */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-luxury-gold/10 blur-[100px] pointer-events-none"></div>

             <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
             >
                 <img src="/assets/trophy.png" alt="Trophy" className="w-48 h-48 object-contain mx-auto mb-6 drop-shadow-[0_0_30px_rgba(255,215,0,0.4)] animate-float" />
             </motion.div>
             
             <h2 className="text-5xl md:text-7xl font-display font-bold mb-4 text-white tracking-tight">
               CONGRATULATIONS
             </h2>
             <p className="text-slate-400 font-mono tracking-widest uppercase mb-12">All Winners Verified</p>
             
             <div className="grid gap-4 md:gap-6 md:grid-cols-3 mb-12">
                {finalists.map((f, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    key={f.id} 
                    className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-luxury-gold/30 transition-all hover:-translate-y-1"
                  >
                    <div className="relative w-20 h-20 mx-auto mb-4">
                        <img src={f.avatar} alt={f.name} className="w-full h-full rounded-full object-cover ring-2 ring-luxury-gold/50" />
                        <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 border border-black">
                            <CheckCircle2 className="w-3 h-3 text-black" />
                        </div>
                    </div>
                    <div className="font-display font-bold text-xl mb-1">{f.name}</div>
                    <div className="text-xs font-mono text-luxury-gold mb-3">{f.prize}</div>
                    <div className="inline-block px-4 py-1 bg-black/40 rounded text-sm font-mono tracking-widest text-green-400 border border-green-500/20">
                        {f.code}
                    </div>
                  </motion.div>
                ))}
             </div>

             <div className="flex flex-col md:flex-row gap-4 justify-center">
               <button 
                 onClick={onClose}
                 className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-slate-200 transition shadow-[0_0_20px_rgba(255,255,255,0.3)] uppercase tracking-wider text-sm"
               >
                 Return to Lobby
               </button>
               <button 
                 onClick={() => window.print()}
                 className="px-8 py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/10 transition uppercase tracking-wider text-sm"
               >
                 Download Certificate
               </button>
             </div>
          </motion.div>
        ) : (
          /* --- REVEAL STEP --- */
          <AnimatePresence mode='wait'>
            <motion.div
              key={`reveal-${step}`}
              className="w-full max-w-4xl relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
                {/* Header Status Bar */}
                <div className="flex justify-between items-center mb-12">
                    <div className="flex items-center gap-3">
                        <div className="px-3 py-1 rounded-full bg-luxury-accent/20 border border-luxury-accent/30 text-luxury-neon text-[10px] font-mono uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-luxury-neon rounded-full animate-pulse"></span>
                            Live Transmission
                        </div>
                    </div>
                    <div className="text-xs font-mono uppercase tracking-widest text-slate-500">
                        Winner {step + 1} of {finalists.length}
                    </div>
                </div>

                <div className="text-center">
                    
                    {/* Avatar & Halo */}
                    <div className="relative mb-10 inline-block">
                        <motion.div 
                           animate={viewState === 'celebrated' ? { 
                               boxShadow: ["0 0 0px rgba(217,70,239,0)", "0 0 60px rgba(217,70,239,0.6)"],
                           } : {}}
                           className="relative w-48 h-48 md:w-64 md:h-64 rounded-full p-1.5 bg-gradient-to-b from-luxury-gold/50 to-transparent"
                        >
                            <div className="w-full h-full rounded-full overflow-hidden bg-black relative z-10">
                                <img 
                                    src={currentWinner.avatar} 
                                    alt={currentWinner.name}
                                    className={`w-full h-full object-cover transition-all duration-1000 ${viewState === 'intro' ? 'grayscale brightness-50 scale-110' : 'grayscale-0 brightness-100 scale-100'}`}
                                />
                                {/* Mystery Overlay */}
                                {viewState === 'intro' && (
                                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                                        <Sparkles className="text-white/30 w-16 h-16 animate-pulse" />
                                    </div>
                                )}
                            </div>
                            
                            {/* Rotating Ring */}
                            {viewState === 'intro' && (
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    className="absolute -inset-2 rounded-full border border-dashed border-white/20"
                                />
                            )}
                        </motion.div>
                        
                        {viewState === 'celebrated' && (
                            <motion.div 
                                initial={{ scale: 0, rotate: -180 }} 
                                animate={{ scale: 1, rotate: 0 }}
                                className="absolute -bottom-2 -right-2 bg-luxury-gold text-black p-4 rounded-full shadow-[0_0_30px_rgba(255,215,0,0.6)] z-20"
                            >
                                <Trophy className="w-8 h-8" />
                            </motion.div>
                        )}
                    </div>

                    {/* Name & Prize */}
                    <motion.h2 className="text-5xl md:text-7xl font-display font-bold mb-4 tracking-tight text-white">
                        {viewState === 'intro' ? '???' : currentWinner.name}
                    </motion.h2>
                    
                    <motion.div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-luxury-gold font-mono text-sm uppercase tracking-widest mb-12">
                        <span className="w-2 h-2 rounded-full bg-luxury-gold"></span>
                        {currentWinner.prize}
                    </motion.div>

                    {/* The Code Slot */}
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-10 mb-12 max-w-2xl mx-auto relative">
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-luxury-neon/50 to-transparent"></div>
                        <DigitReveal 
                            code={currentWinner.code}
                            isRevealing={viewState === 'revealing'}
                            onComplete={handleRevealComplete}
                        />
                        <div className="text-center mt-6 text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em]">
                            Secure Authentication Code
                        </div>
                    </div>

                    {/* Action Area */}
                    <div className="h-24 flex items-center justify-center">
                        {viewState === 'intro' && (
                            <button 
                                onClick={startReveal}
                                className="group relative px-10 py-4 bg-white text-black font-bold text-lg uppercase tracking-widest hover:bg-luxury-gold transition-colors duration-300 overflow-hidden"
                            >
                                <span className="relative z-10">Reveal Identity</span>
                                <div className="absolute inset-0 bg-luxury-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </button>
                        )}

                        {viewState === 'revealing' && (
                             <div className="font-mono text-luxury-neon text-sm flex items-center gap-3">
                                 <span className="w-2 h-2 bg-luxury-neon animate-ping rounded-full"></span>
                                 DECRYPTING SERVER DATA...
                             </div>
                        )}

                        {viewState === 'celebrated' && (
                            <motion.button 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={handleNext}
                                className="flex items-center gap-4 px-10 py-4 bg-gradient-to-r from-luxury-accent to-luxury-neon rounded-lg font-bold text-lg uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_0_40px_rgba(124,58,237,0.5)] text-white"
                            >
                                {step < finalists.length - 1 ? 'Next Category' : 'Finalize Ceremony'}
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        )}
                    </div>

                </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default RevealModal;