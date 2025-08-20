import React, { useState, useEffect, useRef, useCallback } from "react";
import { 
  FaBars, FaTimes, FaHtml5, FaCss3Alt, FaJsSquare, FaReact, 
  FaGithub, FaLinkedin, FaArrowDown, FaCode, FaRocket, 
  FaHeart, FaEye, FaDownload, FaGraduationCap, FaMobile, 
  FaLaptopCode, FaGamepad, FaFilm, FaBook, FaPython, 
  FaJava, FaLaravel, FaNodeJs, FaDatabase, FaServer 
} from "react-icons/fa";
import { 
  SiPython, SiSpringboot, SiDjango, SiFlask, SiExpress,
  SiPostgresql, SiMongodb, SiMysql, SiFirebase, SiGraphql,
  SiDocker, SiKubernetes, SiGooglecloud,
  SiGit, SiJira, SiPostman, SiSwagger, SiRedux,
  SiTypescript, SiNextdotjs, SiNestjs, SiFastapi, SiApollographql,
  SiAwsamplify
} from "react-icons/si";
import { motion, useInView, AnimatePresence } from "framer-motion";
import TSParticles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { VscAzure } from "react-icons/vsc";

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

const ParticleBackground = ({ density = 80 }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const options = {
    particles: {
      number: {
        value: density,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: ["#a855f7", "#ec4899", "#3b82f6"],
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: { min: 0.1, max: 0.6 },
      },
      size: {
        value: { min: 1, max: 6 },
      },
      move: {
        enable: true,
        speed: { min: 0.5, max: 2 },
        direction: "none",
        random: true,
        straight: false,
        outModes: {
          default: "out",
        },
        attract: {
          enable: true,
          rotate: {
            x: 600,
            y: 1200,
          },
        },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    detectRetina: true,
  };

  return <TSParticles id="tsparticles" init={particlesInit} options={options} className="absolute inset-0 pointer-events-none" />;
};

const ProfileImage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="relative mb-8 group"
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-30"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
      <div className="relative w-48 h-48 mx-auto">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center shadow-2xl">
          <motion.img
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
            src="/images/Andrianina.png"
            alt="RAMAMONJISOA Hoelatiana Andrianina"
            className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
            whileHover={{ scale: 1.1 }}
          />
        </div>
        <motion.div 
          className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
      </div>
    </motion.div>
  );
};

