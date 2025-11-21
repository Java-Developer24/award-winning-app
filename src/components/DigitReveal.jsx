import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DigitSlot = ({ value, isRevealed }) => {
  return (
    <div className="relative w-12 h-16 md:w-16 md:h-24 bg-slate-900/80 border border-purple-500/30 rounded-lg flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(168,85,247,0.1)]">
      <AnimatePresence mode='wait'>
        {isRevealed ? (
          <motion.span
            key="value"
            initial={{ y: 50, opacity: 0, scale: 1.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="text-4xl md:text-6xl font-bold font-mono text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          >
            {value}
          </motion.span>
        ) : (
          <motion.span
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="text-purple-500/50 animate-pulse text-4xl"
          >
            _
          </motion.span>
        )}
      </AnimatePresence>
      {/* Scanline effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-30 pointer-events-none" />
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
        
        // Play soft click sound if desired here
        // const audio = new Audio('/assets/click.mp3');
        // audio.play().catch(e => {});

        currentIndex++;
      } else {
        clearInterval(revealInterval);
        // Wait 800ms after last digit before triggering completion
        setTimeout(() => {
          onComplete();
        }, 800);
      }
    }, 350); // 350ms per digit

    return () => clearInterval(revealInterval);
  }, [isRevealing, code, onComplete, digits.length]);

  return (
    <div className="flex gap-2 md:gap-4 justify-center my-8" aria-live="polite" aria-label={`Revealing code: ${code}`}>
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