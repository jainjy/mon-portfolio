import { Link } from "react-router-dom";
import { useLanguage } from "./context/LanguageContext";
import { translations } from "./data/translations";

export default function NotFound() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="relative flex min-h-screen items-center justify-center  bg-white flex-col">
      {/* Overlay sombre sur tout l'écran */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-purple-800/20 z-10"></div>
      <div className="text-center max-w-md mx-4 relative">
        {/* GIF avec bordure stylisée */}
        <img
          src="/images/404.gif"
          alt="Page non trouvée"
          className="mx-auto mb-6 rounded-2xl"
        />

        {/* Texte avec meilleure typographie */}
        <p className="mb-8 text-xl font-semibold text-yellow-600 leading-relaxed">
          Oups ! La page que vous recherchez est introuvable.
        </p>

        {/* Bouton amélioré avec dégradé et effets */}
      </div>
      <Link
        to={"/"}
        className="inline-block rounded-full bg-gradient-to-r from-purple-600 to-yellow-500 px-8 py-3 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-purple-700 hover:to-yellow-600 z-10"
      >
        {t.backHome.texte}
      </Link>
    </div>
  );
}
