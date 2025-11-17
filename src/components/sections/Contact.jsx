import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ParticleBackground from "../ParticleBackground";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../data/translations";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import ContactForm from "../ContactForm";

export const Contact = ({ mousePosition }) => {
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <>
      {/* Contact Section */}
      <section
        id="contact"
        data-aos="fade-up"
        data-aos-delay="100"
        className="min-h-screen flex items-center justify-center bg-white/10 dark:bg-purple-900/10  px-4 py-10 relative overflow-hidden"
        style={{
          backgroundImage: "url('/images/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay sombre pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-purple-900/40 dark:bg-purple-900/60"></div>

        <ParticleBackground density={100} />

        <div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/50 to-yellow-400/40 blur-3xl pointer-events-none animate-pulse-slow"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 border border-purple-400/40 dark:border-purple-300/30 rotate-45 animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-400/30 dark:bg-yellow-300/20 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-purple-500/30 dark:bg-purple-400/20 transform rotate-45 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-purple-600/40 dark:bg-purple-500/30 rounded-full animate-bounce"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10 bg-transparent">
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-center mb-16"
          >
            <h2 className="redhawk text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-500 via-purple-600 to-pink-600 dark:from-yellow-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              {t.contact.title}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-400 via-yellow-400 to-purple-500 dark:from-purple-300 dark:via-yellow-300 dark:to-purple-400 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-purple-200 dark:text-purple-100">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div
                data-aos="fade-right"
                data-aos-delay="300"
                className="bg-white/10 dark:bg-purple-900/20 backdrop-blur-xl p-8 rounded-3xl border border-purple-300/20 dark:border-purple-400/30 group transition-all duration-300 hover:bg-white/15 dark:hover:bg-purple-900/30 hover:border-purple-300/30 dark:hover:border-purple-400/40"
              >
                <h3 className="text-3xl font-bold text-white dark:text-purple-100 mb-6 group-hover:text-yellow-300 dark:group-hover:text-yellow-200 transition-colors">
                  {t.contact.discussion.title}
                </h3>
                <p className="text-purple-200 dark:text-purple-100 leading-relaxed text-lg mb-6">
                  {t.contact.discussion.description}
                </p>
              </div>

              <div
                data-aos="fade-right"
                data-aos-delay="400"
                className="flex gap-6"
              >
                {[
                  {
                    icon: FaGithub,
                    href: "https://github.com/jainjy",
                    color:
                      "group-hover:text-gray-300 dark:group-hover:text-purple-300",
                    bg: "group-hover:bg-gray-600/20 dark:group-hover:bg-purple-600/30",
                  },
                  {
                    icon: FaLinkedin,
                    href: "https://linkedin.com/in/ramamonjisoa-andrianina",
                    color:
                      "group-hover:text-blue-400 dark:group-hover:text-yellow-300",
                    bg: "group-hover:bg-blue-600/20 dark:group-hover:bg-yellow-600/20",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group w-16 h-16 bg-white/10 dark:bg-purple-900/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white dark:text-purple-100 text-2xl ${social.color} ${social.bg} border border-white/20 dark:border-purple-400/30 group-hover:border-white/40 dark:group-hover:border-purple-300/40 cursor-pointer transition-all duration-300 hover:scale-110`}
                  >
                    <social.icon />
                  </a>
                ))}
              </div>

              <div
                data-aos="fade-right"
                data-aos-delay="500"
                className="bg-white/5 dark:bg-purple-900/15 backdrop-blur-sm p-6 rounded-2xl border border-white/10 dark:border-purple-400/20"
              >
                <h4 className="text-xl font-bold text-white dark:text-purple-100 mb-4">
                  {t.contact.info.title}
                </h4>
                <div className="space-y-3 text-purple-200 dark:text-purple-100">
                  <a
                    className="flex items-center gap-2 hover:text-yellow-300 dark:hover:text-yellow-200 transition-colors"
                    href="mailto:ramamonjisoandrianina@gmail.com"
                  >
                    <HiOutlineMail className="text-purple-400 dark:text-yellow-400 text-lg" />
                    ramamonjisoandrianina@gmail.com
                  </a>
                  <a
                    className="flex items-center gap-2 hover:text-yellow-300 dark:hover:text-yellow-200 transition-colors"
                    href="tel:+261 34 20 219 88"
                  >
                    <HiOutlinePhone className="text-purple-400 dark:text-yellow-400 text-lg" />
                    +261 34 20 219 88
                  </a>
                  <p className="flex items-center gap-2 hover:text-yellow-300 dark:hover:text-yellow-200 transition-colors">
                    <HiOutlineLocationMarker className="text-purple-400 dark:text-yellow-400 text-lg" />
                    Antsirabe, Madagascar
                  </p>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
};
