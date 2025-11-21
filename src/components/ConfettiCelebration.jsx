import React, { useState, useEffect, Suspense } from 'react';

const Confetti = React.lazy(() => import('react-confetti'));

const ConfettiCelebration = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set dimensions only on client side to avoid SSR issues
    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[200]">
      <Suspense fallback={null}>
        {dimensions.width > 0 && (
          <Confetti
            width={dimensions.width}
            height={dimensions.height}
            recycle={true}
            numberOfPieces={400}
            gravity={0.15}
            colors={['#FFD700', '#d946ef', '#7c3aed', '#ffffff']}
          />
        )}
      </Suspense>
    </div>
  );
};

export default ConfettiCelebration;