import { motion } from 'framer-motion'
import React from 'react'
import ParticleBackground from "./ParticleBackground";
import ProfileImage from './ProfileImage';
import AnimatedText from './AnimatedText';
import {
    FaGithub,
    FaArrowDown,
    FaCode,
    FaRocket,
    FaHeart,
    FaEye,
    FaDownload,
    FaGraduationCap,
    FaLaptopCode,
    FaDatabase,
    FaServer,
  } from "react-icons/fa";
export const Hero = ({mousePosition}) => {
  return (
    <>
    
      {/* Hero Section */}
      <motion.section
        id="home"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden pt-16"
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
            text="Bonjour, je suis"
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
          />

          <AnimatedText
            text="Andrianina"
            className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
            delay={0.5}
          />

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto leading-relaxed"
          >
            Développeur Web passionné & Créateur d'applications innovantes
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-purple-200/80 mb-8"
          >
            Je transforme vos idées en réalité digitale avec créativité et
            innovation
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            <motion.a
              href="#contact"
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 0px 20px rgba(168, 85, 247, 0.5)",
              }}
              transition={{ duration: 0.5 }}
              className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full flex items-center gap-3 relative overflow-hidden cursor-pointer"
            >
              <motion.div
                className="absolute inset-0 bg-white/20 scale-x-0 origin-left"
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
              ></motion.div>
              <FaRocket className="group-hover:animate-bounce relative z-10" />
              <span className="relative z-10">Me contacter</span>
            </motion.a>

            <motion.a
              href="#about"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(168, 85, 247, 0.2)",
                color: "#fff",
              }}
              transition={{ duration: 0.5 }}
              className="border-2 border-purple-400 text-purple-400 px-10 py-4 rounded-full flex items-center gap-3 group cursor-pointer"
            >
              <FaEye className="group-hover:animate-pulse" />
              En savoir plus
            </motion.a>

            <motion.a
              href="#"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(236, 72, 153, 0.2)",
                color: "#fff",
              }}
              transition={{ duration: 0.5 }}
              className="border-2 border-pink-400 text-pink-400 px-10 py-4 rounded-full flex items-center gap-3 group cursor-pointer"
            >
              <FaDownload className="group-hover:animate-bounce" />
              Télécharger CV
            </motion.a>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-purple-300"
          >
            <FaArrowDown size={24} />
          </motion.div>
        </div>
      </motion.section>
</>
  )
}
