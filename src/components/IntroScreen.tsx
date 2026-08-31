import React, { useEffect, useState, useRef } from "react";
import {
  playFlameIgniteSound,
  playAriseSound,
  playClickSound,
} from "../utils/audio";

interface IntroScreenProps {
  onEnter: () => void;
  isEntered: boolean;
}

const statusTexts = [
  "INITIALIZING SYSTEM...",
  "IGNITING SHADOW FLAME...",
  "AWAKENING DRAGON...",
  "SSS RANK DETECTED...",
  "SHADOW MONARCH ARISE...",
  "SYSTEM ONLINE...",
];

export const IntroScreen: React.FC<IntroScreenProps> = ({
  onEnter,
  isEntered,
}) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isFireActive, setIsFireActive] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [imageError, setImageError] = useState(false);
  const audioPlayedRef = useRef(false);

  useEffect(() => {
    // 1. Dragon Fire Ignite sequence at 1.4s
    const fireTimer = setTimeout(() => {
      setIsFireActive(true);
      setShaking(true);
      playFlameIgniteSound();

      setTimeout(() => setShaking(false), 1200);
      setTimeout(() => setShowContent(true), 800);
    }, 1400);

    // 2. Awakening Progress loader at 1.8s
    let currentProg = 0;
    let textIdx = 0;
    let loaderInterval: NodeJS.Timeout;

    const loaderTimer = setTimeout(() => {
      loaderInterval = setInterval(() => {
        currentProg += Math.random() * 6 + 4;
        if (currentProg >= 100) {
          currentProg = 100;
          setProgress(100);
          clearInterval(loaderInterval);
          setIsReady(true);
          if (!audioPlayedRef.current) {
            audioPlayedRef.current = true;
            playAriseSound();
          }
          // Auto enter after slight delay if user doesn't press
          const autoEnter = setTimeout(() => {
            onEnter();
          }, 3200);
          return () => clearTimeout(autoEnter);
        }

        setProgress(Math.floor(currentProg));

        const targetTextIdx = Math.min(
          Math.floor((currentProg / 100) * statusTexts.length),
          statusTexts.length - 1,
        );
        if (targetTextIdx !== textIdx) {
          textIdx = targetTextIdx;
          setStatusIndex(targetTextIdx);
        }
      }, 100);
    }, 1800);

    // Enter Key Handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        playClickSound();
        onEnter();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(fireTimer);
      clearTimeout(loaderTimer);
      if (loaderInterval) clearInterval(loaderInterval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onEnter]);

  const handleEnterClick = () => {
    playClickSound();
    onEnter();
  };

  return (
    <div
      id="introScreen"
      className={`intro-screen ${isEntered ? "hidden" : ""} ${shaking ? "shake-screen" : ""}`}
      aria-label="Portfolio introduction"
    >
      {/* Ambient Orbs */}
      <div className="intro-orb intro-orb-a" aria-hidden="true" />
      <div className="intro-orb intro-orb-b" aria-hidden="true" />
      <div className="intro-noise" aria-hidden="true" />

      {/* Solo Leveling Dragon Awakener */}
      <div className="dragon-scene" aria-hidden="true">
        <div className="dragon">
          <div className="dragon-aura" />
          <div className="dragon-horn dragon-horn-left" />
          <div className="dragon-horn dragon-horn-right" />
          <div className="dragon-head">
            <div className="dragon-eye dragon-eye-left" />
            <div className="dragon-eye dragon-eye-right" />
            <div className="dragon-mouth">
              <div className="dragon-fang" />
              <div className="dragon-fang" />
              <div className="dragon-fang" />
              <div className="dragon-fang" />
              {/* Mouth Inferno Blast */}
              <div
                id="mouthFire"
                className={`mouth-fire ${isFireActive ? "fire-active" : ""}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Intro Content */}
      <div
        id="introContent"
        className={`intro-inner intro-content ${showContent ? "show" : ""}`}
      >
        {/* Profile Avatar with rotating arcane halo */}
        <div className="intro-photo-wrap">
          <div className="intro-photo-ring" aria-hidden="true" />
          {!imageError ? (
            <img
              src="profile.jpg"
              alt="Chelimala Hemanth"
              className="intro-photo"
              width={120}
              height={120}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-900 via-indigo-950 to-black border-2 border-purple-400/80 flex items-center justify-center text-2xl font-black text-purple-200 shadow-[0_0_30px_rgba(168,85,247,0.7)] font-mono">
              CH
            </div>
          )}
        </div>

        {/* Intro Tag / Kicker */}
        <div className="intro-kicker intro-label">
          <span aria-hidden="true" />
          WELCOME TO MY PORTFOLIO
        </div>

        {/* Name */}
        <h1 className="intro-name">
          Chelimala
          <span>Hemanth</span>
        </h1>

        {/* Role & Subtitle */}
        <p className="intro-role">
          <span className="text-purple-300 font-semibold">
            Java Full Stack Developer
          </span>
          <b aria-hidden="true">•</b>
          <span className="text-pink-300 font-semibold">
            AI &amp; Data Science
          </span>
        </p>

        {/* Awakening HUD Loader */}
        <div className="awakening-loader">
          <div className="loader-label">
            <span id="loaderText">
              {isReady
                ? "SHADOW REALM READY - ARISE"
                : statusTexts[statusIndex]}
            </span>
            <span
              id="loaderPercent"
              className="font-mono text-purple-300 font-bold"
            >
              {progress}%
            </span>
          </div>
          <div className="loader-track">
            <div
              id="loaderProgress"
              className="loader-progress"
              style={{ width: `${progress}%` }}
            />
            <div className="loader-energy" />
          </div>
        </div>

        {/* Enter CTA Button */}
        <div className="flex flex-col items-center gap-3">
          <button
            id="enterBtn"
            className={`enter-btn ${isReady ? "show" : ""}`}
            type="button"
            onClick={handleEnterClick}
            aria-label="Enter portfolio"
          >
            <span className="font-orbitron tracking-widest text-xs font-bold">
              ENTER PORTFOLIO
            </span>
            <strong
              aria-hidden="true"
              className="text-purple-300 group-hover:translate-x-1 transition-transform"
            >
              →
            </strong>
          </button>

          <button
            type="button"
            onClick={handleEnterClick}
            className="text-[11px] font-mono tracking-wider text-purple-400/60 hover:text-purple-300 transition-colors uppercase pt-1"
          >
            Press [Enter] or click to skip intro
          </button>
        </div>
      </div>

      {/* Intro Bottom Indicator */}
      <div className="intro-bottom" aria-hidden="true">
        <span>SCROLL TO EXPLORE</span>
        <div className="intro-line" />
      </div>
    </div>
  );
};
