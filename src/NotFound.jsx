import { Link } from "react-router-dom";
import { useLanguage } from "./context/LanguageContext";
import { translations } from "./data/translations";
import { NovaTransition } from "./components/Transitions";
import FuzzyText from "./components/FuzzyText";
import { useState } from "react";

export default function NotFound() {
  const { language } = useLanguage();
  const t = translations[language];

  // Correction : stocker un composant React dans un state
  const [Mode, setMode] = useState(() => NovaTransition);

  const handleClick = () => {
    setMode(() => NovaTransition);
  };

  return (
    <Mode>
      <div className="relative flex min-h-screen items-center justify-center bg-white flex-col overflow-hidden">
        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-purple-800/20 z-10"></div>

        <div className="text-center max-w-md mx-4 relative z-20">
          {/* 404 Fuzzy Text */}
          <div className="mb-8 flex justify-center">
            <FuzzyText
              baseIntensity={0.2}
              hoverIntensity={0.5}
              enableHover={true}
              clickEffect={true}
              direction="both"
              fontSize="clamp(3rem, 15vw, 10rem)"
              fontWeight={900}
              color="#fbbf24"
              gradient={["#fbbf24", "#ec4899", "#8b5cf6"]}
              transitionDuration={10}
            >
              404
            </FuzzyText>
          </div>

          {/* Message */}
          <div className="mb-8 flex justify-center">
            <FuzzyText
              baseIntensity={0.15}
              hoverIntensity={0.4}
              enableHover={true}
              clickEffect={true}
              direction="both"
              fontSize="clamp(1rem, 3vw, 1.25rem)"
              fontWeight={600}
              color="#fbbf24"
              transitionDuration={8}
            >
              Oups ! La page que vous recherchez est introuvable.
            </FuzzyText>
          </div>
        </div>

        {/* Retour accueil */}
        <Link
          to="/"
          className="
            inline-block 
            rounded-full 
            bg-gradient-to-r 
            from-purple-600 
            to-yellow-500 
            px-8 
            py-3 
            text-white 
            font-bold 
            shadow-lg 
            hover:shadow-xl 
            transform 
            hover:scale-105 
            transition-all 
            duration-300 
            hover:from-purple-700 
            hover:to-yellow-600
            z-20
          "
        >
          <FuzzyText
            baseIntensity={0.1}
            hoverIntensity={0.35}
            enableHover={true}
            clickEffect={true}
            direction="horizontal"
            fontSize="clamp(0.875rem, 2vw, 1rem)"
            fontWeight={700}
            color="#ffffff"
            transitionDuration={6}
          >
            {t.backHome.texte}
          </FuzzyText>
        </Link>
      </div>
    </Mode>
  );
}
