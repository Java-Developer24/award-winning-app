import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ onComplete }) => {
  // Duration of the loader before fading out
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
    >
      <div className="relative w-32 h-32 mb-8">
        {/* Abstract SVG Morphing Shape */}
        <motion.svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <linearGradient id="loaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <motion.path
            d="M44.1,-76.4C58.9,-69.7,73.8,-62.9,84.6,-52.4C95.4,-41.9,102.1,-27.6,100.8,-13.7C99.5,0.2,90.2,13.8,81.1,26.4C72,39,63.1,50.7,52.2,60.8C41.3,70.9,28.3,79.4,14.4,81.9C0.5,84.3,-14.3,80.7,-27.3,74.7C-40.3,68.7,-51.5,60.3,-61.9,49.9C-72.3,39.5,-81.9,27.1,-85.4,13.3C-88.9,-0.5,-86.3,-15.7,-78.7,-28.9C-71.1,-42.1,-58.5,-53.3,-45.5,-60.9C-32.5,-68.5,-19.1,-72.5,-4.9,-74.1C9.3,-75.7,18.6,-74.9,29.3,-83.1"
            fill="url(#loaderGrad)"
            initial={{ scale: 0.8 }}
            animate={{ 
              scale: [0.8, 1.1, 0.8],
              d: [
                "M44.1,-76.4C58.9,-69.7,73.8,-62.9,84.6,-52.4C95.4,-41.9,102.1,-27.6,100.8,-13.7C99.5,0.2,90.2,13.8,81.1,26.4C72,39,63.1,50.7,52.2,60.8C41.3,70.9,28.3,79.4,14.4,81.9C0.5,84.3,-14.3,80.7,-27.3,74.7C-40.3,68.7,-51.5,60.3,-61.9,49.9C-72.3,39.5,-81.9,27.1,-85.4,13.3C-88.9,-0.5,-86.3,-15.7,-78.7,-28.9C-71.1,-42.1,-58.5,-53.3,-45.5,-60.9C-32.5,-68.5,-19.1,-72.5,-4.9,-74.1C9.3,-75.7,18.6,-74.9,29.3,-83.1",
                "M51.6,-74.2C66.4,-67.6,77.9,-53.5,83.4,-38.3C88.9,-23.1,88.4,-6.8,84.5,8.2C80.6,23.2,73.3,36.9,63.4,48.6C53.5,60.3,41,70,27.1,74.8C13.2,79.6,-2.1,79.5,-16.4,75.2C-30.7,70.9,-44,62.4,-54.9,51.6C-65.8,40.8,-74.3,27.7,-77.1,13.5C-79.9,-0.7,-77,-16,-69.2,-28.8C-61.4,-41.6,-48.7,-51.9,-35.5,-59.4C-22.3,-66.9,-8.6,-71.6,5.9,-73.4C20.4,-75.2,40.8,-74.1,51.6,-74.2Z",
                "M44.1,-76.4C58.9,-69.7,73.8,-62.9,84.6,-52.4C95.4,-41.9,102.1,-27.6,100.8,-13.7C99.5,0.2,90.2,13.8,81.1,26.4C72,39,63.1,50.7,52.2,60.8C41.3,70.9,28.3,79.4,14.4,81.9C0.5,84.3,-14.3,80.7,-27.3,74.7C-40.3,68.7,-51.5,60.3,-61.9,49.9C-72.3,39.5,-81.9,27.1,-85.4,13.3C-88.9,-0.5,-86.3,-15.7,-78.7,-28.9C-71.1,-42.1,-58.5,-53.3,-45.5,-60.9C-32.5,-68.5,-19.1,-72.5,-4.9,-74.1C9.3,-75.7,18.6,-74.9,29.3,-83.1"
              ] 
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.svg>
      </div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-3xl md:text-4xl font-display font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-pulse-slow"
      >
        AWARD WINNING
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1 }}
        className="mt-2 text-sm tracking-widest uppercase"
      >
        Best Design
      </motion.p>
    </motion.div>
  );
};

export default Loader;