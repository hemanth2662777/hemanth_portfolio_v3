import React, { useState, useEffect } from "react";
import { Cursor } from "./components/Cursor";
import { EmbersCanvas } from "./components/EmbersCanvas";
import { IntroScreen } from "./components/IntroScreen";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { ProjectModal } from "./components/ProjectModal";
import { Experience } from "./components/Experience";
import { Education } from "./components/Education";
import { Certifications } from "./components/Certifications";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { SystemToast } from "./components/SystemToast";
import { ModalType } from "./types";
import { playAriseSound } from "./utils/audio";

export default function App() {
  const [isEntered, setIsEntered] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [toastState, setToastState] = useState<{
    show: boolean;
    message?: string;
    subMessage?: string;
  }>({
    show: false,
  });

  const showToast = (message: string, subMessage?: string) => {
    setToastState({ show: true, message, subMessage });
    setTimeout(() => {
      setToastState((prev) => ({ ...prev, show: false }));
    }, 3800);
  };

  const handleEnter = () => {
    if (isEntered) return;
    setIsEntered(true);
    playAriseSound();
    setTimeout(() => {
      showToast(
        "SHADOW REALM ONLINE",
        "System synchronization SSS-Tier initialized.",
      );
    }, 400);
  };

  // IntersectionObserver for reveal animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [isEntered]);

  return (
    <div className="relative min-h-screen bg-[#050507] text-[#e0e0ff] selection:bg-fuchsia-600/40 selection:text-white font-sans overflow-x-hidden">
      {/* Background Layers — Immersive UI System Grid & Radial Glow */}
      <div
        className="fixed inset-0 system-grid pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 glow-radial pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Decorative Static Embers from Immersive Theme */}
      <div
        className="ember top-[10%] left-[15%] opacity-40 pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="ember top-[45%] left-[85%] opacity-60 pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="ember top-[80%] left-[25%] opacity-30 pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="ember top-[20%] left-[70%] opacity-50 pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="ember top-[65%] left-[10%] opacity-40 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Interactive Physics Fluid Cursor */}
      <Cursor />

      {/* Atmospheric Dragon Embers Particle Canvas */}
      <EmbersCanvas />

      {/* Solo Leveling Dragon Fire Intro Screen */}
      <IntroScreen onEnter={handleEnter} isEntered={isEntered} />

      {/* Main Site Content Wrapper */}
      <div
        id="siteWrapper"
        className={`relative z-10 transition-all duration-1000 ease-out ${
          isEntered
            ? "opacity-100 translate-y-0 filter-none pointer-events-auto"
            : "opacity-0 translate-y-10 blur-sm pointer-events-none"
        }`}
      >
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Sections */}
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects onOpenModal={(type) => setActiveModal(type)} />
          <Experience />
          <Education />
          <Certifications />
          <Contact onShowToast={showToast} />
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Project Deep-Dive Interactive Modal */}
      <ProjectModal
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
      />

      {/* Solo Leveling HUD System Toast */}
      <SystemToast
        show={toastState.show}
        message={toastState.message}
        subMessage={toastState.subMessage}
      />
    </div>
  );
}
