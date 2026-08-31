import React from "react";
import {
  Code,
  Coffee,
  Database,
  BarChart3,
  Bot,
  Wrench,
  Sparkles,
} from "lucide-react";
import { SkillCategory } from "../types";

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    iconName: "Code",
    level: "Advanced",
    tags: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Tailwind CSS",
      "Responsive UI",
      "DOM Manipulation",
    ],
  },
  {
    title: "Java Development",
    iconName: "Coffee",
    level: "Core Strength",
    tags: [
      "Core Java",
      "Advanced Java",
      "OOP",
      "JDBC",
      "Servlets",
      "Collections API",
      "Exception Handling",
    ],
  },
  {
    title: "Database",
    iconName: "Database",
    level: "Proficient",
    tags: [
      "SQL",
      "MySQL",
      "Relational Schema",
      "Joins & Subqueries",
      "Database Indexing",
    ],
  },
  {
    title: "Data & Analytics",
    iconName: "BarChart3",
    level: "Data Science",
    tags: [
      "Power BI",
      "Microsoft Excel",
      "Data Cleaning",
      "Data Visualization",
      "Pandas",
      "NumPy",
    ],
  },
  {
    title: "AI Skills",
    iconName: "Bot",
    level: "Specialization",
    tags: [
      "Prompt Engineering",
      "ChatGPT",
      "GitHub Copilot",
      "TensorFlow",
      "CNN Image Models",
      "Scikit-learn",
    ],
  },
  {
    title: "Tools",
    iconName: "Wrench",
    level: "Workflow",
    tags: ["Git", "GitHub", "VS Code", "FastAPI", "Render Cloud", "Postman"],
  },
];

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code className="w-5 h-5 text-fuchsia-400" />,
  Coffee: <Coffee className="w-5 h-5 text-fuchsia-400" />,
  Database: <Database className="w-5 h-5 text-fuchsia-400" />,
  BarChart3: <BarChart3 className="w-5 h-5 text-fuchsia-400" />,
  Bot: <Bot className="w-5 h-5 text-fuchsia-400" />,
  Wrench: <Wrench className="w-5 h-5 text-fuchsia-400" />,
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="section relative py-28 overflow-hidden">
      {/* Ambient background light */}
      <div
        className="absolute left-1/4 bottom-0 w-96 h-96 rounded-full bg-purple-600/10 blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-8">
        {/* Section Heading */}
        <div className="section-heading max-w-3xl mb-16 reveal">
          <div className="inline-flex items-center gap-2 text-fuchsia-400 font-mono text-xs uppercase tracking-[0.4em] font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>02 / ARSENAL &amp; CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-space text-[#e0e0ff] tracking-tight leading-tight">
            Technical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-500 drop-shadow-[0_0_20px_rgba(192,38,211,0.5)]">
              Skills
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mt-3">
            Technologies and tools I use across web development, databases,
            analytics, and artificial intelligence.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => (
            <article
              key={cat.title}
              className="skill-card group relative p-7 rounded-2xl bg-black/60 neon-border backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:border-fuchsia-400/80 hover:shadow-[0_0_25px_rgba(192,38,211,0.4)] hover:-translate-y-1.5 transition-all duration-500 reveal"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Top Row: Icon + Level Badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="p-3 rounded-xl bg-black border border-fuchsia-500/40 group-hover:border-fuchsia-400 group-hover:shadow-[0_0_10px_#c026d3] group-hover:scale-110 transition-all duration-300">
                  {iconMap[cat.iconName]}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-fuchsia-300 font-bold px-2.5 py-1 rounded-full bg-fuchsia-950/40 border border-fuchsia-500/30">
                  {cat.level}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold font-space text-white group-hover:text-fuchsia-300 transition-colors mb-4">
                {cat.title}
              </h3>

              {/* Tags */}
              <div className="tags flex flex-wrap gap-2">
                {cat.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag text-xs font-mono px-3 py-1.5 rounded bg-purple-900/20 text-fuchsia-200 border border-purple-500/30 hover:border-fuchsia-400 hover:bg-fuchsia-950/40 hover:text-white hover:shadow-[0_0_10px_rgba(192,38,211,0.4)] transition-all duration-200 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Subtle Laser Bottom Edge Indicator */}
              <div className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 group-hover:w-full transition-all duration-500 ease-out" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
