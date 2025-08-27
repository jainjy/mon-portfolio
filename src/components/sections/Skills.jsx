import { motion } from "framer-motion";
import React from "react";
import data from "../../data/data";
import {
  FaCode,
  FaLaptopCode,
  FaDatabase,
  FaServer,
} from "react-icons/fa";
import { FaGear, FaGears } from "react-icons/fa6";
export const Skills = () => {

  const skillsCategories = data.skillsCategories;
  return (
    <>
      {/* Skills Section */}
      <motion.section
        id="skills"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-10 relative w-full"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="w-full relative z-10 mx-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Mes compétences
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600">
              Technologies que je maîtrise avec passion
            </p>
          </motion.div>

          {/* Compétences par catégorie */}
          <div className="space-y-16">
            {skillsCategories.map((category, catIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100 flex items-center gap-3">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-xl">
                    {category.title.includes("Langages") && <FaCode />}
                    {category.title.includes("Frontend") && <FaLaptopCode />}
                    {category.title.includes("Backend") && <FaServer />}
                    {category.title.includes("API") && <FaServer />}
                    {category.title.includes("Bases") && <FaDatabase />}
                    {category.title.includes("Outils") && <FaGear />}
                  </span>
                  {category.title}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {category.items.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                      className="group bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-600 relative overflow-hidden text-center"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 scale-x-0 origin-left"
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.5 }}
                      ></motion.div>

                      <div className="relative mb-4">
                        <skill.icon
                          size={48}
                          className={`${skill.color} mx-auto transition-all duration-300`}
                        />
                        <motion.div
                          className="absolute -inset-2 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-lg opacity-0"
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        ></motion.div>
                      </div>

                      <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                        {skill.name}
                      </h4>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
};
