import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ParticleBackground from "../ParticleBackground";
import ProfileImage from "../ProfileImage";
import AnimatedText from "../AnimatedText";
import { FaRocket, FaDownload } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../data/translations";
import { useLazyBackgroundImage } from "../../hooks/useLazyBackgroundImage";

export const Hero = ({ mousePosition }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const bgImageLoaded = useLazyBackgroundImage("/images/bg.jpg");

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        id="home"
        className="relative min-h-screen max-h-full lg:max-h-screen flex flex-col items-center justify-center text-center px-4 bg-white/10 dark:bg-purple-900/10 overflow-hidden pt-16"
        style={{
          backgroundImage: "url('/images/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        {/* Overlay sombre pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-black/10 dark:bg-black/60"></div>

        <ParticleBackground density={100} />

        <div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/40 to-pink-500/40 blur-3xl pointer-events-none animate-pulse-slow"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 border border-purple-400/30 rotate-45 animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-pink-500/20 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-blue-500/20 transform rotate-45 animate-pulse"></div>
        </div>

        <div ref={contentRef} className="animate-fade-in">
          <div className="relative z-10 max-w-7xl mx-auto mt-16">
            {/* Container flex pour desktop */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-16">
              {/* Colonne gauche pour la photo */}
              <div className="w-full lg:w-5/12 flex-shrink-0">
                <ProfileImage />
              </div>

              {/* Colonne droite pour le texte */}
              <div className="w-full lg:w-7/12 lg:text-left text-center flex-shrink-0">
                <AnimatedText
                  text={t.hero.greeting}
                  className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                />

                <AnimatedText
                  text="Andrianina"
                  className=" redhawk text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                  delay={0.5}
                />

                {/* Container avec hauteur fixe pour éviter les décalages */}
                <div className="min-h-[4rem] sm:min-h-[5rem] md:min-h-[6rem] flex items-center justify-center lg:justify-start">
                  <AnimatedText
                    texts={[t.hero.role, t.hero.description]}
                    className="text-lg sm:text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl lg:mx-0 mx-auto leading-relaxed"
                    delay={0}
                    interval={3800}
                    preserveSpaces={false}
                  />
                </div>
              </div>
            </div>

            {/* Section des boutons en bas */}
            <div className="flex flex-wrap justify-center gap-4 sm:flex-nowrap mt-8 lg:mt-8">
              <a
                href="#contact"
                className="azonix group bg-gradient-to-r from-purple-600 to-pink-600 text-white 
                         px-8 sm:px-12 py-4 text-base 
                         rounded-full flex justify-center items-center gap-3 
                         relative overflow-hidden cursor-pointer w-[48%] sm:w-auto transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-white/20 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>
                <FaRocket className="group-hover:animate-bounce relative z-10" />
                <span className="relative z-10">{t.hero.contact}</span>
              </a>

              <a
                href="/CV.pdf"
                download
                className="azonix border-2 border-pink-400 text-pink-400 
                         px-8 sm:px-12 py-4 text-base
                         rounded-full flex justify-center items-center gap-3 
                         group cursor-pointer w-[48%] sm:w-auto transition-all duration-300 hover:scale-105 hover:bg-pink-500/20 hover:text-white"
              >
                <FaDownload className="group-hover:animate-bounce" />
                {t.hero.download}
              </a>
            </div>

            <div className="flex justify-center mt-10 mb-10">
              <div className="animate-bounce relative">
                <div className="w-8 h-12 border-4 border-purple-400/70 rounded-full flex justify-center relative overflow-hidden">
                  <div className="w-1 h-3 bg-gradient-to-b from-purple-500 via-purple-800 to-white rounded-full mt-2 animate-ping-slow" />
                </div>
                <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-md animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
