import { motion } from 'framer-motion'
import React from 'react'
export default function Footer() {
  return (
    <>
    {/* Footer */}
    <footer className="bg-gradient-to-r from-gray-900 to-black text-center py-12 border-t border-gray-800 relative overflow-hidden">
    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    <div className="max-w-6xl mx-auto px-4 relative z-10">
      <div className="mb-8">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4"
        >
          RAMAMONJISOA Hoelatiana Andrianina
        </motion.h3>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Développeur Web passionné créant des applications innovantes avec
          créativité et expertise technique.
        </p>
      </div>

      <div className="flex justify-center gap-8 mb-8">
        {[
          { name: "Accueil", href: "#home" },
          { name: "À propos", href: "#about" },
          { name: "Compétences", href: "#skills" },
          { name: "Projets", href: "#projects" },
          { name: "Contact", href: "#contact" },
        ].map((link) => (
          <motion.a
            key={link.name}
            whileHover={{ color: "#a855f7" }}
            transition={{ duration: 0.3 }}
            href={link.href}
            className="text-gray-400 cursor-pointer"
          >
            {link.name}
          </motion.a>
        ))}
      </div>

      <div className="border-t border-gray-800 pt-8">
        <p className="text-gray-500 mb-2">
          © 2025 RAMAMONJISOA Hoelatiana Andrianina. Tous droits réservés.
        </p>
      </div>
    </div>
  </footer>
  </>
  )
}
