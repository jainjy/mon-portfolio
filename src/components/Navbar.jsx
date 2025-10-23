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
} from "react-icons/bi";

// Inline SVG flag icons to avoid emoji rendering issues on some platforms
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

// Composant Navbar amélioré avec animations Framer Motion
const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [scrolled, setScrolled] = useState(false);
  const [isHome, setIsHome] = useState(true);
  const navRef = useRef(null);
  const langRef = useRef(null);
  const [langOpen, setLangOpen] = useState(false);
  const { isDark, setIsDark } = useTheme();
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  const sections = ["#home", "#about", "#skills", "#projects", "#contact"];

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

  const links = [
    { name: t.nav.home, href: "#home", icon: BiHome },
    { name: t.nav.about, href: "#about", icon: BiUser },
    { name: t.nav.skills, href: "#skills", icon: BiCode },
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
      className={`fixed w-full z-[99] transition-all duration-700 ${
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl border-b border-purple-100/50 dark:border-purple-900/50"
          : "bg-transparent"
      }`}
    >
      {/* Ajuster le padding et la largeur max */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 flex justify-between items-center h-16">
        {/* Logo avec taille réduite sur mobile */}
        <motion.div
          className="mongule text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-700 via-purple-500 to-pink-500/80 bg-clip-text text-transparent"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Andrianina
        </motion.div>

        {/* Modifier le breakpoint de md: à lg: et ajuster l'espacement */}
        <ul className="hidden lg:flex space-x-4 xl:space-x-8">
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
                  onClick={() => handleClick(link.href)}
                  className={`relative px-3 sm:px-4 py-2 rounded transition-all duration-300 text-sm sm:text-base flex items-center gap-2 ${
                    active === link.href
                      ? "text-white font-semibold"
                      : !scrolled && isHome
                      ? "text-white hover:text-purple-200"
                      : "text-gray-700 dark:text-white hover:text-purple-600 dark:hover:text-purple-400"
                  }`}
                  animate={{
                    background:
                      active === link.href
                        ? "linear-gradient(135deg, rgba(147, 51, 234, 0.8), rgba(236, 72, 153, 0.8),rgba(255,255,0,0.7))"
                        : "transparent",
                  }}
                  whileHover={{
                    background:
                      active === link.href
                        ? "linear-gradient(135deg, rgba(147, 51, 234, 0.9), rgba(236, 72, 153, 0.9))"
                        : "rgba(147, 51, 234, 0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <IconComponent
                    size={18}
                    className={active === link.href ? "text-white" : ""}
                  />
                  {link.name}
                  <motion.span
                    className={`absolute -bottom-1.5 left-0 w-full h-0.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500`}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                      scaleX: active === link.href ? 1 : 0,
                      opacity: active === link.href ? 1 : 0,
                    }}
                    whileHover={{
                      scaleX: 1,
                      opacity: 1,
                      boxShadow: "0 0 8px rgba(168, 85, 247, 0.5)",
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                    style={{
                      filter:
                        active === link.href
                          ? "drop-shadow(0 0 2px rgba(168, 85, 247, 0.5))"
                          : "none",
                    }}
                  ></motion.span>
                </motion.a>
              </motion.li>
            );
          })}
        </ul>

        {/* Ajuster l'espacement des boutons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative" ref={langRef}>
            {/* Réduire la taille du bouton de langue sur mobile */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLangOpen(!langOpen)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-full border border-purple-200 dark:border-purple-800 bg-white/70 dark:bg-gray-900/70 text-purple-700 dark:text-purple-300 backdrop-blur text-sm sm:text-base"
            >
              {language === "fr" ? (
                <FlagFR className="w-5 h-5 rounded-[2px]" />
              ) : (
                <FlagGB className="w-5 h-5 rounded-[2px]" />
              )}
              <span className="hidden sm:inline font-semibold">
                {language.toUpperCase()}
              </span>
              <motion.span
                animate={{ rotate: langOpen ? 180 : 0 }}
                className="ml-1 text-xs"
              >
                ▾
              </motion.span>
            </motion.button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-36 rounded-xl border border-purple-100 dark:border-purple-800 shadow-2xl bg-white dark:bg-gray-900 z-[100] overflow-hidden"
                >
                  <button
                    onClick={() => {
                      setLanguage("fr");
                      setLangOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-purple-50 dark:hover:bg-purple-900/30 ${
                      language === "fr"
                        ? "bg-purple-50 dark:bg-purple-900/30 font-semibold"
                        : ""
                    }`}
                    role="option"
                    aria-selected={language === "fr"}
                  >
                    <FlagFR className="w-5 h-5 rounded-[2px]" />
                    <span>Français</span>
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("en");
                      setLangOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-purple-50 dark:hover:bg-purple-900/30 ${
                      language === "en"
                        ? "bg-purple-50 dark:bg-purple-900/30 font-semibold"
                        : ""
                    }`}
                    role="option"
                    aria-selected={language === "en"}
                  >
                    <FlagGB className="w-5 h-5 rounded-[2px]" />
                    <span>English</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full bg-purple-100 dark:bg-yellow-900 text-purple-600 dark:text-yellow-400 border-2 border-purple-300 dark:border-yellow-400 transition-all duration-300"
          >
            {isDark ? <FaSun size={20} /> : <FaMoon size={20} />}
          </motion.button>

          {/* Modifier le breakpoint du menu burger */}
          <div className="lg:hidden">
            <button
              onClick={() => setNavOpen(!navOpen)}
              className={`focus:outline-none p-2 rounded-lg transition-all duration-300 ${
                !scrolled && isHome
                  ? "text-white hover:bg-white/20"
                  : "text-gray-700 dark:text-white hover:bg-purple-50 dark:hover:bg-purple-900/20"
              }`}
            >
              <motion.div
                animate={{ rotate: navOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {navOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Modifier le breakpoint du menu mobile */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:hidden fixed top-16 left-0 w-full bg-white/90 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl rounded-b-2xl"
          >
            <ul className="flex flex-col items-center py-6 space-y-4">
              {links.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <motion.li
                    key={link.name}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => handleClick(link.href)}
                      className={`text-gray-700 dark:text-white px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-3 ${
                        active === link.href
                          ? "bg-gradient-to-r from-purple-300 to-yellow-200 dark:from-purple-900 dark:to-pink-900 text-purple-600 dark:text-purple-400 font-semibold"
                          : "hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 hover:text-purple-600 dark:hover:text-purple-400"
                      }`}
                    >
                      <IconComponent
                        size={20}
                        className={
                          active === link.href
                            ? "text-purple-600 dark:text-purple-400"
                            : ""
                        }
                      />
                      {link.name}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
export default Navbar;
