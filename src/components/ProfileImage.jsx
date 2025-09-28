import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const ProfileImage = () => {
  const images = [
    "/images/Andrianina.jpg", // face
    "/images/Andrianina.png", // dos
  ];

  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleClick = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative mb-10 flex justify-center"
      
    >
      {/* Glow animé autour */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 rounded-full blur-2xl opacity-40"
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
        {/* Cercle rotatif */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-400 to-indigo-500 rounded-full opacity-80"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* Conteneur principal avec perspective */}
        <div
          className="absolute inset-3 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center shadow-xl border border-white/20 overflow-hidden perspective-1000"
          onClick={handleClick}
        >
          {/* Carte 3D */}
          <motion.div
            className="w-full h-full relative preserve-3d flex items-center justify-center"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {/* Face avant */}
            <div className="absolute w-full h-full backface-hidden flex items-center justify-center">
              <img
                src={images[0]}
                alt="Face Andrianina"
                className="w-44 h-44 sm:w-52 sm:h-52 rounded-full object-cover border-4"
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
                className="w-44 h-44 sm:w-52 sm:h-52 rounded-full object-cover border-4"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileImage;
