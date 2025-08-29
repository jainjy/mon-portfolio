import { motion } from "framer-motion";
import React, { useState } from "react";
import data from "../../data/data";
import { FaGithub, FaCode, FaArrowDown, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../data/translations";
import ParticleBackground from "../ParticleBackground";

export const Projects = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const projects = data.projects[language]; // Utiliser les projets selon la langue
  const initialCount = 3; // nombre de projets affichés initialement
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [expanded, setExpanded] = useState({});
  const toggleExpand = (i) => setExpanded((prev) => ({ ...prev, [i]: !prev[i] }));

  const handleSeeMore = () => {
    setVisibleCount(projects.length); // afficher tous les projets
  };

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-20 relative"
    >
      <ParticleBackground density={120} />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-pink-50/30 dark:from-purple-900/30 dark:to-pink-900/30"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            {t.projects.title}
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600">{t.projects.subtitle}</p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.slice(0, visibleCount).map((project, index) => {
            const isImage = project.image && project.image.startsWith("/");
            const isExpanded = !!expanded[index];
            const needsClamp = project.description && project.description.length > 180;

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ y: -6, boxShadow: '0 12px 35px rgba(168,85,247,0.18)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
                layout
                className="group bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 relative h-full flex flex-col"
              >
                {/* Image/Emoji zone */}
                <div
                  className={`h-64 relative overflow-hidden ${
                    !isImage ? "bg-gradient-to-br " + project.gradient : ""
                  }`}
                >
                  {isImage && (
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                  )}
                  <motion.div
                    className="absolute inset-0 bg-black/10"
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                  {!isImage && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="text-8xl"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {project.image}
                      </motion.div>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white text-2xl border border-white/30">
                      <FaCode />
                    </div>
                  </div>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-purple-600/30 to-transparent opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                </div>

                <div className="p-8 flex flex-col grow">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <motion.div layout className="relative mb-4">
                    <p
                      className="text-gray-600 dark:text-gray-300 leading-relaxed text-base"
                      style={!isExpanded && needsClamp ? { display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' } : undefined}
                    >
                      {project.description}
                    </p>
                    {!isExpanded && needsClamp && (
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white dark:from-gray-800 to-transparent"></div>
                    )}
                  </motion.div>
                  {needsClamp && (
                    <motion.button
                      type="button"
                      onClick={() => toggleExpand(index)}
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ scale: 1.02 }}
                      className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                    >
                      <span>{isExpanded ? (language === 'fr' ? 'Voir moins' : 'Show less') : (language === 'fr' ? 'Voir plus' : 'Show more')}</span>
                      {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                    </motion.button>
                  )}

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: techIndex * 0.1,
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200 group-hover:from-purple-100 group-hover:to-pink-100 transition-colors duration-300"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-auto">
                    <motion.a
                      href={project.github}
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium px-4 py-2 rounded-lg hover:bg-purple-50 cursor-pointer"
                    >
                      <FaGithub className="animate-pulse" />
                      {t.projects.viewGithub}
                    </motion.a>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Bouton Voir Plus */}
        {visibleCount < projects.length && (
          <div className="mt-12 flex justify-center">
            <motion.button
              onClick={handleSeeMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="group relative flex items-center gap-3 px-8 py-3 
                 rounded-2xl font-semibold 
                 text-gray-800 dark:text-gray-100
                 bg-gradient-to-r from-gray-100 to-gray-200 
                 dark:from-gray-800 dark:to-gray-700
                 shadow-md hover:shadow-lg
                 border border-gray-200 dark:border-gray-600
                 overflow-hidden"
            >
              {/* Glow effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Texte */}
              <span className="relative z-10">{t.projects.seeMore}</span>

              {/* Icône animée */}
              <motion.span
                className="relative z-10"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <FaArrowDown className="text-lg group-hover:rotate-180 transition-transform duration-500" />
              </motion.span>
            </motion.button>
          </div>
        )}
        
      </div>
      
    </motion.section>
  );
};
