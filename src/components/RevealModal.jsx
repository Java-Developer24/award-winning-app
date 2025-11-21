import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, ArrowRight, CheckCircle, Download } from 'lucide-react';
import DigitReveal from './DigitReveal';
import ConfettiCelebration from './ConfettiCelebration';

const RevealModal = ({ isOpen, onClose, finalists }) => {
  const [step, setStep] = useState(0); // 0, 1, 2 for the three winners
  const [viewState, setViewState] = useState('intro'); // intro, revealing, celebrated
  const [showConfetti, setShowConfetti] = useState(false);
  
  const currentWinner = finalists[step];
  const isFinished = step >= finalists.length;

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setViewState('intro');
      setShowConfetti(false);
      document.body.style.overflow = 'hidden'; // Lock scroll
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Dev backdoor to skip
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
         handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, viewState]);

  const startReveal = () => {
    setViewState('revealing');
  };

  const handleRevealComplete = () => {
    setViewState('celebrated');
    setShowConfetti(true);
    // Optional: Play win sound
    try {
      // Fallback sound if no asset provided
    } catch(e) {}
  };

  const handleNext = () => {
    if (step < finalists.length - 1) {
      setStep(s => s + 1);
      setViewState('intro');
      setShowConfetti(false);
    } else {
      // All done
      setStep(s => s + 1); // Move to finish screen index
      setShowConfetti(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />

      {showConfetti && <ConfettiCelebration />}

      <div className="relative z-10 w-full max-w-2xl">
        
        {/* FINAL SUMMARY SCREEN */}
        {step >= finalists.length ? (
          <motion.div
            key="summary"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-panel p-8 md:p-12 rounded-3xl text-center border border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.2)]"
          >
             <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6 animate-bounce" />
             <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200">
               CONGRATULATIONS!
             </h2>
             <p className="text-lg text-slate-300 mb-8">All winners have been revealed.</p>
             
             <div className="grid gap-4 md:grid-cols-3 mb-8">
                {finalists.map((f, i) => (
                  <div key={f.id} className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <img src={f.avatar} alt={f.name} className="w-12 h-12 rounded-full mx-auto mb-2 object-cover border border-white/20" />
                    <div className="font-bold text-sm">{f.name}</div>
                    <div className="text-xs text-purple-300">{f.prize}</div>
                    <div className="font-mono text-xs mt-1 opacity-70">{f.code}</div>
                  </div>
                ))}
             </div>

             <div className="flex flex-col md:flex-row gap-4 justify-center">
               <button 
                 onClick={() => { setStep(0); setViewState('intro'); setShowConfetti(false); }}
                 className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition font-semibold"
               >
                 Restart Reveal
               </button>
               <button 
                 onClick={onClose}
                 className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition font-semibold shadow-lg shadow-purple-500/30"
               >
                 Return to Home
               </button>
             </div>
          </motion.div>
        ) : (
          /* INDIVIDUAL REVEAL CARD */
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentWinner.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="glass-panel rounded-3xl overflow-hidden shadow-2xl border-t border-white/10"
            >
              {/* Header */}
              <div className="bg-white/5 p-4 flex justify-between items-center border-b border-white/5">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
                  <Trophy className="w-4 h-4 text-purple-400" />
                  Winner Reveal {step + 1} of {finalists.length}
                </div>
                {/* Close button only visible in intro or complete state to prevent skipping reveal */}
                {viewState !== 'revealing' && (
                  <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition">
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                )}
              </div>

              <div className="p-8 md:p-12 text-center">
                
                {/* Avatar */}
                <motion.div 
                  animate={viewState === 'celebrated' ? { scale: 1.1, rotate: [0, -5, 5, 0] } : {}}
                  className="relative w-32 h-32 mx-auto mb-6"
                >
                  <img 
                    src={currentWinner.avatar} 
                    alt={currentWinner.name}
                    className="w-full h-full rounded-full object-cover border-4 border-white/10 shadow-xl" 
                  />
                  {viewState === 'celebrated' && (
                    <motion.div 
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="absolute -bottom-2 -right-2 bg-green-500 text-black p-2 rounded-full border-2 border-white"
                    >
                      <CheckCircle className="w-6 h-6" />
                    </motion.div>
                  )}
                </motion.div>

                <h2 className="text-3xl font-bold mb-2">{currentWinner.name}</h2>
                <p className="text-purple-300 font-medium mb-8">{currentWinner.prize}</p>

                {/* The Reveal Component */}
                <div className="bg-black/40 rounded-2xl p-6 mb-8 border border-white/5">
                  <div className="text-sm text-slate-500 mb-2 uppercase tracking-widest">Winning Code</div>
                  <DigitReveal 
                    code={currentWinner.code} 
                    isRevealing={viewState === 'revealing'}
                    onComplete={handleRevealComplete}
                  />
                </div>

                {/* Actions */}
                <div className="h-16 flex items-center justify-center">
                  {viewState === 'intro' && (
                    <button 
                      onClick={startReveal}
                      className="w-full md:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold tracking-wide hover:scale-105 transition-transform shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    >
                      Reveal Winner
                    </button>
                  )}
                  
                  {viewState === 'revealing' && (
                     <div className="flex items-center gap-2 text-purple-300 animate-pulse">
                       <span className="w-2 h-2 bg-purple-400 rounded-full" />
                       Verifying Code...
                     </div>
                  )}

                  {viewState === 'celebrated' && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={handleNext}
                      className="group flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-slate-200 transition"
                    >
                      {step < finalists.length - 1 ? 'Next Reveal' : 'Finish'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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