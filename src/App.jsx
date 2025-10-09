import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
// Importation de React Router
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import NotFound from "./NotFound";
import Footer from "./components/sections/Footer";
import { Contact } from "./components/sections/Contact";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import AOS from "aos";
import "aos/dist/aos.css";

// Composant qui regroupe toutes les sections de la page d'accueil
const HomePage = ({ mousePosition }) => (
  <>
    <Navbar />
    <Hero mousePosition={mousePosition} />
    <About />
    <Skills />
    <Projects />
    <Contact mousePosition={mousePosition} />
    <Footer />
  </>
);

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowScrollTop(window.scrollY > 300);
    };

    const handleMouseEnter = (e) => {
      if (
        e.target.classList.contains("cursor-pointer") ||
        e.target.tagName === "A" ||
        e.target.tagName === "BUTTON"
      ) {
        setCursorVariant("hover");
      } else {
        setCursorVariant("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mouseover", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseover", handleMouseEnter);
    };
  }, []);

  // Initial app loader logic
  useEffect(() => {
    const start = Date.now();
    const conn =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    const slow = !!(
      conn &&
      ((conn.effectiveType &&
        (conn.effectiveType === "slow-2g" || conn.effectiveType === "2g")) ||
        conn.saveData)
    );
    const minDuration = slow ? 2200 : 1100;

    // Lock body scroll while loading
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const complete = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, minDuration - elapsed);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, remaining);
      return timer;
    };

    let timerId;

    if (document.readyState === "complete") {
      timerId = complete();
    } else {
      const onLoad = () => {
        timerId = complete();
      };
      window.addEventListener("load", onLoad, { once: true });
      // Fallback in case load doesn't fire
      setTimeout(() => {
        if (!timerId) {
          timerId = complete();
        }
      }, minDuration + 1200);

      return () => {
        window.removeEventListener("load", onLoad);
        if (timerId) clearTimeout(timerId);
      };
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  // Restore scroll when loading ends
  useEffect(() => {
    if (!isLoading) {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  }, [isLoading]);

  const cursorVariants = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      width: 20,
      height: 20,
      backgroundColor: "rgba(168, 85, 247, 0.3)",
      mixBlendMode: "normal",
      transition: {
        type: "spring",
        mass: 0.6,
      },
    },
    hover: {
      x: mousePosition.x - 15,
      y: mousePosition.y - 15,
      width: 30,
      height: 30,
      backgroundColor: "rgba(168, 85, 247, 0.5)",
      mixBlendMode: "normal",
    },
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    AOS.init({
      duration: 1000, // durée de l'animation
      once: true, // animation une seule fois
      offset: 100, // distance avant déclenchement
    });
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter> {/* Ajout du BrowserRouter en haut */}
          <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>
          <div className="scroll-smooth font-sans text-gray-800 dark:text-gray-200 overflow-x-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
            {/* Curseur personnalisé */}
            <motion.div
              ref={cursorRef}
              className="fixed top-0 left-0 rounded-full pointer-events-none z-[1000]"
              variants={cursorVariants}
              animate={cursorVariant}
            />

            {/* Barre de progression modifiée */}
            <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-[100]">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 backdrop-blur-sm"
                style={{
                  width: `${scrollProgress}%`,
                  boxShadow: "0 0 10px rgba(168, 85, 247, 0.5)",
                }}
                initial={{ width: 0 }}
                animate={{
                  width: `${scrollProgress}%`,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="absolute right-0 top-0 h-full w-5 bg-white/20 blur-sm" />
              </motion.div>
            </div>

            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  onClick={scrollToTop}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="fixed bottom-8 right-8 p-4 rounded-full bg-purple-600/70 text-white shadow-lg cursor-pointer z-50 hover:bg-purple-700 transition-colors duration-300"
                >
                  <FaArrowUp className="text-xl" />
                  <div className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-25"></div>
                </motion.button>
              )}
            </AnimatePresence>

            {/* --- Définition des Routes --- */}
            <Routes>
              {/* Route principale (Page d'accueil) */}
              <Route path="/" element={<HomePage mousePosition={mousePosition} />} />
              {/* Route 404 - Le chemin '*' attrape toutes les routes non définies */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            {/* ------------------------------- */}

          </div>
        </BrowserRouter> {/* Fermeture du BrowserRouter */}
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;