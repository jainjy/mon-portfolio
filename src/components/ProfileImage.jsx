import { motion } from "framer-motion";

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
export default ProfileImage;

