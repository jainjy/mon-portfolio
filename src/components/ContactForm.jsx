import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaRocket } from 'react-icons/fa';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_USER_ID // Utilise la Public Key
      )
      .then(
        () => {
          setStatus('Message envoyé avec succès !');
          setFormData({ name: '', email: '', subject: '', message: '' });
        },
        (error) => {
          setStatus(`Erreur lors de l'envoi : ${error.text}`);
        }
      );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <motion.input
            whileFocus={{ backgroundColor: 'rgba(255,255,255,0.15)', ringColor: 'rgba(168,85,247,1)' }}
            transition={{ duration: 0.3 }}
            type="text"
            name="name"
            placeholder="Votre nom"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 hover:bg-white/12 cursor-pointer"
          />
          <motion.input
            whileFocus={{ backgroundColor: 'rgba(255,255,255,0.15)', ringColor: 'rgba(168,85,247,1)' }}
            transition={{ duration: 0.3 }}
            type="email"
            name="email"
            placeholder="Votre email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 hover:bg-white/12 cursor-pointer"
          />
        </div>

        <motion.input
          whileFocus={{ backgroundColor: 'rgba(255,255,255,0.15)', ringColor: 'rgba(168,85,247,1)' }}
          transition={{ duration: 0.3 }}
          type="text"
          name="subject"
          placeholder="Sujet"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 hover:bg-white/12 cursor-pointer"
        />

        <motion.textarea
          whileFocus={{ backgroundColor: 'rgba(255,255,255,0.15)', ringColor: 'rgba(168,85,247,1)' }}
          transition={{ duration: 0.3 }}
          name="message"
          placeholder="Décrivez votre projet..."
          rows={6}
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none hover:bg-white/12 cursor-pointer"
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05, boxShadow: '0px 0px 25px rgba(168,85,247,0.25)' }}
          transition={{ duration: 0.5 }}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl font-bold text-lg shadow-2xl group relative overflow-hidden cursor-pointer"
        >
          <motion.div
            className="absolute inset-0 bg-white/10 scale-x-0 origin-left"
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          ></motion.div>
          <div className="relative z-10 flex items-center justify-center gap-3">
            <FaRocket />
            Envoyer le message
          </div>
        </motion.button>
      </form>
      {status && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4 text-center text-lg text-purple-200"
        >
          {status}
        </motion.p>
      )}
    </motion.div>
  );
};

export default ContactForm;