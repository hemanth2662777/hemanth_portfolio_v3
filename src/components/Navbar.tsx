import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Menu, X } from "lucide-react";
import { playClickSound, toggleAudioMute, isSoundMuted } from "../utils/audio";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMuted(isSoundMuted());

    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress =
        totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0;
      setScrollProgress(progress);
      setIsScrolled(currentScroll > 40);

      // ScrollSpy
      const sections = navItems.map((item) => item.href.substring(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    playClickSound();
    setIsMenuOpen(false);

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleSoundToggle = () => {
    const nextMuted = toggleAudioMute();
    setMuted(nextMuted);
    if (!nextMuted) {
      playClickSound();
    }
  };

  return (
    <>
      {/* Top Laser Scroll Progress Bar */}
      <div
        id="scrollProgress"
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 z-[100000] shadow-[0_0_12px_#c026d3] transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <header
        id="siteHeader"
        className={`site-header fixed top-0 left-0 w-full z-[1000] transition-all duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-purple-900/40 shadow-[0_10px_30px_rgba(0,0,0,0.9)] py-3"
            : "bg-black/40 backdrop-blur-md border-b border-purple-900/30 py-4"
        }`}
      >
        <nav
          className="container mx-auto px-4 md:px-8 flex items-center justify-between"
          aria-label="Primary navigation"
        >
          {/* Logo with SSS Badge from Immersive Theme */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="logo group relative flex items-center gap-3.5 transition-transform hover:scale-105"
            aria-label="Chelimala Hemanth - Home"
          >
            <div className="w-10 h-10 rounded-full border border-fuchsia-600 flex items-center justify-center bg-black shadow-[0_0_10px_rgba(192,38,211,0.5)]">
              <span className="text-xs font-black text-fuchsia-500 font-mono tracking-tighter">
                SSS
              </span>
            </div>
            <div>
              <span className="text-[10px] block uppercase tracking-[0.35em] text-fuchsia-400 font-bold font-mono leading-none">
                System Dev
              </span>
              <p className="text-lg font-space font-extrabold text-white tracking-tight leading-tight">
                HEMANTH
                <span className="text-fuchsia-500 drop-shadow-[0_0_8px_#c026d3]">
                  .
                </span>
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <li key={item.href} className="group cursor-pointer">
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-[11px] font-bold tracking-widest uppercase transition-all duration-300 block pb-1 ${
                      isActive
                        ? "text-fuchsia-400"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <div
                      className={`h-0.5 transition-all duration-300 ${
                        isActive
                          ? "w-full bg-fuchsia-600 shadow-[0_0_8px_#c026d3]"
                          : "w-0 group-hover:w-full bg-fuchsia-400/60"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right Action Icons: Realm Status + Audio Toggle + Mobile Menu */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right pr-2">
              <p className="text-[9px] uppercase tracking-widest text-gray-500 font-mono">
                Current Realm
              </p>
              <p className="text-xs font-mono text-fuchsia-300 font-semibold tracking-tighter">
                SHADOW_DEV_001
              </p>
            </div>

            {/* Procedural Audio Synthesizer Toggle */}
            <button
              type="button"
              onClick={handleSoundToggle}
              className="relative p-2 rounded-lg border border-purple-500/30 bg-black/60 text-fuchsia-300 hover:text-white hover:border-fuchsia-400 hover:bg-purple-950/50 transition-all shadow-[0_0_10px_rgba(192,38,211,0.2)] flex items-center justify-center"
              title={muted ? "Unmute Sound Effects" : "Mute Sound Effects"}
              aria-label={muted ? "Unmute Sound Effects" : "Mute Sound Effects"}
            >
              {muted ? (
                <VolumeX className="w-4 h-4 text-gray-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-fuchsia-400 animate-pulse" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              id="menuBtn"
              type="button"
              onClick={() => {
                playClickSound();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="lg:hidden p-2 rounded-lg border border-purple-500/30 bg-black/60 text-fuchsia-200 hover:text-white hover:border-fuchsia-400 transition-all"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="navLinks"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Drawer */}
        <div
          id="navLinks"
          className={`lg:hidden transition-all duration-300 ease-in-out px-4 overflow-hidden ${
            isMenuOpen
              ? "max-h-[500px] opacity-100 mt-3 pb-4"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-black/90 neon-border rounded-xl p-4 backdrop-blur-2xl space-y-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`block px-4 py-2.5 rounded-lg text-xs uppercase font-bold tracking-wider transition-all ${
                    isActive
                      ? "bg-fuchsia-600/20 text-fuchsia-400 border border-fuchsia-500/50"
                      : "text-gray-300 hover:bg-purple-900/20 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      </header>
    </>
  );
};
