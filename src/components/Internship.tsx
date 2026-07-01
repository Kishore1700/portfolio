import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, CheckCircle2, Zap } from 'lucide-react';

export const Internship: React.FC = () => {
  const responsibilities = [
    'Worked on the development of Internet of Applications (IoA) pipelines.',
    'Designed sensor communication systems using the Adeno micro-controller board.',
    'Coded helper telemetry parsing libraries in Python and C++ to clean analog inputs.',
    'Deployed local socket servers to stream board readings directly to development workstations.',
  ];

  return (
    <section id="internship" className="relative py-24 px-4 overflow-hidden">
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
            INTERNSHIP EXPERIENCE
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto rounded-3xl glassmorphism border border-white/10 p-6 sm:p-10 hover:border-purple-500/20 transition-all duration-300 relative overflow-hidden group"
        >
          {/* Subtle Ambient Background Gradient */}
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl pointer-events-none group-hover:bg-purple-500/20 transition-all" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-6 mb-8 text-left">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/20">
                <Cpu className="w-6 h-6 animate-[spin_8s_linear_infinite]" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                  Odugaa Tech
                </h3>
                <p className="text-purple-400 text-sm font-semibold tracking-wider uppercase font-mono">
                  IoT Engineering Intern
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end text-xs font-mono text-slate-500">
              <span className="text-slate-400 font-bold px-2.5 py-1 rounded bg-white/5 border border-white/5">
                Jun 2025 — Aug 2025
              </span>
              <span className="mt-1 flex items-center gap-1 text-cyan-400">
                <Zap className="w-3.5 h-3.5" /> Completed
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            {/* Responsibilities Details */}
            <div className="lg:col-span-7 space-y-4">
              <p className="text-slate-300 font-sans text-base leading-relaxed">
                During my tenure at Odugaa Tech, I was actively immersed in embedded hardware integration and data communication schemas. 
                I focused on building interface components and coding functional routines for local and cloud environments.
              </p>
              <div className="space-y-3">
                {responsibilities.map((resp, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hardware Representation Graphic */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="w-full max-w-[280px] aspect-[4/3] rounded-2xl bg-slate-950 border border-white/5 p-4 flex flex-col justify-between font-mono text-[10px] text-slate-400 shadow-inner select-none">
                <div className="flex justify-between items-center text-slate-500">
                  <span>ADENO_SDK_V3</span>
                  <span className="text-green-400 animate-pulse">● CONNECTED</span>
                </div>
                
                {/* Visual hardware nodes */}
                <div className="flex flex-col gap-2 my-2 py-2 border-y border-white/5">
                  <div className="flex justify-between items-center text-[9px]">
                    <span className="text-purple-400">SYS_VOLTAGE:</span>
                    <span className="text-slate-300">3.3V [STABLE]</span>
                  </div>
                  <div className="flex justify-between items-center text-[9px]">
                    <span className="text-purple-400">ADC_PIN_A0:</span>
                    <span className="text-cyan-400 font-bold">1024 [MAX]</span>
                  </div>
                  <div className="flex justify-between items-center text-[9px]">
                    <span className="text-purple-400">MQTT_STATUS:</span>
                    <span className="text-emerald-400">PUBLISHED_OK</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[8px] text-slate-600">
                  <span>BOARD: ADENO_B1</span>
                  <span>RATE: 9600 bps</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default Internship;
