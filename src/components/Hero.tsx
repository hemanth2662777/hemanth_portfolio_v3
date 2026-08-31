import React, { useRef, useState } from "react";
import {
  ArrowRight,
  Download,
  MapPin,
  GraduationCap,
  Code2,
  Sparkles,
  Terminal,
} from "lucide-react";
import { playClickSound, playWhooshSound } from "../utils/audio";

export const Hero: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardStyle, setCardStyle] = useState<React.CSSProperties>({});
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setCardStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCardStyle({
      transform:
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    });
  };

  const handleProjectsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    playClickSound();
    const projectsEl = document.getElementById("projects");
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="hero relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden"
    >
      {/* Background Neon Nebula Glows */}
      <div
        className="absolute -left-40 top-1/4 w-96 h-96 rounded-full bg-purple-600/15 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -right-40 bottom-1/4 w-96 h-96 rounded-full bg-pink-600/10 blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-8">
        <div className="hero-grid grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-7 reveal">
            {/* Status Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-fuchsia-500/40 bg-black/60 text-fuchsia-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-[0_0_15px_rgba(192,38,211,0.25)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500 shadow-[0_0_8px_#c026d3]"></span>
              </span>
              <span>Available for opportunities</span>
              <span className="text-purple-400/50">|</span>
              <span className="text-fuchsia-400 flex items-center gap-1 font-mono text-[11px] font-bold">
                <Sparkles className="w-3 h-3 text-fuchsia-400" /> SSS-RANK
                DETECTED
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold font-space tracking-tight leading-[1.08] text-[#e0e0ff]">
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-pink-500 font-black drop-shadow-[0_0_25px_rgba(192,38,211,0.5)]">
                Hemanth.
              </span>
              <br />
              <span className="text-white">Java Full Stack Developer.</span>
            </h1>

            {/* Description */}
            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              AI &amp; Data Science graduate focused on building responsive,
              database-driven web applications using Java, Advanced Java, SQL,
              and modern web technologies.
            </p>

            {/* Hero Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                onClick={handleProjectsClick}
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 border border-fuchsia-400/50 shadow-[0_0_25px_rgba(192,38,211,0.4)] hover:shadow-[0_0_40px_rgba(192,38,211,0.7)] hover:scale-[1.03] transition-all duration-300"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 text-pink-200 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="public/resume.pdf"
                download
                onClick={() => playWhooshSound()}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-neutral-200 bg-black/60 border border-purple-500/35 hover:border-fuchsia-400/60 hover:bg-purple-950/40 hover:text-white hover:shadow-[0_0_20px_rgba(192,38,211,0.3)] hover:scale-[1.03] transition-all duration-300"
              >
                <Download className="w-4 h-4 text-fuchsia-400 group-hover:translate-y-0.5 transition-transform" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Micro Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono text-purple-300/80">
              <span className="px-2.5 py-1 rounded-md bg-purple-900/20 border border-purple-500/30 flex items-center gap-1 text-[11px]">
                <Terminal className="w-3 h-3 text-fuchsia-400" /> Java 17+
              </span>
              <span className="px-2.5 py-1 rounded-md bg-purple-900/20 border border-purple-500/30 text-[11px]">
                Advanced Java (Servlets/JDBC)
              </span>
              <span className="px-2.5 py-1 rounded-md bg-purple-900/20 border border-purple-500/30 text-[11px]">
                MySQL &amp; Relational Databases
              </span>
              <span className="px-2.5 py-1 rounded-md bg-purple-900/20 border border-purple-500/30 text-[11px]">
                Machine Learning &amp; CNN
              </span>
            </div>
          </div>

          {/* Right Column: Immersive Player Stats & 3D Tilt HUD Card */}
          <div className="lg:col-span-5 flex flex-col gap-4 reveal">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={cardStyle}
              className="bg-black/60 neon-border p-6 rounded-2xl backdrop-blur-lg will-change-transform space-y-5"
            >
              {/* Header inside Card */}
              <div className="flex items-center justify-between border-b border-purple-900/30 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border-2 border-fuchsia-600 flex items-center justify-center bg-black shadow-[0_0_12px_rgba(192,38,211,0.5)]">
                    <span className="text-base font-black text-fuchsia-500 font-mono">
                      SSS
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[0.35em] text-fuchsia-400 font-bold font-mono">
                      System User
                    </h3>
                    <p className="text-xl font-bold font-space text-white">
                      CHELIMALA HEMANTH
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest text-fuchsia-400 bg-fuchsia-950/40 border border-fuchsia-500/30">
                  SHADOW HUNTER
                </span>
              </div>

              {/* Player Stats Sliders */}
              <div className="space-y-3.5">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-fuchsia-400 uppercase tracking-widest font-bold">
                    CORE STATS
                  </span>
                  <span className="text-gray-400 text-[10px]">
                    RANK: SSS-CLASS
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono uppercase text-gray-300">
                    <span>Full Stack Java</span>
                    <span className="text-fuchsia-400 font-bold">142</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                    <div
                      className="h-full stat-bar-fill"
                      style={{ width: "88%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono uppercase text-gray-300">
                    <span>Database &amp; SQL</span>
                    <span className="text-fuchsia-400 font-bold">131</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                    <div
                      className="h-full stat-bar-fill"
                      style={{ width: "82%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono uppercase text-gray-300">
                    <span>AI &amp; Data Science</span>
                    <span className="text-fuchsia-400 font-bold">118</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                    <div
                      className="h-full stat-bar-fill"
                      style={{ width: "74%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono uppercase text-gray-300">
                    <span>Problem Solving</span>
                    <span className="text-fuchsia-400 font-bold">95</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                    <div
                      className="h-full stat-bar-fill"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Active Skills from Immersive Theme */}
              <div className="pt-2 border-t border-purple-900/30">
                <h4 className="text-[10px] uppercase tracking-widest text-gray-400 mb-3 font-mono">
                  Active Skills
                </h4>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="h-10 bg-purple-900/20 border border-purple-500/30 rounded flex items-center justify-center text-[10px] font-mono text-fuchsia-300 hover:border-fuchsia-400 transition-colors">
                    SPRING / JAVA
                  </div>
                  <div className="h-10 bg-purple-900/20 border border-purple-500/30 rounded flex items-center justify-center text-[10px] font-mono text-fuchsia-300 hover:border-fuchsia-400 transition-colors">
                    MYSQL INDEXING
                  </div>
                  <div className="h-10 bg-purple-900/20 border border-purple-500/30 rounded flex items-center justify-center text-[10px] font-mono text-fuchsia-300 hover:border-fuchsia-400 transition-colors">
                    CNN / OPENCV
                  </div>
                  <div className="h-10 bg-purple-900/20 border border-purple-500/30 rounded flex items-center justify-center text-[10px] font-mono text-fuchsia-300 hover:border-fuchsia-400 transition-colors">
                    ARISE / REST API
                  </div>
                </div>
              </div>
            </div>

            {/* Quest Reward Ready Box from Theme */}
            <div className="bg-fuchsia-950/40 border border-fuchsia-500/30 p-4 rounded-xl flex items-center gap-4 backdrop-blur-md shadow-[0_0_15px_rgba(192,38,211,0.15)]">
              <div className="w-10 h-10 bg-fuchsia-600 rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_10px_#c026d3]">
                <div className="w-5 h-5 border-2 border-white rotate-45"></div>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-fuchsia-400 font-mono">
                  Hunter Status: SSS-Tier
                </p>
                <p className="text-xs text-gray-300">
                  Available for Java full-stack and AI software engineering
                  roles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
