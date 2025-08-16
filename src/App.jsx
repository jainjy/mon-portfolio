import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaGithub, FaLinkedin, FaArrowDown, FaCode, FaRocket, FaHeart, FaEye, FaDownload, FaGraduationCap, FaMobile, FaLaptopCode, FaGamepad, FaFilm, FaBook, FaPython, FaJava, FaLaravel, FaNodeJs } from "react-icons/fa";
import { SiPython, SiSpringboot } from "react-icons/si";

// Simulation GSAP pour les animations avancées
const gsap = {
  timeline: () => ({
    to: (element, options) => ({
      ...options,
      element
    }),
    from: (element, options) => ({
      ...options,
      element
    }),
    fromTo: (element, from, to) => ({
      from,
      to,
      element
    })
  }),
  to: (element, options) => {
    console.log('GSAP to animation:', element, options);
  },
  from: (element, options) => {
    console.log('GSAP from animation:', element, options);
  },
  registerPlugin: (plugin) => {
    console.log('GSAP plugin registered:', plugin);
  }
};

// Composant Navbar amélioré avec animations GSAP
const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
      
      if (isScrolled) {
        navRef.current?.style.setProperty('transform', 'translateY(0)');
        navRef.current?.style.setProperty('backdrop-filter', 'blur(20px)');
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
    <nav
      ref={navRef}
      className={`fixed w-full z-50 transition-all duration-700 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-xl shadow-2xl border-b border-purple-100/50" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 ">
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
        Andrianina
        </div>

        <ul className="hidden md:flex space-x-8">
          {links.map((link, index) => (
            <li key={link.name} style={{ animationDelay: `${index * 0.1}s` }}>
              <a
                href={link.href}
                onClick={() => handleClick(link.href)}
                className={`relative px-3 py-2 text-gray-700 hover:text-purple-600 transition-all duration-300 group ${
                  active === link.href ? "text-purple-600 font-semibold" : ""
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 transform scale-x-0 transition-transform duration-500 ${
                  active === link.href ? "scale-x-100" : "group-hover:scale-x-100"
                }`}></span>
                <span className="absolute inset-0 bg-purple-100/20 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
              </a>
            </li>
          ))}
        </ul>

        <div className="md:hidden">
          <button 
            onClick={() => setNavOpen(!navOpen)} 
            className="text-gray-700 focus:outline-none p-2 rounded-lg hover:bg-purple-50 transition-all duration-300"
          >
            <div className={`transform transition-all duration-300 ${navOpen ? 'rotate-180' : ''}`}>
              {navOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </div>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden fixed top-16 left-0 w-full bg-white/95 backdrop-blur-xl shadow-2xl transition-all duration-500 ${
          navOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center py-6 space-y-4">
          {links.map((link, index) => (
            <li 
              key={link.name}
              className="animate-slideInLeft"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <a
                href={link.href}
                onClick={() => handleClick(link.href)}
                className="text-gray-700 hover:text-purple-600 transition-all duration-300 px-6 py-3 rounded-full hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transform hover:scale-105"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

// Composant particules d'arrière-plan amélioré
const ParticleBackground = ({ density = 80 }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: density }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 1,
      duration: Math.random() * 30 + 15,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.6 + 0.1,
      direction: Math.random() > 0.5 ? 1 : -1,
    }));
    setParticles(newParticles);
  }, [density]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `linear-gradient(45deg, rgba(168, 85, 247, ${particle.opacity}), rgba(236, 72, 153, ${particle.opacity * 0.7}))`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            transform: `translateZ(0)`,
          }}
        />
      ))}
    </div>
  );
};

// Composant d'image de profil avec animations
const ProfileImage = () => {
  const imgRef = useRef(null);
  
  useEffect(() => {
    const img = imgRef.current;
    if (img) {
      img.style.opacity = '0';
      img.style.transform = 'scale(0.5) rotate(-10deg)';
      
      setTimeout(() => {
        img.style.transition = 'all 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        img.style.opacity = '1';
        img.style.transform = 'scale(1) rotate(0deg)';
      }, 500);
    }
  }, []);

  return (
    <div className="relative mb-8 group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-all duration-1000 animate-pulse"></div>
      <div className="relative w-48 h-48 mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-spin-slow"></div>
        <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center shadow-2xl">
          <img
            ref={imgRef}
            src="/images/Andrianina.png"
            alt="RAMAMONJISOA Hoelatiana Andrianina"
            className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white animate-ping"></div>
      </div>
    </div>
  );
};

// Composant de texte animé
const AnimatedText = ({ text, className, delay = 0 }) => {
  const textRef = useRef(null);
  
  useEffect(() => {
    const element = textRef.current;
    if (element) {
      const letters = text.split('');
      element.innerHTML = '';
      
      letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter === ' ' ? '\u00A0' : letter;
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.transition = `all 0.5s ease ${delay + index * 0.05}s`;
        element.appendChild(span);
        
        setTimeout(() => {
          span.style.opacity = '1';
          span.style.transform = 'translateY(0)';
        }, 100);
      });
    }
  }, [text, delay]);

  return <div ref={textRef} className={className}></div>;
};

// Hook pour les animations au scroll
const useScrollAnimations = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(50px) scale(0.95)';
      el.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
};

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useScrollAnimations();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Données mises à jour depuis le CV
  const skills = [
    { 
      name: "Python", 
      level: 85,
      icon: SiPython,
      color: "text-blue-500",
      bgColor: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200"
    },
    { 
      name: "Java", 
      level: 80,
      icon: FaJava,
      color: "text-red-500",
      bgColor: "from-red-50 to-red-100",
      borderColor: "border-red-200"
    },
    { 
      name: "JavaScript", 
      level: 88,
      icon: FaJsSquare,
      color: "text-yellow-500",
      bgColor: "from-yellow-50 to-yellow-100",
      borderColor: "border-yellow-200"
    },
    { 
      name: "React", 
      level: 85,
      icon: FaReact,
      color: "text-blue-400",
      bgColor: "from-blue-50 to-cyan-100",
      borderColor: "border-blue-200"
    },
    { 
      name: "Laravel", 
      level: 80,
      icon: FaLaravel,
      color: "text-red-400",
      bgColor: "from-red-50 to-pink-100",
      borderColor: "border-red-200"
    },
    { 
      name: "Spring Boot", 
      level: 75,
      icon: SiSpringboot,
      color: "text-green-500",
      bgColor: "from-green-50 to-green-100",
      borderColor: "border-green-200"
    },
    { 
      name: "HTML/CSS", 
      level: 90,
      icon: FaHtml5,
      color: "text-orange-500",
      bgColor: "from-orange-50 to-orange-100",
      borderColor: "border-orange-200"
    },
    { 
      name: "Node.js", 
      level: 70,
      icon: FaNodeJs,
      color: "text-green-600",
      bgColor: "from-green-50 to-teal-100",
      borderColor: "border-green-200"
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
      title: "Application de gestion de santé",
      description: "Application santé et bien-être offrant conseils en articles, tests d'analyses avec recommandations personnalisées, notifications et tableau de bord récapitulatif.",
      gradient: "from-pink-500 via-red-500 to-purple-500",
      tech: ["Laravel", "MySQL", "React"],
      image: "🏥",
      github: "#",
      demo: "#"
    },
    {
      title: "Fanorona",
      description: "Jeu de Fanorana avec interface interactive respectant les règles traditionnelles du célèbre jeu de stratégie malagasy.",
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
      tech: ["Python"],
      image: "🎮",
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

  const experiences = [
    {
      icon: FaLaptopCode,
      title: "Participation à Hackathon GDG",
      period: "2023",
      description: "Participation à un hackathon organisé par GDG Antsirabe. Cette expérience m'a permis d'améliorer mes compétences techniques, mon esprit d'innovation et ma capacité à travailler en équipe ainsi que ma résilience face aux défis."
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
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <Navbar />

      {/* Hero Section Enhanced */}
      <section
        id="home"
        className="relative h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden pt-16"
      >
        <ParticleBackground density={100} />
        
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/40 to-pink-500/40 blur-3xl transition-all duration-1000 ease-out pointer-events-none"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 border border-purple-400/30 rotate-45 animate-spin-slow"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-pink-500/20 rounded-full animate-bounce-slow"></div>
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-blue-500/20 transform rotate-45 animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
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
          
          <div className="scroll-animate">
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Développeur Web passionné & Créateur d'applications innovantes
            </p>
            <p className="text-lg text-purple-200/80 mb-8">
              Je transforme vos idées en réalité digitale avec créativité et innovation
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 scroll-animate">
            <a
              href="#contact"
              className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl flex items-center gap-3 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <FaRocket className="group-hover:animate-bounce relative z-10" />
              <span className="relative z-10">Me contacter</span>
            </a>
            
            <a
              href="#about"
              className="border-2 border-purple-400 text-purple-400 px-10 py-4 rounded-full hover:bg-purple-400 hover:text-white transition-all duration-500 transform hover:scale-110 flex items-center gap-3 group"
            >
              <FaEye className="group-hover:animate-pulse" />
              En savoir plus
            </a>
            
            <a
              href="#"
              className="border-2 border-pink-400 text-pink-400 px-10 py-4 rounded-full hover:bg-pink-400 hover:text-white transition-all duration-500 transform hover:scale-110 flex items-center gap-3 group"
            >
              <FaDownload className="group-hover:animate-bounce" />
              Télécharger CV
            </a>
          </div>

          <div className="animate-bounce text-purple-300 scroll-animate">
            <FaArrowDown size={24} />
          </div>
        </div>
      </section>

      {/* About Section Enhanced */}
      <section id="about" className="min-h-screen flex items-center justify-center bg-white px-4 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              À propos de moi
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600">Découvrez mon parcours et ma passion</p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 scroll-animate border border-purple-100">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-4">
                    <FaCode className="text-white text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Passion pour le code</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Développeur web passionné avec une solide formation en génie logiciel. 
                  J'aime résoudre des problèmes complexes et créer des applications innovantes 
                  qui améliorent la vie des utilisateurs.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 scroll-animate border border-blue-100">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4">
                    <FaHeart className="text-white text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Innovation & Créativité</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Chaque projet est une nouvelle aventure. Je m'efforce de rester à la pointe 
                  des technologies et d'apporter une approche créative à chaque défi, 
                  comme en témoignent mes nombreux projets personnels.
                </p>
              </div>
            </div>

            <div className="relative scroll-animate">
              <div className="relative w-full h-96 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-700 group">
                <div className="absolute inset-4 bg-white rounded-2xl flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <div className="text-8xl mb-6 animate-wave">👨‍💻</div>
                    <h4 className="text-3xl font-bold text-gray-800 mb-4">RAMAMONJISOA Hoelatiana Andrianina</h4>
                    <p className="text-gray-600 text-lg">Développeur Web Full Stack</p>
                    <div className="mt-6 flex justify-center space-x-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
              </div>
            </div>
          </div>

          {/* Formation et Expérience */}
          <div className="mt-20 grid md:grid-cols-2 gap-8">
            <div className="scroll-animate">
              <h3 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
                <FaGraduationCap className="text-purple-600" />
                Formation
              </h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div 
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300"
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
                  </div>
                ))}
              </div>
            </div>

            <div className="scroll-animate">
              <h3 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
                <FaLaptopCode className="text-pink-600" />
                Expérience
              </h3>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div 
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-pink-500 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-pink-100 p-3 rounded-full">
                        <exp.icon className="text-pink-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-800">{exp.title}</h4>
                        <p className="text-pink-600 font-medium">{exp.period}</p>
                        <p className="text-gray-600 mt-2">{exp.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Langues et Centres d'intérêt */}
          <div className="mt-20 grid md:grid-cols-2 gap-8">
            <div className="scroll-animate">
              <h3 className="text-3xl font-bold mb-8 text-gray-800">Langues</h3>
              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-800">{lang.name}</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {lang.level}
                      </span>
                    </div>
                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
                        style={{ width: lang.level === "Courant" ? "90%" : lang.level === "Débutant" ? "40%" : "100%" }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="scroll-animate">
              <h3 className="text-3xl font-bold mb-8 text-gray-800">Centres d'intérêt</h3>
              <div className="grid grid-cols-2 gap-4">
                {interests.map((interest, index) => (
                  <div 
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center"
                  >
                    <interest.icon className="text-4xl mb-3 text-purple-600" />
                    <span className="text-lg font-medium text-gray-800">{interest.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section Enhanced */}
      <section id="skills" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-purple-50 px-4 py-20 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Mes compétences
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600">Technologies que je maîtrise avec passion</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className={`group bg-gradient-to-br ${skill.bgColor} p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-110 cursor-pointer scroll-animate border-2 ${skill.borderColor} relative overflow-hidden`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-3xl"></div>
                
                <div className="text-center relative z-10">
                  <div className="relative mb-6">
                    <skill.icon 
                      size={64} 
                      className={`${skill.color} mx-auto group-hover:animate-bounce transition-all duration-300 group-hover:scale-110`} 
                    />
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300 mb-4">
                    {skill.name}
                  </h3>
                  
                  <div className="text-sm text-gray-500 mb-4 group-hover:text-purple-500 transition-colors">
                    {skill.level}%
                  </div>
                </div>
                
                <div className="mt-6 bg-gray-200 rounded-full h-2 overflow-hidden relative">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transform -translate-x-full group-hover:translate-x-0 transition-all duration-1000 ease-out"
                    style={{ 
                      transitionDelay: '0.3s',
                      width: `${skill.level}%`,
                      marginLeft: `${100 - skill.level}%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Frameworks et Outils */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold mb-8 text-center text-gray-800 scroll-animate">Frameworks & Outils</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { name: "React", color: "bg-blue-100 text-blue-800" },
                { name: "Laravel", color: "bg-red-100 text-red-800" },
                { name: "Spring Boot", color: "bg-green-100 text-green-800" },
                { name: "Bootstrap", color: "bg-purple-100 text-purple-800" },
                { name: "Tailwind CSS", color: "bg-cyan-100 text-cyan-800" },
                { name: "ASP.NET", color: "bg-indigo-100 text-indigo-800" },
                { name: "Node.js", color: "bg-green-100 text-green-800" },
                { name: "React Native", color: "bg-blue-100 text-blue-800" },
                { name: "Symfony", color: "bg-gray-100 text-gray-800" },
                { name: "Git/GitHub", color: "bg-gray-100 text-gray-800" }
              ].map((tool, index) => (
                <div 
                  key={tool.name}
                  className={`p-4 rounded-xl ${tool.color} font-medium text-center shadow-md hover:shadow-lg transition-all duration-300 scroll-animate`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {tool.name}
                </div>
              ))}
            </div>
          </div>

          {/* Bases de données */}
          <div className="mt-12">
            <h3 className="text-3xl font-bold mb-8 text-center text-gray-800 scroll-animate">Bases de données</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: "PostgreSQL", color: "bg-blue-100 text-blue-800" },
                { name: "MySQL", color: "bg-orange-100 text-orange-800" },
                { name: "MongoDB", color: "bg-green-100 text-green-800" }
              ].map((db, index) => (
                <div 
                  key={db.name}
                  className={`p-4 rounded-xl ${db.color} font-medium text-center shadow-md hover:shadow-lg transition-all duration-300 scroll-animate`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {db.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section Enhanced */}
      <section id="projects" className="min-h-screen flex items-center justify-center bg-white px-4 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-pink-50/30"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Mes projets
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600">Découvrez mes réalisations les plus récentes</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 overflow-hidden scroll-animate border border-gray-100 relative"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`h-64 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white/30 rounded-full animate-spin-slow"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-lg transform rotate-45 group-hover:rotate-90 transition-transform duration-700"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl group-hover:scale-110 transition-transform duration-500">
                      {project.image}
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 left-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white text-2xl border border-white/30">
                      <FaCode />
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
                      <span 
                        key={tech}
                        className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200 hover:from-purple-100 hover:to-pink-100 transition-colors duration-300"
                        style={{ animationDelay: `${techIndex * 0.1}s` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <a 
                      href={project.github}
                      className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition-all duration-300 group-hover:translate-x-2 px-4 py-2 rounded-lg hover:bg-purple-50"
                    >
                      <FaGithub className="animate-pulse" />
                      GitHub
                    </a>
                    <a 
                      href={project.demo}
                      className="flex items-center gap-2 text-pink-600 hover:text-pink-800 font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-pink-50"
                    >
                      <FaRocket className="group-hover:animate-bounce" />
                      Demo
                    </a>
                  </div>
                </div>
                
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section Enhanced */}
      <section id="contact" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 px-4 py-20 relative overflow-hidden">
        <ParticleBackground density={120} />
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-40 h-40 border border-purple-400/20 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-500/10 rounded-full animate-bounce-slow"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-500/10 transform rotate-45 animate-pulse"></div>
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Contactez-moi
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-purple-200">Créons ensemble quelque chose d'extraordinaire</p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-500 scroll-animate group">
                <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-purple-300 transition-colors">
                  Discutons de votre projet
                </h3>
                <p className="text-purple-200 leading-relaxed text-lg mb-6">
                  Vous avez une idée géniale ? Un projet ambitieux ? 
                  Je serais ravi de discuter avec vous et de voir comment nous pouvons 
                  créer quelque chose d'exceptionnel ensemble.
                </p>
                <div className="flex items-center gap-4 text-purple-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Disponible pour de nouveaux projets</span>
                </div>
              </div>

              <div className="flex gap-6 scroll-animate">
                {[
                  { icon: FaGithub, href: "#", color: "hover:text-gray-300", bg: "hover:bg-gray-600/20" },
                  { icon: FaLinkedin, href: "#", color: "hover:text-blue-400", bg: "hover:bg-blue-600/20" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`group w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white text-2xl ${social.color} ${social.bg} transition-all duration-300 hover:scale-110 border border-white/20 hover:border-white/40`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <social.icon className="group-hover:animate-bounce" />
                  </a>
                ))}
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 scroll-animate">
                <h4 className="text-xl font-bold text-white mb-4">Informations de contact</h4>
                <div className="space-y-3 text-purple-200">
                  <p>📧 ramamonjisoandrianina@gmail.com</p>
                  <p>📱 +261 34 20 219 88</p>
                  <p>📍 0708L405 Ambohimena, Antsirabe, Madagascar</p>
                </div>
              </div>  
            </div>

            <div className="scroll-animate">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Votre nom"
                    className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/15 transition-all duration-300 hover:bg-white/12"
                  />
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/15 transition-all duration-300 hover:bg-white/12"
                  />
                </div>
                
                <input
                  type="text"
                  placeholder="Sujet"
                  className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/15 transition-all duration-300 hover:bg-white/12"
                />
                
                <textarea
                  placeholder="Décrivez votre projet..."
                  rows="6"
                  className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/15 transition-all duration-300 resize-none hover:bg-white/12"
                />
                
                <button
                  type="button"
                  onClick={() => alert('Message envoyé ! (Fonction de démonstration)')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-500 transform hover:scale-105 font-bold text-lg shadow-2xl hover:shadow-purple-500/25 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <FaRocket className="group-hover:animate-bounce" />
                    Envoyer le message
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Enhanced */}
      <footer className="bg-gradient-to-r from-gray-900 to-black text-center py-12 border-t border-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="mb-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              RAMAMONJISOA Hoelatiana Andrianina
            </h3>
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
              <a
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-500 mb-2">
              © 2025 RAMAMONJISOA Hoelatiana Andrianina. Tous droits réservés.
            </p>
            <p className="text-gray-600 text-sm">
              Fait avec <FaHeart className="inline text-red-500 animate-pulse" /> et beaucoup de café ☕
            </p>
          </div>
        </div>
      </footer>

      {/* Styles CSS personnalisés */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(-5px) rotate(-1deg); }
        }
        
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
        
        @keyframes slideInLeft {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-wave {
          animation: wave 2s ease-in-out infinite;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .scroll-animate {
          opacity: 0;
          transform: translateY(50px) scale(0.95);
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}

export default App;