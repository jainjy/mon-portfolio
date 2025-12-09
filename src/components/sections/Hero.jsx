import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import ParticleBackground from "../ParticleBackground";
import ProfileImage from "../ProfileImage";
import AnimatedText from "../AnimatedText";
import { FaRocket, FaDownload } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../data/translations";

// Enregistrer le plugin SplitText
gsap.registerPlugin(SplitText);

export const Hero = ({ mousePosition }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  useEffect(() => {
    // Animation GSAP pour l'apparition du hero
    const heroElement = heroRef.current;
    const contentElement = contentRef.current;

    if (!heroElement || !contentElement) return;

    // Cacher le contenu initialement
    gsap.set(contentElement, { autoAlpha: 0 });

    // Créer une timeline pour l'animation
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onStart: () => {
        // Cacher les autres animations au début
        gsap.set(contentElement, { autoAlpha: 1 });
      },
    });

    // Animation de l'overlay de fond
    tl.fromTo(
      heroElement.querySelector(".absolute.inset-0.bg-black"),
      { scaleY: 0, transformOrigin: "top" },
      { scaleY: 1, duration: 1.2, ease: "power3.inOut" }
    );

    // Animation des éléments de décoration
    const decorElements = heroElement.querySelectorAll(
      ".absolute.top-20, .absolute.top-40, .absolute.bottom-40"
    );
    tl.fromTo(
      decorElements,
      { scale: 0, opacity: 0, rotation: 45 },
      { scale: 1, opacity: 0.3, rotation: 0, duration: 0.8, stagger: 0.2 },
      "-=0.8"
    );

    // Animation du cercle de particules lumineux
    const lightCircle = heroElement.querySelector(".absolute.w-96.h-96");
    tl.fromTo(
      lightCircle,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 0.4, duration: 1 },
      "-=0.5"
    );

    // Animation du contenu principal avec effet de découpe et coulissement
    const mainContent = contentElement.querySelector(".relative.z-10");

    // Séparer le contenu en plusieurs sections
    const contentSections = [
      mainContent.querySelector(".flex.flex-col"), // Section avec image et texte
      mainContent.querySelector(".flex.flex-wrap"), // Section des boutons
      mainContent.querySelector(".flex.justify-center"), // Section scroll indicator
    ];

    // Animation de chaque section avec effet de coupe et coulissement
    contentSections.forEach((section, index) => {
      if (!section) return;

      // Créer un masque pour l'effet de coupe
      const maskId = `hero-mask-${index}`;

      // Ajouter un SVG masque
      const svgNS = "http://www.w3.org/2000/svg";
      const mask = document.createElementNS(svgNS, "mask");
      mask.setAttribute("id", maskId);

      // Rectangle de base (caché)
      const rect = document.createElementNS(svgNS, "rect");
      rect.setAttribute("width", "100%");
      rect.setAttribute("height", "100%");
      rect.setAttribute("fill", "white");

      // Ajouter plusieurs rectangles pour l'effet de coupe
      const rects = [];
      for (let i = 0; i < 5; i++) {
        const sliceRect = document.createElementNS(svgNS, "rect");
        sliceRect.setAttribute("width", "100%");
        sliceRect.setAttribute("height", "20%");
        sliceRect.setAttribute("y", `${i * 20}%`);
        sliceRect.setAttribute("fill", "black");
        rects.push(sliceRect);
      }

      mask.appendChild(rect);
      rects.forEach((r) => mask.appendChild(r));

      // Ajouter le masque au SVG
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("width", "0");
      svg.setAttribute("height", "0");
      svg.appendChild(mask);
      document.body.appendChild(svg);

      // Appliquer le masque initial
      gsap.set(section, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        opacity: 0,
        y: 50,
      });

      // Animation de chaque section avec effet de coulissement
      tl.to(
        section,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.inOut",
        },
        index === 0 ? "-=0.5" : `+=${0.3 + index * 0.2}`
      );

      // Animation des rectangles de coupe
      rects.forEach((rect, rectIndex) => {
        tl.fromTo(
          rect,
          { attr: { height: "20%", y: `${rectIndex * 20}%` } },
          {
            attr: { height: "0%", y: `${rectIndex * 20 + 10}%` },
            duration: 0.6,
            ease: "power2.inOut",
          },
          `-=${0.4 + rectIndex * 0.1}`
        );
      });

      // Cleanup
      tl.call(() => {
        gsap.set(section, { clearProps: "clipPath,opacity,y" });
        if (svg.parentNode) {
          svg.parentNode.removeChild(svg);
        }
      });
    });

    // Animation des éléments enfants avec effet de cascade
    const animatedElements = contentElement.querySelectorAll(
      "[data-aos], .profile-image, .animated-text"
    );
    tl.fromTo(
      animatedElements,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
      "-=0.5"
    );

    return () => {
      // Nettoyage
      tl.kill();
    };
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

        <div ref={contentRef} className="opacity-0">
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
