import { motion } from 'framer-motion'
import ParticleBackground from "../ParticleBackground";
import React from 'react'
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../data/translations";

import {
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineLocationMarker,
  } from "react-icons/hi";
  import {
    FaGithub,
    FaLinkedin,
  } from "react-icons/fa";
import ContactForm from '../ContactForm';
  
export const Contact = ({ mousePosition }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <>
        {/* Contact Section */}
        <motion.section
        id="contact"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 px-4 py-20 relative overflow-hidden"
      >
        <ParticleBackground density={100} />

        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/40 to-pink-500/40 blur-3xl pointer-events-none"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />

        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: -20 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute top-20 left-10 w-20 h-20 border border-purple-400/30 rotate-45"
          ></motion.div>
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: -20 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5,
            }}
            className="absolute top-40 right-20 w-16 h-16 bg-pink-500/20 rounded-full"
          ></motion.div>
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-40 left-20 w-12 h-12 bg-blue-500/20 transform rotate-45"
          ></motion.div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              {t.contact.title}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-purple-200">
              {t.contact.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 dark:border-gray-700/20 group"
              >
                <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-purple-300 transition-colors">
                  {t.contact.discussion.title}
                </h3>
                <p className="text-purple-200 leading-relaxed text-lg mb-6">
                  {t.contact.discussion.description}
                </p>
                <div className="flex items-center gap-4 text-purple-300">
                  <motion.div
                    className="w-2 h-2 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  ></motion.div>
                  <span>{t.contact.discussion.status}</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex gap-6"
              >
                {[
                  {
                    icon: FaGithub,
                    href: "https://github.com/jainjy",
                    color: "group-hover:text-gray-300",
                    bg: "group-hover:bg-gray-600/20",
                  },
                  {
                    icon: FaLinkedin,
                    href: "https://linkedin.com/in/ramamonjisoa-andrianina",
                    color: "group-hover:text-blue-400",
                    bg: "group-hover:bg-blue-600/20",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white text-2xl ${social.color} ${social.bg} border border-white/20 group-hover:border-white/40 cursor-pointer`}
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10"
              >
                <h4 className="text-xl font-bold text-white mb-4">
                  {t.contact.info.title}
                </h4>
                <div className="space-y-3 text-purple-200">
                  <a className="flex items-center gap-2" href='mailto:ramamonjisoandrianina@gmail.com'>
                    <HiOutlineMail className="text-purple-400 text-lg" />
                    ramamonjisoandrianina@gmail.com
                  </a>
                  <a className="flex items-center gap-2" href='tel:+261 34 20 219 88'>
                    <HiOutlinePhone className="text-purple-400 text-lg" />
                    +261 34 20 219 88
                  </a>
                  <p className="flex items-center gap-2">
                    <HiOutlineLocationMarker className="text-purple-400 text-lg" />
                  Antsirabe, Madagascar
                  </p>
                </div>
              </motion.div>
            </div>

          <ContactForm/>
          </div>
        </div>
      </motion.section></>
  )
}
