import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import data from "../../data/data";
import { FaCode, FaLaptopCode, FaDatabase, FaServer } from "react-icons/fa";
import { FaGear, FaGears } from "react-icons/fa6";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../data/translations";
import ParticleBackground from "../ParticleBackground";

export const Skills = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const skillsCategories = data.skillsCategories;

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <>
      {/* Skills Section */}
      <section
        id="skills"
        data-aos="fade-up"
        data-aos-delay="100"
        className="min-h-screen flex items-center justify-center relative w-full"
      >
        <ParticleBackground density={120} />
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div
          className="w-full relative z-10 px-4 py-10 dark:bg-gray-900/70 bg-white/50"
          style={{
            backgroundImage: "url('/images/bg7.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
            backgroundAttachment: "fixed",
          }}
        >
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-500 via-purple-600 to-pink-600 dark:from-yellow-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              {t.skills.title}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t.skills.subtitle}
            </p>
          </div>

          {/* Compétences par catégorie */}
          <div className="space-y-16">
            {skillsCategories.map((category, catIndex) => (
              <div
                key={category.title}
                data-aos="fade-up"
                data-aos-delay={catIndex * 100 + 300}
                className="bg-gradient-to-br from-purple-400 via-white to-yellow-200 dark:bg-gradient-to-br dark:from-purple-900/20 dark:via-gray-800/20 dark:to-yellow-900/20 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100 flex items-center gap-3">
                  <span className="bg-gradient-to-bl via-purple-600 from-yellow-400/80 to-pink-600 text-white p-3 rounded-xl">
                    {category.title.includes("Langages") && <FaCode />}
                    {category.title.includes("Frontend") && <FaLaptopCode />}
                    {category.title.includes("Backend") && <FaServer />}
                    {category.title.includes("API") && <FaServer />}
                    {category.title.includes("Bases") && <FaDatabase />}
                    {category.title.includes("Outils") && <FaGear />}
                  </span>
                  {t.skills.categories[category.key]}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {category.items.map((skill, skillIndex) => (
                    <div
                      key={skill.name}
                      data-aos="zoom-in"
                      data-aos-delay={skillIndex * 50 + catIndex * 100 + 400}
                      data-aos-duration="600"
                      className="group bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-600 relative overflow-hidden text-center transition-transform duration-300 hover:scale-105"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>

                      <div className="relative mb-4">
                        <skill.icon
                          size={48}
                          className={`${skill.color} mx-auto transition-all duration-300`}
                        />
                        <div className="absolute -inset-2 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                      </div>

                      <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 relative z-10">
                        {skill.name}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
