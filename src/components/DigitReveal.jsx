import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DigitSlot = ({ value, isRevealed }) => {
  return (
    <div className="relative w-14 h-20 md:w-24 md:h-36 bg-[#050505] border border-white/10 rounded-lg flex items-center justify-center overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,1)] group">
      
      {/* Ambient Glow */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isRevealed ? 'bg-luxury-accent/20 opacity-100' : 'opacity-0'}`} />
      
      {/* Glass Reflection */}
      <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-lg" />

      <AnimatePresence mode='wait'>
        {isRevealed ? (
          <motion.span
            key="value"
            initial={{ y: 50, opacity: 0, filter: 'blur(10px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative z-10 text-4xl md:text-8xl font-display font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]"
          >
            {value}
          </motion.span>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-2 items-center justify-center h-full w-full opacity-30"
          >
             {/* Tech Scanning Effect */}
             <motion.div 
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-[2px] bg-luxury-neon shadow-[0_0_10px_#d946ef]" 
             />
             <span className="font-mono text-luxury-accent text-2xl">?</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mesh Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 pointer-events-none" />
    </div>
  );
};

const DigitReveal = ({ code, onComplete, isRevealing }) => {
  const digits = code.split('');
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    if (!isRevealing) {
      setRevealedCount(0);
      return;
    }

    let currentIndex = 0;
    const revealInterval = setInterval(() => {
      if (currentIndex < digits.length) {
        setRevealedCount(prev => prev + 1);
        currentIndex++;
      } else {
        clearInterval(revealInterval);
        setTimeout(() => {
          onComplete();
        }, 800); // Dramatic pause after last digit
      }
    }, 350); // Specific timing per spec

    return () => clearInterval(revealInterval);
  }, [isRevealing, code, onComplete, digits.length]);

  return (
    <div className="flex gap-2 md:gap-4 justify-center my-8 md:my-12 perspective-1000" aria-live="polite">
      {digits.map((digit, idx) => (
        <DigitSlot 
          key={idx} 
          value={digit} 
          isRevealed={idx < revealedCount} 
        />
      ))}
    </div>
  );
};

export default DigitReveal;