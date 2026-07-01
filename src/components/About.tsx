import React from 'react';
import { motion } from 'framer-motion';
import { Code, BookOpen, GraduationCap, Heart } from 'lucide-react';

export const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  };

  const highlights = [
    {
      icon: <GraduationCap className="w-6 h-6 text-cyan-400" />,
      title: 'MCA Student',
      desc: 'Sona College of Technology, pursuing master level software engineering education.',
    },
    {
      icon: <Code className="w-6 h-6 text-blue-400" />,
      title: 'Developer & Programmer',
      desc: 'Skilled in writing clean, efficient backend logic using Python and Java.',
    },
    {
      icon: <BookOpen className="w-6 h-6 text-purple-400" />,
      title: 'Problem Solver',
      desc: 'Passionate about structural data concepts, algorithm modeling, and DSA.',
    },
  ];

  return (
    <section id="about" className="relative py-24 px-4 overflow-hidden">
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
            ABOUT ME
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[3px] bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Detailed Narrative */}
          <motion.div variants={itemVariants} className="lg:col-span-6 text-left">
            <h3 className="font-display font-semibold text-2xl text-slate-100 mb-6 flex items-center gap-2">
              Discovering My Technology Journey <Heart className="w-5 h-5 text-red-500 animate-pulse" />
            </h3>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              I am a passionate MCA student deeply interested in software development, web technologies, and solving complex algorithmic challenges. 
              My academic journey has equipped me with strong foundations in computing principles, logic, and core coding standards.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              Skilled in Python, Java, frontend development, and designing database solutions, I thrive on crafting user-friendly interfaces backed by solid architecture. 
              I enjoy bridging the gap between design and functionality, creating applications that are both visually appealing and highly performant.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed">
              When I'm not coding, I'm exploring new technologies, participating in functional challenges, or learning about system configurations and architectures.
            </p>
          </motion.div>

          {/* Cards & Info Grid */}
          <motion.div variants={itemVariants} className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-1 gap-6">
            {highlights.map((highlight, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="p-6 rounded-2xl glassmorphism border border-white/5 hover:border-cyan-500/30 flex items-start gap-4 text-left group transition-all"
              >
                <div className="p-3 rounded-xl bg-white/5 group-hover:bg-cyan-500/10 transition-colors">
                  {highlight.icon}
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {highlight.title}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {highlight.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
export default About;
