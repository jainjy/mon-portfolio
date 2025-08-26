import { motion } from "framer-motion";

const AnimatedText = ({ text, className, delay = 0 }) => {
    const letters = Array.from(text);
  
    const container = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: delay },
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
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className={className}
      >
        {letters.map((letter, index) => (
          <motion.span variants={child} key={index}>
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
    );
  };
  
  export default AnimatedText;