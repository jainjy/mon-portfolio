import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import data from "../../data/data";
import { FaGithub, FaCode, FaArrowDown, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../data/translations";
import ParticleBackground from "../ParticleBackground";

export const Projects = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const projects = data.projects[language];
  const initialCount = 3;
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [expanded, setExpanded] = useState({});
  const toggleExpand = (i) => setExpanded((prev) => ({ ...prev, [i]: !prev[i] }));

  const handleSeeMore = () => {
    setVisibleCount(projects.length);
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <section
      id="projects"
      data-aos="fade-up"
      data-aos-delay="100"
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-20 relative"
    >
      <ParticleBackground density={120} />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-pink-50/30 dark:from-purple-900/30 dark:to-pink-900/30"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            {t.projects.title}
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600">{t.projects.subtitle}</p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.slice(0, visibleCount).map((project, index) => {
            const isImage = project.image && project.image.startsWith("/");
            const isExpanded = !!expanded[index];
            const needsClamp = project.description && project.description.length > 180;

            return (
              <div
                key={project.title}
                data-aos="fade-up"
                data-aos-delay={index * 100 + 300}
                className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 relative h-full flex flex-col ring-1 ring-gray-200/60 dark:ring-white/10 hover:ring-purple-300/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Accent bar */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-60" />
                
                {/* Image/Emoji zone */}
                <div
                  className={`h-56 relative overflow-hidden ${
                    !isImage ? "bg-gradient-to-br " + project.gradient : ""
                  }`}
                >
                  {isImage && (
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/5"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                  {!isImage && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-8xl transition-transform duration-500 group-hover:scale-110">
                        {project.image}
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white text-2xl border border-white/30">
                      <FaCode />
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                </div>

                <div className="p-8 flex flex-col grow">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <div className="relative mb-4">
                    <p
                      className="text-gray-600 dark:text-gray-300 leading-relaxed text-base"
                      style={!isExpanded && needsClamp ? { display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' } : undefined}
                    >
                      {project.description}
                    </p>
                    {!isExpanded && needsClamp && (
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white dark:from-gray-800 to-transparent"></div>
                    )}
                  </div>
                  
                  {needsClamp && (
                    <button
                      type="button"
                      onClick={() => toggleExpand(index)}
                      className="mb-3 self-start max-w-fit inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50/60 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200/70 dark:border-purple-800 hover:bg-purple-100/70 dark:hover:bg-purple-900/50 transition-all duration-300 active:scale-95"
                    >
                      <span>{isExpanded ? (language === 'fr' ? 'Voir moins' : 'Show less') : (language === 'fr' ? 'Voir plus' : 'Show more')}</span>
                      {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  )}

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={tech}
                        data-aos="fade-right"
                        data-aos-delay={techIndex * 50}
                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/70 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border border-gray-200/70 dark:border-gray-700 hover:border-purple-300 hover:bg-purple-50/60 dark:hover:bg-purple-900/20 transition-all duration-300 shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-auto">
                    {project.demo && (
                      <a
                        href={project.demo}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 border border-blue-200/70 dark:border-blue-800 bg-white/70 dark:bg-gray-900/20 hover:bg-blue-50/70 dark:hover:bg-blue-900/30 transition-all duration-300 hover:translate-x-1"
                      >
                        <FaCode />
                        {language === 'fr' ? 'Démo' : 'Live'}
                      </a>
                    )}
                    <a
                      href={project.github}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-purple-700 dark:text-purple-300 border border-purple-200/70 dark:border-purple-800 bg-white/70 dark:bg-gray-900/20 hover:bg-purple-50/70 dark:hover:bg-purple-900/30 transition-all duration-300 hover:translate-x-1"
                    >
                      <FaGithub className="animate-pulse" />
                      {t.projects.viewGithub}
                    </a>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full"></div>
              </div>
            );
          })}
        </div>

        {/* Bouton Voir Plus */}
        {visibleCount < projects.length && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleSeeMore}
              data-aos="fade-up"
              data-aos-delay="500"
              className="group relative flex items-center gap-3 px-8 py-3 
                 rounded-2xl font-semibold 
                 text-gray-800 dark:text-gray-100
                 bg-gradient-to-r from-gray-100 to-gray-200 
                 dark:from-gray-800 dark:to-gray-700
                 shadow-md hover:shadow-lg
                 border border-gray-200 dark:border-gray-600
                 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {/* Glow effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Texte */}
              <span className="relative z-10">{t.projects.seeMore}</span>

              {/* Icône animée */}
              <span className="relative z-10 animate-bounce">
                <FaArrowDown className="text-lg group-hover:rotate-180 transition-transform duration-500" />
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};