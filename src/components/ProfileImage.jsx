import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";

const ProfileImage = () => {
  const images = useMemo(
    () => ["/images/profile1.jpg", "/images/profile2.jpg"],
    []
  );

  const [isFlipped, setIsFlipped] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Préchargement des images
  useEffect(() => {
    const preloadImages = async () => {
      try {
        await Promise.all(
          images.map((src) => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.src = src;
              img.onload = resolve;
              img.onerror = reject;
            });
          })
        );
        setImagesLoaded(true);
      } catch (error) {
        console.error("Erreur de préchargement des images:", error);
        setImagesLoaded(true); // Continuer même en cas d'erreur
      }
    };

    preloadImages();
  }, [images]);

  // Timer optimisé avec cleanup
  useEffect(() => {
    const timer = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleClick = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  // Animation variants pour de meilleures performances
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  const glowVariants = {
    animate: {
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.05, 1],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const rotationVariants = {
    animate: {
      rotate: 360,
      transition: { duration: 25, repeat: Infinity, ease: "linear" },
    },
  };

  const flipVariants = {
    flipped: { rotateY: 180 },
    notFlipped: { rotateY: 0 },
  };

  if (!imagesLoaded) {
    return (
      <div className="relative mb-10 flex justify-center">
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
          <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gray-200 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative mb-10 flex justify-center"
    >
      {/* Glow animé autour - réduit la fréquence d'animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 rounded-full blur-2xl opacity-40"
        variants={glowVariants}
        animate="animate"
      />

      <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
        {/* Cercle rotatif - animation simplifiée */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-400 to-indigo-500 rounded-full opacity-80"
          variants={rotationVariants}
          animate="animate"
        />

        {/* Conteneur principal avec perspective */}
        <div
          className="absolute inset-3 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center shadow-2xl border border-white/20 overflow-hidden perspective-1000 cursor-pointer"
          onClick={handleClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick();
            }
          }}
        >
          {/* Carte 3D avec will-change pour optimisation GPU */}
          <motion.div
            className="w-full h-full relative preserve-3d flex items-center justify-center"
            variants={flipVariants}
            animate={isFlipped ? "flipped" : "notFlipped"}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ willChange: "transform" }}
          >
            {/* Face avant */}
            <div className="absolute w-full h-full backface-hidden flex items-center justify-center">
              <img
                src={images[0]}
                alt="Face Andrianina"
                className="w-44 h-44 sm:w-52 sm:h-52 rounded-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Face arrière */}
            <div
              className="absolute w-full h-full backface-hidden flex items-center justify-center"
              style={{ transform: "rotateY(180deg)" }}
            >
              <img
                src={images[1]}
                alt="Dos Andrianina"
                className="w-44 h-44 sm:w-52 sm:h-52 rounded-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileImage;
