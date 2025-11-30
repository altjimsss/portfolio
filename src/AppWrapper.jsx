// src/AppWrapper.jsx
import React, { useState } from 'react';
import Preloader from './components/Preloader';
import BlockReveal from './components/BlockReveal';
import App from './App';

const AppWrapper = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showReveal, setShowReveal] = useState(false);
  const [showApp, setShowApp] = useState(false);

  const handleLoadingComplete = () => {
    console.log('✅ Preloader completed, starting blocks over preloader');
    // Start blocks but keep preloader visible underneath
    setShowReveal(true);
  };

  const handleRevealComplete = () => {
    console.log('🎬 Block reveal completed, hiding preloader and showing app');
    // Hide preloader AND show app when blocks finish
    setIsLoading(false);
    setShowApp(true);
  };

  return (
    <>
      {/* Show preloader underneath blocks until blocks finish */}
      {isLoading && (
        <Preloader onLoadingComplete={handleLoadingComplete} />
      )}
      
      {/* Show blocks over the preloader */}
      {showReveal && (
        <BlockReveal onRevealComplete={handleRevealComplete} />
      )}
      
      {/* Show app after blocks finish and preloader is hidden */}
      {showApp && <App />}
    </>
  );
};

export default AppWrapper;