import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaRocket, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { translations } from '../data/translations';
import { useLanguage } from '../context/LanguageContext';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
    const { language } = useLanguage();
    const t = translations[language];
  const [status, setStatus] = useState(null);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!status) return;
    const tId = setTimeout(() => setStatus(null), 6000);
    return () => clearTimeout(tId);
  }, [status]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus(null);

    const start = Date.now();
    const minDelay = 800; // avoid spinner flicker

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_USER_ID
      )
      .then(() => {
        const msg = language === 'fr' ? 'Message envoyé avec succès !' : 'Message sent successfully!';
        const desc = language === 'fr' ? "Merci ! Je vous répondrai bientôt." : "Thanks! I will get back to you soon.";
        setStatus({ type: 'success', message: msg, description: desc });
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch((error) => {
        const msg = language === 'fr' ? "Échec de l'envoi du message" : 'Failed to send message';
        const descPrefix = language === 'fr' ? 'Veuillez réessayer plus tard.' : 'Please try again later.';
        const desc = `${descPrefix} ${error?.text ? `(${error.text})` : ''}`.trim();
        setStatus({ type: 'error', message: msg, description: desc });
      })
      .finally(() => {
        const elapsed = Date.now() - start;
        const remaining = Math.max(0, minDelay - elapsed);
        setTimeout(() => setIsSending(false), remaining);
      });
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
            placeholder={t.contact.form.name}
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
            placeholder={t.contact.form.email}
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
          placeholder={t.contact.form.subject}
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 hover:bg-white/12 cursor-pointer"
        />

        <motion.textarea
          whileFocus={{ backgroundColor: 'rgba(255,255,255,0.15)', ringColor: 'rgba(168,85,247,1)' }}
          transition={{ duration: 0.3 }}
          name="message"
          placeholder={t.contact.form.message}
          rows={6}
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none hover:bg-white/12 cursor-pointer"
        />

        <motion.button
          type="submit"
          disabled={isSending}
          aria-busy={isSending}
          whileHover={{ scale: 1.05, boxShadow: '0px 0px 25px rgba(168,85,247,0.25)' }}
          transition={{ duration: 0.5 }}
          className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl font-bold text-lg shadow-2xl group relative overflow-hidden ${isSending ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <motion.div
            className="absolute inset-0 bg-white/10 scale-x-0 origin-left"
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          ></motion.div>
          <div className="relative z-10 flex items-center justify-center gap-3">
            {isSending ? (
              <>
                <span className="h-5 w-5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                <span>{language === 'fr' ? 'Envoi...' : 'Sending...'}</span>
              </>
            ) : (
              <>
                <FaRocket />
                <span>{t.contact.form.send}</span>
              </>
            )}
          </div>
        </motion.button>
      </form>
      {status && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          role="status"
          aria-live="polite"
          className={`mt-6 rounded-xl border p-4 backdrop-blur-sm ${
            status.type === 'success'
              ? 'border-green-400/30 bg-green-400/10 text-green-200'
              : 'border-red-400/30 bg-red-400/10 text-red-200'
          }`}
        >
          <div className="flex items-start gap-3">
            {status.type === 'success' ? (
              <FaCheckCircle className="mt-0.5 text-green-300 shrink-0" size={20} />
            ) : (
              <FaExclamationTriangle className="mt-0.5 text-red-300 shrink-0" size={20} />
            )}
            <div>
              <p className="font-semibold">{status.message}</p>
              {status.description && (
                <p className="text-sm/6 opacity-90">{status.description}</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ContactForm;