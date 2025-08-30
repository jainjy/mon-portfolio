import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedText = ({ text, texts, className, delay = 0, interval = 3000, preserveSpaces = true }) => {
  const items = texts && texts.length ? texts : (typeof text === "string" ? [text] : []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, interval);
    return () => clearInterval(id);
  }, [items.length, interval]);

  const content = items[index] || "";
  const letters = Array.from(content);

  const container = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.04, delayChildren: delay },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 200 },
    },
  };

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={content}
          variants={container}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -15, transition: { duration: 0.3 } }}
        >
          {letters.map((letter, i) => (
            <motion.span variants={child} key={`${content}-${i}`}>
              {letter === " " ? (preserveSpaces ? "\u00A0" : " ") : letter}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedText;
