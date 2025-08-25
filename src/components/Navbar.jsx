import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

// Composant Navbar amélioré avec animations Framer Motion
const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [scrolled, setScrolled] = useState(false);
  const [isHome, setIsHome] = useState(true);
  const navRef = useRef(null);

  const sections = ["#home", "#about", "#skills", "#projects", "#contact"];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
      
      const homeSection = document.getElementById('home');
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
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActive(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Accueil", href: "#home" },
    { name: "À propos", href: "#about" },
    { name: "Compétences", href: "#skills" },
    { name: "Projets", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const handleClick = (href) => {
    setActive(href);
    setNavOpen(false);
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
          ? "bg-white/90 backdrop-blur-xl shadow-2xl border-b border-purple-100/50" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <motion.div 
          className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Andrianina
        </motion.div>

        <ul className="hidden md:flex space-x-8">
          {links.map((link, index) => (
            <motion.li 
              key={link.name} 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a
                href={link.href}
                onClick={() => handleClick(link.href)}
                className={`relative px-3 py-2 ${
                  !scrolled && isHome ? 'text-white' : 'text-gray-700'
                } hover:text-purple-600 transition-all duration-300 group ${
                  active === link.href ? "text-purple-600 font-semibold" : ""
                }`}
              >
                {link.name}
                <motion.span 
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: active === link.href ? 1 : 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                ></motion.span>
                <motion.span 
                  className="absolute inset-0 bg-purple-100/20 rounded-lg -z-10"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                ></motion.span>
              </a>
            </motion.li>
          ))}
        </ul>

        <div className="md:hidden">
          <button 
            onClick={() => setNavOpen(!navOpen)} 
            className={`focus:outline-none p-2 rounded-lg transition-all duration-300 ${
              !scrolled && isHome ? 'text-white hover:bg-white/20' : 'text-gray-700 hover:bg-purple-50'
            }`}
          >
            <motion.div 
              animate={{ rotate: navOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {navOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </motion.div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="md:hidden fixed top-16 left-0 w-full bg-white/95 backdrop-blur-xl shadow-2xl"
          >
            <ul className="flex flex-col items-center py-6 space-y-4">
              {links.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={link.href}
                    onClick={() => handleClick(link.href)}
                    className={`text-gray-700 px-6 py-3 rounded-full transition-all duration-300 ${
                      active === link.href 
                        ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 font-semibold" 
                        : "hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600"
                    }`}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
export default Navbar;