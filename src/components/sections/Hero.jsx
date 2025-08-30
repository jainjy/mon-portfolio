import { motion } from "framer-motion";
import React from "react";
import ParticleBackground from "../ParticleBackground";
import ProfileImage from "../ProfileImage";
import AnimatedText from "../AnimatedText";
import { FaArrowDown, FaRocket, FaEye, FaDownload } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../data/translations";

export const Hero = ({ mousePosition }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <>
      {/* Hero Section */}
      <motion.section
        id="home"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 overflow-hidden pt-16"
      >
        <ParticleBackground density={100} />

        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/40 to-pink-500/40 blur-3xl pointer-events-none"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />

        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: -20 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute top-20 left-10 w-20 h-20 border border-purple-400/30 rotate-45"
          ></motion.div>
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: -20 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5,
            }}
            className="absolute top-40 right-20 w-16 h-16 bg-pink-500/20 rounded-full"
          ></motion.div>
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-40 left-20 w-12 h-12 bg-blue-500/20 transform rotate-45"
          ></motion.div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto mt-16">
          <ProfileImage />
          <AnimatedText
            text={t.hero.greeting}
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
          />

          <AnimatedText
            text="Andrianina"
            className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
            delay={0.5}
          />

          <AnimatedText
            texts={[t.hero.role, t.hero.description]}
            className="text-lg sm:text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto leading-relaxed px-2"
            delay={0}
            interval={3800}
            preserveSpaces={false}
          />

          <motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.4 }}
  className="flex flex-wrap justify-center items-center gap-4 sm:flex-nowrap mb-12"
>
  <motion.a
    href="#contact"
    whileHover={{
      scale: 1.1,
      boxShadow: "0px 0px 20px rgba(168, 85, 247, 0.5)",
    }}
    transition={{ duration: 0.5 }}
    className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white 
               px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base 
               rounded-full flex justify-center items-center gap-2 sm:gap-3 
               relative overflow-hidden cursor-pointer w-[48%] sm:w-auto text-center"
  >
    <motion.div
      className="absolute inset-0 bg-white/20 scale-x-0 origin-left"
      whileHover={{ scaleX: 1 }}
      transition={{ duration: 0.5 }}
    ></motion.div>
    <FaRocket className="group-hover:animate-bounce relative z-10" />
    <span className="relative z-10">{t.hero.contact}</span>
  </motion.a>

  <motion.a
    href="/CV.pdf"
    download
    whileHover={{
      scale: 1.1,
      backgroundColor: "rgba(236, 72, 153, 0.2)",
      color: "#fff",
    }}
    transition={{ duration: 0.5 }}
    className="border-2 border-pink-400 text-pink-400 
               px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base
               rounded-full flex justify-center items-center gap-2 sm:gap-3 
               group cursor-pointer w-[48%] sm:w-auto text-center"
  >
    <FaDownload className="group-hover:animate-bounce" />
    {t.hero.download}
  </motion.a>
</motion.div>


          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex justify-center mt-10 mb-2 text-purple-300" // centrage et marge top
          >
            <FaArrowDown size={48} /> {/* taille plus grande */}
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};
