import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, ChevronRight, Sparkles, UploadCloud } from 'lucide-react';
import SplineScene from './SplineScene';
import FinalistCard from './FinalistCard';

const Hero = ({ finalists, onRevealStart, onUploadData }) => {
  const [showUpload, setShowUpload] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (json.finalists && Array.isArray(json.finalists)) {
          onUploadData(json);
          setShowUpload(false);
        } else {
          alert('Invalid JSON format. Ensure "finalists" array exists.');
        }
      } catch (error) {
        alert('Error parsing JSON');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden bg-luxury-black selection:bg-luxury-gold selection:text-black">
      
      {/* Background Layers */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-luxury-accent/20 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-luxury-neon/10 blur-[150px] rounded-full pointer-events-none"></div>
      
      {/* 3D Scene */}
      <SplineScene />

      <div className="relative z-10 container mx-auto max-w-7xl pt-10 md:pt-0 flex flex-col items-center">
        
        {/* Typographic Hero */}
        <div className="text-center mb-16 relative w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
             <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-luxury-gold"></div>
             <span className="text-luxury-gold font-mono uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold">
               The Grand Finale
             </span>
             <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-luxury-gold"></div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-7xl md:text-9xl font-display font-extrabold leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 drop-shadow-2xl"
          >
            AURORA<br />REVEAL
          </motion.h1>
        </div>

        {/* Cards Section */}
        <div className="w-full mb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000 px-4 md:px-0">
            {finalists.map((finalist, index) => (
                <FinalistCard key={finalist.id} finalist={finalist} index={index} />
            ))}
            </div>
        </div>

        {/* Magnetic CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="pb-20"
        >
          <button
            onClick={onRevealStart}
            className="group relative px-12 py-6 bg-luxury-accent/10 backdrop-blur-md border border-luxury-accent/30 rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] hover:border-luxury-accent"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-luxury-accent to-luxury-neon opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <span className="relative z-10 flex items-center gap-3 font-display font-bold text-xl tracking-widest uppercase text-white">
              <Sparkles className="w-5 h-5 text-luxury-gold animate-pulse" />
              Reveal Winners
              <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>

        {/* Admin Controls */}
        <div className="fixed bottom-6 right-6 z-50">
          <button 
             onClick={() => setShowUpload(!showUpload)} 
             className="p-3 bg-black/60 backdrop-blur-lg border border-white/10 rounded-full hover:border-luxury-gold/50 transition-all text-slate-400 hover:text-white hover:rotate-90 duration-500 shadow-lg"
          >
            <Settings className="w-5 h-5" />
          </button>
          
          {showUpload && (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="absolute bottom-16 right-0 w-80 glass-panel p-6 rounded-xl shadow-2xl"
            >
               <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                   <h4 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-white">
                       <UploadCloud className="w-4 h-4 text-luxury-gold" /> Admin Console
                   </h4>
               </div>
               
               <div className="space-y-4">
                   <div>
                       <label className="text-[10px] text-slate-400 mb-2 block uppercase tracking-wider">Load Data (JSON)</label>
                       <input 
                         type="file" 
                         accept=".json" 
                         onChange={handleFileChange}
                         className="w-full text-xs text-slate-300 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:bg-luxury-accent file:text-white hover:file:bg-luxury-neon transition cursor-pointer bg-white/5 rounded-lg p-2"
                       />
                   </div>
                   <button 
                     onClick={() => { localStorage.removeItem('hasVisited'); window.location.reload(); }}
                     className="w-full py-2 text-[10px] uppercase tracking-widest border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded transition"
                   >
                     Reset Intro Animation
                   </button>
               </div>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Hero;