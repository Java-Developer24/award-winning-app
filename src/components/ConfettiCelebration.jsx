import React, { useState, useEffect, Suspense } from 'react';

const Confetti = React.lazy(() => import('react-confetti'));

const ConfettiCelebration = () => {
  const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });

  const detectSize = () => {
    setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
  }

  useEffect(() => {
    window.addEventListener('resize', detectSize);
    return () => {
      window.removeEventListener('resize', detectSize);
    }
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <Suspense fallback={null}>
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
          colors={['#a855f7', '#ec4899', '#eab308', '#ffffff']}
        />
      </Suspense>
    </div>
  );
};

export default ConfettiCelebration;