import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, ChevronRight, Sparkles } from 'lucide-react';
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
          alert('Data updated successfully!');
          setShowUpload(false);
        } else {
          alert('Invalid JSON format.');
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
      <div className="absolute inset-0 bg-grid-slate opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-radial from-luxury-accent/20 via-transparent to-transparent opacity-40 pointer-events-none"></div>
      
      {/* 3D Scene - Pushed back */}
      <SplineScene />

      <div className="relative z-10 container mx-auto max-w-7xl pt-10 md:pt-0">
        
        {/* Typographic Hero */}
        <div className="text-center mb-20 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
             <div className="h-[1px] w-12 bg-luxury-gold/50"></div>
             <span className="text-luxury-gold font-mono uppercase tracking-[0.3em] text-xs md:text-sm">Excellence In Innovation</span>
             <div className="h-[1px] w-12 bg-luxury-gold/50"></div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.9] tracking-tighter"
          >
            <span className="block text-white drop-shadow-2xl">AWARD</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-400 to-slate-800">WINNING</span>
          </motion.h1>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="w-24 h-1 bg-luxury-accent mx-auto mt-8 mb-8"
          />
        </div>

        {/* Cards Section */}
        <div className="mb-24">
            <div className="grid md:grid-cols-3 gap-8 perspective-1000">
            {finalists.map((finalist, index) => (
                <FinalistCard key={finalist.id} finalist={finalist} index={index} />
            ))}
            </div>
        </div>

        {/* Primary CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex justify-center pb-20"
        >
          <button
            onClick={onRevealStart}
            className="group relative px-12 py-6 bg-transparent overflow-hidden rounded-none"
          >
            {/* Button Background with animated gradient border */}
            <div className="absolute inset-0 border border-white/20 bg-white/5 backdrop-blur-sm skew-x-[-10deg] group-hover:bg-white/10 transition-colors duration-300"></div>
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-luxury-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            
            <span className="relative z-10 flex items-center gap-4 font-display font-bold text-xl tracking-widest uppercase">
              Reveal Winners
              <ChevronRight className="w-5 h-5 text-luxury-gold group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>

        {/* Admin / Settings */}
        <div className="fixed bottom-6 right-6 z-50">
          <button 
             onClick={() => setShowUpload(!showUpload)} 
             className="p-3 bg-black/50 backdrop-blur-md border border-white/10 rounded-full hover:border-luxury-gold/50 transition text-slate-500 hover:text-white group"
          >
            <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
          </button>
          
          {showUpload && (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="absolute bottom-16 right-0 w-72 bg-luxury-dark/90 backdrop-blur-xl border border-white/10 p-6 rounded-xl shadow-2xl"
            >
               <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
                   <Sparkles className="w-4 h-4 text-luxury-gold" /> Admin Controls
               </h4>
               <div className="space-y-4">
                   <div>
                       <label className="text-xs text-slate-400 mb-1 block uppercase">Update Data Source</label>
                       <input 
                         type="file" 
                         accept=".json" 
                         onChange={handleFileChange}
                         className="w-full text-xs text-slate-300 file:mr-2 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:bg-luxury-accent/20 file:text-luxury-neon hover:file:bg-luxury-accent/30"
                       />
                   </div>
                   <button 
                     onClick={() => { localStorage.removeItem('hasVisited'); window.location.reload(); }}
                     className="w-full py-2 text-xs border border-red-900/50 text-red-400 hover:bg-red-900/20 rounded transition"
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