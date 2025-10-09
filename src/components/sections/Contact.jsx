import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ParticleBackground from "../ParticleBackground";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../data/translations";
import {
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineLocationMarker,
} from "react-icons/hi";
import {
    FaGithub,
    FaLinkedin,
} from "react-icons/fa";
import ContactForm from '../ContactForm';

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
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 px-4 py-20 relative overflow-hidden"
        style={{
          backgroundImage: "url('/images/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          backgroundAttachment: "fixed"
        }}
      >
        {/* Overlay sombre pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>
        
        <ParticleBackground density={100} />

        <div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/40 to-pink-500/40 blur-3xl pointer-events-none animate-pulse-slow"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        />

        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-20 left-10 w-20 h-20 border border-purple-400/30 rotate-45 animate-float"
          ></div>
          <div
            className="absolute top-40 right-20 w-16 h-16 bg-pink-500/20 rounded-full animate-float-delayed"
          ></div>
          <div
            className="absolute bottom-40 left-20 w-12 h-12 bg-blue-500/20 transform rotate-45 animate-pulse"
          ></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              {t.contact.title}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-purple-200">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div
                data-aos="fade-right"
                data-aos-delay="300"
                className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 dark:border-gray-700/20 group transition-all duration-300 hover:bg-white/15"
              >
                <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-purple-300 transition-colors">
                  {t.contact.discussion.title}
                </h3>
                <p className="text-purple-200 leading-relaxed text-lg mb-6">
                  {t.contact.discussion.description}
                </p>
                <div className="flex items-center gap-4 text-purple-300">
                  <div
                    className="w-2 h-2 bg-green-400 rounded-full animate-ping-slow"
                  ></div>
                  <span>{t.contact.discussion.status}</span>
                </div>
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
                    color: "group-hover:text-gray-300",
                    bg: "group-hover:bg-gray-600/20",
                  },
                  {
                    icon: FaLinkedin,
                    href: "https://linkedin.com/in/ramamonjisoa-andrianina",
                    color: "group-hover:text-blue-400",
                    bg: "group-hover:bg-blue-600/20",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white text-2xl ${social.color} ${social.bg} border border-white/20 group-hover:border-white/40 cursor-pointer transition-all duration-300 hover:scale-110`}
                  >
                    <social.icon />
                  </a>
                ))}
              </div>

              <div
                data-aos="fade-right"
                data-aos-delay="500"
                className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10"
              >
                <h4 className="text-xl font-bold text-white mb-4">
                  {t.contact.info.title}
                </h4>
                <div className="space-y-3 text-purple-200">
                  <a className="flex items-center gap-2 hover:text-white transition-colors" href='mailto:ramamonjisoandrianina@gmail.com'>
                    <HiOutlineMail className="text-purple-400 text-lg" />
                    ramamonjisoandrianina@gmail.com
                  </a>
                  <a className="flex items-center gap-2 hover:text-white transition-colors" href='tel:+261 34 20 219 88'>
                    <HiOutlinePhone className="text-purple-400 text-lg" />
                    +261 34 20 219 88
                  </a>
                  <p className="flex items-center gap-2">
                    <HiOutlineLocationMarker className="text-purple-400 text-lg" />
                  Antsirabe, Madagascar
                  </p>
                </div>
              </div>
            </div>

            <ContactForm/>
          </div>
        </div>
      </section>
    </>
  );
};