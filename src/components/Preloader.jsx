// src/components/Preloader.jsx
import React, { useState, useEffect } from 'react';
import { AnimatedDownload } from './animated-download';

const Preloader = ({ onLoadingComplete }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsAnimating(true);
    }, 900);

    return () => clearTimeout(startTimer);
  }, []);

  const handleAnimationComplete = () => {
    onLoadingComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <AnimatedDownload
        isAnimating={isAnimating}
        onAnimationComplete={handleAnimationComplete}
      />
    </div>
  );
};

export default Preloader;