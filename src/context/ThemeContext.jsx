import { createContext, useContext, useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SliceTransition from "../components/Transitions"; // Importez votre transition préférée

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme
      ? savedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleTheme = () => {
    setIsTransitioning(true);
    // On attend un peu que l'animation commence avant de changer les couleurs
    setTimeout(() => {
      setIsDark(!isDark);
    }, 300);

    // On arrête l'état de transition après la fin de l'animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <AnimatePresence mode="wait">
        {isTransitioning && <SliceTransition key="transition-overlay" />}
      </AnimatePresence>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
