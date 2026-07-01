import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  description: string;
}

const educationData: EducationItem[] = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Sona College of Technology',
    period: '2024 — 2026',
    location: 'Salem, Tamil Nadu',
    description: 'Specializing in software engineering, advanced algorithm design, modern database architectures, and responsive web technologies. Maintaining high academic standing and engaged in practical IoT workflows.',
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Sona College of Arts & Science',
    period: '2021 — 2024',
    location: 'Salem, Tamil Nadu',
    description: 'Acquired core competencies in computer fundamentals, standard programming models (C, Java), database querying, database design, operating systems, and basic web styling.',
  },
  {
    degree: 'Higher Secondary Certificate (HSC - Class 12)',
    institution: 'State Board Higher Secondary School',
    period: '2020 — 2021',
    location: 'Tamil Nadu, India',
    description: 'Focused on Computer Science, Mathematics, Physics, and Chemistry. Developed initial interests in scripting and logical problem solving.',
  },
  {
    degree: 'Secondary School Leaving Certificate (SSLC - Class 10)',
    institution: 'State Board Secondary School',
    period: '2018 — 2019',
    location: 'Tamil Nadu, India',
    description: 'Completed general education with excellent marks, qualifying for the science-programming academic stream.',
  },
];

export const Education: React.FC = () => {
  return (
    <section id="education" className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto z-10 relative">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-2"
          >
            EDUCATION TIMELINE
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[3px] bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"
          />
        </div>

        {/* Timeline container */}
        <div className="relative border-l-2 border-white/5 md:border-l-0 pl-6 md:pl-0 text-left">
          {/* Vertical connecting line for desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 hidden md:block" />

          <div className="space-y-16">
            {educationData.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Glow Dot */}
                  <div className="absolute -left-[33px] md:left-1/2 md:-translate-x-1/2 top-1.5 w-6 h-6 rounded-full bg-slate-950 border-4 border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.5)] z-25 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  </div>

                  {/* Empty space filler for desktop alignment */}
                  <div className="w-full md:w-1/2" />

                  {/* Actual Timeline Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="w-full md:w-[45%] rounded-2xl glassmorphism border border-white/5 hover:border-cyan-500/20 p-6 sm:p-8 hover:scale-[1.01] transition-all relative overflow-hidden group shadow-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div className="flex flex-wrap gap-2 items-center text-xs font-mono text-cyan-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {item.period}
                      </span>
                      <span className="text-slate-600">|</span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <MapPin className="w-3.5 h-3.5" /> {item.location}
                      </span>
                    </div>

                    <h3 className="font-display font-extrabold text-lg sm:text-xl text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {item.degree}
                    </h3>
                    <h4 className="text-slate-300 text-sm font-semibold mb-4 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-purple-400" /> {item.institution}
                    </h4>

                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Education;
