import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  SiReact, SiTypescript, SiNextdotjs, SiVuedotjs, SiCss, SiTailwindcss,
  SiNodedotjs, SiPython, SiGo, SiPostgresql, SiMongodb, SiGraphql,
  SiDocker, SiKubernetes, SiLinux, SiTerraform,
  SiGit, SiFigma, SiJest, SiWebpack, SiVite,
  SiPandas, SiScikitlearn, SiJavascript
} from "react-icons/si";
import { FaAws, FaCode, FaDatabase, FaServer, FaChartBar, FaTable, FaJava, FaBrain, FaUsers, FaClipboardList, FaLanguage } from "react-icons/fa";
import { SiGithubactions } from "react-icons/si";
import { fadeUp, staggerContainer } from "../utils/animations";
import skillsData from "../data/skills.json";
import "./Skills.css";
import { useLanguage } from "../context/LanguageContext";

const iconMap: Record<string, React.ReactNode> = {
  SiReact: <SiReact />,
  SiTypescript: <SiTypescript />,
  SiNextdotjs: <SiNextdotjs />,
  SiVuedotjs: <SiVuedotjs />,
  SiCss: <SiCss />,
  SiTailwindcss: <SiTailwindcss />,
  SiNodedotjs: <SiNodedotjs />,
  SiPython: <SiPython />,
  SiGo: <SiGo />,
  SiPostgresql: <SiPostgresql />,
  SiMongodb: <SiMongodb />,
  SiGraphql: <SiGraphql />,
  SiDocker: <SiDocker />,
  SiAmazonwebservices: <FaAws />,
  SiGithubactions: <SiGithubactions />,
  SiKubernetes: <SiKubernetes />,
  SiLinux: <SiLinux />,
  SiTerraform: <SiTerraform />,
  SiGit: <SiGit />,
  SiFigma: <SiFigma />,
  SiVisualstudiocode: <FaCode />,
  SiJest: <SiJest />,
  SiWebpack: <SiWebpack />,
  SiVite: <SiVite />,
  FaDatabase: <FaDatabase />,
  FaServer: <FaServer />,
  FaChartBar: <FaChartBar />,
  FaTable: <FaTable />,
  FaJava: <FaJava />,
  FaBrain: <FaBrain />,
  FaUsers: <FaUsers />,
  FaClipboardList: <FaClipboardList />,
  FaLanguage: <FaLanguage />,
  SiPandas: <SiPandas />,
  SiScikitlearn: <SiScikitlearn />,
  SiJavascript: <SiJavascript />
};

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

interface SkillsData {
  categories: SkillCategory[];
}

export default function Skills() {
  const { t } = useLanguage();
  const categoryTabs: string[] = t('skills.tabs');
  const [data] = useState<SkillsData | null>(skillsData);
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const activeCategory = data?.categories[activeTab];

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h2 className="section-title" variants={fadeUp}>
            <span className="gradient-text">{t('skills.title')}</span>
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeUp}>
            {t('skills.subtitle')}
          </motion.p>

          {/* Tabs */}
          <motion.div className="skills__tabs" variants={fadeUp}>
            {categoryTabs.map((tab, i) => (
              <motion.button
                key={tab}
                className={`skills__tab ${activeTab === i ? "skills__tab--active" : ""}`}
                onClick={() => setActiveTab(i)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab}
                {activeTab === i && (
                  <motion.span
                    className="skills__tab-bg"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Skills Grid */}
          {activeCategory && (
            <motion.div
              className="skills__grid"
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {activeCategory.skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  className="skills__card glass-card"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  whileHover={{
                    scale: 1.05,
                    borderColor: "rgba(124, 58, 237, 0.4)",
                    boxShadow: "0 0 30px rgba(124, 58, 237, 0.2)",
                  }}
                >
                  <div className="skills__card-icon">
                    {iconMap[skill.icon] || <SiReact />}
                  </div>
                  <h3 className="skills__card-name">{skill.name}</h3>
                  <div className="skills__progress-bar">
                    <motion.div
                      className="skills__progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: i * 0.08 + 0.3, ease: "easeOut" }}
                    />
                  </div>
                  <span className="skills__level">{skill.level}%</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Orbit Decoration */}
      <div className="skills__orbit">
        <div className="skills__orbit-ring skills__orbit-ring--1" />
        <div className="skills__orbit-ring skills__orbit-ring--2" />
        <div className="skills__orbit-ring skills__orbit-ring--3" />
      </div>
    </section>
  );
}
