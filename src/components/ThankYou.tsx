import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const ThankYou: React.FC = () => {
  return (
    <section className="relative py-16 px-4 overflow-hidden text-center flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto space-y-4"
      >
        <div className="inline-flex p-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-2">
          <Heart className="w-6 h-6 animate-pulse text-cyan-400" />
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
          Thank You for Visiting!
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          I appreciate you taking the time to explore my portfolio. Feel free to reach out via email or connect with me on social media!
        </p>
      </motion.div>
    </section>
  );
};

export default ThankYou;
