import React from 'react';
import { motion } from 'framer-motion';

const FinalistCard = ({ finalist, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + (index * 0.2), duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
      whileHover={{ y: -15 }}
      className="group relative w-full mx-auto"
    >
      {/* Card Container */}
      <div className="relative h-[420px] w-full bg-luxury-dark border border-white/5 overflow-hidden transition-all duration-500 group-hover:border-luxury-accent/40">
        
        {/* Moving Gradient Border Effect on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-luxury-accent/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out"></div>
        </div>

        {/* Image Area */}
        <div className="h-3/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-transparent to-transparent z-10" />
            <img 
               src={finalist.avatar} 
               alt={finalist.name}
               className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
               onError={(e) => {
                 e.target.src = `https://ui-avatars.com/api/?name=${finalist.name}&background=0a0a0f&color=fff`;
               }}
            />
            {/* Badge */}
            <div className="absolute top-4 right-4 z-20">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-white">
                    Finalist
                </div>
            </div>
        </div>

        {/* Content Area */}
        <div className="h-2/5 p-6 flex flex-col justify-between relative z-20">
            <div>
                <h3 className="text-2xl font-display font-bold text-white mb-1 group-hover:text-luxury-neon transition-colors">
                    {finalist.name}
                </h3>
                <p className="text-slate-500 text-sm font-mono">Design ID: #{finalist.id}00{index}</p>
            </div>
            
            <div className="flex items-end justify-between">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-slate-600 mb-1">Status</span>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                        <span className="text-sm font-bold text-slate-300">Encrypted</span>
                    </div>
                </div>
                <div className="opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-luxury-gold">
                        <path d="M7 17L17 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 7H17V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FinalistCard;