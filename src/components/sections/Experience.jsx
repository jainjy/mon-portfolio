import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../data/translations";
import data from "../../data/data";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaLaptop,
  FaBuilding,
  FaTimes,
  FaArrowRight,
} from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";

export const Experience = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const experiences = data.experiences[language];

  const [expandedId, setExpandedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  // Trouver l'expérience sélectionnée pour le modal
  const selectedExp = experiences.find((exp) => exp.id === expandedId);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  // Empêcher le scroll quand le modal est ouvert
  useEffect(() => {
    if (expandedId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [expandedId]);

  const getWorkModeIcon = (mode) => {
    switch (mode) {
      case "remote":
        return <FaLaptop className="text-green-500 text-sm" />;
      case "onsite":
        return <FaBuilding className="text-blue-500 text-sm" />;
      case "hybrid":
        return <FaUserTie className="text-purple-500 text-sm" />;
      default:
        return <FaBriefcase className="text-sm" />;
    }
  };

  const getWorkModeText = (mode) => {
    switch (mode) {
      case "remote":
        return t.experience.status.remote;
      case "onsite":
        return t.experience.status.onsite;
      case "hybrid":
        return t.experience.status.hybrid;
      default:
        return "";
    }
  };

  return (
    <>
      {/* MODAL - Placé en dehors de la grille pour éviter les conflits de layout */}
      {selectedExp && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setExpandedId(null)}
        >
          <div
            className={`relative max-w-4xl w-full max-h-[90vh] overflow-y-auto ${selectedExp.bgColor} border border-white/20 rounded-3xl shadow-2xl p-6 md:p-12 animate-in zoom-in-95 duration-300`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton Fermer */}
            <button
              onClick={() => setExpandedId(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-red-500/20 text-gray-800 dark:text-white transition-colors z-50"
            >
              <FaTimes size={24} />
            </button>

            {/* Contenu Modal */}
            <div className="flex flex-col md:flex-row gap-8 mb-8 mt-4">
              <div
                className={`bg-gradient-to-r ${selectedExp.gradient} p-6 rounded-2xl text-5xl text-white shadow-xl h-fit w-fit`}
              >
                {selectedExp.icon}
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedExp.title}
                </h3>
                <p className="text-2xl text-purple-600 font-semibold">
                  {selectedExp.company}
                </p>
                <div className="flex flex-wrap gap-4 mt-4 text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-2">
                    <FaCalendarAlt /> {selectedExp.duration}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaMapMarkerAlt /> {selectedExp.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-l-4 border-purple-500 pl-4">
                  {language === "fr"
                    ? "Responsabilités & Missions"
                    : "Key Responsibilities"}
                </h4>
                <ul className="space-y-4">
                  {selectedExp.fullDescription.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex gap-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed"
                    >
                      <div className="mt-2 w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-3">
                  {selectedExp.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-xl bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION PRINCIPALE */}
      <section id="experience" className="min-h-screen relative py-20">
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
          <div data-aos="fade-up" className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-500 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t.experience.title}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t.experience.subtitle}
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {experiences.map((exp, index) => {
                const isHovered = hoveredId === exp.id;
                const isCurrent = exp.status === "current";

                return (
                  <div
                    key={exp.id}
                    data-aos="zoom-in"
                    data-aos-delay={index * 100}
                    className="relative h-full"
                    onMouseEnter={() => setHoveredId(exp.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div
                      className={`${exp.bgColor} backdrop-blur-md rounded-3xl shadow-xl overflow-hidden transform transition-all duration-500 h-[420px] flex flex-col group ${isHovered ? "shadow-purple-500/20 -translate-y-2" : ""}`}
                    >
                      <div className="p-8 flex-grow">
                        <div className="flex justify-between items-start mb-6">
                          <div
                            className={`bg-gradient-to-r ${exp.gradient} p-4 rounded-2xl text-3xl text-white shadow-lg`}
                          >
                            {exp.icon}
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {isCurrent && (
                              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-green-500 text-white animate-pulse">
                                {t.experience.status.current}
                              </span>
                            )}
                            <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] bg-white/20 dark:bg-gray-800/50 dark:text-white">
                              {getWorkModeIcon(exp.workMode)}
                              {getWorkModeText(exp.workMode)}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1 group-hover:text-purple-500 transition-colors">
                          {exp.title}
                        </h3>
                        <p className="text-purple-600 font-semibold mb-4">
                          {exp.company}
                        </p>

                        <div className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                          <span className="flex items-center gap-2">
                            <FaCalendarAlt className="text-purple-500" />{" "}
                            {exp.duration}
                          </span>
                          <span className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-purple-500" />{" "}
                            {exp.location}
                          </span>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                          {exp.shortDescription}
                        </p>
                      </div>

                      <div className="p-8 pt-0">
                        <button
                          onClick={() => setExpandedId(exp.id)}
                          className="w-full py-4 px-6 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-white font-bold transition-all duration-300 flex items-center justify-center gap-3 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white hover:shadow-lg hover:shadow-purple-500/30 group/btn"
                        >
                          {language === "fr"
                            ? "Voir les détails"
                            : "View details"}
                          <FaArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
