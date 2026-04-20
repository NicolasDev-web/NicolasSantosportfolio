import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
import { FaCode, FaRocket, FaCoffee, FaTrophy } from "react-icons/fa";
import { fadeUp, staggerContainer } from "../utils/animations";
import "./About.css";

const stats = [
  { icon: <FaCode />, value: 3, suffix: "+", key: "projects" },
  { icon: <FaRocket />, value: 2, suffix: "+", key: "experience" },
  { icon: <FaCoffee />, value: 1000, suffix: "+", key: "study" },
  { icon: <FaTrophy />, value: 15, suffix: "+", key: "tools" },
];

import { useLanguage } from "../context/LanguageContext";

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function About() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" className="section about">
      <div className="container">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="about__grid"
        >
          {/* Image Side */}
          <motion.div className="about__image-wrapper" variants={fadeUp}>
            <div className="about__image-container">
              <div className="about__image-placeholder">
                <span className="about__image-emoji">👨‍💻</span>
              </div>
              <div className="about__image-border" />
              <motion.div
                className="about__image-float about__image-float--1"
                animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                💻
              </motion.div>
              <motion.div
                className="about__image-float about__image-float--2"
                animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                🚀
              </motion.div>
              <motion.div
                className="about__image-float about__image-float--3"
                animate={{ y: [-5, 15, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                ⚡
              </motion.div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div className="about__content" variants={fadeUp}>
            <h2 className="section-title" style={{ textAlign: "left" }}>
              <span className="gradient-text">{t('about.title')}</span>
            </h2>
            <p className="about__text" dangerouslySetInnerHTML={{ __html: t('about.p1') }} />
            <p className="about__text" dangerouslySetInnerHTML={{ __html: t('about.p2') }} />
            <p className="about__text" dangerouslySetInnerHTML={{ __html: t('about.p3') }} />

            {/* Stats */}
            <motion.div
              className="about__stats"
              variants={staggerContainer}
            >
              {stats.map((stat, i) => (
                <motion.div key={i} className="about__stat glass-card" variants={fadeUp}>
                  <span className="about__stat-icon">{stat.icon}</span>
                  <span className="about__stat-value">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="about__stat-label">{t(`about.stats.${stat.key}`)}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
