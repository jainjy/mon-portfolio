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
      className="min-h-screen flex items-center justify-center relative"
    >
      <ParticleBackground density={120} />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-yellow-50/20 to-pink-50/30 dark:from-purple-900/30 dark:via-yellow-900/10 dark:to-pink-900/30"></div>

      <div className="w-full relative z-10 px-4 py-10 dark:bg-gray-900/70 bg-white/50"
              style={{
          backgroundImage: "url('/images/bg6.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          backgroundAttachment: "fixed"
        }}>
        {/* Section Title */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-center mb-16"
        >
          <h2 className="redhawk text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-500 via-purple-600 to-pink-600 dark:from-yellow-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            {t.projects.title}
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-500 via-purple-600 to-pink-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300">{t.projects.subtitle}</p>
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
                className="group bg-gradient-to-br from-yellow-200/80 via-white to-purple-200/90  dark:bg-gradient-to-br dark:from-yellow-900/30 dark:via-gray-800/80 dark:to-purple-900/30 backdrop-blur-sm   rounded-t-xl shadow-2xl overflow-hidden   relative h-full flex flex-col ring-1 ring-yellow-200/30 dark:ring-yellow-600/10 hover:ring-yellow-400/40 transition-all duration-300 hover:-translate-y-2"
              >
                {/* Accent bar avec dégradé jaune */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-yellow-400 via-purple-500 to-yellow-400" />
                
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
                  <div className="absolute inset-0 bg-gradient-to-t from-yellow-600/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                </div>

                <div className="p-8 flex flex-col grow">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors duration-300">
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
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-yellow-50/80 dark:from-gray-800 to-transparent"></div>
                    )}
                  </div>
                  
                  {needsClamp && (
                    <button
                      type="button"
                      onClick={() => toggleExpand(index)}
                      className="mb-3 self-start max-w-fit inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-yellow-800 dark:bg-gray-900/40 dark:text-yellow-200   hover:bg-yellow-200/80 dark:hover:bg-yellow-800/40 transition-all duration-300 active:scale-95"
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
                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-100/60 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border border-yellow-200/70 dark:border-yellow-800 hover:border-yellow-400 hover:bg-yellow-200/80 dark:hover:bg-yellow-800/40 transition-all duration-300 shadow-sm hover:scale-105"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-auto">
                    {project.demo && (
                      <a
                        href={project.demo}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-yellow-700 dark:text-yellow-300 border border-yellow-200/70 dark:border-yellow-800 bg-yellow-100/60 dark:bg-yellow-900/20 hover:bg-yellow-200/80 dark:hover:bg-yellow-800/30 transition-all duration-300 hover:translate-x-1 hover:shadow-lg"
                      >
                        <FaCode />
                        {language === 'fr' ? 'Démo' : 'Live'}
                      </a>
                    )}
                    <a
                      href={project.github}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-purple-700 dark:text-purple-300 border border-purple-200/70 dark:border-purple-800 bg-white/70 dark:bg-gray-900/20 hover:bg-purple-50/70 dark:hover:bg-purple-900/30 transition-all duration-300 hover:translate-x-1 hover:shadow-lg"
                    >
                      <FaGithub className="animate-pulse" />
                      {t.projects.viewGithub}
                    </a>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow-400/20 to-transparent rounded-bl-full"></div>
              </div>
            );
          })}
        </div>

        {/* Bouton Voir Plus avec style jaune amélioré */}
        {visibleCount < projects.length && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleSeeMore}
              data-aos="fade-up"
              data-aos-delay="500"
              className="group relative flex items-center gap-3 px-8 py-3 
                 rounded-2xl font-semibold 
                 text-yellow-900 dark:text-yellow-100
                 bg-gradient-to-r from-yellow-400 to-yellow-500 
                 dark:from-purple-800 dark:via-purple-900 dark:to-purple-400
                 shadow-lg hover:shadow-2xl
                 border border-yellow-300 dark:border-purple-600
                 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {/* Glow effect jaune */}
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-yellow-300/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Animation de fond */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

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