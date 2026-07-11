import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import data from "../../data/data";
import { FaCode, FaHeart, FaGraduationCap, FaTasks } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../data/translations";
import { FaLanguage } from "react-icons/fa6";
import MagicBento from "../MagicBento";
import ShinyText from "../ShinyText";

const FormationXp = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const education = data.education[language];

  return (
    <div className="mt-20" data-aos="fade-up" data-aos-delay="100">
      <h3 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100 flex items-center gap-3">
        <FaGraduationCap className="text-purple-600 dark:text-purple-400" />
        {t.about.education.title}
      </h3>

      <div data-aos="fade-up" data-aos-delay="180">
        <MagicBento
          items={education.map((edu, index) => ({
            color: "rgba(18, 15, 23, 0.6)",
            content: (
              <div
                className="flex h-full items-start gap-4"
                data-aos="zoom-in"
                data-aos-delay={index * 100 + 250}
              >
                <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-purple-900/50">
                  <edu.icon className="text-2xl text-yellow-400/80 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-100">
                    {edu.title}
                  </h4>
                  <p className="mt-2 font-medium text-purple-300">
                    {edu.institution} • {edu.period}
                  </p>
                  <p className="mt-3 text-gray-300 leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </div>
            ),
          }))}
          enableSpotlight={true}
          enableStars={true}
          enableTilt={false}
          clickEffect={true}
          enableMagnetism={true}
          spotlightRadius={250}
          glowColor="132, 0, 255"
          gridClassName="grid-cols-1 md:grid-cols-2 gap-4"
        />
      </div>
    </div>
  );
};

export const About = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const interests = data.interests[language];
  const languages = data.languages[language];

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <>
      {/* About Section */}
      <section
        id="about"
        data-aos="fade-up"
        data-aos-delay="50"
        className="min-h-screen flex items-center justify-center  px-0 relative overflow-hidden"
      >
        <div
          className="w-full relative z-10 bg-white/50 dark:bg-gray-900/80 px-4 py-10"
          style={{
            backgroundImage: "url('/images/bg6.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            backgroundBlendMode: "overlay",
          }}
        >
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-center mb-16"
          >
            <h2 className="redhawk text-5xl md:text-7xl font-bold mb-6">
              <ShinyText
                text={t.about.title}
                color="#9333ea"
                shineColor="#eab308"
                speed={3}
              />
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              {t.about.subtitle}
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="180">
            <MagicBento
              items={[
                {
                  title: t.about.passion.title,
                  description: t.about.passion.description,
                  icon: FaCode,
                },
                {
                  title: t.about.innovation.title,
                  description: t.about.innovation.description,
                  icon: FaHeart,
                },
              ].map((item, index) => ({
                color: "rgba(18, 15, 23, 0.6)",
                content: (
                  <div
                    className="flex h-full flex-col gap-5"
                    data-aos={index === 0 ? "fade-right" : "fade-left"}
                    data-aos-delay={index * 100 + 220}
                    data-aos-duration="600"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-yellow-500/80">
                        <item.icon className="text-2xl text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-100">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-lg leading-relaxed text-gray-300">
                      {item.description}
                    </p>
                  </div>
                ),
              }))}
              enableSpotlight={true}
              enableStars={true}
              enableTilt={false}
              clickEffect={true}
              enableMagnetism={true}
              spotlightRadius={250}
              glowColor="132, 0, 255"
              gridClassName="grid-cols-1 md:grid-cols-2 gap-4"
            />
          </div>

          <FormationXp />

          {/* Langues et Centres d'intérêt */}
          <div className="mt-20">
            <div data-aos="fade-up" data-aos-delay="100" className="mb-12">
              <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
                {t.about.languages} & {t.about.interests}
              </h3>
            </div>

            {/* Languages Section */}
            <div data-aos="fade-up" data-aos-delay="200" className="mb-16">
              <div className="flex items-center mb-8">
                <div
                  className={`w-14 bg-gradient-to-r  rounded-full flex items-center justify-center`}
                >
                  <FaLanguage className="text-purple-700 dark:text-purple-400 text-3xl" />
                </div>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-100 ml-4">
                  {t.about.languages}
                </h4>
              </div>
              <MagicBento
                items={languages.map((lang, index) => ({
                  color: "rgba(18, 15, 23, 0.6)",
                  content: (
                    <div
                      className="flex flex-col gap-3"
                      data-aos="zoom-in"
                      data-aos-delay={index * 80 + 260}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-gray-100">
                          {lang.name}
                        </span>
                        <span className="px-3 py-1 bg-yellow-400/40 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400 rounded-full text-sm font-medium">
                          {lang.level}
                        </span>
                      </div>
                      <div className="mt-2 bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-purple-500/90 to-yellow-400/90 h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width:
                              lang.level === "Courant"
                                ? "90%"
                                : lang.level === "Débutant"
                                  ? "40%"
                                  : "100%",
                          }}
                        ></div>
                      </div>
                    </div>
                  ),
                }))}
                enableSpotlight={true}
                enableStars={true}
                enableTilt={false}
                clickEffect={true}
                enableMagnetism={true}
                spotlightRadius={250}
                glowColor="132, 0, 255"
                gridClassName="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              />
            </div>

            {/* Interests Section */}
            <div data-aos="fade-up" data-aos-delay="300">
              <div className="flex items-center mb-8">
                <div
                  className={`w-14 bg-gradient-to-r rounded-full flex items-center justify-center`}
                >
                  <FaTasks className="text-purple-700 dark:text-purple-400 text-3xl" />
                </div>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-100 ml-4">
                  {t.about.interests}
                </h4>
              </div>
              <MagicBento
                items={interests.map((interest, index) => ({
                  color: "rgba(18, 15, 23, 0.6)",
                  content: (
                    <div
                      className="flex flex-col items-center justify-center text-center gap-3 h-full"
                      data-aos="zoom-in"
                      data-aos-delay={index * 80 + 340}
                    >
                      <interest.icon className="text-4xl text-yellow-400/80 dark:text-purple-400" />
                      <span className="text-lg font-medium text-gray-100">
                        {interest.name}
                      </span>
                    </div>
                  ),
                }))}
                enableSpotlight={true}
                enableStars={true}
                enableTilt={false}
                clickEffect={true}
                enableMagnetism={true}
                spotlightRadius={250}
                glowColor="132, 0, 255"
                gridClassName="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
