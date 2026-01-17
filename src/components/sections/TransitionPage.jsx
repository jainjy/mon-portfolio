import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SliceTransition, {
  PixelTransition,
  CircleTransition,
  CurtainTransition,
  GlitchTransition,
  NovaTransition,
  MatrixTransition,
  PrismTransition,
  LiquidTransition,
  BentoTransition,
  WarpSpeedTransition,
  GlassBlurTransition,
  TurbulenceTransition,
  VortexTransition,
  SolarEclipseTransition,
  ScannerTransition,
} from "../components/Transitions";

import {
  Component,
  Cpu,
  Database,
  Fingerprint,
  Globe,
  Hexagon,
  Infinity,
  Orbit,
  Share2,
  RefreshCw,
} from "lucide-react";

export default function IconPage() {
  const [mode, setMode] = useState("pixel");
  const [version, setVersion] = useState(0);

  const icons = [
    Component,
    Cpu,
    Database,
    Fingerprint,
    Globe,
    Hexagon,
    Infinity,
    Orbit,
    Share2,
  ];

  const transitions = {
    pixel: PixelTransition,
    slice: SliceTransition,
    circle: CircleTransition,
    curtain: CurtainTransition,
    glitch: GlitchTransition,
    nova: NovaTransition,
    matrix: MatrixTransition,
    prisma: PrismTransition,
    liquid: LiquidTransition,
    bento: BentoTransition,
    warp: WarpSpeedTransition,
    glass: GlassBlurTransition,
    turbulence: TurbulenceTransition,
    vortex: VortexTransition,
    eclipse: SolarEclipseTransition,
    scanner: ScannerTransition,
  };

  const SelectedTransition = transitions[mode];

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setVersion((v) => v + 1);
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 selection:bg-indigo-500/30">
      {/* BARRE DE NAVIGATION RESPONSIVE */}
      <nav className="fixed top-16 left-0 right-0 z-[200] p-4 flex justify-center">
        <div className="max-w-full flex items-center gap-2 p-2 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-full shadow-2xl overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 px-2">
            {Object.keys(transitions).map((t) => (
              <button
                key={t}
                onClick={() => handleModeChange(t)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-tighter md:tracking-widest transition-all duration-300 ${
                  mode === t
                    ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="border-l border-white/10 pl-2 pr-1">
            <button
              onClick={() => setVersion((v) => v + 1)}
              className="p-2 text-indigo-400 hover:text-indigo-300 hover:rotate-180 transition-all duration-500 active:scale-90"
            >
              <RefreshCw size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* ZONE DE CONTENU AVEC TRANSITION */}
      <AnimatePresence mode="wait">
        <SelectedTransition key={`${mode}-${version}`}>
          <main className="container mx-auto min-h-screen flex items-center justify-center pb-6 pt-32 md:pt-20">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-8 max-w-4xl w-full pt-16">
              {icons.map((Icon, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.05 + 0.5, // Apparition cascade après la transition
                    duration: 0.5,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                    backgroundColor: "rgba(255,255,255,0.08)",
                  }}
                  className="group relative aspect-square flex flex-col items-center justify-center bg-white/5 border border-white/5 rounded-[2rem] shadow-xl overflow-hidden cursor-pointer"
                >
                  {/* Effet de brillance au survol */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <Icon
                    size={48}
                    strokeWidth={1}
                    className="text-slate-400 group-hover:text-indigo-400 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                  />

                  <span className="mt-4 text-[10px] uppercase tracking-widest text-slate-500 font-medium group-hover:text-slate-300 transition-colors">
                    Tech_Module_{i + 1}
                  </span>
                </motion.div>
              ))}
            </div>
          </main>
        </SelectedTransition>
      </AnimatePresence>

      {/* STYLE CSS POUR MASQUER LA SCROLLBAR DE LA NAV SUR MOBILE */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
