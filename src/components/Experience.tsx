import React from "react";
import { Sparkles, Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { ExperienceItem } from "../types";

const experiences: ExperienceItem[] = [
  {
    id: "smartbridge",
    role: "AI & Machine Learning Intern",
    company: "SmartBridge (APSCHE)",
    organization: "Andhra Pradesh State Council of Higher Education",
    period: "Internship Program",
    meta: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Supervised Learning",
      "Model Evaluation",
    ],
    points: [
      "Developed foundational machine learning models using Python and Scikit-learn for predictive tasks.",
      "Performed rigorous data preprocessing, missing value imputation, feature engineering, and classification metrics evaluation.",
      "Strengthened analytical thinking, hyperparameter tuning, and problem-solving through AI and machine learning applications.",
    ],
  },
  {
    id: "skilldzire",
    role: "Quantum Computing Intern",
    company: "SkillDzire (APSCHE)",
    organization: "Andhra Pradesh State Council of Higher Education",
    period: "Internship Program",
    meta: [
      "Quantum Computing",
      "Qubits",
      "Superposition",
      "Quantum Gates",
      "Quantum Algorithms",
    ],
    points: [
      "Explored qubits, state superposition, entanglement, quantum logic gates, and fundamental quantum algorithms.",
      "Studied emerging computational paradigms and real-world cryptographic and optimization applications.",
      "Gained hands-on exposure to advanced computing concepts and state-vector simulation techniques.",
    ],
  },
];

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="section relative py-28 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute right-1/4 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-600/10 blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-8">
        {/* Section Heading */}
        <div className="section-heading max-w-3xl mb-16 reveal">
          <div className="inline-flex items-center gap-2 text-fuchsia-400 font-mono text-xs uppercase tracking-[0.4em] font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>04 / PROFESSIONAL TRACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-space text-[#e0e0ff] tracking-tight leading-tight">
            Experience &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-500 drop-shadow-[0_0_20px_rgba(192,38,211,0.5)]">
              Internships
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mt-3">
            Internship experience and practical industry exposure.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="timeline relative max-w-4xl mx-auto space-y-10 pl-6 sm:pl-10">
          {/* Laser Track line */}
          <div
            className="absolute left-[11px] sm:left-[19px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-fuchsia-500 via-purple-500 to-transparent shadow-[0_0_10px_#c026d3]"
            aria-hidden="true"
          />

          {experiences.map((exp, idx) => (
            <article
              key={exp.id}
              className="timeline-item relative p-6 sm:p-8 rounded-2xl bg-black/60 neon-border backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:border-fuchsia-400/80 hover:shadow-[0_0_25px_rgba(192,38,211,0.35)] transition-all duration-500 reveal"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              {/* Timeline Marker Pulse */}
              <div
                className="absolute -left-[35px] sm:-left-[49px] top-8 h-5 w-5 rounded-full bg-gradient-to-tr from-fuchsia-600 to-purple-500 border-4 border-[#050507] shadow-[0_0_15px_#c026d3] animate-pulse"
                aria-hidden="true"
              />

              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-bold font-space text-white">
                    {exp.role}
                  </h3>
                  <div className="text-base font-semibold text-fuchsia-300 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-fuchsia-400" />
                    <span>{exp.company}</span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-fuchsia-400 px-3 py-1 rounded-full bg-fuchsia-950/50 border border-fuchsia-500/30 w-fit">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.period}</span>
                </span>
              </div>

              {/* Meta Tech Stack */}
              <div className="flex flex-wrap gap-2 my-4">
                {exp.meta.map((m) => (
                  <span
                    key={m}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-purple-900/20 text-fuchsia-200 border border-purple-500/30"
                  >
                    {m}
                  </span>
                ))}
              </div>

              {/* Bullet Points */}
              <ul className="space-y-2 text-sm text-neutral-300">
                {exp.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-fuchsia-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
