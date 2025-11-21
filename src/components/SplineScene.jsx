import React, { useState, Suspense, useEffect } from 'react';

// Lazy load Spline to prevent main bundle crash if import fails
const Spline = React.lazy(() => import('@splinetool/react-spline'));

const SplineScene = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isCompatible, setIsCompatible] = useState(true);

  useEffect(() => {
    // Check for WebGL support
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    };
    
    if (!checkWebGL()) {
      setIsCompatible(false);
    }
  }, []);

  // Fallback component (Static Hero Background)
  const FallbackHero = () => (
    <div 
      className="absolute inset-0 bg-[url('/assets/bg-aurora.png')] bg-cover bg-center opacity-60"
      style={{ backgroundBlendMode: 'overlay' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90"></div>
    </div>
  );

  if (!isCompatible || hasError) {
    return <FallbackHero />;
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <Suspense fallback={<FallbackHero />}>
        <Spline
          // Abstract geometric scene (public URL)
          scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full transition-opacity duration-1000 ${isLoaded ? 'opacity-60' : 'opacity-0'}`}
        />
      </Suspense>
      
      {/* Cinematic Overlay to blend 3D into background */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/20 via-transparent to-luxury-black" />
      <div className="absolute inset-0 bg-luxury-accent/10 mix-blend-overlay" />
    </div>
  );
};

export default SplineScene;