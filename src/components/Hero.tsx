import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

const roles = ['MCA Student', 'Web Designer'];

export const Typewriter: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: any;
    const currentWord = roles[currentWordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) => currentWord.slice(0, prev.length + 1));
      }, 100);
    }

    if (!isDeleting && currentText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <span className="text-cyan-400 font-mono font-semibold">
      {currentText}
      <span className="animate-[pulse_1s_infinite] ml-1 text-cyan-400 font-normal">|</span>
    </span>
  );
};

export const Hero: React.FC = () => {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden px-4"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">

        {/* Intro Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 text-left flex flex-col justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs sm:text-sm font-mono mb-6 w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            Ready for Opportunities
          </motion.div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-4 text-white">
            Hi, I'm{' '}
            <span className="inline-block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              Kishore P M
            </span>
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl text-slate-300 mb-6 font-sans">
            I am a <Typewriter />
          </h2>

          <p className="text-slate-400 text-base sm:text-lg max-w-xl mb-8 leading-relaxed font-sans">
            An enthusiastic MCA Student specializing in Python, Java, and modern Web Technologies.
            I build high-performance, user-friendly digital applications with sleek architectures and visual precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              onClick={() => handleScroll('projects')}
              className="group px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="./resume.pdf"
              download="Kishore_PM_Resume.pdf"
              className="px-6 py-3.5 rounded-xl border border-white/10 hover:border-cyan-500/40 bg-white/5 hover:bg-cyan-500/10 text-slate-300 hover:text-white font-medium flex items-center justify-center gap-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Download Resume</span>
            </a>
          </div>

          {/* Social Links Dock */}
          <div className="flex items-center gap-4">
            {[
              { icon: <GithubIcon className="w-5 h-5" />, href: 'https://github.com/Kishore1700', label: 'GitHub' },
              { icon: <LinkedinIcon className="w-5 h-5" />, href: 'https://linkedin.com/in/kishore-p-m', label: 'LinkedIn' },
              { icon: <Mail className="w-5 h-5" />, href: 'mailto:kishorepm.dev@gmail.com', label: 'Email' },
            ].map((social, idx) => (
              <motion.a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
                whileHover={{ y: -5, scale: 1.1 }}
                className="w-10 h-10 rounded-xl glassmorphism flex items-center justify-center text-slate-400 hover:text-cyan-400 border border-white/5 hover:border-cyan-500/30 transition-colors"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Visual Element: Futuristic Glow Card or Mock Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          className="lg:col-span-5 relative flex justify-center"
        >
          {/* Main Glow Ring */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur-[80px] opacity-20 animate-pulse duration-[6s] -z-10" />

          {/* Holographic Dev Card */}
          <div className="w-full max-w-[380px] aspect-square rounded-3xl glassmorphism border border-white/10 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            {/* Spotlight shimmer */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-50 pointer-events-none" />

            <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/70 animate-pulse" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70 animate-pulse [animation-delay:0.2s]" />
                <span className="w-3 h-3 rounded-full bg-green-500/70 animate-pulse [animation-delay:0.4s]" />
              </div>
              <span className="text-xs font-mono text-slate-500">Kishore.tsx</span>
            </div>

            {/* React Animated Component */}
            <div className="flex-1 flex flex-col items-center justify-center relative min-h-[180px] my-2 select-none">
              {/* Glowing Aura */}
              <div className="absolute w-24 h-24 rounded-full bg-cyan-500/20 blur-2xl animate-pulse -z-10" />

              {/* React Logo Orbits Container */}
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg
                  viewBox="-11.5 -10.23174 23 20.46348"
                  className="w-full h-full text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.7)]"
                >
                  {/* Orbit 1 */}
                  <motion.ellipse
                    rx="11"
                    ry="4.2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    style={{ transformOrigin: "0px 0px" }}
                  />
                  {/* Orbit 2 */}
                  <motion.ellipse
                    rx="11"
                    ry="4.2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    transform="rotate(60)"
                    animate={{ rotate: 420 }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    style={{ transformOrigin: "0px 0px" }}
                  />
                  {/* Orbit 3 */}
                  <motion.ellipse
                    rx="11"
                    ry="4.2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    transform="rotate(120)"
                    animate={{ rotate: 480 }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    style={{ transformOrigin: "0px 0px" }}
                  />
                  {/* Core / Nucleus */}
                  <motion.circle
                    cx="0"
                    cy="0"
                    r="2.2"
                    fill="currentColor"
                    animate={{ scale: [1, 1.25, 1], filter: ["drop-shadow(0 0 2px rgba(34,211,238,0.4))", "drop-shadow(0 0 8px rgba(34,211,238,0.8))", "drop-shadow(0 0 2px rgba(34,211,238,0.4))"] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  />
                </svg>
              </div>

              {/* Floating React badges */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute top-2 left-0 px-2 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] font-mono shadow-sm"
              >
                useState
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-6 right-2 px-2 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-mono shadow-sm"
              >
                useEffect
              </motion.div>

              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-2 left-6 px-2 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[10px] font-mono shadow-sm"
              >
                &lt;JSX /&gt;
              </motion.div>
            </div>

            <div className="border-t border-white/5 pt-4 mt-4 flex justify-between items-center text-xs text-slate-500 font-mono">
              <span>LOC: 120</span>
              <span className="text-cyan-400 animate-pulse">● READY</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default Hero;
