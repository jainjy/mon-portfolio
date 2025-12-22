import React, { useState, useEffect, useRef, useCallback } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import data from "../../data/data";
import {
  FaGithub,
  FaCode,
  FaArrowDown,
  FaTimes,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaPause,
  FaPlay,
} from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../data/translations";
import ParticleBackground from "../ParticleBackground";

export const Projects = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const projects = data.projects[language];

  const [expanded, setExpanded] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const carouselRef = useRef(null);
  const autoScrollRef = useRef(null);

  const handleExpand = (i) => setExpanded(i);
  const handleClose = () => setExpanded(null);

  // Gérer le nombre d'éléments par vue en fonction de l'écran
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Navigation
  const nextSlide = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev + 1) % Math.max(1, projects.length - itemsPerView + 1)
    );
  }, [projects.length, itemsPerView]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + Math.max(1, projects.length - itemsPerView + 1)) %
        Math.max(1, projects.length - itemsPerView + 1)
    );
  }, [projects.length, itemsPerView]);

  // Auto-scroll
  useEffect(() => {
    if (isPaused || projects.length <= itemsPerView) return;

    autoScrollRef.current = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isPaused, nextSlide, projects.length, itemsPerView]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Scroll manuel du carousel
  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.offsetWidth || 0;
      const gap = 40; // gap-10 = 2.5rem = 40px
      carouselRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth",
      });
    }
    setCurrentIndex(index);
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  // Calcul des projets visibles
  const visibleProjects = projects.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

  return (
    <section
      id="projects"
      data-aos="fade-up"
      className="min-h-screen flex items-center justify-center relative"
    >
      <ParticleBackground density={120} />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-yellow-50/20 to-pink-50/30 dark:from-purple-900/30 dark:via-yellow-900/10 dark:to-pink-900/30"></div>

      <div
        className="w-full relative z-10 px-4 py-10 dark:bg-gray-900/70 bg-white/50"
        style={{
          backgroundImage: "url('/images/bg6.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Section Title */}
        <div data-aos="fade-up" className="text-center mb-16">
          <h2 className="redhawk text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-500 via-purple-600 to-pink-600 dark:from-yellow-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            {t.projects.title}
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-500 via-purple-600 to-pink-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Contrôles du carousel */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <button
            onClick={togglePause}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all"
            aria-label={
              isPaused
                ? language === "fr"
                  ? "Reprendre"
                  : "Resume"
                : language === "fr"
                ? "Pause"
                : "Pause"
            }
          >
            {isPaused ? <FaPlay size={16} /> : <FaPause size={16} />}
            <span className="text-sm font-medium">
              {isPaused
                ? language === "fr"
                  ? "Reprendre"
                  : "Resume"
                : language === "fr"
                ? "Pause"
                : "Pause"}
            </span>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl text-purple-600 dark:text-purple-400 hover:bg-white dark:hover:bg-gray-700 transition-all hover:scale-110"
              aria-label={language === "fr" ? "Précédent" : "Previous"}
              disabled={currentIndex === 0}
            >
              <FaChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({
                length: Math.max(1, projects.length - itemsPerView + 1),
              }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentIndex === idx
                      ? "bg-purple-600 dark:bg-purple-400 w-4"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl text-purple-600 dark:text-purple-400 hover:bg-white dark:hover:bg-gray-700 transition-all hover:scale-110"
              aria-label={language === "fr" ? "Suivant" : "Next"}
              disabled={currentIndex >= projects.length - itemsPerView}
            >
              <FaChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex gap-10 overflow-x-hidden scroll-smooth px-4"
            style={{
              scrollBehavior: "smooth",
            }}
          >
            {visibleProjects.map((project, index) => {
              const isImage = project.image && project.image.startsWith("/");
              const isExpanded = expanded === currentIndex + index;
              const isHovered = hoveredIndex === currentIndex + index;

              return (
                <div
                  key={project.title}

                  className={`flex-shrink-0 w-full ${
                    itemsPerView === 1
                      ? "md:w-full"
                      : itemsPerView === 2
                      ? "md:w-1/2"
                      : "lg:w-1/3"
                  }`}
                >
                  <div
                    className={`relative group bg-gradient-to-br from-yellow-200/80 via-white to-purple-200/90 dark:from-yellow-900/30 dark:via-gray-800/80 dark:to-purple-900/30 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden h-full flex flex-col ring-1 ring-yellow-200/30 dark:ring-yellow-600/10 hover:-translate-y-2 transition-all duration-300`}
                    onMouseEnter={() => setHoveredIndex(currentIndex + index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Image Container avec overlay animé */}
                    <div
                      className={`h-56 relative overflow-hidden cursor-pointer ${
                        !isImage ? "bg-gradient-to-br " + project.gradient : ""
                      }`}
                      onClick={() => handleExpand(currentIndex + index)}
                    >
                      {isImage && (
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{ backgroundImage: `url(${project.image})` }}
                        />
                      )}
                      {!isImage && (
                        <div className="absolute inset-0 flex items-center justify-center text-8xl">
                          {project.image}
                        </div>
                      )}

                      {/* Overlay avec animation de balayage */}
                      <div className="absolute inset-0">
                        {/* Fond sombre */}
                        <div
                          className={`absolute inset-0 bg-black/60 transition-all duration-500 ${
                            isHovered ? "opacity-100" : "opacity-0"
                          }`}
                        />

                        {/* Bouton avec animation de balayage */}
                        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                          <div
                            className={`w-full h-full flex items-center justify-center transform transition-all duration-500 ease-out ${
                              isHovered
                                ? "translate-x-0 opacity-100"
                                : "-translate-x-full opacity-0"
                            }`}
                            style={{
                              transitionDelay: isHovered ? "100ms" : "0ms",
                              background:
                                "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.3), transparent)",
                            }}
                          >
                            <button className="flex items-center gap-3 px-6 py-3 rounded-xl text-lg font-semibold text-white dark:bg-purple-800/90 dark:hover:bg-purple-900/90 bg-yellow-500/90 hover:bg-yellow-600/90 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg border border-purple-400/50">
                              <FaEye className="text-xl" />
                              {language === "fr"
                                ? "Voir les détails"
                                : "View details"}
                            </button>
                          </div>
                        </div>

                        {/* Ligne de balayage */}
                        <div
                          className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500 transform transition-all duration-700 ease-out ${
                            isHovered
                              ? "translate-x-0 opacity-100"
                              : "-translate-x-full opacity-0"
                          }`}
                          style={{
                            transitionDelay: isHovered ? "200ms" : "0ms",
                          }}
                        />
                      </div>
                    </div>

                    {/* Contenu principal (titre + badges + liens) */}
                    <div className="p-4 flex flex-col grow relative">
                      <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors duration-300">
                        {project.title}
                      </h3>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-100/60 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border border-yellow-200/70 dark:border-yellow-800 transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-3 mt-auto">
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-yellow-700 dark:text-yellow-300 border border-yellow-200/70 dark:border-yellow-800 bg-yellow-100/60 dark:bg-yellow-900/20 hover:bg-yellow-200/80 dark:hover:bg-yellow-800/30 transition-all duration-300 hover:translate-x-1"
                          >
                            <FaCode />
                            {language === "fr" ? "Démo" : "Live"}
                          </a>
                        )}
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-purple-700 dark:text-purple-300 border border-purple-200/70 dark:border-purple-800 bg-white/70 dark:bg-gray-900/20 hover:bg-purple-50/70 dark:hover:bg-purple-900/30 transition-all duration-300 hover:translate-x-1"
                        >
                          <FaGithub />
                          {t.projects.viewGithub}
                        </a>
                      </div>
                    </div>

                    {/* Description plein écran */}
                    {isExpanded && (
                      <div className="absolute inset-0 bg-yellow-100/80 text-gray-800 dark:bg-black/90 dark:text-white flex flex-col items-center justify-center px-8 py-6 text-justify transition-all duration-500 z-50">
                        <h3 className="text-3xl font-bold mb-4">
                          {project.title}
                        </h3>
                        <p className="text-lg leading-relaxed mb-8 max-w-md">
                          {project.description}
                        </p>
                        <button
                          onClick={handleClose}
                          className="flex items-center gap-2 px-6 py-2 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition-all duration-300"
                        >
                          <FaTimes />
                          {language === "fr" ? "Fermer" : "Close"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Indicateurs de navigation supplémentaires */}
          <div className="flex justify-center items-center mt-8 gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {currentIndex + 1} /{" "}
              {Math.max(1, projects.length - itemsPerView + 1)}
            </span>
            <div
              className={`w-3 h-3 rounded-full ${
                !isPaused ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {!isPaused
                ? language === "fr"
                  ? "Défilement automatique"
                  : "Auto-scroll"
                : language === "fr"
                ? "En pause"
                : "Paused"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
