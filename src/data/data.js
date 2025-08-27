
import {
  FaHtml5,
  FaJsSquare,
  FaReact,
  FaGithub,
  FaGraduationCap,
  FaMobile,
  FaGamepad,
  FaFilm,
  FaBook,
  FaJava,
  FaLaravel,
  FaNodeJs,
  FaServer,
  FaMusic,
} from "react-icons/fa";
import { FaGolang } from "react-icons/fa6";
import {
  SiPython,
  SiSpringboot,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiGit,
  SiPostman,
  SiSwagger,
  SiBootstrap,
  SiTailwindcss,
  SiPhp,
  SiDotnet,
  SiSymfony,
  SiC,
} from "react-icons/si";

  // Compétences organisées par catégorie
  const skillsCategories = [
    {
      title: "Langages de programmation",
      items: [
        { name: "Python", icon: SiPython, color: "text-blue-500" },
        { name: "Java", icon: FaJava, color: "text-red-500" },
        { name: "Go", icon: FaGolang, color: "text-cyan-500" },
        { name: "JavaScript", icon: FaJsSquare, color: "text-yellow-500" },
        { name: "HTML/CSS", icon: FaHtml5, color: "text-orange-500" },
        { name: "C#", icon:SiC, color: "text-purple-500" },
        { name: "PHP", icon: SiPhp, color: "text-blue-600" },
      ],
    },
    {
      title: "Frameworks Frontend",
      items: [
        { name: "React", icon: FaReact, color: "text-blue-400" },
        { name: "Bootstrap", icon: SiBootstrap, color: "text-purple-600" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-teal-500" },
        { name: "React Native", icon: FaMobile, color: "text-blue-400" },
      ],
    },
    {
      title: "Frameworks Backend",
      items: [
        { name: "Spring Boot", icon: SiSpringboot, color: "text-green-500" },
        { name: "Laravel", icon: FaLaravel, color: "text-red-400" },
        { name: "ASP.NET", icon: SiDotnet, color: "text-blue-600" },
        { name: "Node.js", icon: FaNodeJs, color: "text-green-600" },
        { name: "Symfony", icon: SiSymfony, color: "text-gray-600" },
      ],
    },
    {
      title: "API & Services Web",
      items: [
        { name: "REST API", icon: FaServer, color: "text-purple-400" },
        { name: "Postman", icon: SiPostman, color: "text-orange-500" },
        { name: "Swagger", icon: SiSwagger, color: "text-green-600" },
      ],
    },
    {
      title: "Bases de données",
      items: [
        { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-600" },
        { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
        { name: "MySQL", icon: SiMysql, color: "text-orange-600" },
      ],
    },
    {
      title: "Outils",
      items: [
        { name: "Git", icon: SiGit, color: "text-orange-600" },
        { name: "GitHub", icon: FaGithub, color: "text-gray-800" },
      ],
    },
  ];

  const projects = [
    {
      title: "e-BoSy - Plateforme e-learning",
      description:
        "Plateforme e-learning interactive avec cours en ligne, évaluations certifiantes, visioconférence, suivi personnalisé, messagerie avec partage de fichiers et certificats automatiques vérifiables.",
      gradient: "from-purple-500 via-pink-500 to-red-500",
      tech: ["ASP.NET", "React", "PostgreSQL", "Tailwind CSS"],
      image: "/images/ebosy.png",
      github: "https://github.com/jainjy/e-bosy-app", 
    },
    {
      title: "TAXIII - Commande de taxi",
      description:
        "Application mobile de commande de taxi avec carte interactive affichant les véhicules disponibles, réservation en un clic et suivi du trajet en temps réel.",
      gradient: "from-blue-500 via-purple-500 to-indigo-500",
      tech: ["React Native", "Node.js", "MongoDB"],
      image: "🚖",
      github: "https://github.com/jainjy/TAXIII",
    },
    {
      title: "Application de gestion de projet",
      description:
        "Logiciel de gestion de projet permettant de suivre les équipes, les tâches, le personnel avec un système de notifications.",
      gradient: "from-green-500 via-teal-500 to-blue-500",
      tech: ["Java", "Spring Boot", "MySQL", "Bootstrap", "JavaScript"],
      image: "📊",
      github: "https://github.com/jainjy/ProjetJavaWeb",
    },
    {
      title: "Music Player - E-Heno",
      description:
        "Lecteur de musique MP3 offrant la lecture de fichiers audio, l'affichage des paroles et la modification des métadonnées des morceaux.",
      gradient: "from-yellow-500 via-orange-500 to-red-500",
      tech: ["Python"],
      image: "🎵",
      github: "https://github.com/jainjy/E_Heno_music_player",
    },
    {
      title: "Application de santé et Bien-Etre",
      description:
        "Application santé et bien-être offrant conseils en articles, tests d'analyses avec recommandations personnalisées, notifications et tableau de bord récapitulatif.",
      gradient: "from-pink-500 via-red-500 to-purple-500",
      tech: ["Laravel", "MySQL", "React"],
      image: "🏥",
      github: "https://github.com/jainjy/SanteEtBienEtre",
    },
    {
      title: "Fanorona",
      description:
        "Jeu de Fanarona avec interface interactive respectant les règles traditionnelles du célèbre jeu de stratégie malagasy.",
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
      tech: ["Python"],
      image: "🎮",
      github: "https://github.com/jainjy/fanorona",
    },
    {
      title: "Gestion Personnel",
      description:
        "Application desktop de gestion personnelle avec système de chat intégré.",
      gradient: "from-yellow-500 to-amber-500",
      tech: ["Python", "MySQL"],
      image: "👥",
      github: "https://github.com/jainjy/gestionPersonnel",
    },
    {
      title: "Jeu du Serpent",
      description:
        "Une application desktop de gestion pour restaurants, permettant de gérer les commandes, les tables avec une interface graphique construite en Java Swing",
      gradient: "from-emerald-500 to-green-600",
      tech: ["Python"],
      image: "🐍",
      github: "https://github.com/jainjy/SnakeGame",
    },
    {
      title: "gestion de restaurant",
      description:
        "Jeu classique du serpent avec gestion des collisions et des scores.",
      gradient: "from-blue-500 to-green-600",
      tech: ["Java Swing","Mysq"],
      image: "🍽️",
      github: "https://github.com/jainjy/ApplicationRestaurant",
    },  {
      title: "Sudoku",
      description:
        "Implémentation d’un jeu de Sudoku avec interface graphique et résolution automatique.",
      gradient: "from-purple-400 via-indigo-500 to-blue-500",
      tech: ["Python"],
      image: "🔢",
      github: "https://github.com/jainjy/sudoku",
    },
  ];

  const education = [
    {
      icon: FaGraduationCap,
      title: "Licence en Génie Logiciel",
      institution: "ESP-Antsirabe",
      period: "2022-Aujourd'hui",
      description:
        "Formation approfondie en développement logiciel, algorithmique, bases de données et conception d'applications.",
    },
    {
      icon: FaGraduationCap,
      title: "BACC série S",
      institution: "Lycée André Resampa Antsirabe (LARA)",
      period: "2019-2022",
      description:
        "Baccalauréat scientifique avec spécialisation en mathématiques et sciences physiques.",
    },
  ];

  const interests = [
    { icon: FaGamepad, name: "Jeux Vidéo" },
    { icon: FaFilm, name: "Cinéma" },
    { icon: FaBook, name: "Lecture" },
    { icon: FaMusic, name: "Musique" },

  ];

  const languages = [
    { name: "Français", level: "Courant" },
    { name: "Anglais", level: "Débutant" },
    { name: "Malagasy", level: "Langue maternelle" },
  ];
  export default {skillsCategories,projects,education,interests,languages}