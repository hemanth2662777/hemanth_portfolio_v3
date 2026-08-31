import React from "react";
import { ArrowUp, Heart, Sparkles } from "lucide-react";
import { playClickSound } from "../utils/audio";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="site-footer relative py-12 border-t border-purple-900/40 bg-black/90 backdrop-blur-xl overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-gray-400">
        <div className="flex items-center gap-2">
          <span>
            ©{" "}
            <span id="year" className="text-white font-bold">
              {currentYear}
            </span>{" "}
            Chelimala Hemanth.
          </span>
          <span className="hidden sm:inline text-fuchsia-500">•</span>
          <span className="hidden sm:inline text-fuchsia-300/80">
            Built with HTML, CSS, JavaScript &amp; Modern React.
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-fuchsia-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Immersive UI Theme</span>
          </span>

          <button
            type="button"
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-black border border-fuchsia-500/40 text-fuchsia-300 hover:text-white hover:border-fuchsia-400 hover:bg-fuchsia-950/60 shadow-[0_0_10px_rgba(192,38,211,0.3)] transition-all"
            aria-label="Scroll back to top"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
