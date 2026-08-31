import React from "react";
import { Github, ExternalLink, Sparkles, Layers, Info } from "lucide-react";
import { Project, ModalType } from "../types";
import { playClickSound, playWhooshSound } from "../utils/audio";

const projectsData: Project[] = [
  {
    id: "tastytap",
    number: "01 / FULL STACK",
    category: "Full Stack Java Application",
    title: "TastyTap",
    description:
      "A responsive online food delivery application with secure authentication and database integration. Includes restaurant browsing, menu management, shopping cart functionality, and order placement.",
    tags: ["Java", "HTML5", "CSS3", "Servlets", "JDBC", "MySQL"],
    githubUrl: "https://github.com/heman2662777",
    hasModal: false,
  },
  {
    id: "rice-classification",
    number: "02 / AI & ML",
    category: "Computer Vision & Deep Learning",
    title: "Rice Type Classification",
    description:
      "A CNN-based image classification project designed to identify five rice varieties. Applied image preprocessing and deep learning techniques to achieve 92% classification accuracy.",
    tags: ["Python", "TensorFlow", "CNN", "OpenCV", "Keras", "Flask"],
    githubUrl: "https://github.com/hemanth2662777/Rice-Classification-AI-Model",
    liveUrl: "https://rice-classification-ai-model.onrender.com/login",
    hasModal: true,
    modalType: "rice",
    stats: {
      accuracy: "92%",
      modelType: "CNN Conv2D",
      dataset: "5 Varieties",
    },
  },
  {
    id: "credit-score",
    number: "03 / DATA & ML",
    category: "Financial Machine Learning",
    title: "Credit Score Predictor",
    description:
      "A machine learning solution for predicting customer creditworthiness. Includes data preprocessing, feature engineering, and model evaluation for financial risk assessment.",
    tags: ["Python", "Scikit-learn", "MySQL", "Excel", "FastAPI", "Pandas"],
    githubUrl: "https://github.com/hemanth2662777/Credit_Loan_Rise_Assessment",
    hasModal: true,
    modalType: "credit",
    stats: {
      accuracy: "Logistic Reg",
      modelType: "FastAPI REST",
      dataset: "DTI Indicators",
    },
  },
];

interface ProjectsProps {
  onOpenModal: (type: ModalType) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenModal }) => {
  const handleOpenDetails = (modalType?: ModalType) => {
    if (!modalType) return;
    playClickSound();
    playWhooshSound();
    onOpenModal(modalType);
  };

  return (
    <section id="projects" className="section relative py-28 overflow-hidden">
      {/* Background Glow */}
      <div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-8">
        {/* Section Heading */}
        <div className="section-heading max-w-3xl mb-16 reveal">
          <div className="inline-flex items-center gap-2 text-fuchsia-400 font-mono text-xs uppercase tracking-[0.4em] font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>03 / PORTFOLIO ARTIFACTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-space text-[#e0e0ff] tracking-tight leading-tight">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-500 drop-shadow-[0_0_20px_rgba(192,38,211,0.5)]">
              Projects
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mt-3">
            Selected projects demonstrating my development, database, machine
            learning, and problem-solving skills.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {projectsData.map((project, index) => (
            <article
              key={project.id}
              className="project-card group relative flex flex-col justify-between p-8 rounded-2xl bg-black/60 neon-border backdrop-blur-lg shadow-[0_15px_40px_rgba(0,0,0,0.7)] hover:border-fuchsia-400/80 hover:shadow-[0_0_30px_rgba(192,38,211,0.35)] hover:-translate-y-2 transition-all duration-500 reveal"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              {/* Header: Number & Category */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold tracking-widest text-fuchsia-400">
                    {project.number}
                  </span>
                  {project.hasModal && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-fuchsia-300 bg-fuchsia-950/50 border border-fuchsia-500/40 px-2 py-0.5 rounded-full">
                      <Layers className="w-3 h-3 text-fuchsia-400" />{" "}
                      Interactive Details
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold font-space text-white group-hover:text-fuchsia-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-neutral-300 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Middle: Tags & Stats */}
              <div className="my-6 space-y-4">
                {project.stats && (
                  <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-purple-900/20 border border-purple-500/30 text-center font-mono">
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase">
                        Score / Type
                      </div>
                      <div className="text-xs font-bold text-white">
                        {project.stats.accuracy}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase">
                        Model
                      </div>
                      <div className="text-xs font-bold text-fuchsia-400">
                        {project.stats.modelType}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase">
                        Scope
                      </div>
                      <div className="text-xs font-bold text-fuchsia-300">
                        {project.stats.dataset}
                      </div>
                    </div>
                  </div>
                )}

                <div className="tags flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tag text-xs font-mono px-2.5 py-1 rounded bg-purple-900/20 text-fuchsia-200 border border-purple-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer: Action Links */}
              <div className="project-links pt-4 border-t border-purple-900/40 flex items-center justify-between gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClickSound()}
                  className="small-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold text-neutral-200 bg-black/60 border border-purple-500/35 hover:border-fuchsia-400 hover:text-white hover:bg-purple-950/50 transition-all"
                  aria-label={`View ${project.title} GitHub repository`}
                >
                  <Github className="w-3.5 h-3.5 text-fuchsia-400" />
                  <span>GitHub</span>
                  <span aria-hidden="true">↗</span>
                </a>

                {project.hasModal ? (
                  <button
                    type="button"
                    onClick={() => handleOpenDetails(project.modalType)}
                    className="small-btn project-details-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold text-white bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 border border-fuchsia-400/50 shadow-[0_0_15px_rgba(192,38,211,0.4)] hover:shadow-[0_0_25px_rgba(192,38,211,0.7)] hover:scale-105 transition-all"
                  >
                    <Info className="w-3.5 h-3.5 text-pink-200" />
                    <span>Details &amp; Demo</span>
                  </button>
                ) : (
                  <a
                    href="#contact"
                    onClick={() => playClickSound()}
                    className="small-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold text-fuchsia-300 hover:text-white transition-colors"
                  >
                    <span>Contact For Demo</span>
                  </a>
                )}
              </div>

              {/* Glowing Corner Accents */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-fuchsia-500/10 to-transparent rounded-tr-2xl pointer-events-none" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
