import { motion } from "framer-motion";

const ProfileImage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative mb-10 flex justify-center group"
    >
      {/* Glow animé autour */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 rounded-full blur-2xl opacity-40"
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative w-56 h-56 sm:w-64 sm:h-64">
        {/* Cercle rotatif autour */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-400 to-indigo-500 rounded-full opacity-80"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* Cercle intérieur avec effet glassmorphism */}
        <div className="absolute inset-3 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center shadow-xl border border-white/20">
          <motion.img
            initial={{ opacity: 0, scale: 0.6, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            src="/images/Andrianina.png"
            alt="RAMAMONJISOA Hoelatiana Andrianina"
            className="w-44 h-44 sm:w-52 sm:h-52 rounded-full object-cover border-4 border-white shadow-lg"
            whileHover={{ scale: 1.1, rotate: 2 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileImage;
