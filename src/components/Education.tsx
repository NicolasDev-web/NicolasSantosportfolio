import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { FaGraduationCap } from "react-icons/fa";
import { fadeUp, staggerContainer } from "../utils/animations";
import educationData from "../data/education.json";
import "./Education.css";
import { useLanguage } from "../context/LanguageContext";

interface EducationItem {
  id: number;
  course: string;
  institution: string;
  period: string;
}

export default function Education() {
  const { t, language } = useLanguage();
  const [data] = useState<EducationItem[]>(educationData);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="education" className="section education">
      <div className="container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h2 className="section-title" variants={fadeUp}>
            <span className="gradient-text">{t('education.title')}</span>
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeUp}>
            {t('education.subtitle')}
          </motion.p>

          <div className="education__timeline">
            <div className="education__line" />
            {data.map((item, i) => (
              <motion.div
                key={item.id}
                className={`education__item ${i % 2 === 0 ? "education__item--left" : "education__item--right"}`}
                variants={fadeUp}
              >
                <div className="education__dot">
                  <FaGraduationCap />
                </div>
                <motion.div
                  className="education__card glass-card"
                  whileHover={{ scale: 1.02, borderColor: "rgba(124,58,237,0.4)" }}
                >
                  <span className="education__period">{language === 'en' && (item as any).period_en ? (item as any).period_en : item.period}</span>
                  <h3 className="education__course">{language === 'en' && (item as any).course_en ? (item as any).course_en : item.course}</h3>
                  <h4 className="education__institution">{language === 'en' && (item as any).institution_en ? (item as any).institution_en : item.institution}</h4>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
