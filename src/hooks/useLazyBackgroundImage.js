import { useEffect, useState } from "react";

/**
 * Hook pour charger les images de fond de manière lazy
 * @param {string} imageUrl - URL de l'image à charger
 * @returns {boolean} - true si l'image est chargée
 */
export const useLazyBackgroundImage = (imageUrl) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!imageUrl) {
      setIsLoaded(true);
      return;
    }

    // Créer une image pour précharger
    const img = new Image();
    
    img.onload = () => {
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      // Continuer même si l'image échoue à charger
      setIsLoaded(true);
    };

    // Commencer le chargement
    img.src = imageUrl;

    return () => {
      // Cleanup
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]);

  return isLoaded;
};
