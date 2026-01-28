import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
// Courbes de bézier modernes
const transitionEase = [0.22, 1, 0.36, 1]; // Calme et fluide
const springEase = [0.34, 1.56, 0.64, 1]; // Rebond léger

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

// --- 3. CIRCLE ---
export function CircleTransition({ children }) {
  return (
    <div className="relative min-h-screen bg-slate-950">
      <motion.div
        initial={{ clipPath: "circle(0% at 50% 50%)" }}
        animate={{ clipPath: "circle(150% at 50% 50%)" }}
        exit={{ clipPath: "circle(0% at 50% 50%)" }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </div>
  );
}

// --- 4. BENTO ---
export function BentoTransition({ children }) {
  const tiles = [
    "col-span-2 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-2",
    "col-span-1 row-span-1",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
  ];
  return (
    <div className="relative min-h-screen bg-slate-950">
      <div className="fixed inset-0 z-[100] pointer-events-none grid grid-cols-4 grid-rows-3 gap-3 p-4">
        {tiles.map((cls, i) => (
          <motion.div
            key={i}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 0, opacity: 0 }}
            exit={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.03, ease: springEase }}
            className={`${cls} bg-indigo-600 rounded-3xl shadow-2xl`}
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
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

// --- 6. LIQUID ---
export function LiquidTransition({ children }) {
  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center">
        <svg className="hidden">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              />
            </filter>
          </defs>
        </svg>
        <div style={{ filter: "url(#goo)" }} className="relative">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 2, 0], x: [0, (i - 1.5) * 200, 0] }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute w-40 h-40 bg-indigo-500 rounded-full"
            />
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// --- 7. WARP SPEED ---
export function WarpSpeedTransition({ children }) {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <div className="fixed inset-0 z-[100] pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0, opacity: 0, top: "50%", left: `${i * 7}%` }}
            animate={{
              scaleY: [0, 30, 0],
              opacity: [0, 1, 0],
              top: ["50%", "-120%", "200%"],
            }}
            transition={{
              duration: 0.6,
              delay: Math.random() * 0.2,
              ease: "circIn",
            }}
            className="absolute w-[3px] h-40 bg-gradient-to-t from-transparent via-indigo-400 to-white"
          />
        ))}
      </div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// --- 8. SCANNER ---
export function ScannerTransition({ children }) {
  return (
    <div className="relative min-h-screen bg-black">
      <motion.div
        initial={{ top: "-5%" }}
        animate={{ top: "105%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed left-0 right-0 h-2 bg-indigo-400 z-[120] shadow-[0_0_30px_#6366f1] pointer-events-none"
      />
      <motion.div
        initial={{ height: "100%" }}
        animate={{ height: "0%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed bottom-0 left-0 right-0 bg-slate-900 z-[115]"
      />
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

// --- 9. GLASS BLUR ---
export function GlassBlurTransition({ children }) {
  return (
    <div className="relative min-h-screen bg-slate-950">
      <motion.div
        initial={{ backdropFilter: "blur(50px)", opacity: 1 }}
        animate={{ backdropFilter: "blur(0px)", opacity: 0 }}
        exit={{ backdropFilter: "blur(50px)", opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-[100] bg-slate-950/50 pointer-events-none"
      />
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// --- AJOUTS RAPIDES POUR LES AUTRES ---
export function CurtainTransition({ children }) {
  return (
    <div className="relative min-h-screen bg-slate-950">
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.6, ease: transitionEase }}
        className="fixed inset-0 z-[100] bg-indigo-600 origin-top"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function GlitchTransition({ children }) {
  return (
    <div className="relative min-h-screen bg-slate-950">
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed inset-0 z-[100] bg-indigo-500/20 skew-x-12"
      />
      <motion.div
        initial={{ filter: "invert(1) blur(5px)" }}
        animate={{ filter: "invert(0) blur(0px)" }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function VortexTransition({ children }) {
  return (
    <div
      className="relative min-h-screen bg-black overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        initial={{ rotate: 15, scale: 0.8, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: transitionEase }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function MatrixTransition({ children }) {
  return (
    <div className="relative min-h-screen bg-slate-950">
      <div className="fixed inset-0 z-[100] flex pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{
              duration: 0.6,
              delay: i * 0.05,
              ease: transitionEase,
            }}
            className="flex-1 bg-indigo-900 border-x border-white/5 origin-top"
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function PrismTransition({ children }) {
  return (
    <div className="relative min-h-screen bg-slate-950">
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="fixed inset-0 z-[101] bg-fuchsia-500/40 mix-blend-screen"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function TurbulenceTransition({ children }) {
  return (
    <div className="relative min-h-screen bg-slate-950">
      <motion.div
        initial={{ opacity: 0, filter: "contrast(2) brightness(2) blur(10px)" }}
        animate={{ opacity: 1, filter: "contrast(1) brightness(1) blur(0px)" }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function SolarEclipseTransition({ children }) {
  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 4, opacity: 0 }}
        transition={{ duration: 0.8, ease: transitionEase }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[110] rounded-full w-screen aspect-square border-[40px] border-white shadow-[0_0_50px_#fff]"
      />
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
