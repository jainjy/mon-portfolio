import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";
import {
  BiCode,
  BiFolderOpen,
  BiHome,
  BiLogoGmail,
  BiUser,
  BiBriefcase, // Import de l'icône pour expériences
} from "react-icons/bi";

// Inline SVG flag icons
const FlagFR = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <clipPath id="flag-circle">
        <circle cx="12" cy="12" r="12" />
      </clipPath>
    </defs>
    <g clipPath="url(#flag-circle)">
      <rect width="24" height="24" fill="#fff" />
      <rect x="0" y="0" width="8" height="24" fill="#002395" />
      <rect x="16" y="0" width="8" height="24" fill="#ED2939" />
    </g>
  </svg>
);

const FlagGB = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <clipPath id="flag-circle-gb">
        <circle cx="12" cy="12" r="12" />
      </clipPath>
    </defs>
    <g clipPath="url(#flag-circle-gb)">
      <rect width="24" height="24" fill="#012169" />
      <path d="M0 0 L24 24" stroke="#FFF" strokeWidth="6" />
      <path d="M24 0 L0 24" stroke="#FFF" strokeWidth="6" />
      <path d="M0 0 L24 24" stroke="#C8102E" strokeWidth="3" />
      <path d="M24 0 L0 24" stroke="#C8102E" strokeWidth="3" />
      <rect x="10" y="0" width="4" height="24" fill="#FFF" />
      <rect x="0" y="10" width="24" height="4" fill="#FFF" />
      <rect x="11" y="0" width="2" height="24" fill="#C8102E" />
      <rect x="0" y="11" width="24" height="2" fill="#C8102E" />
    </g>
  </svg>
);

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [scrolled, setScrolled] = useState(false);
  const [isHome, setIsHome] = useState(true);
  const navRef = useRef(null);
  const langRef = useRef(null);
  const [langOpen, setLangOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  // Ajout de #experience dans les sections surveillées
  const sections = [
    "#home",
    "#about",
    "#skills",
    "#experience",
    "#projects",
    "#contact",
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);

      const homeSection = document.getElementById("home");
      if (homeSection) {
        const homeRect = homeSection.getBoundingClientRect();
        setIsHome(window.scrollY < homeRect.height - 100);
      }

      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const section = document.querySelector(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActive(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Ajout de l'objet Experience dans les liens
  const links = [
    { name: t.nav.home, href: "#home", icon: BiHome },
    { name: t.nav.about, href: "#about", icon: BiUser },
    { name: t.nav.skills, href: "#skills", icon: BiCode },
    { name: t.nav.experience, href: "#experience", icon: BiBriefcase },
    { name: t.nav.projects, href: "#projects", icon: BiFolderOpen },
    { name: t.nav.contact, href: "#contact", icon: BiLogoGmail },
  ];

  const handleClick = (href) => {
    setActive(href);
    setNavOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 m-auto z-[99] transition-all duration-700 ${
        scrolled
          ? "bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl shadow-2xl border-b border-purple-100/50 dark:border-purple-900/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 flex justify-between items-center h-16">
        <motion.div
          className="mongule text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-700 via-purple-500 to-pink-500/80 bg-clip-text text-transparent tracking-widest ml-4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Andrianina
        </motion.div>

        <ul className="hidden lg:flex space-x-2 xl:space-x-4">
          {links.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="whitespace-nowrap"
              >
                <motion.a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(link.href);
                  }}
                  className={`relative px-3 py-2 rounded-xl transition-all duration-300 text-sm flex items-center gap-2 ${
                    active === link.href
                      ? "text-white font-semibold"
                      : !scrolled && isHome
                        ? "text-white hover:text-purple-200"
                        : "text-gray-700 dark:text-white hover:text-purple-600 dark:hover:text-purple-400"
                  }`}
                  animate={{
                    background:
                      active === link.href
                        ? "linear-gradient(135deg, rgba(147, 51, 234, 0.8), rgba(236, 72, 153, 0.8))"
                        : "transparent",
                  }}
                >
                  <IconComponent size={18} />
                  {link.name}
                </motion.a>
              </motion.li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 sm:gap-4 mr-4">
          <div className="relative" ref={langRef}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLangOpen(!langOpen)}
              className="inline-flex items-center gap-1 sm:gap-2 px-2 py-1.5 rounded-full border border-purple-200 dark:border-purple-800 bg-white/70 dark:bg-gray-900/70 text-purple-700 dark:text-purple-300 backdrop-blur text-sm"
            >
              {language === "fr" ? <FlagFR /> : <FlagGB />}
              <span className="hidden sm:inline font-semibold">
                {language.toUpperCase()}
              </span>
              <motion.span animate={{ rotate: langOpen ? 180 : 0 }}>
                ▾
              </motion.span>
            </motion.button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 mt-2 w-36 rounded-xl border border-purple-100 dark:border-purple-800 shadow-2xl bg-white dark:bg-gray-900 z-[100] overflow-hidden"
                >
                  {["fr", "en"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setLangOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-purple-50 dark:hover:bg-purple-900/30 ${language === lang ? "bg-purple-50 dark:bg-purple-900/30 font-bold" : ""}`}
                    >
                      {lang === "fr" ? <FlagFR /> : <FlagGB />}
                      <span>{lang === "fr" ? "Français" : "English"}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleTheme(!isDark)}
            className="p-2 rounded-full bg-purple-100 dark:bg-yellow-900 text-purple-600 dark:text-yellow-400 border-2 border-purple-300 dark:border-yellow-400"
          >
            {isDark ? <FaSun size={20} /> : <FaMoon size={20} />}
          </motion.button>

          <div className="lg:hidden">
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="p-2 text-gray-700 dark:text-white"
            >
              {navOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800"
          >
            <ul className="flex flex-col p-4 space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(link.href);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-xl ${active === link.href ? "bg-purple-100 dark:bg-purple-900 text-purple-600" : "dark:text-white"}`}
                  >
                    <link.icon size={20} />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
