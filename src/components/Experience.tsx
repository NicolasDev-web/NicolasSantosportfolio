import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { FaBriefcase } from "react-icons/fa";
import { fadeUp, staggerContainer } from "../utils/animations";
import experienceData from "../data/experience.json";
import "./Experience.css";
import { useLanguage } from "../context/LanguageContext";

interface ExpItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export default function Experience() {
  const { t, language } = useLanguage();
  const [data] = useState<ExpItem[]>(experienceData);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h2 className="section-title" variants={fadeUp}>
            <span className="gradient-text">{t('experience.title')}</span>
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeUp}>
            {t('experience.subtitle')}
          </motion.p>

          <div className="experience__timeline">
            <div className="experience__line" />
            {data.map((item, i) => (
              <motion.div
                key={item.id}
                className={`experience__item ${i % 2 === 0 ? "experience__item--left" : "experience__item--right"}`}
                variants={fadeUp}
              >
                <div className="experience__dot">
                  <FaBriefcase />
                </div>
                <motion.div
                  className="experience__card glass-card"
                  whileHover={{ scale: 1.02, borderColor: "rgba(124,58,237,0.4)" }}
                >
                  <span className="experience__period">{language === 'en' && (item as any).period_en ? (item as any).period_en : item.period}</span>
                  <h3 className="experience__role">{language === 'en' && (item as any).role_en ? (item as any).role_en : item.role}</h3>
                  <h4 className="experience__company">{item.company}</h4>
                  <p className="experience__desc">{language === 'en' && (item as any).description_en ? (item as any).description_en : item.description}</p>
                  <div className="experience__techs">
                    {item.technologies.map((t) => (
                      <span key={t} className="badge">{t}</span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
