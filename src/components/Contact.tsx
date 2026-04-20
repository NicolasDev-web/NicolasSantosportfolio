import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { FaPaperPlane, FaCheck, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import { fadeUp, staggerContainer } from "../utils/animations";
import "./Contact.css";
import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    
    // Configurações do EmailJS (você precisará substituir essas strings pelos seus IDs reais)
    const serviceID = "SEU_SERVICE_ID";
    const templateID = "SEU_TEMPLATE_ID";
    const publicKey = "SUA_PUBLIC_KEY";

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      subject: form.subject,
      message: form.message,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error("Erro no EmailJS:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h2 className="section-title" variants={fadeUp}>
            <span className="gradient-text">{t('contact.title')}</span>
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeUp}>
            {t('contact.subtitle')}
          </motion.p>

          <div className="contact__grid">
            {/* Info */}
            <motion.div className="contact__info" variants={fadeUp}>
              <div className="contact__info-card glass-card">
                <FaEnvelope className="contact__info-icon" />
                <h3>Email</h3>
                <p>nicolasxavier445@gmail.com</p>
              </div>
              
              <a href="https://wa.me/5585996595310" target="_blank" rel="noopener noreferrer" className="contact__info-card glass-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <FaWhatsapp className="contact__info-icon" />
                <h3>WhatsApp</h3>
                <p>{t('contact.whatsapp')}</p>
              </a>

              <div className="contact__info-card glass-card">
                <FaMapMarkerAlt className="contact__info-icon" />
                <h3>{t('contact.location')}</h3>
                <p>{t('contact.locationValue')}</p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.form
              className="contact__form glass-card"
              onSubmit={handleSubmit}
              variants={fadeUp}
            >
              <div className="contact__field">
                <input
                  type="text"
                  id="contact-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder=" "
                />
                <label htmlFor="contact-name">{t('contact.name')}</label>
              </div>
              <div className="contact__field">
                <input
                  type="email"
                  id="contact-email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder=" "
                />
                <label htmlFor="contact-email">Email</label>
              </div>
              <div className="contact__field">
                <input
                  type="text"
                  id="contact-subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder=" "
                />
                <label htmlFor="contact-subject">{t('contact.subject')}</label>
              </div>
              <div className="contact__field">
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder=" "
                />
                <label htmlFor="contact-message">{t('contact.message')}</label>
              </div>
              <motion.button
                type="submit"
                className="btn btn-primary contact__submit"
                disabled={status === "sending" || status === "sent"}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {status === "idle" && (<><FaPaperPlane /> {t('contact.send')}</>)}
                {status === "sending" && (<span className="contact__spinner" />)}
                {status === "sent" && (<><FaCheck /> {t('contact.sent')}</>)}
                {status === "error" && t('contact.error')}
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
