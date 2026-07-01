import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      return;
    }

    setStatus('submitting');

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStatus('success');

    // Trigger confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setStatus('idle');
  };

  return (
    <section id="contact" className="relative py-24 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none -z-10" />

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
            GET IN TOUCH
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[3px] bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Contact Details Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between gap-6 text-left"
          >
            <div className="space-y-6">
              <h3 className="font-display font-bold text-2xl text-white">Let's Connect</h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Whether you have a project idea, a job opportunity, or just want to chat about Python, IoT, or Web Development, feel free to drop me a message!
              </p>

              <div className="space-y-4 pt-4">
                {/* Email Card */}
                <div className="flex items-center gap-4 p-4 rounded-xl glassmorphism border border-white/5 hover:border-cyan-500/20 transition-all group">
                  <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-mono">Email Address</p>
                    <a
                      href="mailto:kishorepm.dev@gmail.com"
                      className="text-sm font-semibold text-slate-200 hover:text-cyan-400 transition-colors"
                    >
                      kishorepm.dev@gmail.com
                    </a>
                  </div>
                </div>

                {/* Location Card */}
                <div className="flex items-center gap-4 p-4 rounded-xl glassmorphism border border-white/5 hover:border-purple-500/20 transition-all group">
                  <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-mono">Location</p>
                    <p className="text-sm font-semibold text-slate-200">
                      Salem, Tamil Nadu, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro mock layout to fill visual space and look premium */}
            <div className="hidden lg:block p-6 rounded-2xl glassmorphism border border-white/5 text-xs font-mono text-slate-500 space-y-2">
              <div className="flex justify-between items-center text-slate-400">
                <span>CONNECTIVITY_STATUS</span>
                <span className="text-green-400 animate-pulse">● READY</span>
              </div>
              <p>&gt; ping -c 3 kishorepm.dev</p>
              <p className="text-slate-400">
                64 bytes from kishorepm.dev: icmp_seq=1 ttl=64 time=0.04 ms
              </p>
              <p className="text-slate-400">
                64 bytes from kishorepm.dev: icmp_seq=2 ttl=64 time=0.03 ms
              </p>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 rounded-2xl glassmorphism border border-white/10 relative overflow-hidden">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 space-y-4"
                >
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 animate-bounce" />
                  <h3 className="font-display font-extrabold text-2xl text-white">Message Sent!</h3>
                  <p className="text-slate-400 text-sm max-w-sm">
                    Thank you for reaching out, {formData.name}! I will get back to you as soon as possible.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-6 px-5 py-2.5 rounded-xl border border-white/10 hover:border-cyan-500/40 bg-white/5 hover:bg-cyan-500/10 text-slate-300 hover:text-white text-sm font-semibold transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs text-slate-400 font-medium font-sans">
                        Full Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs text-slate-400 font-medium font-sans">
                        Email Address <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="your.email@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs text-slate-400 font-medium font-sans">
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Collaboration opportunity, project query, etc."
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 focus:outline-none transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs text-slate-400 font-medium font-sans">
                      Message <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Hi Kishore, I'd love to connect regarding..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 focus:outline-none transition-all resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-xs text-red-400 font-sans"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Please fill out all required fields.</span>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-cyan-500/30 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {status === 'submitting' ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
