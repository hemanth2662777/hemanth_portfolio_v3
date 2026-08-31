import React, { useEffect, useState } from "react";
import {
  X,
  ExternalLink,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Brain,
  Sliders,
  TrendingUp,
  ShieldAlert,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { ModalType } from "../types";
import { playClickSound, playWhooshSound } from "../utils/audio";

interface ProjectModalProps {
  activeModal: ModalType;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  activeModal,
  onClose,
}) => {
  // Simulator State for Rice AI
  const [selectedRice, setSelectedRice] = useState<
    "Arborio" | "Basmati" | "Jasmine" | "Karacadag" | "Miniket"
  >("Basmati");
  const [isClassifying, setIsClassifying] = useState(false);

  // Simulator State for Credit Score
  const [annualIncome, setAnnualIncome] = useState(65000);
  const [totalDebt, setTotalDebt] = useState(15000);
  const [creditHistoryYears, setCreditHistoryYears] = useState(5);
  const [loanAmount, setLoanAmount] = useState(20000);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        playClickSound();
        onClose();
      }
    };

    if (activeModal) {
      playWhooshSound();
      document.body.classList.add("popup-open");
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.classList.remove("popup-open");
    }

    return () => {
      document.body.classList.remove("popup-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModal, onClose]);

  if (!activeModal) return null;

  // Calculate Credit Score metrics
  const dtiRatio = ((totalDebt / (annualIncome || 1)) * 100).toFixed(1);
  const creditScoreValue = Math.min(
    850,
    Math.max(
      350,
      Math.round(
        600 +
          creditHistoryYears * 18 -
          parseFloat(dtiRatio) * 3.5 +
          (annualIncome - loanAmount) / 2500,
      ),
    ),
  );

  const getCreditRiskLevel = (score: number) => {
    if (score >= 750)
      return {
        label: "Low Risk (Excellent Creditworthiness)",
        color: "text-emerald-400",
        border: "border-emerald-500/40",
        bg: "bg-emerald-950/40",
        isSafe: true,
      };
    if (score >= 650)
      return {
        label: "Moderate Risk (Good Approval Odds)",
        color: "text-yellow-400",
        border: "border-yellow-500/40",
        bg: "bg-yellow-950/40",
        isSafe: true,
      };
    return {
      label: "High Risk (Requires Collateral / Review)",
      color: "text-red-400",
      border: "border-red-500/40",
      bg: "bg-red-950/40",
      isSafe: false,
    };
  };

  const riskStatus = getCreditRiskLevel(creditScoreValue);

  const riceData = {
    Arborio: {
      confidence: "94.8%",
      grainShape: "Short & Rounded",
      origin: "Po Valley, Italy",
      starch: "High Amylopectin",
    },
    Basmati: {
      confidence: "98.2%",
      grainShape: "Extra Long & Slender",
      origin: "Himalayan Foothills",
      starch: "High Amylose",
    },
    Jasmine: {
      confidence: "95.6%",
      grainShape: "Long & Translucent",
      origin: "Thailand",
      starch: "Medium Floral Fragrance",
    },
    Karacadag: {
      confidence: "91.4%",
      grainShape: "Medium & Opaque",
      origin: "Diyarbakir, Turkey",
      starch: "Cold-resistant Starch",
    },
    Miniket: {
      confidence: "93.7%",
      grainShape: "Slender & Polished",
      origin: "Bengal, India",
      starch: "Low Stickiness",
    },
  };

  const handleSimulateClassify = (variety: typeof selectedRice) => {
    setIsClassifying(true);
    playClickSound();
    setTimeout(() => {
      setSelectedRice(variety);
      setIsClassifying(false);
    }, 300);
  };

  return (
    <div
      id={activeModal === "rice" ? "projectModal" : "creditProjectModal"}
      className="project-modal fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalHeading"
    >
      {/* Darkened Blur Backdrop */}
      <div
        className="project-modal-backdrop fixed inset-0 bg-black/85 backdrop-blur-2xl transition-opacity duration-300"
        onClick={() => {
          playClickSound();
          onClose();
        }}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="project-modal-content relative w-full max-w-4xl max-h-[90vh] my-auto bg-[#050507]/95 neon-border rounded-2xl p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_35px_rgba(192,38,211,0.35)] overflow-y-auto text-white z-10 animate-in fade-in zoom-in-95 duration-300 backdrop-blur-2xl">
        {/* Floating Close Button */}
        <button
          id="projectModalClose"
          type="button"
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-black border border-fuchsia-500/40 text-fuchsia-300 hover:text-white hover:border-fuchsia-400 hover:bg-fuchsia-950/60 transition-all shadow-[0_0_10px_rgba(192,38,211,0.3)]"
          aria-label="Close project details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ========================================================
            MODAL 1: RICE CLASSIFICATION AI
            ======================================================== */}
        {activeModal === "rice" && (
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-3 pr-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-950/50 border border-fuchsia-500/40 text-fuchsia-400 font-mono text-xs uppercase tracking-[0.3em] font-bold">
                <Brain className="w-3.5 h-3.5" /> AI / MACHINE LEARNING • 92%
                ACCURACY
              </div>
              <h2
                id="modalHeading"
                className="text-3xl sm:text-4xl font-extrabold font-space text-[#e0e0ff]"
              >
                Rice Type Classification AI
              </h2>
              <p className="text-gray-300 text-base leading-relaxed">
                An AI-powered rice grain classification system that uses
                computer vision and deep convolutional neural networks to
                identify 5 distinct rice varieties from grain images with 92%
                validated accuracy.
              </p>
            </div>

            {/* Live Interactive Model Playground Inside Modal */}
            <div className="p-6 rounded-xl border border-purple-500/30 bg-black/60 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="text-sm font-mono uppercase tracking-wider text-fuchsia-300 font-bold flex items-center gap-2">
                  <Zap className="w-4 h-4 text-fuchsia-400" /> Interactive CNN
                  Inference Simulator
                </h4>
                <span className="text-xs font-mono text-fuchsia-400">
                  Click a sample rice type to classify
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {(
                  [
                    "Arborio",
                    "Basmati",
                    "Jasmine",
                    "Karacadag",
                    "Miniket",
                  ] as const
                ).map((variety) => (
                  <button
                    key={variety}
                    type="button"
                    onClick={() => handleSimulateClassify(variety)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold font-mono transition-all ${
                      selectedRice === variety
                        ? "bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white border border-fuchsia-400 shadow-[0_0_15px_rgba(192,38,211,0.5)]"
                        : "bg-black border border-purple-500/30 text-gray-300 hover:bg-purple-950/40 hover:text-white"
                    }`}
                  >
                    {variety}
                  </button>
                ))}
              </div>

              {/* Classification Prediction Card */}
              <div className="p-4 rounded-xl bg-black border border-purple-500/30 grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                <div className="sm:col-span-2">
                  <div className="text-xs font-mono text-fuchsia-400 uppercase">
                    Predicted Class
                  </div>
                  <div className="text-xl font-bold font-space text-white flex items-center gap-2">
                    <span>{selectedRice} Rice</span>
                    {isClassifying ? (
                      <span className="text-xs font-mono text-fuchsia-400 animate-pulse">
                        Running CNN...
                      </span>
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Shape: {riceData[selectedRice].grainShape} • Origin:{" "}
                    {riceData[selectedRice].origin}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono text-fuchsia-400 uppercase">
                    Model Confidence
                  </div>
                  <div className="text-xl font-black font-mono text-fuchsia-400">
                    {isClassifying ? "..." : riceData[selectedRice].confidence}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono text-fuchsia-400 uppercase">
                    Feature Match
                  </div>
                  <div className="w-full bg-purple-950/60 rounded-full h-2 mt-2 overflow-hidden border border-purple-500/20">
                    <div
                      className="bg-gradient-to-r from-fuchsia-500 to-pink-500 h-full transition-all duration-500"
                      style={{
                        width: isClassifying
                          ? "20%"
                          : riceData[selectedRice].confidence,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Workflow Diagram */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-fuchsia-300 font-bold flex items-center gap-2">
                <Layers className="w-4 h-4 text-fuchsia-400" /> 05 / End-To-End
                Architecture Pipeline
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl border border-purple-500/25 bg-black/60 text-center space-y-1">
                  <div className="text-xs font-mono font-bold text-fuchsia-400">
                    01 / INPUT
                  </div>
                  <div className="text-sm font-semibold text-white">
                    Upload Image
                  </div>
                  <div className="text-[11px] text-gray-400">
                    High-res grain photo input
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-purple-500/25 bg-black/60 text-center space-y-1">
                  <div className="text-xs font-mono font-bold text-purple-300">
                    02 / OPENCV
                  </div>
                  <div className="text-sm font-semibold text-white">
                    Preprocessing
                  </div>
                  <div className="text-[11px] text-gray-400">
                    Resizing, RGB norm, augmentation
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-purple-500/25 bg-black/60 text-center space-y-1">
                  <div className="text-xs font-mono font-bold text-fuchsia-400">
                    03 / TENSORFLOW
                  </div>
                  <div className="text-sm font-semibold text-white">
                    CNN Inference
                  </div>
                  <div className="text-[11px] text-gray-400">
                    Conv2D, MaxPooling &amp; Dense
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-purple-500/25 bg-black/60 text-center space-y-1">
                  <div className="text-xs font-mono font-bold text-emerald-400">
                    04 / OUTPUT
                  </div>
                  <div className="text-sm font-semibold text-white">
                    Softmax Result
                  </div>
                  <div className="text-[11px] text-gray-400">
                    Class variety + confidence
                  </div>
                </div>
              </div>
            </div>

            {/* Deep-Dive Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-xl border border-purple-500/25 bg-black/60 space-y-2">
                <h5 className="text-sm font-bold text-white font-space flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-fuchsia-400" /> Technologies Used
                </h5>
                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    "Python",
                    "TensorFlow",
                    "Keras",
                    "CNN",
                    "OpenCV",
                    "Flask",
                    "HTML5",
                    "CSS3",
                    "JavaScript",
                  ].map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-purple-900/20 text-fuchsia-200 border border-purple-500/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-xl border border-purple-500/25 bg-black/60 space-y-2">
                <h5 className="text-sm font-bold text-white font-space flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-fuchsia-400" /> Key Features
                </h5>
                <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                  <li>
                    Automated rice grain variety classification (Arborio,
                    Basmati, Jasmine, Karacadag, Miniket)
                  </li>
                  <li>
                    Real-time image upload and OpenCV contour preprocessing
                  </li>
                  <li>
                    Deep learning architecture with dropout regularization
                  </li>
                  <li>
                    Deployed interactive web interface with authentication
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-purple-900/40">
              <a
                href="https://rice-classification-ai-model.onrender.com/login"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white font-semibold text-sm shadow-[0_0_20px_rgba(192,38,211,0.4)] hover:shadow-[0_0_30px_rgba(192,38,211,0.7)] hover:scale-105 transition-all"
              >
                <span>Launch Project</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  onClose();
                }}
                className="px-6 py-3 rounded-lg bg-black border border-purple-500/35 text-gray-300 hover:text-white hover:bg-purple-950/40 transition-colors text-sm font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            MODAL 2: CREDIT SCORE PREDICTOR
            ======================================================== */}
        {activeModal === "credit" && (
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-3 pr-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-950/50 border border-fuchsia-500/40 text-fuchsia-400 font-mono text-xs uppercase tracking-[0.3em] font-bold">
                <TrendingUp className="w-3.5 h-3.5" /> DATA SCIENCE / MACHINE
                LEARNING • FINANCIAL RISK
              </div>
              <h2
                id="modalHeading"
                className="text-3xl sm:text-4xl font-extrabold font-space text-[#e0e0ff]"
              >
                Credit Score Predictor &amp; Risk Assessment
              </h2>
              <p className="text-gray-300 text-base leading-relaxed">
                A machine learning-based financial risk assessment system
                designed to analyze customer creditworthiness, evaluate
                Debt-to-Income (DTI) ratios, and predict loan default likelihood
                using Logistic Regression &amp; FastAPI.
              </p>
            </div>

            {/* Live Interactive Risk Assessment Simulator */}
            <div className="p-6 rounded-xl border border-purple-500/30 bg-black/60 backdrop-blur-md space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="text-sm font-mono uppercase tracking-wider text-fuchsia-300 font-bold flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-fuchsia-400" /> Interactive
                  Credit Risk Calculator
                </h4>
                <span className="text-xs font-mono text-fuchsia-400">
                  Adjust parameters in real-time
                </span>
              </div>

              {/* Sliders Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono text-gray-300">
                    <span>Annual Income ($)</span>
                    <span className="text-fuchsia-300 font-bold">
                      ${annualIncome.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="15000"
                    max="180000"
                    step="5000"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(Number(e.target.value))}
                    className="w-full accent-fuchsia-500 bg-purple-950/60 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono text-gray-300">
                    <span>Total Existing Debt ($)</span>
                    <span className="text-pink-400 font-bold">
                      ${totalDebt.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="80000"
                    step="2000"
                    value={totalDebt}
                    onChange={(e) => setTotalDebt(Number(e.target.value))}
                    className="w-full accent-pink-500 bg-purple-950/60 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono text-gray-300">
                    <span>Credit History (Years)</span>
                    <span className="text-fuchsia-300 font-bold">
                      {creditHistoryYears} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={creditHistoryYears}
                    onChange={(e) =>
                      setCreditHistoryYears(Number(e.target.value))
                    }
                    className="w-full accent-fuchsia-500 bg-purple-950/60 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono text-gray-300">
                    <span>Requested Loan ($)</span>
                    <span className="text-fuchsia-300 font-bold">
                      ${loanAmount.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="100000"
                    step="5000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-fuchsia-500 bg-purple-950/60 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Real-time Calculation Result */}
              <div
                className={`p-4 rounded-xl border ${riskStatus.border} ${riskStatus.bg} flex flex-col sm:flex-row items-center justify-between gap-4`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-black/40">
                    {riskStatus.isSafe ? (
                      <ShieldCheck className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <ShieldAlert className="w-6 h-6 text-red-400" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-gray-400">
                      Estimated Credit Score
                    </div>
                    <div className="text-2xl font-black font-space text-white">
                      {creditScoreValue}{" "}
                      <span className="text-xs font-mono font-normal text-gray-400">
                        / 850
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono text-gray-400">
                    DTI Ratio:{" "}
                    <span className="font-bold text-white">{dtiRatio}%</span>
                  </div>
                  <div
                    className={`text-xs font-bold font-mono mt-1 ${riskStatus.color}`}
                  >
                    {riskStatus.label}
                  </div>
                </div>
              </div>
            </div>

            {/* Workflow Pipeline */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-fuchsia-300 font-bold flex items-center gap-2">
                <Layers className="w-4 h-4 text-fuchsia-400" /> 05 / Machine
                Learning &amp; Backend Workflow
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                <div className="p-3 rounded-xl border border-purple-500/25 bg-black/60 text-center space-y-1">
                  <div className="text-[10px] font-mono font-bold text-fuchsia-400">
                    01 / INPUT
                  </div>
                  <div className="text-xs font-semibold text-white">
                    Customer Data
                  </div>
                </div>
                <div className="p-3 rounded-xl border border-purple-500/25 bg-black/60 text-center space-y-1">
                  <div className="text-[10px] font-mono font-bold text-purple-300">
                    02 / CLEAN
                  </div>
                  <div className="text-xs font-semibold text-white">
                    Preprocessing
                  </div>
                </div>
                <div className="p-3 rounded-xl border border-purple-500/25 bg-black/60 text-center space-y-1">
                  <div className="text-[10px] font-mono font-bold text-fuchsia-400">
                    03 / DTI
                  </div>
                  <div className="text-xs font-semibold text-white">
                    Feature Eng.
                  </div>
                </div>
                <div className="p-3 rounded-xl border border-purple-500/25 bg-black/60 text-center space-y-1">
                  <div className="text-[10px] font-mono font-bold text-purple-300">
                    04 / ML
                  </div>
                  <div className="text-xs font-semibold text-white">
                    Logistic Reg.
                  </div>
                </div>
                <div className="p-3 rounded-xl border border-purple-500/25 bg-black/60 text-center space-y-1">
                  <div className="text-[10px] font-mono font-bold text-emerald-400">
                    05 / FASTAPI
                  </div>
                  <div className="text-xs font-semibold text-white">
                    Risk Score
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-xl border border-purple-500/25 bg-black/60 space-y-2">
                <h5 className="text-sm font-bold text-white font-space flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-fuchsia-400" /> Technologies Used
                </h5>
                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    "Python",
                    "Pandas",
                    "NumPy",
                    "Scikit-learn",
                    "Logistic Regression",
                    "StandardScaler",
                    "FastAPI",
                    "Uvicorn",
                    "MySQL",
                  ].map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-purple-900/20 text-fuchsia-200 border border-purple-500/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-xl border border-purple-500/25 bg-black/60 space-y-2">
                <h5 className="text-sm font-bold text-white font-space flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-fuchsia-400" /> Core
                  Capabilities
                </h5>
                <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                  <li>
                    Debt-to-Income (DTI) ratio transformation and normalization
                  </li>
                  <li>
                    FastAPI RESTful endpoint serving model predictions under
                    20ms
                  </li>
                  <li>
                    Probability-calibrated risk evaluation with StandardScaler
                  </li>
                  <li>
                    Interactive real-time web dashboard for financial officers
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-purple-900/40">
              <a
                href="https://credit-loan-rise-assessment.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white font-semibold text-sm shadow-[0_0_20px_rgba(192,38,211,0.4)] hover:shadow-[0_0_30px_rgba(192,38,211,0.7)] hover:scale-105 transition-all"
              >
                <span>Launch Project</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  onClose();
                }}
                className="px-6 py-3 rounded-lg bg-black border border-purple-500/35 text-gray-300 hover:text-white hover:bg-purple-950/40 transition-colors text-sm font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
