import React from "react";
import {
  Sparkles,
  Award,
  ShieldCheck,
  Trophy,
  Cpu,
  Database,
} from "lucide-react";
import { CertificationItem } from "../types";

const certs: CertificationItem[] = [
  {
    id: "c1",
    title: "Artificial Intelligence & Machine Learning",
    issuer: "SmartBridge (APSCHE)",
    badge: "Specialized Certificate",
  },
  {
    id: "c2",
    title: "Big Data",
    issuer: "NPTEL (National Programme on Technology Enhanced Learning)",
    badge: "National Certification",
  },
  {
    id: "c3",
    title: "Quantum Computing",
    issuer: "SkillDzire (APSCHE)",
    badge: "Emerging Tech",
  },
  {
    id: "c4",
    title: "Top 2 Performer Rank",
    issuer:
      "Ranked among the Top 2 performers in the B.Tech AI & Data Science program.",
    badge: "Academic Distinction",
  },
];

export const Certifications: React.FC = () => {
  return (
    <section
      id="certifications"
      className="section relative py-28 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute right-10 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-pink-600/10 blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-8">
        {/* Section Heading */}
        <div className="section-heading max-w-3xl mb-16 reveal">
          <div className="inline-flex items-center gap-2 text-fuchsia-400 font-mono text-xs uppercase tracking-[0.4em] font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>06 / HONORS &amp; CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-space text-[#e0e0ff] tracking-tight leading-tight">
            Certifications &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-500 drop-shadow-[0_0_20px_rgba(192,38,211,0.5)]">
              Achievements
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mt-3">
            Professional certifications and academic recognition.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certs.map((cert, idx) => (
            <article
              key={cert.id}
              className="p-7 rounded-2xl bg-black/60 neon-border backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:border-fuchsia-400/80 hover:shadow-[0_0_25px_rgba(192,38,211,0.35)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between reveal"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-black border border-fuchsia-500/40 text-fuchsia-400 shadow-[0_0_8px_rgba(192,38,211,0.3)]">
                    {idx === 0 && <Cpu className="w-5 h-5" />}
                    {idx === 1 && <Database className="w-5 h-5" />}
                    {idx === 2 && <ShieldCheck className="w-5 h-5" />}
                    {idx === 3 && <Trophy className="w-5 h-5" />}
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-fuchsia-400 px-2 py-0.5 rounded-full bg-fuchsia-950/40 border border-fuchsia-500/30">
                    {cert.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-space text-white leading-snug">
                  {cert.title}
                </h3>
              </div>

              <div className="mt-6 pt-4 border-t border-purple-900/40">
                <p className="text-xs text-gray-400 font-mono flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                  <span>{cert.issuer}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
