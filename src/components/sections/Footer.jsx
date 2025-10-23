import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../data/translations";
import ParticleBackground from '../ParticleBackground';

export default function Footer() {
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
      <ParticleBackground density={120} />
      <footer className="bg-gradient-to-r from-purple-400/90 to-yellow-500/70 dark:from-amber-900/20 dark:to-yellow-900/20 text-center py-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="mb-8">
            <h3
              data-aos="fade-up"
              data-aos-delay="100"
              className="azonix text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4"
            >
              RAMAMONJISOA Hoelatiana Andrianina
            </h3>
            <p 
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
            >
              {t.footer.description}
            </p>
          </div>

          <nav 
            data-aos="fade-up"
            data-aos-delay="300"
            aria-label="Footer navigation" 
            className="mb-8"
          >
            <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
              {[
                { name: t.nav.home, href: "#home" },
                { name: t.nav.about, href: "#about" },
                { name: t.nav.skills, href: "#skills" },
                { name: t.nav.projects, href: "#projects" },
                { name: t.nav.contact, href: "#contact" },
              ].map((link, index) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="block px-3 py-2 text-sm sm:text-base text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 cursor-pointer transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div 
            data-aos="fade-up"
            data-aos-delay="400"
            className="border-t border-amber-200 dark:border-amber-700 pt-8"
          >
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}