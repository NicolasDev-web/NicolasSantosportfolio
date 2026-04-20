import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { fadeUp, staggerContainer } from "../utils/animations";
import "./Contact.css";
import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

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

          <motion.div className="contact__info" variants={staggerContainer}>
            <motion.div className="contact__info-card glass-card" variants={fadeUp}>
              <FaEnvelope className="contact__info-icon" />
              <h3>Email</h3>
              <p>nicolasxavier445@gmail.com</p>
            </motion.div>
            
            <motion.a variants={fadeUp} href="https://wa.me/5585996595310" target="_blank" rel="noopener noreferrer" className="contact__info-card glass-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <FaWhatsapp className="contact__info-icon" />
              <h3>WhatsApp</h3>
              <p>{t('contact.whatsapp')}</p>
            </motion.a>

            <motion.div className="contact__info-card glass-card" variants={fadeUp}>
              <FaMapMarkerAlt className="contact__info-icon" />
              <h3>{t('contact.location')}</h3>
              <p>{t('contact.locationValue')}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
