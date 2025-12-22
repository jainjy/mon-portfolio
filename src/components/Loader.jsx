import React, { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

const Loader = () => {
  const ringId = useId();
  const ringId2 = useId();
  const aGradId = useId();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      key="app-loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="status"
      aria-busy="true"
      aria-live="polite"
      className="fixed inset-0 z-[2000] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-white dark:bg-gray-950" />
      <motion.div
        className="absolute inset-0"
        animate={reduceMotion ? {} : { opacity: [0.6, 0.85, 0.6] }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{
          background:
            "radial-gradient(circle at center, rgba(168,85,247,0.25), transparent 60%)",
        }}
      />

      {/* Center */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Outer ring */}
        <motion.div
          className="absolute"
          animate={reduceMotion ? {} : { rotate: 360 }}
          transition={{ duration: 12, ease: "linear", repeat: Infinity }}
        >
          <svg
            width="220"
            height="220"
            viewBox="0 0 100 100"
            className="opacity-70"
          >
            <defs>
              <linearGradient id={ringId}>
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke={`url(#${ringId})`}
              strokeWidth="1.5"
              strokeDasharray="2 10"
            />
          </svg>
        </motion.div>

        {/* Inner ring */}
        <motion.div
          className="absolute"
          animate={reduceMotion ? {} : { rotate: -360 }}
          transition={{ duration: 16, ease: "linear", repeat: Infinity }}
        >
          <svg
            width="180"
            height="180"
            viewBox="0 0 100 100"
            className="opacity-60"
          >
            <defs>
              <linearGradient id={ringId2}>
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke={`url(#${ringId2})`}
              strokeWidth="1.25"
              strokeDasharray="1 8"
            />
          </svg>
        </motion.div>

        {/* Letter A */}
        <motion.svg
          width="180"
          height="180"
          viewBox="0 0 100 100"
          className="relative"
          animate={reduceMotion ? {} : { scale: [1, 1.04, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <defs>
            <linearGradient id={aGradId}>
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          {/* Glow */}
          {["M30 80 L50 20", "M50 20 L70 80", "M36 55 L64 55"].map((d, i) => (
            <path
              key={i}
              d={d}
              stroke={`url(#${aGradId})`}
              strokeWidth="12"
              strokeLinecap="round"
              opacity="0.14"
              fill="none"
            />
          ))}

          {/* Draw animation */}
          <motion.path
            d="M30 80 L50 20"
            stroke={`url(#${aGradId})`}
            strokeWidth="6.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.path
            d="M50 20 L70 80"
            stroke={`url(#${aGradId})`}
            strokeWidth="6.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.15 }}
          />
          <motion.path
            d="M36 55 L64 55"
            stroke={`url(#${aGradId})`}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          />
        </motion.svg>

        {/* Loading text */}
        <motion.span
          className="mt-6 text-sm tracking-widest text-gray-500 dark:text-gray-400"
          animate={reduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          LOADING
        </motion.span>

        <span className="sr-only">Application en cours de chargement</span>
      </div>
    </motion.div>
  );
};

export default Loader;
