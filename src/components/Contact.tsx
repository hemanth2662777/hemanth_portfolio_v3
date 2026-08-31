import React, { useState } from "react";
import {
  Sparkles,
  Mail,
  Linkedin,
  Github,
  Copy,
  Check,
  Send,
  ArrowUpRight,
  MessageSquareCode,
} from "lucide-react";
import { playClickSound, playAriseSound } from "../utils/audio";

interface ContactProps {
  onShowToast: (msg: string, sub?: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onShowToast }) => {
  const [copied, setCopied] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const emailAddress = "hemanth2662n@gmail.com";

  const handleCopyEmail = () => {
    playClickSound();
    navigator.clipboard.writeText(emailAddress).then(() => {
      setCopied(true);
      onShowToast("EMAIL COPIED TO CLIPBOARD", "hemanth2662n@gmail.com");
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    playAriseSound();
    setIsSent(true);
    onShowToast(
      "MESSAGE TRANSMITTED",
      `Thank you ${formName}! Connection initialized.`,
    );

    setTimeout(() => {
      setFormName("");
      setFormEmail("");
      setFormMessage("");
      setIsSent(false);
    }, 4000);
  };

  return (
    <section id="contact" className="section relative py-28 overflow-hidden">
      {/* Glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-purple-600/10 blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto contact-card p-8 sm:p-12 rounded-2xl bg-black/60 neon-border backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.8),0_0_30px_rgba(192,38,211,0.25)] reveal">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fuchsia-950/60 border border-fuchsia-500/40 text-fuchsia-400 font-mono text-xs uppercase tracking-[0.4em] font-bold">
              <Sparkles className="w-3.5 h-3.5" /> 07 / INITIALIZE DIALOGUE
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-space text-[#e0e0ff] tracking-tight">
              Let's{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-500 drop-shadow-[0_0_20px_rgba(192,38,211,0.5)]">
                Connect
              </span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              I'm interested in opportunities where I can apply my Java,
              full-stack development, SQL, analytics, machine learning, and
              problem-solving skills to build impactful software.
            </p>
          </div>

          {/* Social Quick Action Buttons */}
          <div className="contact-links grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {/* Email Button */}
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${emailAddress}`}
                onClick={() => playClickSound()}
                className="btn btn-secondary group flex items-center justify-center gap-2.5 p-4 rounded-xl bg-black/60 border border-purple-500/35 hover:border-fuchsia-400 hover:bg-purple-950/40 text-white font-semibold text-sm transition-all"
              >
                <Mail className="w-4 h-4 text-fuchsia-400 group-hover:scale-110 transition-transform" />
                <span>Email Me</span>
                <ArrowUpRight className="w-4 h-4 text-fuchsia-400 opacity-60 group-hover:opacity-100 transition-opacity" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-mono text-fuchsia-300 hover:text-white transition-colors py-1"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>
                  {copied ? "Copied to clipboard" : "Copy email address"}
                </span>
              </button>
            </div>

            {/* LinkedIn */}
            <div className="flex flex-col gap-2">
              <a
                href="https://linkedin.com/in/hemanth-chelimala-a55b79253"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                className="btn btn-secondary group flex items-center justify-center gap-2.5 p-4 rounded-xl bg-black/60 border border-purple-500/35 hover:border-fuchsia-400 hover:bg-purple-950/40 text-white font-semibold text-sm transition-all"
              >
                <Linkedin className="w-4 h-4 text-fuchsia-400 group-hover:scale-110 transition-transform" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-4 h-4 text-fuchsia-400 opacity-60 group-hover:opacity-100 transition-opacity" />
              </a>
              <span className="text-xs font-mono text-center text-gray-500">
                hemanth-chelimala
              </span>
            </div>

            {/* GitHub */}
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/hemanth2662777"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                className="btn btn-secondary group flex items-center justify-center gap-2.5 p-4 rounded-xl bg-black/60 border border-purple-500/35 hover:border-fuchsia-400 hover:bg-purple-950/40 text-white font-semibold text-sm transition-all"
              >
                <Github className="w-4 h-4 text-fuchsia-400 group-hover:scale-110 transition-transform" />
                <span>GitHub</span>
                <ArrowUpRight className="w-4 h-4 text-fuchsia-400 opacity-60 group-hover:opacity-100 transition-opacity" />
              </a>
              <span className="text-xs font-mono text-center text-gray-500">
                @hemanth2662777
              </span>
            </div>
          </div>

          {/* Quick Message Terminal Form */}
          <div className="p-6 sm:p-8 rounded-xl border border-purple-500/30 bg-black/80 space-y-5">
            <div className="flex items-center justify-between border-b border-purple-900/40 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-fuchsia-300">
                <MessageSquareCode className="w-4 h-4 text-fuchsia-400" />
                <span>DIRECT DISPATCH TRANSMISSION</span>
              </div>
              <span className="text-[10px] font-mono text-fuchsia-400/80">
                PORT 3000 • ENCRYPTED
              </span>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-gray-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Jin-Woo"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-black border border-purple-500/30 text-white placeholder-purple-400/30 focus:outline-none focus:border-fuchsia-400 focus:shadow-[0_0_10px_#c026d3] text-sm font-mono transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-gray-300">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-black border border-purple-500/30 text-white placeholder-purple-400/30 focus:outline-none focus:border-fuchsia-400 focus:shadow-[0_0_10px_#c026d3] text-sm font-mono transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-gray-300">
                  Message / Opportunity
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell me about your role, project, or say hi!"
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-black border border-purple-500/30 text-white placeholder-purple-400/30 focus:outline-none focus:border-fuchsia-400 focus:shadow-[0_0_10px_#c026d3] text-sm font-mono transition-all"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3.5 px-6 rounded-lg font-bold font-space text-sm text-white flex items-center justify-center gap-2 transition-all duration-300 ${
                  isSent
                    ? "bg-emerald-600 shadow-[0_0_25px_rgba(16,185,129,0.5)]"
                    : "bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 border border-fuchsia-400/50 shadow-[0_0_20px_rgba(192,38,211,0.4)] hover:shadow-[0_0_30px_rgba(192,38,211,0.7)] hover:scale-[1.01]"
                }`}
              >
                {isSent ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Transmission Sent Successfully!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-fuchsia-200" />
                    <span>Send Message to Hemanth</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
