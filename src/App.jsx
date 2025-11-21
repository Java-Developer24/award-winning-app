import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import Hero from './components/Hero';
import RevealModal from './components/RevealModal';

// __define-ocg__

function App() {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [finalists, setFinalists] = useState([]);

  useEffect(() => {
    // 1. Check local storage for first visit
    const hasVisited = localStorage.getItem('hasVisited');
    
    // 2. Fetch Data
    fetch('/data/winners.json')
      .then(res => res.json())
      .then(data => {
        setFinalists(data.finalists || []);
        // If they visited before, skip loader immediately, else wait for loader anim
        if (hasVisited) {
          setLoading(false);
        }
      })
      .catch(err => {
        console.error("Failed to load winners", err);
        setLoading(false); // Fail safe
      });

  }, []);

  const handleLoaderComplete = () => {
    localStorage.setItem('hasVisited', 'true');
    setLoading(false);
  };

  const handleUploadData = (newData) => {
    if (newData && newData.finalists) {
      setFinalists(newData.finalists);
    }
  };

  return (
    <div className="min-h-screen font-sans antialiased">
      <AnimatePresence mode='wait'>
        {loading && (
          <Loader key="loader" onComplete={handleLoaderComplete} />
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <Hero 
            finalists={finalists} 
            onRevealStart={() => setIsModalOpen(true)}
            onUploadData={handleUploadData}
          />
          
          <RevealModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            finalists={finalists}
          />
        </>
      )}
    </div>
  );
}

export default App;