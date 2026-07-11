import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import data from "../../data/data";
import { FaCode, FaLaptopCode, FaDatabase, FaServer } from "react-icons/fa";
import { FaGear, FaGears } from "react-icons/fa6";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../data/translations";
import ParticleBackground from "../ParticleBackground";
import { useLazyBackgroundImage } from "../../hooks/useLazyBackgroundImage";
import ShinyText from "../ShinyText";
import LogoLoop from "../LogoLoop";

export const Skills = () => {
  const bgImageLoaded = useLazyBackgroundImage("/images/bg1.jpg");
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
            backgroundImage: "url('/images/bg6.jpg')",
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
            <h2 className="redhawk text-5xl md:text-7xl font-bold mb-6">
              <ShinyText
                text={t.skills.title}
                color="#9333ea"
                shineColor="#eab308"
                speed={3}
              />
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t.skills.subtitle}
            </p>
          </div>

          {/* Compétences par catégorie */}
          <div className="space-y-4">
            {skillsCategories.map((category, catIndex) => (
              <div
                key={category.title}
                data-aos="fade-up"
                data-aos-delay={catIndex * 100 + 300}
                className="bg-gradient-to-br from-purple-400 via-white to-yellow-200/50 dark:bg-gradient-to-br dark:from-purple-900/20 dark:via-gray-800/20 dark:to-yellow-900/20 backdrop-blur-sm p-8 rounded-3xl shadow-2xl "
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

                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl">
                  <LogoLoop
                    logos={category.items.map((skill) => ({
                      node: (
                        <div className="relative group/skill flex h-28 min-w-24 items-center justify-center pb-7">
                          <skill.icon
                            size={48}
                            className={`${skill.color} transition-all duration-300 group-hover/skill:drop-shadow-xl`}
                          />
                          <div className="absolute bottom-0 left-1/2 z-50 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 group-hover/skill:translate-y-0 group-hover/skill:opacity-100 pointer-events-none">
                            <div className="bg-gray-800 dark:bg-white text-white dark:text-gray-800 px-3 py-1 rounded-lg whitespace-nowrap text-sm font-semibold shadow-lg">
                              {skill.name}
                            </div>
                          </div>
                        </div>
                      ),
                      title: skill.name,
                      ariaLabel: skill.name,
                    }))}
                    speed={80}
                    direction="left"
                    logoHeight={48}
                    gap={32}
                    pauseOnHover={true}
                    scaleOnHover={true}
                    fadeOut={true}
                    fadeOutColor="#ffffff"
                    className="py-10"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
