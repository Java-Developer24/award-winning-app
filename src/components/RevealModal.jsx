import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, ArrowRight, Star, Download, Sparkles } from 'lucide-react';
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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Dev shortcut
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
      
      {/* Immersive Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-luxury-black/95 backdrop-blur-xl"
      >
         <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-50 mix-blend-overlay"></div>
         <div className="absolute inset-0 bg-gradient-radial from-luxury-accent/20 via-transparent to-transparent"></div>
      </motion.div>

      {showConfetti && <ConfettiCelebration />}

      <div className="relative z-10 w-full h-full md:h-auto md:max-w-4xl p-4 flex items-center justify-center">
        
        {/* --- FINAL SUMMARY --- */}
        {step >= finalists.length ? (
          <motion.div
            key="summary"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="w-full glass-premium rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          >
             {/* Decorative background glow */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-luxury-gold/10 blur-[100px] rounded-full pointer-events-none"></div>

             <Trophy className="w-24 h-24 text-luxury-gold mx-auto mb-8 animate-float drop-shadow-[0_0_25px_rgba(212,175,55,0.5)]" />
             
             <h2 className="text-5xl md:text-7xl font-display font-bold mb-4 text-white tracking-tighter">
               CEREMONY <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold via-yellow-200 to-luxury-gold">COMPLETE</span>
             </h2>
             
             <div className="grid gap-6 md:grid-cols-3 mt-12 mb-12">
                {finalists.map((f, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={f.id} 
                    className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-luxury-gold/30 transition-colors"
                  >
                    <img src={f.avatar} alt={f.name} className="w-16 h-16 rounded-full mx-auto mb-4 object-cover ring-2 ring-white/10" />
                    <div className="font-display font-bold text-lg">{f.name}</div>
                    <div className="text-xs font-mono text-luxury-gold mb-2">{f.prize}</div>
                    <div className="inline-block px-3 py-1 bg-black/40 rounded text-xs font-mono tracking-widest text-slate-400">{f.code}</div>
                  </motion.div>
                ))}
             </div>

             <div className="flex gap-4 justify-center">
               <button 
                 onClick={onClose}
                 className="px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-slate-200 transition shadow-[0_0_20px_rgba(255,255,255,0.3)]"
               >
                 Return to Lobby
               </button>
             </div>
          </motion.div>
        ) : (
          /* --- REVEAL STEP --- */
          <AnimatePresence mode='wait'>
            <motion.div
              key={`reveal-${step}`}
              className="w-full max-w-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
                {/* Header / Progress */}
                <div className="flex justify-between items-center mb-8 text-slate-400 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest">
                        <span className="w-2 h-2 bg-luxury-gold rounded-full animate-pulse"></span>
                        System Status: Live
                    </div>
                    <div className="text-xs font-mono uppercase tracking-widest">
                        Reveal {step + 1} / {finalists.length}
                    </div>
                    {viewState !== 'revealing' && (
                        <button onClick={onClose} className="hover:text-white transition"><X className="w-6 h-6" /></button>
                    )}
                </div>

                {/* Main Content */}
                <div className="text-center">
                    
                    {/* Avatar Container */}
                    <div className="relative mb-8 inline-block">
                        <motion.div 
                           animate={viewState === 'celebrated' ? { 
                               rotate: 360,
                               boxShadow: ["0 0 0px rgba(212,175,55,0)", "0 0 50px rgba(212,175,55,0.5)"] 
                           } : {}}
                           transition={{ duration: 1 }}
                           className="relative w-40 h-40 md:w-56 md:h-56 rounded-full p-1 bg-gradient-to-b from-white/20 to-transparent"
                        >
                            <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
                                <img 
                                    src={currentWinner.avatar} 
                                    alt={currentWinner.name}
                                    className={`w-full h-full object-cover transition-all duration-1000 ${viewState === 'intro' ? 'grayscale brightness-50 blur-sm' : 'grayscale-0 blur-0'}`}
                                />
                                {viewState === 'intro' && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Sparkles className="text-white/20 w-12 h-12" />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                        {viewState === 'celebrated' && (
                            <motion.div 
                                initial={{ scale: 0 }} 
                                animate={{ scale: 1 }}
                                className="absolute -bottom-4 -right-4 bg-luxury-gold text-black p-3 rounded-full shadow-lg border-4 border-black"
                            >
                                <Trophy className="w-6 h-6" />
                            </motion.div>
                        )}
                    </div>

                    {/* Text Info */}
                    <motion.h2 
                        layout
                        className="text-4xl md:text-6xl font-display font-bold mb-2 tracking-tight"
                    >
                        {currentWinner.name}
                    </motion.h2>
                    
                    <motion.div 
                        className="inline-block px-4 py-1 rounded-full border border-luxury-accent/30 bg-luxury-accent/10 text-luxury-neon font-mono text-sm uppercase tracking-widest mb-10"
                    >
                        {currentWinner.prize}
                    </motion.div>

                    {/* Digit Reveal Section */}
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-8 mb-10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        <DigitReveal 
                            code={currentWinner.code}
                            isRevealing={viewState === 'revealing'}
                            onComplete={handleRevealComplete}
                        />
                        <div className="text-center mt-4 text-xs font-mono text-slate-500 uppercase tracking-[0.5em]">Authentication Code</div>
                    </div>

                    {/* Controls */}
                    <div className="h-20 flex items-center justify-center">
                        {viewState === 'intro' && (
                            <button 
                                onClick={startReveal}
                                className="relative group px-10 py-4 bg-white text-black font-bold text-lg uppercase tracking-widest hover:bg-luxury-gold transition-colors duration-300"
                            >
                                Reveal Winner
                                <div className="absolute top-0 right-0 w-2 h-2 bg-black transform translate-x-1/2 -translate-y-1/2"></div>
                                <div className="absolute bottom-0 left-0 w-2 h-2 bg-black transform -translate-x-1/2 translate-y-1/2"></div>
                            </button>
                        )}

                        {viewState === 'revealing' && (
                             <div className="font-mono text-luxury-gold text-sm animate-pulse">
                                 [ DECRYPTING SECURE DATA ]
                             </div>
                        )}

                        {viewState === 'celebrated' && (
                            <motion.button 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={handleNext}
                                className="flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-luxury-accent to-purple-600 rounded-lg font-bold text-lg uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_0_30px_rgba(109,40,217,0.4)]"
                            >
                                {step < finalists.length - 1 ? 'Next Finalist' : 'Finalize Event'}
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