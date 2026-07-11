import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
// Courbes de bézier modernes

// --- 1. SLICE ---
// Dans votre fichier de transitions
export default function SliceTransition() {
  const SLICE_COUNT = 8;

  return (
    <div className="fixed inset-0 z-[999] pointer-events-none flex flex-col overflow-hidden">
      {[...Array(SLICE_COUNT)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 1, 0] }}
          transition={{
            duration: 1.2,
            times: [0, 0.3, 0.7, 1],
            delay: i * 0.02,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{
            flex: 1,
            width: "100%",
            background:
              i % 2 === 0
                ? "linear-gradient(90deg, #f59e0b 0%, #8b5cf6 50%, #ec4899 100%)"
                : "linear-gradient(90deg, #ec4899 0%, #8b5cf6 50%, #f59e0b 100%)",
            transformOrigin: i % 2 === 0 ? "left" : "right",
            opacity: 0.95,
          }}
          className="relative overflow-hidden"
        >
          {/* Effet de brillance */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 0.8,
              delay: i * 0.02 + 0.1,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />

          {/* Effet de texture subtile */}
          <div className="absolute inset-0 opacity-10 bg-gradient-to-b from-white/20 via-transparent to-black/20" />
        </motion.div>
      ))}
    </div>
  );
}
// --- 2. PIXEL ---

export function PixelTransition({ children }) {
  const { isDark } = useTheme();
  const ROWS = 6;
  const COLS = 10;

  return (
    <div
      className={`relative min-h-screen ${isDark ? "bg-gray-900" : "bg-gradient-to-br from-gray-50 to-purple-50"}`}
    >
      <div className="fixed inset-0 z-[100] pointer-events-none grid grid-cols-10 grid-rows-6">
        {[...Array(ROWS * COLS)].map((_, i) => {
          const row = Math.floor(i / COLS);
          const col = i % COLS;

          // Timing plus organique - effet de vague depuis le centre
          const centerX = COLS / 2;
          const centerY = ROWS / 2;
          const distance = Math.sqrt(
            Math.pow(col - centerX, 2) + Math.pow(row - centerY, 2),
          );
          const maxDistance = Math.sqrt(
            Math.pow(centerX, 2) + Math.pow(centerY, 2),
          );
          const normalizedDelay = distance / maxDistance;
          const delay = normalizedDelay * 0.4 + Math.random() * 0.1;

          // Palettes de couleurs plus sombres et matures
          const colors = isDark
            ? [
                "rgba(180, 83, 9, 0.85)", // amber-800 foncé
                "rgba(109, 40, 217, 0.85)", // violet-700
                "rgba(157, 23, 77, 0.85)", // rose-800
                "rgba(91, 33, 182, 0.85)", // purple-800
                "rgba(79, 70, 229, 0.85)", // indigo-700
                "rgba(127, 29, 29, 0.85)", // red-800
              ]
            : [
                "rgba(180, 83, 9, 0.85)", // amber-800 foncé
                "rgba(109, 40, 217, 0.85)", // violet-700
                "rgba(157, 23, 77, 0.85)", // rose-800
                "rgba(91, 33, 182, 0.85)", // purple-800
                "rgba(79, 70, 229, 0.85)", // indigo-700
                "rgba(127, 29, 29, 0.85)", // red-800
              ];

          // Pattern complexe pour un effet plus organique
          const colorIndex = (row * 3 + col * 2) % colors.length;
          const bgColor = colors[colorIndex];

          return (
            <motion.div
              key={i}
              initial={{
                opacity: 1,
                scale: 1.05,
                filter: "blur(0px) brightness(1.1)",
              }}
              animate={{
                opacity: 0,
                scale: 0.7,
                filter: "blur(4px) brightness(0.7)",
              }}
              exit={{
                opacity: 1,
                scale: 1.05,
                filter: "blur(0px) brightness(1.1)",
              }}
              transition={{
                duration: 0.7,
                delay: delay,
                ease: [0.34, 1.56, 0.64, 1], // Courbe personnalisée
              }}
              style={{
                backgroundColor: bgColor,
                transformOrigin: "center",
              }}
              className="relative overflow-hidden border border-gray-800/20"
            >
              {/* Effet de brillance subtile */}
              <motion.div
                initial={{ x: "-100%", opacity: 0.6 }}
                animate={{ x: "100%", opacity: 0 }}
                transition={{
                  duration: 0.9,
                  delay: delay + 0.15,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />

              {/* Effet de texture */}
              <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white/10 to-black/10" />
            </motion.div>
          );
        })}
      </div>

      {/* Overlay de transition */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[90] pointer-events-none bg-gradient-to-t from-black/5 via-transparent to-black/5"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.6,
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
}

// --- 5. NOVA (FLUIDE) ---
export function NovaTransition({ children }) {
  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0.5, 1.5, 2.5],
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed inset-0 z-[100] pointer-events-none bg-white rounded-full blur-[100px]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 1.1, filter: "brightness(2)" }}
        animate={{ opacity: 1, scale: 1, filter: "brightness(1)" }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
