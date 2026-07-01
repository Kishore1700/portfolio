import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, ShieldCheck, ExternalLink } from 'lucide-react';

interface Certification {
  title: string;
  issuer: string;
  icon: React.ReactNode;
  id: string;
  color: string;
}

const certificationsList: Certification[] = [
  {
    title: 'UiPath Robotic Process Automation (RPA)',
    issuer: 'UiPath Academy',
    icon: <ShieldCheck className="w-8 h-8 text-blue-400" />,
    id: 'Credential ID: UIP-RPA-9932',
    color: 'from-blue-500/20 to-cyan-500/20 hover:border-blue-500/30',
  },
  {
    title: 'Oracle Cloud Infrastructure Architecture (OCI)',
    issuer: 'Oracle University',
    icon: <Award className="w-8 h-8 text-orange-400" />,
    id: 'Credential ID: OCI-ARCH-4402',
    color: 'from-orange-500/20 to-red-500/20 hover:border-orange-500/30',
  },
  {
    title: 'Infosys UNNATI Employability Skills',
    issuer: 'Infosys Springboard',
    icon: <CheckCircle className="w-8 h-8 text-emerald-400" />,
    id: 'Credential ID: INF-UNN-7819',
    color: 'from-emerald-500/20 to-teal-500/20 hover:border-emerald-500/30',
  },
];

export const Certifications: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
  };

  return (
    <section id="certifications" className="relative py-24 px-4 overflow-hidden">
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
            CERTIFICATIONS
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
        >
          {certificationsList.map((cert, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`p-6 rounded-2xl glassmorphism border border-white/5 bg-gradient-to-br ${cert.color} transition-all duration-300 flex flex-col justify-between`}
            >
              <div>
                <div className="mb-6 w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                  {cert.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2 tracking-wide leading-snug">
                  {cert.title}
                </h3>
                <p className="text-slate-400 text-sm font-medium mb-1">
                  Issued by: <span className="text-cyan-400">{cert.issuer}</span>
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-xs font-mono text-slate-500">
                <span>{cert.id}</span>
                <span className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 cursor-pointer">
                  Verify <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default Certifications;
