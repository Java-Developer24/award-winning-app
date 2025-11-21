import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DigitSlot = ({ value, isRevealed }) => {
  return (
    <div className="relative w-16 h-24 md:w-20 md:h-32 bg-[#050505] border border-white/10 rounded flex items-center justify-center overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] group">
      
      {/* Inner Glow */}
      <div className="absolute inset-0 bg-luxury-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Top/Bottom reflections */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      <AnimatePresence mode='wait'>
        {isRevealed ? (
          <motion.span
            key="value"
            initial={{ y: '100%', filter: 'blur(10px)', opacity: 0 }}
            animate={{ y: 0, filter: 'blur(0px)', opacity: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="text-5xl md:text-7xl font-display font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
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
             {/* Rolling placeholder effect */}
             <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-1 h-1 bg-luxury-neon rounded-full" 
             />
             <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 0.5, delay: 0.1, repeat: Infinity }}
                className="w-1 h-1 bg-luxury-neon rounded-full" 
             />
             <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 0.5, delay: 0.2, repeat: Infinity }}
                className="w-1 h-1 bg-luxury-neon rounded-full" 
             />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Scanline */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />
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
        }, 1200); // Slower, more dramatic pause
      }
    }, 500); // Slower cadence

    return () => clearInterval(revealInterval);
  }, [isRevealing, code, onComplete, digits.length]);

  return (
    <div className="flex gap-3 md:gap-6 justify-center my-12 perspective-1000" aria-live="polite">
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