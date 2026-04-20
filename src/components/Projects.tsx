import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import { fadeUp, staggerContainer } from "../utils/animations";
import projectsData from "../data/projects.json";
import "./Projects.css";
import { useLanguage } from "../context/LanguageContext";

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  category: string;
  github: string;
  live: string | null;
  featured: boolean;
  description_en?: string;
  longDescription_en?: string;
}

const filters = [
  { key: "all" },
  { key: "ai" },
  { key: "data" },
  { key: "fullstack" },
];

export default function Projects() {
  const { t, language } = useLanguage();
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    let filtered = projectsData;
    if (activeFilter !== "all") {
      filtered = projectsData.filter((p: Project) => p.category === activeFilter);
    }
    setProjects(filtered);
  }, [activeFilter]);

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={staggerContainer}>
          <motion.h2 className="section-title" variants={fadeUp}>
            <span className="gradient-text">{t('projects.title')}</span>
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeUp}>
            {t('projects.subtitle')}
          </motion.p>

          <motion.div className="projects__filters" variants={fadeUp}>
            {filters.map((f) => (
              <motion.button key={f.key} className={`projects__filter ${activeFilter === f.key ? "projects__filter--active" : ""}`}
                onClick={() => setActiveFilter(f.key)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                {t(`projects.filters.${f.key}`)}
              </motion.button>
            ))}
          </motion.div>

          <motion.div className="projects__grid" layout>
            <AnimatePresence mode="popLayout">
              {projects.map((p) => (
                <motion.div key={p.id} className="projects__card glass-card" layout
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.4 }}
                  whileHover={{ y: -8 }} onClick={() => setSelected(p)}>
                  <div className="projects__card-image">
                    <img src={p.image} alt={p.title} loading="lazy" />
                    <div className="projects__card-overlay"><span>{t('projects.details')}</span></div>
                  </div>
                  <div className="projects__card-body">
                    <h3 className="projects__card-title">{p.title}</h3>
                    <p className="projects__card-desc">{language === 'en' && p.description_en ? p.description_en : p.description}</p>
                    <div className="projects__card-tags">
                      {p.tags.map((t) => <span key={t} className="badge">{t}</span>)}
                    </div>
                    <div className="projects__card-links">
                      <a href={p.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                        <FaGithub /> Code
                      </a>
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                          <FaExternalLinkAlt /> Live
                        </a>
                      )}
                    </div>
                  </div>
                  {p.featured && <span className="projects__featured-badge">{t('projects.featured')}</span>}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div className="projects__modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <motion.div className="projects__modal glass-card"
              initial={{ opacity: 0, scale: 0.8, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}>
              <button className="projects__modal-close" onClick={() => setSelected(null)}><FaTimes /></button>
              <img src={selected.image} alt={selected.title} className="projects__modal-image" />
              <div className="projects__modal-content">
                <h3>{selected.title}</h3>
                <p>{language === 'en' && (selected as any).longDescription_en ? (selected as any).longDescription_en : selected.longDescription}</p>
                <div className="projects__card-tags">
                  {selected.tags.map((t) => <span key={t} className="badge">{t}</span>)}
                </div>
                <div className="projects__modal-actions">
                  <a href={selected.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary"><FaGithub /> GitHub</a>
                  {selected.live && <a href={selected.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><FaExternalLinkAlt /> Live</a>}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
