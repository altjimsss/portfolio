// src/components/BlockReveal.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const BlockReveal = ({ onRevealComplete }) => {
  const squareContainerRef = useRef(null);

  useEffect(() => {
    const initBlockReveal = () => {
      const squareContainer = squareContainerRef.current;
      if (!squareContainer) return;

      const squareSize = 100;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const numCols = Math.ceil(screenWidth / squareSize);
      const numRows = Math.ceil(screenHeight / squareSize);
      const numSquares = numCols * numRows;

      squareContainer.style.width = `${numCols * squareSize}px`;
      squareContainer.style.height = `${numRows * squareSize}px`;

      // Clear existing squares
      squareContainer.innerHTML = '';

      let squares = [];

      // Create squares
      for (let i = 0; i < numSquares; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        squareContainer.appendChild(square);
        squares.push(square);
      }

      // EXACT same animation as your HTML
      gsap.fromTo(squares, 
        { opacity: 0 },
        { 
          opacity: 1,
          delay: 0.5, // Blocks start appearing after 0.5s
          duration: 0.0005,
          stagger: {
            each: 0.004,
            from: "random",
          }
        }
      );
      
      // Blocks stay visible for 1.5s, then start disappearing
      gsap.to(squares, { 
        opacity: 0,
        delay: 1.5, // 1.5s delay after appearance completes
        duration: 0.0005,
        stagger: {
          each: 0.004,
          from: "random",
        },
        onComplete: () => {
          squareContainer.style.display = 'none';
          onRevealComplete();
        }
      });
    };

    initBlockReveal();

    const handleResize = () => {
      initBlockReveal();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [onRevealComplete]);

  return (
    <div
      id="square-container"
      ref={squareContainerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 60,
        pointerEvents: 'none',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        overflow: 'hidden',
      }}
    />
  );
};

export default BlockReveal;