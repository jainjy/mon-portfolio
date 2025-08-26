import { motion } from 'framer-motion'
import ParticleBackground from "../ParticleBackground";
import React from 'react'

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
  
export const Contact = () => {
  return (
    <>
          {/* Contact Section */}
          <motion.section
        id="contact"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 px-4 py-20 relative overflow-hidden"
      >
        <ParticleBackground density={120} />

        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-40 h-40 border border-purple-400/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          ></motion.div>
          <motion.div
            className="absolute bottom-20 right-10 w-32 h-32 bg-pink-500/10 rounded-full"
            animate={{ y: -20 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          ></motion.div>
          <motion.div
            className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-500/10 transform rotate-45"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
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
              Contactez-moi
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-purple-200">
              Créons ensemble quelque chose d'extraordinaire
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
                className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 group"
              >
                <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-purple-300 transition-colors">
                  Discutons de votre projet
                </h3>
                <p className="text-purple-200 leading-relaxed text-lg mb-6">
                  Vous avez une idée géniale ? Un projet ambitieux ? Je serais
                  ravi de discuter avec vous et de voir comment nous pouvons
                  créer quelque chose d'exceptionnel ensemble.
                </p>
                <div className="flex items-center gap-4 text-purple-300">
                  <motion.div
                    className="w-2 h-2 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  ></motion.div>
                  <span>Disponible pour de nouveaux projets</span>
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
                    href: "www.linkedin.com/in/ramamonjisoa-andrianina",
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
                  Informations de contact
                </h4>
                <div className="space-y-3 text-purple-200">
                  <p className="flex items-center gap-2">
                    <HiOutlineMail className="text-purple-400 text-lg" />
                    ramamonjisoandrianina@gmail.com
                  </p>
                  <p className="flex items-center gap-2">
                    <HiOutlinePhone className="text-purple-400 text-lg" />
                    +261 34 20 219 88
                  </p>
                  <p className="flex items-center gap-2">
                    <HiOutlineLocationMarker className="text-purple-400 text-lg" />
                    0708L405 Ambohimena, Antsirabe, Madagascar
                  </p>
                </div>
              </motion.div>
            </div>

            <ContactForm />
          </div>
        </div>
      </motion.section></>
  )
}
