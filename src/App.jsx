import React, { useState, useEffect, useRef } from "react";

import { motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/sections/Footer"
import { Contact } from "./components/sections/Contact";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorVariant, setCursorVariant] = useState("default");
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


  return (
    <div className="scroll-smooth font-sans text-gray-800 overflow-x-hidden">
      {/* Curseur personnalisé */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[1000]"
        variants={cursorVariants}
        animate={cursorVariant}
      />

      {/* Barre de progression */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-[100]">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
          style={{ width: `${scrollProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.3 }}
        ></motion.div>
      </div>

      <Navbar />
      <Hero mousePosition={mousePosition}/>
      <About/>
      <Skills/>
      <Projects/>
      <Contact/>

      {/* Footer */}
      <Footer/>
    </div>
  );
}

export default App;
