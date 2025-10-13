import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const squareContainerRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const preloader = preloaderRef.current;
    const squareContainer = squareContainerRef.current;
    const logo = logoRef.current;

    // Create squares grid
    const squareSize = 100;
    const cols = Math.ceil(window.innerWidth / squareSize);
    const rows = Math.ceil(window.innerHeight / squareSize);
    const totalSquares = cols * rows;

    squareContainer.style.width = `${cols * squareSize}px`;
    squareContainer.style.height = `${rows * squareSize}px`;

    // Generate squares
    for (let i = 0; i < totalSquares; i++) {
      const square = document.createElement('div');
      square.className = 'square';
      square.style.width = `${squareSize}px`;
      square.style.height = `${squareSize}px`;
      squareContainer.appendChild(square);
    }

    const squares = squareContainer.querySelectorAll('.square');

    // Animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Final cleanup
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 300);
      }
    });

    // Logo animation
    tl.fromTo(logo, 
      { scale: 0, rotation: -10, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1.2, ease: "back.out(1.7)" }
    )
    .to(logo, { duration: 1.3 }) // Wait time
    
    // Squares appear with random stagger
    .to(squares, {
      opacity: 1,
      duration: 0.8,
      stagger: {
        amount: 0.8,
        from: "random"
      },
      ease: "power2.out"
    }, "-=0.5")
    
    // Squares disappear with random stagger
    .to(squares, {
      opacity: 0,
      duration: 0.8,
      stagger: {
        amount: 0.8,
        from: "random"
      },
      ease: "power2.in"
    }, "+=0.2")
    
    // Fade out preloader
    .to(preloader, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    });

    // Logo error handling
    const handleLogoError = () => {
      const container = logo.parentElement;
      logo.style.display = 'none';
      const fallback = document.createElement('div');
      fallback.innerHTML = `
        <div style="
          width: 200px; 
          height: 200px; 
          background: linear-gradient(45deg, #00ff00, #ff00ff);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 3rem;
          font-weight: bold;
          font-family: Arial, sans-serif;
        ">
          AJM
        </div>
      `;
      container.appendChild(fallback);
    };

    if (logo) {
      logo.onerror = handleLogoError;
    }

    // Cleanup function
    return () => {
      if (logo) {
        logo.onerror = null;
      }
    };
  }, [onComplete]);

  return (
    <>
      <div 
        id="preloader" 
        ref={preloaderRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #000000, #1a5f1a, #4a1a5f)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}
      >
        <div 
          className="logo-container"
          style={{
            position: 'relative',
            zIndex: 10
          }}
        >
          <img 
            ref={logoRef}
            src="/src/assets/12.svg" 
            alt="Allen Martillan" 
            className="logo"
            style={{
              width: '280px',
              height: '280px',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>

      <div 
        id="square-container" 
        ref={squareContainerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexWrap: 'wrap',
          zIndex: 10000,
          pointerEvents: 'none'
        }}
      />
    </>
  );
};

export default Preloader;