import React from "react";
import data from "../data/data";
import { motion } from "framer-motion";
import { FaCode, FaHeart, FaGraduationCap } from "react-icons/fa";
const FormationXp=()=>{
    const education=data.education
    return <>
              {/* Formation et Expérience */}
              <div className="mt-20 grid md:grid-cols-1 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
                <FaGraduationCap className="text-purple-600" />
                Formation
              </h3>
              <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.2 }}
                    className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-100 p-3 rounded-full">
                        <edu.icon className="text-purple-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-800">
                          {edu.title}
                        </h4>
                        <p className="text-purple-600 font-medium">
                          {edu.institution} • {edu.period}
                        </p>
                        <p className="text-gray-600 mt-2">{edu.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
    </>
}
export const About = () => {

  const interests = data.interests;

  const languages = data.languages;
  return (
    <>
      {/* About Section */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex items-center justify-center bg-white px-4 py-20 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              À propos de moi
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600">
              Découvrez mon parcours et ma passion
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {[
                {
                  title: "Passion pour le code",
                  description:
                    "Développeur web passionné avec une solide formation en génie logiciel. J'aime résoudre des problèmes complexes et créer des applications innovantes qui améliorent la vie des utilisateurs.",
                  icon: FaCode,
                  gradient: "from-purple-600 to-pink-600",
                  bg: "from-purple-50 to-pink-50",
                  border: "border-purple-100",
                },
                {
                  title: "Innovation & Créativité",
                  description:
                    "Chaque projet est une nouvelle aventure. Je m'efforce de rester à la pointe des technologies et d'apporter une approche créative à chaque défi, comme en témoignent mes nombreux projets personnels.",
                  icon: FaHeart,
                  gradient: "from-blue-600 to-purple-600",
                  bg: "from-blue-50 to-purple-50",
                  border: "border-blue-100",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`bg-gradient-to-br ${item.bg} p-8 rounded-3xl shadow-xl border ${item.border}`}
                >
                  <div className="flex items-center mb-6">
                    <div
                      className={`w-14 h-14 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center mr-4`}
                    >
                      <item.icon className="text-white text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, rotate: 3 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              whileHover={{ rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative w-full h-96 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-3xl shadow-2xl group">
                <div className="absolute inset-4 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
                  <div className="text-center p-8">
                    <motion.div
                      className="text-8xl mb-6"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      👨‍💻
                    </motion.div>
                    <h4 className="text-3xl font-bold text-gray-800 mb-4">
                      RAMAMONJISOA Hoelatiana Andrianina
                    </h4>
                    <p className="text-gray-600 text-lg">
                      Développeur Web Full Stack
                    </p>
                    <div className="mt-6 flex justify-center space-x-4">
                      <motion.div
                        className="w-3 h-3 bg-red-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      ></motion.div>
                      <motion.div
                        className="w-3 h-3 bg-yellow-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: 0.2,
                        }}
                      ></motion.div>
                      <motion.div
                        className="w-3 h-3 bg-green-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: 0.4,
                        }}
                      ></motion.div>
                    </div>
                  </div>
                </div>
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-30"
                  initial={{ opacity: 0.3 }}
                  whileHover={{ opacity: 0.5 }}
                  transition={{ duration: 0.7 }}
                ></motion.div>
              </div>
            </motion.div>
          </div>
          <FormationXp/>

          {/* Langues et Centres d'intérêt */}
          <div className="mt-20 grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold mb-8 text-gray-800">Langues</h3>
              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-md"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-800">
                        {lang.name}
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {lang.level}
                      </span>
                    </div>
                    <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{
                          width:
                            lang.level === "Courant"
                              ? "90%"
                              : lang.level === "Débutant"
                              ? "40%"
                              : "100%",
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      ></motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold mb-8 text-gray-800">
                Centres d'intérêt
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {interests.map((interest, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center"
                  >
                    <interest.icon className="text-4xl mb-3 text-purple-600" />
                    <span className="text-lg font-medium text-gray-800">
                      {interest.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
};
