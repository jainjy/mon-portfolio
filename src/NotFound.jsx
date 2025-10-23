import { useLanguage } from "./context/LanguageContext";
import { translations } from "./data/translations";

export default function NotFound() {
    const { language } = useLanguage();
    const t = translations[language];
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center">
        {/* Ajout du GIF */}
        <img 
          src="/images/404.gif" 
          alt="Page non trouvée" 
          className="mx-auto mb-4 max-w-xs"
        />
        <p className="mb-4 text-lg text-gray-600">
          Oups ! La page que vous recherchez est introuvable.
        </p>
        
        <a
          href="/"
          className="inline-block rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition"
        >
          {t.backHome.texte}
        </a>
      </div>
    </div>
  );
}