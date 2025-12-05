"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const getRandomInt = (max) => Math.floor(Math.random() * max);

export function AnimatedDownload({
  className,
  isAnimating = false,
  onAnimationComplete
}) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [filesCount, setFilesCount] = useState(0);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(300);
  const [isComplete, setIsComplete] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // HyperText animation state
  const [displayText, setDisplayText] = useState("READY".split(""));
  const [isTextAnimating, setIsTextAnimating] = useState(false);
  const [targetText, setTargetText] = useState("READY");
  const [textIterations, setTextIterations] = useState(0);

  // Animation configuration
  const easing = shouldReduceMotion ? "linear" : "easeOut";
  const duration = shouldReduceMotion ? 0.3 : 7.5;

  // HyperText animation logic
  useEffect(() => {
    const newTargetText = isAnimating ? "PORTFOLIO" : "READY";
    if (newTargetText !== targetText) {
      setTargetText(newTargetText);
      setTextIterations(0);
      setIsTextAnimating(true);
    }
  }, [isAnimating, targetText]);

  useEffect(() => {
    if (!isTextAnimating) return;

    const interval = setInterval(() => {
      if (textIterations < targetText.length) {
        setDisplayText((prev) =>
          targetText.split("").map((l, i) =>
            l === " "
              ? l
              : i <= textIterations
                ? targetText[i]
                : alphabets[getRandomInt(26)]));
        setTextIterations((prev) => prev + 0.1);
      } else {
        setIsTextAnimating(false);
        setDisplayText(targetText.split(""));
        clearInterval(interval);
      }
    }, 800 / (targetText.length * 10));

    return () => clearInterval(interval);
  }, [isTextAnimating, targetText, textIterations]);

  // Fix React setState error
  useEffect(() => {
    if (animatedProgress >= 100 && isAnimating) {
      const timer = setTimeout(() => {
        setIsComplete(true);
        setTimeout(() => {
          onAnimationComplete?.();
        }, 100);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [animatedProgress, isAnimating, onAnimationComplete]);

  useEffect(() => {
    if (!isAnimating) {
      setAnimatedProgress(0);
      setFilesCount(0);
      setTimeRemainingSeconds(300);
      setIsComplete(false);
      return;
    }

    // Animate progress from 0 to 100
    const progressInterval = setInterval(() => {
      setAnimatedProgress((prev) => {
        const next = prev + 1;
        setFilesCount(Math.floor((next / 100) * 1000));
        setTimeRemainingSeconds(Math.max(0, 300 - Math.floor((next / 100) * 300)));

        if (next >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return next;
      });
    }, duration * 10);

    return () => {
      clearInterval(progressInterval);
    };
  }, [isAnimating, duration]);

  // Format time from seconds to "Xmin XXsec"
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}min ${remainingSeconds.toString().padStart(2, "0")}sec`;
  };

  // Motion variants
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
      transition: { duration: 0.2, ease: easing },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: easing },
    },
  };

  // Chevron animations
  const chevronVariants = {
    idle: { y: 0, opacity: 0.7 },
    animating: {
      y: shouldReduceMotion ? 0 : [0, 8, 0],
      opacity: shouldReduceMotion ? 0.7 : [0.7, .9, .7],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: isAnimating ? Infinity : 0,
        repeatType: "loop",
      },
    },
  };

  const chevron2Variants = {
    idle: { y: 14, opacity: 0.5 },
    animating: {
      y: shouldReduceMotion ? 8 : [14, 18, 14],
      opacity: shouldReduceMotion ? 0.5 : [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: isAnimating ? Infinity : 0,
        repeatType: "loop",
        delay: 0.3,
      },
    },
  };

  // Dots animation
  const dotsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const dotVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 1, 1, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  };

  // If complete, show black screen
  if (isComplete) {
    return (
      <div className="fixed inset-0 z-50 bg-black" />
    );
  }

  return (
    <motion.div
      className={cn(
        "fixed z-50 bg-transparent",
        // Desktop positioning (large screens)
        "lg:bottom-6 lg:left-6 lg:scale-110 lg:origin-bottom-left",
        // Mobile positioning
        "bottom-4 left-4 right-4 sm:bottom-4 sm:left-4 sm:right-auto sm:w-auto",
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        transform: 'scale(1)',
        transformOrigin: 'bottom left',
      }}
    >
      {/* Container for better mobile layout */}
      <div className="w-full max-w-md mx-auto lg:mx-0">
        {/* Top header row */}
        <div className="flex items-center mb-2">
          {/* Animated ChevronDown icons */}
          <div className={cn(
            "flex -mt-3 flex-col items-center justify-center",
            "w-8 h-16 lg:w-9 lg:h-18",
            "overflow-hidden relative"
          )}>
            <motion.div
              className="absolute"
              variants={chevronVariants}
              animate={isAnimating ? "animating" : "idle"}>
              <ChevronDown 
                size={24} 
                className="text-white lg:size-26"
              />
            </motion.div>
            <motion.div
              className="absolute"
              variants={chevron2Variants}
              animate={isAnimating ? "animating" : "idle"}>
              <ChevronDown 
                size={24} 
                className="text-white lg:size-26"
              />
            </motion.div>
          </div>

          {/* PORTFOLIO/READY banner */}
          <div className="relative ml-2 flex-1 min-w-0">
            <svg
              width="100%"
              height="28"
              viewBox="0 0 107 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full lg:w-1/2 fill-white"
              preserveAspectRatio="none">
              <path d="M0.445312 0.5H106.103V8.017L99.2813 14.838H0.445312V0.5Z" />
            </svg>
            <div className="relative px-3 py-1 font-mono font-bold text-xs lg:text-sm text-white min-h-[28px] flex items-center">
              <div className="flex items-center overflow-hidden">
                <div className="flex font-mono font-bold text-white text-nowrap">
                  {displayText.map((letter, i) => (
                    <motion.span
                      key={`${targetText}-${i}`}
                      className={cn(
                        "font-mono text-black font-bold text-xs lg:text-sm",
                        letter === " " ? "w-2 lg:w-3" : ""
                      )}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 3 }}>
                      {letter}
                    </motion.span>
                  ))}
                </div>
                {isAnimating && (
                  <motion.div
                    className="ml-1 flex text-black"
                    variants={dotsVariants}
                    initial="hidden"
                    animate="visible">
                    <motion.span className="text-xs lg:text-sm" variants={dotVariants}>.</motion.span>
                    <motion.span className="text-xs lg:text-sm" variants={dotVariants}>.</motion.span>
                    <motion.span className="text-xs lg:text-sm" variants={dotVariants}>.</motion.span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Thick separator bar */}
        <div className="w-full h-0.5 lg:h-1 bg-white mb-2 lg:mb-3 rounded-full" />
        
        {/* Labels row - responsive layout */}
        <div className="flex flex-col lg:flex-row lg:items-center mb-1 lg:mb-1 gap-1 lg:gap-0">
          <div className="lg:w-36">
            <div className="text-[10px] lg:text-xs font-mono text-white">PROGRESS</div>
          </div>

          <div className="flex justify-between lg:justify-start lg:ml-6 w-full lg:w-auto">
            <div className="lg:w-30 text-left">
              <div className="text-[10px] lg:text-xs font-mono text-white">EST. TIME</div>
            </div>
            <div className="lg:w-32 text-left lg:ml-4">
              <div className="text-[10px] lg:text-xs font-mono text-white">FILES COPIED:</div>
            </div>
          </div>
        </div>
        
        {/* Values row - progress bar and info values */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-0">
          {/* Animated Progress bar */}
          <div className="lg:w-36 w-full">
            <div className="w-full h-2 lg:h-2.5 border border-white bg-transparent rounded-full flex items-center px-0.5">
              <motion.div
                className="h-1 lg:h-1.5 bg-white rounded-full"
                initial={{ width: "0%" }}
                animate={{
                  width: `${animatedProgress}%`,
                }}
                transition={{
                  duration: shouldReduceMotion ? 0.1 : 0.3,
                  ease: easing,
                }} />
            </div>
          </div>

          {/* Animated info values */}
          <div className="flex justify-between lg:justify-start lg:ml-6 w-full lg:w-auto">
            <div className="lg:w-30 text-left">
              <div className="text-xs lg:text-sm font-mono text-white">
                {formatTime(timeRemainingSeconds)}
              </div>
            </div>
            <div className="lg:w-32 text-left lg:ml-4">
              <div className="text-xs lg:text-sm font-mono text-white">
                {filesCount.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        
        {/* Static bottom bar */}
        <div className="w-full lg:w-4/5 h-0.5 bg-white mt-3 lg:mt-4 rounded-full" />
      </div>
    </motion.div>
  );
}