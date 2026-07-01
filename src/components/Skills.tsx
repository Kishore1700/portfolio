import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  percentage: number;
}

interface SkillCategory {
  categoryName: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    categoryName: 'Languages',
    skills: [
      { name: 'Python', percentage: 90 },
      { name: 'Java', percentage: 80 },
      { name: 'C', percentage: 75 },
      { name: 'JavaScript', percentage: 80 },
    ],
  },
  {
    categoryName: 'Frontend / Web',
    skills: [
      { name: 'HTML', percentage: 90 },
      { name: 'CSS', percentage: 85 },
    ],
  },
  {
    categoryName: 'Databases',
    skills: [
      { name: 'SQL', percentage: 85 },
      { name: 'MongoDB', percentage: 75 },
    ],
  },
  {
    categoryName: 'Core Computer Science',
    skills: [
      { name: 'DSA', percentage: 80 },
      { name: 'OOPS Concepts', percentage: 85 },
      { name: 'OS Concepts', percentage: 80 },
    ],
  },
];

export const Skills: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  return (
    <section id="skills" className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-2"
          >
            SKILLS & ABILITIES
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[3px] bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"
          />
        </div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              variants={categoryVariants}
              className="p-6 sm:p-8 rounded-2xl glassmorphism border border-white/5 hover:border-blue-500/20 transition-all flex flex-col justify-between"
            >
              <h3 className="font-display font-bold text-xl text-cyan-400 mb-6 text-left border-b border-white/5 pb-3">
                {cat.categoryName}
              </h3>

              <div className="space-y-6">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-sans font-medium text-slate-200">{skill.name}</span>
                      <span className="font-mono text-cyan-400">{skill.percentage}%</span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="h-2 w-full bg-slate-950/80 rounded-full overflow-hidden border border-white/5 relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: sIdx * 0.1 }}
                        className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default Skills;
