import { motion } from 'framer-motion'
import React from 'react'
import data from '../../data/data';
import {
    FaGithub,
    FaCode,
  } from "react-icons/fa";
  
export const Projects = () => {
const projects =data.projects;
  return (
    <>
          {/* Projects Section */}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="group bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative"
              >
                <div
                  className={`h-64 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
                >
                  <motion.div
                    className="absolute inset-0 bg-black/10"
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                  <motion.div
                    className="absolute top-4 right-4 w-20 h-20 border-2 border-white/30 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  ></motion.div>
                  <motion.div
                    className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-lg transform rotate-45"
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.7 }}
                  ></motion.div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="text-8xl"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {project.image}
                    </motion.div>
                  </div>

                  <div className="absolute bottom-4 left-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white text-2xl border border-white/30">
                      <FaCode />
                    </div>
                  </div>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0"
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
                        transition={{ duration: 0.3, delay: techIndex * 0.1 }}
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
            ))}
          </div>
        </div>
      </motion.section></>
  )
}
