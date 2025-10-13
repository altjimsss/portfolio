import React, { useState, useEffect } from 'react';
import FaultyTerminal from './components/FaultyTerminal.jsx';

const Intro = ({ onIntroComplete }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Show for 3 seconds then transition
    const timer = setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        onIntroComplete();
      }, 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onIntroComplete]);

  return (
    <div className={`fixed inset-0 z-50 transition-all duration-1000 ${
      isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
    }`}>
      {/* Full intensity FaultyTerminal background */}
      <div className="fixed inset-0">
        <FaultyTerminal
          scale={2}
          gridMul={[2, 1]}
          digitSize={1.5}
          timeScale={1}
          pause={false}
          scanlineIntensity={1}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1.3}
          chromaticAberration={.5}
          dither={0}
          curvature={.3}
          tint="#a1e799"
          mouseReact={true}
          mouseStrength={1}
          pageLoadAnimation={false}
          brightness={0.7}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-white text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight">
            Hello, I'm Allen :)
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Intro;