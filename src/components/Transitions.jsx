import { motion } from "framer-motion";

const SLICE_COUNT = 10;

export default function SliceTransition({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900">
      <div className="fixed inset-0 z-[100] pointer-events-none flex flex-col">
        {[...Array(SLICE_COUNT)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            exit={{ scaleX: 1 }}
            transition={{
              duration: 0.8,
              delay: i * 0.05,
              ease: [0.645, 0.045, 0.355, 1], // Cubic-bezier pour plus de fluidité
            }}
            style={{
              flex: 1,
              width: "100%",
              background: "linear-gradient(90deg, #0f172a, #1e293b)",
              transformOrigin: i % 2 === 0 ? "left" : "right", // Effet zigzag
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
export function CircleTransition({ children }) {
  return (
    <div className="relative min-h-screen bg-black">
      <motion.div
        initial={{ clipPath: "circle(0% at 50% 50%)" }}
        animate={{ clipPath: "circle(150% at 50% 50%)" }}
        exit={{ clipPath: "circle(0% at 50% 50%)" }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="min-h-screen bg-slate-900"
      >
        {children}
      </motion.div>
    </div>
  );
}
const ROWS = 5;
const COLS = 10;

export function PixelTransition({ children }) {
  return (
    <div className="relative min-h-screen bg-slate-900">
      <div className="fixed inset-0 z-[100] pointer-events-none grid grid-cols-10 grid-rows-5">
        {[...Array(ROWS * COLS)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: Math.random() * 0.5, // Apparition aléatoire
              ease: "easeInOut",
            }}
            className="bg-indigo-600 border-[0.5px] border-indigo-500/20"
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
// Ajout à votre fichier de transitions
export function CurtainTransition({ children }) {
  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[100] bg-indigo-600 origin-bottom"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        {children}
      </motion.div>
    </div>
  );
}

export function GlitchTransition({ children }) {
  return (
    <div className="relative min-h-screen bg-slate-900">
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 0.5, ease: "linear" }}
        className="fixed inset-0 z-[100] bg-white/10 skew-x-12"
      />
      <motion.div
        initial={{ filter: "blur(10px) brightness(2)" }}
        animate={{ filter: "blur(0px) brightness(1)" }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </div>
  );
}