import React from 'react';
import { motion } from 'framer-motion';

const FinalistCard = ({ finalist, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + (index * 0.2), duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
      whileHover={{ y: -15, rotateX: 5, rotateY: 5 }}
      className="group relative w-full mx-auto cursor-default"
    >
      {/* Card Frame */}
      <div className="relative h-[450px] w-full glass-card rounded-2xl overflow-hidden group-hover:shadow-[0_0_50px_rgba(124,58,237,0.2)] transition-shadow duration-500">
        
        {/* Animated Gradient Border */}
        <div className="absolute inset-0 p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent group-hover:from-luxury-accent group-hover:to-luxury-neon transition-colors duration-500">
            <div className="absolute inset-[1px] bg-luxury-dark rounded-2xl z-0"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
            
            {/* Image Area */}
            <div className="h-3/5 relative overflow-hidden rounded-t-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-luxury-accent/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                
                <img 
                   src={finalist.avatar} 
                   alt={finalist.name}
                   className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
                   onError={(e) => {
                     e.target.src = `https://ui-avatars.com/api/?name=${finalist.name}&background=0a0a0f&color=fff`;
                   }}
                />
                
                {/* Badge */}
                <div className="absolute top-4 left-4 z-20">
                    <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded text-[10px] font-mono uppercase tracking-widest text-white shadow-lg">
                        Finalist {index + 1}
                    </div>
                </div>
            </div>

            {/* Text Area */}
            <div className="h-2/5 p-6 flex flex-col justify-between bg-gradient-to-b from-transparent to-black/40">
                <div>
                    <h3 className="text-3xl font-display font-bold text-white mb-1 group-hover:text-luxury-neon transition-colors">
                        {finalist.name}
                    </h3>
                    <div className="w-12 h-1 bg-luxury-gold/50 rounded-full mb-3 group-hover:w-24 transition-all duration-500"></div>
                </div>
                
                <div className="flex items-end justify-between border-t border-white/5 pt-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Prize Category</span>
                        <span className="text-sm font-mono text-slate-300">{finalist.prize}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <span className="text-xs font-bold text-slate-400 font-mono">LOCKED</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FinalistCard;