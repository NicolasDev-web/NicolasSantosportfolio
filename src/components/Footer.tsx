import { motion } from "motion/react";
import { FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";
import "./Footer.css";
import { useLanguage } from "../context/LanguageContext";

const socials = [
  { icon: <FaGithub />, href: "https://github.com/NicolasDev-web", label: "GitHub" },
  { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/nicolas-santos-986861304/", label: "LinkedIn" },
];

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      {/* Wave */}
      <div className="footer__wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,40 C360,100 720,0 1080,60 C1260,90 1380,50 1440,40 L1440,120 L0,120 Z"
            fill="var(--bg-secondary)"
          />
        </svg>
      </div>

      <div className="footer__content">
        <div className="container">
          <motion.div
            className="footer__inner"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="footer__socials">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link"
                  whileHover={{ scale: 1.2, y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={s.label}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>

            <p className="footer__copy">
              {t('footer.madeWith')} <FaHeart className="footer__heart" /> {t('footer.by')}{" "}
              <span className="gradient-text">Nicolas</span> &copy;{" "}
              {new Date().getFullYear()}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
