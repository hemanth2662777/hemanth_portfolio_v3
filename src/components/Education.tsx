import React from "react";
import { Sparkles, GraduationCap, Award, MapPin } from "lucide-react";
import { EducationItem } from "../types";

const educationData: EducationItem[] = [
  {
    id: "btech",
    period: "2022 — 2026",
    degree: "B.Tech — AI & Data Science",
    institution: "Kandula Obul Reddy Memorial College of Engineering, Kadapa",
    score: "CGPA: 8.3 / 10",
  },
  {
    id: "intermediate",
    period: "2020 — 2022",
    degree: "Intermediate — MPC (Mathematics, Physics, Chemistry)",
    institution: "Swamy Vivekananda Junior College, Anantapur",
    score: "Percentage: 77.5%",
  },
  {
    id: "ssc",
    period: "2020",
    degree: "Secondary School Certificate (SSC)",
    institution: "Z.P. High School, Peddapappur",
    score: "Percentage: 92.66%",
  },
];

export const Education: React.FC = () => {
  return (
    <section id="education" className="section relative py-28 overflow-hidden">
      {/* Glow */}
      <div
        className="absolute left-1/3 bottom-0 w-80 h-80 rounded-full bg-purple-600/10 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-8">
        {/* Section Heading */}
        <div className="section-heading max-w-3xl mb-16 reveal">
          <div className="inline-flex items-center gap-2 text-fuchsia-400 font-mono text-xs uppercase tracking-[0.4em] font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>05 / ACADEMIC FOUNDATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-space text-[#e0e0ff] tracking-tight leading-tight">
            Education{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-500 drop-shadow-[0_0_20px_rgba(192,38,211,0.5)]">
              History
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mt-3">
            Academic background and qualification milestones.
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="education grid grid-cols-1 md:grid-cols-3 gap-6">
          {educationData.map((edu, idx) => (
            <article
              key={edu.id}
              className="p-8 rounded-2xl bg-black/60 neon-border backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:border-fuchsia-400/80 hover:shadow-[0_0_25px_rgba(192,38,211,0.35)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between reveal"
              style={{ animationDelay: `${idx * 120}ms` }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-fuchsia-400 px-3 py-1 rounded-full bg-fuchsia-950/50 border border-fuchsia-500/30">
                    {edu.period}
                  </span>
                  <GraduationCap className="w-5 h-5 text-fuchsia-400" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold font-space text-white">
                    {edu.degree}
                  </h3>
                  <p className="text-xs text-gray-400 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-fuchsia-400 shrink-0 mt-0.5" />
                    <span>{edu.institution}</span>
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-purple-900/40 flex items-center justify-between">
                <span className="text-xs font-mono text-fuchsia-300">
                  Grade / Result
                </span>
                <span className="text-sm font-bold font-mono text-white flex items-center gap-1.5 bg-black border border-fuchsia-500/40 px-3 py-1 rounded-lg shadow-[0_0_8px_rgba(192,38,211,0.3)]">
                  <Award className="w-4 h-4 text-fuchsia-400" />
                  {edu.score}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
