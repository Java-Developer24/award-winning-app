import React from 'react';
import { motion } from 'framer-motion';

const FinalistCard = ({ finalist, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + (index * 0.2), duration: 0.6, ease: "backOut" }}
      whileHover={{ 
        y: -10, 
        rotateX: 5, 
        rotateY: 5,
        boxShadow: "0 20px 40px -10px rgba(168, 85, 247, 0.3)"
      }}
      className="relative group w-full max-w-sm mx-auto"
    >
      <div className="glass-panel rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 border-white/10 group-hover:border-purple-500/30">
        <div className="relative w-32 h-32 mb-4 rounded-full p-1 bg-gradient-to-br from-purple-500 to-pink-500">
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-black">
             <img 
               src={finalist.avatar} 
               alt={finalist.name}
               className="w-full h-full object-cover"
               onError={(e) => {
                 e.target.src = `https://ui-avatars.com/api/?name=${finalist.name}&background=random`;
               }}
             />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur text-xs px-3 py-1 rounded-full border border-white/20 text-purple-300 font-bold uppercase tracking-wider">
            Finalist
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-1">{finalist.name}</h3>
        <p className="text-slate-400 text-sm mb-4">Design Excellence Nominee</p>
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4" />
        
        <div className="text-xs text-slate-500 uppercase tracking-widest">Status</div>
        <div className="font-mono text-purple-400 text-lg">Locked</div>
      </div>
    </motion.div>
  );
};

export default FinalistCard;