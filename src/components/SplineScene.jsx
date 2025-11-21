import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';

// Lazy load Spline to prevent main bundle crash if import fails
const Spline = React.lazy(() => import('@splinetool/react-spline'));

const SplineScene = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Check for WebGL support
  const isWebGLAvailable = () => {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  };

  if (!isWebGLAvailable() || hasError) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 opacity-80" />
    );
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-60">
      <Suspense fallback={<div className="w-full h-full bg-slate-900" />}>
        <Spline
          // Using a public abstract Spline scene URL. 
          // If this expires or fails, the onError will catch it.
          // This is a geometric abstract shape scene.
          scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={isLoaded ? 'opacity-100 transition-opacity duration-1000' : 'opacity-0'}
        />
      </Suspense>
      {/* Overlay to blend 3D into background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
    </div>
  );
};

export default SplineScene;