import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Layers, X, Flame, Award } from 'lucide-react';
import { GithubIcon } from './Icons';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured: boolean;
  longDesc?: string;
  metrics?: string[];
}

const projectsData: Project[] = [
  {
    id: 'nutrition-system',
    title: 'Nutritional Measurement System',
    category: 'Computer Vision & Health Tech',
    description: 'A smart nutrition analysis application that estimates calories, proteins, fats, carbs, and vitamins based on food recognition and portion size.',
    tags: ['Python', 'OpenCV', 'TensorFlow', 'Flask', 'React', 'Tailwind CSS'],
    github: 'https://github.com/Kishore1700/nutrition-measurement-system',
    featured: true,
    longDesc: 'The Nutritional Measurement System is designed to simplify dietary tracking and health monitoring. By utilizing deep learning models, it identifies food items from photos, estimates volume/portion sizes based on reference objects, and automatically calculates nutritional info (calories, macros, vitamins). Users can log daily intakes, track fitness goals, and view visual charts of their nutritional balance.',
    metrics: [
      '94% Food Recognition Accuracy',
      'Instant Macro-Nutrient Breakdown',
      'Portion Estimation using OpenCV Depth Map',
      'Vitamins & Minerals Tracker Dashboard',
    ],
  },
  {
    id: 'iot-env-monitor',
    title: 'IoT Environment Sentinel',
    category: 'Internet of Things (IoT)',
    description: 'An environmental monitoring system designed around the Adeno Board, tracking ambient telemetry and transmitting alerts via MQTT.',
    tags: ['C++', 'Python', 'MQTT', 'Flask', 'Adeno Board', 'IoT'],
    github: 'https://github.com/Kishore1700/iot-environment-sentinel',
    featured: false,
    longDesc: 'Developed in association with IoT studies, this project interfaces sensor modules (temperature, gas, light) with the Adeno microcontroller board. It translates raw serial data, coordinates alerts, and streams updates onto a real-time responsive web dashboard built with Flask and Python.',
    metrics: [
      'Sub-second telemetry data latency',
      'Automatic alerts via Twilio API',
      'Micro-power optimization routines',
    ],
  },
  {
    id: 'rpa-invoice-extractor',
    title: 'Automated RPA Invoice Extractor',
    category: 'Robotic Process Automation',
    description: 'A robot workflow built on UiPath that monitors incoming email attachments and extracts structured invoice data into databases.',
    tags: ['UiPath Studio', 'RPA', 'SQL', 'Excel Automation', 'OCR'],
    featured: false,
    longDesc: 'Created as part of RPA certification studies, this workflow checks a specified email folder for PDF invoices, applies OCR and regex patterns to capture keys (vendor, date, total, tax), validates entries against SQL databases, and appends summaries to spreadsheets.',
    metrics: [
      'Reduces manual extraction time by 90%',
      'Intelligent OCR exception handling',
      'Automated email notification summaries',
    ],
  },
];

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto z-10 relative text-left">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-2"
          >
            FEATURED PROJECTS
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[3px] bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"
          />
        </div>

        {/* Projects Layout */}
        <div className="space-y-12">
          {/* Featured Project Showcase */}
          {projectsData.filter(p => p.featured).map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="group relative rounded-3xl overflow-hidden glassmorphism border border-white/10 p-6 sm:p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 hover:border-cyan-500/30 transition-all duration-500"
            >
              {/* Highlight background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Left Column: Visual Mockup of Application */}
              <div className="lg:col-span-5 flex flex-col justify-center relative">
                <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full" />
                <div className="relative glassmorphism-light rounded-2xl border border-white/10 p-6 font-mono text-xs text-slate-300 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-cyan-400 font-bold flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 animate-bounce" /> NUTRITION_ENGINE
                    </span>
                    <span className="text-slate-500 text-[10px]">v1.0.2</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-500"># Input: food_image.jpg</p>
                    <p className="text-green-400">&gt; Loading TensorFlow Model...</p>
                    <p className="text-green-400">&gt; Object Detected: [Banana, Oats, Milk]</p>
                    <p className="text-green-400">&gt; Portions: 1x Medium, 50g, 200ml</p>
                  </div>
                  <div className="border-t border-white/5 pt-3 mt-2 grid grid-cols-2 gap-2 text-slate-400">
                    <div>
                      <p className="text-[10px] text-slate-500">CALORIES</p>
                      <p className="text-sm font-bold text-white">420 kcal</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">PROTEIN</p>
                      <p className="text-sm font-bold text-cyan-300">14.5 g</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">CARBS</p>
                      <p className="text-sm font-bold text-yellow-300">68 g</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">FATS</p>
                      <p className="text-sm font-bold text-purple-300">8.2 g</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Project Details */}
              <div className="lg:col-span-7 flex flex-col justify-between text-left">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-4 uppercase tracking-wider">
                    Featured Project
                  </div>
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-4 group-hover:text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300 transition-all duration-300">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-base leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-slate-900 border border-white/5 text-slate-400 text-xs font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-medium text-sm transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    View Details & Architecture
                  </button>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                    >
                      <GithubIcon className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Standard Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.filter(p => !p.featured).map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className="group p-6 rounded-2xl glassmorphism border border-white/5 hover:border-purple-500/30 flex flex-col justify-between hover:scale-[1.01] transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-purple-400 font-medium">
                      {project.category}
                    </span>
                    <Layers className="w-5 h-5 text-slate-500 group-hover:text-purple-400 transition-colors" />
                  </div>

                  <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-950 border border-white/5 text-slate-500 text-[10px] font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-cyan-400 hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      Read Case Study <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-white transition-colors"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                className="w-full max-w-2xl rounded-2xl glassmorphism border border-white/10 p-6 sm:p-8 relative overflow-y-auto max-h-[90vh] shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Header */}
                <div className="mb-6">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                    {selectedProject.category}
                  </span>
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
                    {selectedProject.title}
                  </h3>
                </div>

                {/* Modal Body */}
                <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
                  <div>
                    <h4 className="font-display font-bold text-white mb-2 text-xs uppercase tracking-wider">
                      Overview
                    </h4>
                    <p className="text-slate-400 leading-relaxed">
                      {selectedProject.longDesc || selectedProject.description}
                    </p>
                  </div>

                  {selectedProject.metrics && (
                    <div>
                      <h4 className="font-display font-bold text-white mb-3 text-xs uppercase tracking-wider flex items-center gap-1">
                        <Award className="w-4 h-4 text-cyan-400" /> Key Technical Achievements
                      </h4>
                      <ul className="list-none space-y-2 font-sans pl-1">
                        {selectedProject.metrics.map((metric, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-slate-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            {metric}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h4 className="font-display font-bold text-white mb-3 text-xs uppercase tracking-wider">
                      Built With
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded bg-slate-900 border border-white/5 text-slate-300 text-xs font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="mt-8 pt-4 border-t border-white/5 flex gap-4">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-white font-medium text-xs flex items-center gap-2 transition-all"
                    >
                      <GithubIcon className="w-4 h-4" /> View Code
                    </a>
                  )}
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2 hover:bg-cyan-400 transition-all"
                    >
                      Launch App
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
export default Projects;
