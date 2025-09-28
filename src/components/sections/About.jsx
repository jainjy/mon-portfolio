import React from "react";
import data from "../../data/data";
import { motion } from "framer-motion";
import { FaCode, FaHeart, FaGraduationCap } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../data/translations";

const FormationXp = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const education = data.education[language];

  return (
    <>
      <div className="mt-20 grid md:grid-cols-1 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100 flex items-center gap-3">
            <FaGraduationCap className="text-purple-600 dark:text-purple-400" />
            {t.about.education.title}
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
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-purple-500 dark:border-purple-400"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-full">
                    <edu.icon className="text-purple-600 dark:text-purple-400 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                      {edu.title}
                    </h4>
                    <p className="text-purple-600 dark:text-purple-400 font-medium">
                      {edu.institution} • {edu.period}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      {edu.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export const About = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const interests = data.interests[language];

  const languages = data.languages[language];
  return (
    <>
      {/* About Section */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-20 relative"
        
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/50 dark:to-pink-900/50"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              {t.about.title}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600">{t.about.subtitle}</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {[
              {
                title: t.about.passion.title,
                description: t.about.passion.description,
                icon: FaCode,
                gradient: "from-purple-600 to-pink-600",
                bg: "from-purple-50 to-pink-50",
                border: "border-purple-100",
              },
              {
                title: t.about.innovation.title,
                description: t.about.innovation.description,
                icon: FaHeart,
                gradient: "from-blue-600 to-purple-600",
                bg: "from-blue-50 to-purple-50",
                border: "border-blue-100",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                //initial={{ opacity: 0, scale: 0.95 }}
                data-aos="slide-left"
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`bg-gradient-to-br ${item.bg} dark:from-purple-900 dark:to-pink-900 p-8 rounded-3xl shadow-xl border ${item.border}`}
              >
                <div className="flex items-center mb-6">
                  <div
                    className={`w-14 h-14 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center mr-4`}
                  >
                    <item.icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <FormationXp />

          {/* Langues et Centres d'intérêt */}
          <div className="mt-20 grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
                {t.about.languages}
              </h3>
              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <motion.div
                  data-aos="slide-right"
                    key={index}
                    // initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-800 dark:text-gray-100">
                        {lang.name}
                      </span>
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400 rounded-full text-sm font-medium">
                        {lang.level}
                      </span>
                    </div>
                    <div className="mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
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
              <h3 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
                {t.about.interests}
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
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center"
                  >
                    <interest.icon className="text-4xl mb-3 text-purple-600 dark:text-purple-400" />
                    <span className="text-lg font-medium text-gray-800 dark:text-gray-100">
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
