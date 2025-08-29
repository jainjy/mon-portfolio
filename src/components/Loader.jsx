import React from "react";
import { motion } from "framer-motion";

// Fullscreen overlay loader with an animated "A"
const Loader = () => {
  return (
    <motion.div
      key="app-loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      aria-busy="true"
      aria-live="polite"
      className="fixed inset-0 z-[2000] flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-white dark:bg-gray-900" />
      <div className="absolute inset-0 loader-gradient opacity-80" />

      {/* Center content */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Animated Rings */}
        <motion.div
          className="absolute"
          initial={{ scale: 0.9, rotate: 0 }}
          animate={{ scale: [0.95, 1, 0.95], rotate: 360 }}
          transition={{ duration: 8, ease: "linear", repeat: Infinity }}
        >
          <svg width="220" height="220" viewBox="0 0 100 100" className="opacity-70">
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="42" fill="none" stroke="url(#ringGrad)" strokeWidth="1.5" strokeDasharray="2 10" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute"
          initial={{ scale: 1.05, rotate: 0 }}
          animate={{ scale: [1.05, 1, 1.05], rotate: -360 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity }}
        >
          <svg width="180" height="180" viewBox="0 0 100 100" className="opacity-60">
            <defs>
              <linearGradient id="ringGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="30" fill="none" stroke="url(#ringGrad2)" strokeWidth="1.25" strokeDasharray="1 8" />
          </svg>
        </motion.div>

        {/* The Letter A (three animated strokes) */}
        <motion.svg
          width="180"
          height="180"
          viewBox="0 0 100 100"
          initial="hidden"
          animate="visible"
          className="glow"
        >
          <defs>
            <linearGradient id="aGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          {/* Glow layer */}
          <motion.path
            d="M30 80 L50 20"
            stroke="url(#aGrad)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.15"
          />
          <motion.path
            d="M50 20 L70 80"
            stroke="url(#aGrad)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.15"
          />
          <motion.path
            d="M38 55 L62 55"
            stroke="url(#aGrad)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.15"
          />

          {/* Draw-in animation layer */}
          <motion.path
            d="M30 80 L50 20"
            stroke="url(#aGrad)"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 1 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          />
          <motion.path
            d="M50 20 L70 80"
            stroke="url(#aGrad)"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 1 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: "easeInOut", delay: 0.15 }}
          />
          <motion.path
            d="M38 55 L62 55"
            stroke="url(#aGrad)"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 1 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.35 }}
          />
        </motion.svg>

        {/* Floating particles */}
        <motion.div
          className="absolute -top-8 -right-10 h-2 w-2 rounded-full bg-purple-400"
          animate={{ y: [0, -6, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-8 -left-10 h-2.5 w-2.5 rounded-full bg-pink-400"
          animate={{ y: [0, 6, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-2 left-8 h-1.5 w-1.5 rounded-full bg-blue-400"
          animate={{ y: [0, -4, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Accessible label (visually hidden) */}
        <span className="sr-only">Loading</span>
      </div>
    </motion.div>
  );
};

export default Loader;
