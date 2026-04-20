import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HiMenu, HiX } from "react-icons/hi";
import "./Navbar.css";

const navLinks = [
  { href: "#home", key: "home" },
  { href: "#about", key: "about" },
  { href: "#skills", key: "skills" },
  { href: "#projects", key: "projects" },
  { href: "#experience", key: "experience" },
  { href: "#education", key: "education" },
  { href: "#contact", key: "contact" },
];

import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll spy
      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="navbar__container">
        <motion.a
          href="#home"
          className="navbar__logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            handleClick("#home");
          }}
        >
          <span className="navbar__logo-bracket">&lt;</span>
          <span className="navbar__logo-text">Nicolas</span>
          <span className="navbar__logo-bracket">/&gt;</span>
        </motion.a>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__link ${
                  activeSection === link.href.slice(1) ? "navbar__link--active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
              >
                {t(`navbar.${link.key}`)}
                {activeSection === link.href.slice(1) && (
                  <motion.span
                    className="navbar__link-indicator"
                    layoutId="activeSection"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Language Toggle */}
          <button
            className="navbar__lang-toggle"
            onClick={toggleLanguage}
            style={{ background: 'none', border: '1px solid var(--primary-color)', color: 'var(--text-primary)', padding: '0.2rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {language === 'pt' ? 'EN' : 'PT'}
          </button>

          {/* Mobile Toggle */}
          <button
            className="navbar__toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className={`navbar__mobile-link ${
                  activeSection === link.href.slice(1) ? "navbar__mobile-link--active" : ""
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
              >
                {t(`navbar.${link.key}`)}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
