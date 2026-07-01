import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative border-t border-white/5 bg-slate-950/60 py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 z-10 relative">
        {/* Branding & Info */}
        <div className="text-center md:text-left">
          <p className="font-display font-bold text-base tracking-wider text-white">
            KISHORE P M
          </p>
          <p className="text-slate-500 text-xs mt-1 font-mono">
            MCA Student | Developer | Designer
          </p>
        </div>

        {/* Copyright */}
        <p className="text-slate-500 text-xs sm:text-sm font-sans order-3 md:order-2">
          &copy; {new Date().getFullYear()} Kishore P M. All rights reserved.
        </p>

        {/* Social Link Dock & Back to Top */}
        <div className="flex items-center gap-6 order-2 md:order-3">
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Kishore1700"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/kishore-p-m"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a
              href="mailto:kishorepm.dev@gmail.com"
              className="text-slate-500 hover:text-white transition-colors"
              title="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <div className="w-[1px] h-6 bg-white/10" />

          <button
            onClick={handleScrollTop}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 text-slate-400 hover:text-cyan-400 transition-colors focus:outline-none cursor-pointer"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