const AnimatedText = ({ text, className, delay = 0 }) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 200 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorVariant, setCursorVariant] = useState("default");
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    const handleMouseEnter = (e) => {
      if (e.target.classList.contains("cursor-pointer") || 
          e.target.tagName === "A" || 
          e.target.tagName === "BUTTON") {
        setCursorVariant("hover");
      } else {
        setCursorVariant("default");
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseover', handleMouseEnter);
    
    return () => {  
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseover', handleMouseEnter);
    };
  }, []);

  const cursorVariants = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      width: 20,
      height: 20,
      backgroundColor: "rgba(168, 85, 247, 0.3)",
      mixBlendMode: "normal",
      transition: {
        type: "spring",
        mass: 0.6,
      },
    },
    hover: {
      x: mousePosition.x - 15,
      y: mousePosition.y - 15,
      width: 30,
      height: 30,
      backgroundColor: "rgba(168, 85, 247, 0.5)",
      mixBlendMode: "normal",
    },
  };

  // Compétences organisées par catégorie
  const skillsCategories = [
    {
      title: "Langages de programmation",
      items: [
        { name: "Python", icon: SiPython, color: "text-blue-500" },
        { name: "Java", icon: FaJava, color: "text-red-500" },
        { name: "JavaScript", icon: FaJsSquare, color: "text-yellow-500" },
        { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
        { name: "HTML/CSS", icon: FaHtml5, color: "text-orange-500" },
      ]
    },
    {
      title: "Frameworks Frontend",
      items: [
        { name: "React", icon: FaReact, color: "text-blue-400" },
        { name: "Next.js", icon: SiNextdotjs, color: "text-gray-800" },
        { name: "Redux", icon: SiRedux, color: "text-purple-500" },
      ]
    },
    {
      title: "Frameworks Backend",
      items: [
        { name: "Node.js", icon: FaNodeJs, color: "text-green-600" },
        { name: "Express", icon: SiExpress, color: "text-gray-400" },
        { name: "Spring Boot", icon: SiSpringboot, color: "text-green-500" },
        { name: "Laravel", icon: FaLaravel, color: "text-red-400" },
        { name: "Django", icon: SiDjango, color: "text-green-800" },
        { name: "Flask", icon: SiFlask, color: "text-gray-300" },
        { name: "NestJS", icon: SiNestjs, color: "text-red-600" },
      ]
    },
    {
      title: "API & Services Web",
      items: [
        { name: "REST API", icon: FaServer, color: "text-purple-400" },
        { name: "GraphQL", icon: SiGraphql, color: "text-pink-600" },
        { name: "Apollo", icon: SiApollographql, color: "text-indigo-600" },
        { name: "FastAPI", icon: SiFastapi, color: "text-green-400" },
      ]
    },
    {
      title: "Bases de données",
      items: [
        { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-600" },
        { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
        { name: "MySQL", icon: SiMysql, color: "text-orange-600" },
        { name: "Firebase", icon: SiFirebase, color: "text-yellow-500" },
      ]
    },
    {
      title: "Outils & DevOps",
      items: [
        { name: "Git", icon: SiGit, color: "text-orange-600" },
        { name: "Docker", icon: SiDocker, color: "text-blue-500" },
        { name: "Kubernetes", icon: SiKubernetes, color: "text-blue-600" },
        { name: "AWS", icon: SiAwsamplify, color: "text-yellow-600" },
        { name: "Azure", icon: VscAzure, color: "text-blue-700" },
        { name: "GCP", icon: SiGooglecloud, color: "text-red-500" },
        { name: "Postman", icon: SiPostman, color: "text-orange-500" },
        { name: "Swagger", icon: SiSwagger, color: "text-green-600" },
        { name: "Jira", icon: SiJira, color: "text-blue-400" },
      ]
    }
  ];

  const projects = [
    {
      title: "e-BoSy - Plateforme e-learning",
      description: "Plateforme e-learning interactive avec cours en ligne, évaluations certifiantes, visioconférence, suivi personnalisé, messagerie avec partage de fichiers et certificats automatiques vérifiables.",
      gradient: "from-purple-500 via-pink-500 to-red-500",
      tech: ["ASP.NET", "React", "PostgreSQL", "Tailwind CSS"],
      image: "🎓",
      github: "#",
      demo: "#"
    },
    {
      title: "TAXIII - Commande de taxi",
      description: "Application mobile de commande de taxi avec carte interactive affichant les véhicules disponibles, réservation en un clic et suivi du trajet en temps réel.",
      gradient: "from-blue-500 via-purple-500 to-indigo-500",
      tech: ["React Native", "Node.js", "MongoDB"],
      image: "🚖",
      github: "#",
      demo: "#"
    },
    {
      title: "Application de gestion de projet",
      description: "Logiciel de gestion de projet permettant de suivre les équipes, les tâches, le personnel avec un système de notifications.",
      gradient: "from-green-500 via-teal-500 to-blue-500",
      tech: ["Java EE", "MySQL", "Bootstrap", "JavaScript"],
      image: "📊",
      github: "#",
      demo: "#"
    },
    {
      title: "Music Player - E-Heno",
      description: "Lecteur de musique MP3 offrant la lecture de fichiers audio, l'affichage des paroles et la modification des métadonnées des morceaux.",
      gradient: "from-yellow-500 via-orange-500 to-red-500",
      tech: ["Python"],
      image: "🎵",
      github: "#",
      demo: "#"
    },
    {
      title: "Application de santé et Bien-Etre",
      description: "Application santé et bien-être offrant conseils en articles, tests d'analyses avec recommandations personnalisées, notifications et tableau de bord récapitulatif.",
      gradient: "from-pink-500 via-red-500 to-purple-500",
      tech: ["Laravel", "MySQL", "React"],
      image: "🏥",
      github: "#",
      demo: "#"
    },
    {
      title: "Fanorona",
      description: "Jeu de Fanarona avec interface interactive respectant les règles traditionnelles du célèbre jeu de stratégie malagasy.",
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
      tech: ["Python"],
      image: "🎮",
      github: "#",
      demo: "#"
    },{
      title: "Gestion Personnel",
      description: "Application desktop de gestion personnelle avec système de chat intégré.",
      gradient: "from-yellow-500 to-amber-500",
      tech: ["Python", "MySQL"],
      image: "👥",
      github: "#",
      demo: "#"
    },  {
      title: "Jeu du Serpent",
      description: "Jeu classique du serpent avec gestion des collisions et des scores.",
      gradient: "from-emerald-500 to-green-600",
      tech: ["Python", "JSON"],
      image: "🐍",
      github: "#",
      demo: "#"
    }
  ];

  const education = [
    {
      icon: FaGraduationCap,
      title: "Licence en Génie Logiciel",
      institution: "ESP-Antsirabe",
      period: "2022-Aujourd'hui",
      description: "Formation approfondie en développement logiciel, algorithmique, bases de données et conception d'applications."
    },
    {
      icon: FaGraduationCap,
      title: "BACC série S",
      institution: "Lycée André Resampa Antsirabe (LARA)",
      period: "2019-2022",
      description: "Baccalauréat scientifique avec spécialisation en mathématiques et sciences physiques."
    }
  ];

  const interests = [
    { icon: FaGamepad, name: "Jeux Vidéo" },
    { icon: FaFilm, name: "Cinéma" },
    { icon: FaBook, name: "Lecture" }
  ];

  const languages = [
    { name: "Français", level: "Courant" },
    { name: "Anglais", level: "Débutant" },
    { name: "Malagasy", level: "Langue maternelle" }
  ];

  return (
    <div className="scroll-smooth font-sans text-gray-800 overflow-x-hidden">
      {/* Curseur personnalisé */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[1000]"
        variants={cursorVariants}
        animate={cursorVariant}
      />

      {/* Barre de progression */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-[100]">
        <motion.div 
          className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
          style={{ width: `${scrollProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.3 }}
        ></motion.div>
      </div>

      <Navbar />

      {/* Hero Section */}
      <motion.section
        id="home"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden pt-16"
      >
        <ParticleBackground density={100} />
        
        <motion.div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/40 to-pink-500/40 blur-3xl pointer-events-none"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />

        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            initial={{ y: 0 }}
            animate={{ y: -20 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            className="absolute top-20 left-10 w-20 h-20 border border-purple-400/30 rotate-45"
          ></motion.div>
          <motion.div 
            initial={{ y: 0 }}
            animate={{ y: -20 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
            className="absolute top-40 right-20 w-16 h-16 bg-pink-500/20 rounded-full"
          ></motion.div>
          <motion.div 
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-40 left-20 w-12 h-12 bg-blue-500/20 transform rotate-45"
          ></motion.div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto mt-16">
          <ProfileImage />

          <AnimatedText 
            text="Bonjour, je suis"
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
          />
          
          <AnimatedText 
            text="Andrianina"
            className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
            delay={0.5}
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto leading-relaxed"
          >
            Développeur Web passionné & Créateur d'applications innovantes
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-purple-200/80 mb-8"
          >
            Je transforme vos idées en réalité digitale avec créativité et innovation
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(168, 85, 247, 0.5)" }}
              transition={{ duration: 0.5 }}
              className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full flex items-center gap-3 relative overflow-hidden cursor-pointer"
            >
              <motion.div 
                className="absolute inset-0 bg-white/20 scale-x-0 origin-left"
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
              ></motion.div>
              <FaRocket className="group-hover:animate-bounce relative z-10" />
              <span className="relative z-10">Me contacter</span>
            </motion.a>
            
            <motion.a
              href="#about"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(168, 85, 247, 0.2)", color: "#fff" }}
              transition={{ duration: 0.5 }}
              className="border-2 border-purple-400 text-purple-400 px-10 py-4 rounded-full flex items-center gap-3 group cursor-pointer"
            >
              <FaEye className="group-hover:animate-pulse" />
              En savoir plus
            </motion.a>
            
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(236, 72, 153, 0.2)", color: "#fff" }}
              transition={{ duration: 0.5 }}
              className="border-2 border-pink-400 text-pink-400 px-10 py-4 rounded-full flex items-center gap-3 group cursor-pointer"
            >
              <FaDownload className="group-hover:animate-bounce" />
              Télécharger CV
            </motion.a>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-purple-300"
          >
            <FaArrowDown size={24} />
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        id="about" 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex items-center justify-center bg-white px-4 py-20 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              À propos de moi
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600">Découvrez mon parcours et ma passion</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {[
                {
                  title: "Passion pour le code",
                  description: "Développeur web passionné avec une solide formation en génie logiciel. J'aime résoudre des problèmes complexes et créer des applications innovantes qui améliorent la vie des utilisateurs.",
                  icon: FaCode,
                  gradient: "from-purple-600 to-pink-600",
                  bg: "from-purple-50 to-pink-50",
                  border: "border-purple-100"
                },
                {
                  title: "Innovation & Créativité",
                  description: "Chaque projet est une nouvelle aventure. Je m'efforce de rester à la pointe des technologies et d'apporter une approche créative à chaque défi, comme en témoignent mes nombreux projets personnels.",
                  icon: FaHeart,
                  gradient: "from-blue-600 to-purple-600",
                  bg: "from-blue-50 to-purple-50",
                  border: "border-blue-100"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`bg-gradient-to-br ${item.bg} p-8 rounded-3xl shadow-xl border ${item.border}`}
                >
                  <div className="flex items-center mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center mr-4`}>
                      <item.icon className="text-white text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, rotate: 3 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              whileHover={{ rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative w-full h-96 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-3xl shadow-2xl group">
                <div className="absolute inset-4 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
                  <div className="text-center p-8">
                    <motion.div 
                      className="text-8xl mb-6"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >👨‍💻</motion.div>
                    <h4 className="text-3xl font-bold text-gray-800 mb-4">RAMAMONJISOA Hoelatiana Andrianina</h4>
                    <p className="text-gray-600 text-lg">Développeur Web Full Stack</p>
                    <div className="mt-6 flex justify-center space-x-4">
                      <motion.div 
                        className="w-3 h-3 bg-red-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      ></motion.div>
                      <motion.div 
                        className="w-3 h-3 bg-yellow-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                      ></motion.div>
                      <motion.div 
                        className="w-3 h-3 bg-green-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                      ></motion.div>
                    </div>
                  </div>
                </div>
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-30"
                  initial={{ opacity: 0.3 }}
                  whileHover={{ opacity: 0.5 }}
                  transition={{ duration: 0.7 }}
                ></motion.div>
              </div>
            </motion.div>
          </div>

          {/* Formation et Expérience */}
          <div className="mt-20 grid md:grid-cols-1 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
                <FaGraduationCap className="text-purple-600" />
                Formation
              </h3>
              <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {education.map((edu, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.2 }}
                    className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-100 p-3 rounded-full">
                        <edu.icon className="text-purple-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-800">{edu.title}</h4>
                        <p className="text-purple-600 font-medium">{edu.institution} • {edu.period}</p>
                        <p className="text-gray-600 mt-2">{edu.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Langues et Centres d'intérêt */}
          <div className="mt-20 grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold mb-8 text-gray-800">Langues</h3>
              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-md"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-800">{lang.name}</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {lang.level}
                      </span>
                    </div>
                    <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: lang.level === "Courant" ? "90%" : lang.level === "Débutant" ? "40%" : "100%" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      ></motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold mb-8 text-gray-800">Centres d'intérêt</h3>
              <div className="grid grid-cols-2 gap-4">
                {interests.map((interest, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center"
                  >
                    <interest.icon className="text-4xl mb-3 text-purple-600" />
                    <span className="text-lg font-medium text-gray-800">{interest.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        id="skills" 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-purple-50 px-4 py-20 relative"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Mes compétences
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600">Technologies que je maîtrise avec passion</p>
          </motion.div>

          {/* Compétences par catégorie */}
          <div className="space-y-16">
            {skillsCategories.map((category, catIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-gray-100"
              >
                <h3 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-xl">
                    {category.title.includes("Langages") && <FaCode />}
                    {category.title.includes("Frontend") && <FaLaptopCode />}
                    {category.title.includes("Backend") && <FaServer />}
                    {category.title.includes("API") && <FaDatabase />}
                    {category.title.includes("Bases") && <FaDatabase />}
                    {category.title.includes("Outils") && <FaCode />}
                  </span>
                  {category.title}
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {category.items.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                      className="group bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-md border border-gray-200 relative overflow-hidden text-center"
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 scale-x-0 origin-left"
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.5 }}
                      ></motion.div>
                      
                      <div className="relative mb-4">
                        <skill.icon 
                          size={48} 
                          className={`${skill.color} mx-auto transition-all duration-300`}
                        />
                        <motion.div 
                          className="absolute -inset-2 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-lg opacity-0"
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        ></motion.div>
                      </div>
                      
                      <h4 className="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                        {skill.name}
                      </h4>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        id="projects" 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex items-center justify-center bg-white px-4 py-20 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-pink-50/30"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Mes projets
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600">Découvrez mes réalisations les plus récentes</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="group bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative"
              >
                <div className={`h-64 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  <motion.div 
                    className="absolute inset-0 bg-black/10"
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  <motion.div 
                    className="absolute top-4 right-4 w-20 h-20 border-2 border-white/30 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  ></motion.div>
                  <motion.div 
                    className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-lg transform rotate-45"
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.7 }}
                  ></motion.div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="text-8xl"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {project.image}
                    </motion.div>
                  </div>
                  
                  <div className="absolute bottom-4 left-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white text-2xl border border-white/30">
                      <FaCode />
                    </div>
                  </div>
                  
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed text-base">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((tech, techIndex) => (
                      <motion.span 
                        key={tech}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                        className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200 group-hover:from-purple-100 group-hover:to-pink-100 transition-colors duration-300"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <motion.a 
                      href={project.github}
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium px-4 py-2 rounded-lg hover:bg-purple-50 cursor-pointer"
                    >
                      <FaGithub className="animate-pulse" />
                      GitHub
                    </motion.a>
                    <motion.a 
                      href={project.demo}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 text-pink-600 hover:text-pink-800 font-medium px-4 py-2 rounded-lg hover:bg-pink-50 cursor-pointer"
                    >
                      <FaRocket />
                      Demo
                    </motion.a>
                  </div>
                </div>
                
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact" 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 px-4 py-20 relative overflow-hidden"
      >
        <ParticleBackground density={120} />
        
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-20 left-10 w-40 h-40 border border-purple-400/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-20 right-10 w-32 h-32 bg-pink-500/10 rounded-full"
            animate={{ y: -20 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          ></motion.div>
          <motion.div 
            className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-500/10 transform rotate-45"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          ></motion.div>
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Contactez-moi
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-purple-200">Créons ensemble quelque chose d'extraordinaire</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 group"
              >
                <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-purple-300 transition-colors">
                  Discutons de votre projet
                </h3>
                <p className="text-purple-200 leading-relaxed text-lg mb-6">
                  Vous avez une idée géniale ? Un projet ambitieux ? 
                  Je serais ravi de discuter avec vous et de voir comment nous pouvons 
                  créer quelque chose d'exceptionnel ensemble.
                </p>
                <div className="flex items-center gap-4 text-purple-300">
                  <motion.div 
                    className="w-2 h-2 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  ></motion.div>
                  <span>Disponible pour de nouveaux projets</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex gap-6"
              >
                {[
                  { icon: FaGithub, href: "https://github.com/jainjy", color: "group-hover:text-gray-300", bg: "group-hover:bg-gray-600/20" },
                  { icon: FaLinkedin, href: "www.linkedin.com/in/ramamonjisoa-andrianina", color: "group-hover:text-blue-400", bg: "group-hover:bg-blue-600/20" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white text-2xl ${social.color} ${social.bg} border border-white/20 group-hover:border-white/40 cursor-pointer`}
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10"
              >
                <h4 className="text-xl font-bold text-white mb-4">Informations de contact</h4>
                <div className="space-y-3 text-purple-200">
                  <p>📧 ramamonjisoandrianina@gmail.com</p>
                  <p>📱 +261 34 20 219 88</p>
                  <p>📍 0708L405 Ambohimena, Antsirabe, Madagascar</p>
                </div>
              </motion.div>  
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.input
                    whileFocus={{ backgroundColor: "rgba(255,255,255,0.15)", ringColor: "rgba(168,85,247,1)" }}
                    transition={{ duration: 0.3 }}
                    type="text"
                    placeholder="Votre nom"
                    className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 hover:bg-white/12 cursor-pointer"
                  />
                  <motion.input
                    whileFocus={{ backgroundColor: "rgba(255,255,255,0.15)", ringColor: "rgba(168,85,247,1)" }}
                    transition={{ duration: 0.3 }}
                    type="email"
                    placeholder="Votre email"
                    className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 hover:bg-white/12 cursor-pointer"
                  />
                </div>
                
                <motion.input
                  whileFocus={{ backgroundColor: "rgba(255,255,255,0.15)", ringColor: "rgba(168,85,247,1)" }}
                  transition={{ duration: 0.3 }}
                  type="text"
                  placeholder="Sujet"
                  className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 hover:bg-white/12 cursor-pointer"
                />
                
                <motion.textarea
                  whileFocus={{ backgroundColor: "rgba(255,255,255,0.15)", ringColor: "rgba(168,85,247,1)" }}
                  transition={{ duration: 0.3 }}
                  placeholder="Décrivez votre projet..."
                  rows="6"
                  className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none hover:bg-white/12 cursor-pointer"
                />
                
                <motion.button
                  type="button"
                  onClick={() => alert('Message envoyé ! (Fonction de démonstration)')}
                  whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(168,85,247,0.25)" }}
                  transition={{ duration: 0.5 }}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl font-bold text-lg shadow-2xl group relative overflow-hidden cursor-pointer"
                >
                  <motion.div 
                    className="absolute inset-0 bg-white/10 scale-x-0 origin-left"
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <FaRocket />
                    Envoyer le message
                  </div>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-black text-center py-12 border-t border-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="mb-8">
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4"
            >
              RAMAMONJISOA Hoelatiana Andrianina
            </motion.h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Développeur Web passionné créant des applications innovantes avec créativité et expertise technique.
            </p>
          </div>
          
          <div className="flex justify-center gap-8 mb-8">
            {[
              { name: "Accueil", href: "#home" },
              { name: "À propos", href: "#about" },
              { name: "Compétences", href: "#skills" },
              { name: "Projets", href: "#projects" },
              { name: "Contact", href: "#contact" }
            ].map((link) => (
              <motion.a
                key={link.name}
                whileHover={{ color: "#a855f7" }}
                transition={{ duration: 0.3 }}
                href={link.href}
                className="text-gray-400 cursor-pointer"
              >
                {link.name}
              </motion.a>
            ))}
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-500 mb-2">
              © 2025 RAMAMONJISOA Hoelatiana Andrianina. Tous droits réservés.
            </p>
            <p className="text-gray-600 text-sm">
              Fait avec <FaHeart className="inline text-red-500" /> et beaucoup de café ☕
            </p>
          </div>
        </div>
      </footer>

      {/* Styles CSS personnalisés */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}

export default App;