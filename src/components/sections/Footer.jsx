import { motion } from 'framer-motion'
import React from 'react'
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../data/translations";
import ParticleBackground from '../ParticleBackground';

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <>
      <ParticleBackground density={120} />
      <footer className="bg-gradient-to-r from-gray-100 to-white dark:from-black dark:to-gray-900 text-center py-12 border-t border-gray-200 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="mb-8">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4"
            >
              RAMAMONJISOA Hoelatiana Andrianina
            </motion.h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t.footer.description}
            </p>
          </div>

          <nav aria-label="Footer navigation" className="mb-8">
            <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
              {[
                { name: t.nav.home, href: "#home" },
                { name: t.nav.about, href: "#about" },
                { name: t.nav.skills, href: "#skills" },
                { name: t.nav.projects, href: "#projects" },
                { name: t.nav.contact, href: "#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <motion.a
                    whileHover={{ color: "#a855f7" }}
                    transition={{ duration: 0.3 }}
                    href={link.href}
                    className="block px-3 py-2 text-sm sm:text-base text-gray-600 hover:text-purple-600 dark:text-gray-500 dark:hover:text-purple-400 cursor-pointer"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
