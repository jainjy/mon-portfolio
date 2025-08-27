import { motion } from "framer-motion";
import React, { useState } from "react";
import data from "../../data/data";
import { FaGithub, FaCode } from "react-icons/fa";

export const Projects = () => {
  const projects = data.projects;
  const initialCount = 3; // nombre de projets affichés initialement
  const [visibleCount, setVisibleCount] = useState(initialCount);

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
      className="min-h-screen flex items-center justify-center bg-white px-4 py-20 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-pink-50/30"></div>

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
            Mes projets
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600">
            Découvrez mes réalisations les plus récentes
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.slice(0, visibleCount).map((project, index) => {
            const isImage = project.image && project.image.startsWith("/");

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="group bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative"
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

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed text-base">
                    {project.description}
                  </p>

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

                  <div className="flex gap-4">
                    <motion.a
                      href={project.github}
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium px-4 py-2 rounded-lg hover:bg-purple-50 cursor-pointer"
                    >
                      <FaGithub className="animate-pulse" />
                      GitHub
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
          <div className="text-center mt-10">
            <button
              onClick={handleSeeMore}
              className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors"
            >
              Voir plus
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
};
