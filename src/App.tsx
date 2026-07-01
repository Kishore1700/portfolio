
import Navbar from './components/Navbar';
import SpotlightBg from './components/SpotlightBg';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Internship from './components/Internship';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Footer from './components/Footer';
import ThankYou from './components/ThankYou';

function App() {
  return (
    <div className="relative min-h-screen text-slate-100 bg-[#030014] font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background spotlights & grids */}
      <SpotlightBg />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Layout Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-12">
        <Hero />

        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent my-4" />
        <About />

        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent my-4" />
        <Skills />

        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent my-4" />
        <Projects />

        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent my-4" />
        <Internship />

        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent my-4" />
        <Education />

        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent my-4" />
        <Certifications />

        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent my-4" />
        <ThankYou />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
