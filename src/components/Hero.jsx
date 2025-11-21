import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
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
          alert('Invalid JSON format. Must contain "finalists" array.');
        }
      } catch (error) {
        alert('Error parsing JSON');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      
      {/* 3D Background */}
      <SplineScene />

      <div className="relative z-10 container mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur mb-4 text-xs font-bold tracking-[0.2em] uppercase text-purple-300"
          >
            Annual Event 2024
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-purple-200 drop-shadow-2xl"
          >
            Award Winning
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl font-light text-slate-300 tracking-wide"
          >
            Excellence in Design & Innovation
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 perspective-1000">
          {finalists.map((finalist, index) => (
            <FinalistCard key={finalist.id} finalist={finalist} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <button
            onClick={onRevealStart}
            className="group relative px-10 py-5 bg-white text-black font-bold text-lg rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)] focus:outline-none focus:ring-4 focus:ring-purple-500/50"
          >
            <span className="relative z-10 flex items-center gap-2">
              Reveal Winners
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 opacity-0 group-hover:opacity-20 blur-lg transition-opacity" />
          </button>
        </motion.div>

        {/* Admin / Settings (Hidden by default) */}
        <div className="fixed bottom-4 right-4 z-20">
          <button 
             onClick={() => setShowUpload(!showUpload)} 
             className="p-2 bg-black/50 rounded-full hover:bg-black/80 transition text-slate-600 hover:text-slate-300"
             title="Admin Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          
          {showUpload && (
            <div className="absolute bottom-12 right-0 w-64 bg-slate-900 border border-slate-700 p-4 rounded-lg shadow-xl">
               <h4 className="text-sm font-bold mb-2">Update Data</h4>
               <input 
                 type="file" 
                 accept=".json" 
                 onChange={handleFileChange}
                 className="text-xs text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-purple-500 file:text-white hover:file:bg-purple-600 mb-2"
               />
               <button 
                 onClick={() => { localStorage.removeItem('hasVisited'); window.location.reload(); }}
                 className="text-xs text-red-400 hover:text-red-300 underline mt-2"
               >
                 Reset First Visit Loader
               </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Hero;