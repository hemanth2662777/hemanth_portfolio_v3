import React from "react";
import { Sparkles, Brain, Cpu, Database, Award } from "lucide-react";

export const About: React.FC = () => {
  return (
    <section id="about" className="section relative py-28 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-purple-600/10 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-8">
        {/* Section Heading */}
        <div className="section-heading max-w-3xl mb-16 reveal">
          <div className="inline-flex items-center gap-2 text-fuchsia-400 font-mono text-xs uppercase tracking-[0.4em] font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>01 / BACKGROUND &amp; PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-space text-[#e0e0ff] tracking-tight leading-tight">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-500 drop-shadow-[0_0_20px_rgba(192,38,211,0.5)]">
              Me
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mt-3">
            A developer combining full-stack development, data, and artificial
            intelligence skills.
          </p>
        </div>

        {/* About Grid */}
        <div className="about-grid grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Highlight Box */}
          <div className="lg:col-span-4 about-box flex flex-col justify-between p-8 rounded-2xl bg-black/60 neon-border backdrop-blur-lg group hover:border-fuchsia-400/80 transition-all duration-500 reveal">
            <div className="space-y-4">
              <span className="text-5xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-500">
                01
              </span>
              <div className="space-y-1">
                <h3 className="text-xl font-bold font-space text-white group-hover:text-fuchsia-300 transition-colors">
                  Developer Mindset
                </h3>
                <p className="text-xs font-mono text-fuchsia-400 uppercase tracking-wider">
                  Build. Learn. Improve. Repeat.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-purple-900/40 space-y-3">
              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <Brain className="w-4 h-4 text-fuchsia-400" />
                <span>Analytical Problem Solver</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <Cpu className="w-4 h-4 text-pink-400" />
                <span>Modern OOP &amp; System Architecture</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <Database className="w-4 h-4 text-fuchsia-400" />
                <span>Optimized SQL &amp; Data Pipelines</span>
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-8 space-y-6 flex flex-col justify-between">
            <div className="about-text p-8 rounded-2xl bg-black/60 neon-border backdrop-blur-lg space-y-4 text-neutral-300 text-base leading-relaxed reveal">
              <p>
                I'm{" "}
                <strong className="text-white font-semibold">
                  Chelimala Hemanth
                </strong>
                , an Artificial Intelligence &amp; Data Science graduate with a
                strong foundation in{" "}
                <span className="text-fuchsia-300 font-medium">
                  Java Full Stack Web Development
                </span>
                ,{" "}
                <span className="text-fuchsia-300 font-medium">
                  Python programming
                </span>
                , and{" "}
                <span className="text-pink-300 font-medium">
                  Machine Learning
                </span>
                .
              </p>
              <p>
                I enjoy developing responsive web applications, working with
                databases, writing SQL queries, and applying object-oriented
                programming principles to practical problems.
              </p>
              <p>
                My project experience includes a{" "}
                <span className="text-fuchsia-300">
                  Java-based food delivery application
                </span>
                , a{" "}
                <span className="text-pink-300">
                  CNN-based rice classification system
                </span>
                , and a{" "}
                <span className="text-fuchsia-300">
                  credit score prediction and risk assessment project
                </span>
                .
              </p>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 reveal">
              <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-900/20 text-center hover:border-fuchsia-400/60 hover:bg-purple-900/30 transition-all shadow-[0_0_10px_rgba(192,38,211,0.15)]">
                <div className="text-2xl font-black font-space text-white">
                  8.3
                </div>
                <div className="text-[11px] font-mono text-fuchsia-300 uppercase tracking-wider mt-1">
                  B.Tech CGPA
                </div>
              </div>

              <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-900/20 text-center hover:border-fuchsia-400/60 hover:bg-purple-900/30 transition-all shadow-[0_0_10px_rgba(192,38,211,0.15)]">
                <div className="text-2xl font-black font-space text-fuchsia-400 flex items-center justify-center gap-1">
                  <Award className="w-4 h-4" /> Top 2
                </div>
                <div className="text-[11px] font-mono text-fuchsia-300 uppercase tracking-wider mt-1">
                  Branch Rank
                </div>
              </div>

              <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-900/20 text-center hover:border-fuchsia-400/60 hover:bg-purple-900/30 transition-all shadow-[0_0_10px_rgba(192,38,211,0.15)]">
                <div className="text-2xl font-black font-space text-white">
                  3+
                </div>
                <div className="text-[11px] font-mono text-fuchsia-300 uppercase tracking-wider mt-1">
                  Core Projects
                </div>
              </div>

              <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-900/20 text-center hover:border-fuchsia-400/60 hover:bg-purple-900/30 transition-all shadow-[0_0_10px_rgba(192,38,211,0.15)]">
                <div className="text-2xl font-black font-space text-white">
                  2
                </div>
                <div className="text-[11px] font-mono text-fuchsia-300 uppercase tracking-wider mt-1">
                  Internships
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
